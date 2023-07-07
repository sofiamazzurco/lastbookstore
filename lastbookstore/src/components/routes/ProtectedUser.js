import React, { useEffect, useState } from "react";
import { Navigate } from "react-router";
import firebaseApp from "../../firebase/config";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import Spinner from "../ui/Spinner/Spinner";

const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);

const ProtectedUser = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (userFirebase) => {
      if (userFirebase) {
        if (!user) {
          setUserWithFirebaseAndRol(userFirebase);
        }
      } else {
        setUser(null);
        setIsLoading(false);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const getRol = async (uid) => {
    const docRef = doc(firestore, `user/${uid}`);
    const docEncryption = await getDoc(docRef);
    const finalInfo = docEncryption.data().rol;
    return finalInfo;
  };

  const setUserWithFirebaseAndRol = async (userFirebase) => {
    const rol = await getRol(userFirebase.uid);
    const userData = {
      uid: userFirebase.uid,
      email: userFirebase.email,
      rol: rol,
    };
    setUser(userData);
    setIsLoading(false);
    console.log("userData final", userData);
  };

  if (isLoading) {
    // Muestra un indicador de carga mientras se obtienen los datos del usuario
    return <div><Spinner /></div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedUser;