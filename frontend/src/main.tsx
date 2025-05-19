import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom"; 
import Register from './pages/Register.tsx';
import Home from './pages/Home.tsx';
import LogIn from './pages/LogIn.tsx';
import Detail from './pages/Detail.tsx';
import AddNewSong from './pages/AddNewSong.tsx';

const router = createBrowserRouter([
  {
    path: "/", 
    element: <Home />, 
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <LogIn />,
  },
  {
    path: "/detail",
    element: <Detail />,
  },
  {
    path: "/addnewsong",
    element: <AddNewSong />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

