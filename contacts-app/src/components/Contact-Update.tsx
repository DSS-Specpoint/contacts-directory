import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ContactForm } from "./Contact-Form";
import { IContactType } from "../model/contact";
import { getContactById, updateContact } from "../services/api-call";
import { useNavigate } from "react-router-dom";

export const UpdateContact: React.FC = () => {
    // Define state variables
    const [contact, setContact] = useState<IContactType | undefined>(); // State variable for the contact
    const { id } = useParams<{ id: string }>();  // Get the contact ID from the URL parameters

    // Initialize the navigate function from react-router-dom
    const navigate = useNavigate();

    // Fetch the contact data when the component mounts or when the contact ID changes
    useEffect(() => {
        const fetchContact = async () => {
            // Check if the ID exists
            if (id) {
                try {
                    // Fetch the contact data from the API
                    const contactData :any = await getContactById(id);
                    // Set the contact state with the fetched data
                    setContact(contactData.data);
                } catch (error) {
                    // Handle errors if fetching contact data fails
                    console.error("Failed to fetch contact", error);
                }
            }
        };

        fetchContact(); // Call the fetchContact function
    }, [id]); // Depend on the contact ID

    // Handle the update of the contact
    const handleUpdateContact = async (data: IContactType) => {
        if (id) {
            try {
                // Update the contact data using the API
                const updatedContact = await updateContact(id, data);
                console.log("Contact updated:", updatedContact);
                alert("Contact updated!"); // Show success message
                navigate("/"); // Navigate back to the home page
            } catch (error) {
                // Handle errors if updating contact data fails
                console.error("Failed to update contact", error);
                alert("Failed to update contact"); // Show error message
            }
        }
    };

    return (
        <div>
            <h2>Update Contact</h2>
            {/* Render the contact form if contact data is available, otherwise show loading message */}
            {contact ? <ContactForm contact={contact} onSubmit={handleUpdateContact} /> : <p>Loading...</p>}
        </div>
    );
};
