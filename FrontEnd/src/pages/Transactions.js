import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Transaction from '../components/Transacation';
import axios from 'axios'
import { Stack } from '@mui/material';
import Button from "@material-ui/core/Button";
import AddTransaction from '../components/AddTransaction';
import useToken from '../components/useToken';
import { useEffect, useState } from 'react';
import FilterOptions from '../components/FilterOptions';
export default function Transactions() {
    const { token } = useToken();
    const [data, setdata] = useState([]);
    let changeData = async function (newdata) {
        setdata(newdata);
    }
    
    const fetchData = async function () {
        try {
            const res = await axios.get('http://localhost:2000/transaction', {
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
        <div>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',
                    }}
                >
                    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                        <AddTransaction />
                        
                        <Stack spacing={5} noValidate xs={12} >
                        <FilterOptions data = {data} changeData = {changeData} resetData = {resetData}/>
                            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                                <Transaction title="Recent Transaction" data={data}  />
                            </Paper>

                        </Stack>
                    </Container>

                </Box>

            </Box>
        </div>
    )
}
