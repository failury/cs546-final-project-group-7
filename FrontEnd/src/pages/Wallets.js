import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import useToken from '../components/useToken';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';
import CreditCard from '../components/Card';
import AddCard from '../components/AddCard'
import axios from 'axios';

export default function Wallets() {
  const { token, setToken } = useToken();
  const [data, setdata] = React.useState([]);
  const fetchData = async () =>{
    try {
        const res = await axios.get('http://localhost:2000/wallet', {headers: {
        'Content-Type': 'application/json',
        'token': token
      }});
      console.log(res.data);
      setdata(res.data);
    } catch (error) {
      console.log(error)
      // sessionStorage.removeItem('token');
      // window.location.href='/login';
    } 
};
  React.useEffect(() => {
      fetchData();
},[]);
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
                <CreditCard info={w} />
            </Grid>
          ))}
        </Grid>
      </Container>


    </React.Fragment>
  );
}