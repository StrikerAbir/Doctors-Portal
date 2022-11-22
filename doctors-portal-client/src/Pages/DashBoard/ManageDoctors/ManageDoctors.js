import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import ConfirmationModal from '../../../Shared/ConfirmationModal';
import Loading from '../../../Shared/Loading';

const ManageDoctors = () => {
    const [deleting, setDeleting] = useState(null);
    const closeModal = () => {
        setDeleting(null);
    }

    const { data: doctors,isLoading,refetch } = useQuery({
        queryKey: ['doctors'],
        queryFn: async () => {
            try {
                const res = await fetch("http://localhost:1000/doctors", {
                    headers: {
                        authorization:`bearer ${localStorage.getItem('accessToken')}`
                    }
                })
                const data = await res.json();
                return data;
            }
            catch (e) {

            }
        }
    })

       const handleDeleteDoctor = doctor => {
        console.log(doctor);
        fetch(`http://localhost:1000/doctors/${doctor._id}`,{
            method: 'DELETE',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
        .then(res=> res.json())
            .then(data => {
            console.log(data);
                refetch();
                toast.success(`Doctor ${doctor.name} deleted successfully`);
        })
    }

    if (isLoading) {
        <Loading></Loading>
    }

    return (
      <div className="bg-slate-100 p-10">
        <h3 className="text-3xl my-5 bg">Manage Doctors {doctors?.length}</h3>
        <div>
          <div className="overflow-x-auto">
            <table className="table w-full">
              {/* <!-- head --> */}
              <thead>
                <tr>
                  <th></th>
                  <th>Avatar</th>
                  <th>Name</th>
                  <th>Specialty</th>
                  <th>E-mail</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {/* <!-- row 1 --> */}
                {doctors?.map((doctor, index) => (
                  <tr key={doctor._id}>
                    <th>{index + 1}</th>
                    <td>
                      <div className="avatar">
                        <div className="w-24 rounded-full">
                          <img alt="" src={doctor.image} />
                        </div>
                      </div>
                    </td>
                    <td>{doctor.name}</td>
                    <td>{doctor.specialty}</td>
                    <td>{doctor.email}</td>
                    <td>
                        
                      {/* The button to open modal */}
                            <label
                                onClick={()=>setDeleting(doctor)}
                        htmlFor="ConfirmationModal"
                        className="btn btn-xs bg-red-700"
                      >
                        Delete
                            </label>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
            </div>
            {
                deleting && <ConfirmationModal
                    title={`Are you sure want to delete?`}
                    message={`If you delete ${deleting.name}. It cannot be recoverable.`}
                    closeModal={closeModal}
                    successButton='Delete'
                    successAction={handleDeleteDoctor}
                    modalData={deleting}
                ></ConfirmationModal>
                
            }
      </div>
    );
}; 

export default ManageDoctors;