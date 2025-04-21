import React, { useEffect, useState } from "react";
import axios from "axios";
import { Contact } from "../types/Contact";
import ContactForm from "./ContactForm";
import '../App.css'; 

const ContactList: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const baseUrl = "https://localhost:44305/api/Contact";

  // Fetch contacts from the API
  const fetchContacts = async () => {
    setError(null);
    setLoading(true);
    try {
      const response = await axios.get(baseUrl);
      setContacts(response.data);  // Set the updated contact list
    } catch (error) {
      setError("Error fetching contacts. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Handle creating or updating a contact
  const handleCreateOrUpdateContact = async (contact: Contact) => {
    try {
      let updatedContacts;
      if (contact.id === 0) {
        // Creating a new contact
        const response = await axios.post(baseUrl, contact);
        updatedContacts = [...contacts, response.data];
      } else {
        // Updating an existing contact
        const response = await axios.put(`${baseUrl}/${contact.id}`, contact);
        updatedContacts = contacts.map((item) =>
          item.id === contact.id ? response.data : item
        );
      }
      
      setContacts(updatedContacts);
      setSelectedContact(null); // Close the form after submission

      // Refetch the updated contacts from the server
      await fetchContacts();  // This will get the latest contacts list from the API
    } catch (error) {
      setError("Error saving contact. Please try again later.");
    }
  };

  // Handle deleting a contact
  const handleDeleteContact = async (id: number) => {
    try {
      await axios.delete(`${baseUrl}/${id}`);
      setContacts(contacts.filter((contact) => contact.id !== id));
    } catch (error) {
      setError("Error deleting contact. Please try again later.");
    }
  };

  // Handle the search query change
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  // Filter contacts based on the search query
  const filteredContacts = contacts.filter((contact) => {
    const searchLower = searchQuery?.toLowerCase();
    return (
      contact.firstName?.toLowerCase().includes(searchLower) ||
      contact.lastName?.toLowerCase().includes(searchLower) ||
      contact.email?.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="table-container">
      <h2 className="headline">Contact Book</h2>
      <div className="form-container">
        <h2 className="headline1">{selectedContact ? "Edit Contact" : "Add Contact"}</h2>
        <ContactForm
          key={selectedContact?.id || "new"}
          contact={selectedContact}
          onSubmit={handleCreateOrUpdateContact}
          onCancel={() => setSelectedContact(null)}
          loading={loading}
        />
      </div>
      <hr className="divider" />
      <h2 className="headline2">Contact List</h2>

      {/* Search input */}
      <input
        type="text"
        placeholder="Search contacts..."
        value={searchQuery}
        onChange={handleSearchChange}
        className="search-input"
      />

      {loading && <p>Loading contacts...</p>}
      {error && <p className="error">{error}</p>}

      <table className="contact-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredContacts.map((contact) => (
            <tr key={contact.id}>
              <td>{contact.firstName} {contact.lastName}</td>
              <td>{contact.email}</td>
              <td>{contact.phone}</td>
              <td>
                <button
                  onClick={() => setSelectedContact(contact)} 
                  disabled={loading}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteContact(contact.id)} 
                  disabled={loading}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContactList;
