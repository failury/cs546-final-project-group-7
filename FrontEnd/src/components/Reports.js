import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// import { Card } from 'antd';
// import echarts from 'echarts/lib/echarts';
// //导入柱形图
// import 'echarts/lib/chart/bar';
// import 'echarts/lib/component/tooltip';
// import 'echarts/lib/component/title';
// import 'echarts/lib/component/legend';
// import 'echarts/lib/component/markPoint';
// import ReactEcharts from 'echarts-for-react';
// //引入样式
// import '../common.less';

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


// const LineMarkerEcharts = React.createClass({
//   propTypes: {
//   },
//   getOtion: function() {
//       const option = {
// title: {
//       text: '未来一周气温变化',
//       subtext: '纯属虚构'
//   },
//   tooltip: {
//       trigger: 'axis'
//   },
//   legend: {
//       data:['最高气温','最低气温']
//   },
//   toolbox: {
//       show: true,
//       feature: {
//           dataZoom: {
//               yAxisIndex: 'none'
//           },
//           dataView: {readOnly: false},
//           magicType: {type: ['line', 'bar']},
//           restore: {},
//           saveAsImage: {}
//       }
//   },
//   xAxis:  {
//       type: 'category',
//       boundaryGap: false,
//       data: ['周一','周二','周三','周四','周五','周六','周日']
//   },
//   yAxis: {
//       type: 'value',
//       axisLabel: {
//           formatter: '{value} °C'
//       }
//   },
//   series: [
//       {
//           name:'最高气温',
//           type:'line',
//           data:[11, 11, 15, 13, 12, 13, 10],
//           markPoint: {
//               data: [
//                   {type: 'max', name: '最大值'},
//                   {type: 'min', name: '最小值'}
//               ]
//           },
//           markLine: {
//               data: [
//                   {type: 'average', name: '平均值'}
//               ]
//           }
//       },
//       {
//           name:'最低气温',
//           type:'line',
//           data:[1, -2, 2, 5, 3, 2, 0],
//           markPoint: {
//               data: [
//                   {name: '周最低', value: -2, xAxis: 1, yAxis: -1.5}
//               ]
//           },
//           markLine: {
//               data: [
//                   {type: 'average', name: '平均值'},
//                   [{
//                       symbol: 'none',
//                       x: '90%',
//                       yAxis: 'max'
//                   }, {
//                       symbol: 'circle',
//                       label: {
//                           normal: {
//                               position: 'start',
//                               formatter: '最大值'
//                           }
//                       },
//                       type: 'max',
//                       name: '最高点'
//                   }]
//               ]
//           }
//       }
//   ]
//       };
//       return option;
//   },
//   render: function() {
//       let code = "<ReactEcharts " +
//           "    option={this.getOtion()} " +
//           "    style={{height: '350px', width: '1000px'}}  " +
//           "    className='react_for_echarts' />";
//       return (
//                   <ReactEcharts
//                       option={this.getOtion()}
//                       style={{height: '350px', width: '1000px'}}
//                       className='react_for_echarts' />
//       );
//   }
// });

// export default LineMarkerEcharts;