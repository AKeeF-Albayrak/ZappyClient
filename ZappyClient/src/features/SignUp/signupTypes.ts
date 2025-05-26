
export interface SignupRequest {
  name: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  dateOfBirth: string;
  profilePicture: string | null;
}

export interface SignupResponse {
  message: string;
  user: {
    id: string;
    name: string;
    username: string;
  };
}
