import React from 'react';
import { Link } from 'react-router-dom';

const ListUserButton = () => {
  return (
    <Link to="/listuser">
      <button>List User</button>
    </Link>
  );
};

export default ListUserButton;