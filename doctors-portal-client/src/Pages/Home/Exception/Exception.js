import React from "react";
import treatment from "../../../assets/images/treatment.png";

const Exception = () => {
  return (
    <div className='lg:mt-40 mt-20'>
      <div className="hero">
        <div className="hero-content flex-col lg:flex-row lg:justify-around">
          <img
            src={treatment}
            alt=""
            className="lg:max-w-sm rounded-lg shadow-2xl"
          />

          <div className="lg:w-1/2 lg:p-10">
            <h1 className="lg:text-5xl text-3xl font-bold">
              Exceptional Dental Care, on Your Terms
            </h1>
            <p className="py-6">
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using Lorem Ipsumis that it has a more-or-less normal
              distribution of letters,as opposed to using 'Content here, content
              here', making it look like readable English. Many desktop
              publishing packages and web page
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Exception;
