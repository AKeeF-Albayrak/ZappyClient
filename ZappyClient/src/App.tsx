import AppRouter from "./router/AppRouter";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  /*useEffect(() => {
    connection
      .start()
      .then(() => console.log("✅ SignalR bağlantısı kuruldu."))
      .catch((err) => console.error("❌ SignalR bağlantısı başarısız:", err));
  }, []);*/

  return (
    <div className="app">
      <AppRouter />
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default App;
