// import * as React from 'react';
// import Link from '@mui/material/Link';
// import Typography from '@mui/material/Typography';
// import Title from './Title';



// export default function Budget() {
//   return (
//     <React.Fragment>
//       <Title>Budget</Title>
//       <Typography component="p" variant="h4">
//         $3,024.00
//       </Typography>
//       <Typography color="text.secondary" sx={{ flex: 1 }}>
//         on 15 March, 2019
//       </Typography>
//       <div>
//         <Link color="primary" href="Budget">
//           View Budget
//         </Link>
//       </div>
//     </React.Fragment>
//   );
// }

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

  axios.post('http://localhost:2000/budget/delete', {id:data._id},config).then(res => {
    console.log(res.data);
    window.location.reload(false);
  })
    .catch(err => {
      console.log(err)
    })
};

export default function Budget(props) {

  const { token, setToken } = useToken();
  let data = props.data;
  return (
    <React.Fragment>
      <Title>{props.title}</Title>
      <Table size="medium">
        <TableHead>
          <TableRow>
            <TableCell>Budget Name</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Amount</TableCell>
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
              <TableCell>{row.type}</TableCell>
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