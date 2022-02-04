import React from 'react';
import classes from './SidebarContent.module.css';
import Conversations from './Conversations';
import Contacts from './Contacts';

const SidebarContent = (props) => {
  return (
    <div className={classes.container}>
      {props.activeTab === 'conversations' ? <Conversations /> : <Contacts />}
    </div>
  );
};

export default SidebarContent;
