import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import { FiShoppingCart, FiArrowLeft, FiArrowRight } from "react-icons/fi";
import toast from "react-hot-toast";
import { addToCart } from "../services/cartService";
import { useCartStore } from "../stores/cartStore";
import Loader from "./Loader";
import Error from "./Error";
import { useEffect, useState } from "react";
import axiosInstance from '../utils/axios.js';

import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

// function to fetch product with particular Id
async function fetchProduct(productId) {
  // get productId from params
  try {
    const { data } = await axiosInstance.get(`/product/${productId}`
    );
    return data;
  } catch (error) {
    // if any error occurs
    console.error(error);
  }
}

function ProductDetail() {
  // get productId from params
  // get navigate  from useNavigation hook
  const { productId } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  //state for pincode
  const [pincode, setPincode] = useState("");

  //get isAuthenticated value from zustand store
  const authData = JSON.parse(localStorage.getItem("authSession"));
  const isAuthenticated = authData?.state?.isAuthenticated === true;

  // extract react-query methods/property
  const {
    data: product,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => fetchProduct(productId),
  });

  // over-ride the title
  useEffect(() => {
    if (product) document.title = `${product.productName} | MSA`;
  }, [product]);

  const { mutate: addToCartMutation, isPending } = useMutation({
    mutationFn: ({ productId }) => addToCart(productId),
    onSuccess: (_data, product) => {
      useCartStore.getState().addItem({
        productId: product.productId,
        productName: product.productName,
      });
      toast.success("Added!");
      queryClient.invalidateQueries(["cartData"]);
    },
    onError: (error) => {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to add to cart");
    },
  });

  // check for product already in the cart or not
  const productData = JSON.parse(localStorage.getItem("cartStorage"));
  const isAlreadyInCart = productData?.state?.items?.some(
    (item) => item.productId === product?.productId
  );

  // handle pincode
  function handleChange(e) {
    const value = e.target.value;
    if (/^\d{0,6}$/.test(value)) {
      setPincode(value);
    }
  }

  // if page is loading or data is loading
  if (isLoading) return <Loader />;

  // if any error occurs while fetching the productDetails
  if (isError) return <Error />;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* back button for navigating backward */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-indigo-600 hover:text-indigo-800 mb-6 cursor-pointer select-none font-bold"
      >
        <FiArrowLeft className="mr-2" /> Back to Products
      </button>

      {/* product details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="bg-gray-100 rounded-lg overflow-hidden select-none">
          {/* user can zoom the images */}
          <Zoom>
            <img
              src={product.signedProductURL}
              alt={product.productName}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </Zoom>
        </div>

        {/* Product Info */}
        <div className="select-none">
          <h1 className="text-3xl font-bold text-gray-800 mb-2 capitalize">
          {product.brandName} {product.productName}
          </h1>
          <div className="flex items-center mb-4">
            <span className="text-2xl font-bold text-indigo-600">
              {/* convert price to Indian format */}
              {new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "INR",
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              }).format(product.price)}
            </span>
          </div>

          <div className="mb-6 select-none">
            {/* quantity label */}
            {/* as af now we only assume each product has only one unit  so making input read only*/}

            <label
              htmlFor="quantity"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Quantity
            </label>
            <input
              type="number"
              id="quantity"
              min="1"
              value={1}
              readOnly
              className="w-16 text-center border-t border-b border-gray-300 py-1 select-none"
            />
          </div>

          {/* check pincode availability */}
          <div className="max-w-md grid gap-4">
            <div className="min-h-[80px]">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Check for availability at your pincode
              </label>
              <div className="flex items-start gap-2">
                <input
                  type="text"
                  value={pincode}
                  onChange={handleChange}
                  placeholder="Enter 6-digit pincode"
                  minLength={6}
                  maxLength={6}
                  className="w-48 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
                {pincode.length === 6 && (
                  <span className="flex items-center text-green-600 text-sm mt-1">
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {pincode < 400000
                      ? "Delivery in 4-5 days"
                      : pincode < 800000
                      ? "Delivery in 6-7 days"
                      : "Delivery in 8-9 days"}
                  </span>
                )}
              </div>
              {pincode.length > 0 && pincode.length < 6 && (
                <p className="text-red-500 text-xs mt-1">
                  Please enter a 6-digit pincode
                </p>
              )}
            </div>

            <div className="flex gap-2 mt-2">
              {!isAlreadyInCart ? (
                <button
                  onClick={
                    isAuthenticated
                      ? () => addToCartMutation(product)
                      : () => toast.error("Please Login First!!")
                  }
                  disabled={isPending}
                  className={`w-full md:w-auto px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 flex items-center justify-center gap-2 ${
                    isPending
                      ? "opacity-50 cursor-not-allowed"
                      : "cursor-pointer"
                  }`}
                >
                  {isPending ? (
                    "Adding..."
                  ) : (
                    <>
                      {" "}
                      <FiShoppingCart /> Add to Cart{" "}
                    </>
                  )}
                </button>
              ) : (
                <button
                  onClick={() => navigate("/cart")}
                  className="w-full md:w-auto px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 flex items-center justify-center gap-2 cursor-pointer"
                >
                  Go to cart <FiArrowRight />
                </button>
              )}
            </div>
          </div>
          {/* Product Details Section */}
          <div className="mt-7 pt-8 border-t border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Product Details
            </h2>

            <div className="bg-gray-50 rounded-lg p-5">
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="w-32 flex-shrink-0 font-medium text-gray-600">
                    Specifications:
                  </span>
                  <span className="text-gray-800">{product.specification}</span>
                </li>
                <li className="flex items-start">
                  <span className="w-32 flex-shrink-0 font-medium text-gray-600">
                    Category:
                  </span>
                  <span className="text-gray-800">Mobile</span>
                </li>
                <li className="flex items-start">
                  <span className="w-32 flex-shrink-0 font-medium text-gray-600">
                    Brand:
                  </span>
                  <span className="text-gray-800">
                    {product?.Vendor?.vendorName || "N/A"}
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="w-32 flex-shrink-0 font-medium text-gray-600">
                    Availability:
                  </span>
                  <span
                    className={`font-medium ${
                      product.soldOut === false
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {product.soldOut === false ? "In Stock" : "Out of Stock"}
                  </span>
                </li>
              </ul>
            </div>

            {/* only render this section if brandLogo is available */}
            {/* Brand Logo Section */}
            {product.signedBrandLogoURL && (
              <div className="mt-8 pt-6 border-t border-gray-200 flex items-center space-x-4">
                <span className="text-gray-600">Sold by</span>
                <div className="p-2 bg-white rounded-md border border-gray-300">
                  <img
                    src={product.signedBrandLogoURL}
                    alt="Brand Logo"
                    className="h-20 object-contain"
                    onError={(e) => {
                      e.target.parentElement.parentElement.style.display =
                        "none";
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
