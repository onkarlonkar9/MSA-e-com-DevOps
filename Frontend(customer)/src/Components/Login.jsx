import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import { useAuthStore } from "../stores/authStore";
import { useCartStore } from "../stores/cartStore";
import { getCartInfo } from "../services/cartService";
import { useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../utils/axios.js";

function Login() {
  // get navigate for navigation
  const navigate = useNavigate();
  // from tracing path
  const location = useLocation();

  // create queryClient instance
  const queryClient = useQueryClient();
  
  // state for password visibility
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // state for loading
  const [isLoading, setIsLoading] = useState(false);

  // redirect to page from user came else redirect to home page
  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function handlePasswordVisibility() {
    setIsPasswordVisible((prev) => !prev);
  };

  async function onSubmit(data){
    setIsLoading(true);
    try {
      const res = await axiosInstance.post("/login",
        data,
        { withCredentials: true }
      );
      if (res.data) {
        // get cart data to sync with localstorage
        const dbCart = await getCartInfo();

        // from data extract required fields
        const simplified = dbCart.map((item)=>{
          return{
            productId:item.product?.productId,
            productName:item.product?.productName
          }
        });
        queryClient.invalidateQueries(['me']);
        useAuthStore.getState().login(); // set isAuthentication to true
        useCartStore.getState().setItems(simplified); // set localstorage data
        toast.success("Logged in successfully"); // show success toast
        navigate(from,{replace:true}); 
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden select-none">
        {/* Header */}
        <div className="bg-indigo-600 p-6 text-center ">
          <h1 className="text-3xl font-bold text-white">MSA</h1>
          <p className="mt-2 text-indigo-100">Sign in to your account</p>
        </div>

        {/* Form */}
        <div className="p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-md font-medium text-gray-700"
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
                  <p className="mt-1 text-sm font-semibold text-red-600">
                    {errors.email.message}!
                  </p>
                )}
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex justify-between items-center">
                <label
                  htmlFor="password"
                  className="block text-md font-medium text-gray-700"
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
                  })}
                  className="block w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
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
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer ${
                  isLoading ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {isLoading ? "Signing in..." : "Sign in"}
              </button>
            </div>
          </form>

          {/* Footer Links */}
          <div className="mt-6 text-center text-sm">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Register now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
