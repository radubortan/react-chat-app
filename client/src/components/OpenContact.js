import React, { Fragment, useState } from 'react';
import classes from './OpenContact.module.css';
import { useContacts } from '../contexts/contacts-context';
import Button from './Button';

const OpenContact = (props) => {
  const { contacts, setContacts, selectedContact } = useContacts();
  const [isEditing, setIsEditing] = useState(false);
  const [enteredName, setEnteredName] = useState(selectedContact.name);

  const inputHandler = (e) => {
    setEnteredName(e.target.value);
  };

  const saveChanges = (e) => {
    e.preventDefault();

    const newName = e.target.name.value;
    selectedContact.name = newName;

    const newContacts = contacts.filter((contact) => {
      return contact.id !== selectedContact.id;
    });
    const finalContacts = [...newContacts, selectedContact];
    setContacts(finalContacts);

    setIsEditing(false);
  };

  return (
    <div className={`${classes.container} ${props.className}`}>
      {!isEditing && (
        <Fragment>
          <p className={classes.name}>{selectedContact.name}</p>
          <div>
            <p className={classes.idLabel}>ID:</p>
            <p className={classes.idValue}>{selectedContact.id}</p>
          </div>
          <Button onClick={() => setIsEditing(true)} className={classes.button}>
            Edit
          </Button>
        </Fragment>
      )}
      {isEditing && (
        <Fragment>
          <p className={classes.name}>{selectedContact.name}</p>
          <form onSubmit={saveChanges}>
            <label className={classes.label} htmlFor='name'>
              New Name
            </label>
            <input
              onChange={inputHandler}
              id='name'
              name='name'
              value={enteredName}
              className={classes.input}
              required
            />
            <div>
              <p className={classes.idLabel}>ID:</p>
              <p className={classes.idValue}>{selectedContact.id}</p>
            </div>
            <div className={classes.buttonsContainer}>
              <Button className={classes.button}>Save</Button>
              <Button
                onClick={() => setIsEditing(false)}
                className={`${classes.button} ${classes.cancelButton}`}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Fragment>
      )}
    </div>
  );
};

export default OpenContact;
