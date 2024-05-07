import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { IContactType } from '../types/Contact';
import { getAllContacts } from '../services/api'; // Adjust the import path as necessary

export const ContactsList: React.FC = () => {
  const [contacts, setContacts] = useState<IContactType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const contacts:any = await getAllContacts();
        console.log(contacts);
        setContacts(contacts.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch contacts');
        setLoading(false);
        console.error("Failed to fetch contacts:", error);
      }
    };

    fetchContacts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="container mt-3">
      <h2>Contacts List</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            {/* <th>ID</th> */}
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Comments</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>

          {contacts.length >0 && contacts.map(contact => (
            <tr key={contact.contactId}>
             
              <td>{contact.firstName}</td>
              <td>{contact.lastName}</td>
              <td>{contact.email}</td>
              <td>{contact.phone}</td>
              <td>{contact.address}</td>
              <td>{contact.comments}</td>
              <td>
                <Link to={`/update/${contact.contactId}`} className="btn btn-primary btn-sm">Edit</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
