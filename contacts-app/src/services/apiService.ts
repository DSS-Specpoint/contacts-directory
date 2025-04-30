import { Contact } from '../types/contact';

const API_BASE_URL = 'https://localhost:44305/api/contacts';

export const apiService = {
    // Get all contacts
    getAllContacts: async (): Promise<Contact[]> => {
        try {
            const response = await fetch(API_BASE_URL);
            if (!response.ok) {
                throw new Error(`Failed to fetch contacts: ${response.status} ${response.statusText}`);
            }
            const result = await response.json();
            if (!result.data || !Array.isArray(result.data)) {
                console.error('API returned invalid data format:', result);
                throw new Error('Invalid response format from server');
            }
            return result.data;
        } catch (error) {
            console.error('Error fetching contacts:', error);
            throw error;
        }
    },

    // Get contact by ID
    getContactById: async (id: number): Promise<Contact> => {
        try {
            const response = await fetch(`${API_BASE_URL}/${id}`);
            if (!response.ok) {
                throw new Error('Failed to fetch contact');
            }
            return await response.json();
        } catch (error) {
            console.error(`Error fetching contact ${id}:`, error);
            throw error;
        }
    },

    // Create new contact
    createContact: async (contact: Omit<Contact, 'id'>): Promise<Contact> => {
        try {
            const response = await fetch(API_BASE_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(contact),
            });
            if (!response.ok) {
                throw new Error('Failed to create contact');
            }
            return await response.json();
        } catch (error) {
            console.error('Error creating contact:', error);
            throw error;
        }
    },

    // Update existing contact
    updateContact: async (contact: Contact): Promise<Contact> => {
        try {
            const response = await fetch(`${API_BASE_URL}/${contact.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(contact),
            });
            if (!response.ok) {
                throw new Error('Failed to update contact');
            }
            return await response.json();
        } catch (error) {
            console.error(`Error updating contact ${contact.id}:`, error);
            throw error;
        }
    },

    // Delete contact
    deleteContact: async (id: number): Promise<void> => {
        try {
            const response = await fetch(`${API_BASE_URL}/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete contact');
            }
        } catch (error) {
            console.error(`Error deleting contact ${id}:`, error);
            throw error;
        }
    }
}; 