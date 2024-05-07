import axios from 'axios';
import { IContactType } from 'types/Contact';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:49240/contacts';




export const createContact = async (contactData: IContactType): Promise<IContactType> => {
    try {
      const response = await axios.post<IContactType>(API_URL, contactData);
      return response.data;
    } catch (error: any) {
      console.error('Failed to create contact:', error.message);
      throw error;
    }
  };

  export const getAllContacts = async (): Promise<IContactType[]> => {
    try {
      const response = await axios.get<IContactType[]>(API_URL);
      return response.data;
    } catch (error: any) {
      console.error('Failed to get contacts:', error.message);
      throw error;
    }
  };
  

  
  export const getContactById = async (id: string): Promise<IContactType> => {
    try {
        const response = await axios.get<IContactType>(`${API_URL}/${id}`);
        console.log(response);
        return response.data;
    } catch (error: any) {
        console.error(`Failed to get contact with ID ${id}:`, error.message);
        throw error;
    }
};

  

  export const updateContact = async (id: string, contactData: IContactType): Promise<IContactType> => {
    try {
        const response = await axios.put<IContactType>(`${API_URL}/${id}`, contactData);
        return response.data;
    } catch (error: any) {
        console.error(`Failed to update contact with ID ${id}:`, error.message);
        throw error;
    }
};

  export const deleteContact = async (id: number): Promise<void> => {
    try {
      await axios.delete(`${API_URL}${id}`);
    } catch (error: any) {
      console.error(`Failed to delete contact with ID ${id}:`, error.message);
      throw error;
    }
  };
  


