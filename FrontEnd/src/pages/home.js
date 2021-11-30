import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Chart from '../components/Chart';
import Budget from '../components/Budget';
import Transaction from '../components/Transacation';
import Link from '@mui/material/Link';
import { Button } from '@mui/material';
import axios from 'axios'
import GlobalStyles from '@mui/material/GlobalStyles';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import {useState, useEffect} from 'react';
import useToken from '../components/useToken';
export default function Home() {
    const { token, setToken } = useToken();
    const [user, setuser] = useState([]);
    useEffect(() => {
        async function fetchData() {
            try {
                const res = await axios.get('http://localhost:2000/user', {headers: {
                'Content-Type': 'application/json',
                'token': token
              }});
              setuser(res.data);
            } catch (error) {
                console.log(error);
            } 
        }
        fetchData();
},[]);


    return (
        <>
      <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
      <CssBaseline />
      <Container maxWidth="lg" component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
        }}>
         <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Welcome 
            </Typography>
            <Typography variant="h2" align="center" color="text.secondary" paragraph>
            {user.firstName} {user.lastName}
            </Typography>
          </Container>
      </Container>


        </>
    )
}
