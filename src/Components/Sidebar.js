import React, { useEffect, useState } from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import UserAccountPage from './UserAccountEditBox';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import {  doc,onSnapshot } from 'firebase/firestore';
import db from '../config/firebaseconfig';
import { setUser } from '../stores/slices/UserSlice';

const Sidebar = () => {
    const navigator = useNavigate();
    const dispatch = useDispatch();
    const [openDialog, setOpenDialog] = useState(false);
    const [userDetails, setUserDetails] = useState([]);
    const [userId] = useState(JSON.parse(localStorage.getItem('userData')));
    const {userDetail} = useSelector((state)=> state.user);

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    // get userDetails from firebase
    useEffect(() => {
        const userDocRef = doc(db, 'userDetails', userId?.token);
        const unsubscribe = onSnapshot(userDocRef, (docSnapshot) => {
          if (docSnapshot.exists()) {
            setUserDetails({ id: docSnapshot.id, ...docSnapshot.data() });
            dispatch(setUser({ id: docSnapshot.id, ...docSnapshot.data() }));
          } else {
            setUserDetails(null);
            dispatch(setUser({}));
            
            console.log('User not found');
          }
        });
    
        return () => {
          // Unsubscribe when the component unmounts
          unsubscribe();
        };
      }, [userId?.token]);


    // navigation routes
    const handleRoutes = (routesName) => {
        navigator(routesName)
    }


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
                        src={userDetail?.profilePic ? userDetail?.profilePic : "/path/to/user/avatar.jpg"} // Replace with the actual path or URL of the user's avatar
                        sx={{ width: 80, height: 80, marginBottom: 3 }}
                    />
                    <Typography variant="subtitle1">{userDetail?.username}</Typography>
                    <Button onClick={handleOpenDialog}>Edit Profile</Button>
                </ListItem>
                <Divider />

                {/* Navigation Options */}
                <ListItem button onClick={() => handleRoutes('/')}>
                    <ListItemText primary="Dashboard" />
                </ListItem>
                <ListItem button onClick={() => handleRoutes('/syllabus')}>
                    <ListItemText primary="Syllabus" />
                </ListItem>
                <ListItem button onClick={() => handleRoutes('/account')}>
                    <ListItemText primary="Account" />
                </ListItem>
            </List>
            <Divider />

            {/* Logout Button */}
            {/* <List>
                <ListItem button>
                    <ListItemText primary="Logout" />
                </ListItem>
            </List> */}
            <UserAccountPage setOpenDialog={setOpenDialog} openDialog={openDialog} data={userDetail}/>
        </Drawer>
    );
};

export default Sidebar;
