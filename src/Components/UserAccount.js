import React from 'react';
import {
  Avatar,
  Button,
  Card,
  CardContent,
  Container,
  Typography,
} from '@mui/material';

const UserAccountView = () => {
  // Mock data for user profile
  const userProfile = {
    username: 'john_doe',
    name: 'John Doe',
    email: 'john.doe@example.com',
    profilePic: 'https://via.placeholder.com/150', // Replace with actual URL
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Card>
        <CardContent>
          <Avatar
            src={userProfile.profilePic}
            alt="Profile"
            sx={{ width: 100, height: 100, mx: 'auto', my: 2 }}
          />
          <Typography variant="h5" component="div" align="center" gutterBottom>
            {userProfile.name}
          </Typography>
          <Typography variant="subtitle1" align="center" color="textSecondary" paragraph>
            {userProfile.username}
          </Typography>
          <Typography variant="body1" align="center" paragraph>
            Email: {userProfile.email}
          </Typography>
          <Button variant="contained" color="primary" fullWidth>
            Edit Profile
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
};

export default UserAccountView;
