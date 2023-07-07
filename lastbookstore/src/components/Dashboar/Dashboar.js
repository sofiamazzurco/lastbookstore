import React, { useState } from "react";
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
  }

  onAuthStateChanged(auth, (userFirebase) => {
    if (userFirebase) {
      if (!user) {
        setUserWithFirebaseAndRol(userFirebase);
      }
    } else {
      setUser(null);
    }
  })
  
  return (
    <div>
      <Navbar/>  
      {user && user.rol !== "user" && <AddAdminButton />}
      {user && user.rol !== "user" && <NewBookButton />}
      <BookList />
      <Footer />
    </div>
  );
};

export default Dashboard;