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

import Root from "./routes/root";
import Download from './routes/download';
import Enterinfo from './routes/enterinfo';
import Home from './routes/home';
import Employees from './routes/employees';
import Presence from './routes/presence'
import Login from './routes/login';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
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
        path: "/presence",
        element: <Presence />,
      },
      {
        path: "/login",
        element: <Login />,
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
