import { createBrowserRouter } from "react-router-dom";
import "./App.css";
import { Button } from "./components/ui/button";
import Navbar from "./components/ui/shared/Navbar";
import { RouterProvider } from "react-router";

import Home from "./components/Home";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Jobs from "./components/Jobs";

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
  {
    path:"/jobs",
    element: <Jobs />
  }
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
