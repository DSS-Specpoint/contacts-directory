import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ContactForm from '../components/ContactForm';
import { Contact } from '../types/contact';
import { apiService } from '../services/apiService';
import { Box, Typography, CircularProgress } from '@mui/material';
import Layout from '../components/Layout';

const UpdateContact = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [contact, setContact] = useState<Contact | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchContact = async () => {
            try {
                if (!id) return;
                const data = await apiService.getContactById(parseInt(id));
                console.log('Fetched contact data:', data);
                setContact(data);
            } catch (err) {
                setError('Failed to fetch contact details');
                console.error('Error fetching contact:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchContact();
    }, [id]);

    const handleSubmit = async (updatedContact: Contact) => {
        try {
            if (!id) return;
            await apiService.updateContact({ ...updatedContact, id: parseInt(id) });
            navigate('/contacts');
        } catch (error) {
            console.error('Error updating contact:', error);
            alert('Failed to update contact. Please try again.');
        }
    };

    const handleCancel = () => {
        navigate('/contacts');
    };

    if (loading) {
        return (
            <Layout>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                    <CircularProgress />
                </Box>
            </Layout>
        );
    }

    if (error) {
        return (
            <Layout>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                    <Typography color="error">{error}</Typography>
                </Box>
            </Layout>
        );
    }

    if (!contact) {
        return (
            <Layout>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                    <Typography>Contact not found</Typography>
                </Box>
            </Layout>
        );
    }

    return (
        <Layout>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: '100%',
                }}
            >
                <Box 
                    sx={{ 
                        textAlign: 'center', 
                        mb: 4,
                        width: '100%'
                    }}
                >
                    <Typography 
                        variant="h4" 
                        component="h1" 
                        gutterBottom 
                        fontWeight="500"
                        sx={{ color: '#2c3e50' }}
                    >
                        Update Contact
                    </Typography>
                    <Typography 
                        variant="body1" 
                        color="text.secondary" 
                        gutterBottom
                        sx={{ color: '#7f8c8d' }}
                    >
                        Update the contact details below
                    </Typography>
                </Box>
                <Box sx={{ width: '100%' }}>
                    <ContactForm
                        contact={contact}
                        onSubmit={handleSubmit}
                        onCancel={handleCancel}
                    />
                </Box>
            </Box>
        </Layout>
    );
};

export default UpdateContact; 