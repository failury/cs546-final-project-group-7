// import * as React from 'react';
// import { useTheme } from '@mui/material/styles';
// import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
// import Title from './Title';
// import { useState, useEffect } from 'react';
// import useToken from './useToken';
// import axios from 'axios';

// // Generate Data
// function createData(date, amount) {
//   return { date, amount };
// }

// export default function DateReports() {
//     const theme = useTheme();
//     const { token, setToken } = useToken();
//     const [data, setdata] = useState([]);
//     const [error,seterror] = useState('');
//     const fetchData = async function () {
//         try {
//             const res = await axios.get('http://localhost:2000/transaction', {headers: {
//             'Content-Type': 'application/json',
//             'token': token
//         }});
//         setdata(res.data);
//         } catch (error) {
//         console.log(error);
//         sessionStorage.removeItem('token');
//         window.location.href='/login';
//         } 
//     };
//     useEffect(() => {
//         fetchData();
//     },[]);
  
//     let total_income = 0;
//     let incomeList = [];
//     for(let i=0;i<data.length;i++){
//         if(data[i].payment_Type === 'income'){
//             incomeList.push(data[i]);
//             total_income += parseFloat(data[i].amt);
//         }
//     }

//     let map = new Map();
//     for(let i=0;i<incomeList.length;i++){
//         if(map.has(incomeList[i].payment_Date)){
//             map.set(incomeList[i].payment_Date,map.get(incomeList[i].payment_Date)+parseFloat(incomeList[i].amt));
//         } else{
//             map.set(incomeList[i].payment_Date,parseFloat(incomeList[i].amt));
//         }
//     }

//     let list = Array.from(map);
//     list.sort(function(a,b){return a[0].localeCompare(b[0])});

//     let linedata = [];
//     for(let i=0;i<list.length;i++){
//         let obj = createData(list[i][0],list[i][1]);
//         linedata.push(obj);
//     }

//   return (
//     <React.Fragment>
//       <h1>Total Income: {total_income.toFixed(2)}</h1>
//       <ResponsiveContainer>
//         <LineChart
//           data={linedata}
//           margin={{
//             top: 16,
//             right: 16,
//             bottom: 0,
//             left: 24,
//           }}
//         >
//           <XAxis
//             dataKey="date"
//             stroke={theme.palette.text.secondary}
//             style={theme.typography.body2}
//           />
//           <YAxis
//             stroke={theme.palette.text.secondary}
//             style={theme.typography.body2}
//           >
//             <Label
//               angle={270}
//               position="left"
//               style={{
//                 textAnchor: 'middle',
//                 fill: theme.palette.text.primary,
//                 ...theme.typography.body1,
//               }}
//             >
//               Income ($)
//             </Label>
//           </YAxis>
//           <Line
//             isAnimationActive={false}
//             type="monotone"
//             dataKey="amount"
//             stroke={theme.palette.primary.main}
//             dot={false}
//           />
//         </LineChart>
//       </ResponsiveContainer>
//     </React.Fragment>
//   );
// }

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

export default function ExpenseReports(props) {
  let list = props.data;
  let incomes = [];
  for(let i=0;i<list.length;i++){
    if(list[i].payment_Type === 'income'){
      incomes.push(list[i]);
    }
  }
  console.log(incomes);
  
  let totalsum = 0;
  let elec_sum = 0;
  let entertain = 0;
  let food_sum = 0;
  let gro_sum = 0;
  let debt_sum = 0;
  let loan_sum = 0;
  let other_sum = 0;
  
  for(let i=0;i<incomes.length;i++){
      totalsum += parseFloat(incomes[i].amt);
      if(incomes[i].category === "Electronic Devices"){
        elec_sum += parseFloat(incomes[i].amt);
      }
      if(incomes[i].category === "Entertainment"){
        entertain += parseFloat(incomes[i].amt);
      }
      if(incomes[i].category === "Food and Beverage"){
        food_sum += parseFloat(incomes[i].amt);
      }
      if(incomes[i].category === "Groceries"){
        gro_sum += parseFloat(incomes[i].amt);
      }
      if(incomes[i].category === "Debt"){
        debt_sum += parseFloat(incomes[i].amt);
      }
      if(incomes[i].category === "Loan"){
        loan_sum += parseFloat(incomes[i].amt);
      }
      if(incomes[i].category === "Others"){
        other_sum += parseFloat(incomes[i].amt);
      }
  }

  const theme = useTheme();
    const tdata = {
      datasets: [
        {
          backgroundColor: '#3F51B5',
          barPercentage: 0.5,
          barThickness: 12,
          borderRadius: 4,
          categoryPercentage: 0.5,
          data: [food_sum, gro_sum,entertain,elec_sum,debt_sum,loan_sum,other_sum],
          label: totalsum.toFixed(2),
          maxBarThickness: 10
        }
      ],
      labels: ['Food and Beverage', 'Groceries','Entertainment','Electronic Devices','Debt','Loan','Others']
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

return (
    <Card>
      <CardHeader
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
      </Box>
    </Card>
  );
}