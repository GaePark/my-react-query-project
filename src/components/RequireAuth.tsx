import {JSX, useEffect} from "react";
import { useNavigate } from "react-router-dom";

const RequireAuth = ({ children }: { children: JSX.Element }) => {
    const navigate = useNavigate();

    useEffect(() => {
        const id = sessionStorage.getItem("id");
        if (!id) {
            alert("로그인이 필요한 기능입니다.");
            navigate("/");
        }
    }, [navigate]);

    return children;
};

export default RequireAuth;