import React from 'react';
import AddBudgets from '../components/AddBudgets';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import useToken from '../components/useToken';
import { useEffect, useState } from 'react';
import { Stack } from '@mui/material';
import Budget from '../components/Budget';
import BudgetFilter from '../components/BudgetFilter';
  
export default function Budgets() {
const { token } = useToken();
    const [data, setdata] = useState([]);
    let changeData = async function (newdata) {
        setdata(newdata);
    }
    
    const fetchData = async function () {
        try {
            const res = await axios.get('http://localhost:2000/budget', {
                headers: {
                    'Content-Type': 'application/json',
                    'token': token
                }
            });
            setdata(res.data);
        } catch (error) {
            sessionStorage.removeItem('token');
            window.location.href = '/login';
        }
    };
    let resetData = async function () {
        fetchData();
    }
    useEffect(() => {
        fetchData();
    }, []);

return (
  <>
    <Box component="main"
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
        <Stack spacing={5} noValidate xs={12} >
        <BudgetFilter data = {data} changeData = {changeData} resetData = {resetData}/>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                <Budget title="Recent Budget" data={data}  />
            </Paper>
        </Stack>
      </Container>
    </Box>
  </> 
);
}