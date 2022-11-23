import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import Loading from "../../Shared/Loading";

const MyAppointment = () => {
  const { user } = useContext(AuthContext);
  const url = `https://doctors-portal-server-mocha-phi.vercel.app/bookings?email=${user?.email}`;

  const { data: bookings = [], isLoading } = useQuery({
    queryKey: ["bookings", user?.email],
    queryFn: async () => {
      const res = await fetch(url, {
        headers: {
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      const data = await res.json();
      return data;
    },
  });
  if (isLoading) {
    return <Loading></Loading>;
  }
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
                <th>Payment</th>
              </tr>
            </thead>
            <tbody>
              {/* <!-- row 1 --> */}
              {bookings?.map((booking, index) => (
                <tr key={booking._id}>
                  <th>{index + 1}</th>
                  <td>{booking.patient}</td>
                  <td>{booking.treatment}</td>
                  <td>{booking.appointmentDate}</td>
                  <td>{booking.slot}</td>
                  <td>
                    {booking.price && !booking.paid && (
                      <Link
                        to={`/dashboard/payment/${booking._id}`}
                        className="btn btn-sm btn-warning"
                      >
                        Pay
                      </Link>
                    )}
                    {booking.price && booking.paid && (
                      <span className="text-green-400">Paid</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyAppointment;
