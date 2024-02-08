import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Creators from "./pages/Creators";

export const Routes  = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/creators",
    element: <Creators />
  }
]);