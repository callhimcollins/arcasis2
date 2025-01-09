import { KeyboardAvoidingView, Platform, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import getStyles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/state/store';
import Header from './Header';
import ChatInput from '@/components/ChatInput';
import ChatList from '@/components/ChatList';
import { ChatBoxType, GPTCompletionType } from '@/types';
import { openai } from '@/lib/openAiConfig';
import { conversationWrappedChecker, introDataCollector, introductionForPersonalization } from '@/lib/arcafinetune';
import { setBotReplying, setConversationWrapped } from '@/state/features/chatSlice';
import { router } from 'expo-router';
import { extractObjectFromResponse } from '@/utils/extractJson';
import { supabase } from '@/lib/supabase';

const PersonalizeArca = () => {
  const appearanceMode = useSelector((state: RootState) => state.appearance.currentMode);
  const [input, setInput] = useState<string>('');
  const [chats, setChats] = useState<ChatBoxType[]>([]);
  const styles = getStyles(appearanceMode);
  const dispatch = useDispatch()
  const user = useSelector((state:RootState) => state.user)
  const [temporaryString, setTemporaryString] = useState('');

  const sendChatButton = async () => {
    const userMessage:ChatBoxType = {
      userId: 'user',
      chatId: `${chats.length + 1}`,
      chatsContainerId: '1',
      role: 'user',
      content: input,
    };
    const updatedChats = [...chats, userMessage];
    setChats(updatedChats);
    setInput('');
    await generateAIResponse(updatedChats);
  };

  const generateAIResponse = async (chatHistory: ChatBoxType[]) => {
    try {
      dispatch(setBotReplying(true))
      const response = await openai.chat.completions.create({
        model: 'chatgpt-4o-latest',
        messages: [
          { role: 'system', content: introductionForPersonalization },
          ...chatHistory.map((chat: GPTCompletionType) => ({ role: chat.role, content: chat.content })),
        ],
      });

      const aiMessage = response.choices[0].message.content;

      if(aiMessage) {
        const botMessage: ChatBoxType = {
          userId: 'bot',
          chatId: `${chatHistory.length + 1}`,
          chatsContainerId: '1',
          role: 'assistant',
          content: aiMessage,
        };
        setChats([...chatHistory, botMessage]);
        dispatch(setBotReplying(false))
        await checkIfConversationIsWrapped()
      }
    } catch (error) {
      console.error('Error generating AI response in personalize arca(generateAIResponse):', error);
    }
  };

  const checkIfConversationIsWrapped = async () => {
    try {
      const response = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: conversationWrappedChecker },
          ...chats.slice(-5).map(chat => ({ role: chat.role, content: chat.content })),
        ]
      });

      const aiMessage = response.choices[0].message.content;
      if(aiMessage?.toLowerCase().includes('true')) {
        await gatherUserDetails();
        await dispatch(setConversationWrapped(true))
      } else if(aiMessage?.toLowerCase().includes('false')) {
        dispatch(setConversationWrapped(false))
      }
      console.log(aiMessage)
    } catch (error) {
        console.error('Error checking if conversation is wrapped(checkIfConversationIsWrapped):', error);
    }
  }

  const gatherUserDetails = async () => {
    try {
      const response = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: introDataCollector },
          ...chats.map((chat: GPTCompletionType) => ({ role: chat.role, content: chat.content })),
        ],
      })

      const aiMessage = response.choices[0].message.content;
      if(aiMessage) {
        console.log(aiMessage)
        await setTemporaryString(aiMessage)
        await updateUserDetails()
      }
    } catch (error) {
      console.log('Error occurred in gatherUserDetails', error)
    }
  }

  const updateUserDetails = async () => {
    try {
      console.log('Updating user details in DB', temporaryString)
      const extractedResponse = await extractObjectFromResponse(temporaryString)
      const { error } = await supabase
      .from('Users')
      .update({ fullName: extractedResponse.fullName, phoneNumber: extractedResponse.phoneNumber, userSummary: extractedResponse.userSummary })
      .eq('userId', user.userId)
      if(!error) {
        console.log('User details updated in DB')
      } else {
        console.log('Error occurred in updateUserDetailsInDB', error)
      }
    } catch (error) {
      console.log('Error occurred in updateUserDetailsInDB', error)
    }
  }

  const goToHome = async () => {
    await updateUserDetails()
    await dispatch(setConversationWrapped(false))
    await router.replace('/(home)')
  }


  useEffect(() => {
    generateAIResponse(chats);
  }, [])


  return (
    <View style={styles.container}>
      <Header />
      <ChatList data={chats} />
      <ChatInput primaryButton={goToHome} input={input} setInput={setInput} onSend={sendChatButton} />
    </View>
  );
};

export default PersonalizeArca;
