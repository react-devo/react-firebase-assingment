import React, { useState } from 'react';
import {
  Avatar,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';

const isValidUsername = (username) => {
  const regex = /^[a-zA-Z][a-zA-Z0-9_.-]{2,28}[a-zA-Z0-9]$/;
  return regex.test(username);
};

const UserAccountPage = ({openDialog,setOpenDialog}) => {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [profilePic, setProfilePic] = useState(''); // URL to profile picture
  const [isValidUsernameField, setIsValidUsernameField] = useState(true);
  const [isValidNameField, setIsValidNameField] = useState(true);

 

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleUsernameChange = (event) => {
    const newUsername = event.target.value;
    setUsername(newUsername);
    setIsValidUsernameField(isValidUsername(newUsername));
  };

  const handleNameChange = (event) => {
    const newName = event.target.value;
    setName(newName);
    setIsValidNameField(newName.trim().length > 0);
  };

  const handleProfilePicChange = (event) => {
    // Handle profile picture change
  };

  const handleSaveChanges = () => {
    // Perform save changes logic
    // Update profile details and close the dialog
    setProfilePic(''); // Replace with the actual URL
    handleCloseDialog();
  };

  return (
    <>
      {/* Sidebar Link to Open Dialog */}
 
      {/* Dialog for Editing Profile */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
          <Avatar src={profilePic} alt="Profile" sx={{ width: 100, height: 100 }} />
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            value={username}
            onChange={handleUsernameChange}
            error={!isValidUsernameField}
            helperText={isValidUsernameField ? '' : 'Invalid username'}
            style={{ marginTop: '10px' }}
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            value={username}
            onChange={handleUsernameChange}
            error={!isValidUsernameField}
            helperText={isValidUsernameField ? '' : 'Invalid email'}
            style={{ marginTop: '10px' }}
          />
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            value={username}
            onChange={handleUsernameChange}
            error={!isValidUsernameField}
            helperText={isValidUsernameField ? '' : 'Invalid username'}
            style={{ marginTop: '10px' }}
          />
          <TextField
            label="Mobile"
            variant="outlined"
            fullWidth
            value={name}
            onChange={handleNameChange}
            error={!isValidNameField}
            helperText={isValidNameField ? '' : 'Mobile is required'}
            style={{ marginTop: '10px' }}
          />
          <input type="file" onChange={handleProfilePicChange} style={{ marginTop: '10px' }} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSaveChanges} disabled={!isValidUsernameField || !isValidNameField}>
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UserAccountPage;
