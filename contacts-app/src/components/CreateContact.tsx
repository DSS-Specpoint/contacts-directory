// src/components/CreateContact.tsx
import React from "react";
import { ContactForm } from "./ContactForm";
import { IContactType } from "../types/Contact";
import { createContact } from "services/api";

export const CreateContact: React.FC = () => {
    const handleCreateContact = async (data: IContactType) => {
      try {
        // Using the createContact function from api.ts
        const createdContact = await createContact(data);
        console.log("Contact successfully created:", createdContact);
        alert("Contact created!");
      } catch (error) {
        console.error("Failed to create contact", error);
        alert("Failed to create contact");
      }
    };
  
    return (
      <div>
        <h2>Create Contact</h2>
        <ContactForm onSubmit={handleCreateContact} />
      </div>
    );
  };
