import { Box, Container } from '@mui/material';
import { ReactNode } from 'react';

interface LayoutProps {
    children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <Box
            sx={{
                minHeight: 'calc(100vh - 64px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100vw',
                py: 4,
                position: 'relative',
                left: '50%',
                transform: 'translateX(-50%)'
            }}
        >
            <Container 
                maxWidth="md"
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    width: '100%'
                }}
            >
                <Box
                    sx={{
                        width: '100%',
                        maxWidth: '800px',
                        margin: '0 auto',
                        borderRadius: '20px',
                        p: { xs: 3, sm: 4 },
                        backgroundColor: '#e0e0e0',
                        boxShadow: '20px 20px 60px #bebebe, -20px -20px 60px #ffffff',
                        '& .MuiTableContainer-root': {
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center'
                        },
                        '& .MuiTable-root': {
                            width: '100%'
                        }
                    }}
                >
                    {children}
                </Box>
            </Container>
        </Box>
    );
};

export default Layout; 