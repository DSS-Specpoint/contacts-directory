import React, { useEffect, useState } from "react";
import ContactForm from "./ContactForm";
import ContactList from "./ContactList";
import './contactApp.css'

type Contact = {
    id?: number;
    name: string;
    email: string;
    phone: string;
};

const ContactApp: React.FC = () => {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetchContacts();
    }, []);

    const fetchContacts = async () => {
        try {
            console.log("Fetching contacts...");
            const res = await fetch("https://localhost:44305/api/Contact", {
                method: "GET",
                headers: { "Content-Type": "application/json" },
                mode: "cors",
            });

            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }

            const data = await res.json();
            console.log("Fetched Contacts:", data); // Debugging

            setContacts(data);
        } catch (error) {
            //console.error("Error fetching contacts:", error.message);
        }
    };

    const saveContact = async (contact: Contact) => {
        const method = contact.id ? "PUT" : "POST";
        const url = contact.id
            ? `https://localhost:44305/api/Contact/${contact.id}`
            : "https://localhost:44305/api/Contact";

        try {
            await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(contact),
            });
            setSelectedContact(null);
            fetchContacts();
        } catch (error) {
            console.error("Error saving contact:", error);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await fetch(`https://localhost:44305/api/Contact/${id}`, { method: "DELETE" });
            fetchContacts();
        } catch (error) {
            console.error("Error deleting contact:", error);
        }
    };
    const filteredContacts = contacts.filter(contact =>
        contact.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container">
            <div>
                <h1>Contact Management</h1>
                <input
                    type="text"
                    placeholder="Search by name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <ContactForm contact={selectedContact || undefined} onSave={saveContact} />
            </div>
            <ContactList contacts={filteredContacts} onEdit={setSelectedContact} onDelete={handleDelete} />
        </div>
    );
};

export default ContactApp;
