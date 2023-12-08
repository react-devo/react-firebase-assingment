import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { doc, updateDoc } from 'firebase/firestore';
import db from '../config/firebaseconfig';

const isValidUsername = (username) => {
  const regex = /^[a-zA-Z][a-zA-Z0-9_.-]{2,28}[a-zA-Z0-9]$/;
  return regex.test(username);
};

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);

};

const validateMobile = (mobile) => {
  const mobileRegex = /^\d{10}$/;
  return mobileRegex.test(mobile);
};

const UserAccountPage = ({ openDialog, setOpenDialog, data }) => {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [profilePic, setProfilePic] = useState('');
  const [isValidUsernameField, setIsValidUsernameField] = useState(true);
  const [isValidNameField, setIsValidNameField] = useState(true);
  const [isValidEmailField, setIsValidEmailField] = useState(true);
  const [isValidMobileField, setIsValidEMobileField] = useState(true);
  const [updateStatus, setUpdateStatus] = useState('');
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setUsername(data?.username ?? '')
    setName(data?.name ?? '')
    setEmail(data?.email ?? '')
    setMobile(data?.mobile ?? '')
    setProfilePic(data?.profilePic ?? '')
  }, [data]);


  const handleCloseDialog = () => {
    setOpenDialog(false);
    setProfilePic('');
  };

  const handleUsernameChange = (event) => {
    const newUsername = event.target.value;
    setUsername(newUsername);
    setIsValidUsernameField(isValidUsername(newUsername));
  };

  const handleUserEmailChange = (event) => {
    const emailInput = event.target.value;
    setEmail(emailInput);
    setIsValidEmailField(validateEmail(emailInput));
  };

  const handleNameChange = (event) => {
    const newName = event.target.value;
    setName(newName);
    setIsValidNameField(newName.trim().length > 0);
  };

  const handleMobileChange = (event) => {
    const mobileNum = event.target.value;
    setMobile(mobileNum);
    setIsValidEMobileField(validateMobile(mobileNum));
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setProfilePic(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };


  const updateUser = async () => {
    const userRec = JSON.parse(localStorage.getItem('userData'));
    setLoading(true);
    try {
      const recordData = {
        username,
        name,
        profilePic,
        email,
        mobile
      }
      const userDocRef = doc(db, 'userDetails', userRec.token);
      // Update the 'age' field with the new age
      await updateDoc(userDocRef, {
        ...recordData
      });
      setLoading(false);
      setUpdateStatus('User record updated successfully!');
      handleCloseDialog();
    } catch (error) {
      setLoading(false);
      console.error('Error updating user record:', error);
      setUpdateStatus('Error updating user record');
    }
  };

  return (
    <>
      {/* Sidebar Link to Open Dialog */}

      {/* Dialog for Editing Profile */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Edit Profile</DialogTitle>
        {updateStatus && <p style={{ color: 'red' }}>{updateStatus}</p>}
        <DialogContent>
          <Avatar src={profilePic} alt="Profile" sx={{ width: 100, height: 100 }} />
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            value={name}
            onChange={handleNameChange}
            error={!isValidNameField}
            helperText={isValidNameField ? '' : 'name is required.'}
            style={{ marginTop: '10px' }}
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={handleUserEmailChange}
            error={!isValidEmailField}
            helperText={isValidEmailField ? '' : 'Invalid email format'}
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
            value={mobile}
            onChange={handleMobileChange}
            error={!isValidMobileField}
            helperText={isValidMobileField ? '' : 'Invalid Mobile number'}
            style={{ marginTop: '10px' }}
          />
          <input type="file" onChange={handleProfilePicChange} style={{ marginTop: '10px' }} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={updateUser} disabled={!isValidUsernameField || !isValidNameField || loading}>
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UserAccountPage;
