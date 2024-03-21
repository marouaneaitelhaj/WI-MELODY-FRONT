import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { RootState, useAppDispatch } from "../state/store";
import { useEffect } from "react";
import { getUserAction } from "../state/auth/authActions";

export default function AuthRoutes() {
    const { isAuthenticated } = useSelector((state: RootState) => state.auth);
    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getUserAction()).unwrap().then((res) => {
            navigate("/profile")
        }).catch((err) => {
            // navigate("/login")
        })
    }, [])
    return (
        <Outlet />
    )
}