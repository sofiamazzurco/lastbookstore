import React from "react";

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
      setEditingBookId(bookId);
      setUpdatedBookTitle(bookToEdit.title);
      setUpdatedBookAuthor(bookToEdit.author);
      setUpdatedBookPages(bookToEdit.pages);
      setUpdatedBookDescription(bookToEdit.description);
      setUpdatedBookImage(bookToEdit.img);
      handleEditBook(bookId);
    }
  };

  return (
    <button onClick={handleClick}>Edit</button>
  );
};

export default EditBookButton;