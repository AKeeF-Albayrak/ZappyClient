import { jwtDecode } from "jwt-decode";

export const getUserIdFromToken = (): string | null => {
  const token = localStorage.getItem("refreshToken");
  if (!token) return null;

  try {
    const decoded: any = jwtDecode(token);
    return decoded.userId || decoded.nameid || decoded.sub || null;
  } catch (err) {
    console.error("Token decode edilemedi:", err);
    return null;
  }
};
