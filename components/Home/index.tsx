import { KeyboardAvoidingView, Platform, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import getStyles from './styles'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/state/store'
import Header from './Header'
import Body from './Body'
import ChatInput from '../ChatInput'
import { router } from 'expo-router'
import { supabase } from '@/lib/supabase'
import { randomUUID } from 'expo-crypto'
import { setBotData, setBotMemories, setUser } from '@/state/features/userSlice'
import { removeChat, setBotReplying, setChatHistory, setChatsContainerId, setOrAddChat } from '@/state/features/chatSlice'
import { addToProductsFound, clearProductsFoundInRecommendations } from '@/state/features/recommendationSlice'
import { clearOrderDetails, setOrderDetails } from '@/state/features/orderSlice'
import { BotMemoryType, ChatBoxType, GPTCompletionType, ProductType } from '@/types'
import { openai } from '@/lib/openAiConfig'
import { bridgeForFetchingRecommendations, chatSummarizer, fetchRecommendations, mainChatAssistant, topicGenerator } from '@/lib/arcafinetune'
import { setInitialRecommendationData, setProductsFound, setReadyToRecommend } from '@/state/features/recommendationSlice'
import extractArrayFromResponse from '@/utils/extractJson'
import crawlProduct from '@/utils/productCrawler'
import NotificationPopup from '../NotificationPopup'
import { clearNotification, setNotification } from '@/state/features/notificationSlice'
import { registerForPushNotificationsAsync } from '@/utils/registerPushNotificationsAsync'
import * as ExternalNotifications from 'expo-notifications';

const Home = () => {
	const appearanceMode = useSelector((state:RootState) => state.appearance.currentMode)
	const user = useSelector((state:RootState) => state.user)
	const chatsContainerId = useSelector((state:RootState) => state.chat.chatsContainerId)
	const chats = useSelector((state:RootState) => state.chat.chats)
	const botData = useSelector((state:RootState) => state.user.botData)
	const order = useSelector((state:RootState) => state.order)
	const botMemories = useSelector((state:RootState) => state.user.botMemories)
	const [input, setInput] = useState<string>('')
	const [lastUserResponse, setLastUserResponse] = useState<string>('')
	const [botLastResponse, setBotLastResponse] = useState<string>('')
	const productsFound = useSelector((state:RootState) => state.recommendations.productsFound)
	const styles = getStyles(appearanceMode)
	const dispatch = useDispatch()
	const botId = randomUUID()
	let hasRedirected = false

	const chatData:ChatBoxType = {
		userId: user.userId,
		chatsContainerId,
		role: 'user',
		content: input
	}

	const redirectForAuthentication = () => {
		if(!user.userId) {
			setTimeout(() => router.replace('/(auth)/authscreen'))
		}
	}

	const handleSetUser = async (userId: string) => {
		supabase
		  .from('Users')
		  .select('*')
		  .eq('userId', userId)
		  .single()
		  .then(({ data, error }) => {
			if (data) {
				registerForPushNotificationsAsync(data.userId)
				updateBadgeCount(data.userId)
				dispatch(setUser(data))
				getOrCreateBotForUser(data.userId)
				getBotMemories(data.userId)
			} else {
			  console.log('No data')
			}
	
			if(error) {
			  console.log('An error occurred when getting user', error.message)
			}
		  })
	}

	const getOrCreateBotForUser = async (userId: string) => {
		console.log('firing for bot')
		try {
			const { data: botData, error: botError } = await supabase
			.from('Users')
			.select('*')
			.eq('fullName', userId)
			.single()

			if(botData) {
				console.log('Bot data gotten!')
				dispatch(setBotData({ botId: botData.userId, botUserId: userId }))
			} else {
				const { data, error } = await supabase
				.from('Users')
				.insert({ 
				  userId: botId,
				  fullName: userId
				})
				.select()
				.single()
		  
				if(data){
				  console.log("bot for user", data)
				} else {
				  console.log('no data')
				}
				if(error) {
				  console.log("An error occurred creating bot for user", error.message)
				}
			}

			if(botError) {
				console.log('Error getting bot for user', botError.message)
			  }
		} catch (error) {
			console.log('Error in function getOrCreateBotForUser', error)
		}
	}

	const checkSession = async () => {
		// Check the current session state
		supabase.auth.getSession().then(({ data: { session } }) => {
		  if (session) {
			handleSetUser(session.user.id);
			getOrCreateChatsContainerId(session.user.id)
		  } else if (!hasRedirected) {
			console.log('No session from getSession');
			hasRedirected = true; // Set the flag to true
			redirectForAuthentication();
		  }
		});
	  
		// Listen for auth state changes
		supabase.auth.onAuthStateChange((_event, session) => {
		  if (session) {
			handleSetUser(session.user.id);
		  } else if (!hasRedirected) {
			console.log('No session from state changed');
			hasRedirected = true; // Set the flag to true
			redirectForAuthentication();
		  }
		});
	  };


	const onSend = async () => {
		if(!input.trim()) {
			dispatch(setNotification({ message: 'Please enter a message', messageType: 'error', notificationType: 'system', showNotification: true, stay: false }))
			return;
		};

		if(!user.botData) {
			await getOrCreateBotForUser(String(user.userId))
		}
		try {
			dispatch(setOrAddChat(chatData))
			const { data, error } = await supabase
			.from('Chats')
			.insert(chatData)
			.select()
			.single()

			if(data) {
				setInput('')
				setLastUserResponse(data.content)
			}
			if(error) {
				dispatch(removeChat(input))
				console.log("Couldn't send chat", error.message)
				dispatch(setNotification({ message: `Couldn't Send Chat. Start New Chat`, messageType: 'error', notificationType: 'system', showNotification: true, stay: false }))
			}
		} catch (error) {
			console.log('Error in function onSend', error)	
		} 
	}


	const generateAIResponse = async () => {
		dispatch(setBotReplying(true))
		try {
			if(chats) {
					const response = await openai.chat.completions.create({
						model: "chatgpt-4o-latest",
						messages: [
						{ role: 'system', content: mainChatAssistant(`Name: ${user.fullName}`, `What you know from past conversations: ${botMemories?.map((memory: BotMemoryType) => memory.summary)}`) },
						...chats.map((chat: GPTCompletionType) => ({ role: chat.role, content: chat.content })),
						],
					});
					const aiMessage = response.choices[0].message.content;
					dispatch(setBotReplying(false))
					if(aiMessage && botData) {
						const botMessage: ChatBoxType = {
							userId: botData?.botId,
							chatsContainerId,
							role: 'assistant',
							content: aiMessage,
						};
						await dispatch(setOrAddChat(botMessage))
						const { data, error } = await supabase
						.from('Chats')
						.insert(botMessage)
						.select()
						.single()

						if(data) {
							setBotLastResponse(data.content)
						}

						if(error) {
							console.log("Couldn't send bot data to DB", error.message)
							dispatch(setNotification({ message: `Arca Not Responding. Restart App`, messageType: 'error', notificationType: 'system', showNotification: true, stay: true }))
							dispatch(removeChat(aiMessage))
						}
					}
				}
			} catch (error) {
				console.error('Error checking if conversation is wrapped(checkIfConversationIsWrapped):', error);
				dispatch(setNotification({ message: `Arca Not Responding. Restart App`, messageType: 'error', notificationType: 'system', showNotification: true, stay: true }))
			}
	}

	const checkAIGeneration = async () => {
		if (!order) {
		  return; // Exit if order doesn't exist
		}

		if(chats?.length === 0) {
			return;
		}
	  
		if (
		  order.orderDetails?.status === 'pending' ||
		  order.orderDetails?.status === 'to be fulfilled' ||
		  order.orderDetails?.status === 'fulfilled'
		) {
		dispatch(setNotification({ message: `An Order Is Already In Progress In This Chat. Arca Won't Respond. Start A New Chat`, messageType: 'error', notificationType: 'system', showNotification: true, stay: false }))
		  return; // Exit if status is one of the specified values
		}
	  
		await generateAIResponse(); // Call only if the above conditions are not met
	};

	const determineIfConversationIsRecommendationsReady = async () => {
		if(!chats) return;
		try {
			const response = await openai.chat.completions.create({
				model: 'gpt-4',
				messages: [
				{ role: 'system', content: bridgeForFetchingRecommendations },
				...chats.map((chat: GPTCompletionType) => ({ role: chat.role, content: chat.content })),
				],
				temperature: 0
			})

			const aiMessage = response.choices[0].message.content;
			console.log("This is the response",aiMessage)

			if(aiMessage?.toLowerCase().includes('true')) {
				dispatch(setReadyToRecommend(true))
				await fetchRecommendationsByAI()
			} else {
				dispatch(setReadyToRecommend(false))
			}
		} catch (error) {
			console.log('Error in determineIfConversationIsRecommendationsReady', error)
		}
	}

	const checkIfAIShouldDetermineRecommendationsReady = async () => {
		if (!order) {
			return; // Exit if order doesn't exist
		  }
		if(chats?.length === 0) {
			return;
		}
		
		  if (
			order.orderDetails?.status === 'pending' ||
			order.orderDetails?.status === 'to be fulfilled' ||
			order.orderDetails?.status === 'fulfilled'
		  ) {
		  dispatch(setNotification({ message: `An Order Is Already In Progress In This Chat. Arca Won't Respond. Start A New Chat`, messageType: 'error', notificationType: 'system', showNotification: true, stay: false }))
			return; // Exit if status is one of the specified values
		  }
		
		  await determineIfConversationIsRecommendationsReady(); // Call only if the above conditions are not met
	}

	const fetchRecommendationsByAI = async () => {
		if (!chats) return;
		
		try {
		  console.log('Fetching recommendations...');
		  const response = await openai.chat.completions.create({
			model: 'gpt-4o',
			messages: [
			  { role: 'system', content: fetchRecommendations },
			  ...chats.map((chat: GPTCompletionType) => ({ 
				role: chat.role, 
				content: chat.content 
			  })),
			],
		  });
	  
		  const aiMessage = response.choices[0].message.content;
	  
		  if (aiMessage) {
			const extractedArray: string[] = extractArrayFromResponse(aiMessage);
			await dispatch(setInitialRecommendationData(extractedArray));
			await getRecommendedProducts(extractedArray);
		  }
		} catch (error) {
		  console.log('Error in fetchRecommendationsByAI:', error);
		}
	  };
	  
	  const processRecommendations = async (recommendations: string[]) => {
		const processedRecommendations: string[] = [];
		dispatch(setNotification({ message: `We're Working On Your Gift Box. This Might Take A Moment.`, messageType: 'info', notificationType: 'system', showNotification: true, stay: true }))
		const productPromises = recommendations.map(async (recommendation) => {
		  try {
			// First try to find the product in the database
			const { data, error } = await supabase.rpc('similarity_search', { 
			  search_name: recommendation 
			});
	  
			if (error) {
			  console.error('Error searching database:', error);
			  return;
			}
	  
			// If no products found in database, trigger the crawler
			if (!data || data.length === 0) {
			  console.log(`Product "${recommendation}" not found in database, initiating crawler...`);
			  await crawlProduct(recommendation);
			  // After crawling, add the original recommendation name
			  processedRecommendations.push(recommendation);
			} else {
			  console.log(`Found product "${recommendation}" in database:`, data[0].name);
			  processedRecommendations.push(data[0].name);
			}
		  } catch (error) {
			console.error(`Error processing recommendation "${recommendation}":`, error);
		  }
		});
	  
		// Wait for all products to be processed
		await Promise.all(productPromises);
		console.log('All recommendations processed');
	  
		// After all processing is complete, wait a short time for database writes to complete
		await new Promise(resolve => setTimeout(resolve, 1000));
		
		return processedRecommendations;
	  };

	  const fetchProcessedProducts = async (productNames: string[]) => {
		if (!productNames.length) return [];
	  
		try {
		  // First attempt with exact names
		  let { data: exactMatches, error: exactError } = await supabase
			.from('Products')
			.select('*')
			.in('name', productNames);
	  
		  if (exactError) {
			console.log('Error fetching processed products:', exactError);
			await dispatch(setNotification({ message: `An Error occurred Curating Your Gift Box`, messageType: 'error', notificationType: 'system', showNotification: true, stay: false }))
			return [];
		  }
	  
		  // Get names of products we found with exact match
		  const foundNames = new Set(exactMatches?.map(product => product.name) || []);
		  const missingNames = productNames.filter(name => !foundNames.has(name));
	  
		  // If we have missing products, use similarity search to find their names
		  if (missingNames.length > 0) {
			const similaritySearches = await Promise.all(
			  missingNames.map(async (name) => {
				const { data, error } = await supabase.rpc('similarity_search', { 
				  search_name: name 
				});
				// Return just the name from similarity search
				return error ? [] : (data?.[0]?.name ? [data[0].name] : []);
			  })
			);
	  
			// Get array of all similar product names found
			const similarProductNames = similaritySearches.flat().filter(Boolean);
	  
			if (similarProductNames.length > 0) {
			  // Fetch complete product data for similar matches from Products table
			  const { data: similarProducts, error: similarError } = await supabase
				.from('Products')
				.select('*')
				.in('name', similarProductNames);
	  
			  if (!similarError && similarProducts) {
				// Combine with exact matches
				exactMatches = [...(exactMatches || []), ...similarProducts];
			  }
			}
		  }
	  
		  await dispatch(clearNotification())
		  await dispatch(setProductsFound(exactMatches as ProductType[]));
		  return exactMatches || [];
		} catch (error) {
		  console.error('Error in batch product fetch:', error);
		  await dispatch(setNotification({ message: `An Error occurred Curating Your Gift Box`, messageType: 'error', notificationType: 'system', showNotification: true, stay: false }))
		  return [];
		}
	};

	const initiateOrder = async () => {
		try {
			const { data: getOrderData, error: getOrderError } = await supabase
			.from('Orders')
			.select('*')
			.eq('chatsContainerId', chatsContainerId)
			.single();
			if(getOrderData) {
				dispatch(setOrderDetails(getOrderData))
			} else if(!getOrderData || getOrderError) {
				const { data, error } = await supabase
				.from('Orders')
				.upsert({ userId: user.userId, status: 'created', chatsContainerId })
				.select('*')
				.single()
				if(error) {
					console.log("An error occurred creating order", error.message)
				} else {
					dispatch(setOrderDetails(data))
				}
			}
		} catch (error) {
			console.log("An error occurred in initiateOrder", error);
		}
	}

	const getRecommendedProducts = async (recommendations: string[]) => {
		try {
		  const processedNames = await processRecommendations(recommendations);
		  const products = await fetchProcessedProducts(processedNames);
		  await initiateOrder()
		  return products;
		} catch (error) {
		  console.error('Error in getRecommendedProducts:', error);
		  await dispatch(setNotification({ message: `An Error occurred Curating Your Gift Box`, messageType: 'error', notificationType: 'system', showNotification: true, stay: false }))
		  return [];
		}
	};


	const getOrCreateChatsContainerId = async (userId: string) => {
		try {
			if(!chatsContainerId) {
				const { data, error } = await supabase
				.from('ChatsContainers')
				.insert({ userId: userId })
				.select()
				.single()
				if(data) {
					dispatch(setChatsContainerId(data.chatsContainerId))
					console.log("Chats Container Id Set")
				}
				if(error) {
					console.log('An error occurred setting chats container id', error.message)
				}
			} else {
				console.log('Chats container id exists')
			}
		} catch (error) {
			console.log('An error occurred in getOrCreateChatsContainer', error)
		}
	}

	const generateTopicForConversation = async () => {
		try {
			if(chats && chats.length > 2) {
				const { data:getData, error:getError } = await supabase
				.from('ChatsContainers')
				.select('chatTopic')
				.eq('chatsContainerId', chatsContainerId)
				.single()
				if(getData?.chatTopic === null) {
					console.log('Data is null')
					const response = await openai.chat.completions.create({
						model: 'chatgpt-4o-latest',
						messages: [
						  { role: 'system', content: topicGenerator },
						  ...chats.map((chat: GPTCompletionType) => ({ 
							role: chat.role, 
							content: chat.content 
						  })),
						],
					  });
					  const aiMessage = response.choices[0].message.content;
					  console.log('This is the topic generated', aiMessage)
					  if(aiMessage) {
						  const { data, error } = await supabase
						  .from('ChatsContainers')
						  .update({ chatTopic: aiMessage })
						  .eq('chatsContainerId', chatsContainerId)
						  .select()
						  .single()
						  if(data) {
							  console.log('Topic updated')
						  } else {
							  console.log('Error updating topic', error?.message)
						  }
					  }
				} 

				if(getError) {
					console.log('An error occurred getting topic', getError.message)
				}
			} else {
				console.log('Not enough chats')
			}
		} catch (error) {
			console.log('An error occurred in generateTopicForConversation', error)
		}
	}

	const summarizeConversationAndSave = async () => {
		if(!chats) return;
		try {
			if(order && order.orderDetails?.status === 'created') {

				const response = await openai.chat.completions.create({
					model: 'gpt-4',
					messages: [
					{ role: 'system', content: chatSummarizer },
					...chats.map((chat: GPTCompletionType) => ({ role: chat.role, content: chat.content })),
					],
				})

				const aiMessage = await response.choices[0].message.content;
				console.log(aiMessage);
				const { error } = await supabase
				.from('BotMemories')
				.insert({
					userId: user.userId,
					chatsContainerId,
					summary: aiMessage
				})
				if(!error) {
					console.log('Saved To Bot Memory')
				} else {
					console.log('An error occurred saving to bot memory', error.message)
				}
			} else {
				console.log(`Couldn't find order with status:created`)
			}
		} catch (error) {
			console.log('An error occurred trying in summarizeConversationAndSave', error)
		}
	}


	const getBotMemories = async (userId: string) => {
		try {
			const { data, error } = await supabase
			.from('BotMemories')
			.select('summary, botMemoryId')
			.eq('userId', userId)
			.order('createdAt', { ascending: false })
			if(data) {
				await dispatch(setBotMemories(data))
			}
			if(error) {
				console.log('An error occurred getting bot memories', error?.message)
			}
		} catch (error) {
			console.log('An error occurred in getBotMemories', error)
		}
	}

	const updateBadgeCount = async (userId: string) => {
		const { error } = await supabase
		.from('Users')
		.update({ badge_count: 0 })
		.eq('userId', userId)
		if(error) {
		  console.log("An error occured updating badge count", error.message)
		} else {
		  console.log('badge count successfully updated')
		}
	}

	const getCartItems = async (orderId: string) => {
        await dispatch(clearProductsFoundInRecommendations())
        const { data, error } = await supabase
        .from('CartItems')
        .select('*, Products(*)')
        .eq('orderId', orderId)
        if(data) {
            data.forEach(item => {
                dispatch(addToProductsFound(item.Products))
            })
        }

        if(error) {
            console.log("An error occurred in getCartItems", error);
        }
    }

	const getOrderThroughNotificationResponse = async (chatsContainerId: string) => {
        const { data, error } = await supabase
        .from('Orders')
        .select()
        .eq('chatsContainerId', chatsContainerId)
        .single()
        if(error) {
            console.log("Couldn't get order", error);
            if(productsFound &&productsFound?.length > 0) {
                dispatch(clearProductsFoundInRecommendations())
            }
            if(order.orderDetails) {
                dispatch(clearOrderDetails())
            }
        }

        if(data) {
            await getCartItems(data.orderId);
            dispatch(setOrderDetails(data));
        }
    }

	const getChatsThroughNotificationResponse = async (chatsContainerId: string) => {
		const { data, error } = await supabase
		.from('Chats')
		.select()
		.eq('chatsContainerId', chatsContainerId)
		.order('createdAt', { ascending: true })
		if(data) {
			await getOrderThroughNotificationResponse(chatsContainerId);
			await dispatch(setChatHistory(data))
		}
		if(error){
			console.log(error)
		}
	}


	useEffect(() => {
		checkSession()
	}, [])
	  

	useEffect(() => {
		if(!lastUserResponse) return;
		checkAIGeneration();
	}, [lastUserResponse])

	useEffect(() => {
		if(!botLastResponse) return;
		const timeout = setTimeout(() => {
			checkIfAIShouldDetermineRecommendationsReady();
		}, 300);
		return () => clearTimeout(timeout); 
	}, [botLastResponse]);

	useEffect(() => {
		if(!botLastResponse || !lastUserResponse) return;	
		generateTopicForConversation()
	}, [botLastResponse, lastUserResponse]);

	useEffect(() => {
		summarizeConversationAndSave()
	}, [order.orderDetails?.orderId])
	

	useEffect(() => {

		ExternalNotifications.setBadgeCountAsync(0).catch(error => {
			console.log('Failed to reset badge count:', error);
		});

		const subscription = ExternalNotifications.addNotificationResponseReceivedListener(response => {
			const responseData = response.notification.request.content.data
			console.log(responseData)
			setTimeout(() => {
				getChatsThroughNotificationResponse(responseData.chatsContainerId)
			}, 500)
		})

		const subscription2 = ExternalNotifications.addNotificationReceivedListener(response => {
			console.log("🔔 Notification Response 2: ", JSON.stringify(response, null, 2));
		})

	

		return () => {
			if (subscription && typeof subscription.remove === 'function') {
			  subscription.remove();
			}

			if (subscription2 && typeof subscription2.remove === 'function') {
			  subscription2.remove();
			}
		  };
	  }, []);

    return (
        <View style={styles.container}>
			<Header/>
			<KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}  // Changed this
			style={styles.keyboardAvoidingContainer}
				keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 1} // Added small offset for Android
				>
				<View style={styles.bodyContainer}>
					<Body retryRecommendations={() => fetchRecommendationsByAI()} />
				</View>

				<ChatInput 
					onSend={onSend} 
					input={input} 
					setInput={(text) => setInput(text)} 
				/>
			</KeyboardAvoidingView>
        </View>
    )
}

export default Home

