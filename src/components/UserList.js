import React, { useState } from 'react';
import data from '../data.json';
import './UserList.css';
import Modal from './Modal';

function UserList() {
    const [users, setUsers] = useState(data.members);
    const [showModal, setShowModal] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const openModal = (user) => {
        setShowModal(true);
        setCurrentUser(user);
    }
    const closeModal = () => {
        setShowModal(false);
    }
    return (
        <div className="users">
            <div className="user_content">
                <h2>User List</h2>
                <ul className="user_list">
                    <li className="headers">
                        <span className="number">Id</span>
                        <span className="name">Name</span>
                        <span className="place">City</span>
                        <span className="place">Continent</span>
                    </li>
                    {
                        users.map(user =>
                            <li onClick={(e) => openModal(user)} key={user.id} className="list_items">
                                <span className="number">{user.id}</span>
                                <span className="name">{user.real_name}</span>
                                <span className="place">{user.tz.split('/')[1]}</span>
                                <span className="place">{user.tz.split('/')[0]}</span>
                            </li>)
                    }
                </ul>
                {(showModal) ? <Modal currentUser={currentUser} closeModal={closeModal} /> : null}
            </div>
        </div>
    )
}

export default UserList;
