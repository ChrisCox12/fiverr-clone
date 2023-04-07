import './gigCard.css';
import { AiFillStar, AiFillHeart } from 'react-icons/ai';
import Carousel from '../carousel/carousel';
import { Link } from 'react-router-dom';
import { gigProps } from '../../types/propTypes';

/* type GigProps = {
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
}; */


export default function GigCard({ gig }: gigProps) {
    //console.log(gig)

    return (
        <div className='GigCard'>
            {/* <img src='' alt='Gig Images' /> */}
            <Carousel gigCardImages={{ images: gig.images, title: gig.title, id: gig._id }} />

            <div className='gig-details'>
                <div className='seller-info'>
                    <div className='seller-image'>
                        <img src={gig.creator_image} alt='Creator Image' />
                    </div>

                    <div className='seller-name-type'>
                        <div className='seller-name'>{gig.creator}</div>
                        <div className='seller-type'>{gig.sellerType}</div>
                    </div>
                </div>

                <h3 className='gig-title'>
                    <Link to={`/gig/${gig._id}`}>
                        {gig.title}
                    </Link>
                </h3>

                <div className='gig-info'>
                    <span className='ratings'>
                        <AiFillStar />
                        {!isNaN(gig.totalStars / gig.stars) ? Math.round(gig.totalStars / gig.stars) : 0}
                    </span>

                    <span className='reviews'>{'('}{gig.reviews}{')'}</span>
                </div>
            </div>

            <div className='GigCard__footer'>
                <div><AiFillHeart /></div>

                <div>Starting at ${gig.price}</div>
            </div>
        </div>
    )
}