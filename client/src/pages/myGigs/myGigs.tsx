import { Link } from 'react-router-dom';
import './myGigs.css';
import { FaTrash } from 'react-icons/fa';
import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { UserContext } from '../../hooks/UserContext';
import axiosInstance from '../../utils/axios';
import { Gig } from '../../types/types';

const gigs = [
    {
        image: '',
        name: 'Create a website for you',
        price: 15,
        orders: 0,
        clicks: 0,
        impressions: 0
    },
    {
        image: '',
        name: 'Create a website for you',
        price: 15,
        orders: 0,
        clicks: 0,
        impressions: 0
    },
    {
        image: '',
        name: 'Create a website for you',
        price: 15,
        orders: 0,
        clicks: 0,
        impressions: 0
    },
    {
        image: '',
        name: 'Create a website for you',
        price: 15,
        orders: 0,
        clicks: 0,
        impressions: 0
    }
]

export default function MyGigs() {
    const currentUser = useContext(UserContext);
    const id = currentUser?.userId;
    const myGigsQuery = useQuery({
        queryKey: ['myGigs', id],
        queryFn: getMyGigs,
        enabled: !!id
    })


    async function getMyGigs(): Promise<Gig[] | undefined> {
        try {
            const response = await axiosInstance.get('my-gigs');

            return response.data;
        } 
        catch(error) {
            console.log(error);    
        }
    }

    return (
        <div className='MyGigs'>
            <div className='MyGigs__container'>
                <div className='header'>
                    <h1>Gigs</h1>
                    <Link to={'/'}>Create a new gig</Link>
                </div>

                <table className='my-gigs-table'>
                    <thead>
                        {/* <tr>Gigs</tr> */}
                        <tr>
                            <td colSpan={2}>Gig</td>
                            <td>Impressions</td>
                            <td>Clicks</td>
                            <td>Orders</td>
                            <td colSpan={2}></td>
                        </tr>
                    </thead>
                    <tbody>
                        {myGigsQuery.data?.map(gig => (
                            <tr key={`${gig._id}`}>
                                <td>
                                    <img src={gig.images[0]} alt='' />
                                </td>
                                <td>{gig.title}</td>
                                <td>{gig.impressions}</td>
                                <td>{gig.clicks}</td>
                                <td>{gig.orders}</td>
                                <td>
                                    <Link to={'/'}>Edit</Link>
                                </td>
                                <td>
                                    <button className='delete-gig'>
                                        <span><FaTrash /></span>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}