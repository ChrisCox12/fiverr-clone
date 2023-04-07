import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import './success.css';
import axiosInstance from '../../utils/axios';



export default function Success() {
    const navigate = useNavigate();
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const paymentIntent = params.get('payment_intent');

    useEffect(() => {
        async function redirect() {
            try {
                await axiosInstance.put('orders', { paymentIntent });

                setTimeout(() => {
                    navigate('/orders');
                }, 5000);
            } 
            catch(error) {
                console.log(error);
            }
        }

        redirect();
    }, [])


    return (
        <div className='Success-Page'>Payment successful. You are bieng redirected. Please do not close the page.</div>
    )
}