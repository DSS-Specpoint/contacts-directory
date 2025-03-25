import React from "react";

type Contact = {
  id?: number;
  name: string;
  email: string;
  phone: string;
};

type ContactListProps = {
  contacts: Contact[];
  onEdit: (contact: Contact) => void;
  onDelete: (id: number) => void;
};

const ContactList: React.FC<ContactListProps> = ({ contacts, onEdit, onDelete }) => {
  return (
    <div className="ContactList">
        {contacts.map((contact) => (
          <div className="contact-card" key={contact.id}>
            <p><strong>Name:</strong> {contact.name}</p>
            <p><strong>Email:</strong> {contact.email}</p>
            <p><strong>Phone:</strong> {contact.phone}</p>
            <button className="edit" onClick={() => onEdit(contact)}>Edit</button>
            <button className="delete" onClick={() => onDelete(contact.id!)}>Delete</button>
          </div>
        ))}
    </div>
  );
};

export default ContactList;
