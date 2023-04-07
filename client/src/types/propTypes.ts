// this type is for the gig cards on the home page
export type servicesProps = {
    services: {
        src: string,
        alt: string,
        title: string,
        subtitle: string
    }[];
}

export type projectProps = {
    projects: {
        src: string,
        alt: string,
        creator: string,
        creatorImage: string,
        category: string
    }[];
}

// this type is for the gig cards that appear on the categories page
export type gigCardProps = {
    gigCardImages: {
        images: [string],
        title: string,
        id: string
    };
}

export type gigImageProps = {
    gigImages: {
        images: [string],
        title: string
    };
}

// this type is for the gig info passed into the GigCard component
export type gigProps = {
    gig: {
        _id: string,
        creator: string,
        creator_image: string,
        description: string,
        stars: number,
        totalStars: number,
        reviews: number,
        price: number,
        title: string,
        images: [string],
        sellerType: string
    }
}