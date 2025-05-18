import axios from "axios";
import { LoginRequest, LoginResponse } from "./loginTypes";

const API_URL = "https://localhost:7127/api/Auth";

const login = async (requestData: LoginRequest): Promise<LoginResponse> => {
  const response = await axios.post(`${API_URL}/Login`, requestData);
  return response.data;
};

export default {
  login,
};
