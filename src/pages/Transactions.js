import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Transaction from '../components/Transacation';
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import Divider from '@mui/material/Divider';
import { Stack } from '@mui/material';
export default function Transactions() {
    return (
        <div>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'light'
                                ? theme.palette.grey[100]
                                : theme.palette.grey[900],
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',
                    }}
                >
                    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                        <Fab color="primary" aria-label="add" sx={{
                            position: "fixed", margin: 0,
                            top: "auto",
                            right: 40,
                            bottom: 40,
                            left: "auto"
                        }}>
                            <AddIcon />
                        </Fab>
                        <Stack direction="column" spacing={5} divider={<Divider flexItem />}>
                            <Grid item xs={12} sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                                <Grid item xs={12}>
                                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                                        <Transaction title="Recent Transaction" />
                                    </Paper>
                                </Grid>
                                <Grid item xs={2}>
                                </Grid>
                                <Grid item xs={12}>
                                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                                        <Transaction title="Schedule Transaction" />

                                    </Paper>
                                </Grid>

                            </Grid>
                        </Stack>
                    </Container>

                </Box>

            </Box>
        </div>
    )
}
