import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from './Title';
import { useState, useEffect } from 'react';
import useToken from './useToken';
import axios from 'axios';

// Generate Data
function createData(date, amount) {
  return { date, amount };
}

export default function DateReports() {
    const theme = useTheme();
    const { token, setToken } = useToken();
    const [data, setdata] = useState([]);
    const [error,seterror] = useState('');
    const fetchData = async function () {
        try {
            const res = await axios.get('http://localhost:2000/transaction', {headers: {
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
  
    let total_income = 0;
    let incomeList = [];
    for(let i=0;i<data.length;i++){
        if(data[i].payment_Type === 'income'){
            incomeList.push(data[i]);
            total_income += parseFloat(data[i].amt);
        }
    }

    let map = new Map();
    for(let i=0;i<incomeList.length;i++){
        if(map.has(incomeList[i].payment_Date)){
            map.set(incomeList[i].payment_Date,map.get(incomeList[i].payment_Date)+parseFloat(incomeList[i].amt));
        } else{
            map.set(incomeList[i].payment_Date,parseFloat(incomeList[i].amt));
        }
    }

    let list = Array.from(map);
    list.sort(function(a,b){return a[0].localeCompare(b[0])});

    let linedata = [];
    for(let i=0;i<list.length;i++){
        let obj = createData(list[i][0],list[i][1]);
        linedata.push(obj);
    }

  return (
    <React.Fragment>
      <h1>Total Income: {total_income.toFixed(2)}</h1>
      <ResponsiveContainer>
        <LineChart
          data={linedata}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis
            dataKey="date"
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          />
          <YAxis
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          >
            <Label
              angle={270}
              position="left"
              style={{
                textAnchor: 'middle',
                fill: theme.palette.text.primary,
                ...theme.typography.body1,
              }}
            >
              Income ($)
            </Label>
          </YAxis>
          <Line
            isAnimationActive={false}
            type="monotone"
            dataKey="amount"
            stroke={theme.palette.primary.main}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}