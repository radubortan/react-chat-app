import React, { useState } from 'react';
import { useContacts } from '../contexts/contacts-context';
import { useConversations } from '../contexts/conversations-context';
import classes from './NewConversationModal.module.css';
import { IoClose } from 'react-icons/io5';
import Modal from './Modal';
import Button from './Button';

const NewConversationModal = ({ closeModal }) => {
  const [selectedContactIds, setSelectedContactIds] = useState([]);
  const { contacts } = useContacts();
  const { createConversation } = useConversations();

  const handleSubmit = (e) => {
    e.preventDefault();
    createConversation(selectedContactIds);
    closeModal();
  };

  const handleCheckboxChange = (contactId) => {
    //if the contact was already checked
    setSelectedContactIds((prevSelectedContactIds) => {
      if (prevSelectedContactIds.includes(contactId)) {
        return prevSelectedContactIds.filter((prevId) => {
          return contactId !== prevId;
        });
      }
      //if it wasn't checked
      else {
        return [...prevSelectedContactIds, contactId];
      }
    });
  };

  return (
    <Modal onClose={closeModal}>
      <div className={classes.top}>
        <h1 className={classes.title}>New Conversation</h1>
        <button className={classes.closeButton} onClick={closeModal}>
          <IoClose size={30} />
        </button>
      </div>
      <form className={classes.form} onSubmit={handleSubmit}>
        {contacts.map((contact) => {
          return (
            <div key={contact.id} className={classes.inputContainer}>
              <input
                className={classes.checkbox}
                type='checkbox'
                id={contact.id}
                name={contact.id}
                value={selectedContactIds.includes(contact.id)}
                onChange={() => handleCheckboxChange(contact.id)}
              />
              <label className={classes.label} htmlFor={contact.id}>
                {contact.name}
              </label>
            </div>
          );
        })}
        <Button className={classes.createButton}>Create</Button>
      </form>
    </Modal>
  );
};

export default NewConversationModal;
