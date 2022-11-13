import React from "react";
import chair from "../../../assets/images/chair.png";
import bg from "../../../assets/images/bg.png";
import InfoCards from "../InfoCards/InfoCards";
import PrimaryButton from "../../../SmallComponent/PrimaryButton";


// import './Banner.css'
const Banner = () => {
  return (
    <div className=" lg:mt-0 mt-10" style={{ background: `url(${bg})` }}>
      <div className="hero">
        <div className="hero-content flex-col lg:flex-row-reverse lg:mt-56">
          <img
            src={chair}
            className="lg:w-1/2 lg:mb-0 mb-10 rounded-lg shadow-2xl"
            alt=""
          />
          <div>
            <h1 className="lg:text-5xl text-3xl font-bold">
              Your New Smile Stars <br /> Here
            </h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
            <PrimaryButton>Get Started</PrimaryButton>
          </div>
        </div>
      </div>
        <InfoCards></InfoCards>
    </div>
  );
};

export default Banner;
