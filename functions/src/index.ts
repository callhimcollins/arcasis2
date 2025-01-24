import {onRequest} from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import { defineSecret } from 'firebase-functions/params';
import Stripe from 'stripe';

const stripeSecretKey = defineSecret('STRIPE_SECRET_KEY');
const stripePublishableKey = defineSecret('STRIPE_PUBLISHABLE_KEY');

const stripe = new Stripe(String(stripeSecretKey), { // Replace with your Stripe secret key
    apiVersion: "2024-12-18.acacia",
  });

export const paymentSheet = onRequest(async (req, res) => {
    console.log('Function started on port 8080');
    if (req.method !== "POST") {
      res.status(405).send("Method Not Allowed");
      return;
    }
  
    const { amount, user } = req.body;
  
    // Validate input
    if (!amount || !user || !user.email || !user.fullName) {
      res.status(400).send("Invalid request parameters");
      return;
    }
  
    try {
    console.log('Function started');
      let customerId = user.stripe_customer_id;
  
      if (!customerId) {
        const customer = await stripe.customers.create({
          name: user.fullName,
          email: user.email,
        });
        customerId = customer.id;
      }
  
      const ephemeralKey = await stripe.ephemeralKeys.create(
        { customer: customerId },
        { apiVersion: "2024-12-18.acacia" }
      );
  
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100),
        currency: "usd",
        customer: customerId,
        automatic_payment_methods: {
          enabled: true,
        },
      });
  
      res.json({
        paymentIntent: paymentIntent.client_secret,
        ephemeralKey: ephemeralKey.secret,
        customer: customerId,
        publishableKey: stripePublishableKey
      });
    } catch (error) {
      logger.error("Error creating payment sheet:", error);
      res.status(500).send("Internal Server Error");
    }
  });
