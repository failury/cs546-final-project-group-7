import React from 'react';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import useToken from '../components/useToken';
import { useEffect, useState } from 'react';
import { Stack } from '@mui/material';
import UpdateBudget from '../components/UpdateBudget';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import { Button } from '@mui/material';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';

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
    backgroundColor: theme.palette.common.white,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

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

export default function Budgets(props) {
  const [error, setError] = React.useState('');
  const { token, setToken } = useToken();
  let data = props.data;

    return(
      <Stack component="Grid" spacing={5} noValidate xs={12} >
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
                    <StyledTableCell><UpdateBudget info={row}/></StyledTableCell>
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
        </Stack>
    )
}