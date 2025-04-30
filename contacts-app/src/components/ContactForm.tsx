import React, { useState, useEffect } from 'react';
import { Contact } from '../types/contact';
import {
    TextField,
    Button,
    Stack,
    Box,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';

interface ContactFormProps {
    contact?: Contact;
    onSubmit: (contact: Contact) => void;
    onCancel: () => void;
}

const ContactForm: React.FC<ContactFormProps> = ({ contact, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState<Contact>({
        firstName: '',
        lastName: '',
        email: '',
        phone: ''
    });

    useEffect(() => {
        if (contact) {
            setFormData(contact);
        }
    }, [contact]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const textFieldSx = {
        '& .MuiOutlinedInput-root': {
            backgroundColor: '#e0e0e0',
            borderRadius: '10px',
            '& fieldset': {
                borderColor: 'transparent',
            },
            '&:hover fieldset': {
                borderColor: 'transparent',
            },
            '&.Mui-focused fieldset': {
                borderColor: 'transparent',
            },
            boxShadow: 'inset 2px 2px 5px #bebebe, inset -2px -2px 5px #ffffff'
        }
    };

    const buttonSx = {
        borderRadius: '10px',
        textTransform: 'none',
        py: 1.5,
        px: 4,
        boxShadow: '5px 5px 10px #bebebe, -5px -5px 10px #ffffff',
        '&:hover': {
            boxShadow: '3px 3px 6px #bebebe, -3px -3px 6px #ffffff'
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <Stack spacing={3}>
                <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
                    <TextField
                        fullWidth
                        label="First Name"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        variant="outlined"
                        autoFocus
                        sx={textFieldSx}
                    />
                    <TextField
                        fullWidth
                        label="Last Name"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        variant="outlined"
                        sx={textFieldSx}
                    />
                </Box>
                <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    variant="outlined"
                    sx={textFieldSx}
                />
                <TextField
                    fullWidth
                    label="Phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    variant="outlined"
                    sx={textFieldSx}
                />
                <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'flex-end', 
                    gap: 2,
                    mt: 2
                }}>
                    <Button
                        variant="outlined"
                        onClick={onCancel}
                        startIcon={<CancelIcon />}
                        size="large"
                        sx={{
                            ...buttonSx,
                            backgroundColor: '#e0e0e0',
                            color: '#666',
                            border: 'none',
                            '&:hover': {
                                backgroundColor: '#d5d5d5',
                                border: 'none'
                            }
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        startIcon={<SaveIcon />}
                        size="large"
                        sx={{
                            ...buttonSx,
                            backgroundColor: '#1976d2',
                            '&:hover': {
                                backgroundColor: '#1565c0'
                            }
                        }}
                    >
                        {contact ? 'Update' : 'Create'}
                    </Button>
                </Box>
            </Stack>
        </form>
    );
};

export default ContactForm; 