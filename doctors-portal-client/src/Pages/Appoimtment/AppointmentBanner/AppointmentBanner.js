import React, { useState } from "react";
import chair from "../../../assets/images/chair.png";
import bg from "../../../assets/images/bg.png";
import { DayPicker } from "react-day-picker";


const AppointmentBanner = ({ selectedDate, setSelectedDate }) => {
  return (
    <header>
      <div
        className=" lg:mt-0 mt-10"
        style={{ background: `url(${bg})`, backgroundSize: "cover" }}
      >
        <div className="hero">
          <div className="hero-content flex-col lg:flex-row-reverse lg:mt-56 lg:mb-56">
            <img
              src={chair}
              className="lg:w-1/2 lg:mb-0 mb-10 rounded-lg shadow-2xl"
              alt=""
            />
            <div className="lg:w-1/2 flex justify-center ">
              <DayPicker
                className="shadow-lg rounded-xl p-5"
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AppointmentBanner;
