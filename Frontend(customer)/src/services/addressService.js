// import required modules
import axiosInstance from "../utils/axios.js";

// function for get all addresses
export async function getAddresses() {
  try {
    // fetch the all addresses from BE
    const res = await axiosInstance.get(`/address`, {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    // if any error occurs
    console.error(
      "Error while fetching addresses :",
      error.response?.data?.message
    );
    throw error;
  }
}

//add an address
export async function addAnNewAddress(data) {
  try {
    // create a post request to BE
    const res = await axiosInstance.post(`/address`, data, {
      withCredentials: true,
    });
    // return the data
    return res.data;
  } catch (error) {
    // if any error occurs
    console.error(
      "Error while adding an address:",
      error.response?.data?.message
    );
    throw error;
  }
}

// update an address

export async function updateAnAddress({ addressId, data }) {
  try {
    // send request to BE with addressId
    const res = await axiosInstance.put(`/address/${addressId}`, data, {
      withCredentials: true,
    });

    // return the data
    return res.data;
  } catch (error) {
    // if any error occurs
    console.error(
      "Error while updating an address:",
      error.response?.data?.message
    );
    throw error;
  }
}

// delete an address
export async function deleteAnAddress(addressId) {
  try {
    // send request to BE with addressId
    const res = await axiosInstance.delete(`/address/${addressId}`, {
      withCredentials: true,
    });

    // return the data
    return res.data;
  } catch (error) {
    // if any error occurs
    console.error(
      "Error while deleting an address:",
      error.response?.data?.message
    );
    throw error;
  }
}

// set an address
export async function setDefaultAddress(addressId, data) {
  try {
    // send request to BE with addressId
    const res = await axiosInstance.post(`/address/${addressId}`, data, {
      withCredentials: true,
    });

    return res.data;
  } catch (error) {
    // if any error occurs
    console.error(
      "Error while setting default address:",
      error.response?.data?.message
    );
    throw error;
  }
}

// get default address

export async function getDefaultAddress() {
  try {
    // fetch the default address from BE
    const res = await axiosInstance.get(`/defaultAddress`, {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    // if any error occurs
    console.error(
      "Error while fetching addresses :",
      error.response?.data?.message
    );
    throw error;
  }
}
