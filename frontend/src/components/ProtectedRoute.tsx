import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Axios } from "../utils/axiosInstance";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [allowed, setAllowed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    Axios.get("/user/me", { withCredentials: true })
      .then((res) => {
        if (res.data.success) setAllowed(true);
        else navigate("/login");
      })
      .catch(() => navigate("/login"))
      .finally(() => setLoading(false));
  }, [navigate]);

  if (loading) return <div className="text-white p-4">Loading...</div>;
  return allowed ? children : null;
};
export default ProtectedRoute;

