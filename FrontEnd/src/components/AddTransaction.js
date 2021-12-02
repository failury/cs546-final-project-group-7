import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { Box } from '@mui/system';
import Autocomplete from '@mui/material/Autocomplete';
import useToken from '../components/useToken';
import axios from 'axios';
import moment from 'moment';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function AddTransaction() {
  const { token, setToken } = useToken();
  const [open, setOpen] = React.useState(false);
  const paymentType = ['income', 'expense'];
  const categories = ['groceries', 'insurances'];
  const [date, setDate] = React.useState(moment(new Date()).format("YYYY-MM-DD"));
  const [cate, setCate] = React.useState('');
  const [type, setType] = React.useState('');
  const [amount, setAmount] = React.useState(0);
  const [memo, setMemo] = React.useState('');
  const handleDateChange = (event) => {
    setDate(event.target.value);
  };
  const handleCateChange = (event) => {
    setCate(categories[event.target.value]);
  };
  const handleTypeChange = (event) => {
    setType(paymentType[event.target.value]);
  };
  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };
  const handleMemoChange = (event) => {
    setMemo(event.target.value);
  };
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleUpload = (event) => {
    event.preventDefault();
    let obj = {
      payment_Date: date,
      payment_Type:type,
      Amt:amount,
      memo:memo
    }
    console.log(obj);
      axios.post('http://localhost:2000/transaction/add', obj,{headers: {
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
      <Fab color="primary" onClick={handleClickOpen} aria-label="add" sx={{
        position: "fixed", margin: 0,
        top: "auto",
        right: 40,
        bottom: 40,
        left: "auto"
      }}>
        <AddIcon />
      </Fab>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Add a New Schedule Transaction"}</DialogTitle>
        <DialogContent>
          <Box sx={{ p: 2, border: '1px solid grey' }}>
            <Stack component="form" noValidate spacing={3}>
              <TextField
                id="date"
                label="Schedule Payment Date"
                type="date"
                value={date}
                onChange={handleDateChange}
                sx={{ width: 220 }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <Autocomplete
                disablePortal
                id="paymentType"
                options={paymentType}
                value={type}
                onChange={handleTypeChange}
                sx={{ width: 200 }}
                renderInput={(params) => <TextField {...params} label="Payment Type" />}
              />
              <Autocomplete
                disablePortal
                id="categories"
                options={categories}
                value={cate}
                onChange={handleCateChange}
                sx={{ width: 200 }}
                renderInput={(params) => <TextField {...params} label="Category" />}
              />
              <TextField
                id="number"
                label="Amount"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                value={amount}
                onChange={handleAmountChange}
                sx={{ width: 200 }}
              />
              <TextField
                id="outlined-multiline-flexible"
                label="Memo"
                multiline
                rows={4}
                value={memo}
                onChange={handleMemoChange}
              />
            </Stack>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleUpload}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
