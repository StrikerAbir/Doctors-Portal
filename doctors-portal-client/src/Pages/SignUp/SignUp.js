import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import useToken from "../../Hooks/useToken";
import GoogleLogin from "../../Shared/GoogleLogin";
const SignUp = () => {
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const [signUpError, setSignUpError] = useState(null);

  const [createdUserEmail, setCreatedUserEmail] = useState(null);
  // custom hook
  const [token] = useToken(createdUserEmail);
  const navigate = useNavigate();

  if (token) {
    navigate("/");
  }

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const handleSignUp = (data) => {
    setSignUpError(null);
    console.log(data);
    createUser(data.email, data.password)
      .then((result) => {
        const user = result.user;
        const userInfo = {
          displayName: data.name,
        };
        // console.log(userInfo);
        updateUserProfile(userInfo)
          .then(() => {
            saveUser(data.name, data.email);
          })
          .catch((err) => console.error(err));
        toast.success("User created successfully..");
      })
      .catch((err) => {
        console.error(err);
        setSignUpError(err.message);
        toast.error(err.message);
      });
  };

  const saveUser = (name, email) => {
    const user = { name, email };
    fetch("https://doctors-portal-server-mocha-phi.vercel.app/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        setCreatedUserEmail(email);
        // console.log("save user", data);
        // getUserToken(email)
      });
  };

  // const getUserToken = (email) => {
  //   fetch(`https://doctors-portal-server-mocha-phi.vercel.app/jwt?email=${email}`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       if (data.accessToken) {
  //         localStorage.setItem('accessToken',data.accessToken)
  //       }
  //     });
  // };

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
                pattern: {
                  value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/,
                  message:
                    "Password must have one (capital letter , special characters and number.).",
                },
              })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">
                <small>{errors.password?.message}</small>
              </p>
            )}
          </div>
          <div>
            {signUpError && (
              <p className="text-red-500 text-sm">
                <small>{signUpError}</small>
              </p>
            )}
          </div>
          <div className="form-control mt-4">
            <input className="btn btn-accent" type="submit" value="SignUp" />
          </div>
        </form>
        <p className="text-center py-3 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-primary">
            Login
          </Link>
        </p>
        <div className="divider">OR</div>
        <div>
          <GoogleLogin></GoogleLogin>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
