import { useForm } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useEffect } from "react";
import Loader from "./Loader";
import Error from "./Error";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import axiosInstance from "../utils/axios.js";

// function for fetching account details of loggedin user
async function fetchVendorData() {
  try {
    const res = await axiosInstance.get("/account", {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    console.log(error);
    console.error(error.response?.data?.message);
  }
}

// function for updating an account
async function updateVendorData(formData) {
  try {
    const res = await axiosInstance.put("/account",
      formData,
      { withCredentials: true }
    );
    return res.data;
  } catch (error) {
    console.error(error);
  }
}

// function for deleting an account
async function deleteVendorAccount(vendorId) {
  try {
    const res = await axiosInstance.delete("/account", {
      data: { vendorId },
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

function Account() {
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["vendorData"],
    queryFn: fetchVendorData,
  });

  const { register, handleSubmit, reset,formState:{isDirty} } = useForm({
    defaultValues: {
      email: "",
      vendorName: ""
    },
  });

  // update the account details
  const updateAccount = useMutation({
    mutationFn: updateVendorData,
    onSuccess: () => {
      toast.success("Account updated successfully!");
      queryClient.invalidateQueries(["vendorData"]);
    },
    onError: (error) => {
      console.log(error);
      const message =
        error.response?.data?.message || "Failed to update account info";
      toast.error(message);
    },
  });

  const deleteAccount = useMutation({
    mutationFn: deleteVendorAccount,
    onSuccess: () => {
      toast.success("Account deleted successfully");
      navigate("/login");
    },
    onError: (error) => {
      console.error(error);
      const message =
        error.response?.data?.message || "Failed to delete account";
      toast.error(message);
    },
  });

  useEffect(() => {
    if (data) {
      reset({
        email: data.email,
        vendorName: data.vendorName,
      });
    }
  }, [data, reset]);

  // function for updating profile data
  function onSubmit(formData) {
    updateAccount.mutate(formData);
  }

  // function for handling upload
  function handleUploadClick() {
    fileInputRef.current.click();
  }

  // function for adding brandLogo
  async function handleFileChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    // create new formData
    const formData = new FormData();

    formData.append("brandLogo", file);

    try {
      await axiosInstance.post("/brandLogo", formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      queryClient.invalidateQueries(["vendorData"]);
      toast.success("Brand-Logo Added Successfully!");
    } catch (error) {
      console.error("Upload error:", error.response?.data || error.message);
    }
  }

  // function for deleting brandLogo
  async function handleDeleteLogo() {
    try {
      await axiosInstance.delete("/brandLogo", {
        withCredentials: true,
      });

      toast.success("Brand-Logo Deleted Successfully!");
      queryClient.invalidateQueries(["vendorData"]);
    } catch (error) {
      console.error(error);
    }
  }

  if (isLoading) return <Loader />;
  if (isError) return <Error />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 mt-15">
      <div className="max-w-2xl mx-auto bg-gray-50 rounded-xl shadow-lg overflow-hidden">
        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">My Account</h2>
            <p className="text-gray-600 mt-2">
              Manage your vendor account details
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Email:
              </label>
              <input
                type="email"
                {...register("email")}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                placeholder="Your email address"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Vendor Name:
              </label>
              <input
                type="text"
                {...register("vendorName")}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                placeholder="Your business name"
              />
            </div>

            <div className="space-y-4 pt-4">
              <label className="block text-sm font-semibold text-gray-700">
                Brand Logo:
              </label>
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="flex-shrink-0">
                  {data.brandLogo ? (
                    <img
                      src={data.brandLogo}
                      width={120}
                      height={120}
                      loading="lazy"
                      className="rounded-lg object-cover border-2 border-gray-200"
                      alt="Brand logo"
                    />
                  ) : (
                    <div className="w-32 h-32 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50">
                      <span className="text-gray-400 text-sm">No Logo</span>
                    </div>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    onClick={handleUploadClick}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {data.brandLogo ? "Change Logo" : "Upload Logo"}
                  </button>

                  {data.brandLogo && (
                    <button
                      type="button"
                      onClick={handleDeleteLogo}
                      className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Remove
                    </button>
                  )}
                </div>

                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />
              </div>
            </div>

            <div className="pt-6 flex flex-col sm:flex-row gap-4">
              <button
              disabled={!isDirty}
                type="submit"
                className={` flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg transition font-medium flex items-center justify-center gap-2 ${isDirty ? "bg-blue-600 hover:bg-blue-700 text-white":"cursor-not-allowed bg-gray-500"}`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Save Changes
              </button>

              <button
                type="button"
                onClick={() => {
                  const isConfirmed = window.confirm(
                    "Are you sure you want to delete your account? This action cannot be undone."
                  );
                  if (isConfirmed) {
                    deleteAccount.mutate(data.vendorId);
                  }
                }}
                className="flex-1 bg-red-100 text-red-600 py-3 px-6 rounded-lg hover:bg-red-200 transition font-medium flex items-center justify-center gap-2 cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                Delete Account
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Account;
