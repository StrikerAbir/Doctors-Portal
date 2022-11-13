import React from 'react';
import doctor from '../../../assets/images/doctor.png'
import appointment from '../../../assets/images/appointment.png'
import PrimaryButton from '../../../SmallComponent/PrimaryButton';
const MakeAppointment = () => {
    return (
      <div className="lg:mt-40 mt-20 lg:pb-0 pb-10" style={{background: `url(${appointment})`}}>
        <div className="hero">
          <div className="hero-content flex-col lg:flex-row lg:justify-around p-0">
            <img
              src={doctor}
              alt=""
              className="lg:w-1/2 rounded-lg lg:-mt-36 -mt-20"
            />

            <div className="px-10">
              <p className="text-xl font-bold text-primary">Appointment</p>
              <h2 className="text-4xl font-semibold text-white">
                Make An Appointment Today
              </h2>
              <p className="py-6 text-white">
                It is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout.
                The point of using Lorem Ipsumis that it has a more-or-less
                normal distribution of letters,as opposed to using 'Content
                here, content here', making it look like readable English. Many
                desktop publishing packages and web page
              </p>
              <PrimaryButton>Appointment</PrimaryButton>
            </div>
          </div>
        </div>
      </div>
    );
};

export default MakeAppointment;