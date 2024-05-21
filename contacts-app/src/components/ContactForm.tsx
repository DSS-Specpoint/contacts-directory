import React, { useState } from 'react';

interface Contact {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
}

interface ContactFormProps {
  onSubmit: (contact: Contact) => void;
}

const ContactForm: React.FC<ContactFormProps> = ({ onSubmit }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newContact: Contact = {
      firstName,
      lastName,
      email,
      phone,
      address,
    };
    
    try {
      const BASE_URL = 'https://localhost:44305'; 

      const response = await fetch(`${BASE_URL}/api/Contact`, {
        method: 'POST',
        //mode: 'no-cors', 
        headers: {
            'Content-Type': 'application/json' // Set content type to application/json
          },
        body: JSON.stringify(newContact)
      });

      if (!response.ok) {
        throw new Error('Failed to create contact');
      }

else{
  alert("Contact added successfuly!")
}
      // Call the onSubmit callback to notify the parent component
      onSubmit(newContact);
      
      // Reset form fields
      setFirstName('');
      setLastName('');
      setEmail('');
      setPhone('');
      setAddress('');
    } catch (error) {
      console.error('Error creating contact:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First Name" />
      <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last Name" />
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" />
      <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address" />
      <button type="submit">Submit</button>
    </form>
  );
};

export default ContactForm;
