import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@latest?target=deno";// Initialize Supabase client


// Initialize Stripe
const stripeInstance = Stripe(Deno.env.get("STRIPE_SECRET_KEY"));
serve(async (req: Request) => {
      const { amount, user } = await req.json()
      console.log(user)
      let customerId = user.stripe_customer_id
      if(customerId === null) {
          console.log('creating stripe customer')
          const customer = await stripeInstance.customers.create({
              name: user.fullName,
              email: user.email,
          });
          customerId = customer.id
      }
      
      const ephemeralKey = await stripeInstance.ephemeralKeys.create(
          { customer: customerId },
          { apiVersion: '2024-12-18.acacia' }
      )
      const paymentIntent = await stripeInstance.paymentIntents.create({
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
          publishableKey: Deno.env.get("STRIPE_PUBLISHABLE_KEY")
      })
});