import React, { useEffect, useState } from "react";
import axios from "axios";
import { Contact } from "../types/Contact";
import ContactForm from "./ContactForm";

const ContactList: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const baseUrl = "https://localhost:44305/api/Contact";

  const fetchContacts = async () => {
    try {
      const response = await axios.get(baseUrl);
      setContacts(response.data);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };

  const handleCreateOrUpdateContact = async (contact: Contact) => {
    try {
      if (contact.id === 0) {
        await axios.post(baseUrl, contact);
      } else {
        await axios.put(`${baseUrl}/${contact.id}`, contact);
      }
      await fetchContacts();
      setSelectedContact(null);
    } catch (error) {
      console.error("Error saving contact:", error);
    }
  };

  const handleDeleteContact = async (id: number) => {
    try {
      await axios.delete(`${baseUrl}/${id}`);
      fetchContacts();
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <div>
      <h1>Contact List</h1>
      <ul>
        {contacts.map((contact) => (
          <li key={contact.id}>
            {contact.firstName} {contact.lastName} - {contact.email} -{" "}
            {contact.phone}
            <button
              onClick={() => {
                console.log("Editing contact:", contact);
                setSelectedContact(contact);
              }}
            >
              Edit
            </button>
            <button onClick={() => handleDeleteContact(contact.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>

      <h2>{selectedContact ? "Edit Contact" : "Add Contact"}</h2>
      <ContactForm
        key={selectedContact?.id || "new"}
        contact={selectedContact}
        onSubmit={handleCreateOrUpdateContact}
        onCancel={() => setSelectedContact(null)}
      />
    </div>
  );
};

export default ContactList;
