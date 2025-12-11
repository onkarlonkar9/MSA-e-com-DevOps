// import required modules
import { useQuery } from "@tanstack/react-query";
import Loader from "./Loader";
import Error from "./Error";
import axiosInstance from "../utils/axios.js";


async function fetchOrders() {
  try {
    const res = await axiosInstance.get("/orders");
    return res.data;
  } catch (error) {
    console.error(error);
  }
}

function Orders() {
  const {
    data: orders = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: fetchOrders,
  });


  if (isLoading) return <Loader/>
  if (isError) return <Error/>

  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>#</th>
            <th>Customer Name</th>
            <th>Product Name</th>
            <th>Specification</th>
            <th>Amount Paid</th>
            <th>Date of Order placed</th>
            <th>Transaction Id</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {orders.map((order, index) => (
            <tr key={order.id}>
              <th>{index + 1}</th>
              <td>{order.customerName}</td>
              <td>{order.productName}</td>
              <td>{order.specification}</td>
              <td>{order.amountPaid}</td>
              <td>{order.orderDate}</td>
              <td>{order.transactionId}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Orders;
