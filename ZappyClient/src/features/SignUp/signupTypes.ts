
export interface SignupRequest {
  name: string;
  username: string;
  mail: string;
  password: string;
  description: string | null;
  birthDate: string;
  profilePicture: string | null;
  contentType: string | null;
}

export interface SignupResponse {
  message: string;
  user: {
    id: string;
    name: string;
    username: string;
  };
}
