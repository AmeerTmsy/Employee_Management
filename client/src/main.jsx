import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from './error-page';
import { Provider } from 'react-redux';
import store from './app/store';


import Root, { loader as rootLoader } from "./routes/root";
import Download from './routes/download';
import Enterinfo from './routes/enterinfo';
import Home from './routes/home';
import Employees from './routes/employees';
import Attendance from './routes/attendance'
import Login from './routes/login';
import Account from './routes/account';
import Taskes from './routes/taskes';
import VerifyAdmin from './components/verificationComponents/verifyAdmin';
import VerifyEmployee from './components/verificationComponents/verifyEmployee';
import Project from './routes/project';
import Leave from './routes/leave';
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    loader: rootLoader,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/admin",
        element: <VerifyAdmin />,
        children: [
          {
            path: "addInfo",
            element: <Enterinfo />,
          },
          {
            path: "downloads",
            element: <Download />,
          },
          {
            path: "employees",
            element: <Employees />,
          },
          {
            path: "attendance",
            element: <Attendance />,
          },
          {
            path: "account",
            element: <Account />,
          },
          {
            path: "taskes",
            element: <Taskes />,
          },
          {
            path: "projects",
            element: <Project />,
          },
          {
            path: "leave",
            element: <Leave />,
          },
        ]
      },
      {
        path: "employee",
        element: <VerifyEmployee />,
        children: [
          {
            path: "taskes",
            element: <Taskes />,
          },
          {
            path: "attendance",
            element: <Attendance />,
          },
          {
            path: "account",
            element: <Account />,
          },
        ]
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
