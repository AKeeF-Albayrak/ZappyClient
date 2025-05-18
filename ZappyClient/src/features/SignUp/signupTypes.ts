// src/features/auth/signupTypes.ts

// Signup için gerekli olan veri
export interface SignupRequest {
  name: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  dateOfBirth: string;
  profilePicture: string | null; // Base64 formatında image string
}

// Signup yanıtı
export interface SignupResponse {
  message: string;
  user: {
    id: string;
    name: string;
    username: string;
  };
}
