import React, { useState } from 'react';
import ContactForm from './ContactForm';
import ContactList from './ContactList';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [currentContact, setCurrentContact] = useState(null);

  const addContact = (contact) => {
    const newContact = { ...contact, id: Date.now() };
    setContacts([...contacts, newContact]);
  };

  const viewContactDetails = (contactId) => {
    const contact = contacts.find((c) => c.id === contactId);
    setCurrentContact(contact);
  };

  const deleteContact = (contactId) => {
    const updatedContacts = contacts.filter((c) => c.id !== contactId);
    setContacts(updatedContacts);
    setCurrentContact(null);
  };

  return (
    <div>
      <h1>Contact Management App</h1>
      <ContactForm addContact={addContact} />
      <ContactList
        contacts={contacts}
        viewContactDetails={viewContactDetails}
        deleteContact={deleteContact}
      />
      {currentContact && (
        <div>
          <h2>Contact Details</h2>
          <p>First Name: {currentContact.firstName}</p>
          <p>Last Name: {currentContact.lastName}</p>
          <button onClick={() => setCurrentContact(null)}>Close Details</button>
        </div>
      )}
    </div>
  );
};

export default App;
