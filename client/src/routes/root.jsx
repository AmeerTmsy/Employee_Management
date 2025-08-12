import { Outlet, useNavigate } from "react-router-dom";
import Header from "../components/header";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export default function Root() {
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
                        <Header login={login} />
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
