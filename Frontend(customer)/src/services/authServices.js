// import required module
import axiosInstance from "../utils/axios.js";

export const getCurrentUser = async()=>{
    const res = await axiosInstance.get(`/me`,{
        withCredentials:true
    });
    return res.data;
};