import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";

const MyAppointment = () => {
  const { user } = useContext(AuthContext);
  const url = `http://localhost:1000/bookings?email=${user?.email}`;

  const {data: bookings=[]} = useQuery({
    queryKey: ["bookings", user?.email],
    queryFn: async () => {
      const res = await fetch(url, {
        headers: {
          authorization:`bearer ${localStorage.getItem('accessToken')}`
        }
      });
      const data = await res.json();
      return data;
    },
  });
  return (
    <div className="bg-slate-100 p-10">
      <h3 className="text-3xl my-5 bg">My Appointments</h3>
      <div>
        <div className="overflow-x-auto">
          <table className="table w-full">
            {/* <!-- head --> */}
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Treatment</th>
                <th>Date</th>
                <th>time</th>
              </tr>
            </thead>
            <tbody>
              {/* <!-- row 1 --> */}
              {
                bookings.map((bookings,index) => 
                  <tr>
                    <th>{ index+1}</th>
                    <td>{ bookings.patient}</td>
                    <td>{ bookings.treatment}</td>
                    <td>{bookings.appointmentDate}</td>
                    <td>{bookings.slot}</td>
                    
                  </tr>
                )
              }
              
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyAppointment;
