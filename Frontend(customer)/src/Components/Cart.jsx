// import required modules
import { Link, useNavigate } from "react-router-dom";
import { FiShoppingBag, FiTrash2, FiArrowLeft } from "react-icons/fi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteCartProducts, getCartInfo } from "../services/cartService";
import toast from "react-hot-toast";
import Loader from "../Components/Loader";
import { useCartStore } from "../stores/cartStore";
import { getDefaultAddress } from "../services/addressService";
import {
  FaUser,
  FaMapMarkerAlt,
  FaCity,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";
import { useMemo, useState } from "react";
import { createOrder } from "../services/paymentService";
import useVerifyPayment from "../hooks/useVerifyPayment";

function Cart() {
  const [paymentConfirmation, setPaymentConfirmation] = useState(false);
  const navigate = useNavigate();
  // get queryClient
  const queryClient = useQueryClient();

  const {
    data: cartItems = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["cartData"],
    queryFn: getCartInfo,
    staleTime: 1000 * 60 * 3, // 3 min
    onError: () => {
      toast.error("Failed to load cart data!");
    },
  });

  // get default address
  const { data: defaultAddress } = useQuery({
    queryKey: ["defaultAddress"],
    queryFn: getDefaultAddress,
    onError: () => {
      toast.error("Failed to load address");
    },
  });

  //payment verify
  const verifyPaymentMutation = useVerifyPayment();

  // destructure using useMutation
  const { mutate: deleteProductMutation } = useMutation({
    mutationFn: (productId) => deleteCartProducts(productId),
    onSuccess: (_, productId) => {
      useCartStore.getState().removeItem(productId);
      toast.success("Removed!!");
      queryClient.invalidateQueries(["cartData"]);
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to remove");
    },
  });

  // Calculate  and memoize values with proper error handling
  const { subtotal, shippingFee, total } = useMemo(() => {
    try {
      const subtotal = cartItems.reduce(
        (sum, item) =>
          sum + (item?.product?.price || 0) * (item?.quantity || 0),
        0
      );
      const shippingFee = subtotal > 500 ? 0 : 50;
      const total = subtotal + shippingFee;

      return { subtotal, shippingFee, total };
    } catch (error) {
      console.error("Error calculating totals:", error);
      return { subtotal: 0, shippingFee: 0, total: 0 };
    }
  }, [cartItems]);

  // function for going one step back
  function handleGoBack() {
    navigate(-1);
  }

  // handlePayment
  async function handlePayment() {
    // throw an error if customer didn't selected a default address
    if (!defaultAddress) throw toast.error("Please Select Delivery Address!");

    try {
      setPaymentConfirmation(true);
      const order = await createOrder();

      const options = {
        key: order.key,
        amount: order.amount * 100, // convert to paise
        currency: order.currency,
        name: "MSA",
        description: "Happy to serve you!!",
        order_id: order.razorPayOrderId,
        prefill: {
          name: order.customer.fullName,
          email: order.customer.email,
          contact: order.customer.contactNumber,
        },
        theme: {
          color: "#4c98f5",
        },
        notes: {},
        retry: false,
        timeout: 900,
        send_sms_hash: true,
        handler: async (response) => {
          setPaymentConfirmation(true);

          try {
            const result = await verifyPaymentMutation.mutateAsync(response);
            const toastId = toast.loading(
              "Confirming your order!! Please Wait"
            );

            if (result.success) {
              toast.success("Order Confirmed!!", { id: toastId });
              useCartStore.getState().clearCart();
              navigate("/paymentsuccess");
            } else {
              toast.error("Order Confirmation Failed!!", { id: toastId });
              navigate("paymentFailed");
            }
          } catch (error) {
            console.error(error);
            toast.error("Problem occurred while verifying payment!!");
          }
        },
        modal: {
          ondismiss: () => {
            setPaymentConfirmation(false);
            toast.error("Payment Cancelled");
          },
        },
      };

      if (!window.Razorpay) {
        toast.error("There is error while opening payment gateway. Please refresh and try again!!");
        return;
      }

      const rzp = new window.Razorpay(options);

      rzp.on("payment.failed", (response) => {
        setPaymentConfirmation(false);
        const errorData = response.error?.description || "Payment Failed";
        navigate("/paymentfailed", { state: { data: errorData } });
      });

      rzp.open();
    } catch (error) {
      console.error("Payment initialization error:", error);
      setPaymentConfirmation(false);

      toast.error("Failed to initialize payment. Please try again.");
    }
  }

  // if data is still loading
  if (isLoading || paymentConfirmation) return <Loader />;

  // if any error occurs
  if (isError) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 md:p-8 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500">Failed to load cart items</p>
          <button
            onClick={() => navigate(-1)}
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      {/* Header */}
      <header className="flex items-center justify-between mb-8">
        <button
          onClick={handleGoBack}
          className="text-gray-600 hover:text-blue-600 transition cursor-pointer "
        >
          <FiArrowLeft size={24} />
        </button>
        <h1 className="text-2xl font-bold text-gray-800 select-none">
          Your Cart
        </h1>
        <div className="w-6" />
      </header>

      {/* Empty State */}
      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 text-center">
          <FiShoppingBag size={50} className="text-gray-300 mb-4" />
          <p className="text-gray-600 text-lg mb-2">Your cart is empty</p>
          <Link
            to="/products"
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition"
          >
            Browse Mobiles
          </Link>
        </div>
      ) : (
        <>
          {/* Cart Items */}
          <div className="space-y-6 mb-10">
            {cartItems.map((item) => (
              <div
                key={item?.productId}
                className="bg-white rounded-xl shadow-sm p-4 md:p-6 flex items-center gap-4 hover:shadow-md transition select-none"
              >
                <img
                  src={item?.product?.ProductImages?.[0]?.signedURL}
                  alt={item?.product?.productName}
                  className="w-24 h-24 object-contain rounded-lg border select-none"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="text-lg font-semibold text-gray-800 capitalize ">
                      {item?.product?.productName}
                    </h3>
                    <button
                      onClick={() => deleteProductMutation(item?.productId)}
                      className="text-gray-400 hover:text-red-500 transition cursor-pointer hover:scale-110"
                    >
                      <FiTrash2 size={20} />
                    </button>
                  </div>
                  <div className="flex  justify-between items-center">
                    <span className="text-sm bg-gray-100 px-3 py-1 rounded-full font-medium">
                      Qty: {item?.quantity}
                    </span>
                    <p className="font-semibold text-gray-800 text-lg">
                      {new Intl.NumberFormat("en-IN", {
                        style: "currency",
                        currency: "INR",
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      }).format(item?.product?.price)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Address Summary */}
          <div className="bg-white rounded-2xl shadow-md p-6 mb-10">
            {defaultAddress ? (
              <>
                <h2 className="text-xl flex justify-between font-bold text-gray-800 mb-6 border-b pb-2">
                  Delivering to this address
                  <Link
                    to="/address"
                    className="text-blue-500 font-semibold hover:text-blue-800"
                  >
                    Edit or change default
                  </Link>
                </h2>

                <div className="space-y-3 text-gray-700">
                  <div className="flex items-start">
                    <FaUser className="w-4 h-4 mt-1 mr-3 text-gray-500 flex-shrink-0" />
                    <span className="font-semibold">
                      {defaultAddress?.fullName}
                    </span>
                  </div>

                  <div className="flex items-start">
                    <FaEnvelope className="w-4 h-4 mt-1 mr-3 text-gray-500 flex-shrink-0" />
                    <span className="font-semibold">
                      {defaultAddress?.email}
                    </span>
                  </div>

                  <div className="flex items-start">
                    <FaMapMarkerAlt className="w-4 h-4 mt-1 mr-3 text-gray-500 flex-shrink-0" />
                    <div>
                      <p className="font-semibold">
                        {defaultAddress?.addressLine}
                      </p>
                      {defaultAddress?.landMark && (
                        <p className="text-sm text-gray-600 mt-1 font-medium">
                          {defaultAddress?.landMark}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-start">
                    <FaCity className="w-4 h-4 mt-1 mr-3 text-gray-500 flex-shrink-0" />
                    <p className="font-semibold">
                      {defaultAddress?.city}, {defaultAddress?.district},{" "}
                      {defaultAddress?.state} - {defaultAddress?.postalCode}
                    </p>
                  </div>

                  <div className="flex items-start">
                    <FaPhoneAlt className="w-4 h-4 mt-1 mr-3 text-gray-500 flex-shrink-0" />
                    <p className="font-semibold">
                      {defaultAddress?.contactNumber}
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-xl font-bold text-gray-800 mb-6 border-b pb-2 flex flex-wrap gap-2 items-center">
                  Please select at least one address as default
                  <Link
                    to="/address"
                    className="text-blue-500 font-semibold hover:text-blue-800 underline"
                  >
                    Go to Addresses
                  </Link>
                </h2>
              </>
            )}
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-2xl shadow-md p-6 mb-10">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Order Summary
            </h2>
            <div className="space-y-3 text-gray-700">
              <div className="flex justify-between">
                <span className="font-semibold">Subtotal</span>
                <span className="font-semibold">
                  {new Intl.NumberFormat("en-IN", {
                    style: "currency",
                    currency: "INR",
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }).format(subtotal)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Shipping</span>
                <span className={shippingFee ? "font-semibold" : ""}>
                  {shippingFee === 0 ? "Free" : `₹${shippingFee}`}
                </span>
              </div>
              <hr className="my-3" />
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>
                  {new Intl.NumberFormat("en-IN", {
                    style: "currency",
                    currency: "INR",
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }).format(total)}
                </span>
              </div>
            </div>
          </div>

          {/* Checkout Button */}
          <button
            className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold text-lg hover:bg-blue-700 transition cursor-pointer  duration-200 "
            onClick={handlePayment}
          >
            Proceed to Checkout
          </button>
        </>
      )}
    </div>
  );
}

export default Cart;
