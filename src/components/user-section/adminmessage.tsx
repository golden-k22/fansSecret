import React, { useEffect, useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';
import { format } from 'date-fns';

const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return format(date, 'yyyy-MM-dd, HH:mm');
};

interface Message {
    id: number;
    m_title: string;
    m_content: string;
    createdAt: string;
}

const AdminMessage: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
    const [selectedMessageId, setSelectedMessageId] = useState<number | null>(null); // Track the clicked message

    useEffect(() => {
        // Fetch messages from the API endpoint
        const fetchMessages = async () => {
            try {
                const response = await fetch('/api/admin/messages');
                if (!response.ok) throw new Error('Failed to fetch messages');
                const data: Message[] = await response.json();

                // Keep only the latest 3 messages
                setMessages(data.slice(0, 1));
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };

        fetchMessages();

        // Polling: Fetch messages every 10 seconds
        const intervalId = setInterval(fetchMessages, 10000);
        return () => clearInterval(intervalId);
    }, []);

    // Handle message click to open dialog and change color
    const handleMessageClick = (message: Message) => {
        setSelectedMessage(message);
        setSelectedMessageId(message.id); // Update the clicked message ID
        setOpenDialog(true);
    };

    // Close dialog
    const handleDialogClose = () => {
        setOpenDialog(false);
        setSelectedMessage(null);
        setSelectedMessageId(null); // Reset selected message ID
    };

    return (
        <div style={{ maxHeight: '300px', overflowY: 'auto', border: '1px solid #ccc', padding: '10px' }}>
            {/* <h3 className='font-bold'>Admin Messages</h3> */}
            {messages.length === 0 ? (
                <p>No messages available.</p>
            ) : (
                messages.map((message, index) => (
                    <div
                        key={message.id}
                        style={{
                            padding: '8px',
                            marginBottom: '5px',
                            borderBottom: '1px solid #ddd',
                            color:
                                message.id === selectedMessageId // If message is clicked, set color to black
                                    ? 'black'
                                    : index === 0 && selectedMessageId === null // Latest message is red if no message has been clicked
                                        ? 'red'
                                        : 'black',
                            fontWeight:
                                message.id === selectedMessageId // Bold the selected message
                                    ? 'bold'
                                    : 'normal',
                            cursor: 'pointer',
                        }}
                        onClick={() => handleMessageClick(message)} // Open dialog on click
                    >
                        <p className='font-bold'>{message.m_title}</p>
                        <small>{formatDate(message.createdAt)}</small>
                    </div>
                ))
            )}

            {/* Dialog for displaying selected message content */}
            <Dialog open={openDialog} onClose={handleDialogClose} PaperProps={{
                style: {
                    width: '600px', // set custom width
                    maxHeight: '80vh', // optional to set a max height
                    height: '70vh'
                }
            }}>
                <DialogTitle>{selectedMessage ? selectedMessage.m_title : 'Loading...'}</DialogTitle>
                <DialogContent>
                    {selectedMessage ? selectedMessage.m_content : 'Loading...'}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default AdminMessage;
