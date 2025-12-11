// import required modules

import { useMutation } from "@tanstack/react-query";
import { verifyPayment } from "../services/paymentService";


export default function useVerifyPayment(){
    return useMutation({
        mutationFn:verifyPayment
    });
};

