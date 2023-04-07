import './orders.css';
import { Link, useNavigate } from 'react-router-dom';
import { AiFillMessage } from 'react-icons/ai';
import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { UserContext } from '../../hooks/UserContext';
import { Order } from '../../types/types';
import axiosInstance from '../../utils/axios';
import { AxiosError } from 'axios';

const orders = [
    {
        buyer: 'Saddler',
        gig: 'Give him the girl',
        dueOn: 'June 12, 2023',
        total: 15,
        status: 'Incomplete'
    },
    {
        buyer: 'Saddler',
        gig: 'Give him the girl',
        dueOn: 'June 12, 2023',
        total: 15,
        status: 'Incomplete'
    },
    {
        buyer: 'Saddler',
        gig: 'Give him the girl',
        dueOn: 'June 12, 2023',
        total: 15,
        status: 'Incomplete'
    },
    {
        buyer: 'Saddler',
        gig: 'Give him the girl',
        dueOn: 'June 12, 2023',
        total: 15,
        status: 'Incomplete'
    }
]

export default function Orders() {
    /* const currentUser = {
        isSeller : true
    } */
    const currentUser = useContext(UserContext);
    const navigate = useNavigate();
    //console.log(currentUser)
    const id = currentUser?.userId;

    const orderQuery = useQuery({
        queryKey: ['orders', id],
        queryFn: getOrders,
        enabled: !!id
    });

    //console.log(orderQuery.data)

    async function getOrders(): Promise<Order[]| [] | undefined> {
        try {
            const response = await axiosInstance.get('orders');

            return response.data;
        } 
        catch(error) {
            console.log(error);
        }

        return [];
    }

    async function handleContact(order: Order) {
        const sellerId = order.sellerId;
        const buyerId = order.buyerId;
        const id = sellerId.concat(buyerId);

        try {
            const response = await axiosInstance.get(`conversations/${id}`);

            navigate(`/message/${response.data.id}`);
        } 
        catch(error) {
            if(error instanceof AxiosError && error.response?.status === 404) {
                const response = await axiosInstance.post('conversations', {
                    to: currentUser?.isSeller ? buyerId : sellerId
                });

                navigate(`/message/${response.data.id}`);
            }

            console.log(error);
        }
    }

    return (
        <div className='MyOrders'>
            <div className='MyOrders__container'>
                <div className='header'>
                    <h1>Orders</h1>
                </div>

                <table className='my-orders-table'>
                    <thead>
                        {/* <tr>
                            <td colSpan={6}>Orders</td>
                        </tr> */}

                        <tr>
                            <td>{currentUser?.isSeller ? 'Buyer' : 'Seller'}</td>
                            <td>Gig</td>
                            <td>Due On</td>
                            <td>Total {'('}${')'}</td>
                            <td>Status</td>
                            <td>Contact</td>
                        </tr>
                    </thead>
                    <tbody>
                        {orderQuery.data?.map(order => (
                            <tr key={`${order._id}`}>
                                <td>{currentUser?.isSeller ? order.buyerName : order.sellerName}</td>
                                <td>{order.title}</td>
                                <td>{''}</td>
                                <td>{order.price}</td>
                                <td>{order.isCompleted ? 'Completed': 'Incomplete'}</td>
                                <td>
                                    <button onClick={() => handleContact(order)}><AiFillMessage /></button>
                                    {/* <Link to={'/'}>
                                        <AiFillMessage />
                                    </Link> */}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}