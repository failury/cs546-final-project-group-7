import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import Button from '@mui/material/Button';
import useToken from '../components/useToken';
import { useEffect, useState } from 'react';
import axios from 'axios'
import Typography from '@mui/material/Typography';


async function Delete(token, data) {
  let config = {
    headers:{
      'Content-Type': 'application/json',
    'token': token
    }, 
  };

  axios.post('http://localhost:2000/transaction/delete', {id:data._id},config).then(res => {
    console.log(res.data);
    window.location.reload(false);
  })
    .catch(err => {
      console.log(err)
    })
};
export default function Transaction(props) {

  const { token, setToken } = useToken();
  let data = props.data;
  return (
    <React.Fragment>
      <Title>{props.title}</Title>
      <Table size="medium">
        <TableHead>
          <TableRow>
            <TableCell>Payment Date</TableCell>
            <TableCell>Payment Type</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell align="right">Memo</TableCell>
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
              You dont have any transaction yet
            </Typography>}
        
          {data.map((row, i) => (
            <TableRow key={i}>
              <TableCell >{row.payment_Date}</TableCell>
              <TableCell>{row.payment_Type}</TableCell>
              <TableCell>category</TableCell>
              <TableCell>{row.amt}</TableCell>
              <TableCell align="right">{`${row.memo}`}</TableCell>
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
  );
}