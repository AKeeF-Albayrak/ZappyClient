export const getUserIdFromToken = (): string | null => {
  const token = localStorage.getItem("accessToken");
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload?.nameid || payload?.sub || null;
  } catch (err) {
    console.error("Token decode edilemedi:", err);
    return null;
  }
};
