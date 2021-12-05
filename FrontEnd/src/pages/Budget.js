import React from 'react';
import Budgets from '../components/Budgets';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import axios from 'axios';
import useToken from '../components/useToken';
import { useEffect, useState } from 'react';

async function addBudget(credentials) {
    return fetch('http://localhost:2000//Dashboard/Budget', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    }).catch(error => {
      throw(error);
  }).then(data => {
    if(!data.ok){
      return data.text().then(text => { throw new Error(text) })
    }else {
      return data.json();
    }   
  });
}

export default function Budget() {
    const [error,seterror] = useState('');
    const { token, setToken } = useToken();
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        let budgetname = data.get('budgetname');
        console.log(budgetname);
        let category = data.get('category');
        let amount = data.get('amount');
        let type = data.get('type');
        
        try {
          const token = await addBudget({
                budgetname,
                category,
                amount,
                type
            });
          if(token!=null){
            setToken(token);
          }
        } catch (error) {
          seterror(error.message.replace(/['"]+/g, ''));
        }
    }

    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                        <Grid container spacing={3}>
                            {/* Budgets */}
                            <Grid item xs={12} md={8} lg={9}>
                                <Paper
                                    sx={{
                                        p: 2,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        height: 500,
                                    }}
                                >
                                    <Budgets />
                                </Paper>
                            </Grid>
                        </Grid>
                    </Container>
                </Box>
        </>
    )
}