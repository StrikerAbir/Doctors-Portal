import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import Loading from "../../../Shared/Loading";
import BookingModal from "./BookingModal/BookingModal";
import Option from "./Option/Option";

const AvailableAppointments = ({ selectedDate }) => {
  // const [appointmentOptions, setAppointmentOptions] = useState([]);
  const [treatment, setTreatment] = useState(null);

  const date=format(selectedDate, "PP")

  // const {data:appointmentOptions,isLoading} = useQuery({  ei line or nicher line
  const {
    data: appointmentOptions = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["appointmentOptions", date],
    queryFn: () =>
      fetch(`http://localhost:1000/v2/appointmentOptions?date=${date}`).then(
        (res) => res.json()
      ),
  });
      console.log(appointmentOptions);
  // useEffect(() => {
  //   fetch("http://localhost:1000/appointmentOptions")
  //     .then((res) => res.json())
  //     .then((data) => setAppointmentOptions(data));
  // }, []);

  if (isLoading) {
    return <Loading></Loading>
  }
  return (
    <section className="mt-5">
      <p className="text-center text-xl font-semibold text-primary">
        Available Appointments on {date}
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
      {treatment && (
        <BookingModal
          treatment={treatment}
          selectedDate={selectedDate}
          setTreatment={setTreatment}
          refetch={refetch}
        ></BookingModal>
      )}
    </section>
  );
};

export default AvailableAppointments;
