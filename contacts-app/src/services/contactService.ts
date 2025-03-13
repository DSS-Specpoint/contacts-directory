import axios from 'axios';
import { Contact } from '../models/contact';
import config from 'config';

const API_URL = config.API_URL;

export const fetchContacts = async (): Promise<Contact[]> => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching contacts:", error);
    throw error;
  }
};

export const createContact = async (contact: Contact): Promise<Contact> => {
  try {
    const response = await axios.post(API_URL, contact);
    return response.data;
  } catch (error) {
    console.error("Error creating contact:", error);
    throw error;
  }
};

export const updateContact = async (contact: Contact): Promise<void> => {
  try {
    await axios.put(`${API_URL}/${contact.id}`, contact);
  } catch (error) {
    console.error("Error updating contact:", error);
    throw error;
  }
};

export const deleteContact = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error("Error deleting contact:", error);
    throw error;
  }
};