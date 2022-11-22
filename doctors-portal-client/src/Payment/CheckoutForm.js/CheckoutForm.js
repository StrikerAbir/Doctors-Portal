import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useState } from 'react';

const CheckoutForm = ({booking}) => {

  const [cardError, setCardError] = useState('');
  const stripe = useStripe();
  const elements=useElements();

  const { price } = booking;

    const handleSubmit = async (event) => {
      event.preventDefault();
      if (!stripe || !elements) {
        return;
      }

      const card = elements.getElement(CardElement);
      if (card === null) {
        return;
      }

      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card,
      });

         if (error) {
           console.log("[error]", error);
           setCardError(error.message)
          } else {
           setCardError('')
           console.log("[PaymentMethod]", paymentMethod);
         }
  }
  
    return (
      <>
        <form onSubmit={handleSubmit}>
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />
<p className='text-red-500 mt-2'>{cardError} </p>
          <button
            className="btn btn-sm mt-4 bg-green-500 text-black"
            type="submit"
            disabled={!stripe}
          >
            Pay
          </button>
        </form>
      </>
    );
};

export default CheckoutForm;