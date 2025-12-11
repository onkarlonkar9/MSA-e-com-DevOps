import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import axiosInstance from "../utils/axios.js";

const navigation = [
  { name: "My Products", to: "/products", current: false },
  { name: "My Orders", to: "/orders", current: false },
  { name: "My Account", to: "/account", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  async function handleLogout() {
    try {
      await axiosInstance.post("/logout", {}, { withCredentials: true });
      // clear the cache of react-query
      queryClient.clear();
      toast.success("Logged Out Successfully!");
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Disclosure
      as="nav"
      className=" fixed top-0 left-0 w-full z-50 bg-emerald-800"
    >
      <nav className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 select-none">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-200 hover:bg-emerald-500 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset ml-20 cursor-pointer">
              <span className="absolute -inset-0.5" />
              <Bars3Icon
                aria-hidden="true"
                className="incline-block size-6 group-data-open:hidden"
              />
              <XMarkIcon
                aria-hidden="true"
                className="hidden size-6 group-data-open:block"
              />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-start justify-start sm:items-stretch sm:justify-start">
            <div className="sm:flex shrink-0 sm:items-start sm:justify-start justify-between ">
              <Link to="/account">
                <p className="text-2xl text-white font-serif m-1 ">MSA</p>
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item) => {
                  const isActive = location.pathname === item.to;
                  return (
                    <Link
                      key={item.name}
                      to={item.to}
                      aria-current={item.current ? "page" : undefined}
                      className={classNames(
                        isActive
                          ? "bg-green-500  text-white"
                          : "text-gray-200 hover:bg-green-500 hover:text-white",
                        "rounded-md px-3 py-2 text-md font-bold "
                      )}
                    >
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-end justify-end pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 ">
            {/* Profile dropdown */}
            <Menu as="div" className="relative ml-3">
              <MenuButton className="group flex rounded-full transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-indigo-700 focus:ring-offset-1">
                <div className="relative flex items-center justify-center w-12 h-12">
                  <FaUserAlt className="text-gray-200 bg-blue-600 rounded-full p-2 text-4xl transition-transform group-hover:scale-110 " />
                </div>
              </MenuButton>

              <Transition
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <MenuItems className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-xl bg-white shadow-xl ring-1 ring-gray-200/80 focus:outline-none overflow-hidden">
                  <div className="p-1">
                    <MenuItem>
                      {({ active }) => (
                        <button
                          onClick={handleLogout}
                          className={`${
                            active
                              ? "bg-indigo-50 text-indigo-700"
                              : "text-gray-900"
                          } flex w-full items-center rounded-lg px-4 py-3 text-base font-medium transition-colors`}
                        >
                          <FiLogOut className="mr-3 text-lg opacity-80 " />
                          Log out
                        </button>
                      )}
                    </MenuItem>
                  </div>
                </MenuItems>
              </Transition>
            </Menu>
          </div>
        </div>
      </nav>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pt-2 pb-3">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.to}
              aria-current={item.current ? "page" : undefined}
              className={classNames(
                item.current
                  ? "bg-emerald-500 text-white"
                  : "text-gray-300 hover:bg-emerald-500 hover:text-white",
                "block rounded-md px-3 py-2 text-base font-medium"
              )}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
