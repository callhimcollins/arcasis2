import OpenAI from 'openai'
import Constants from 'expo-constants'
export const openai = new OpenAI({
    apiKey: Constants.expoConfig?.extra?.openAiApiKey
});
