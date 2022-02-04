import React from 'react';
import classes from './Tabs.module.css';

const Tabs = (props) => {
  const setActiveHandler = (e) => {
    props.setActiveTab(e.target.id);
  };

  return (
    <div className={classes.container}>
      <div
        id={'conversations'}
        className={`${classes.tab} ${classes.leftTab} ${
          props.activeTab === 'conversations' ? classes.active : ''
        }`}
        onClick={setActiveHandler}
      >
        Conversations
      </div>
      <div
        id={'contacts'}
        className={`${classes.tab} ${classes.rightTab} ${
          props.activeTab === 'contacts' ? classes.active : ''
        }`}
        onClick={setActiveHandler}
      >
        Contacts
      </div>
    </div>
  );
};

export default Tabs;
