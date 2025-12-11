// import required modules
import axiosInstance from "../utils/axios.js";

export const fetchProducts = async () => {
    // fetch all the products
 try {
     const { data } = await axiosInstance.get("/product");
     return data;
 } catch (error) {
    // if any error occurs
    console.error(error);
    throw error;
 }
};