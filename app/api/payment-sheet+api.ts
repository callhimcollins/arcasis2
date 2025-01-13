import { stripe } from '@/utils/stripe-server'
import Constants from 'expo-constants'

const stripePublishableKey = Constants.expoConfig?.extra?.stripePublishableKey
export const POST = async (req: Request) => {
    const { amount, user } = await req.json()
    let customerId = user.stripe_customer_id
    if(customerId === null) {
        console.log('creating stripe customer')
        const customer = await stripe.customers.create({
            name: user.fullName,
            email: user.email,
            
        });
        customerId = customer.id
    }
    
    const ephemeralKey = await stripe.ephemeralKeys.create(
        { customer: customerId },
        { apiVersion: '2024-12-18.acacia' }
    )
    const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100),
        currency: 'usd',
        customer: customerId,
        automatic_payment_methods: {
            enabled: true,
        },
    })

    return Response.json({
        paymentIntent: paymentIntent.client_secret,
        ephemeralKey: ephemeralKey.secret,
        customer: customerId,
        publishableKey: stripePublishableKey
    })
}

//     "expo": "~52.0.23",
