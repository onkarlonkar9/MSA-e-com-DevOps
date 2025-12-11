// import required modules

import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";

const pageTitles = {
  "/": "Home | MSA",
  "/signup": "Register | MSA",
  "/login": "Login | MSA ",
  "/account": "Account | MSA",
  "/about": "About Us | MSA",
  "/cart": "Cart | MSA",
  "/products": "Products | MSA",
  "/orders": "Orders | MSA",
  "/address": "Addresses | MSA",
  "/paymentsuccess": "Order Confirmed | MSA",
  "/paymentfailed": "Order Failed | MSA",
  "*": "Page Not Found - MSA ",
};


export default function usePageTitle() {
  const location = useLocation();
  const params = useParams();
    
  useEffect(() => {
    let title = pageTitles[location.pathname] || "MSA ";

    document.title = title;
  }, [location, params]);
  
  return null;

}