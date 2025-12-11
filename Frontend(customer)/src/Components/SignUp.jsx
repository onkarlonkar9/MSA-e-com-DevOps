import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useState } from "react";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import axiosInstance from '../utils/axios.js';

export default function SignUp() {
  const navigate = useNavigate();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function handlePasswordVisibility () {
    setIsPasswordVisible((prev) => !prev);
  };

   async function onSubmit(data) {
    setIsLoading(true);
    try {
      const res = await axiosInstance.post("/signup",
        data,
        {
          withCredentials: true,
        }
      );
      if (res.data) {
        toast.success("Account created successfully!");
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden select-none">
        {/* Header */}
        <div className="bg-indigo-600 p-6 text-center">
          <h1 className="text-3xl font-bold text-white">MSA</h1>
          <p className="mt-2 text-indigo-100">Create your account</p>
        </div>

        {/* Form */}
        <div className="p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Full Name */}
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <div className="mt-1">
                <input
                  id="fullName"
                  type="text"
                  {...register("fullName", {
                    required: "Full name is required",
                  })}
                  autoComplete="name"
                  className="block w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
                {errors.fullName && (
                  <p className="mt-1 text-sm text-red-600 font-semibold">
                    {errors.fullName.message}!
                  </p>
                )}
              </div>
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  autoComplete="email"
                  className="block w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600 font-semibold">
                    {errors.email.message}!
                  </p>
                )}
              </div>
            </div>

            {/* Phone Number */}
            <div>
              <label
                htmlFor="contactNumber"
                className="block text-sm font-medium text-gray-700"
              >
                Phone Number
              </label>
              <div className="mt-1">
                <input
                  id="contactNumber"
                  type="tel"
                  maxLength={10}
                  {...register("contactNumber", {
                    required: "Phone number is required",
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: "Must be 10 digits",
                    },
                  })}
                  className="block w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
                {errors.contactNumber && (
                  <p className="mt-1 text-sm text-red-600 font-semibold">
                    {errors.contactNumber.message}!
                  </p>
                )}
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex justify-between items-center">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <button
                  type="button"
                  onClick={handlePasswordVisibility}
                  className="text-sm text-indigo-600 hover:text-indigo-500 cursor-pointer"
                >
                  {isPasswordVisible ? "Hide" : "Show"}
                </button>
              </div>
              <div className="mt-1 relative">
                <input
                  id="password"
                  type={isPasswordVisible ? "text" : "password"}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 5,
                      message: "Password must be at least 5 characters",
                    },
                  })}
                  className="block w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 "
                />
                <button
                  type="button"
                  onClick={handlePasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500 cursor-pointer"
                >
                  {isPasswordVisible ? (
                    <FaRegEyeSlash className="h-5 w-5" />
                  ) : (
                    <FaRegEye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600 font-semibold">
                  {errors.password.message}!
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer ${
                  isLoading ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {isLoading ? "Creating account..." : "Register"}
              </button>
            </div>
          </form>

          {/* Footer Links */}
          <div className="mt-6 text-center text-sm">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
