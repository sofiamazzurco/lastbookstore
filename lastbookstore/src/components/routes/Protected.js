import React from "react";
import { Navigate } from "react-router";
import firebaseApp from "../../firebase/config";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { useState } from "react";
const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);

const Protected = ({ children }) => {
  const [user, setUser] = useState(null);

  const getRol = async (uid) => {
    const docRef = doc(firestore, `user/${uid}`);
    const docEncryption = await getDoc(docRef);
    const finalInfo = docEncryption.data().rol;
    return finalInfo;
  };

  const setUserWithFirebaseAndRol = (userFirebase) => {
    getRol(userFirebase.uid).then((rol) => {
      const userData = {
        uid: userFirebase.uid,
        email: userFirebase.email,
        rol: rol,
      };
      setUser(userData);
      console.log("userData final", userData);
    });
  };

  onAuthStateChanged(auth, (userFirebase) => {
    if (userFirebase) {
      if (!user) {
        setUserWithFirebaseAndRol(userFirebase);
      }
    } else {
      setUser(null);
    }
  });

  if (!user || user.rol === "user") return <Navigate to="/login" replace />;

  return <>{children}</>;
};

export default Protected;