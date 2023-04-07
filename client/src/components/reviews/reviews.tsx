import './reviews.css';
import Review from '../review/review';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../../utils/axios';
import { useContext, useState, useEffect } from 'react';
import { UserContext, UserDispatchContext } from '../../hooks/UserContext';
import { AxiosResponse } from 'axios';


type Review = {
    _id: string,
    creatorId: string,
    creatorLocation: string,
    creatorImage: string,
    creatorName: string,
    gigId: string,
    stars: number,
    text: string,
    createdAt: string,
    updatedAt: string
}

type GigIdProp = {
    gigId: string
}

type ReviewMutationParams = {
    gigId: string, 
    text: string, 
    stars: number, 
    creatorName: string,
    creatorImage: string,
    creatorLocation: string
}

export default function Reviews({ gigId }: GigIdProp) {
    const [reviewText, setReviewText] = useState('');
    const [reviewRating, setReviewRating] = useState(0);
    const currentUser = useContext(UserContext);
    const dispatch = useContext(UserDispatchContext);
    const queryClient = useQueryClient();
    const reviewsQuery = useQuery({
        queryKey: ['reviews', gigId],
        queryFn: getReviews
    });
    
    useEffect(() => {
        console.log(currentUser)
    }, [])
    /* useEffect(() => {
        if(localStorage.getItem('currentUser')) {
            const user = JSON.parse(localStorage.getItem('currentUser') || '');
            //console.log(user)
            if(dispatch) {
                dispatch({
                    type: 'login',
                    username: user?.username,
                    userId: user?._id,
                    image: user?.image,
                    country: user?.country,
                    isSeller: user?.isSeller
                });
            }
        }
    }, []) */

    // useMutation hook is used to create/update/delete data or perform server side-effects;
    // in this case, we use it to create new reviews;
    // Typscript had some issue with the mutate function call in handleSubmit(),
    // to try and resolve the problem we created type ReviewMutationParams to plug
    // into one of the overloads for the useMutation hook
    const mutation = useMutation<AxiosResponse<any, any>, unknown, ReviewMutationParams>({
        mutationFn: (review) => {
            return axiosInstance.post('reviews', review);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['reviews', gigId]); // invalidates the query;
                                                               // invalid queries perform their queryFn(s) again
                                                               // (re)fetching (potentially updated) data
        }
    });
    //console.log(gigId)

    async function getReviews(): Promise<Review[] | undefined> {
        try {
            const response = await axiosInstance.get(`reviews/${gigId}`);

            return response.data;
        } 
        catch(error) {
            console.log(error);
        }
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        mutation.mutate({ 
            gigId, 
            text: reviewText, 
            stars: reviewRating, 
            creatorName: currentUser?.username || '',
            creatorImage: currentUser?.image || '',
            creatorLocation: currentUser?.country || ''
        });
    }

    if(reviewsQuery.isLoading) return <h3>Loading...</h3>;
    if(reviewsQuery.error) return <h3>Something went wrong</h3>;

    return (
        <div className='Reviews'>
            <h2>Reviews</h2>

            {currentUser && (
                <div className='Reviews__add-review'>
                    <h3>Add a Review</h3>
                    <form onSubmit={handleSubmit}>
                        <textarea rows={4} placeholder='We would love to get your feedback' value={reviewText} onChange={(e) => setReviewText(e.target.value)} />

                        <div>
                            <div>
                                <label htmlFor='rating'>Rate your experience:</label>
                                <select name='rating' id='rating' onChange={(e) => setReviewRating(Number(e.target.value))}>
                                    <option value={1}>1</option>
                                    <option value={2}>2</option>
                                    <option value={3}>3</option>
                                    <option value={4}>4</option>
                                    <option value={5}>5</option>
                                </select>
                            </div>
                            
                            <button type='submit'>Submit Review</button>
                        </div>
                    </form>
                </div>
            )}

            <ul className='Reviews__review-list'>
                {reviewsQuery.data?.map(review => (
                    <Review key={review._id} review={review} />
                ))}
            </ul>  
        </div>
    )
}