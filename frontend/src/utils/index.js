import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5000/api/v1/users",
});

api.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


api.interceptors.response.use(
    (respsonse)=> respsonse,
    async (error)=> {
        const originalRequest = error.config;

        if(error.response.status === 401 && !originalRequest._retry){
            originalRequest._retry = true;
        }

        try {
            
        } catch (error) {
            
        }
    }
)