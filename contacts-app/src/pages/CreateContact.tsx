import { useNavigate } from 'react-router-dom';
import ContactForm from '../components/ContactForm';
import { Contact } from '../types/contact';
import { apiService } from '../services/apiService';
import { Box, Typography } from '@mui/material';
import Layout from '../components/Layout';

const CreateContact = () => {
    const navigate = useNavigate();

    const handleSubmit = async (contact: Contact) => {
        try {
            await apiService.createContact(contact);
            navigate('/contacts');
        } catch (error) {
            console.error('Error creating contact:', error);
            alert('Failed to create contact. Please try again.');
        }
    };

    const handleCancel = () => {
        navigate('/contacts');
    };

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
                        Create New Contact
                    </Typography>
                    <Typography 
                        variant="body1" 
                        color="text.secondary" 
                        gutterBottom
                        sx={{ color: '#7f8c8d' }}
                    >
                        Fill in the details to create a new contact
                    </Typography>
                </Box>
                <Box sx={{ width: '100%' }}>
                    <ContactForm
                        onSubmit={handleSubmit}
                        onCancel={handleCancel}
                    />
                </Box>
            </Box>
        </Layout>
    );
};

export default CreateContact; 