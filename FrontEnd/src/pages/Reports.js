import React from 'react';
import IncomeReports from '../components/IncomeReports';
import ExpenseReports from '../components/ExpenseReports';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Skeleton from '@mui/material/Skeleton';
import { Bar } from 'react-chartjs-2';
import { Button, Card, CardContent, CardHeader, Divider } from '@mui/material';
import { useTheme } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import Chart from 'chart.js/auto';

export default function ReportPage() {
    //     const theme = useTheme();
      
    //     const data = {
    //       datasets: [
    //         {
    //           backgroundColor: '#3F51B5',
    //           barPercentage: 0.5,
    //           barThickness: 12,
    //           borderRadius: 4,
    //           categoryPercentage: 0.5,
    //           data: [18, 5, 19, 27, 29, 19, 20],
    //           label: 'This year',
    //           maxBarThickness: 10
    //         },
    //         {
    //           backgroundColor: '#EEEEEE',
    //           barPercentage: 0.5,
    //           barThickness: 12,
    //           borderRadius: 4,
    //           categoryPercentage: 0.5,
    //           data: [11, 20, 12, 29, 30, 25, 13],
    //           label: 'Last year',
    //           maxBarThickness: 10
    //         }
    //       ],
    //       labels: ['1 Aug', '2 Aug', '3 Aug', '4 Aug', '5 Aug', '6 Aug', '7 aug']
    //     };
      
    //     const options = {
    //       animation: false,
    //       cornerRadius: 20,
    //       layout: { padding: 0 },
    //       legend: { display: false },
    //       maintainAspectRatio: false,
    //       responsive: true,
    //       xAxes: [
    //         {
    //           ticks: {
    //             fontColor: theme.palette.text.secondary
    //           },
    //           gridLines: {
    //             display: false,
    //             drawBorder: false
    //           }
    //         }
    //       ],
    //       yAxes: [
    //         {
    //           ticks: {
    //             fontColor: theme.palette.text.secondary,
    //             beginAtZero: true,
    //             min: 0
    //           },
    //           gridLines: {
    //             borderDash: [2],
    //             borderDashOffset: [2],
    //             color: theme.palette.divider,
    //             drawBorder: false,
    //             zeroLineBorderDash: [2],
    //             zeroLineBorderDashOffset: [2],
    //             zeroLineColor: theme.palette.divider
    //           }
    //         }
    //       ],
    //       tooltips: {
    //         backgroundColor: theme.palette.background.paper,
    //         bodyFontColor: theme.palette.text.secondary,
    //         borderColor: theme.palette.divider,
    //         borderWidth: 1,
    //         enabled: true,
    //         footerFontColor: theme.palette.text.secondary,
    //         intersect: false,
    //         mode: 'index',
    //         titleFontColor: theme.palette.text.primary
    //       }
    //     };

    // return (
    //     <Card {...props}>
    //       <CardHeader
    //         action={(
    //           <Button
    //             endIcon={<ArrowDropDownIcon fontSize="small" />}
    //             size="small"
    //           >
    //             Last 7 days
    //           </Button>
    //         )}
    //         title="Latest Sales"
    //       />
    //       <Divider />
    //       <CardContent>
    //         <Box
    //           sx={{
    //             height: 400,
    //             position: 'relative'
    //           }}
    //         >
    //           <Bar
    //             data={data}
    //             options={options}
    //           />
    //         </Box>
    //       </CardContent>
    //       <Divider />
    //       <Box
    //         sx={{
    //           display: 'flex',
    //           justifyContent: 'flex-end',
    //           p: 2
    //         }}
    //       >
    //         <Button
    //           color="primary"
    //           endIcon={<ArrowRightIcon fontSize="small" />}
    //           size="small"
    //         >
    //           Overview
    //         </Button>
    //       </Box>
    //     </Card>
    //   );

    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'light'
                                ? theme.palette.grey[300]
                                : theme.palette.grey[900],
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',
                    }}
                >
                    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                        <Grid container spacing={6}>
                            {/* Reports */}
                            <Grid item xs={12} md={8} lg={9}>
                                <Paper
                                    sx={{
                                        p: 2,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        width:700,
                                        height: 400,
                                    }}
                                >
                                    <IncomeReports/>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Container>
                    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                        <Grid container spacing={6}>
                            {/* Reports */}
                            <Grid item xs={12} md={8} lg={9}>
                                <Paper
                                    sx={{
                                        p: 2,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        width:700,
                                        height: 400,
                                    }}
                                >
                                    <ExpenseReports/>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Container>
                </Box>
            </Box>
        </>
    )
}
