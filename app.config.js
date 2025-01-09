import 'dotenv/config';

export default {
  expo: {
    name: "arcasis",
    slug: "arcasis",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "myapp",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    extra: {
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseAnonKey: process.env.SUPABASE_ANON_KEY,
      supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
      openAiApiKey: process.env.OPENAI_API_KEY,
      stripeSecretKey: process.env.STRIPE_SECRET_KEY,
      eas: {
        projectId: "098f8b9e-9194-4472-967d-0b1cdfb45044"
      },
    },
    ios: {
      supportsTablet: true,
      infoPlist: {
        NSCameraUsageDescription:
          "This app needs access to your camera to send personalized video to gift recipient.",
      },
      bundleIdentifier: "com.arcasisco.arcasis",
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      package: "com.arcasisco.arcasis",
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png",
    },
    plugins: [
      [
      "expo-router",
      {
        "origin": "https://arcasisco.com"
      }
    ],
      [
        "@stripe/stripe-react-native",{
          "merchantIdentifier": "merchant.com.arcasis",
          "publishableKey": "pk_test_51QcyUQB0h6bmlV6EAvHbMeJ5G5damKI3uAFRfTWTXysIM5DcxtLtWIQiV7RYzn422wEvEiWtFloiLgL8RSj2Yzft00MlXrlZRL"
        }
      ],
      [
        "expo-splash-screen",
        {
          image: "./assets/images/splash-icon.png",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#ffffff",
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
    }
  },
};
