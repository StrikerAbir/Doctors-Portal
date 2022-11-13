import React from 'react';
import Banner from './Banner/Banner';
import Exception from './Exception/Exception';
import InfoCards from './InfoCards/InfoCards';
import MakeAppointment from './MakeAppointment/MakeAppointment';
import Services from './Services/Services';

const Home = () => {
    return (
        <div className='mx-5'>
            <Banner></Banner>
            <Services></Services>
            <Exception></Exception>
            <MakeAppointment></MakeAppointment>
        </div>
    );
};

export default Home;