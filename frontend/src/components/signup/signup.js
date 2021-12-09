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
import { useDispatch } from 'react-redux';
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

export default function SignUp() {
    const dispatch = useDispatch()
    let history = useHistory();
    const [displayAlert, setDisplayAlert] = useState(false)
    const [errorMsg, setErrorMsg] = useState("")

    const handleClear = e => {
        e.preventDefault()
        // setSearchInput("")
        // setDisplayRes(false)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        var headers = {
            'accept': 'application/json',
        };

        var data = {
            email: formData.get('email'),
            password: formData.get('password'),
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName')
        }

        var options = {
            method: 'POST',
            url: 'http://localhost:5000/users/register',
            headers: headers,
            data: qs.stringify(data)
        };

        axios(options).then(res => {
            console.log(res)
            if (res.data.error) {
                console.log('error logging in', res.data.error)
            } else {
                if (res.data.success) {
                    console.log('added', res.data)
                    var email = formData.get('email')
                    dispatch(login(email))

                    var data2 = qs.stringify({
                        'email': email,
                        'total': '0',
                        'spendingPower': '0',
                        'savingsTotal': '0'
                    });
                    var config = {
                        method: 'post',
                        url: 'http://localhost:5000/portfolios/',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        },
                        data: data2
                    };

                    axios(config)
                        .then(function (response) {
                            console.log(JSON.stringify(response.data));
                        })
                        .catch(function (error) {
                            console.log(error);
                        });

                    // need to save user info somewhere
                    history.push('/')
                } else {
                    console.log('failed')
                    console.log(res.data)
                    setErrorMsg(res.data.message)
                    setDisplayAlert(true)
                }

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
            console.log('confuzzle', res.data.success)
            // need to save user info somewhere
            if (res.data.success) {
                console.log('hi')
                dispatch(login("testuser@gmail.com"))
                history.push('/')
            } else {
                console.log(res.data.message)
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
                        Sign up
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="family-name"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                                    label="I want to receive inspiration, marketing promotions and updates via email."
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>

                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="#" variant="body2" >
                                    Already have an account? Sign in
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
                <Copyright sx={{ mt: 5 }} />
            </Container>
        </ThemeProvider>
    );
}