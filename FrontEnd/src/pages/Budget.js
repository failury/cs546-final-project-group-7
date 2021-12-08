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
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import { Button } from '@mui/material';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField'
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import Grid from '@mui/material/Grid';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

//unfinished
async function searchBudget(credentials,token) {
  return fetch('http://localhost:2000/budget/budgetname', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'token': token
    },
    body: JSON.stringify(credentials)
  }).catch(error => {
    throw(error);
}).then(data => {
  if(!data.ok){
    return data.text().then(text => { throw new Error(text) })
  }else {
    return data.json();
  }   
})
}

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
  const { token } = useToken();
  const [data, setdata] = useState([]);
  const [searchdata, setsearch] = useState([]);
  const [error,seterror] = useState('');
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

const handleSearch = async (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  let budget_name = data.get('budget_name');
  try {
    const res = await searchBudget({
      budget_name
    },token);
    let array = [];
    array.push(res);
    // array.push(res.amount);
    // array.push(res.category);
    // array.push(res.wallet);
    // array.push(res.type);
    setsearch(array);
    // console.log(searchdata);
  } catch (error) {
    seterror(error.message.replace(/['"]+/g, ''));
  }
};

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
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
        <Box component="form" onSubmit={handleSearch} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="budget_name"
              label="Budget Name"
              name="budget_name"
              autoComplete="budget_name"
              autoFocus
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Search
            </Button>
            {/* <Grid item xs={12}>
            <Typography variant="body1" component="div" gutterBottom>
               {searchdata}
              </Typography>
            </Grid> */}
            <Grid item xs={12}>
            <Typography variant="body1" component="div" gutterBottom color="error">
               {error}
              </Typography>
            </Grid>
          </Box>
        </Paper>

        <Stack component="Grid" spacing={5} noValidate xs={12} >
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
          <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Budget Name</StyledTableCell> 
                    <StyledTableCell>Catrgory</StyledTableCell>
                    <StyledTableCell>Amount</StyledTableCell>
                    <StyledTableCell>Wallet</StyledTableCell>
                    <StyledTableCell>Type</StyledTableCell>
                    <StyledTableCell>Update</StyledTableCell>
                    <StyledTableCell>Delete</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {searchdata.map((row) => (
                    <StyledTableRow key={row.budgetname}>
                      <StyledTableCell component="th" scope="row">
                        {row.budgetname}
                      </StyledTableCell>
                      <StyledTableCell>{row.category}</StyledTableCell>
                      <StyledTableCell>{row.amount}</StyledTableCell>
                      <StyledTableCell>{row.wallet}</StyledTableCell>
                      <StyledTableCell>{row.type}</StyledTableCell>
                      <StyledTableCell><Budget info={row}/></StyledTableCell>
                      <StyledTableCell>
                      <Button
                        variant="contained"
                          onClick={() => Delete(token, row)}
                        color="error"
                      >
                        Delete
                      </Button>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Stack>
      </Container>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <AddBudgets/>
        <Stack component="Grid" spacing={5} noValidate xs={12} >
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
          <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Budget Name</StyledTableCell> 
                    <StyledTableCell>Catrgory</StyledTableCell>
                    <StyledTableCell>Amount</StyledTableCell>
                    <StyledTableCell>Wallet</StyledTableCell>
                    <StyledTableCell>Type</StyledTableCell>
                    <StyledTableCell>Update</StyledTableCell>
                    <StyledTableCell>Delete</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((row) => (
                    <StyledTableRow key={row.budgetname}>
                      <StyledTableCell component="th" scope="row">
                        {row.budgetname}
                      </StyledTableCell>
                      <StyledTableCell>{row.category}</StyledTableCell>
                      <StyledTableCell>{row.amount}</StyledTableCell>
                      <StyledTableCell>{row.wallet}</StyledTableCell>
                      <StyledTableCell>{row.type}</StyledTableCell>
                      <StyledTableCell><Budget info={row}/></StyledTableCell>
                      <StyledTableCell>
                      <Button
                        variant="contained"
                          onClick={() => Delete(token, row)}
                        color="error"
                      >
                        Delete
                      </Button>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Stack>
      </Container>
    </Box>
    
  </> 
);



  // return (
  //     <>
  //       <Box sx={{ display: 'flex' }}>
  //           <CssBaseline />
  //             <Box
  //                   component="main"
  //                   sx={{
  //                       backgroundColor: (theme) =>
  //                           theme.palette.mode === 'light'
  //                               ? theme.palette.grey[100]
  //                               : theme.palette.grey[900],
  //                       flexGrow: 1,
  //                       height: '100vh',
  //                       overflow: 'auto',
  //                   }}
  //               >
  //                 <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
  //                       <AddBudgets/>
  //                       <Stack component="Grid" spacing={5} noValidate xs={12} >
  //                         <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
  //                             <React.Fragment>
  //                               <Table size="medium">
  //                                 <TableHead>
  //                                   <TableRow>
  //                                     <TableCell>Budget Name</TableCell>
  //                                     <TableCell>Category</TableCell>
  //                                     <TableCell>Amount</TableCell>
  //                                     <TableCell>Wallet</TableCell>
  //                                     <TableCell>Type</TableCell>
  //                                     <TableCell align="right">Actions</TableCell>
  //                                   </TableRow>
  //                                 </TableHead>
  //                                 <TableBody>
  //                                 { data.length == 0 && <Typography
  //                                       component="h1"
  //                                       variant="h5"
  //                                       align="center"
  //                                       color="text.secondary"
  //                                       gutterBottom
  //                                     >
  //                                       You don't have any budget yet
  //                                     </Typography>}
                                  
  //                                   {data.map((row, i) => (
  //                                     <TableRow key={i}>
  //                                       <TableCell >{row.budgetname}</TableCell>
  //                                       <TableCell>{row.category}</TableCell>
  //                                       <TableCell>{row.amount}</TableCell>
  //                                       <TableCell>{row.wallet}</TableCell>
  //                                       <TableCell>{row.type}</TableCell>
  //                                       <TableCell>
  //                                         <Budget info={row}/>
  //                                       </TableCell>
  //                                       <TableCell align="right">
  //                                         <Button
  //                                           variant="contained"
  //                                             onClick={() => Delete(token, row)}
  //                                           color="error"
  //                                         >
  //                                           Delete
  //                                         </Button>
  //                                       </TableCell>
  //                                     </TableRow>
  //                                   ))}
  //                                 </TableBody>
  //                               </Table>
  //                             </React.Fragment>
  //                         </Paper>
  //                       </Stack>
  //                   </Container>
  //               </Box>
  //         </Box>
  //     </>
  // )
}