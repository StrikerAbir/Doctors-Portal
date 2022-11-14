import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import BookingModal from "./BookingModal/BookingModal";
import Option from "./Option/Option";

const AvailableAppointments = ({ selectedDate }) => {
  const [appointmentOptions, setAppointmentOptions] = useState([]);
  const [treatment, setTreatment] = useState(null);
  useEffect(() => {
    fetch("appointmentOptions.json")
      .then((res) => res.json())
      .then((data) => setAppointmentOptions(data));
  }, []);
  return (
    <section className="mt-5">
      <p className="text-center text-xl font-semibold text-primary">
        Available Appointments on {format(selectedDate, "PP")}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-24">
        {appointmentOptions.map((option) => (
          <Option
            key={option._id}
            option={option}
            setTreatment={setTreatment}
          ></Option>
        ))}
      </div>
      {treatment && <BookingModal treatment={treatment} selectedDate={selectedDate}></BookingModal>}
    </section>
  );
};

export default AvailableAppointments;
