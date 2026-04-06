import React, { useContext, useState } from "react";
import { Eye, EyeOff, Zap } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { Auth } from "../context/AuthContext";
import { toast } from "react-toastify";
const Login = () => {

    let navigate = useNavigate();

    let {registeredUsers, setLoggedInUser} =useContext(Auth)

  let {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
  });
  const [showPassword, setShowPassword] = useState(false);

  let handleFormSubmit = (data) => {
    
    let user = registeredUsers.find(
      (user) => user.email === data.email && user.password === data.password
    );
    if(!user){
        toast.error("User not found!")
        return;
    }

    setLoggedInUser(user);
    localStorage.setItem("loggedInUser", JSON.stringify(user));
    toast.success("Logged in successfully!");
    navigate("/dashboard");
    reset();
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="w-full max-w-md px-6">
        <div className="flex items-center justify-center gap-2 mb-12">
          <div className="bg-lime-400 rounded-lg p-2">
            <Zap className="w-6 h-6 text-black" />
          </div>
          <span className="text-2xl font-bold text-white">Sky<span className="text-lime-400">Mart</span></span>
        </div>

        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="border border-gray-700 rounded-2xl p-8 bg-black/50 backdrop-blur"
        >
          <h1 className="text-3xl font-bold text-white mb-2">Sign in</h1>
          <p className="text-gray-400 text-sm mb-8">
            Enter your credentials to continue
          </p>

          <div className="mb-6">
            <input
              type="email"
              id="email"
              placeholder="Email address"
              {...register("email", { required: "Email is required" })}
              className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-lime-400 transition-colors"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="mb-8 relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              {...register("password", { required: "Password is required" })}
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
          </div>
          <button
            disabled={!isValid}
            className="w-full bg-lime-400 text-black font-bold py-3 rounded-full flex items-center justify-center gap-2 hover:bg-lime-300 transition-colors mb-6"
          >
            Sign in
          </button>
          <p className="text-center text-gray-400 text-sm">
            Don't have an account?{" "}
            <a
              onClick={()=>navigate("/register")}
              className="text-lime-400 hover:text-lime-300 transition-colors font-medium cursor-pointer"
            >
              Create one
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
