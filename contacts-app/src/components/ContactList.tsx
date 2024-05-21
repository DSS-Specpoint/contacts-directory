import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete'; // Import DeleteIcon

interface Contact {
  Id: number;
  FirstName: string;
  LastName: string;
  Email: string;
  Phone: string;
  Address: string;
}

const ContactList: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const BASE_URL = 'https://localhost:44305'; 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/Contact`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch contacts');
        }
        const data = await response.json();
        setContacts(data);
      } catch (error) {
        console.error('Error fetching contacts:', error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`${BASE_URL}/api/Contact/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete contact');
      }
      else{
        alert("Contact deleted successfuly!")
      }
      // Remove the deleted contact from the state
      setContacts(prevContacts => prevContacts.filter(contact => contact.Id !== id));
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  return (
    <div>
      <h2>Contact List</h2>
      <Link to="/add">
        <button>Add</button>
      </Link>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Edit</th>
            <th>Delete</th> {/* Add Delete column */}
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact.Id}>
              <td>{contact.Id}</td>
              <td>{contact.FirstName}</td>
              <td>{contact.LastName}</td>
              <td>{contact.Email}</td>
              <td>{contact.Phone}</td>
              <td>{contact.Address}</td>
              <td>
                <Link to={`/edit/${contact.Id}`}>
                  <EditIcon />
                </Link>
              </td>
              <td>
                <button onClick={() => handleDelete(contact.Id)}> {/* Delete button */}
                  <DeleteIcon />
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
