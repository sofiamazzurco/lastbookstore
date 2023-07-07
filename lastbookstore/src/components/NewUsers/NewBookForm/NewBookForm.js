import React, { useState } from "react";
import { db } from "../../firebase/configDB";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

const NewBookForm = ({ onHideForm }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [pages, setPages] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  // Create a reference to the file we want to download
  const storage = getStorage();
  const starsRef = ref(storage, 'images/id-1.jpg');

  // Create a reference from a Google Cloud Storage URI
  const gsReference = ref(storage, 'gs://fir-bookstore-e00e7.appspot.com/id-1.jpg');

  // Get the download URL
  getDownloadURL(starsRef)
    .then((url) => {
      // Insert url into an <img> tag to "download"
    })
    .catch((error) => {
      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      switch (error.code) {
        case 'storage/object-not-found':
          // File doesn't exist
          break;
        case 'storage/unauthorized':
          // User doesn't have permission to access the object
          break;
        case 'storage/canceled':
          // User canceled the upload
          break;
        case 'storage/unknown':
          // Unknown error occurred, inspect the server response
          break;
      }
    });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Crear un nuevo documento en la colección "books"
    db.collection("books")
      .add({
        title,
        author,
        pages,
        description,
        image,
      })
      .then(() => {
        alert("Libro agregado a Firebase");
        onHideForm(); // Ocultar el formulario después de agregar el libro
      })
      .catch((error) => {
        alert("Error al agregar el libro a Firebase", error);
      });
  };

  return (
    <div>
      <h2>New Book Form</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </label>
        <label>
          Author:
          <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} required />
        </label>
        <label>
          Pages:
          <input type="number" value={pages} onChange={(e) => setPages(e.target.value)} required />
        </label>
        <label>
          Description:
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
        </label>
        <label>
          Image URL:
          <input type="text" value={image} onChange={(e) => setImage(e.target.value)} required />
        </label>
        <button type="submit">Add Book</button>
        <button type="button" onClick={onHideForm}>Cancel</button>
      </form>
    </div>
  );
};

export default NewBookForm;