// import required modules
import axiosInstance from "../utils/axios.js";

export async function addToCart(productId){
        const res = await axiosInstance.post(`/add/${productId}`,{},{
            withCredentials:true
        });
        return res.data;
};

export async function getCartInfo(){
    // get method takes only two arguments
    const res = await axiosInstance.get(`/cart`,{
        withCredentials:true
    });
    return res.data;
};

export async function deleteCartProducts(productId){
    // delete can take 3 arguments but that optional
    const res = await axiosInstance.delete(`/remove/${productId}`,{
        withCredentials:true
    });

    return res.data;
};