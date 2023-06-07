import React from 'react';

const ContactList = ({ contacts, viewContactDetails, deleteContact }) => {
  return (
    <ul>
      {contacts.map((contact) => (
        <li key={contact.id}>
          {contact.firstName} {contact.lastName}
          <button onClick={() => viewContactDetails(contact.id)}>
            View Details
          </button>
          <button onClick={() => deleteContact(contact.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default ContactList;
