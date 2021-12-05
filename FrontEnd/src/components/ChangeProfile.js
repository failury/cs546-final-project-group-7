import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import PersonIcon from '@mui/icons-material/Person';
import useToken from '../components/useToken';
import axios from 'axios'
const theme = createTheme();
async function updateUser(credentials, token) {
  return fetch('http://localhost:2000/user', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'token': token
    },
    body: JSON.stringify(credentials)
  })
    .then(data => {
      if(!data.ok){
        return data.text().then(text => { throw new Error(text) })
      }else {
        return data.json();
      }   
    }).catch(error => {
      throw(error);
  })
 }
export default function ChangeProfile() {
  const { token, setToken } = useToken();
  const [error,seterror] = React.useState('');
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let  firstname = data.get('firstName');
     let lastname = data.get('lastName');
     let username = data.get('username');
     let password =  data.get('password');
     let url = data.get('url') == null ? "" : data.get('url');
     if(!firstname || !lastname || ! username|| !password){
      seterror("Please enter all require information");
      return;
     }
     username = username.toString().trim();
     password = password.toString().trim();
     if(username.trim().length < 4){seterror('username length must be greater than 4');return;};
    if (!username.trim().match(/^[0-9a-z]+$/)){seterror('username contains non alphanumeric');return; }
    if(password.trim().length < 6){seterror('password length must be greater than 6');return; };
     try {
      const res = await updateUser({
        firstname,
        lastname,
        username,
        password,
        url
      },token);
      sessionStorage.removeItem('token');
      window.location.href='/login';
     } catch (error) {
      console.log(error);
      seterror("Update information failed");
     }

  };

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
            <PersonIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Change Profile Information
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
                  label="New First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="New Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="url"
                  label="New Profile Image URL"
                  name="url"
                  autoComplete="url"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="New User Name"
                  name="username"
                  autoComplete="username"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="New Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
            <Typography variant="body1" component="div" gutterBottom color="error">
               {error}
              </Typography>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Save
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
