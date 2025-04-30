import React, { useState } from 'react';
import ContactForm from '../components/ContactForm';
import ContactList from '../components/ContactList';
import { Contact } from '../types/contact';

const Contacts: React.FC = () => {
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [selectedContact, setSelectedContact] = useState<Contact | undefined>();

    const handleCreateContact = async (contact: Contact) => {
        try {
            const response = await fetch('/api/contacts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(contact),
            });

            if (!response.ok) {
                throw new Error('Failed to create contact');
            }

            setIsFormVisible(false);

            window.location.reload();
        } catch (error) {
            console.error('Error creating contact:', error);
            alert('Failed to create contact. Please try again.');
        }
    };

    const handleUpdateContact = async (contact: Contact) => {
        try {
            const response = await fetch(`/api/contacts/${contact.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(contact),
            });

            if (!response.ok) {
                throw new Error('Failed to update contact');
            }

            setIsFormVisible(false);
            setSelectedContact(undefined);
            window.location.reload();
        } catch (error) {
            console.error('Error updating contact:', error);
            alert('Failed to update contact. Please try again.');
        }
    };

    const handleDeleteContact = async (id: number) => {
        if (!window.confirm('Are you sure you want to delete this contact?')) {
            return;
        }

        try {
            const response = await fetch(`/api/contacts/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete contact');
            }

            // Refresh the contact list
            window.location.reload();
        } catch (error) {
            console.error('Error deleting contact:', error);
            alert('Failed to delete contact. Please try again.');
        }
    };

    const handleEdit = (contact: Contact) => {
        setSelectedContact(contact);
        setIsFormVisible(true);
    };

    const handleCancel = () => {
        setIsFormVisible(false);
        setSelectedContact(undefined);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Contacts</h1>
                {!isFormVisible && (
                    <button
                        onClick={() => setIsFormVisible(true)}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Add New Contact
                    </button>
                )}
            </div>

            {isFormVisible ? (
                <ContactForm
                    contact={selectedContact}
                    onSubmit={selectedContact ? handleUpdateContact : handleCreateContact}
                    onCancel={handleCancel}
                />
            ) : (
                <ContactList
                    onEdit={handleEdit}
                    onDelete={handleDeleteContact}
                />
            )}
        </div>
    );
};

export default Contacts; 