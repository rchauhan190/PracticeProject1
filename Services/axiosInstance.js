import axios from "axios";
import { API_INITIAL } from "../constants/api_cluster";

const axiosInstance = axios.create({
  baseURL: API_INITIAL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
