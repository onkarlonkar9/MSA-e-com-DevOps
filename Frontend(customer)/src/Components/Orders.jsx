// import required modules
import {useQuery} from '@tanstack/react-query';
import { getOrders } from '../services/orderService';
import toast from 'react-hot-toast';
import Loader from '../Components/Loader';
import Error from "../Components/Error";
import {format} from 'date-fns';
import { Link } from 'react-router-dom';


function Orders() {
   // get orders data from our service    
    const {data:orderItems,isLoading,isError}= useQuery({
        queryKey:['orders'],
        queryFn:getOrders,
        onError:(err)=>{
            toast.error(err);
        }
    });
    
    // if loading
    if (isLoading) return <Loader/>;
    
    // if any error occurs
    if (isError) return <Error/>;

    return (
      <>
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Your Orders</h1>
            <p className="text-gray-600">
              View your order history and track recent purchases
            </p>
          </div>
          {/* Orders List */}
          {/* conditional rendering  */}
          {orderItems.length === 0 ? (
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
                You haven't placed any orders. Start shopping to see your orders
                here.
              </p>
              <Link
                to="/products"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-md transition"
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {orderItems.map((item) => (
                <div
                  key={item.orderItemsId}
                  className="bg-gray-100 rounded-lg shadow overflow-hidden "
                >
                  <span
                    className={`absolute  ${
                      item?.status === "CONFIRMED"
                        ? "bg-green-400"
                        : "bg-yellow-400"
                    }
                  rounded p-1 font-medium text-shadow-gray-600
                  `}
                  >
                    {item.status ==='CONFIRMED'? "CONFIRMED" :'PAYMENT_PROCESSING'}
                  </span>
                  <div className="p-10 border-b border-gray-200">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <p className="text-gray-500 text-sm">Order Placed</p>
                        <p className="font-medium">
                          {format(item.updatedAt, "dd MMM yyyy, hh:mm a")}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-sm">OrderID</p>
                        <p className="font-medium">#{item?.Order?.orderId}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-sm">Customer Name</p>
                        <p className="font-medium">
                          {item?.Order?.shippingName}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-sm">Customer Email</p>
                        <p className="font-medium">
                          {item?.Order?.shippingEmail}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-sm">Total</p>
                        <p className="font-medium">
                          {new Intl.NumberFormat("en-IN", {
                            style: "currency",
                            currency: "INR",
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                          }).format(item?.productPrice)}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex space-x-4">
                        <div>
                          <p className="text-gray-600 font-semibold">
                            Product Name:{" "}
                            <span className="font-bold">
                              {} {item?.brandName}
                              {item?.productName}
                            </span>
                          </p>
                          <p className="text-gray-600 font-semibold">
                            Quantity: {item?.quantity}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      {item?.Order && (
                        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-bold text-gray-700 mb-2">
                              Shipping Address
                            </h4>
                            <p className="text-gray-600 font-semibold">
                              {item?.Order?.shippingStreet},
                            </p>
                            <p className="text-gray-600 font-semibold">
                              {item?.Order?.shippingCity},{" "}
                              {item?.Order?.shippingDistrict},{" "}
                              {item?.Order?.shippingState}
                            </p>
                            <p className="text-gray-600 font-semibold">
                              {item?.Order?.shippingPincode}
                            </p>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-700 mb-2">
                              Sold By
                            </h4>

                            <p className="text-gray-600 font-bold">
                              {item?.Vendor?.vendorName}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="mt-6 flex flex-wrap gap-4">
                      <Link
                        to={
                          item.productId
                            ? `/products/${item.productId}`
                            : "/products"
                        }
                        className="px-4 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700"
                      >
                        Buy Again
                      </Link>
                      <a
                        target="_blank"
                        href={`mailto:${item?.Vendor?.email}`}
                        className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-md font-medium hover:bg-gray-50"
                      >
                        Contact Seller
                      </a>
                      {item.status === "SHIPPED" && (
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700">
                          Track Package
                        </button>
                      )}
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

export default Orders;
