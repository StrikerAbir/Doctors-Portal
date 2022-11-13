import React from "react";
import chair from "../../../assets/images/chair.png";
import bg from "../../../assets/images/bg.png";


// import './Banner.css'
const Banner = () => {
  return (
    <div className="lg:relative">
      <img className="w-full lg:block hidden" src={bg} alt="" />
      <div className="hero lg:absolute top-52">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <img src={chair} className="lg:w-1/2 lg:mb-0 mb-10 rounded-lg shadow-2xl" alt="" />
          <div>
            <h1 className="lg:text-5xl text-3xl font-bold">
              Your New Smile Stars <br /> Here
            </h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
            <button className="btn btn-primary bg-gradient-to-r from-primary to-secondary text-white">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
