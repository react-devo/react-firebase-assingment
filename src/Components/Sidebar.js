import React, { useState } from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import UserAccountPage from './UserAccountEditBox';
import { Button } from '@mui/material';

const Sidebar = () => {
    const [openDialog, setOpenDialog] = useState(false);

    const handleOpenDialog = () => {
        setOpenDialog(true);
      };
    return (
        <Drawer
            variant="permanent"
            anchor="left"
            sx={{
                width: 240,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: 240,
                    boxSizing: 'border-box',
                },
            }}
        >
            <List>
                {/* User Information */}
                <ListItem
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        padding: '16px',
                    }}
                >
                    <Avatar
                        alt="User Avatar"
                        src="/path/to/user/avatar.jpg" // Replace with the actual path or URL of the user's avatar
                        sx={{ width: 80, height: 80, marginBottom: 3 }}
                    />
                    <Typography variant="subtitle1">John Doe</Typography>
                    <Button onClick={handleOpenDialog}>Edit Profile</Button>
                </ListItem>
                <Divider />

                {/* Navigation Options */}
                <ListItem button>
                    <ListItemText primary="Dashboard" />
                </ListItem>
                <ListItem button>
                    <ListItemText primary="Syllabus" />
                </ListItem>
                <ListItem button>
                    <ListItemText primary="Account" />
                </ListItem>
            </List>
            <Divider />

            {/* Logout Button */}
            <List>
                <ListItem button>
                    <ListItemText primary="Logout" />
                </ListItem>
            </List>
            <UserAccountPage  setOpenDialog={setOpenDialog} openDialog={openDialog}/>
        </Drawer>
    );
};

export default Sidebar;
