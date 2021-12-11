import React from 'react';
import ExpenseReports from '../components/ExpenseReports';
import IncomeReports from '../components/IncomeReports';
import ReportFilter from '../components/ReportFilter';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';

import Stack from '@mui/material/Stack';
import { useState, useEffect } from 'react';
import useToken from '../components/useToken';
import axios from 'axios'

export default function ReportPage() {

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    return (
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
                        <Stack spacing={5} noValidate xs={12} >
                        <ReportFilter data = {data} changeData = {changeData} resetData = {resetData}/>
                            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                                <ExpenseReports data={data}/>
                                <IncomeReports data={data}/>
                            </Paper>

                        </Stack>
                    </Container>

                </Box>

            </Box>
    )
}
