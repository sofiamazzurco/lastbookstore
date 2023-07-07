import { useContext } from "react";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

import "./App.css";

import Login from "./components/Login/Login";
import Dashboard from "./components/Dashboar/Dashboar";
//import Protected from "./components/routes/Protected";
import NotFound from "./components/routes/NotFound";
import { ThemeContext } from "./components/services/theme/theme.context";
import Singin from "./components/Singup/Singup";
import Registered from "./components/routes/Registered";
import AddAdminForm from "./components/AddAdmin/AddAdminForm/AddAdminForm";
import NewBookButton from "./components/NewBookButton/NewBookButton";
import NewUsersButton from "./components/NewUsers/NewUsersButton/NewUsersButton";
import ListUser from "./components/ListUser/ListUser";
import Protected from "./components/routes/Protected";

const App = () => {
  const { theme } = useContext(ThemeContext);

  const router = createBrowserRouter([
    { path: "/", element: <Navigate to="login" /> },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/singin",
      element: <Singin />, 
    },
    {
      path: "/registered",
      element: <Registered />, 
    },
    {
      path: "/home",
      element: (
          <Dashboard />
      ),
    },
    {
      path: "/listuser",
      element: <ListUser />
    },
    {
      path: "*",
      element: <NotFound />,
    },
    {
      path: "/addAdmin",
      element:<Protected><AddAdminForm/></Protected>
      
    },
  ]);
  return (
    <div className={`${theme === "dark" && "dark-theme"}`}>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;