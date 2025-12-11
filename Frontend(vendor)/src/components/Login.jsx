import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axios.js";

function Login() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // handle password visibility
  function handlePassword() {
    setIsPasswordVisible((prev) => !prev);
  }

  async function onSubmit(data) {
    try {
      await axiosInstance
        .post("/login", data, { withCredentials: true })
        .then((res) => {
          if (res.data) {
            toast.success("Logged in successfully");
          }
        });
      navigate("/account");
    } catch (error) {
      if (error.response) {
        toast.error(error.response?.data?.message);
      }
    }
  }

  return (
    <div className=" relative flex min-h-screen items-center justify-start px-5 py-4 bg-grey-200 select-none ">
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage:
            "url('https://plus.unsplash.com/premium_photo-1661658716217-3607ea935880?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODF8fG1vYmlsZSUyMHBob25lfGVufDB8MHwwfHx8MA%3D%3D')",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-30" />
      </div>
      <div className=" relative z-10 bg-gray-100 w-full max-w-xl  bg-opacity-90  shadow-2xl rounded-xl px-2 py-4 ml-4 md:ml-12 lg:ml-24 h-full border-1">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm ">
          <h1 className="text-center text-4xl font-bold font-serif tracking-wider">
            MSA
          </h1>
          <h4 className="text-center mt-3 font-bold font-sans">
            Grow with us!!!
          </h4>
          <h2 className="mt-7 text-center text-2xl/9 font-bold  text-gray-900">
            Log in as Vendor
          </h2>
        </div>

        <div className="mt-7 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* get email from user */}
            <div>
              <label
                htmlFor="email"
                className="block text-xl font-medium text-gray-900"
              >
                Email address
              </label>
              <input
                id="email"
                type="email"
                {...register("email", { required: true })}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-xl text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-600 focus:outline-3 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 mt-2 font-medium "
              />
            </div>

            {/* get password from user */}
            <div className="relative">
              <label
                htmlFor="password"
                className="block text-xl font-medium text-gray-900"
              >
                Password
              </label>
              <input
                id="password"
                type={isPasswordVisible ? "text" : "password"}
                {...register("password", { required: true, minLength: 3 })}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-xl text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-600 focus:outline-3 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 mt-2 font-medium "
              />
              <div
                className="absolute right-2 top-3/4   transform -translate-y-1/2 cursor-pointer text-grey-300"
                onClick={handlePassword}
              >
                {isPasswordVisible ? <FaRegEyeSlash /> : <FaRegEye />}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-md font-bold text-white shadow-xs hover:bg-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer"
              >
                Login
              </button>
            </div>
          </form>
          <div>
            <p className="mt-7 text-center text-md text-gray-700 font-serif mb-4 font-semibold select-none">
              Don't have account with us?
              <Link
                to="/signup"
                className="font-semibold text-indigo-500 hover:text-indigo-900 px-1"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
