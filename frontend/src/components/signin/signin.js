import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Alert, AlertTitle } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import qs from 'qs';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { login } from '../../reducers/loginReducer';

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
    const [displayAlert, setDisplayAlert] = useState(false)
    const [errorMsg, setErrorMsg] = useState("")

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
            url: `${process.env.REACT_APP_BACKEND_API}/users/login`,
            headers: headers,
            data: qs.stringify(data)
        };

        var email = formData.get('email')
        axios(options).then(res => {
            console.log('login results')
            console.log(res.data.success)
            console.log(res.data.message)
            // need to save user info somewhere
            if (res.data.success) {
                dispatch(login(email))
                history.push('/')
            }else{
                console.log('failed')
                console.log(res.data)
                setErrorMsg(res.data.message)
                setDisplayAlert(true)
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
            url: `${process.env.REACT_APP_BACKEND_API}/users/login`,
            headers: headers,
            data: qs.stringify(data)
        };

        axios(options).then(res => {
            console.log(res)
            // need to save user info somewhere
            if (res.data.success) {
                dispatch(login("testuser@gmail.com"))
                
                console.log(res.data.sucess)
                history.push('/')
            }
        })
    }

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                {
                    displayAlert ?
                        <Alert severity="error" onClose={() => setDisplayAlert(false)}>
                            <AlertTitle>Error</AlertTitle>
                            {errorMsg}
                        </Alert>
                        : null
                }
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