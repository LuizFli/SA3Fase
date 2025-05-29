import { Box } from '@mui/material';

const PageContainer = ({ children }) => {
    return (
        <Box sx={{
            margin: 0,
            padding: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
        }}>
            {children}
        </Box>
    );
};

export default PageContainer;