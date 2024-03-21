import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../state/store";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getUserAction } from "../state/auth/authActions";

export default function PrivateRoutes() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getUserAction()).unwrap().then((res) => {

        }).catch((err) => {
            navigate("/login")
        })
    }, [])
    return (
        <Outlet />
    )
}