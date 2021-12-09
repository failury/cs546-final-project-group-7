import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import axios from 'axios'
import GlobalStyles from '@mui/material/GlobalStyles';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import {useState, useEffect} from 'react';
import useToken from '../components/useToken';
import Avatar from '@mui/material/Avatar';
import { pink } from '@mui/material/colors';

export default function Home() {
    const { token } = useToken();
    const [user, setuser] = useState([]);
    const [len,setLen] = useState(0);
    const fetchData = async function () {
      try {
          const res = await axios.get('http://localhost:2000/user', {headers: {
          'Content-Type': 'application/json',
          'token': token
        }});
        setuser(res.data);
        setLen(res.data.imgurl.length);
      } catch (error) {
        console.log(error.message)
        sessionStorage.removeItem('token');
        window.location.href='/login';
      } 
  };
    useEffect(() => {
        fetchData();
},[]);

    return (
        <>
      <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
      <CssBaseline />
      <Container maxWidth="lg" component="main"
        // sx={{
        //   backgroundColor: (theme) =>
        //     theme.palette.mode === 'light'
        //       ? theme.palette.grey[100]
        //       : theme.palette.grey[900],
        //   flexGrow: 1,
        //   height: '100vh',
        //   overflow: 'auto',
        // }}
        >
         <Container maxWidth="sm"  >
           <Stack  alignItems="center"
  justifyContent="center" spacing={8}>
           <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Welcome Back
            </Typography>
            <Typography variant="h4" align="center" color="text.secondary" paragraph>
            {user.firstName} {user.lastName}
            </Typography>
            {len>3 ?<Avatar alt={user.firstName+ " " + user.lastName} src={user.imgurl}sx={{bgcolor: pink[900],width:256,height:256, borderStyle: 'solid'}} /> : 
            <Avatar sx={{ bgcolor: pink[900],width:256,height:256,borderStyle: 'solid'}}>{user.firstName+ " " + user.lastName}</Avatar>}
           </Stack> 
           
          </Container>
      </Container>


        </>
    )
}
