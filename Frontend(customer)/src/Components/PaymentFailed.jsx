import { useState } from "react";
import {
  XCircleIcon,
  ArrowPathIcon,
  ShoppingBagIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";
import { useLocation, Link} from "react-router-dom";

const PaymentFailed = ({ show = true }) => {

  const { state } = useLocation();
  
  const {
    data
  } = state || {};

  const [isVisible] = useState(true);

  if (!show && !isVisible) return null;

  return (
    <div className="min-w-screen min-h-screen bg-stone-100 bg-opacity-50 flex items-center justify-center z-50 p-4 transition-opacity duration-300 opacity-100">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-lg w-full transform transition-all duration-500 scale-100 opacity-100">
        <div className="bg-gradient-to-r from-red-400 to-orange-500 p-1">
          <div className="bg-red-50 rounded-xl rounded-b-none p-8">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-red-200 rounded-full animate-ping"></div>
                <XCircleIcon className="w-20 h-20 text-red-600 relative z-10" />
              </div>
            </div>

            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Order Not Placed!!
              </h2>
              <p className="text-gray-600 font-semibold">
                Please try again.
              </p>
            
                <p className="text-red-500 text-sm mt-2 bg-red-100 p-2 rounded-md font-medium">
                {data || "Error while processing your payment!!"}
                </p>
            </div>
          </div>
        </div>

       

          <div className="bg-yellow-50 rounded-xl p-4 mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
              <PhoneIcon className="w-5 h-5 mr-2 text-yellow-600" />
              Need Help?
            </h3>
            <p className="text-gray-700">
              If you're experiencing issues with your payment, please contact
              our support team at{" "}
              <a
                target="_blank"
                href="iamganeshsalunkhe@gmail.com"
                className="text-blue-600 hover:underline"
              >
                support@example.com
              </a>{" "}
              or call us at{" "}
              <span
                className="text-blue-600 hover:underline"
              >
                +91 1234567890
              </span>
              .
            </p>
          </div>

          <div className="p-4 flex flex-col sm:flex-row gap-4">
            <Link
                to='/cart'                
              className="btn  bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 px-6 rounded-xl font-medium flex items-center justify-center hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 transform hover:-translate-y-1 flex-1 h-12 "
            >
              <ArrowPathIcon className="w-5 h-5 mr-2 " />
              Try Again
            </Link>
            <Link
              to="/"
              className="btn border border-green-100 bg-green-600  py-3 px-6 rounded-xl font-medium flex items-center justify-center  transition-all duration-300 flex-1  text-center hover:bg-emerald-800 translate hover:-translate-y-1 text-white h-12"
            >
              <ShoppingBagIcon className="w-5 h-5 mr-2" />
              Continue Shopping
            </Link>
          </div>
        </div>

        <Link
          to="/products"
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors duration-300 cursor-pointer"
        >
          <XCircleIcon className="w-6 h-6" />
        </Link>
      </div>
    
  );
};

export default PaymentFailed;
