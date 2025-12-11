// import required modules
import axiosInstance from "../utils/axios.js";


export async function getVendorOrders(){
    try {
        const {data} = await axiosInstance.get("/orders", {
          withCredentials: true,
        });

        console.log(data);
        return data;
    } catch (error) {
        // if any error occurs
        console.error(error);
    }
}