import React from 'react';
import Banner from './Banner/Banner';
import ContactUs from './ContactUs/ContactUs';
import Exception from './Exception/Exception';
import MakeAppointment from './MakeAppointment/MakeAppointment';
import Services from './Services/Services';
import Testimonial from './Testimonial/Testimonial';

const Home = () => {
    return (
        <div className='mx-5'>
            <Banner></Banner>
            <Services></Services>
            <Exception></Exception>
            <MakeAppointment></MakeAppointment>
            <Testimonial></Testimonial>
            <ContactUs></ContactUs>
        </div>
    );
};

export default Home;