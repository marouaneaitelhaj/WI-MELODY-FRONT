import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Artists from "../pages/Artists";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../state/store";
import { logoutAction } from "../state/auth/authActions";

export default function Navbar() {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();
  const logout = () => {
      dispatch(logoutAction())
  }
  return (
    <>
      <nav className="flex justify-around">
        <div>
          <ul className="flex justify-between">
            <Link to="/">
              <li className="text-white mx-5 bg-black my-3 py-2 px-5 border rounded-full hover:text-black hover:bg-white cursor-pointer">
                Home
              </li>
            </Link>
            <Link to="/artists">
              <li className="text-white mx-5 bg-black my-3 py-2 px-5 border rounded-full hover:text-black hover:bg-white cursor-pointer">
                Artists
              </li>
            </Link>
            <li className="text-white mx-5 bg-black my-3 py-2 px-5 border rounded-full hover:text-black hover:bg-white cursor-pointer">
              Pricing
            </li>
            <li className="text-white mx-5 bg-black my-3 py-2 px-5 border rounded-full hover:text-black hover:bg-white cursor-pointer">
              Resources
            </li>
          </ul>
        </div>
        <div>
          <h1 className="text-white mx-5 bg-black my-3 py-2 px-5  font-bold text-2xl">WIMELO</h1>
        </div>
        <div>
          <ul className="flex justify-between">
            <li className="text-white mx-5 bg-black my-3 py-2 px-5 border rounded-full hover:text-black hover:bg-white cursor-pointer">
              Find Creator
            </li>
            {!isAuthenticated && (
              <>
                <Link to="/login">
                  <li className="text-white mx-5 bg-black my-3 py-2 px-5 border rounded-full hover:text-black hover:bg-white cursor-pointer">
                    Log in
                  </li>
                </Link>
                <Link to="/signup">
                  <li className="text-white mx-5 bg-black my-3 py-2 px-5 border rounded-full hover:text-black hover:bg-white cursor-pointer">
                    Sign up
                  </li>
                </Link>
              </>
            )}
            {isAuthenticated && (
              <>
                <li className="text-white mx-5 bg-black my-3 py-2 px-5 border rounded-full hover:text-black hover:bg-white cursor-pointer">
                  Profile
                </li>
                <li onClick={logout} className="text-white mx-5 bg-black my-3 py-2 px-5 border rounded-full hover:text-black hover:bg-white cursor-pointer">
                  Log out
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </>
  )
}