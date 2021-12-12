import * as React from 'react';
import Card from "elt-react-credit-cards";
import 'elt-react-credit-cards/es/styles-compiled.css';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import { Stack } from '@mui/material';
import useToken from '../components/useToken';
import Typography from '@mui/material/Typography';
async function addWallet(credentials, token) {
  return fetch('http://localhost:2000/wallet', {
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
    return data.text();
  }   
})

 }


export default function CreditCard(props) {
  const [error,seterror] = React.useState('');
  const { token, setToken } = useToken();
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let walletname = data.get('walletname');
    let amount = data.get('amount');
    let type = data.get('type');
    if( ! walletname|| !amount || !type){
      seterror("Please enter all require information");
      return;
    }
    if(amount === '0' || amount ==='00' || amount === '0.0'){
      seterror("Wallet Amount cannot be zero");
      return;
    }


    // if(!walletname.trim().match(/^[0-9a-z]+$/)){
    //   seterror("Incorrect wallet name");
    //   return;
    // }
    try {
      const res = await addWallet({
        walletname,
        amount,
        type
      },token);
      
      setOpen(false);
      window.location.reload(false);
    } catch (error) {
      seterror(error.message.replace(/['"]+/g, ''));
    }
  };
  return (
    <>
      <Fab color="primary" onClick={handleClickOpen} aria-label="add" sx={{
        position: "fixed", margin: 0,
        top: "auto",
        right: 40,
        bottom: 40,
        left: "auto"
      }}>
        <AddIcon />
      </Fab>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add a new Wallet</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the new information.
          </DialogContentText>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="walletname"
              label="Name of The Wallet"
              name="walletname"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              type="number"
              name="amount"
              label="Amount of The Wallet"
              id="amount"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="type"
              label="Wallet Type"
              id="type"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Save
            </Button>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="error"
              sx={{ mt: 3, mb: 2 }}
            >
              Cancel
            </Button>
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