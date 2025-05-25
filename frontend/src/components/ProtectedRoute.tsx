import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "../utils/axiosInstance"; 

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [allowed, setAllowed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const check = async () => {
      try {
        const res = await Axios.get("/user/me", { withCredentials: true });
        if (res.data.success) {
          setAllowed(true);
        } else {
          navigate("/login");
        }
      } catch (e) {
        navigate("/login");
      }
    };
    check();
  }, [navigate]);

  return allowed ? children : null;
};
export default ProtectedRoute;
