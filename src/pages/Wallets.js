import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import StarIcon from '@mui/icons-material/StarBorder';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';
import { Paper } from '@mui/material';



const cards = [

  {
    title: 'Credit Card1',
    wallettype: 'wallettype',
    amount: '1345',
    color: 'red'
  },{
    title: 'Credit Card1',
    wallettype: 'wallettype',
    amount: '1345',
    color: 'blue'
  },
];




export default function Wallets() {
  return (
<React.Fragment>
      <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
      <CssBaseline />

      <Container maxWidth="lg" component="main">
        <Grid container spacing={5} alignItems="stretch" justifyContent="center">
          {cards.map((cards) => (
            <Grid
              item
              key={cards.title}
              xs={12}
              sm={12}
              md={8}
              lg={6}
            >
              <Card >
                <CardHeader
                  title={cards.title}
                  subheader={cards.wallettype}
                  titleTypographyProps={{ align: 'center' }}
                  action={cards.title === 'Pro' ? <StarIcon /> : null}
                  subheaderTypographyProps={{
                    align: 'center',
                  }}
                />
                <CardContent>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'baseline',
                      mb: 2,
                    }}
                  >
                    <Typography component="h2" variant="h3" color="text.primary">
                      ${cards.amount}
                    </Typography>
                  </Box>
                </CardContent>
                <CardActions>
                  <Button fullWidth variant={'contained'}>
                    Payments
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

     
    </React.Fragment>
  );
}