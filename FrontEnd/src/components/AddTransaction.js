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
import { Grid,Typography } from '@mui/material';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function AddTransaction() {
  const { token, setToken } = useToken();
  const [open, setOpen] = React.useState(false);
  const paymentType = ['income', 'expense'];
  const categories = ['Food and Beverage', 'Groceries','Entertainment','Electronic Devices','Debt','Loan','Others','Salary','Insurance','Business','Bills'];
  const [date, setDate] = React.useState(moment(new Date()).format("YYYY-MM-DD"));
  const [cate, setCate] = React.useState(categories[0]);
  const [type, setType] = React.useState(paymentType[0]);
  const [wallet,setWallet] = React.useState('');
  const [amount, setAmount] = React.useState(0);
  const [memo, setMemo] = React.useState('');
  const [walletdata, setWalletdata] = React.useState([]);
  const [error,seterror] = React.useState('');
  const handleDateChange = (event) => {
    setDate(event.target.value);
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
      category:cate,
      wallet:wallet,
      Amt:amount,
      memo:memo
    }
      axios.post('http://localhost:2000/transaction/add', obj,{headers: {
        'Content-Type': 'application/json',
        'token': token
      }}).then(res => {
        setOpen(false);
        window.location.reload(false);
      })
    .catch(err => {
      seterror("Failed to create Transaction, plase check all the fields");
    })
    
  };
  const fetchWallet = async () =>{
    try {
        const res = await axios.get('http://localhost:2000/wallet', {headers: {
        'Content-Type': 'application/json',
        'token': token
      }});
      let obj = [];
      res.data.forEach(element => {
        obj.push(element.name);
      });
      setWalletdata(obj);
    } catch (error) {
      console.log(error);
      sessionStorage.removeItem('token');
      window.location.href='/login';
    } 
};
React.useEffect(() => {
  fetchWallet();
},[]);
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
                sx={{ width: 200 }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <Autocomplete
                disablePortal
                id="paymentType"
                options={paymentType}
                value={type}
                onChange={(event, newValue) => {
                  setType(newValue);
                }}
                sx={{ width: 200 }}
                renderInput={(params) => <TextField {...params} label="Payment Type" />}
              />
              <Autocomplete
                disablePortal
                id="categories"
                options={categories}
                value={cate}
                onChange={(event, newValue) => {
                  setCate(newValue);
                }}
                sx={{ width: 200 }}
                renderInput={(params) => <TextField {...params} label="Category" />}
              />
              <Autocomplete
                disablePortal
                id="wallet"
                options={walletdata}
                value={wallet}
                onChange={(event, newValue) => {
                  setWallet(newValue);
                }}
                sx={{ width: 200 }}
                renderInput={(params) => <TextField {...params} label="Wallet" />}
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
            <Grid item xs={12}>
            <Typography variant="body1" component="div" gutterBottom color="error">
               {error}
              </Typography>
              </Grid>
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
