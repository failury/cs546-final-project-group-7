import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Card, CardContent, Grid, MenuItem, TextField } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import { useTheme } from '@mui/material/styles';
import { useState, useEffect } from 'react';

// export default function Reports() {

  // const TotalGrowthBarChart = ({ isLoading }) => {
  //   const [value, setValue] = useState('today');
  //   const theme = useTheme();
  //   //const customization = useSelector((state) => state.customization);

  //   //const { navType } = customization;
  //   const { primary } = theme.palette.text;
  //   const darkLight = theme.palette.dark.light;
  //   const grey200 = theme.palette.grey[200];
  //   const grey500 = theme.palette.grey[500];

  //   const primary200 = theme.palette.primary[200];
  //   const primaryDark = theme.palette.primary.dark;
  //   const secondaryMain = theme.palette.secondary.main;
  //   const secondaryLight = theme.palette.secondary.light;

  //   useEffect(() => {
  //       const newChartData = {
  //           // ...chartData.options,
  //           colors: [primary200, primaryDark, secondaryMain, secondaryLight],
  //           xaxis: {
  //               labels: {
  //                   style: {
  //                       colors: [primary, primary, primary, primary, primary, primary, primary, primary, primary, primary, primary, primary]
  //                   }
  //               }
  //           },
  //           yaxis: {
  //               labels: {
  //                   style: {
  //                       colors: [primary]
  //                   }
  //               }
  //           },
  //           grid: {
  //               borderColor: grey200
  //           },
  //           tooltip: {
  //               theme: 'light'
  //           },
  //           legend: {
  //               labels: {
  //                   colors: grey500
  //               }
  //           }
  //       };

    // }, [primary200, primaryDark, secondaryMain, secondaryLight, primary, darkLight, grey200, isLoading, grey500]);

//   return (
//     <>
//         {isLoading ? (
//             <Card>
//             <CardContent>
//                 <Grid container>
//                     <Grid item xs={12}>
//                         <Grid container alignItems="center" justifyContent="space-between">
//                             <Grid item xs zeroMinWidth>
//                                 <Grid container spacing={1}>
//                                     <Grid item xs={12}>
//                                         <Skeleton variant="text" />
//                                     </Grid>
//                                     <Grid item xs={12}>
//                                         <Skeleton variant="rectangular" height={20} />
//                                     </Grid>
//                                 </Grid>
//                             </Grid>
//                             <Grid item>
//                                 <Skeleton variant="rectangular" height={50} width={80} />
//                             </Grid>
//                         </Grid>
//                     </Grid>
//                     <Grid item xs={12}>
//                         <Skeleton variant="rectangular" height={530} />
//                     </Grid>
//                 </Grid>
//             </CardContent>
//         </Card>
//         ) : (
//             // <MainCard> spacing={gridSpacing}
//                 <Grid container >
//                     <Grid item xs={12}>
//                         <Grid container alignItems="center" justifyContent="space-between">
//                             <Grid item>
//                                 <Grid container direction="column" spacing={1}>
//                                     <Grid item>
//                                         <Typography variant="subtitle2">Total Growth</Typography>
//                                     </Grid>
//                                     <Grid item>
//                                         <Typography variant="h3">$2,324.00</Typography>
//                                     </Grid>
//                                 </Grid>
//                             </Grid>
//                             <Grid item>
//                                 <TextField
//                                     id="standard-select-currency"
//                                     select
//                                     value={value}
//                                     onChange={(e) => setValue(e.target.value)}
//                                 >
//                                     {/* {status.map((option) => (
//                                         <MenuItem key={option.value} value={option.value}>
//                                             {option.label}
//                                         </MenuItem>
//                                     ))} */}
//                                 </TextField>
//                             </Grid>
//                         </Grid>
//                     </Grid>
//                     {/* <Grid item xs={12}>
//                         <Chart {...chartData} />
//                     </Grid> */}
//                 </Grid>
//             // </MainCard>
//         )}
//     </>
// );

// }

export default function Reports() {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 10 }}>
            Electronic Devices
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Expense for electronic devices is 3600
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>Entertainment</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          Expense for entertainment is 500
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
            Food
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          Expense for food is 1300
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>Daily Expense</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          Expense for daily usage is 1300
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}