import axios from "axios";

const API_URL = process.env.BACKEND_API_URL;

export const fetchData = async () => {
  try {
    const response = await axios.get(`${API_URL}/your-endpoint`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};