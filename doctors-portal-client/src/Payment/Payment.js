import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useLoaderData } from 'react-router-dom';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);

const Payment = () => {
    const booking = useLoaderData();
    const { treatment, price, appointmentDate, slot } = booking;
    console.log('booking',booking);
    return (
      <div className="bg-slate-100 p-10">
        <h3 className="text-3xl">Payment for {treatment}</h3>
        <p className="text-xl">
          Please pay <strong>$ {price} </strong>for your appointment on{" "}
          <strong>{appointmentDate}</strong> at <strong>{slot}</strong>
        </p>
      </div>
    );
};

export default Payment;