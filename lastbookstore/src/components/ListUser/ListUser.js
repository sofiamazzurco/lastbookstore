import React, { useState, useEffect } from 'react';
import './ListUser.css';
import { db } from '../../firebase/configDB';
import Navbar from '../Navbar/Navbar';

const ListUser = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    db.collection('user')
      .get()
      .then((snapshot) => {
        const usersData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(usersData);
      })
      .catch((error) => {
        alert('Error al obtener los usuarios', error);
      });
  }, []);

  const handleDeleteUser = (userId) => {
    const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar este usuario?');
    if (confirmDelete) {
      db.collection('user')
        .doc(userId)
        .delete()
        .then(() => {
          setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
          alert('Usuario eliminado correctamente');
        })
        .catch((error) => {
          alert('Error al eliminar el usuario', error);
        });
    }
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
              <p>{user.email}</p>
              <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListUser;