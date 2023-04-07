
export type Gig = {
    _id: string,
    creator: string,
    creatorId: string,
    creator_image: string,
    description: string,
    title: string,
    reviews: number,
    stars: number,
    totalStars: number,
    price: number,
    images: [string],
    sellerType: string,
    category: string,
    deliveryTime: string,
    features: [string],
    orders: number
}

export type Order = {
    _id: string,
    price: number,
    title: string,
    image: string,
    sellerId: string,
    sellerName: string,
    buyerId: string,
    buyerName: string,
    isCompleted: boolean,
    paymentIntent: string
}

export type Message = {
    _id?: string,
    conversationId?: string,
    userId?: string,
    userImage: string,
    text: string
}

export type UserContextType = {
    username: string,
    userId: string,
    image: string,
    isSeller: boolean,
    country: string
}