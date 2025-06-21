// src/features/auth/useSignup.ts
import { useState } from "react";
import { SignupRequest, SignupResponse } from "./signupTypes";
import signupService from "./signupService";

const useSignup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const signup = async (data: SignupRequest) => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response: SignupResponse = await signupService.signup(data);
      setSuccess(true);
      console.log("Signup success", response);
    } catch (err) {
      setError("Signup failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return { signup, isLoading, error, success };
};

export default useSignup;
