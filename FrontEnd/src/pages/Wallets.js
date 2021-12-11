import * as React from 'react';
import useToken from '../components/useToken';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';
import CreditCard from '../components/Card';
import AddCard from '../components/AddCard'
import axios from 'axios';
import { Stack, Typography,Paper,Divider  } from '@mui/material';

export default function Wallets() {
  const { token } = useToken();
  const [data, setdata] = React.useState([]);
  const [len,setLen] = React.useState(0);
  const fetchData = async () =>{
    try {
        const res = await axios.get('http://localhost:2000/wallet', {headers: {
        'Content-Type': 'application/json',
        'token': token
      }});
      setdata(res.data);
      setLen(res.data.length);
    } catch (error) {
      console.log(error)
      sessionStorage.removeItem('token');
      window.location.href='/login';
    } 
};
  React.useEffect(() => {
      fetchData();
// eslint-disable-next-line react-hooks/exhaustive-deps
},[]);
  return (
    <React.Fragment>
      <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
      <CssBaseline />

      <Container maxWidth="lg" component="main"
        >
        <Grid container spacing={3} alignItems="stretch" justifyContent="center">
          <AddCard/>
          {data.map((w) => (
            <Grid
              item
              key={w.name}
              xs={12}
              sm={12}
              md={8}
              lg={6}
              margin={2}
            >
              <Paper elevation={3}>
              <Stack direction="row" spacing={2}>
                <CreditCard info={w} />
                <Stack  sx={{paddingTop : '6%'}}  divider={<Divider  flexItem />}>
                <Typography component="p"
              variant="h5"
              align="left"
              color="text.secondary"
              gutterBottom>Name: {w.name}</Typography>
              <Typography component="p"
              variant="h5"
              align="left"
              color="text.secondary"
              gutterBottom>Type: {w.type}</Typography>
              <Typography component="p"
              variant="h5"
              align="left"
              color="text.secondary"
              gutterBottom>Amount: {w.amount}$</Typography>
                </Stack>
               
              
              </Stack>
                </Paper>
            </Grid>
          ))}
          
        </Grid>
        { len === 0 && <Typography
              component="h1"
              variant="h3"
              align="center"
              color="text.secondary"
              gutterBottom
            >
              You dont have any Wallet yet
            </Typography>}
      </Container>


    </React.Fragment>
  );
}