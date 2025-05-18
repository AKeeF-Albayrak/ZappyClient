import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "./loginService";
import { LoginResponse } from "./loginTypes";
import { getClientIp, getUserAgent, getDeviceInfo } from "../../utils/clientInfo";
import { toast } from "react-toastify";

const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<LoginResponse | null>(null);
  const navigate = useNavigate();
  const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

  const login = async (username: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const ipAdress = await getClientIp();
      const userAgent = getUserAgent();
      const deviceInfo = getDeviceInfo();


      const response = await authService.login({
        userName: username,
        password: password,
        ipAdress,
        deviceInfo,
        userAgent,
      });

      await delay(2000);
      navigate("/home");
      if (response.succeeded) {
        setUser(response);
        localStorage.setItem("accessToken", response.accessToken);
        localStorage.setItem("refreshToken", response.refreshToken);

        toast.success("Giriş başarılı!");
        await delay(2000);
        navigate("/home");
      }else {
        setError(response.message || "Giriş başarısız.");
        toast.error(response.message || "Hatalı kullanıcı adı ya da şifre.");
      }

    } catch (err: any) {
      setError("Giriş işlemi başarısız. Lütfen tekrar deneyin.");
      toast.error("Bir hata oluştu. Sunucuya ulaşılamıyor.");
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading, error, user };
};

export default useLogin;
