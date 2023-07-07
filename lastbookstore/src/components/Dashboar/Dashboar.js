import React, { useState, useEffect } from "react";
import AddAdminButton from "../AddAdmin/AddAdminButton/AddAdminButton";
import BookList from "../BookList/BookList";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import NewBookButton from "../NewBookButton/NewBookButton";
//-----
import { useNavigate } from "react-router";
import firebaseApp from "../../firebase/config";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import ListUser from "../ListUser/ListUser";
import ListUserButton from "../ListUser/ListUserButton/ListUserButton";
const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);

const Dashboard = () => {
  const navigation = useNavigate();
  const [user, setUser] = useState(null);
  const [books, setBooks] = useState([]);

  const addBookHandler = (book) => {
    const newBooksArray = [book, ...books];
    setBooks(newBooksArray);
    // Aquí puedes realizar cualquier otra acción relacionada con el nuevo libro agregado
  };

  const getRol = async (uid) => {
    const docRef = doc(firestore, `user/${uid}`);
    const docEncryption = await getDoc(docRef);
    const finalInfo = docEncryption.data().rol;
    return finalInfo;
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (userFirebase) => {
      if (userFirebase) {
        getRol(userFirebase.uid).then((rol) => {
          const userData = {
            uid: userFirebase.uid,
            email: userFirebase.email,
            rol: rol,
          };
          setUser(userData);
          console.log("userData final", userData);
        });
      } else {
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
      <Navbar/>  
      {(user?.rol === "admin" || user?.rol === "superadmin") && <AddAdminButton/>}
      {(user?.rol === "admin" || user?.rol === "superadmin") && <NewBookButton/>}
      {(user?.rol  === "superadmin") && <ListUserButton />}
      <BookList />
      <Footer />
    </>
  );
};

export default Dashboard;
