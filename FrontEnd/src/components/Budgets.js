// import * as React from 'react';
// import ListSubheader from '@mui/material/ListSubheader';
// import List from '@mui/material/List';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import Collapse from '@mui/material/Collapse';
// import InboxIcon from '@mui/icons-material/MoveToInbox';
// import ExpandLess from '@mui/icons-material/ExpandLess';
// import ExpandMore from '@mui/icons-material/ExpandMore';
// import StarBorder from '@mui/icons-material/StarBorder';

// export default function Budgets() {
//   const [open, setOpen] = React.useState(true);

//   const handleClick = () => {
//     setOpen(!open);
//   };

//   return (
//     <List
//       sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
//       component="nav"
//       aria-labelledby="nested-list-subheader"
//       subheader={
//         <ListSubheader component="div" id="nested-list-subheader">
//           Budgets
//         </ListSubheader>
//       }
//     >
//       <ListItemButton onClick={handleClick}>
//         <ListItemIcon>
//           <InboxIcon />
//         </ListItemIcon>
//         <ListItemText primary="Electronic Devices" />
//         {open ? <ExpandLess /> : <ExpandMore />}
//       </ListItemButton>
//       <Collapse in={open} timeout="auto" unmountOnExit>
//         <List component="div" disablePadding>
//           <ListItemButton sx={{ pl: 4 }}>
//             <ListItemIcon>
//               <StarBorder />
//             </ListItemIcon>
//             <ListItemText primary="iPhone" />
//             <ListItemText primary="Camera" />
//             <ListItemText primary="Computer" />
//           </ListItemButton>
//         </List>
//       </Collapse>

//       <ListItemButton onClick={handleClick}>
//         <ListItemIcon>
//           <InboxIcon />
//         </ListItemIcon>
//         <ListItemText primary="Food" />
//         {open ? <ExpandLess /> : <ExpandMore />}
//       </ListItemButton>
//       <Collapse in={open} timeout="auto" unmountOnExit>
//         <List component="div" disablePadding>
//           <ListItemButton sx={{ pl: 4 }}>
//             <ListItemIcon>
//               <StarBorder />
//             </ListItemIcon>
//             <ListItemText primary="Fruits" />
//             <ListItemText primary="Vegetables" />
//             <ListItemText primary="Meat" />
//           </ListItemButton>
//         </List>
//       </Collapse>

//       <ListItemButton onClick={handleClick}>
//         <ListItemIcon>
//           <InboxIcon />
//         </ListItemIcon>
//         <ListItemText primary="Entertainment" />
//         {open ? <ExpandLess /> : <ExpandMore />}
//       </ListItemButton>
//       <Collapse in={open} timeout="auto" unmountOnExit>
//         <List component="div" disablePadding>
//           <ListItemButton sx={{ pl: 4 }}>
//             <ListItemIcon>
//               <StarBorder />
//             </ListItemIcon>
//             <ListItemText primary="Movies" />
//             <ListItemText primary="Hiking" />
//             <ListItemText primary="Disney" />
//           </ListItemButton>
//         </List>
//       </Collapse>

//       <ListItemButton onClick={handleClick}>
//         <ListItemIcon>
//           <InboxIcon />
//         </ListItemIcon>
//         <ListItemText primary="Daliy expense" />
//         {open ? <ExpandLess /> : <ExpandMore />}
//       </ListItemButton>
//       <Collapse in={open} timeout="auto" unmountOnExit>
//         <List component="div" disablePadding>
//           <ListItemButton sx={{ pl: 4 }}>
//             <ListItemIcon>
//               <StarBorder />
//             </ListItemIcon>
//             <ListItemText primary="Insurence" />
//             <ListItemText primary="Rent" />
//             <ListItemText primary="Network" />
//           </ListItemButton>
//         </List>
//       </Collapse>
//     </List>
//   );
// }

// import * as React from 'react';
// import Button from '@mui/material/Button';
// import ButtonGroup from '@mui/material/ButtonGroup';
// import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
// import ClickAwayListener from '@mui/material/ClickAwayListener';
// import Grow from '@mui/material/Grow';
// import Paper from '@mui/material/Paper';
// import Popper from '@mui/material/Popper';
// import MenuItem from '@mui/material/MenuItem';
// import MenuList from '@mui/material/MenuList';

// const options = ['Caregory','Electronic Devices', 'Entertainment', 'Food', 'Daily Expense'];

// export default function Budgets() {
//   const [open, setOpen] = React.useState(false);
//   const anchorRef = React.useRef(null);
//   const [selectedIndex, setSelectedIndex] = React.useState(0);

//   const handleClick = () => {
//     console.info(`You clicked ${options[selectedIndex]}`);
//   };

//   const handleMenuItemClick = (event, index) => {
//     setSelectedIndex(index);
//     setOpen(false);
//   };

//   const handleToggle = () => {
//     setOpen((prevOpen) => !prevOpen);
//   };

//   const handleClose = (event) => {
//     if (anchorRef.current && anchorRef.current.contains(event.target)) {
//       return;
//     }

//     setOpen(false);
//   };

//   return (
//     <React.Fragment>
//       <ButtonGroup variant="contained" ref={anchorRef} aria-label="split button">
//         <Button onClick={handleClick}>{options[selectedIndex]}</Button>
//         <Button
//           size="small"
//           aria-controls={open ? 'split-button-menu' : undefined}
//           aria-expanded={open ? 'true' : undefined}
//           aria-label="select merge strategy"
//           aria-haspopup="menu"
//           onClick={handleToggle}
//         >
//           <ArrowDropDownIcon />
//         </Button>
//       </ButtonGroup>
//       <Popper
//         open={open}
//         anchorEl={anchorRef.current}
//         role={undefined}
//         transition
//         disablePortal
//       >
//         {({ TransitionProps, placement }) => (
//           <Grow
//             {...TransitionProps}
//             style={{
//               transformOrigin:
//                 placement === 'bottom' ? 'center top' : 'center bottom',
//             }}
//           >
//             <Paper>
//               <ClickAwayListener onClickAway={handleClose}>
//                 <MenuList id="split-button-menu">
//                   {options.map((option, index) => (
//                     <MenuItem
//                       key={option}
//                       disabled={index === 0}
//                       selected={index === selectedIndex}
//                       onClick={(event) => handleMenuItemClick(event, index)}
//                     >
//                       {option}
//                     </MenuItem>
//                   ))}
//                 </MenuList>
//               </ClickAwayListener>
//             </Paper>
//           </Grow>
//         )}
//       </Popper>
//     </React.Fragment>
//   );
// }

import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function SelectOtherProps() {
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 120 }} > 
        <InputLabel id="demo-simple-select-disabled-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-disabled-label"
          id="demo-simple-select-disabled"
          value={age}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Electronic Devices</MenuItem>
          <MenuItem value={20}>Entertainment</MenuItem>
          <MenuItem value={30}>Food</MenuItem>
          <MenuItem value={30}>Daily Expense</MenuItem>
        </Select>
        <FormHelperText>Required</FormHelperText>
      </FormControl>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-readonly-label">Payment</InputLabel>
        <Select
          labelId="demo-simple-select-readonly-label"
          id="demo-simple-select-readonly"
          value={age}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Card1</MenuItem>
          <MenuItem value={20}>Card2</MenuItem>
          <MenuItem value={30}>Card3</MenuItem>
        </Select>
        <FormHelperText>Required</FormHelperText>
      </FormControl>
      <div>
        <p>Discription</p>
        <input placeholder="discription"></input>
    </div>
      <div>
        <p>Amount</p>
        <input placeholder="amount"></input>
      </div>
     <div>
     <Stack spacing={2} direction="row">
       <Button variant="contained">Confirm</Button>
       <Button variant="outlined">Cancel</Button>
     </Stack>
    </div>
    </div>
  );
}