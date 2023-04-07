import './gig.css';
import { Carousel, Breadcrumbs } from '../../components';
import { AiFillStar, AiFillHeart, AiOutlineCheck, AiOutlineClockCircle } from 'react-icons/ai';
import { FiThumbsDown, FiThumbsUp } from 'react-icons/fi';
import inspirationImages from '../../data/inspirationProjects.json';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../../utils/axios';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import Reviews from '../../components/reviews/reviews';
import { UserContext } from '../../hooks/UserContext';
import moment from 'moment';

type Gig = {
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
    features: [string]
};

type GigCreator = {
    _id: string,
    username: string,
    description: string,
    isSeller: boolean,
    country: string,
    image: string,
    reviews: number,
    totalStars: number,
    stars: number
}

const gig = {
    title: 'I will design stunning cartoon character and mascot logo design',
    description: 'Hi there, Are you looking for a professional cartoon or mascot logo for your twitch, E-sport team, YouTube channel, gaming community, etc.?\nYou\'re In The Right Gig..!\nI\'m a highly-skilled graphic designer with more than 5 years professional designing experience.\nI\'ll design a amazing best illustration cartoon or mascot logo for you like animal, person type, etc.\nI\'ll make your ideas become the best amazing mascot or cartoon logo. this is 100% Original my own work. my first priority is your satisfaction.',
    seller_image: '',
    seller_name: 'hzngraphic',
    seller_type: 'Level 2 Seller',
    rating: 4.9,
    reviews: 408
};

const reviews = [
    {
        reviewer_name: 'melissaadelson',
        reviewer_image: '',
        reviewer_location: 'United States',
        review_text: 'This seller is absolutely the best that I have ever worked with on Fiverr. I never expected to receive such an outstanding service. He was absolutely professional and creative. Very pleased with my purchase..!'
    },
    {
        reviewer_name: 'melissaadelson',
        reviewer_image: '',
        reviewer_location: 'United States',
        review_text: 'This seller is absolutely the best that I have ever worked with on Fiverr. I never expected to receive such an outstanding service. He was absolutely professional and creative. Very pleased with my purchase..!'
    },
    {
        reviewer_name: 'melissaadelson',
        reviewer_image: '',
        reviewer_location: 'United States',
        review_text: 'This seller is absolutely the best that I have ever worked with on Fiverr. I never expected to receive such an outstanding service. He was absolutely professional and creative. Very pleased with my purchase..!'
    }
] 

const delivery_details = {
    title: 'BASIC PACKAGE (Rough Sketch)',
    time_limit: '7 Days',
    description: 'From this package you can get a BLACK OUTLINE SKETCH of your logo / character. ( NO COLOR )',
    price: 35,
    others: [
        '1 concept include',
        'Logo transparency',
        'Printable file'
    ]
}

export default function Gig() {
    const { id } = useParams();
    const gigQuery = useQuery({
        queryKey: [`gig`, id],
        queryFn: fetchGig
    });
    const creatorId = gigQuery.data?.creatorId;
    const creatorQuery = useQuery({
        queryKey: [`creator`, creatorId],
        queryFn: fetchCreator,
        enabled: !!creatorId // this query will not execute until creatorId exists
    });
    //const currentUser = useContext(UserContext);
    //console.log(currentUser)
    /* useEffect(() => {
        console.log(currentUser)
    }, [currentUser]) */
    //console.log(gigQuery.data)
    //console.log(creatorQuery.data)
    //console.log(id)

    async function fetchCreator() {
        try {
            const creatorResponse = await axiosInstance.get(`users/single/${creatorId}`);
            
            return creatorResponse.data;
        } 
        catch(error) {
            console.log(error);    
        }
    }

    async function fetchGig(): Promise<Gig | undefined> {
        try {
            const response = await axiosInstance.get(`gigs/single/${id}`);

            return response.data;
        } 
        catch(error) {
            console.log(error)    
        }
    }

    function renderStars(keyIdentifier: string) {
        let starNum;

        if(keyIdentifier === 'gig') {
            starNum = (gigQuery.data?.totalStars && gigQuery.data.stars && !isNaN(gigQuery.data?.totalStars / gigQuery.data?.stars)) ? Math.floor(gigQuery.data?.totalStars / gigQuery.data?.stars) : 1;
        }
        else {
            starNum = (creatorQuery.data?.totalStars && creatorQuery.data.stars && !isNaN(creatorQuery.data?.totalStars / creatorQuery.data?.stars)) ? Math.floor(creatorQuery.data?.totalStars / creatorQuery.data?.stars) : 1;
        }

        /* if(gigQuery.data?.totalStars && gigQuery.data.stars) {
            starNum = !isNaN(gigQuery.data.totalStars / gigQuery.data.stars) ? Math.round(gigQuery.data.totalStars / gigQuery.data.stars) : 1;
        } */


        return Array.from({ length: starNum }).map((item, index) => <AiFillStar key={`${keyIdentifier}-stars-${index}`} />);
    }

    function renderRating(identifier: string) {
        if(identifier === 'gig') {
            return (gigQuery.data?.totalStars && gigQuery.data?.stars && !isNaN(gigQuery.data?.totalStars / gigQuery.data?.stars)) ? (gigQuery.data?.totalStars / gigQuery.data?.stars).toPrecision(2) : 0;
        }

        return (creatorQuery.data?.totalStars && creatorQuery.data?.stars && !isNaN(creatorQuery.data?.totalStars / creatorQuery.data?.stars)) ? (creatorQuery.data.totalStars / creatorQuery.data.stars).toPrecision(2) : 0;
    }
    

    if(gigQuery.isLoading || creatorQuery.isLoading) return <h1>Loading...</h1>;


    return (
        <div className='Gig'>
            <div className='Gig__container'>
                <div className='container-left'>
                    <div className='gig-overview'>
                        <div>
                            <Breadcrumbs category={gigQuery.data?.category} />
                        </div>

                        <h1>{gigQuery.data?.title}</h1>

                        <div className='seller-overview'>
                            <div className='seller-image'>
                                <img src={gigQuery.data?.creator_image} />
                            </div>

                            <div className='seller-name'>{gigQuery.data?.creator}</div>
                            <div className='divider'>|</div>
                            <div className='seller-type'>{gig.seller_type}</div>

                            <div className='seller-rating'>
                                <div className='stars'>{renderStars('gig')}</div>
                                
                                <div className='rating'>{renderRating('gig')}</div>
                            </div>

                            <div className='seller-reviews'>{'('}{gigQuery.data?.reviews}{')'}</div>
                        </div>

                        <div className='gig-gallery'>
                            <Carousel gigImages={{ images: gigQuery.data?.images || [''], title: gigQuery.data?.title || '' }} />
                        </div>

                        <div className='gig-description'>
                            <h2>About This Gig</h2>
                            <p>{gigQuery.data?.description}</p>
                        </div>
                    </div>

                    <div className='about-seller'>
                        <h2>About The Seller</h2>

                        <div className='seller-seller'>
                            <img src={creatorQuery.data?.image} alt='Seller Image' />

                            <div>
                                <div className='seller-name'>{creatorQuery.data?.username}</div>
                                
                                <div className='seller-rating'>
                                    <div className='stars'>{renderStars('creator')}</div>

                                    <div className='rating'>{renderRating('creator')}</div>
                                </div>

                                <div className='seller-reviews'>{'('}{creatorQuery.data?.reviews}{')'}</div>
                                
                                <button className='contact-me'>Contact Me</button>
                            </div>
                        </div>

                        <div className='seller-stats'>
                            <ul>
                                <li>
                                    From
                                    <span>{creatorQuery.data?.country}</span>
                                </li>
                                <li>
                                    Member since 
                                    <span>{moment(creatorQuery.data.createdAt).format('MMM YYYY')}</span>
                                </li>
                                {/* Come back to later 
                                    <li>
                                        Avg. response time
                                        <span>1 hour</span>
                                    </li>
                                    <li>
                                        Last delivery
                                        <span>about 2 hours</span>
                                    </li>
                                    <li>
                                        Languages
                                        <span>Sinhala, Tamil, English</span>
                                    </li> 
                                */}
                            </ul>
                        </div>
                    </div>


                    <Reviews gigId={gigQuery.data?._id || ''} />
                    {/* <div className='reviews'>
                        <h2>Reviews</h2>

                        <ul className='review-list'>
                            {reviews.map((review, index) => (
                                <li className='review' key={`review-${index}`}>
                                    <div className='reviewer-image'>
                                        <img src={review.reviewer_image} alt='' />
                                    </div>

                                    <div className='review-body'>
                                        <div className='reviewer-name'>{review.reviewer_name}</div>
                                        <div className='reviewer-location'>{review.reviewer_location}</div>
                                        <div className='review-text'>{review.review_text}</div>

                                        <div className='review-actions'>
                                            Helpful?

                                            <span>
                                                <button>
                                                    <span><FiThumbsUp /></span>
                                                    Yes
                                                </button>
                                            </span>

                                            <span>
                                                <button>
                                                    <span><FiThumbsDown /></span>
                                                    No
                                                </button>
                                            </span>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div> */}
                </div>

                <div className='container-right'>
                    <div className='delivery-details'>
                        <h3>
                            {gigQuery.data?.title}
                            <span className='price'>${gigQuery.data?.price}</span>
                        </h3>
                        
                        <p className='delivery-description'>{gigQuery.data?.description}</p>

                        <div className='delivery-time'>
                            <span><AiOutlineClockCircle /></span>
                            {gigQuery.data?.deliveryTime}
                        </div>

                        <ul className='other-details'>
                            {gigQuery.data?.features.map((feature, index) => (
                                <li key={`other-details-${index}`}>
                                    <span><AiOutlineCheck /></span>
                                    {feature}
                                </li>
                            ))}
                        </ul>

                        <Link to={`/checkout/${id}`}>
                            <button className='continue'>Continue</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}