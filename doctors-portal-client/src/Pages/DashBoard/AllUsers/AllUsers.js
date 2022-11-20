import { useQuery } from '@tanstack/react-query';
import React from 'react';

const AllUsers = () => {
    const {data:users=[] } = useQuery({  
        queryKey: ['users'],
        queryFn: async () => {
            const res = await fetch("http://localhost:1000/users");
            const data = await res.json();
            return data;
        }
    })
    return (
      <div className="bg-slate-100 p-10">
        <h3 className="text-3xl my-5 bg">All Users</h3>
        <div>
          <div className="overflow-x-auto">
            <table className="table w-full">
              {/* <!-- head --> */}
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Date</th>
                  <th>time</th>
                </tr>
              </thead>
              <tbody>
                {/* <!-- row 1 --> */}
                {users.map((user, index) => (
                  <tr key={user._id}>
                    <th>{index + 1}</th>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.appointmentDate}</td>
                    <td>{user.slot}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
};

export default AllUsers;