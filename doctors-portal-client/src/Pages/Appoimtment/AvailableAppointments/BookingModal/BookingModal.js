import { format } from "date-fns/esm";
import React from "react";

const BookingModal = ({ treatment, selectedDate,setTreatment }) => {
  const { name, slots } = treatment; //treatment is option different

  const handleBooking = (event) => {
    event.preventDefault();
    const form = event.target;
    const date = form.date.value;
    const slot = form.slot.value;
    const fName = form.fName.value;
    const phone = form.phone.value;
    const email = form.email.value;
    const booking = {
      treatment: name,
      appointmentDate: date,
      slot,
      patient: fName,
      phone,
      email,
    };
      console.log(booking);
      
      //* TODO: send data to the server
      //* and once data is saved then close the modal
      //* and display success toast
      setTreatment(null)
  };
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

          <form onSubmit={handleBooking}>
            <div className="mt-12">
              <div className="form-control mb-6">
                <input
                  name="date"
                  type="text"
                  className="input input-bordered"
                  defaultValue={format(selectedDate, "PP")}
                  disabled
                />
              </div>
              <div className="form-control mb-6">
                <select name="slot" className="select select-bordered">
                  <option>Pick Appointment Time.</option>
                  {slots.map((slot, index) => (
                    <option key={index} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-control mb-6">
                <input
                  name="fName"
                  type="text"
                  placeholder="Full Name"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control mb-6">
                <input
                  name="phone"
                  type="text"
                  placeholder="Phone Number"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control mb-6">
                <input
                  name="email"
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
