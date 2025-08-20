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


import Root, {loader as rootLoader} from "./routes/root";
import Download from './routes/download';
import Enterinfo from './routes/enterinfo';
import Home from './routes/home';
import Employees from './routes/employees';
import Attendance from './routes/attendance'
import Login from './routes/login';
import Account from './routes/account';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    children: [
      {
        path: "/",
        element: <Home />,
      },
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
        path: "/attendance",
        element: <Attendance />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/account",
        element: <Account />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </StrictMode>,
)
