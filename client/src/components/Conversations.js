import React from 'react';
import { useConversations } from '../contexts/conversations-context';
import { BsFillChatRightFill } from 'react-icons/bs';
import classes from './Conversations.module.css';
import { useContacts } from '../contexts/contacts-context';

const Conversations = () => {
  const { conversations, activeConversationIndex, setActiveConversation } =
    useConversations();
  const { setSelectedContact } = useContacts();

  const changeConversationHandler = (index) => {
    setActiveConversation(index);
    setSelectedContact(null);
  };

  return (
    <ul>
      {conversations.map((conversation, index) => {
        return (
          <li
            className={`${classes.conversation} ${
              index === activeConversationIndex ? classes.active : ''
            }`}
            key={index}
            onClick={() => {
              changeConversationHandler(index);
            }}
          >
            <BsFillChatRightFill
              size={30}
              className={`${classes.icon} ${
                index === activeConversationIndex ? classes.activeIcon : ''
              }`}
            />
            {conversation.recipients.map((contact) => contact.name).join(', ')}
          </li>
        );
      })}
    </ul>
  );
};

export default Conversations;
