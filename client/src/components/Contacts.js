import React from 'react';
import { useContacts } from '../contexts/contacts-context';
import { useConversations } from '../contexts/conversations-context';
import classes from './Contacts.module.css';
import { BsFillPersonFill } from 'react-icons/bs';

const sortContacts = (a, b) => {
  const aName = a.name.toLowerCase();
  const bName = b.name.toLowerCase();

  if (aName < bName) {
    return -1;
  }
  if (aName > bName) {
    return 1;
  }
  return 0;
};

const Contacts = () => {
  const { contacts, setSelectedContact } = useContacts();
  const { setActiveConversation } = useConversations();

  const sortedContacts = [...contacts].sort(sortContacts);

  const changeContactHandler = (contact) => {
    setSelectedContact(contact);
    setActiveConversation(null);
  };

  return (
    <ul>
      {sortedContacts.map((contact) => {
        return (
          <li
            className={classes.contact}
            key={contact.id}
            onClick={() => changeContactHandler(contact)}
          >
            <BsFillPersonFill size={30} className={classes.icon} />
            {contact.name}
          </li>
        );
      })}
    </ul>
  );
};

export default Contacts;
