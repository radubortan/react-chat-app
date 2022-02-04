import React from 'react';
import Sidebar from './Sidebar';
import OpenConversation from './OpenConversation';
import { useState } from 'react';
import NewContactModal from './NewContactModal';
import NewConversationModal from './NewConversationModal';
import classes from './Dashboard.module.css';
import OpenContact from './OpenContact';
import { useContacts } from '../contexts/contacts-context';

const Dashboard = ({ id }) => {
  const [showNewContactForm, setShowNewContactForm] = useState(false);
  const [showNewConversationForm, setShowNewConversationForm] = useState(false);
  const { selectedContact } = useContacts();

  const showNewContactHandler = () => {
    setShowNewContactForm(true);
  };

  const hideNewContactHandler = () => {
    setShowNewContactForm(false);
  };

  const showNewConversationHandler = () => {
    setShowNewConversationForm(true);
  };

  const hideNewConversationHandler = () => {
    setShowNewConversationForm(false);
  };

  return (
    <div className={classes.container}>
      {showNewContactForm && (
        <NewContactModal closeModal={hideNewContactHandler} />
      )}
      {showNewConversationForm && (
        <NewConversationModal closeModal={hideNewConversationHandler} />
      )}
      <Sidebar
        onNewContact={showNewContactHandler}
        onNewConversation={showNewConversationHandler}
        className={classes.sidebar}
        id={id}
      />
      {selectedContact ? (
        <OpenContact className={classes.contact} />
      ) : (
        <OpenConversation className={classes.conversation} />
      )}
    </div>
  );
};

export default Dashboard;
