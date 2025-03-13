import React from 'react';
import { ListItem, ListItemText, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Contact } from '../models/contact';
import Grid from '@mui/material/Grid2';


interface ContactItemProps {
  contact: Contact;
  onEdit: () => void;
  onDelete: () => void;
}

const ContactItem: React.FC<ContactItemProps> = ({ contact, onEdit, onDelete }) => {
  return (
    <ListItem>
    <ListItemText
      primary={
        <Grid container spacing={4} sx={{justifyContent: "center", alignItems: "center"}}>
          <Grid size={4}>
            {`${contact.firstName} ${contact.lastName}`}
          </Grid>
          <Grid size={4}>
            {contact.phoneNumber}
          </Grid>
          <Grid size={4}>
            {contact.email}
          </Grid>
        </Grid>
      }
    />
      <IconButton edge="end" onClick={onEdit}>
        <EditIcon />
      </IconButton>
      <IconButton edge="end" onClick={onDelete}>
        <DeleteIcon />
      </IconButton>
    </ListItem>
  );
};

export default ContactItem;
