import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
    Typography,
    Box,
    Tooltip
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Layout from '../components/Layout';

const dummyContacts = [
    {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phone: '(555) 123-4567'
    },
    {
        id: 2,
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@example.com',
        phone: '(555) 234-5678'
    },
    {
        id: 3,
        firstName: 'Michael',
        lastName: 'Johnson',
        email: 'michael.j@example.com',
        phone: '(555) 345-6789'
    },
    {
        id: 4,
        firstName: 'Sarah',
        lastName: 'Williams',
        email: 'sarah.w@example.com',
        phone: '(555) 456-7890'
    },
    {
        id: 5,
        firstName: 'Robert',
        lastName: 'Brown',
        email: 'robert.b@example.com',
        phone: '(555) 567-8901'
    }
];

const ContactsList = () => {
    const navigate = useNavigate();

    return (
        <Layout>
            <Box sx={{ 
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                <Typography 
                    variant="h4" 
                    component="h1" 
                    gutterBottom 
                    sx={{ 
                        color: '#2c3e50',
                        mb: 4,
                        textAlign: 'center',
                        fontWeight: 500
                    }}
                >
                    Contacts
                </Typography>
                <TableContainer sx={{ width: '100%' }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Phone</TableCell>
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {dummyContacts.map((contact) => (
                                <TableRow 
                                    key={contact.id}
                                    hover
                                    sx={{
                                        '&:last-child td, &:last-child th': { border: 0 }
                                    }}
                                >
                                    <TableCell>
                                        {contact.firstName} {contact.lastName}
                                    </TableCell>
                                    <TableCell>{contact.email}</TableCell>
                                    <TableCell>{contact.phone}</TableCell>
                                    <TableCell align="right">
                                        <Tooltip title="Edit">
                                            <IconButton
                                                size="small"
                                                onClick={() => navigate(`/contacts/${contact.id}/update`)}
                                            >
                                                <EditIcon fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Delete">
                                            <IconButton
                                                size="small"
                                                color="error"
                                                onClick={() => alert('Delete functionality will be implemented with API')}
                                            >
                                                <DeleteIcon fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Layout>
    );
};

export default ContactsList; 