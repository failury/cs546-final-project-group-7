import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Transaction from '../components/Transacation';
import axios from 'axios'
import { Stack } from '@mui/material';
import AddTransaction from '../components/AddTransaction';
import useToken from '../components/useToken';
import { useEffect, useState } from 'react';
import FilterOptions from '../components/FilterOptions';
import SendTransaction from '../components/SendTransaction';

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
            let objs = res.data;
            const today = new Date();
            objs.forEach(element => {
                let date = new Date(element.payment_Date);
                if(element.category === 'Bills' && date.getTime() === today.getTime() ){
                    element.colored = true;
                }
            });
            setdata(objs);
        } catch (error) {
            console.log(error);
            // sessionStorage.removeItem('token');
            // window.location.href = '/login';
        }
    };
    let resetData = async function () {
        fetchData();
    }
    useEffect(() => {
        fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
                        <SendTransaction data = {data}/>
                        <Stack spacing={5} noValidate xs={12} >
                        <FilterOptions data = {data} changeData = {changeData} resetData = {resetData}/>
                            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                                <h1>Recent Transaction</h1>
                                <Transaction data={data}  />
                            </Paper>

                        </Stack>
                    </Container>

                </Box>

            </Box>
        </div>
    )
}
