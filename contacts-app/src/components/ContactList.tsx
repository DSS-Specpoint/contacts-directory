import React, { useEffect, useState, useMemo } from "react";
import { Button, List, TextField, Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import ContactItem from "./ContactItem";
import ContactForm from "./ContactForm";
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, useQuery } from '@apollo/client';
import { Contact } from "../models/contact";
import {
  fetchContacts,
  createContact,
  updateContact,
  deleteContact,
} from "../services/contactService";
import { SEARCH_CONTACTS } from "../queriesGQL";
import config from 'config';

const API_URL_GQL = config.API_URL_GQL;

const ContactList: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>([]);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const client = useMemo(() => new ApolloClient({
    link: new HttpLink({ uri: API_URL_GQL }),
    cache: new InMemoryCache(),
  }), []);

  const { data, refetch } = useQuery(SEARCH_CONTACTS, {
    variables: { searchTerm },
    skip: !searchTerm,
    client: client,
  });

  useEffect(() => {
    loadContacts();
  }, []);

  useEffect(() => {
    if (data) {
      setFilteredContacts(data.searchContacts);
    } else {
      setFilteredContacts(contacts);
    }
  }, [data, contacts]);

  const loadContacts = async () => {
    try {
      const data = await fetchContacts();
      setContacts(data);
    } catch (error) {
      console.error("Error loading contacts:", error);
    }
  };

  const handleCreate = async (contact: Contact) => {
    try {
      await createContact(contact);
      setIsCreating(false);
      loadContacts();
    } catch (error) {
      console.error("Error creating contact:", error);
    }
  };

  const handleUpdate = async (contact: Contact) => {
    try {
      await updateContact(contact);
      setSelectedContact(null);
      loadContacts();
    } catch (error) {
      console.error("Error updating contact:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteContact(id);
      loadContacts();
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  return (
    <ApolloProvider client={client}>
      <div>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          gap={2}
          padding={5}
        >
          <TextField
            label="Search"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}  
            onBlur={() => {
              refetch();
            }}
            sx={{
              width: "500px",
              borderRadius: "50px",
              "& .MuiOutlinedInput-root": {
                borderRadius: "50px",
                paddingLeft: "10px",
              },
            }}
          />
          <Button
            variant="contained"
            sx={{ borderRadius: "50px", padding: "10px 20px", height:"55px" }}
            color="primary"
            onClick={() => setIsCreating(true)}
          >
            Add Contact
          </Button>
        </Box>
        {isCreating && (
          <ContactForm
            onSubmit={handleCreate}
            onCancel={() => setIsCreating(false)}
          />
        )}
        <Grid
          container
          spacing={40}
          sx={{
            padding: 2,
            fontWeight: "bold",
            borderBottom: "2px solid",
            borderColor: "divider",
          }}
        >
          <Grid size={3}>Name</Grid>
          <Grid size={3}>Phone Number</Grid>
          <Grid size={3}>Email</Grid>
          <Grid size={3}>Actions</Grid>
        </Grid>
        <List>
          {filteredContacts.map((contact) => (
            <ContactItem
              key={contact.id}
              contact={contact}
              onEdit={() => setSelectedContact(contact)}
              onDelete={() => {
                if (contact.id !== undefined) {
                  handleDelete(contact.id);
                }
              }}
            />
          ))}
        </List>
        {selectedContact && (
          <ContactForm
            contact={selectedContact}
            onSubmit={handleUpdate}
            onCancel={() => setSelectedContact(null)}
          />
        )}
      </div>
    </ApolloProvider>
  );
};

export default ContactList;