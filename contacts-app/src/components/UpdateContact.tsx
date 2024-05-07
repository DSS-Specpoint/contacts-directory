import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ContactForm } from "./ContactForm";
import { IContactType } from "../types/Contact";
import { getContactById, updateContact } from "../services/api";

export const UpdateContact: React.FC = () => {
    const [contact, setContact] = useState<IContactType | undefined>();
    const { id } = useParams<{ id: string }>();  

    useEffect(() => {
        const fetchContact = async () => {
          console.log("ID"+id);
            if (id) {  // Check if id is not undefined and keep it as a string
                try {
                    const contactData :any = await getContactById(id);
                    console.log("contactData@@  "+contactData.data.firstName);
                    setContact(contactData.data);
                } catch (error) {
                    console.error("Failed to fetch contact", error);
                }
            }
        };

        fetchContact();
    }, [id]);



    const handleUpdateContact = async (data: IContactType) => {
        if (id) {
            try {
                const updatedContact = await updateContact(id, data);
                console.log("Contact updated:", updatedContact);
                alert("Contact updated!");
            } catch (error) {
                console.error("Failed to update contact", error);
                alert("Failed to update contact");
            }
        }
    };

    return (
        <div>
            <h2>Update Contact</h2>
            {contact ? <ContactForm contact={contact} onSubmit={handleUpdateContact} /> : <p>Loading...</p>}
        </div>
    );
};
