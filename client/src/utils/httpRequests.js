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
export const activateAccount = async (data) => {
  return await api.post("/api/activate", data);
};

// interceptors
api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalReq = error.config;
    if (error.response.status === 401 && originalReq && !originalReq._isRetry) {
      originalReq._isRetry = true;
      try {
        await axios.get("/api/refresh", {
          withCredentials: true,
        });
        return api.request(originalReq);
      } catch (err) {
        console.log(err.message);
      }
    }

    throw error;
  }
);

export default api;
