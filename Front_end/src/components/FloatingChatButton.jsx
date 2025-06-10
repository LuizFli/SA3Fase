import { Box, IconButton, Tooltip } from '@mui/material';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';

export default function FloatingChatButton() {
    return (
        <Tooltip title="Fale conosco" placement="left">
            <Box
                sx={{
                    position: 'fixed',
                    bottom: 16,
                    right: 16,
                    zIndex: 1000,
                    backgroundColor: 'white',
                    borderRadius: '50%',
                    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
                    width: 56,
                    height: 56,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <IconButton
                    size="large"
                    sx={{ color: '#FF6D00' }}
                    onClick={() => {
                        // ação: abrir chat, modal, redirecionar, etc.
                        alert('Abrir chat!');
                    }}
                >
                    <ChatBubbleIcon fontSize="medium" />
                </IconButton>
            </Box>
        </Tooltip>
    );
}
