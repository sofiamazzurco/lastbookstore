import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { ThemeContext } from "../../services/theme/theme.context";
import ComboLanguage from "../../ui/ComboLanguage/ComboLanguage";
import useTranslation from "../../custom/useTranslation/useTranslation";
import ToggleTheme from "../../ui/ToggleTheme";
import { Button } from "react-bootstrap";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import firebaseApp from "../../../firebase/config";
const firestore = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);


const AddAdminForm = () => {
    //constantes que setean 
    const { theme } = useContext(ThemeContext);
    const navigation = useNavigate();
    const translate = useTranslation();
    const [error, setError] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const registerUser = async () => {
        const infoUser = await createUserWithEmailAndPassword(
          auth,
          email,
          password,
        );
        console.log(infoUser.user.uid);
        const docRef = doc(firestore, `user/${infoUser.user.uid}`);
        setDoc(docRef, {
          correo: email,
          rol: "admin", // Establece el rol como "rol"
          password: password
        });
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        setError("");
         // Validar los campos antes de enviarlo al servidor
        if ( !email || !password ) {
            alert(translate("errorComplete"));
            return;
        }

       registerUser()
        .then(() => {
            navigation("/registered");
        })
        .catch((error) => {
            console.log(error.code);
            if (error.code === "auth/internal-error") {
                setError(translate("errorEmail"));
            } else if (error.code === "auth/weak-password"){
                setError(translate("errorPassword"));
            } else if (error.code === "auth/email-already-in-use" ){
                setError(translate("errorRegisted"));
            }
        });
    }


    return (
        <div>
            <div className={`split-left ${theme === "dark" && "split-left-dark"}`}>

                <div className={`img ${theme === "dark" && "img-dark"}`}>
                    <img src="https://utn.edu.ar/images/logo-utn.png" />
                </div>

                <div className="signup-container">

                    <div className={`signup-box ${theme === "dark" && "signup-box-dark"}`}>

                        <h4 className={`${email.length === 0 && "red-text"}`}>
                            {translate("addNewAdmin")}
                        </h4>

                        <form onSubmit={handleSignup}>
                            <div className="input-container">

                                <div className="input-container">
                                    <input
                                        className="input-control"
                                        placeholder="Email"
                                        type="email"
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        name="email"
                                        value={email}
                                    />
                                </div>

                                <div className="input-container">
                                    <input
                                        className="input-control"
                                        placeholder={translate("password")}
                                        type="password"
                                        name="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>

                                <div className="mb-2">
                                    <Button className="button" type="submit">
                                        {translate("addNewAdmin")}
                                    </Button>
                                </div>

                            </div>
                        </form>

                        {error && <p>{error}</p>}

                    </div>
                </div>
            </div>

            <div className="split-right">
                <div className="d-grid gap-2 d-md-flex justify-content-md-end me-md-2 p-2">
                    <ToggleTheme />
                    <ComboLanguage />
                </div>
            </div>
        </div>
    );
}

export default AddAdminForm;