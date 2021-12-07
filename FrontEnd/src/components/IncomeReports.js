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

import { Bar } from 'react-chartjs-2';
import { Box, Button, CardHeader, Divider} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import Chart from 'chart.js/auto';
import axios from 'axios';
import useToken from './useToken';

export default function IncomeReports(props) {
  const { token, setToken } = useToken();
  const [data, setdata] = useState([]);
  const [error,seterror] = useState('');
  const fetchData = async function () {
    try {
        const res = await axios.get('http://localhost:2000/budget', {headers: {
        'Content-Type': 'application/json',
        'token': token
      }});
      setdata(res.data);
    } catch (error) {
      console.log(error);
      sessionStorage.removeItem('token');
      window.location.href='/login';
    } 
};
  useEffect(() => {
      fetchData();
},[]);

let totalsum = 0;
let elec_sum = 0;
let entertain = 0;
let food_sum = 0;
let daily_sum = 0;
for(let i=0;i<data.length;i++){
  totalsum += parseFloat(data[i].amount);
  if(data[i].category === "Electronic Devices"){
    elec_sum += parseFloat(data[i].amount);
  }
  if(data[i].category === "Entertainment"){
    entertain += parseFloat(data[i].amount);
  }
  if(data[i].category === "Food"){
    food_sum += parseFloat(data[i].amount);
  }
  if(data[i].category === "Daily Expense"){
    daily_sum += parseFloat(data[i].amount);
  }
}
//console.log(elec_sum);

  const theme = useTheme();
    const tdata = {
      datasets: [
        {
          backgroundColor: '#3F51B5',
          barPercentage: 0.5,
          barThickness: 12,
          borderRadius: 4,
          categoryPercentage: 0.5,
          data: [elec_sum, entertain, food_sum, daily_sum],
          label: totalsum,
          maxBarThickness: 10
        }
      ],
      labels: ['Electronic Devices', 'Entertainment', 'Food', 'Daily Expense']
    };
  
    const options = {
      animation: false,
      cornerRadius: 20,
      layout: { padding: 0 },
      legend: { display: false },
      maintainAspectRatio: false,
      responsive: true,
      xAxes: [
        {
          ticks: {
            fontColor: theme.palette.text.secondary
          },
          gridLines: {
            display: false,
            drawBorder: false
          }
        }
      ],
      yAxes: [
        {
          ticks: {
            fontColor: theme.palette.text.secondary,
            beginAtZero: true,
            min: 0
          },
          gridLines: {
            borderDash: [2],
            borderDashOffset: [2],
            color: theme.palette.divider,
            drawBorder: false,
            zeroLineBorderDash: [2],
            zeroLineBorderDashOffset: [2],
            zeroLineColor: theme.palette.divider
          }
        }
      ],
      tooltips: {
        backgroundColor: theme.palette.background.paper,
        bodyFontColor: theme.palette.text.secondary,
        borderColor: theme.palette.divider,
        borderWidth: 1,
        enabled: true,
        footerFontColor: theme.palette.text.secondary,
        intersect: false,
        mode: 'index',
        titleFontColor: theme.palette.text.primary
      }
    };
//{...props}
return (
    <Card>
      <CardHeader
        action={(
          <Button
            endIcon={<ArrowDropDownIcon fontSize="small" />}
            size="small"
          >
            Last 7 days
          </Button>
        )}
        title="Income Reports"
      />
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: 200,
            position: 'relative'
          }}
        >
          <Bar
            data={tdata}
            options={options}
          />
        </Box>
      </CardContent>
      <Divider />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          p: 2
        }}
      >
        <Button
          color="primary"
          endIcon={<ArrowRightIcon fontSize="small" />}
          size="small"
        >
          Overview
        </Button>
      </Box>
    </Card>
  );
}

// export default function Reports() {
//    const Sales = (props) => {
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
  
//     return (
//       <Card {...props}>
//         <Divider />
//         <CardContent>
//           <Box
//             sx={{
//               height: 400,
//               position: 'relative'
//             }}
//           >
//             <Bar
//               data={data}
//               options={options}
//             />
//           </Box>
//         </CardContent>
//         <Divider />
//         <Box
//           sx={{
//             display: 'flex',
//             justifyContent: 'flex-end',
//             p: 2
//           }}
//         >
//         </Box>
//       </Card>
//     );
//   };
// }

// export default function Reports() {
//   const [expanded, setExpanded] = React.useState(false);

//   const handleChange = (panel) => (event, isExpanded) => {
//     setExpanded(isExpanded ? panel : false);
//   };

//   return (
//     <div>
//       <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
//         <AccordionSummary
//           expandIcon={<ExpandMoreIcon />}
//           aria-controls="panel1bh-content"
//           id="panel1bh-header"
//         >
//           <Typography sx={{ width: '33%', flexShrink: 10 }}>
//             Electronic Devices
//           </Typography>
//         </AccordionSummary>
//         <AccordionDetails>
//           <Typography>
//             Expense for electronic devices is 3600
//           </Typography>
//         </AccordionDetails>
//       </Accordion>

//       <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
//         <AccordionSummary
//           expandIcon={<ExpandMoreIcon />}
//           aria-controls="panel2bh-content"
//           id="panel2bh-header"
//         >
//           <Typography sx={{ width: '33%', flexShrink: 0 }}>Entertainment</Typography>
//         </AccordionSummary>
//         <AccordionDetails>
//           <Typography>
//           Expense for entertainment is 500
//           </Typography>
//         </AccordionDetails>
//       </Accordion>

//       <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
//         <AccordionSummary
//           expandIcon={<ExpandMoreIcon />}
//           aria-controls="panel3bh-content"
//           id="panel3bh-header"
//         >
//           <Typography sx={{ width: '33%', flexShrink: 0 }}>
//             Food
//           </Typography>
//         </AccordionSummary>
//         <AccordionDetails>
//           <Typography>
//           Expense for food is 1300
//           </Typography>
//         </AccordionDetails>
//       </Accordion>

//       <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
//         <AccordionSummary
//           expandIcon={<ExpandMoreIcon />}
//           aria-controls="panel4bh-content"
//           id="panel4bh-header"
//         >
//           <Typography sx={{ width: '33%', flexShrink: 0 }}>Daily Expense</Typography>
//         </AccordionSummary>
//         <AccordionDetails>
//           <Typography>
//           Expense for daily usage is 1300
//           </Typography>
//         </AccordionDetails>
//       </Accordion>
//     </div>
//   );
// }