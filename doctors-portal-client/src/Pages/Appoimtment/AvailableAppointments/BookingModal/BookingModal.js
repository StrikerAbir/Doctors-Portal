import { format } from "date-fns/esm";
import React from "react";


const BookingModal = ({ treatment, selectedDate }) => {
  const { name, slots } = treatment;  //treatment is option different
  return (
    <>
      <input type="checkbox" id="booking-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="booking-modal"
            className="btn btn-accent btn-sm btn-circle hover:text-red-400 absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold">{name}</h3>

          <form className="">
            <div className="mt-12">
              <div className="form-control mb-6">
                <input
                  type="text"
                  className="input input-bordered"
                  defaultValue={format(selectedDate, "PP")}
                  disabled
                />
              </div>
              <div className="form-control mb-6">
                <select className="select select-bordered">
                  <option disabled selected>
                    Pick Appointment Time.
                  </option>
                                  {
                                      slots.map(slot => <option value={slot}>{ slot}</option>)
                  }
                </select>
              </div>
              <div className="form-control mb-6">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control mb-6">
                <input
                  type="text"
                  placeholder="Phone Number"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control mb-6">
                <input
                  type="text"
                  placeholder="Email"
                  className="input input-bordered"
                />
              </div>

              <div className="flex justify-center">
                <input
                  type="submit"
                  value="SUBMIT"
                  className="text-white btn btn-accent w-full"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default BookingModal;
