import React, { useContext, useState, useEffect, useCallback } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { useContacts } from './contacts-context';
import { useSocket } from './socket-context';

//returns if 2 arrays contain the same elements
const arrayEquality = (a, b) => {
  if (a.length !== b.length) return false;

  a.sort();
  b.sort();

  return a.every((element, index) => {
    return element === b[index];
  });
};

const ConversationsContext = React.createContext();

export const useConversations = () => {
  return useContext(ConversationsContext);
};

export const ConversationsProvider = ({ id, children }) => {
  const [conversations, setConversations] = useLocalStorage(
    'conversations',
    []
  );
  const { contacts } = useContacts();
  const socket = useSocket();
  const [activeConversationIndex, setActiveConversationIndex] = useState(null);

  //message whose time should be shown
  const [indexTimeMessage, setIndexTimeMessage] = useState(null);

  //to create a conversation
  const createConversation = (recipients) => {
    setConversations((prevConversations) => {
      return [...prevConversations, { recipients, messages: [] }];
    });
  };

  //to set the conversation that is being viewed
  const setActiveConversation = (index) => {
    setActiveConversationIndex(index);
    setIndexTimeMessage(null);
  };

  //to add a message to a conversation or create a new conversation
  const addMessageToConversation = useCallback(
    ({ recipients, text, sender }) => {
      const today = new Date();
      const date = {
        day: today.getDate(),
        month: today.getMonth(),
        year: today.getFullYear(),
        weekDay: today.getDay(),
        hour: today.getHours(),
        minute: today.getMinutes(),
        second: today.getSeconds(),
      };
      setConversations((prevConversations) => {
        let madeChange = false;
        const newMessage = { sender, text, date };
        const newConversations = prevConversations.map((conversation) => {
          if (arrayEquality(conversation.recipients, recipients)) {
            //if we already have a conversations with those recipients
            madeChange = true;
            return {
              ...conversation,
              messages: [...conversation.messages, newMessage],
            };
          }

          return conversation;
        });

        //if we added the message to an already existing conversation
        if (madeChange) {
          return newConversations;
        }
        //if not, we create a new conversation
        else {
          return [...prevConversations, { recipients, messages: [newMessage] }];
        }
      });
    },
    [setConversations]
  );

  useEffect(() => {
    if (socket == null) {
      return;
    }
    //when we receive a message from the server, we execute addMessageToConversation
    socket.on('receive-message', addMessageToConversation);

    return () => socket.off('receive-message');
  }, [socket, addMessageToConversation]);

  //to send messages
  const sendMessage = (recipients, text) => {
    //sends the message through the server to the recipients
    socket.emit('send-message', { recipients, text });

    addMessageToConversation({ recipients, text, sender: id });
  };

  const formattedConversations = conversations.map((conversation, index) => {
    const recipients = conversation.recipients.map((recipient) => {
      const contact = contacts.find((contact) => {
        return contact.id === recipient;
      });
      //if we have a name set for the contact, we use the name, otherwise we use the id as the name
      const name = (contact && contact.name) || recipient;
      return { id: recipient, name };
    });

    const messages = conversation.messages.map((message) => {
      const contact = contacts.find((contact) => {
        return contact.id === message.sender;
      });
      const name = (contact && contact.name) || message.sender;
      const fromMe = id === message.sender;
      return { ...message, senderName: name, fromMe };
    });

    return { ...conversation, messages, recipients };
  });

  const contextValue = {
    conversations: formattedConversations,
    sendMessage,
    createConversation,
    setActiveConversation: setActiveConversation,
    activeConversationIndex: activeConversationIndex,
    activeConversation: formattedConversations[activeConversationIndex],
    indexTimeMessage,
    setIndexTimeMessage,
  };

  return (
    <ConversationsContext.Provider value={contextValue}>
      {children}
    </ConversationsContext.Provider>
  );
};
