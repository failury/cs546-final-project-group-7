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
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export default function CreditCard(props) {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const cardinfo = props.info;
  return (
    <>
      <Button onClick={handleClickOpen}><Card
        name={cardinfo.name}
        number={cardinfo.number}
        expiry={cardinfo.expiry}
        cvc={cardinfo.cvc}
      /></Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{cardinfo.walletname}'s amount: {cardinfo.amount}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the new information.
          </DialogContentText>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                required
                id="cardName"
                label="Name on card"
                fullWidth
                autoComplete="cc-name"
                variant="standard"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                required
                id="cardNumber"
                label="Card number"
                fullWidth
                autoComplete="cc-number"
                variant="standard"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                required
                id="expDate"
                label="Expiry date"
                fullWidth
                autoComplete="cc-exp"
                variant="standard"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                required
                id="cvv"
                label="CVV"
                helperText="Last three digits on signature strip"
                fullWidth
                autoComplete="cc-csc"
                variant="standard"
              />
            </Grid>
            <Grid item xs={12}>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained" color="error">
            I would like to remove this card
          </Button>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Save</Button>
        </DialogActions>
      </Dialog>

    </>

  );
}