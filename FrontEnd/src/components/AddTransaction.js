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


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
export default function AddTransaction() {
    const [open, setOpen] = React.useState(false);
    const paymentType = ['income', 'expense'];
    const [value, setValue] = React.useState('');
    const handleChange = (event) => {
        setValue(event.target.value);
      };
const categories = ['groceries', 'insurances'];
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
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
        sx={{ width: 220 }}
        InputLabelProps={{
          shrink: true,
        }}
      />
       <Autocomplete
      disablePortal
      id="paymentType"
      options={paymentType}
      sx={{ width: 200 }}
      renderInput={(params) => <TextField {...params} label="Payment Type" />}
    />
    <Autocomplete
      disablePortal
      id="categories"
      options={categories}
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
          sx={{ width: 200 }}
          />
    <TextField
          id="outlined-multiline-flexible"
          label="Memo"
          multiline
          rows={4}
          value={value}
          onChange={handleChange}
        />
    </Stack>
      </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Disagree</Button>
                    <Button onClick={handleClose}>Agree</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
