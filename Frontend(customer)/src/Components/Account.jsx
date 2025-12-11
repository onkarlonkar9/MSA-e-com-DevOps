import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { FiEdit, FiSave, FiX } from "react-icons/fi";
import toast from "react-hot-toast";
import Loader from "./Loader";
import Error from "./Error";
import { useNavigate } from "react-router-dom";
import {
  deleteCustomerAccount,
  fetchCustomerData,
  updateCustomerData,
} from "../services/accountService";

export default function Account() {
  const queryClient = useQueryClient(); // get queryClient
  const navigate = useNavigate(); // get for navigation
  // destructure useQuery
  const {
    data: customer,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["customerData"],
    queryFn: fetchCustomerData,
  });

  // Form handling
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm({
    defaultValues: customer || {},
  });
  // state for monitor user is editing or not
  const [isEditing, setIsEditing] = useState(false);

  // Initialize form with customer data when loaded or changes
  useEffect(() => {
    if (customer) {
      reset(customer);
    }
  }, [customer, reset]);

  // update the account details
  const updateAnAccount = useMutation({
    mutationFn: updateCustomerData,
    onSuccess: () => {
      toast.success("Account Updated Successfully!!");
      setIsEditing(false);
      queryClient.invalidateQueries(["customerData"]);
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.response?.data?.message);
    },
  });

  // for deleting the customer account
  const deleteAnAccount = useMutation({
    mutationFn: deleteCustomerAccount,
    onSuccess: () => {
      toast.success("Account Deleted Successfully!!");
      navigate("/login");
    },
    onError: (error) => {
      console.error(error);
      toast.error(error.response?.data?.message);
    },
  });

  // function for setting edit value to true
  function handleEdit() {
    setIsEditing(true);
  }

  // function for if user don't want to edit info
  function handleCancel() {
    reset(customer);
    setIsEditing(false);
  }

  // function for submitting the form
  async function onSubmit(Data) {
    updateAnAccount.mutate(Data);
  }

  // if data is still loading
  if (isLoading) return <Loader />;

  // if any error occurs
  if (isError) return <Error />;

  return (
    <div className="max-w-screen  mx-auto px-1 py-1 select-none">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Header */}
        <div className="bg-indigo-600 px-6 py-4 ">
          <h1 className="text-2xl font-bold text-white">My Account</h1>
        </div>

        {/* Account Details */}
        <div className="p-6">
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Profile Section */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  Personal Information
                </h2>
                {!isEditing ? (
                  <button
                    type="button"
                    onClick={handleEdit}
                    className="flex items-center text-indigo-600 hover:text-indigo-800 cursor-pointer"
                  >
                    <FiEdit className="mr-1" /> Edit
                  </button>
                ) : (
                  <div className="flex space-x-2">
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="flex items-center text-gray-600 hover:text-gray-800 cursor-pointer"
                    >
                      <FiX className="mr-1" /> Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={!isDirty}
                      className="flex items-center bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700 disabled:bg-indigo-300 cursor-pointer"
                    >
                      <FiSave className="mr-1" /> Save
                    </button>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                {/* Full Name */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <label
                    htmlFor="fullName"
                    className="text-gray-600 font-medium"
                  >
                    Full Name
                  </label>
                  {isEditing ? (
                    <div className="col-span-2">
                      <input
                        id="fullName"
                        {...register("fullName", {
                          required: "Full name is required",
                        })}
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500 "
                      />
                      {errors.fullName && (
                        <p className="text-red-500 text-sm mt-1 ">
                          {errors.fullName.message}
                        </p>
                      )}
                    </div>
                  ) : (
                    <p className="col-span-2 text-gray-800 font-semibold">
                      {customer?.fullName}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <label htmlFor="email" className="text-gray-600 font-medium">
                    Email
                  </label>
                  {isEditing ? (
                    <div className="col-span-2">
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
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                  ) : (
                    <p className="col-span-2 text-gray-800 font-semibold">
                      {customer?.email}
                    </p>
                  )}
                </div>

                {/* Contact Number */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <label
                    htmlFor="contactNumber"
                    className="text-gray-600 font-medium"
                  >
                    Contact Number
                  </label>
                  {isEditing ? (
                    <div className="col-span-2">
                      <input
                        id="contactNumber"
                        {...register("contactNumber", {
                          required: "Contact number is required",
                          pattern: {
                            value: /^[0-9]{10}$/, // validate only number and 10 digits
                            message: "Invalid Phone number!",
                          },
                        })}
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      />
                      {errors.contactNumber && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.contactNumber.message}
                        </p>
                      )}
                    </div>
                  ) : (
                    <p className="col-span-2 text-gray-800 font-semibold">
                      {customer?.contactNumber}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </form>

          {/* Account Actions */}
          <div className="border-t border-gray-200 pt-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Account Actions
            </h2>
            <div className="flex flex-wrap gap-4">
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition cursor-pointer">
                Change Password
              </button>
              <button
                onClick={() => {
                  const isConfirmed = window.confirm(
                    `Do you really want to delete your account? This action can't be reverted back!`
                  );
                  if (isConfirmed) {
                    deleteAnAccount.mutate();
                  }
                }}
                className="px-4 py-2 bg-red-50 text-red-600 rounded hover:bg-red-100 transition cursor-pointer"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
