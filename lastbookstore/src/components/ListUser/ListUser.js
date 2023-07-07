import React, { useState, useEffect } from "react";
import "./ListUser.css";
import { db } from "../../firebase/configDB";
import Navbar from "../Navbar/Navbar";
import { Form } from "react-bootstrap";

const ListUser = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    db.collection("user")
      .get()
      .then((snapshot) => {
        const usersData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(usersData);
      })
      .catch((error) => {
        alert("Error al obtener los usuarios", error);
      });
  }, []);

  const handleDeleteUser = (userId) => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que deseas eliminar este usuario?"
    );
    if (confirmDelete) {
      db.collection("user")
        .doc(userId)
        .delete()
        .then(() => {
          setUsers((prevUsers) =>
            prevUsers.filter((user) => user.id !== userId)
          );
          alert("Usuario eliminado correctamente");
        })
        .catch((error) => {
          alert("Error al eliminar el usuario", error);
        });
    }
  };

  const handleChangeRole = (userId, event) => {
    const newRole = event.target.value;
    db.collection("user")
      .doc(userId)
      .update({ rol: newRole })
      .then(() => {
        setUsers((prevUsers) =>
          prevUsers.map((user) => {
            if (user.id === userId) {
              return { ...user, rol: newRole };
            }
            return user;
          })
        );
        alert("Rol actualizado correctamente");
      })
      .catch((error) => {
        alert("Error al actualizar el rol", error);
      });
  };

  return (
    <div>
      <Navbar />
      <div className="user-list">
        <h2>User List</h2>
        <div className="user-grid">
          {users.map((user) => (
            <div className="user-card" key={user.id}>
              <h3>{user.name}</h3>
              <p>{user.correo}</p>
              <Form.Select
                className=" mb-3"
                value={user.rol}
                onChange={(event) => handleChangeRole(user.id, event)}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
                <option value="superAdmin">Super Admin</option>
              </Form.Select>
              <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListUser;