import axiosInstance from "../axiosInstance";
import { API_CLUSTER } from "../../constants/api_cluster";

// POST: Add a new consumer
export const addConsumer = async (consumerData, token) => {

  console.log("Request Payload:", consumerData);
  console.log("Token:", token);
  const result = await axiosInstance.post(API_CLUSTER.CONSUMER, consumerData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return result;
};

// GET: Fetch all consumers
export const getConsumer = async (token) => {
  try {
    const result = await axiosInstance.get(API_CLUSTER.CONSUMER, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    
    return result;
  } catch (err) {
    console.error("getConsumer error:", err);
    throw err;
  }
};
