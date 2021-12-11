import * as React from 'react';
import Button from '@mui/material/Button';
import useToken from '../components/useToken';
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
  const { token } = useToken();
  const categories = ['Food and Beverage', 'Groceries','Entertainment','Electronic Devices','Others'];
  const types = ['Monthly', 'Yearly'];
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
      var res = await updateBudget({
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
            <Autocomplete
              disablePortal
              id="category"
              options={categories}
              onChange={(event, newValue) => {
                setCat(newValue);
              }}
              sx={{ width: 200 }}
              renderInput={(params) => <TextField {...params} label="Category" />}
            />
            <Autocomplete
              disablePortal
              id="type"
              options={types}
              onChange={(event, newValue) => {
                setType(newValue);
              }}
              sx={{ width: 200 }}
              renderInput={(params) => <TextField {...params} label="Type" />}
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
}