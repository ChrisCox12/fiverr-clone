import './review.css';
import { FiThumbsUp, FiThumbsDown } from 'react-icons/fi';
import { AiFillStar } from 'react-icons/ai';

type ReviewProps = {
    review: {
        _id: string,
        creatorId: string
        creatorName: string,
        creatorLocation: string,
        creatorImage: string,
        gigId: string,
        stars: number,
        text: string,
        createdAt: string,
        updatedAt: string
    }
};

export default function Review({ review }: ReviewProps) {



    return (
        <li className='Review'>
            <div className='reviewer-image'>
                <img src={review.creatorImage} alt='' />
            </div>

            <div className='review-body'>
                <div className='reviewer-name'>{review.creatorName}</div>
                <div className='reviewer-location'>{review.creatorLocation}</div>

                <div className='review-stars'>
                    {Array
                        .from({ length: review.stars })
                        .map((item, index) => (
                            <AiFillStar key={`${review._id}-${index}`} />
                        )
                    )}
                </div>

                <div className='review-text'>{review.text}</div>

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
    )
}