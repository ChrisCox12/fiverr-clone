import { Link, useParams } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import './messages.css';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../../utils/axios';
import { UserContext } from '../../hooks/UserContext';
import moment from 'moment';
import { AxiosResponse } from 'axios';

let messages = [
    {
        id: 1,
        buyer: 'Jim',
        lastMessage: 'Lorem Ipsum Lorem Ipsum Lorem Ipsum v Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum v Lorem Ipsum v Lorem Ipsum v Lorem Ipsum Lorem Ipsum v',
        date: '1 hour ago',
        read: false
    },
    {
        id: 2,
        buyer: 'Jim',
        lastMessage: 'Lorem Ipsum',
        date: '1 hour ago',
        read: false
    },
    {
        id: 3,
        buyer: 'Jim',
        lastMessage: 'Lorem Ipsum',
        date: '1 hour ago',
        read: true
    },
    {
        id: 4,
        buyer: 'Jim',
        lastMessage: 'Lorem Ipsum',
        date: '1 hour ago',
        read: true
    }
]

type message = {
    id: number,
    buyer: string,
    lastMessage: string,
    date: string,
    read: boolean
}

export default function Messages() {
    const [ms, setMs] = useState<message[]>();
    
    const currentUser = useContext(UserContext);
    const queryClient = useQueryClient();
    const messagesQuery = useQuery({
        queryKey: ['conversations', currentUser?.userId],
        queryFn: getMessages,
        enabled: !!currentUser?.userId
    });

    const mutation = useMutation<AxiosResponse<any, any>, unknown, number>({
        mutationFn: (id) => {
            return axiosInstance.put(`conversations/${id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['conversations', currentUser?.userId]); // invalidates the query;
                                                               // invalid queries perform their queryFn(s) again
                                                               // (re)fetching (potentially updated) data
        }
    });

    /* useEffect(() => {
        setMs(sortByRead());
    }, []); */

    async function getMessages() {
        try {
            const response = await axiosInstance.get('conversations');

            return response.data;
        } 
        catch(error) {
            console.log(error)
        }
    }

    function sortByRead() {
        let temp = [...messages];

        temp.sort(item => {
            return item.read ? 1 : -1 // places read=true objects first
        });

        return temp;
    }

    function handleMarkAsRead(id: number) {
        /* if(ms) {
            let temp = [...ms];

            for(const item of temp) {
                if(item.id === id) {
                    item.read = true;
                    break;
                }
            }

            setMs(temp);
        } */
        mutation.mutate(id)
    }

    if(messagesQuery.isLoading) return <div>Loading...</div>;
    if(messagesQuery.error) return <div>Something went wrong</div>;

    return (
        <div className='Messages'>
            <div className='Messages__container'>
                <div className='header'>
                    <h1>Messages</h1>
                </div>

                <table className='my-messages-table'>
                    <thead>
                        {/* <tr>
                            <td colSpan={6}>Orders</td>
                        </tr> */}

                        <tr>
                            <td>{currentUser?.isSeller ? 'Buyer' : 'Seller'}</td>
                            <td>Last Message</td>
                            <td>Date</td>
                            <td>Action</td>
                        </tr>
                    </thead>
                    <tbody>
                        {/** we sort the array (in place), placing the object with property read=true first */}
                        {messagesQuery.data?.map((message, index) => (
                            <tr className={(
                                        (currentUser?.isSeller && !message.readBySeller) || // if currentUser is the seller and hasn't read the message
                                        (!currentUser?.isSeller && !message.readByBuyer)    // if currentUser is the buyer and hasn't read the message
                                    ) ? 'unread-message' : ''} 
                                key={`message-${index}`}
                            >
                                <td className='buyer'>{currentUser?.isSeller ? message.buyerName : message.sellerName}</td>

                                <td className='last-message'>
                                    <Link to={`/message/${message.id}`}>{message?.lastMessage}...</Link>
                                </td>

                                <td>{moment(message.updatedAt).fromNow()}</td>

                                <td>
                                    {
                                        (
                                            (currentUser?.isSeller && !message.readBySeller) || // if currentUser is the seller and hasn't read the message
                                            (!currentUser?.isSeller && !message.readByBuyer)    // if currentUser is the buyer and hasn't read the message
                                        ) && (
                                            <button className='mark-read' onClick={() => handleMarkAsRead(message?.id)}>Mark as Read</button>
                                        )
                                    }
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}