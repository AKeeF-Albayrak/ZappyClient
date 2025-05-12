export interface LoginResponse {
  succeeded: boolean;
  message: string;
  accessToken: string;
  refreshToken: string;
}

export interface LoginRequest {
  userName: string;
  password: string;
  ipAdress: string;
  deviceInfo: string;
  userAgent: string;
}

