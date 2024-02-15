import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function PrivateRoutes() {
    const { isAuthenticated } = useSelector((state: RootState) => state.auth);
    const navigate = useNavigate();
    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/login");
        }
    }, [isAuthenticated])
    return (
        <Outlet />
    )
}