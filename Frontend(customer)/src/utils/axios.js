import axios from "axios";

const isDevelopment = import.meta.env.MODE === "development";
const baseURL = isDevelopment ? "http://localhost:8000/api/customer" : "/api/customer";

export default axios.create({ baseURL });