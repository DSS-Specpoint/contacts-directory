import React, { useState, useEffect } from "react";
import ContactForm from "../components/ContactForm";
import ContactList from "../components/ContactList";
import API_BASE_URL from "../config";
import "../styles.css";

interface Contact {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  job: string;
}

const ContactsPage: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [editingContact, setEditingContact] = useState<Contact | null>(null);

  // Fetch contacts from backend
  const fetchContacts = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/contacts`);
      const data = await response.json();
      setContacts(data);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  // Handle deleting a contact
  const handleDelete = async (id: number) => {
    try {
      await fetch(`${API_BASE_URL}/contacts/${id}`, { method: "DELETE" });

      // Update UI immediately after deletion
      setContacts(prevContacts => prevContacts.filter(contact => contact.id !== id));
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  return (
    <div className="container">
      <h1>Contact Manager</h1>
      <ContactForm onSave={fetchContacts} editingContact={editingContact} />
      <ContactList contacts={contacts} onEdit={setEditingContact} onDelete={handleDelete} />
    </div>
  );
};

export default ContactsPage;
