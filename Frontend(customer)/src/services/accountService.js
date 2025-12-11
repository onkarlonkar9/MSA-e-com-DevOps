//  import required modules
import axiosInstance from '../utils/axios.js';

// fetch customer Data
export async function fetchCustomerData() {
  try {
    // get the data of the customer
    const res = await axiosInstance.get(`/account`, {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    // if any error occurs
    console.error(error);
  }
}

//function for updating an account info
export async function updateCustomerData(formData) {
  try {
    const res = await axiosInstance.put(`/account`, formData, {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    // if any error occurs
    console.error(error);
  }
}

// function for deleting the customer Account
export async function deleteCustomerAccount() {
  try {
    const res = await axiosInstance.delete(`/account`, {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    // if any error occurs
    console.error(error);
  }
};
