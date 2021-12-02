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
import {useEffect,useState} from 'react';
export default function Transactions() {
    const { token, setToken } = useToken();
    const [data, setdata] = useState([]);
    const fetchData = async function () {
      try {
          const res = await axios.get('http://localhost:2000/transaction', {headers: {
          'Content-Type': 'application/json',
          'token': token
        }});
        setdata(res.data);
      } catch (error) {
          console.log(error);
      } 
  };
    useEffect(() => {
        fetchData();
},[]);




    return (
        <div>
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
                        <AddTransaction/>
                        <Stack component="Grid" spacing={5} noValidate xs={12} >
                                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                                        <Transaction title="Recent Transaction" data = {data} />
                                    </Paper>
                                    {/* <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                                        <Transaction title="Schedule Transaction" data = {data} />
                                    </Paper> */}
                        </Stack>
                    </Container>

                </Box>

            </Box>
        </div>
    )
}
