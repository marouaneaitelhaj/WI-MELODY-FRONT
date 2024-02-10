import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Artists from "./pages/Artists";

export const Routes  = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/artists",
    element: <Artists />
  }
]);