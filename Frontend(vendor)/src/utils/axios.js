import axios from "axios";

const isDevelopment = import.meta.env.MODE === "development";
const baseURL = isDevelopment ? "http://localhost:8000/api/vendor" : "/api/vendor";

export default axios.create({ baseURL });
