import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../stores/authStore"
import { useRef } from "react";
import toast from "react-hot-toast";

function ProtectedRoute({children}) {
    // get isAuthentication from localStorage to check user is loggedIn or not!
    const isAuthenticated = useAuthStore((state)=>state.isAuthenticated);

    // get location from useLocation hook to track path
    const location = useLocation();

    // to store memory for toast was shown or not
    const hasShownToastRef = useRef(false);

    // if user is unauthenticated then redirect them to login page
    if (!isAuthenticated){
        // if toast is not shown then show otherwise redirect
        if (!hasShownToastRef.current){
            toast.dismiss();
            toast.error("Please Login First!");
            hasShownToastRef.current = true;
        }

        // navigate to login with memorize/keep in mind from where we came 
        return <Navigate to='/login' state={{from:location}} replace/>;
    }
    return children;
}

export default ProtectedRoute;
