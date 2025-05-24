import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Axios } from "../utils/axiosInstance";

export default function ProtectedLanding() {
  const navigate = useNavigate();

  useEffect(() => {
    Axios.get("/user/me", { withCredentials: true })
      .then((res) => {
        if (res.data.success) navigate("/home");
        else navigate("/login");
      })
      .catch(() => navigate("/login"));
  }, [navigate]);

  return null;
}
