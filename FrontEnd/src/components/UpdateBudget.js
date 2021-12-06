import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import useToken from './useToken';
import axios from 'axios';
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function UpdateBudget() {
  const [open, setOpen] = React.useState(false);
  const categories = ['Electronic Devices', 'Entertainment','Food','Daily Expense'];
  const types = ['Monthly', 'Yearly'];
  const { token, setToken } = useToken();
  const [budgetname, setName] = React.useState('');
  const [type, setType] = React.useState('');
  const [amount, setAmount] = React.useState(0);
  const [category, setCat] = React.useState('');
  const [wallet,setWallet] = React.useState('');
  const handleCatChange = (event) => {
    setCat(categories[event.target.value]);
  };
  const handleTypeChange = (event) => {
    setType(types[event.target.value]);
  };
  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };
  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handleWalletChange = (event) => {
    setWallet(event.target.value);
  }
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleUpdateBudget = (event) => {
    event.preventDefault();
    let obj = {
      budgetname:budgetname,
      category:category,
      amount:amount,
      wallet:wallet,
      type:type
    }
      axios.patch('http://localhost:2000/budget/update', obj,{headers: {
        'Content-Type': 'application/json',
        'token': token
      }}).then(res => {
        console.log(res);
        setOpen(false);
        window.location.reload(false);
      })
    .catch(err => {
      console.log(err)
    })
    
  }

  return (
    <div>
      {/* <Fab color="primary" onClick={handleClickOpen} aria-label="update" sx={{
        position: "fixed", margin: 0,
        top: "auto",
        right: 40,
        bottom: 40,
        left: "auto"
      }}>
        <AddIcon />
      </Fab> */}
      <button
        variant='contained'
        onClick={handleClickOpen}
      >
          Update
      </button>
      <Dialog
        open={open}
        // TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Update a Budget"}</DialogTitle>
        <DialogContent>
          <Box sx={{ p: 2, border: '1px solid grey' }}>
            <Stack component="form" noValidate spacing={3}>
              <TextField
                required
                id="budgetname"
                label="Budget Name"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="standard"
                onChange={handleNameChange}
                sx={{ width: 200 }}
              />
              <TextField
                required
                id="amount"
                label="Amount"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="standard"
                onChange={handleAmountChange}
                sx={{ width: 200 }}
              />
              <TextField
                required
                id="wallet"
                label="Wallet"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="standard"
                onChange={handleWalletChange}
                sx={{ width: 200 }}
              />
              <Autocomplete
                required
                disablePortal
                id="category"
                options={categories}
                onChange={handleCatChange}
                sx={{ width: 200 }}
                renderInput={(params) => <TextField {...params} label="Category" />}
              />
              <Autocomplete
                required
                disablePortal
                id="type"
                options={types}
                onChange={handleTypeChange}
                sx={{ width: 200 }}
                renderInput={(params) => <TextField {...params} label="Type" />}
              />
            </Stack>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleUpdateBudget}>Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}