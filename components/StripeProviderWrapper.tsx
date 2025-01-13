import * as Linking from 'expo-linking'
import React from 'react'
import { StripeProvider } from '@stripe/stripe-react-native'
import Constants from 'expo-constants'


const publishableKey = Constants.expoConfig?.extra?.stripePublishableKey

const StripeProviderWrapper = (props: Omit<React.ComponentProps<typeof StripeProvider>, "publishableKey" | "merchantIdentifier">) => {
  return <StripeProvider 
        publishableKey={publishableKey}
        merchantIdentifier={"merchant.com.arcasis"}
        urlScheme={Linking.createURL("/")?.split(":")[0]}
        {...props}
        />
}

export default StripeProviderWrapper

