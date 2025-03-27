import React from "react";

interface Contact {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  job: string;
}

interface ContactListProps {
  contacts: Contact[];
  onEdit: (contact: Contact) => void;
  onDelete: (id: number) => void;
}

const ContactList: React.FC<ContactListProps> = ({ contacts, onEdit, onDelete }) => {
  return (
    <div className="contact-list">
      {contacts.length === 0 ? (
        <p>No contacts available.</p>
      ) : (
        <ul>
          {contacts.map((contact) => (
            <li key={contact.id}>
              <strong>{contact.name}</strong> ({contact.job})  
              <br />
               Email: {contact.email} | Phone: {contact.phone}  
              <br />
               Address: {contact.address}
              <br />
              <button style={{ marginRight: "10px" }} onClick={() => onEdit(contact)}>Edit</button>
              <button onClick={() => onDelete(contact.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ContactList;
