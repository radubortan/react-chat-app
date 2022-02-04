import React from 'react';
import Tabs from './Tabs';
import classes from './Sidebar.module.css';
import SidebarContent from './SidebarContent';
import Button from './Button';
import { useState } from 'react';

const Sidebar = (props) => {
  const [activeTab, setActiveTab] = useState('conversations');

  const setActiveTabHandler = (name) => {
    setActiveTab(name);
  };

  const newConversationHandler = () => {
    props.onNewConversation();
  };

  const newContactHandler = () => {
    props.onNewContact();
  };

  const logoutHandler = () => {
    localStorage.removeItem('chat-app-id');
    localStorage.removeItem('chat-app-contacts');
    localStorage.removeItem('chat-app-conversations');
    window.location.reload(false);
  };

  return (
    <div className={`${props.className} ${classes.container}`}>
      <Tabs activeTab={activeTab} setActiveTab={setActiveTabHandler} />
      <SidebarContent activeTab={activeTab} />
      <Button
        onClick={
          activeTab === 'conversations'
            ? newConversationHandler
            : newContactHandler
        }
        className={classes.newButton}
      >
        New {activeTab === 'conversations' ? 'Conversation' : 'Contact'}
      </Button>
      <div className={classes.bottomContainer}>
        <div>
          <p className={classes.idTitle}>Your ID:</p>
          <p className={classes.id}>{props.id}</p>
        </div>
        <Button className={classes.logoutButton} onClick={logoutHandler}>
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
