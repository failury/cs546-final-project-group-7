import React from 'react';
import AddBudgets from '../components/AddBudgets';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import axios from 'axios';
import useToken from '../components/useToken';
import { useEffect, useState } from 'react';
import { Stack } from '@mui/material';
import Budget from '../components/Budget';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

async function Delete(token, data) {
  let config = {
    headers:{
      'Content-Type': 'application/json',
    'token': token
    }, 
  };

  axios.post('http://localhost:2000/budget/delete', {id:data._id},config).then(res => {
    console.log(res.data);
    window.location.reload(false);
  })
    .catch(err => {
      console.log(err)
    })
};
  
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
                              <React.Fragment>
                                <Table size="medium">
                                  <TableHead>
                                    <TableRow>
                                      <TableCell>Budget Name</TableCell>
                                      <TableCell>Category</TableCell>
                                      <TableCell>Amount</TableCell>
                                      <TableCell>Wallet</TableCell>
                                      <TableCell>Type</TableCell>
                                      <TableCell align="right">Actions</TableCell>
                                    </TableRow>
                                  </TableHead>
                                  <TableBody>
                                  { data.length == 0 && <Typography
                                        component="h1"
                                        variant="h5"
                                        align="center"
                                        color="text.secondary"
                                        gutterBottom
                                      >
                                        You don't have any budget yet
                                      </Typography>}
                                  
                                    {data.map((row, i) => (
                                      <TableRow key={i}>
                                        <TableCell >{row.budgetname}</TableCell>
                                        <TableCell>{row.category}</TableCell>
                                        <TableCell>{row.amount}</TableCell>
                                        <TableCell>{row.wallet}</TableCell>
                                        <TableCell>{row.type}</TableCell>
                                        <TableCell>
                                          <Budget info={row}/>
                                        </TableCell>
                                        <TableCell align="right">
                                          <Button
                                            variant="contained"
                                              onClick={() => Delete(token, row)}
                                            color="error"
                                          >
                                            Delete
                                          </Button>
                                        </TableCell>
                                      </TableRow>
                                    ))}
                                  </TableBody>
                                </Table>
                              </React.Fragment>
                          </Paper>
                        </Stack>
                    </Container>
                </Box>
          </Box>
      </>
  )
}