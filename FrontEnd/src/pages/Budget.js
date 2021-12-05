import React from 'react';
import AddBudgets from '../components/AddBudgets';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import axios from 'axios';
import useToken from '../components/useToken';
import { useEffect, useState } from 'react';
import { Stack } from '@mui/material';
import Budget from '../components/Budget';
  
export default function Budgets() {
  const { token, setToken } = useToken();
  const [data, setdata] = useState([]);
  const fetchData = async function () {
    try {
        const res = await axios.get('http://localhost:2000/budget', {headers: {
        'Content-Type': 'application/json',
        'token': token
      }});
      setdata(res.data);
    } catch (error) {
      console.log(error);
      sessionStorage.removeItem('token');
      window.location.href='/login';
    } 
};
  useEffect(() => {
      fetchData();
},[]);

  return (
      <>
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
              <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'light'
                                ? theme.palette.grey[100]
                                : theme.palette.grey[900],
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',
                    }}
                >
                  <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                        <AddBudgets/>
                        <Stack component="Grid" spacing={5} noValidate xs={12} >
                                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                                        <Budget title="All Budget" data = {data} />
                                    </Paper>
                        </Stack>
                    </Container>

                  {/* <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={8} lg={9}>
                            <Paper
                                sx={{
                                    p: 2,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    height: 500,
                                }}
                            >
                                <Budgets />
                            </Paper>
                        </Grid>
                    </Grid>
                  </Container> */}
                </Box>
          </Box>
      </>
  )
}