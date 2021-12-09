import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import { MenuItem, Stack } from '@mui/material';
import { Box } from '@mui/system';
import { Grid, Typography, TextField } from '@mui/material';
import Popover from '@mui/material/Popover';
export default function BasicMenu({ data, changeData, resetData }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorEl1, setAnchorEl1] = React.useState(null);
  const open = Boolean(anchorEl);
  const subopen = Boolean(anchorEl1);
  const [column, setColumn] = React.useState('Columns');
  const [value, setValue] = React.useState('');
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handlesubClick = (event) => {
    setAnchorEl1(event.currentTarget);


  };
  const handlesubClose = (string) => {
    setAnchorEl1(null);
    if(typeof string  === 'string'){
      setColumn(string);
    }
    
  };
  const handleFilter = (event) => {
    event.preventDefault();
    
      var newArray = data.filter(function (el) {
        return el[column] == value
      });
    changeData(newArray);
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
        Filter
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
        <Box component="form" onSubmit={handleFilter} noValidate sx={{ mt: 1, p: 5 }}>
          <Stack direction="row"
            justifyContent="space-around"
            alignItems="center"
            spacing={2}>
            <><Button
              id="basic-button"
              onClick={handlesubClick}
              variant="outlined"
            >
              {column}
            </Button>
              <Menu
                anchorEl={anchorEl1}
                open={subopen}
                onClose={handlesubClose}
              >
                <MenuItem onClick={() => handlesubClose("payment_Date")}>Payment Date</MenuItem>
                <MenuItem onClick={() => handlesubClose("payment_Type")}>Payment Type</MenuItem>
                <MenuItem onClick={() => handlesubClose("category")}>Category</MenuItem>
                <MenuItem onClick={() => handlesubClose("wallet")}>Wallet</MenuItem>
              </Menu>
              </>
            <TextField
              margin="normal"
              required
              value={value}
              onChange={(event) => {
                setValue(event.target.value);
              }}
              name="value"
              label="value"
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
