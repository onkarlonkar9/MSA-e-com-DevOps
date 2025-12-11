// import required modules
import axiosInstance from "../utils/axios.js";

// request to BE for creating an order
export async function createOrder(){
    try {
        // make post request to BE to create razorpay_order_id
        const res = await axiosInstance.post(`/createOrder`,{},{
            withCredentials:true
        }
        );
        return res.data;     
           
    } catch (error) {
        // if any error occurs
        console.error(error);
    }
};

// request to BE for verifying payment
export async function verifyPayment(paymentData){
    try {
        // make a post request to verify payment
        const res = await axiosInstance.post(`/verifyPayment`,{paymentData},{withCredentials:true});
        return res.data;
    } catch (error) {
        // if any error occurs
        console.error(error);
    }
};

// extract order status after confirming payment 
export async function orderStatus(orderId){
    try {
        // make a get request to fetch order status 
        const res = await axiosInstance.get(`/order/${orderId}/status`,{withCredentials:true});
        console.log(res.data);
        return res.data;
    } catch (error) {
        // if any error occurs
        console.error(error);
    }
}