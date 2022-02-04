import React, { useRef, useCallback, Fragment } from 'react';
import { useConversations } from '../contexts/conversations-context';
import classes from './OpenConversation.module.css';
import Button from './Button';

const OpenConversation = ({ className }) => {
  const messageRef = useRef();

  const showTimeHandler = (e) => {
    const index = parseInt(e.target.id);
    if (indexTimeMessage === index) {
      setIndexTimeMessage(null);
    } else {
      setIndexTimeMessage(index);
    }
  };

  //to scroll to the new message
  const setRef = useCallback((node) => {
    if (node) {
      node.scrollIntoView({ smooth: true });
    }
  }, []);

  const {
    sendMessage,
    activeConversationIndex,
    activeConversation,
    indexTimeMessage,
    setIndexTimeMessage,
  } = useConversations();

  const handleSubmit = (e) => {
    e.preventDefault();
    const recipients = activeConversation.recipients;
    const message = messageRef.current.value;

    //if the message isn't just spaces
    if (message.trim().length !== 0) {
      sendMessage(
        recipients.map((recipient) => {
          return recipient.id;
        }),
        message
      );
    }
    //to clear the input
    messageRef.current.value = '';
  };

  return (
    <div className={`${className} ${classes.container}`}>
      {activeConversationIndex === null ? (
        <p className={classes.noConversation}>No Conversation Selected</p>
      ) : (
        <Fragment>
          <div className={classes.header}>
            <p>
              {activeConversation.recipients
                .map((contact) => contact.name)
                .join(', ')}
            </p>
          </div>
          <div className={classes.messageSection}>
            <div className={classes.messages}>
              {activeConversation.messages.map((message, index) => {
                const lastMessage =
                  activeConversation.messages.length - 1 === index;
                return (
                  <div
                    ref={lastMessage ? setRef : null}
                    className={`${classes.message} ${
                      message.fromMe ? classes.myMessage : ''
                    }`}
                    key={index}
                  >
                    <p
                      className={`${classes.messageText} ${
                        message.fromMe ? classes.myMessageText : ''
                      }`}
                      id={index}
                      onClick={showTimeHandler}
                    >
                      {message.text}
                    </p>
                    <p className={classes.messageSender}>
                      {message.fromMe ? 'You' : message.senderName}
                    </p>
                    {index === parseInt(indexTimeMessage) && (
                      <p
                        className={classes.messageTime}
                      >{`At ${message.date.hour}:${message.date.minute}`}</p>
                    )}
                  </div>
                );
              })}
            </div>
            <form
              className={classes.form}
              onSubmit={handleSubmit}
              autoComplete='off'
            >
              <input
                ref={messageRef}
                className={classes.input}
                type='text'
                name='message'
                placeholder='Enter your message'
              />
              <Button className={classes.button}>Send</Button>
            </form>
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default OpenConversation;
