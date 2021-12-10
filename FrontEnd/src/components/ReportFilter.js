import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import { MenuItem, Stack } from '@mui/material';
import { Box } from '@mui/system';
import { Grid, Typography, TextField } from '@mui/material';
import Popover from '@mui/material/Popover';
import Autocomplete from '@mui/material/Autocomplete';

export default function BasicMenu({ data, changeData, resetData }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorEl1, setAnchorEl1] = React.useState(null);
  const open = Boolean(anchorEl);
  const subopen = Boolean(anchorEl1);
  const [column, setColumn] = React.useState('Columns');
  const [value, setValue] = React.useState('');
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const [month, setMonth] = React.useState('');

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleFilter = (event) => {
    event.preventDefault();

    let month_int = ['01','02','03','04','05','06','07','08','09','10','11','12'];
    let index = months.indexOf(month);
    console.log(index);
      var newArray = data.filter(function (el) {
        console.log(el.payment_Date.slice(5,7));
        console.log(month_int[index]);
        
        return el.payment_Date.slice(5,7) == month_int[index];
      });
    changeData(newArray);
    console.log(newArray);
  };
  return (
    <div>
      <Button
        id="basic-button"
        aria-controls="basic-menu"
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        Monthly Report
      </Button>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Box component="form" onSubmit={handleFilter} noValidate sx={{ mt: 5, p: 10 }}>
          <Stack direction="row"
            justifyContent="space-around"
            alignItems="center"
            spacing={2}>
            <Autocomplete
                disablePortal
                id="category"
                options={months}
                onChange={(event, newValue) => {
                  setMonth(newValue);
                }}
                sx={{ width: 200 }}
                renderInput={(params) => <TextField {...params} label="Month" />}
              />

          </Stack>
          <Stack direction="row" justifyContent="space-around"
            alignItems="center"
            spacing={10} sx={{marginTop:'10%'}}>
              <Button
            type="submit"
            variant="contained"
          >
            Apply
          </Button>
          <Button
            onClick={resetData}
            color="success"
           
            variant="contained"
           
          >
            Reset
          </Button>
              </Stack>
          
          <Grid container>
            <Grid item>

            </Grid>
          </Grid>
        </Box>
      </Popover>
    </div>
  );
}