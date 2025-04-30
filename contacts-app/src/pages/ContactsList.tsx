import React, { useEffect, useState } from 'react';
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
    Tooltip,
    CircularProgress,
    TablePagination,
    TextField,
    InputAdornment,
    TableSortLabel
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import Layout from '../components/Layout';
import { Contact } from '../types/contact';
import { apiService } from '../services/apiService';
import ConfirmationDialog from '../components/ConfirmationDialog';

type Order = 'asc' | 'desc';

interface HeadCell {
    id: keyof Contact;
    label: string;
    sortable: boolean;
}

const headCells: HeadCell[] = [
    { id: 'firstName', label: 'Name', sortable: true },
    { id: 'email', label: 'Email', sortable: true },
    { id: 'phoneNumber', label: 'Phone', sortable: true },
    { id: 'createdAt', label: 'Created At', sortable: true },
    { id: 'id', label: 'Actions', sortable: false }
];

const ContactsList = () => {
    const navigate = useNavigate();
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [order, setOrder] = useState<Order>('desc');
    const [orderBy, setOrderBy] = useState<keyof Contact>('createdAt');
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [contactToDelete, setContactToDelete] = useState<number | null>(null);
    
    // Pagination state
    const [page, setPage] = useState(0);
    const [rowsPerPage] = useState(5);

    useEffect(() => {
        fetchContacts();
    }, []);

    const fetchContacts = async () => {
        try {
            setLoading(true);
            const data = await apiService.getAllContacts();
            console.log('API Response:', data); // Debug log
            
            // Ensure data is an array
            if (!Array.isArray(data)) {
                console.error('API did not return an array:', data);
                setError('Invalid data format received from server');
                setContacts([]);
                return;
            }
            
            setContacts(data);
        } catch (err) {
            console.error('Error fetching contacts:', err); // Debug log
            setError(err instanceof Error ? err.message : 'An error occurred');
            setContacts([]);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteClick = (id: number) => {
        setContactToDelete(id);
        setDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = async () => {
        if (contactToDelete) {
            try {
                await apiService.deleteContact(contactToDelete);
                fetchContacts(); // Refresh the list after deletion
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to delete contact');
            }
        }
        setDeleteDialogOpen(false);
        setContactToDelete(null);
    };

    const handleDeleteCancel = () => {
        setDeleteDialogOpen(false);
        setContactToDelete(null);
    };

    // Search handler
    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
        setPage(0); // Reset to first page when searching
    };

    // Sorting handlers
    const handleRequestSort = (property: keyof Contact) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    // Filter contacts based on search query
    const filteredContacts = contacts.filter(contact => {
        const searchLower = searchQuery.toLowerCase();
        return (
            contact.firstName.toLowerCase().includes(searchLower) ||
            contact.lastName.toLowerCase().includes(searchLower) ||
            contact.email.toLowerCase().includes(searchLower) ||
            (contact.phoneNumber && contact.phoneNumber.toLowerCase().includes(searchLower))
        );
    });

    // Sort contacts
    const sortedContacts = React.useMemo(() => {
        return [...filteredContacts].sort((a, b) => {
            if (!a[orderBy] || !b[orderBy]) return 0;
            
            const aValue = a[orderBy]?.toString().toLowerCase() || '';
            const bValue = b[orderBy]?.toString().toLowerCase() || '';
            
            if (order === 'asc') {
                return aValue.localeCompare(bValue);
            } else {
                return bValue.localeCompare(aValue);
            }
        });
    }, [filteredContacts, order, orderBy]);

    // Pagination handlers
    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    // Calculate paginated data
    const paginatedContacts = sortedContacts.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );

    // Format date
    const formatDate = (dateString?: string) => {
        if (!dateString) return '';
        return new Date(dateString).toLocaleString();
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

    // Ensure contacts is an array before rendering
    if (!Array.isArray(contacts)) {
        return (
            <Layout>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                    <Typography color="error">Invalid data format received from server</Typography>
                </Box>
            </Layout>
        );
    }

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

                {/* Search Bar */}
                <Box sx={{ width: '100%', mb: 3, px: 2 }}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Search contacts by name, email, or phone..."
                        value={searchQuery}
                        onChange={handleSearch}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                backgroundColor: 'white',
                                '&:hover fieldset': {
                                    borderColor: 'primary.main',
                                },
                            },
                        }}
                    />
                </Box>

                <TableContainer sx={{ width: '100%' }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {headCells.map((headCell) => (
                                    <TableCell
                                        key={headCell.id}
                                        align={headCell.id === 'id' ? 'right' : 'left'}
                                    >
                                        {headCell.sortable ? (
                                            <TableSortLabel
                                                active={orderBy === headCell.id}
                                                direction={orderBy === headCell.id ? order : 'asc'}
                                                onClick={() => handleRequestSort(headCell.id)}
                                            >
                                                {headCell.label}
                                            </TableSortLabel>
                                        ) : (
                                            headCell.label
                                        )}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredContacts.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} align="center">
                                        <Typography>
                                            {searchQuery ? 'No matching contacts found' : 'No contacts found'}
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                paginatedContacts.map((contact) => (
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
                                        <TableCell>{contact.phoneNumber}</TableCell>
                                        <TableCell>{formatDate(contact.createdAt)}</TableCell>
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
                                                    onClick={() => contact.id && handleDeleteClick(contact.id)}
                                                >
                                                    <DeleteIcon fontSize="small" />
                                                </IconButton>
                                            </Tooltip>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                    {filteredContacts.length > 0 && (
                        <TablePagination
                            component="div"
                            count={filteredContacts.length}
                            page={page}
                            onPageChange={handleChangePage}
                            rowsPerPage={rowsPerPage}
                            rowsPerPageOptions={[5]}
                            sx={{
                                '.MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows': {
                                    margin: 0
                                }
                            }}
                        />
                    )}
                </TableContainer>
            </Box>
            <ConfirmationDialog
                open={deleteDialogOpen}
                title="Delete Contact"
                message="Are you sure you want to delete this contact? This action cannot be undone."
                onConfirm={handleDeleteConfirm}
                onCancel={handleDeleteCancel}
            />
        </Layout>
    );
};

export default ContactsList; 