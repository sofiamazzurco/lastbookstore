import "./NewUsersButton.css"
import React from "react";
import { Link } from "react-router-dom";

const NewUsersButton = () => {

    return (
        <div className="add-user">
            <Link to="/newuser">
                <button>Add User</button>
            </Link>
        </div>
    )
}

export default NewUsersButton;
