import React from "react";
import appointment from "../../../assets/images/appointment.png";
import PrimaryButton from "../../../SmallComponent/PrimaryButton";
const ContactUs = () => {
  return (
    <div
      className="lg:mt-40 mt-20 lg:pb-0 pb-10"
      style={{ background: `url(${appointment})` }}
    >
      <div className="pt-16 mb-10 text-center">
        <p className="text-xl font-bold text-primary">Contact Us</p>
        <h2 className="text-4xl font-semibold text-white">
          Stay connected with us
        </h2>
      </div>

      <div className='flex justify-center items-center'>
        <div className="card flex-shrink-0 w-full max-w-md mb-10">
          <div className="card-body">
            <div className="form-control mb-2">
              <input
                type="text"
                placeholder="Email Address"
                className="input input-bordered"
              />
            </div>
            <div className="form-control mb-2">
              <input
                type="text"
                placeholder="Subject"
                className="input input-bordered"
              />
            </div>
            <div>
              <textarea
                className="textarea textarea-bordered w-full h-28"
                placeholder="Your message"
              ></textarea>
            </div>
            <div className="mt-6 flex justify-center">
              <PrimaryButton>Submit</PrimaryButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
