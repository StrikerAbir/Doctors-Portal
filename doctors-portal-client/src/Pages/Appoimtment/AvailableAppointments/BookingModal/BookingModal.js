import { format } from "date-fns/esm";
import React, { useContext } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../../../../AuthProvider/AuthProvider";

const BookingModal = ({ treatment, selectedDate, setTreatment, refetch }) => {
  const { name, slots } = treatment; //treatment is option different

  const { user } = useContext(AuthContext);

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

    fetch("http://localhost:1000/bookings", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(booking),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setTreatment(null);
        if (data.acknowledged) {
          toast.success("Booking Successful..");
          refetch();
        }
      })
      .catch((err) => {
        toast.error("Failed to booking..");
      });
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
                  {/* <option>Pick Appointment Time.</option> */}
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
                  defaultValue={user?.displayName}
                  disabled
                  className="input input-bordered"
                />
              </div>
              <div className="form-control mb-6">
                <input
                  name="phone"
                  type="text"
                  placeholder="Phone Number"
                  required
                  className="input input-bordered"
                />
              </div>
              <div className="form-control mb-6">
                <input
                  name="email"
                  type="text"
                  placeholder="Email"
                  defaultValue={user?.email}
                  disabled
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
