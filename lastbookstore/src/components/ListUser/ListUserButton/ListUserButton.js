import React from 'react';
import { Link } from 'react-router-dom';

const ListUserButton = () => {
  return (
    <div className='add-admin'>
    <Link to="/listuser">
      <button>List User</button>
    </Link>
    </div>
  );
};

export default ListUserButton;