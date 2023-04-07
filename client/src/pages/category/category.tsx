import './category.css';
import { GigCard } from '../../components';
import { AiOutlineHome, AiOutlineCheck } from 'react-icons/ai';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { Link, useParams } from 'react-router-dom';
import { useState, useRef, SetStateAction, useEffect } from 'react';
import { useQueryClient, useQuery } from '@tanstack/react-query';
import axiosInstance from '../../utils/axios';
import { useLocation } from 'react-router-dom';
import { Gig } from '../../types/types';


/* type Gig = {
    _id: string,
    creator: string
    creator_image: string,
    description: string,
    title: string,
    reviews: number,
    stars: number,
    totalStars: number,
    price: number,
    images: [string],
    sellerType: string   
}; */

/* const gigCards = [
    {
        creator: 'amanda',
        creator_image: '',
        description: 'I will design stunning cartoon character and mascot logo design',
        rating: 4.9,
        reviews: 407,
        startingPrice: 15,
        images: [{ src: 'https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/184789459/original/0665d5ab1fbafe92a6fe39d19a3f6fec9ac88502.png', alt: ''},{ src: 'https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/184789459/original/0665d5ab1fbafe92a6fe39d19a3f6fec9ac88502.png', alt: ''},{ src: 'https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/184789459/original/0665d5ab1fbafe92a6fe39d19a3f6fec9ac88502.png', alt: ''},{ src: 'https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/184789459/original/0665d5ab1fbafe92a6fe39d19a3f6fec9ac88502.png', alt: ''}],
        sellerType: 'Level 2 Seller'
    },
    {
        creator: 'amanda',
        creator_image: '',
        description: 'I will design a professional and unique 3d minimalist business logo with free edits',
        rating: 4.9,
        reviews: 407,
        startingPrice: 15,
        images: [{ src: 'https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/184789459/original/0665d5ab1fbafe92a6fe39d19a3f6fec9ac88502.png', alt: ''},{ src: 'https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/184789459/original/0665d5ab1fbafe92a6fe39d19a3f6fec9ac88502.png', alt: ''},{ src: 'https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/184789459/original/0665d5ab1fbafe92a6fe39d19a3f6fec9ac88502.png', alt: ''}],
        sellerType: 'Level 2 Seller'
    },
    {
        creator: 'amanda',
        creator_image: '',
        description: 'I will design stunning cartoon character and mascot logo design',
        rating: 4.9,
        reviews: 407,
        startingPrice: 15,
        images: [{ src: 'https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/184789459/original/0665d5ab1fbafe92a6fe39d19a3f6fec9ac88502.png', alt: ''},{ src: 'https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/184789459/original/0665d5ab1fbafe92a6fe39d19a3f6fec9ac88502.png', alt: ''},{ src: 'https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/184789459/original/0665d5ab1fbafe92a6fe39d19a3f6fec9ac88502.png', alt: ''},{ src: 'https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/184789459/original/0665d5ab1fbafe92a6fe39d19a3f6fec9ac88502.png', alt: ''},{ src: 'https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/184789459/original/0665d5ab1fbafe92a6fe39d19a3f6fec9ac88502.png', alt: ''}],
        sellerType: 'Level 2 Seller'
    },
    {
        creator: 'amanda',
        creator_image: '',
        description: 'I will design stunning cartoon character and mascot logo design',
        rating: 4.9,
        reviews: 407,
        startingPrice: 15,
        images: [{ src: 'https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/184789459/original/0665d5ab1fbafe92a6fe39d19a3f6fec9ac88502.png', alt: ''}],
        sellerType: 'Level 2 Seller'
    },
    {
        creator: 'amanda',
        creator_image: '',
        description: 'I will design stunning cartoon character and mascot logo design',
        rating: 4.9,
        reviews: 407,
        startingPrice: 15,
        images: [{ src: 'https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/184789459/original/0665d5ab1fbafe92a6fe39d19a3f6fec9ac88502.png', alt: ''}],
        sellerType: 'Level 2 Seller'
    },
    {
        creator: 'amanda',
        creator_image: '',
        description: 'I will design stunning cartoon character and mascot logo design',
        rating: 4.9,
        reviews: 407,
        startingPrice: 15,
        images: [{ src: 'https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/184789459/original/0665d5ab1fbafe92a6fe39d19a3f6fec9ac88502.png', alt: ''}],
        sellerType: 'Level 2 Seller'
    },
    {
        creator: 'amanda',
        creator_image: '',
        description: 'I will design stunning cartoon character and mascot logo design',
        rating: 4.9,
        reviews: 407,
        startingPrice: 15,
        images: [{ src: 'https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/184789459/original/0665d5ab1fbafe92a6fe39d19a3f6fec9ac88502.png', alt: ''}],
        sellerType: 'Level 2 Seller'
    }
]

const sort_options = [
    { value: 'Best Selling', sortByValue: 'sales' },
    { value: 'Newest', sortByValue: 'createdAt'}
] */

export default function Category() {
    const { category } = useParams()
    const queryClient = useQueryClient();
    const [sortBy, setSortBy] = useState('Best Selling');
    const [sortValue, setSortValue] = useState('sales');
    const [openSort, setOpenSort] = useState(false);
    const location = useLocation();
    const minValue = useRef<HTMLInputElement>(null); // monitors the min-budget input without triggering a re-render
    const maxValue = useRef<HTMLInputElement>(null); // monitors the max-budget input without triggering a re-render
    const query = useQuery({
        queryKey: ['category', { 
            category: category, 
            min: minValue.current?.value, 
            max: maxValue.current?.value, 
            sort: sortValue 
        }],
        queryFn: fetchGigs
    });


    useEffect(() => {
        query.refetch(); // refetches data if the sortValue changes
    }, [sortValue]);

    /* useEffect(() => {
        console.log(category)
    }, []) */

    function handleSort(option: { value: string, sortByValue: string }) {
        setSortBy(option.value);
        setSortValue(option.sortByValue);
        setOpenSort(!openSort);
    }
    //console.log(new URLSearchParams(location.search).get('search'))

    async function fetchGigs(): Promise<Gig[] | undefined> {
        try {
            const response = await axiosInstance.get(
                //             extracts the query params asigned to search or returns empty string
                //              |
                //              v
                `gigs?search=${new URLSearchParams(location.search).get('search') || ''}&min=${minValue.current?.value}&max=${maxValue.current?.value}&sort=${sortValue}&category=${category !== 'search' ? category: ''}`
            );
            //console.log(location.search)
            //console.log(response.data)
            return response.data;
        } 
        catch(error) {
            console.log(error)    
        }
    }

    function applyFilter() {
        //console.log(minValue.current)
        //console.log(maxValue.current)
        query.refetch(); // refetches data
    }

    //console.log(minValue.current?.value)
    //console.log(query.data)
    //console.log(location)

    

    return (
        <div className='Category'>
            <div className='Category__container'>
                <div className='Category__header'>
                    <ul className='breadcrumbs'>
                        <li>
                            <Link to={'/'} className='home-crumb'>
                                <AiOutlineHome />
                            </Link>
                        </li>

                        <li>
                            <span className='divider'>/</span>
                            <Link to={'/'}>{category}</Link>
                        </li>
                    </ul>
                </div>

                <div className='Category__content'>
                    <div className='filters'>
                        <div className='budget-filter'>
                            <span>Budget</span>

                            <div className='min-group'>
                                <label htmlFor='min-budget'>min.</label>
                                <input type='number' id='min-budget' ref={minValue} placeholder='min' />
                            </div>

                            <div className='max-group'>
                                <label htmlFor='max-budget'>max.</label>
                                <input type='number' id='max-budget' ref={maxValue} placeholder='max' />
                            </div>

                            <button className='budget-button' onClick={applyFilter}>Apply</button>
                        </div>

                        <div className='sort-filter'>
                            <span>Sort By</span>
                            
                            <div onClick={() => setOpenSort(!openSort)}>
                                <span>{sortBy}</span>
                                <span>{openSort ? <FiChevronUp /> : <FiChevronDown />}</span>
                            </div>

                            <ul className='sort-menu' data-open={openSort}>
                                {/* {sort_options.map((option, index) => (
                                    <li key={`sort-option-${index}`} onClick={() => handleSort(option)}>
                                        <span>{option.value === sortBy && (<><AiOutlineCheck /></>)}</span>
                                        {option}
                                    </li>
                                ))} */}
                                <li onClick={() => handleSort({ value: 'Best Selling', sortByValue: 'sales' })}>
                                    <span>{sortBy === 'Best Selling' && (<><AiOutlineCheck /></>)}</span>
                                    Best Selling
                                </li>
                                <li onClick={() => handleSort({ value: 'Newest', sortByValue: 'createdAt' })}>
                                    <span>{sortBy === 'Newest' && (<><AiOutlineCheck /></>)}</span>
                                    Newest
                                </li>
                                <li onClick={() => handleSort({ value: 'Price', sortByValue: 'price' })}>
                                    <span>{sortBy === 'Price' && (<><AiOutlineCheck /></>)}</span>
                                    Price
                                </li>
                            </ul>
                        </div>
                    </div>

                    {query.isLoading ? (
                        <div className='content'>
                            <h1>Loading...</h1>
                        </div>
                    ) : query.error ?  (
                        <div className='content'>
                            <h1>Something went wrong</h1>
                        </div>
                    ) : (
                        <div className='content'>
                            {query?.data?.length === 0 ? (
                                <h1>No gigs found</h1>
                            ) 
                            : 
                            query?.data?.map(gig => (
                                <GigCard gig={gig} key={`gigCard-${gig._id}`} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}