import { createBrowserRouter } from "react-router-dom";
import "./App.css";
import { Button } from "./components/ui/button";
import Navbar from "./components/ui/shared/Navbar";
import { RouterProvider } from "react-router";

import Home from "./components/Home";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path : "signup",
    element: <Signup />
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
