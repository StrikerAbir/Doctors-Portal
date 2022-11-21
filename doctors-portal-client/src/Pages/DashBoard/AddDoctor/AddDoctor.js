import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useForm } from 'react-hook-form';
import Loading from '../../../Shared/Loading';

const AddDoctor = () => {
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();

  const imageHostKey = process.env.REACT_APP_imagebb_key;

    const {data:specialties ,isLoading } = useQuery({
        queryKey: ['specialty'],
        queryFn: async () => {
            const res = await fetch("http://localhost:1000/appointmentSpecialty");
            const data = await res.json();
            return data;
        }
    })
    const handleAddDoctor = data => {
      const image = data.img[0];
      const formData = new FormData();
      formData.append('image', image);
      const url = `https://api.imgbb.com/1/upload?expiration=600&key=${imageHostKey}`;
      fetch(url, {
        method: 'POST',
        body: formData,
      })
        .then(res => res.json())
        .then(imgData => {
          console.log(imgData)
          if (imgData.success) {
            
          }
      })

    }
    if (isLoading) {
        return <Loading></Loading>
    }

    return (
      <div className="bg-slate-100 p-10">
        <h3 className="text-3xl my-5 bg">Add Doctors</h3>
        <form className="lg:w-1/2" onSubmit={handleSubmit(handleAddDoctor)}>
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Name</span>
            </label>
            <input
              type="text"
              className="input input-bordered"
              {...register("name", { required: "Name is required." })}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">
                <small>{errors.name?.message}</small>
              </p>
            )}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Email</span>
            </label>
            <input
              type="email"
              className="input input-bordered"
              {...register("email", { required: "Email is required." })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">
                <small>{errors.email?.message}</small>
              </p>
            )}
          </div>
          <div className="form-control mb-6">
            <label className="label">
              <span className="label-text font-semibold">Specialty</span>
            </label>
            <select
              {...register("specialty", { required: "Specialty is required." })}
              className="select select-bordered"
            >
              {specialties?.map((specialty) => (
                <option key={specialty._id} value={specialty.name}>
                  {specialty.name}
                </option>
              ))}
            </select>
            {errors.specialty && (
              <p className="text-red-500 text-sm">
                <small>{errors.specialty?.message}</small>
              </p>
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Photo</span>
            </label>
            <input
              type="file"
              className="input input-bordered"
              {...register("img", { required: "Image is required." })}
            />
            {errors.img && (
              <p className="text-red-500 text-sm">
                <small>{errors.img?.message}</small>
              </p>
            )}
          </div>

          <div className="form-control mt-4">
            <input
              className="btn btn-accent"
              type="submit"
              value="Add Doctor"
            />
          </div>
        </form>
      </div>
    );
};

export default AddDoctor;