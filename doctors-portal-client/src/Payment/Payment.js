import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useLoaderData, useNavigation } from 'react-router-dom';
import Loading from '../Shared/Loading';
import CheckoutForm from './CheckoutForm.js/CheckoutForm';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);
console.log(stripePromise);

const Payment = () => {
  const booking = useLoaderData();
  const navigation = useNavigation();

  const { treatment, price, appointmentDate, slot } = booking;
  if (navigation.state === 'loading') {
    return <Loading></Loading>
  }
    
    return (
      <div className="bg-slate-100 p-10">
        <h3 className="text-3xl">Payment for {treatment}</h3>
        <p className="text-xl">
          Please pay <strong>$ {price} </strong>for your appointment on{" "}
          <strong>{appointmentDate}</strong> at <strong>{slot}</strong>
        </p>

        {/* stripe */}
        <div className='mt-6 w-96'>
          <Elements stripe={stripePromise}>
            <CheckoutForm
            booking={booking}
            />
          </Elements>
        </div>
      </div>
    );
};

export default Payment;