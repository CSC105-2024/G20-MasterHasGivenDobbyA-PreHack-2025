import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProtectedLanding from "./pages/ProtectedLanding";
import Home from "./pages/Home";
import Register from "./pages/Register";
import LogIn from "./pages/LogIn";
import Detail from "./pages/Detail";
import AddNewSong from "./pages/AddNewSong";
import ProtectedRoute from "./components/ProtectedRoute";
import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedLanding />,
  },
  {
    path: "/home",
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
  {
    path: "/detail",
    element: (
      <ProtectedRoute>
        <Detail />
      </ProtectedRoute>
    ),
  },
  {
    path: "/addnewsong",
    element: (
      <ProtectedRoute>
        <AddNewSong />
      </ProtectedRoute>
    ),
  },
  {
    path: "/login",
    element: <LogIn />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppRouter />
  </StrictMode>
);
