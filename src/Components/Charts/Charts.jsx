import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const data = [
  {
    name: "27",
    uv: 4,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "May",
    uv: 3,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "4",
    uv: 2,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "7",
    uv: 2.7,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "10",
    uv: 1.8,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "13",
    uv: 2.3,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "15",
    uv: 2.5,
    pv: 4300,
    amt: 2100,
  },
  {
    name: "19   ",
    uv: 3.0,
    pv: 4300,
    amt: 2100,
  },
  {
    name: "22",
    uv: 2.8,
    pv: 4300,
    amt: 2100,
  },
  {
    name: "25",
    uv: 1.8,
    pv: 4300,
    amt: 2100,
  },
];

const Charts = () => {
  return (
    <div className='charts' style={{ width: "100%", overflowX: "auto" }}>
      <AreaChart
        width={580}
        height={200}
        data={data}
        margin={{
          top: 10,
          right: 0,
          left: 0,
          bottom: 0,
        }}
      >
        <defs>
          <linearGradient
            id='colorUv'
            x1='286.995'
            y1='16.442'
            x2='286.995'
            y2='127'
            gradientUnits='userSpaceOnUse'
          >
            <stop stopColor='#38B6FF' stopOpacity='0.4' />
            <stop offset='1' stopColor='#38B6FF' stopOpacity='0' />
          </linearGradient>
        </defs>

        {/* <CartesianGrid strokeDasharray='3 3' /> */}
        <XAxis dataKey='name' />
        <YAxis />
        <Tooltip />
        {/* <Area type='monotone' dataKey='uv' stroke='#38B6FF' fill='#38B6FF' /> */}
        <Area
          type='monotone'
          dataKey='uv'
          stroke='url(#colorUv)'
          fillOpacity={1}
          fill='url(#colorUv)'
        />
      </AreaChart>
    </div>
  );
};

export default Charts;
