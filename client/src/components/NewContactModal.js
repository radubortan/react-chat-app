import React, { useRef } from 'react';
import { useContacts } from '../contexts/contacts-context';
import classes from './NewContactModal.module.css';
import { IoClose } from 'react-icons/io5';
import Modal from './Modal';
import Button from './Button';

const NewContactModal = ({ closeModal }) => {
  const idRef = useRef();
  const nameRef = useRef();
  const { createContact } = useContacts();

  function handleSubmit(e) {
    e.preventDefault();
    createContact(idRef.current.value, nameRef.current.value);
    closeModal();
  }

  return (
    <Modal onClose={closeModal}>
      <div className={classes.top}>
        <h1 className={classes.title}>New Contact</h1>
        <button className={classes.closeButton} onClick={closeModal}>
          <IoClose size={30} />
        </button>
      </div>
      <form onSubmit={handleSubmit} className={classes.form}>
        <label htmlFor='id'>ID</label>
        <input ref={idRef} type='text' id='id' name='id' required />
        <label htmlFor='name'>Name</label>
        <input ref={nameRef} type='text' id='name' name='name' required />
        <Button className={classes.createButton}>Create</Button>
      </form>
    </Modal>
  );
};

export default NewContactModal;
