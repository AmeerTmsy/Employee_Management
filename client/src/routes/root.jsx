import { Outlet, useLoaderData, useNavigate } from "react-router-dom";
import Header from "../components/header";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { authenticate } from "../features/login/loginSlice";

export async function loader() {
    const res = await axios.get(`http://localhost:3000/auth/loginVerify`, { withCredentials: true })
    const userData = res?.data?.employee;
    return { userData };
}

export default function Root() {
    const dispatch = useDispatch();
    const { userData } = useLoaderData();
    if (userData)dispatch(authenticate({ userType: userData.role, login: true }));

    const navigate = useNavigate();
    const { login, userType } = useSelector((state) => state.login)

    useEffect(() => {
        if (!login) navigate('/login');
    }, [login])

    return (
        <>
            {login &&
                <header style={{ position: "relative", zIndex: 999, }}>
                    <div style={{ position: "fixed", width: '100%' }}>
                        <Header login={login} userType={userType} />
                    </div>
                </header>
            }
            <main>
                <Outlet />
            </main>
            <footer></footer>
        </>
    );
}
