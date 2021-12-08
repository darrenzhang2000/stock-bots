import React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import qs from 'qs'
import axios from 'axios'
import { login, logout } from '../../reducers/loginReducer'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from "react-router-dom";

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
      </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();

export default function SignIn() {
    const isLoggedIn = useSelector(state => state.login.isLoggedIn)
    const dispatch = useDispatch()
    let history = useHistory();

    // post request that checks if the user and password is in the database.
    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        var headers = {
            'accept': 'application/json',
        };

        var data = {
            email: formData.get('email'),
            password: formData.get('password'),
        }

        var options = {
            method: 'POST',
            url: 'http://localhost:5000/users/login',
            headers: headers,
            data: qs.stringify(data)
        };

        axios(options).then(res => {
            console.log('login results')
            console.log(res.data.success)
            console.log(res.data.message)
            // need to save user info somewhere
            if (res.data.success) {
                dispatch(login())
                history.push('/')
            }
        })
    };

    const handleLogInAsGuest = (event) => {
        event.preventDefault();
        console.log('guest login')

        var headers = {
            'accept': 'application/json',
        };

        var data = {
            email: 'testuser@gmail.com',
            password: 'test123',
        }

        var options = {
            method: 'POST',
            url: 'http://localhost:5000/users/login',
            headers: headers,
            data: qs.stringify(data)
        };

        axios(options).then(res => {
            console.log(res)
            // need to save user info somewhere
            if (res.data.success) {
                dispatch(login())
                console.log(res.data.sucess)
                history.push('/')
            }
        })
    }

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="#" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={handleLogInAsGuest}
                        >
                            Continue as guest user
                        </Button>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    );
}