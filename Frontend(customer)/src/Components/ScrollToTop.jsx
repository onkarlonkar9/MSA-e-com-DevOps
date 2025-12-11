import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);// get the top of the page
  }, [pathname]);

  return null; // This component doesn't render anything
}
