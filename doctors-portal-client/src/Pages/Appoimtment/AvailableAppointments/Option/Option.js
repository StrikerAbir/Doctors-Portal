import React from 'react';
import PrimaryButton from '../../../../SmallComponent/PrimaryButton';

const Option = ({ option }) => {
    const { name, slots } = option;
    return (
      <div className="card  shadow-xl">
        <div className="card-body">
                <h2 className="text-primary text-center font-bold text-xl">{ name }</h2>
                <p className="text-center">{slots.length > 0 ? slots[0] : 'Try Another Day'}</p>
                <p className='text-center mb-2'> {slots.length} {slots.length>1? 'spaces':'space'} available</p>
          <div className="card-actions justify-center">
            <PrimaryButton>Book Appointment</PrimaryButton>
          </div>
        </div>
      </div>
    );
};

export default Option;