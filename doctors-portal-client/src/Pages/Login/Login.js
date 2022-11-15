import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom';
const Login = () => {
    const { register, handleSubmit } = useForm();
    const [data, setData] = useState("");
    const handleLogin = data => {
        console.log(data);
    }
    
    return (
      <div className="h-screen flex justify-center items-center">
        <div className="w-1/3 shadow-xl rounded-xl p-7">
          <h2 className="text-xl text-center mb-6 font-semibold">Login</h2>
          <form onSubmit={handleSubmit(handleLogin)}>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Email</span>
              </label>
              <input
                type="text"
                className="input input-bordered"
                {...register("email")}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Password</span>
              </label>
              <input
                type="password"
                className="input input-bordered"
                {...register("password")}
              />
              <label className="label font-semibold">
                <a href=" " className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-4">
              <input className="btn btn-accent" type="submit" value="Login" />
            </div>
          </form>
          <p className="text-center py-3 text-sm">
            New to Doctors Portal?{" "}
            <Link to="/signUp" className="text-primary">
              Create new account
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

export default Login;