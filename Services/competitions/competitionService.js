import axiosInstance from "../axiosInstance";
import { API_CLUSTER } from "../../constants/api_cluster";

// POST: Add a new competition
// export const addConsumer = async (competitionData, token) => {

//   console.log("Request Payload:", consumerData);
//   console.log("Token:", token);
//   const result = await axiosInstance.post(API_CLUSTER.COMPETITION, competitionData, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
//   return result;
// };

// GET: Fetch all competition
export const getCompetition = async (token) => {
  try {
    const result = await axiosInstance.get(API_CLUSTER.COMPETITION, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    
    return result;
  } catch (err) {
    console.error("getCompetition error:", err);
    throw err;
  }
};

export const updateCompetitions = async (competitionId, competitionData, token) => {
    const result = await axiosInstance.put(
      `${API_CLUSTER.COMPETITION}/${competitionId}`,
      competitionData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return result;
  };
