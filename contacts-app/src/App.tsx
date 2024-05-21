import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useParams } from 'react-router-dom'; // Import useParams
import ContactList from './components/ContactList';
import ContactForm from './components/ContactForm';
import ContactEdit from './components/ContactEdit';

interface Contact {
  Id: number;
  FirstName: string;
  LastName: string;
  Email: string;
  Phone: string;
  Address: string;
}

function App() {
  // Define handleSubmit function to handle form submission
  const handleSubmit = (contact: any) => {
    // Add your logic to handle form submission here
    console.log(contact); // For example, log the contact data
  };

  // Move useParams outside of useEffect
  const { id } = useParams<{ id: string }>();

  // Define selectedContact state
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  // Fetch the contact data based on the ID from the route parameters
  useEffect(() => {
    if (id) {
      fetchContactById(id);
    }
  }, [id]);

  // Define fetchContactById function
  const fetchContactById = async (id: string) => {
    try {
      const BASE_URL = 'https://localhost:44305';
      const response = await fetch(`${BASE_URL}/api/Contact/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch contact');
      }
      const data = await response.json();
      setSelectedContact(data);
    } catch (error) {
      console.error('Error fetching contact:', error);
    }
  };

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<ContactList />} />
          <Route path="/add" element={<ContactForm onSubmit={handleSubmit} />} />
          {/* Pass the selectedContact as the contact prop */}
          <Route path="/edit/:id" element={<ContactEdit contact={selectedContact} onSubmit={handleSubmit} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
