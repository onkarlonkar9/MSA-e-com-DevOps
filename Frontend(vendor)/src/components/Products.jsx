// import required modules
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Loader from "./Loader";
import Error from "./Error";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa6";
import axiosInstance from "../utils/axios.js";



// fetch the products from the database(self-listed)
async function fetchProducts() {
  try {
    const res = await axiosInstance.get("/product", {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    console.error(error);
  }
}

function Products() {
  // state for the modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  // state for the updating the products
  const [isEditProduct, setEditProduct] = useState(null);

  // to handle form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors ,isSubmitting},
  } = useForm({
    defaultValues:{
      brandName:"",
      productName:"",
      specification:"",
      price:"",
      productImage:null
    }
  });

  const queryClient = useQueryClient();

  //to open modal for creating new product
  function openCreateModal() {
    setEditProduct(null);
    setIsModalOpen(true);
    reset({
      brandName: "",
      productName: "",
      specification: "",
      price: "",
      productImage: null,
    });
  }

  // to open modal for updating an existing product
  function openUpdateModal(product) {
    setEditProduct(product);
    reset({
      brandName:product.brandName,
      productName: product.productName,
      specification: product.specification,
      price: product.price,
      productImage: null,
    });
    setIsModalOpen(true);
  }

  // to close the modal
  function closeModal() {
    setIsModalOpen(false);
    reset();  
  }

  // fetch the product
  const {
    data: products = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    staleTime: 60 * 1000, // 1 min = 60000ms (60 * 1000)
    cacheTime: 2 * 60 * 1000, // 2 min
    refetchInterval: 2 * 60 * 1000, // 2min
    refetchOnWindowFocus: true, // fetch if user changes tab and then comes back
  });

  // to delete the product
  const deleteProduct = useMutation({
    mutationFn: async (product) => {
      await axiosInstance.delete(`/product/${product.productId}`,
        {
          withCredentials: true,
        }
      );
    },
    onSuccess: () => {
      toast.success("Product Deleted Successfully!!");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error) => {
      const message =
        error.response?.data?.message || "Failed to delete product!";
        console.log(error);
      toast.error(message);
    },
  });

  // function to add new product
  async function onSubmit(data) {
    // create a formData 
    const formData = new FormData();

    try {
    
      const price = parseFloat(data.price).toFixed(2);

      formData.append('brandName',data.brandName);

      formData.append('productName',data.productName);

      formData.append('specification',data.specification);

      formData.append('price', price.toString());
      
      if(data.productImage && data.productImage[0]){
      formData.append("productImage", data.productImage[0]);
      }

      // if edit product is true (User want to update a product)
      if (isEditProduct) {
        await axiosInstance.put(`/product/${isEditProduct.productId}`,
          formData,
          { 
            headers:
            {
            'Content-Type':'application/json'
            },
          withCredentials: true
          } 
        );
        toast.success("Product Updated Successfully!");
      } else {
        // if edit product is false (User want to add a product)
        await axiosInstance.post(`/product`,
          formData,
          {
            withCredentials: true,
          }
        );  
        toast.success("Product Added Successfully!");
      }
      queryClient.invalidateQueries({ queryKey: ["products"] });
      reset();
      setEditProduct(null);
      closeModal();
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message);
    }
  }

  // show loader if data is not received yet
  if (isLoading) return <Loader />;

  // throw error if error occurs while fetching data
  if (isError) return <Error />;
  
  return (
    <div className="overflow-x-auto min-h-screen bg-gray-200  select-none pt-20">
      {/* case 1: No products available */}
      {products.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-screen">
          <h1 className="text-3xl font-bold text-gray-700 text-center">
            You haven't added any product yet.
          </h1>
          <button
            onClick={openCreateModal}
            className="mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded hover:scale-110 transition cursor-pointer"
          >
            Add Your First Product
          </button>
        </div>
      ) : (
        // case 2 :products available
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 py-8 max-w-7xl mx-auto">
            <div className="border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center min-h-[300px] hover:bg-gray-50 ">
              <div className="text-center p-4">
                <FaPlus
                  className="mx-auto h-12 w-12 text-gray-400 cursor-pointer hover:scale-110 transition "
                  onClick={openCreateModal}
                />
                <p className="mt-2 font-medium">Add New Product</p>
              </div>
            </div>
            {products.map((product) => (
              <div
                key={product.productId}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 hover:-translate-y-1"
              >
                {/* Product Image */}
                <div className="h-64 w-full overflow-hidden">
                  <img
                    src={product.ProductImages?.[0]?.signedUrl}
                    alt={product.productName}
                    className="w-full h-full object-contain hover:scale-105 transition-transform duration-500 cursor-pointer"
                    loading="lazy"
                  />
                </div>

                {/* Product Details */}
                <div className="p-5 space-y-3">
                  <h3 className="text-xl font-bold text-gray-900 capitalize">
                    {product.productName}
                  </h3>
                  <h3 className="text-xl font-semibold text-gray-900 capitalize">
                    {product.brandName}
                  </h3>
                  <p className="text-gray-600 text-md font-bold min-h-[40px] truncate capitalize">
                    {product.specification}
                  </p>
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-lg font-bold text-gray-900">
                      {new Intl.NumberFormat("en-IN", {
                        style: "currency",
                        currency: "INR",
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      }).format(product.price)}
                    </span>
                    <div className="flex justify-evenly">
                      <button
                        onClick={() => openUpdateModal(product)}
                        className=" mr-2 px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-700 transition cursor-pointer hover:scale-115 duration-300 font-semibold"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => {
                          const isConfirmed = window.confirm(
                            `Do you really want to delete ${product.productName}`
                          );
                          if (isConfirmed) {
                            deleteProduct.mutate(product);
                          }
                        }}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700 transition cursor-pointer hover:scale-115 duration-300 font-semibold "
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {isModalOpen && (
        <div role="dialog">
          <div className="fixed inset-0 min-w-screen bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50 ">
            <div className="bg-white p-6 rounded-xl md:min-w-1/2 shadow-xl ">
              <h2 className="text-xl font-bold mb-4 text-center">
                {isEditProduct ? "Update a Product" : "Add a new product"}
              </h2>
              <form onSubmit={handleSubmit(onSubmit)}>
                  {/* input tag for the brandName */}
                <div>
                  <label htmlFor="brandName" className="font-bold ">
                    Brand Name :-
                  </label>
                  <input
                    {...register("brandName", {
                      required: "Brand name is required",
                    })}
                    id="brandName"
                    className="w-full mb-1 p-2 border rounded outline-sky-600 focus:outline-2 font-semibold "
                  />
                  {errors.brandName && (
                    <span className="text-red-500 font-semibold block">
                      {errors.brandName.message}
                    </span>
                  )}
                </div>


                  {/* input tag for the productName */}
                <div>
                  <label htmlFor="productName" className="font-bold ">
                    Product Name :-
                  </label>
                  <input
                    {...register("productName", {
                      required: "Product name is required",
                    })}
                    id="productName"
                    className="w-full mb-1 p-2 border rounded outline-sky-600 focus:outline-2 font-semibold "
                  />
                  {errors.productName && (
                    <span className="text-red-500 font-semibold block">
                      {errors.productName.message}
                    </span>
                  )}
                </div>

                {/* input tag for specification of the product */}
                <div>
                  <label htmlFor="specification" className="font-bold ">
                    Product Specifications:-
                  </label>

                  <input
                    {...register("specification", {
                      required: "Specification are required!",
                    })}
                    id="specification"
                    className="w-full mb-1 p-2 border rounded  outline-sky-600 focus:outline-2 font-semibold "
                  />
                  {errors.specification && (
                    <span className="text-red-500 font-semibold">
                      {errors.specification.message}
                    </span>
                  )}
                </div>

                {/* input tag for  price of the product */}
                <div>
                  <label htmlFor="price" className="font-bold  ">
                    Product Price :-
                  </label>

                  <input
                    {...register("price", { required: "Price is required!" })}
                    type="number"
                    id="price"
                    className="w-full mb-1 p-2 border rounded  outline-sky-600 focus:outline-2 font-semibold "
                  />
                  {errors.price && (
                    <span className="text-red-500 font-semibold">
                      {errors.price.message}
                    </span>
                  )}
                </div>

                {/* input for product image */}
                {isEditProduct ? (
                  ""
                ) : (
                  <div>
                    <label htmlFor="productImage" className="font-bold  ">
                      Product image :-
                    </label>

                    <input
                      {...register("productImage")}
                      type="file"
                      id="productImage"
                      className="block w-full rounded-md bg-white px-3 py-2 text-gray-900 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-800 cursor-pointer"
                    />
                  </div>
                )}

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="mr-2 px-4 py-2 bg-gray-500 rounded text-white font-semibold cursor-pointer hover:scale-110 hover:bg-gray-700 transition duration-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-4 py-2 bg-blue-600 text-white rounded font-bold cursor-pointer hover:scale-110 hover:bg-blue-800 transition duration-300"
                  >
                    {isEditProduct ? "Update" : "Add"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Products;
