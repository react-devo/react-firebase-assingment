import React, { useState } from 'react';
import { Container, Typography, TextField, Button } from '@mui/material';

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')


    const handleSubmit = (event) => {
        event.preventDefault();
        // Add your login logic here
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
                color: '#fff'
            }}
        >
            <Typography component="h1" variant="h5" sx={{ color: '#fff' }}>
                Login
            </Typography>
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
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    value={username}
                    onChange={(e)=>setUsername(e.target.name)}
                    autoComplete="username"
                    autoFocus
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.name)}
                    id="password"
                    autoComplete="current-password"
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ marginTop: '1rem', backgroundColor: '#1976d2', color: '#fff' }}
                >
                    Login
                </Button>
            </form>
        </Container>
    );
};

export default Login;
