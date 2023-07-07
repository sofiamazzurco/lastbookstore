import React from "react";
import { toast } from "react-toastify";

const EditBookButton = ({
  bookId,
  handleEditBook,
  books,
  setEditingBookId,
  setUpdatedBookTitle,
  setUpdatedBookAuthor,
  setUpdatedBookPages,
  setUpdatedBookDescription,
  setUpdatedBookImage,
}) => {
  const handleClick = () => {
    const bookToEdit = books.find((book) => book.id === bookId);
    if (bookToEdit) {
      const confirmEdit = window.confirm("¿Estás seguro de editar este libro?");

      if (confirmEdit) {
        setEditingBookId(bookId);
        setUpdatedBookTitle(bookToEdit.title);
        setUpdatedBookAuthor(bookToEdit.author);
        setUpdatedBookPages(bookToEdit.pages);
        setUpdatedBookDescription(bookToEdit.description);
        setUpdatedBookImage(bookToEdit.img);
        handleEditBook(bookId);
      }
    }
  };

  
  return (
    <button onClick={handleClick}>Edit</button>
  );
};

export default EditBookButton;
