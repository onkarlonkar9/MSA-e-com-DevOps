// import required modules
import { useQuery } from "@tanstack/react-query";
import { getVendorOrders} from "../services/orderService";
import toast from "react-hot-toast";
import Loader from "../components/Loader";
import Error from "../components/Error";
import { format } from "date-fns";

function Order() {
  // get query from our service
  const {
    data: orders,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["vendorOrders"],
    queryFn: getVendorOrders,
    onError: (err) => {
      toast.error(err);
    },
  });

  console.log(orders);
  // if loading
  if (isLoading) return <Loader />;

  // if any error occurs
  if (isError) return <Error />;

  return (
    <>
      <div className="container mt-16 mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Your Orders</h1>
          <p className="text-gray-600">
            View your products order history 
          </p>
        </div>

        {/* Conditional rendering based on orders existence */}
        {orders.length === 0 ? (
          <div className="bg-white rounded-lg shadow overflow-hidden p-12 text-center">
            <div className="mx-auto w-24 h-24 mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-24 w-24 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-medium text-gray-700 mb-2">
              No orders yet
            </h3>
            <p className="text-gray-500 mb-6">
              You haven't received  orders yet. Order start showing here once customer place an order.
            </p>
            
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((item) => (
              <div
                key={item.orderItemsId}
                className="bg-white rounded-lg shadow overflow-hidden"
              >
                <div className="p-6 border-b border-gray-200">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <p className="text-gray-500 text-sm">Order Placed</p>
                      <p className="font-medium">
                        {format(item.updatedAt, "dd MMM yyyy, hh:mm a")}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">Total</p>
                      <p className="font-medium">{item.productPrice}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">Customer Name</p>
                      <p className="font-medium">{item?.Order.shippingName}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">Order #</p>
                      <p className="font-medium">{item.orderItemsId}</p>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex space-x-4">
                      <div className="">
                        <p className="text-gray-600 font-semibold">
                          Product Name:{" "}
                          <span className="font-bold">
                            {item?.brandName}
                            {item?.productName}
                          </span>
                        </p>
                        <p className="text-gray-600 font-semibold">
                          Quantity: {item.quantity}
                        </p>
                        <p className="text-gray-600 font-semibold">
                          Payment Id:{" "}
                          <span className="font-bold">
                            {item?.Order?.Payments?.[0]?.razorpayPaymentId}
                          </span>
                        </p>
                        <p className="text-gray-600 font-semibold">
                          Payment Method:{" "}
                          <span className="font-bold capitalize">
                            {item?.Order?.Payments?.[0]?.method}
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      {item?.Order && (
                        <div className=" grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-bold text-gray-700 mb-2">
                              Shipping Address
                            </h4>
                            <p className="text-gray-600 font-semibold">
                              {item.Order.shippingStreet},
                            </p>
                            <p className="text-gray-600 font-semibold">
                              {item.Order.shippingCity},{" "}
                              {item.Order.shippingDistrict},{" "}
                              {item.Order.shippingState}
                            </p>
                            <p className="text-gray-600 font-semibold">
                              {item.Order.shippingPincode}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Order;
