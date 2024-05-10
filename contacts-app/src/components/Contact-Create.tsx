import React from "react";
import { ContactForm } from "./Contact-Form"; // Importing ContactForm component
import { IContactType } from "../model/contact"; // Importing contact type interface
import { createContact } from "services/api-call"; // Importing createContact function from API calls
import { useNavigate } from "react-router-dom"; // Importing useNavigate hook for navigation

// Functional component for creating a new contact
export const CreateContact: React.FC = () => {

  // Hook to enable navigation
  const navigate = useNavigate();

  // Function to handle creation of a new contact
  const handleCreateContact = async (data: IContactType) => {
    try {
      // Using the createContact function from api.ts to create a contact
      const createdContact = await createContact(data);
      console.log("Contact successfully created:", createdContact);
      alert("Contact created!");
      // Redirect to the contacts list page after successful creation
      navigate("/");
    } catch (error) {
      console.error("Failed to create contact", error);
      alert("Failed to create contact");
    }
  };

  return (
    <div>
      <h2>Create Contact</h2>
      {/* Rendering the ContactForm component and passing handleCreateContact as onSubmit handler */}
      <ContactForm onSubmit={handleCreateContact} />
    </div>
  );
};
