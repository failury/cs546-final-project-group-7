import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import Button from '@mui/material/Button';
import useToken from '../components/useToken';
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
async function Commit(token, walletname, amount, id) {
  let wallets = [];
  try {
    const res = await axios.get('http://localhost:2000/wallet', {headers: {
    'Content-Type': 'application/json',
    'token': token
  }});
  res.data.forEach(element => {
    wallets.push(element);
  });
} catch (error) {
  console.log(error)
  sessionStorage.removeItem('token');
  window.location.href='/login';
} 
let count = 0;
let obj = {};
for (const w of wallets) {
  if(w.name == walletname){
      count++;
      obj = w;
  }
}
if(count == 1){
  obj.amount = parseInt(amount) + parseInt(obj.amount);
  let config = {
    headers:{
      'Content-Type': 'application/json',
    'token': token
    }, 
  };
  console.log('obj', obj)
  axios.patch('http://localhost:2000/wallet', obj,config).then(res => {
    let config = {
      headers:{
        'Content-Type': 'application/json',
      'token': token
      }, 
    };
  
    axios.post('http://localhost:2000/transaction/delete', {id:id},config).then(res => {
      console.log(res.data);
      window.location.reload(false);
    })
      .catch(err => {
        console.log(err)
      })
    window.location.reload(false);
  })
    .catch(err => {
      console.log('hello')
      console.log(err)
    })
}else{
  alert("Wallet does not exist.");
}


  
};
export default function Transaction(props) {
  const [error, setError] = React.useState('');
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
            <TableCell>Wallet</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell align="right">Memo</TableCell>
            <TableCell align="right"></TableCell>
            <TableCell>Actions</TableCell>
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
              <TableCell>{row.category}</TableCell>
              <TableCell>{row.wallet}</TableCell>
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
              <TableCell align="right">
                <Button
                  variant="contained"
                  onClick={() => Commit(token,row.wallet,row.amt,row._id)}
                  color="success"
                >
                  Commit
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}