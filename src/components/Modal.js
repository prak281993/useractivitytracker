import React from 'react';
import './Modal.css';
import Calendar from './Calendar';
import AllActivities from './AllActivities';

function Modal(props) {
    const closeModal = () => {
        props.closeModal();
    }
    return (
        <div id="myModal" className="modal">
            <div className="modal-content">
                <span onClick={closeModal} className="close">&times;</span>
                <div className="activity_content">
                    <AllActivities currentUser={props.currentUser} />
                    <Calendar currentUser={props.currentUser} />
                </div>
            </div>
        </div>
    )
}

export default Modal
