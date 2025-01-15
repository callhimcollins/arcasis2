export default {
  expo: {
    name: "arcasis",
    slug: "arcasis",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "arcasis",
    platforms: ["ios", "android", "web"],
    assetBundlePatterns: ["**/*"],
    hostUri: "arcasis.com",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    extra: {
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseAnonKey: process.env.SUPABASE_ANON_KEY,
      supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
      openAiApiKey: process.env.OPENAI_API_KEY,
      stripeSecretKey: process.env.STRIPE_SECRET_KEY,
      stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
      androidClientId: process.env.ANDROID_CLIENT_ID,
      iosClientId: process.env.IOS_CLIENT_ID,
      eas: {
        projectId: "098f8b9e-9194-4472-967d-0b1cdfb45044"
      },
      router: {
        origin: "https://arcasisco.com"
      }
    },
    ios: {
      supportsTablet: true,
      infoPlist: {
        NSCameraUsageDescription:
          "This app needs access to your camera to send personalized video to gift recipient.",
      },
      bundleIdentifier: "com.arcasisco.arcasis",
      usesAppleSignIn: true,
      associatedDomains: ["applinks:arcasisco.com"],
      capabilities: {
        'com.apple.developer.in-app-payments': ['merchant.com.arcasis']
      }
    },
    android: {
      googleServicesFile: "./google-services.json",
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      package: "com.arcasisco.arcasis",
      intentFilters: [
        {
          action: "VIEW",
          autoVerify: true,
          data: [
            {
              scheme: "arcasis" // Changed to match root scheme
            },
            {
              scheme: "https",
              host: "arcasisco.com"
            }
          ],
          category: ["BROWSABLE", "DEFAULT"]
        }
      ],
    },
    web: {
      bundler: "metro",
      output: "server",
      favicon: "./assets/images/favicon.png",
    },
    plugins: [
      "expo-apple-authentication",
      [
        "expo-router",
        {
          "origin": "https://arcasisco.com"
        }
      ],
      [
        "@stripe/stripe-react-native",
        {
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