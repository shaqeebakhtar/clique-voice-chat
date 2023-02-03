import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export const sendOtp = async (data) => {
  return await api.post("/api/get-otp", data);
};
export const verifyOtp = async (data) => {
  return await api.post("/api/verify-otp", data);
};

export default api;
