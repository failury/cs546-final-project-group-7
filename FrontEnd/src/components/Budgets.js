import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import useToken from '../components/useToken';
import axios from 'axios';

export default function Budget() {

  const { token, setToken } = useToken();
  const [budgetname, setName] = React.useState('');
  const [type, setType] = React.useState('');
  const [amount, setAmount] = React.useState(0);
  const [category, setCat] = React.useState('');
  const handleCatChange = (event) => {
    setCat(event.target.value);
  };
  const handleTypeChange = (event) => {
    setType(event.target.value);
  };
  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };
  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handleAddBudget = (event) => {
    event.preventDefault();
    let obj = {
      budgetname:budgetname,
      category:category,
      amount:amount,
      type:type
    }
      axios.post('http://localhost:2000/budget/add', obj,{headers: {
        'Content-Type': 'application/json',
        'token': token
      }}).then(res => {
        console.log(res);
        //setOpen(false);
        window.location.reload(false);
      })
    .catch(err => {
      console.log(err)
    })
    
  }

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <Box component="form">
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="budgetname"
            label="Budget Name"
            fullWidth
            autoComplete="cc-name"
            variant="standard"
            onChange={handleNameChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="category"
            label="Category"
            fullWidth
            autoComplete="cc-category"
            variant="standard"
            onChange={handleCatChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="amount"
            label="Amount"
            fullWidth
            autoComplete="cc-amount"
            variant="standard"
            onChange={handleAmountChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="type"
            label="Type"
            fullWidth
            autoComplete="cc-type"
            variant="standard"
            onChange={handleTypeChange}
          />
        </Grid>
        <Button
            type="submit"
            variant="contained"
            onClick={handleAddBudget}
            sx={{ mt: 3, mb: 2 }}
        >
            Submit
        </Button>
        <Button 
            type="cancel"
            sx={{ mt: 3, ml: 2 }}
        >
            Cancel
        </Button>
        </Grid>
      </Box>
    </React.Fragment>
  );
}