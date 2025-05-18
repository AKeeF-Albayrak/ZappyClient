// src/features/auth/signupService.ts
import axios from "axios";
import { SignupRequest, SignupResponse } from "./signupTypes";

// Backend API URL
const API_URL = "https://localhost:7127/api/Auth";

// Signup işlemi
const signup = async (data: SignupRequest): Promise<SignupResponse> => {
  const response = await axios.post(`${API_URL}/Signup`, data);
  return response.data;
};

// signupService objesi
const signupService = {
  signup,
};

export default signupService;
