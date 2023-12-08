import React from 'react';
import {
  Avatar,
  Button,
  Card,
  CardContent,
  Container,
  Typography,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const UserAccountView = () => {
  const navigate = useNavigate();
  const {userDetail} = useSelector((state)=> state.user);

 
  const logout =()=>{
    localStorage.removeItem('userData');
    navigate('/login')
  }


  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Card>
        <CardContent>
          <Avatar
            src={userDetail.profilePic ?userDetail.profilePic :'https://via.placeholder.com/150'}
            alt="Profile"
            sx={{ width: 100, height: 100, mx: 'auto', my: 2 }}
          />
          <Typography variant="h5" component="div" align="center" gutterBottom>
            {userDetail.name}
          </Typography>
          <Typography variant="subtitle1" align="center" color="textSecondary" paragraph>
            {userDetail.username}
          </Typography>
          <Typography variant="body1" align="center" paragraph>
            Email: {userDetail.email}
          </Typography>
          <Button variant="contained" color="primary" fullWidth onClick={logout}>
            Logout
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
};

export default UserAccountView;
