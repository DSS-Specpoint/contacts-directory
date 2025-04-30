import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ContactForm from '../components/ContactForm';
import { Contact } from '../types/contact';
import { apiService } from '../services/apiService';

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
        return <div className="text-center py-4">Loading...</div>;
    }

    if (error) {
        return <div className="text-center py-4 text-red-600">{error}</div>;
    }

    if (!contact) {
        return <div className="text-center py-4">Contact not found</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Update Contact</h1>
            <ContactForm
                contact={contact}
                onSubmit={handleSubmit}
                onCancel={handleCancel}
            />
        </div>
    );
};

export default UpdateContact; 