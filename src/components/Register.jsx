import React, { useContext, useState } from "react";
import { Eye, EyeOff, Zap } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { Auth } from "../context/AuthContext";
import { toast } from "react-toastify";

const Register = () => {

    let navigate = useNavigate();

    let {setRegisteredUsers, registeredUsers} = useContext(Auth);


  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isValid },
  } = useForm({
      mode: "onChange",
    });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const password = watch("password");

  const handleFormSubmit = (data) => {
    let newUser =[...registeredUsers, data];
    setRegisteredUsers(newUser);
    localStorage.setItem("registeredUsers", JSON.stringify(newUser));
    toast.success("User Registered successfully!");
    reset();
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="w-full max-w-md px-6">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-12">
          <div className="bg-lime-400 rounded-lg p-2">
            <Zap className="w-6 h-6 text-black" />
          </div>
           <span className="text-2xl font-bold text-white">Sky<span className="text-lime-400">Mart</span></span>
        </div>

        {/* Form Container */}
        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="border border-gray-700 rounded-2xl p-8 bg-black/50 backdrop-blur"
        >
          {/* Heading */}
          <h1 className="text-3xl font-bold text-white mb-2">Sign up</h1>
          <p className="text-gray-400 text-sm mb-8">
            Create your account to get started
          </p>

          {/* Name Input */}
          <div className="mb-6">
            <input
              type="text"
              id="name"
              placeholder="Full name"
              {...register("name", { required: "Full name is required" })}
              className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-lime-400 transition-colors"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Email Input */}
          <div className="mb-6">
            <input
              type="email"
              id="email"
              placeholder="Email address"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-lime-400 transition-colors"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Input */}
          <div className="mb-6 relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-lime-400 transition-colors"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-400 transition-colors"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>


          <button
            disabled={!isValid}
            className="w-full bg-lime-400 text-black font-bold py-3 rounded-full flex items-center justify-center gap-2 hover:bg-lime-300 transition-colors mb-6"
          >
            Register
          </button>

          {/* Sign In Link */}
          <p className="text-center text-gray-400 text-sm">
            Already have an account?{" "}
            <a
              onClick={()=>navigate("/")}
              className="text-lime-400 hover:text-lime-300 transition-colors font-medium cursor-pointer"
            >
              Sign in
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
