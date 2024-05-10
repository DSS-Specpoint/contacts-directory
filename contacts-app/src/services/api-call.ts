import axios from 'axios';
import { IContactType } from 'model/contact'; // Importing contact type interface

// Define API URL, fallback to local development URL if not provided
const API_URL = process.env.REACT_APP_API_URL || 'https://localhost:44305/contacts';

// Function to create a new contact
export const createContact = async (contactData: IContactType): Promise<IContactType> => {
    try {
      // Make a POST request to the API to create a new contact
      const response = await axios.post<IContactType>(API_URL, contactData);
      return response.data; // Return the created contact data
    } catch (error: any) {
      console.error('Failed to create contact:', error.message);
      throw error;
    }
  };

// Function to get all contacts
export const getAllContacts = async (): Promise<IContactType[]> => {
    try {
      // Make a GET request to the API to fetch all contacts
      const response = await axios.get<IContactType[]>(API_URL);
      return response.data; // Return the array of contacts
    } catch (error: any) {
      console.error('Failed to get contacts:', error.message);
      throw error;
    }
  };
  
// Function to get a contact by ID
export const getContactById = async (id: string): Promise<IContactType> => {
    try {
        // Make a GET request to the API to fetch a contact by its ID
        const response = await axios.get<IContactType>(`${API_URL}/${id}`);
        return response.data; // Return the contact data
    } catch (error: any) {
        console.error(`Failed to get contact with ID ${id}:`, error.message);
        throw error;
    }
};

// Function to update a contact
export const updateContact = async (id: string, contactData: IContactType): Promise<IContactType> => {
    try {
        // Make a PUT request to the API to update a contact by its ID
        const response = await axios.put<IContactType>(`${API_URL}/${id}`, contactData);
        return response.data; // Return the updated contact data
    } catch (error: any) {
        console.error(`Failed to update contact with ID ${id}:`, error.message);
        throw error;
    }
};

// Function to delete a contact
export const deleteContact = async (id: number): Promise<void> => {
    try {
      // Make a DELETE request to the API to delete a contact by its ID
      await axios.delete(`${API_URL}/${id}`);
    } catch (error: any) {
      console.error(`Failed to delete contact with ID ${id}:`, error.message);
      throw error;
    }
  };
