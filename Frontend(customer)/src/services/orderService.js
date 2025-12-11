// import required modules
import axiosInstance from "../utils/axios.js";


export async function getOrders(){
    // fetch order 
    try {
        const {data} = await axiosInstance.get(`/order`,{withCredentials:true});

        return data;

    } catch (error) {
        // if any error occurs
        console.error(error);
    }
}