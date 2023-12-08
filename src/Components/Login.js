import React, { useState } from 'react';
import { Container, Typography, TextField, Button } from '@mui/material';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import db from '../config/firebaseconfig';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

// sumbit user name and password
    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        if (username?.trim()?.length > 0 && password?.trim()?.length > 5) {
            setLoading(true);
            try {
               await checkUsernameExists();

            } catch (error) {
                console.error('Error logging in:', error.message);
                setError(error.message);
                setLoading(false);
            }
        }else{
            setError('Password should be greater than 5 character.');
        }
    };
    
    // checking user is already exist or not
    const checkUsernameExists = async () => {
        try {
            const q = query(collection(db, 'userDetails'), where('username', '==', username));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                // Username exists, send user details
                const data = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                localStorage.setItem('userData', JSON.stringify({ username: data[0]?.username, token: data[0]?.id }));
                setLoading(false);
                navigate('/');
            } else {
              // Username not exists, send user details
                const docRef = await addDoc(collection(db, 'userDetails'), { username, password });
                if (docRef?.id) {
                    localStorage.setItem('userData', JSON.stringify({ username, token: docRef?.id }))
                    navigate('/');
                }
                setLoading(false);
            }
        } catch (error) {
            console.error('Error checking username:', error);
        }
    };

    return (
        <Container
            component="main"
            maxWidth="xs"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                backgroundColor: '#2196f3', // Blue background color
            }}
        >
            <Typography component="h1" variant="h5" sx={{ color: '#fff' }}>
                Login
            </Typography>
            {error && <p style={{ color: "red" }}> {error}</p>}
            <form
                onSubmit={handleSubmit}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    marginTop: '2rem',
                }}
            >

                <TextField
                    label="Username*"
                    variant="outlined"
                    fullWidth
                    require
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <TextField
                    margin="normal"
                    require
                    name="password"
                    label="Password*"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                    type="submit"
                    fullWidth
                    disabled={loading}
                    variant="contained"
                    sx={{ marginTop: '1rem', backgroundColor: '#1976d2', color: '#fff' }}
                >
                    {loading ? "Loading.." : "Login"}
                </Button>
            </form>
        </Container>
    );
};

export default Login;
