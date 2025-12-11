// import required modules
import { useState } from "react";
import {
  FiSearch,
  FiHome,
  FiShoppingCart,
  FiUser,
  FiMenu,
  FiX,
  FiBox,
  FiInfo,
  FiLogOut,
  FiShoppingBag,
  FiMapPin,
  FiUserCheck,
} from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "../stores/authStore";
import toast from "react-hot-toast";
import { useCartStore } from "../stores/cartStore";
import axiosInstance from "../utils/axios.js";

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const cartLength = useCartStore((state) => state.getLengthOfCart());
  const authData = JSON.parse(localStorage.getItem("authSession"));
  const isAuthenticated = authData?.state?.isAuthenticated === true;

  async function handleClickOnLogout(item) {
    setIsDropdownOpen(false);

    if (item.action) {
      try {
        await axiosInstance.post(
          "/logout",
          {},
          { withCredentials: true }
        );

        navigate("/login", { state: { fromLogout: true } });
        queryClient.clear();
        useCartStore.getState().clearCart();
        useAuthStore.getState().logout();
        toast.success("Logged Out Successfully!");
      } catch (error) {
        console.error(error);
        toast.error(error.response?.data?.message);
      }
    } else {
      navigate(item.path);
    }
  }

  const navItems = [
    { name: "Home", path: "/", icon: <FiHome className="text-lg" /> },
    {
      name: "Products",
      path: "/products",
      icon: <FiBox className="text-lg" />,
    },
    { name: "About", path: "/about", icon: <FiInfo className="text-lg" /> },
  ];

  const dropdownItems = [
    {
      name: "Account",
      path: "/account",
      icon: <FiUserCheck className="mr-2" />,
    },
    {
      name: "Orders",
      path: "/orders",
      icon: <FiShoppingBag className="mr-2" />,
    },
    {
      name: "Addresses",
      path: "/address",
      icon: <FiMapPin className="mr-2" />,
    },
    {
      name: "Logout",
      path: null,
      action: true,
      icon: <FiLogOut className="mr-2" />,
    },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and desktop nav */}
          <div className="flex items-center">
            <Link
              to="/"
              className="flex-shrink-0 flex items-center select-none"
            >
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                MSA
              </span>
            </Link>

            <div className="hidden sm:ml-8 sm:flex sm:space-x-6 select-none">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="text-gray-600 hover:text-blue-600 inline-flex items-center px-1 pt-1 text-sm font-medium transition-colors duration-200 group"
                >
                  <span className="mr-1 opacity-80 group-hover:opacity-100">
                    {item.icon}
                  </span>
                  {item.name}
                  <span className="block max-w-0 group-hover:max-w-full transition-all duration-300 h-0.5 bg-blue-600"></span>
                </Link>
              ))}
            </div>
          </div>

          {/* Right side icons */}
          <div className="flex items-center gap-4 select-none">
            {/* Cart */}
            <Link
              to="/cart"
              className="p-2 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-blue-50 relative transition-colors duration-200"
            >
              <FiShoppingCart className="h-5 w-5" />
              {isAuthenticated && Number(cartLength) > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartLength}
                </span>
              )}
            </Link>

            {/* Profile dropdown */}
            <div className="ml-3 relative">
              {isAuthenticated ? (
                <div>
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer transition-all duration-200 hover:ring-2 hover:ring-blue-100"
                  >
                    <div className="h-9 w-9 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white">
                      <FiUser className="h-4 w-4" />
                    </div>
                  </button>

                  {isDropdownOpen && (
                    <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-lg shadow-lg py-2 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50 border border-gray-100">
                      {dropdownItems.map((item) => (
                        <div
                          key={item.name}
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 cursor-pointer transition-colors duration-150"
                          onClick={() => handleClickOnLogout(item)}
                        >
                          {item.icon}
                          {item.name}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => navigate("/login")}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 hover:from-blue-700 hover:to-purple-700 transition-all duration-200 cursor-pointer rounded-lg text-white shadow-md hover:shadow-lg font-medium"
                >
                  Login
                </button>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-blue-50 focus:outline-none transition-colors duration-200"
            >
              {isMobileMenuOpen ? (
                <FiX className="h-6 w-6" />
              ) : (
                <FiMenu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="sm:hidden bg-white border-t border-gray-100">
          <div className="pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="flex items-center text-gray-600 hover:text-blue-600 hover:bg-blue-50 pl-3 pr-4 py-3 text-base font-medium transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="mr-3">{item.icon}</span>
                {item.name}
              </Link>
            ))}

            {isAuthenticated && (
              <div className="border-t border-gray-100 pt-2">
                {dropdownItems.map((item) => (
                  <div
                    key={item.name}
                    className="flex items-center text-gray-600 hover:text-blue-600 hover:bg-blue-50 pl-3 pr-4 py-3 text-base font-medium transition-colors duration-200 cursor-pointer"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      handleClickOnLogout(item);
                    }}
                  >
                    <span className="mr-3">{item.icon}</span>
                    {item.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
