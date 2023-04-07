import './checkout.css';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { useState, useEffect } from 'react';
import axios from 'axios';
import axiosInstance from '../../utils/axios';
import { useParams } from 'react-router-dom';
import { CheckoutForm } from '../../components';


const stripePromise = loadStripe('pk_test_51MrsLyFTupWeOjmUes0qUYahhLMDYYqrqyGN0VG5ffGtkM1GfXfXAfmN2g1LycYxdfgdQT5kYQMli0OPkuSerIUf00kYdphIlo');

export default function Checkout() {
    const [clientSecret, setClientSecret] = useState('');
    const { id } = useParams();

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        async function createPaymentIntent() {
            try {
                const response = await axiosInstance.post(`orders/create-payment-intent/${id}`);

                setClientSecret(response.data.clientSecret);
            } 
            catch(error) {
                console.log(error);    
            }
        }

        createPaymentIntent();
    }, []);

    const appearance = {
        theme: 'stripe',
    };

    const options = {
        clientSecret,
        appearance,
    };



    return (
        <div className='Checkout'>
            {clientSecret && (
                <Elements options={options} stripe={stripePromise}>
                    <CheckoutForm />
                </Elements>
            )}
        </div>
    )
}