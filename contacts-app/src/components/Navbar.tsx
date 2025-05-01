import { useLocation, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Button, Container, Typography, Box } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PeopleIcon from '@mui/icons-material/People';

const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();

    return (
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Container maxWidth="lg">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{
                            flexGrow: 1,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            fontWeight: 600
                        }}
                    >
                        <PeopleIcon sx={{ fontSize: 28 }} />
                        Contact Manager
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button
                            color="inherit"
                            startIcon={<PeopleIcon />}
                            onClick={() => navigate('/contacts')}
                            sx={{
                                px: 2,
                                backgroundColor: location.pathname === '/contacts' ? 'rgba(255, 255, 255, 0.12)' : 'transparent',
                                '&:hover': {
                                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                },
                            }}
                        >
                            Contacts
                        </Button>
                        <Button
                            color="inherit"
                            startIcon={<PersonAddIcon />}
                            onClick={() => navigate('/contacts/create')}
                            sx={{
                                px: 2,
                                backgroundColor: location.pathname === '/contacts/create' ? 'rgba(255, 255, 255, 0.12)' : 'transparent',
                                '&:hover': {
                                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                },
                            }}
                        >
                            Create
                        </Button>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Navbar; 