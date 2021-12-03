import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';

import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';
import CreditCard from '../components/Card';
import AddCard from '../components/AddCard'

const cards = [

  {
    walletname:"wallet1",
    amount:'1289',
    name: 'Fake Name',
    number: '1111 2222 3333 4444',
    expiry: '09/24',
    cvc: '345'
  },
  {
    walletname:"wallet1",
    amount:'1289',
    name: 'Fake Name',
    number: '1111 2222 3333 4444',
    expiry: '09/24',
    cvc: '345'
  },
];




export default function Wallets() {
  return (
    <React.Fragment>
      <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
      <CssBaseline />

      <Container maxWidth="lg" component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
        }}>
        <Grid container spacing={3} alignItems="stretch" justifyContent="center">
          <AddCard/>
          {cards.map((cards) => (
            <Grid
              item
              key={cards.name}
              xs={12}
              sm={12}
              md={8}
              lg={6}
              margin={2}
            >
                <CreditCard info={cards} />
            </Grid>
          ))}
        </Grid>
      </Container>


    </React.Fragment>
  );
}