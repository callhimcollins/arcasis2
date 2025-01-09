export type AppearanceStateType = {
    primaryColor: string,
    backgroundColor: string,
    secondaryBackgroundColor: string,
    textColor: string,
    secondaryTextColor: string,
    faintColor: string,
}

export type UserType = {
    userId: string | null,
    fullName: string | null,
    email: string | null,
    dateOfBirth: number | null,
    gender: string | null,
    phoneNumber: string | null,
    profileImageUrl: string | null,
    createdAt: string | null,
    updatedAt: string | null,
    userSummary: string | null,
    botData?: BotType | null,
    botMemories?: BotMemoryBoxType[] | null
}

export type BotType = {
    botId: string | null,
    botUserId: string | null,
}

export type ChatBoxType = {
    userId: string | null;
    chatId?: string | null;
    chatsContainerId?: string | null;
    role: 'user' | 'system' | 'assistant' ;
    content: string;
    createdAt?: string | null
}

export type GPTCompletionType = Pick<ChatBoxType, "role" | "content">

export type ProductType = {
    productId: string,
    name: string,
    price: number,
    description: string,
    imageUrl: string,
    availablityStatus: boolean
}

export type RecommendationType = {
    data: ProductType,
    category: string
}

export type OrderType = {
    orderId: string | null,
    userId: string | null,
    status: "created" | "pending" | "to be fulfilled" | "fulfilled" | null,
    deliveryFee?: number | null,
    orderTotal?: number | null,
    paymentMethod?: "card" | "bank"| null,
    billingAddressId?: string | null,
    userAddressId?: string | null,
    chatsContainerId: string | null,
}

export type ShippingAddressType = {
    shippingAddressId?: string | null,
    userId: string | null,
    name: string,
    streetAddress: string,
    state: string | null,
    city: string,
    zipCode: string,
    extraInfo: string,
    phoneNumber: string | null
}

export type CartItemType = {
    productId: string,
    orderId: string,
    quantity: number
}

export type BotMemoryType = {
    userId: string,
    chatsContainerId: string,
    summary: string
}

export type NotificationType = {
    notificationType: 'system' | 'arcasis' | 'user' | null,
    showNotification: boolean,
    messageType: "success" | "error" | "info" | null,
    message: string,
    stay: boolean
}

export type HistoryType = {
    userId: string,
    chatsContainerId: string,
    chatTopic: string,
    createdAt: string
}

export type BotMemoryBoxType = {
    userId: string,
    botMemoryId: string
    chatsContainerId: string,
    summary: string,
    createdAt?: string
}

export type ReturnType = {
    userId?: string,
    cartItemId: string,
    returnStatus: 'requested' | 'approved' | null,
    reasonForReturn: string,
}