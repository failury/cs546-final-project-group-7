import * as React from 'react';
import Button from '@mui/material/Button';
import useToken from '../components/useToken';
import { useEffect, useState } from 'react';
import axios from 'axios'
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Box } from '@mui/system';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Grid from '@mui/material/Grid';

async function updateBudget(credentials,token) {
  return fetch('http://localhost:2000/budget/update', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'token': token
    },
    body: JSON.stringify(credentials)
  }).catch(error => {
    console.log(error);
    throw(error);
}).then(data => {
  if(!data.ok){
    return data.text().then(text => { throw new Error(text) })
  }else {
    return data.text();
  }   
})
};

export default function Budget(props) {
  const [open, setOpen] = React.useState(false);
  const [error, setError] = React.useState("");
  const { token, setToken } = useToken();
  const [type, setType] = React.useState('');
  const [category, setCat] = React.useState('');
  const [amount, setAmount] = React.useState();
  const [budgetname, setName] = React.useState('');
  const [wallet,setWallet] = React.useState('');

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };
  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handleWalletChange = (event) => {
    setWallet(event.target.value);
  }

  const handleCatChange = (event) => {
    setCat(event.target.value);
  };
  const handleTypeChange = (event) => {
    setType(event.target.value);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const budgetinfo = props.info;
  const handleSubmit = async (event) => {
    event.preventDefault();
    let budgetid = budgetinfo._id;
    let updateinfo = {
      budgetname:budgetname,
      category:category,
      amount:amount,
      wallet:wallet,
      type:type
    };
    try {
      const res = await updateBudget({
        budgetid,
        updateinfo
      } 
      ,token);
      setOpen(false);
      window.location.reload(false);
    } catch (error) {
      setError("update wallet error, try again with different name");
    }
  }

  return (
    <>
      <Button onClick={handleClickOpen}>Update</Button>
      <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Update budget</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the new information.
          </DialogContentText>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              onChange={handleNameChange}
              id="budgetname"
              label="Budget Name"
              name="budgetname"
              variant="standard"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="amount"
              label="Amount"
              type="number"
              onChange={handleAmountChange}
              variant="standard"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="wallet"
              label="Wallet"
              variant="standard"
              onChange={handleWalletChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              onChange={handleCatChange}
              id="category"
              label="Category"
              name="category"
              autoFocus
              variant="standard"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              onChange={handleTypeChange}
              id="type"
              label="Type"
              name="type"
              autoFocus
              variant="standard"
            />
            <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Save
            </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
              <Button
              onClick={handleClose}
              variant="outlined"
              fullWidth
              sx={{ mt: 3, mb: 2 }}
            >
              Cancel
            </Button>
              </Grid>
            </Grid>
            <Grid item xs={12}>
            <Typography variant="body1" component="div" gutterBottom color="error">
               {error}
              </Typography>
              </Grid>
          </Box>
 
        </DialogContent>
        <DialogActions>

        </DialogActions>
      </Dialog>

    </>

  );

//   return (
    // <React.Fragment>
    //   <Title>{props.title}</Title>
    //   <Table size="medium">
    //     <TableHead>
    //       <TableRow>
    //         <TableCell>Budget Name</TableCell>
    //         <TableCell>Category</TableCell>
    //         <TableCell>Amount</TableCell>
    //         <TableCell>Wallet</TableCell>
    //         <TableCell>Type</TableCell>
    //         <TableCell align="right">Actions</TableCell>
    //       </TableRow>
    //     </TableHead>
    //     <TableBody>
    //     { data.length == 0 && <Typography
    //           component="h1"
    //           variant="h5"
    //           align="center"
    //           color="text.secondary"
    //           gutterBottom
    //         >
    //           You don't have any budget yet
    //         </Typography>}
        
    //       {data.map((row, i) => (
    //         <TableRow key={i}>
    //           <TableCell >{row.budgetname}</TableCell>
    //           <TableCell>{row.category}</TableCell>
    //           <TableCell>{row.amount}</TableCell>
    //           <TableCell>{row.wallet}</TableCell>
    //           <TableCell>{row.type}</TableCell>
    //           <TableCell>
    //             <UpdateBudget/>
    //           </TableCell>
    //           <TableCell align="right">
    //             <Button
    //               variant="contained"
    //               onClick={() => Delete(token, row)}
    //               color="error"
    //             >
    //               Delete
    //             </Button>
    //           </TableCell>
    //         </TableRow>
    //       ))}
    //     </TableBody>
    //   </Table>
    // </React.Fragment>
//   );
}