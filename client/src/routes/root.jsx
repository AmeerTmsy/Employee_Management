import { Outlet, useLoaderData, useNavigate, useLocation } from "react-router-dom";
import Header from "../components/header";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { authenticate } from "../features/login/loginSlice";
import classes from './root.module.css';
import HomeLeftSideBar from "../components/homeLeftSideBar";

export async function loader() {
    try {
        const res = await axios.get(
            `${import.meta.env.VITE_API_URL}/auth/loginVerify`,
            {
                withCredentials: true, 
                headers: {
                    "ngrok-skip-browser-warning": "true"
                }
            }
        )
        const userData = res?.data?.employee;
        console.log("res: ", res);
        return { userData };
    } catch (error) {
        console.error("Authentication verification failed:", error);
        return { userData: null };
    }
}

export default function Root() {
    const dispatch = useDispatch();
    const { userData } = useLoaderData();
    const [isInitialized, setIsInitialized] = useState(false);
    const [sideBarGrow, setSideBarGrow] = useState(true);
    const location = useLocation();

    useEffect(() => {
        if (userData && !isInitialized) {
            dispatch(authenticate({ userType: userData.role, name: userData.name, userId: userData._id }));
            setIsInitialized(true);
        } else if (!userData && !isInitialized) {
            setIsInitialized(true);
        }
    }, [userData, dispatch, isInitialized]);

    const navigate = useNavigate();
    const { login, user } = useSelector((state) => state.login)

    useEffect(() => {
        user.userType ? console.log("user: ", user) : console.log("user is not here yet")
    }, [login])


    useEffect(() => {
        // Only redirect to login if we're initialized and have no user data
        // Don't redirect if we're already on the login page
        if (isInitialized && !userData && !login && location.pathname !== '/login') {
            navigate('/login', {
                state: { from: location.pathname },
                replace: true
            });
        }
    }, [isInitialized, userData, login, navigate, location.pathname])

    // Show loading state while authentication is being checked
    if (!isInitialized) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                fontSize: '18px'
            }}>
                Loading...
            </div>
        );
    }


    const mainStyles = {
        width: "100%",
        height: "100vh",
        display: "flex",
        background: '#fbfee8ff',
        // backgroundImage: "url('https://images.unsplash.com/photo-1464618663641-bbdd760ae84a?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        // backgroundRepeat: "no-repeat"
    };

    return (
        <>
            <div style={mainStyles}>
                {login && <div className={classes.sideMainBar} style={{ width: sideBarGrow ? '23%' : '5%' }}>
                    <HomeLeftSideBar setSideBarGrow={setSideBarGrow} sideBarGrow={sideBarGrow} />
                </div>}
                <section style={{ width: login ? (sideBarGrow ? '77%' : '95%') : '100%', height: '100vh' }} className={classes.rightMainSection}>
                    {login &&
                        <header style={{ height: '9.9vh', }}>
                            <div style={{ position: "fixed", width: '100%', height: '10%', zIndex: '999' }}>
                                <Header login={login} user={user} />
                            </div>
                        </header>
                    }
                    {/* backdropFilter: 'blur(150px)', WebkitBackdropFilter: 'blur(100px)', */}
                    <div
                        className={classes.scrolling}
                        style={{
                            background: 'transparent', // ✅ translucent white
                            backdropFilter: 'blur(0px)',
                            WebkitBackdropFilter: 'blur(0px)',
                            overflow: 'auto',
                            borderRadius: '0.5em',
                            height: login ? '88.4vh' : '100vh',
                            margin: '0.2em 10.5px 0.2em 0em'
                        }}>
                        <Outlet />
                    </div>
                </section>
            </div>
            <footer></footer>
        </>
    );
}
