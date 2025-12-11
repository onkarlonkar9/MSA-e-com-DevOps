
import { useQuery } from "@tanstack/react-query";
import { Link, useSearchParams } from "react-router-dom";
import { fetchProducts } from "../services/productService";
import Loader from "./Loader";
import Error from "./Error";
import { useEffect, useMemo, useState } from "react";
import { useRef } from "react";

function Products() {
  const [query, setQuery] = useState("");
  const [searchParams,setSearchParams]= useSearchParams();
  const inputRef = useRef(null);

  
  useEffect(() => {
    const brandParams = searchParams.get('brand');
    if (brandParams) setQuery(brandParams);

    inputRef.current?.focus();

  }, [searchParams]);



  // destructure using useQuery
  const {
    data: products,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    staleTime: 1000 * 60 * 3, // 3 minutes
  });
  
  // keep the searched query in memo
  const filteredProducts = useMemo(() => {
    if (!products) return [];

    return products.filter((product) => {
      // Filter by search query
      return (
        product.productName.toLowerCase().includes(query.toLowerCase()) ||
        product.specification.toLowerCase().includes(query.toLowerCase()) || 
        product.brandName.toLowerCase().includes(query.toLowerCase())
      );
    });
  }, [products, query]);

  // if data is still loading
  if (isLoading) return <Loader />;

  // if some error comes then
  if (isError) return <Error />;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Search and Filter Section */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8 p-4 bg-white rounded-xl shadow-sm">
        <div className="flex items-center">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center">
            Our Products
          </h1>
        </div>

        <div className="relative w-full md:w-auto">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg
              className="h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          {/*  search bar for browsing */}
          <input
            type="text"
            id="searchProducts"
            className="block w-full md:w-80 pl-10 pr-4 py-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
            placeholder="Search mobile..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            ref={inputRef}
          />
          {query && (
            <button
              className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
              onClick={() =>{ 
                setQuery("");
                setSearchParams("");
              }}
            >
              <svg
                className="h-4 w-4 text-gray-400 hover:text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 ">
        {/* map over the filterProduct array if user entered some inputs */}

        {query ? (
          // When there's a search query
          filteredProducts.length > 0 ? (
            // Show filtered products if there are results
            filteredProducts.map((product) => (
              <div
                key={product.productId}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                {/* Product Image */}
                <Link
                  to={`/products/${product.productId}`}
                  className="group relative bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 border border-gray-100"
                >
                  <div className="h-48 bg-gray-100 flex items-center justify-center p-4 select-none">
                    <img
                      src={product.ProductImages?.[0]?.signedURL}
                      alt={product.productName}
                      className="h-full object-contain cursor-pointer group-hover:scale-110 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                </Link>

                {/* Product Info */}
                <div className="p-4">
                  {/* Name */}
                  <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-1 capitalize">
                    {product.productName}
                  </h3>

                  {/* Specs */}
                  <p className="font-bold text-gray-600 mb-3 line-clamp-2">
                    Price:{" "}
                    {new Intl.NumberFormat("en-IN", {
                      style: "currency",
                      currency: "INR",
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    }).format(product.price)}
                  </p>

                  {/* view details button */}
                  <div className="select-none ">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                      <div className="flex flex-col sm:flex-row justify-end gap-2 mt-2 sm:mt-0">
                        <Link
                          to={`/products/${product.productId}`}
                          className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded transition-colors duration-300 cursor-pointer select-none text-center"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            // Show "No products found" message when search returns no results
            <div className="col-span-full text-center py-12">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="mt-2 text-lg font-medium text-gray-900">
                No products found
              </h3>
              <p className="mt-1 text-gray-500">
                Try adjusting your search to find what you're looking for.
              </p>
            </div>
          )
        ) : (
          // When there's no search query, show all products
          products.map((product) => (
            <div
              key={product.productId}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              {/* Product Image */}
              <Link
                to={`/products/${product.productId}`}
                className="group relative bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 border border-gray-100"
              >
                <div className="h-48 bg-gray-100 flex items-center justify-center p-4 select-none">
                  <img
                    src={product.ProductImages?.[0]?.signedURL}
                    alt={product.productName}
                    className="h-full object-contain cursor-pointer group-hover:scale-110 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
              </Link>

              {/* Product Info */}
              <div className="p-4">
                {/* Name */}
                <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-1 capitalize">
                  {product.productName}
                </h3>

                {/* Specs */}
                <p className="font-bold text-gray-600 mb-3 line-clamp-2">
                  Price:{" "}
                  {new Intl.NumberFormat("en-IN", {
                    style: "currency",
                    currency: "INR",
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  }).format(product.price)}
                </p>

                {/* view details button */}
                <div className="select-none ">
                    <div className="flex flex-col sm:flex-row md:justify-end gap-2 mt-2 sm:mt-0">
                      <Link
                        to={`/products/${product.productId}`}
                        className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded transition-colors duration-300 cursor-pointer select-none text-center"
                      >
                        View Details
                      </Link>
                    </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {products.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No products available.</p>
        </div>
      )}
    </div>
  );
}

export default Products;
