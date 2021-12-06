import * as React from 'react';
import Card from "elt-react-credit-cards";
import 'elt-react-credit-cards/es/styles-compiled.css';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';
import useToken from '../components/useToken';
import axios from 'axios'


async function updateWallet(credentials, token) {
  return fetch('http://localhost:2000/wallet', {
    method: 'PATCH',
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
  const [open, setOpen] = React.useState(false);
  const [error, setError] = React.useState("");
  const { token, setToken } = useToken();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const cardinfo = props.info;
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let walletname = data.get('walletname');
    let amount = data.get('amount');
    let type = data.get('type');
    let walletid = cardinfo._id;
    if( ! walletname|| !amount || !type){
      setError("Please enter all require information");
      return;
     }
    try {
      const res = await updateWallet({
        walletname,
        amount,
        type,
        walletid
      },token);
      setOpen(false);
      window.location.reload(false);
    } catch (error) {
      console.log(error);
      setError("update wallet error, try again with different name");
    }
  };
  const handleRemove = () => {
    let config = {
      headers:{
        'Content-Type': 'application/json',
      'token': token
      }, 
    };
  
    axios.post('http://localhost:2000/wallet/delete', {id:cardinfo._id},config).then(res => {
      console.log(res.data);
      window.location.reload(false);
    })
      .catch(err => {
        console.log(err)
      })
  };
  return (
    <>
      <Button onClick={handleClickOpen}><Card
        name={cardinfo.name}
        number="5555 4444 3333 1111"
        expiry="10/20"
        cvc="737"
      /></Button>
      <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Update wallet: {cardinfo.name}</DialogTitle>
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
            <Button
              onClick={handleRemove}
              fullWidth
              variant="contained"
              color="error"
              sx={{ mt: 3, mb: 2 }}
            >
              I would like to remove this wallet
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