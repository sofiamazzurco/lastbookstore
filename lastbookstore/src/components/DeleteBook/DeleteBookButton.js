import React from 'react';
import { db } from '../../firebase/configDB';
import { toast } from 'react-toastify';

const DeleteBookButton = ({ bookId }) => {
  const handleDeleteBook = () => {
    const confirmDelete = window.confirm("¿Estás seguro/a de que deseas eliminar este libro?");

    if (confirmDelete) {
      db.collection("books")
        .doc(bookId)
        .delete()
        .then(() => {
          toast.success("¡Libro eliminado exitosamente!");
          console.log("Libro eliminado exitosamente");
        })
        .catch((error) => {
          toast.error("Error al eliminar el libro");
          console.error("Error al eliminar el libro", error);
        });
    }
  };

  return (
    <button onClick={handleDeleteBook}>Delete</button>
  );
};

export default DeleteBookButton;