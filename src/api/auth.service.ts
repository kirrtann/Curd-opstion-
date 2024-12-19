import axiosInstance from "./axiosInstance"; 
import apiHelper from "./apiHelper"; 
// Signup function
export const signup = async (credentials: {
  name: string,
  username: string,
  email: string,
  age: number,
  gender: string,
  password: string
}) => {
  return apiHelper(axiosInstance.post("auth/signup", credentials), true);
};

export const login = async (credentials: {
  email: string;
  password: string;
}) => {
  return apiHelper(axiosInstance.post("auth/login", credentials), true);
};


export const logout = async () => {
  return apiHelper(axiosInstance.post("/auth/logout"), true);
};
