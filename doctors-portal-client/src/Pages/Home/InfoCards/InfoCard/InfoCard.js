import React from 'react';

const InfoCard = ({ card }) => {
    const { name,description, icon, bgClass } = card;
    return (
      <div className={`card p-6 lg:card-side ${bgClass} shadow-xl`}>
        <figure>
          <img src={icon} alt="Album" />
        </figure>
        <div className="card-body lg:text-start text-center">
          <h2 className="lg:text-start text-center font-bold text-xl">{name}</h2>
          <p>{description}</p>
        </div>
      </div>
    );
};

export default InfoCard;