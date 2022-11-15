import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
const SignUp = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const handleSignUp = (data) => {
    console.log(data);
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="lg:w-1/3 md:w-1/2  shadow-xl rounded-xl p-7">
        <h2 className="text-xl text-center mb-6 font-semibold">SignUp</h2>
        <form onSubmit={handleSubmit(handleSignUp)}>
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
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Password</span>
            </label>
            <input
              type="password"
              className="input input-bordered"
              {...register("password", {
                required: "Password is required.",
                minLength: {
                    value: 6,
                    message: "Password must be 6 character long.",
                },
                pattern:{value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/, message: 'Password must have one (capital letter , special characters and number.).'}
              })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">
                <small>{errors.password?.message}</small>
              </p>
            )}
            <label className="label font-semibold">
              <a href=" " className="label-text-alt link link-hover">
                Forgot password?
              </a>
            </label>
          </div>
          <div className="form-control mt-4">
            <input className="btn btn-accent" type="submit" value="SignUp" />
          </div>
        </form>
        <p className="text-center py-3 text-sm">
          Already have an account?
          <Link to="/login" className="text-primary">
            Login
          </Link>
        </p>
        <div className="divider">OR</div>
        <div>
          <button className="btn btn-outline w-full">
            CONTINUE WITH GOOGLE
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
