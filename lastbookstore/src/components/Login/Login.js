import React, { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router";
import ToggleTheme from "../ui/ToggleTheme";
import { ThemeContext } from "../services/theme/theme.context";
import ComboLanguage from "../ui/ComboLanguage/ComboLanguage";
import useTranslation from "../custom/useTranslation/useTranslation";
import firebaseApp from "../../firebase/config";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";
const auth = getAuth(firebaseApp);


const Login = () => {
  //constantes que setean 
  const { theme } = useContext(ThemeContext);
  const navigation = useNavigate();
  const translate = useTranslation();
  const [error, setError] = useState("");


  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;
    // Validar los campos antes de enviarlo al servidor
    if (!email || !password) {
      alert(translate("errorComplete"));
      return;
    }
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigation("/home");
    } catch (error) {
      console.log(error.code);
        if (error.code === "auth/internal-error") {
          setError(translate("errorEmail"));
        } else if (error.code === "auth/weak-password") {
          setError(translate("errorPassword"));
        } else if (error.code === "auth/email-already-in-use") {
          setError(translate("errorRegisted"));
        } else if (error.code === "auth/user-not-found") {
          setError(translate("errorLogined"));
        }
    }
      
  }

  return (
    <div>

      <div className={`split-left ${theme === "dark" && "split-left-dark"}`}>

        <div className={`img ${theme === "dark" && "img-dark"}`}>
          <img src="https://utn.edu.ar/images/logo-utn.png" />
        </div>

        <div className="login-container">

          <div className={`login-box ${theme === "dark" && "login-box-dark"}`}>
            <h4 >
              {translate("welcome")}
            </h4>

            <form onSubmit={handleSignup}>

              <div>
                <div className="input-container">
                  <input
                    className="input-control"
                    placeholder="Email"
                    type="email"
                    required
                    name="email"
                  />
                </div>

                <div className="input-container">
                  <input
                    className="input-control"
                    placeholder={translate("password")}
                    type="password"
                    name="password"
                  />
                </div>

                <div className="mb-2">
                  <Button className="button" type="submit">
                    {translate("login")}
                  </Button>
                </div>

                <p>{translate("account")} <Link to={"/singin"}>Singin</Link>
                </p>

              </div>
              {error && <p>{error}</p>}
            </form>

          </div>
        </div>
      </div>

      <div className="split-right">
        <div className="d-grid gap-2 d-md-flex justify-content-md-end me-md-2 p-2">
          <ToggleTheme />
          <ComboLanguage />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;
