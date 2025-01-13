import Stripe from 'stripe';
import Constants from 'expo-constants'


const stripeSecretKey = Constants.expoConfig?.extra?.stripeSecretKey
export const stripe = new Stripe(stripeSecretKey, {
    apiVersion: '2024-12-18.acacia',
    appInfo: {
        name: "Arcasis",
        version: "1.0.0"
    }
})