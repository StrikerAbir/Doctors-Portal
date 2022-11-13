import React from 'react';
import clock from '../../../assets/icons/clock.svg'
import marker from '../../../assets/icons/marker.svg'
import phone from '../../../assets/icons/phone.svg'
import InfoCard from './InfoCard/InfoCard';
const InfoCards = () => {

    const cardData = [
      {
        id: 1,
        name: "Opening Hours",
        description: "Open 9.00 am to 5.00pm everyday",
        icon: clock,
        bgClass: "bg-gradient-to-r from-primary to-secondary text-white",
      },
      {
        id: 2,
        name: "Our Location",
        description: "Brooklyn, NY 10036, United States",
        icon: marker,
        bgClass: "bg-accent text-white",
      },
      {
        id: 3,
        name: "Contact Us",
        description: "+000 123 456789",
        icon: phone,
        bgClass: "bg-gradient-to-r from-primary to-secondary text-white",
      },
    ];
    return (
        <div className='grid lg:grid-cols-3 grid-cols-1 gap-6 lg:mt-56 mt-20'>
            {cardData.map(card => <InfoCard
                key={card.id}
                card={card}
            ></InfoCard>)}
        </div>
    );
};

export default InfoCards;