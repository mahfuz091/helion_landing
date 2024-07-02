"use client";

import axios from "axios";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { Area, AreaChart, Tooltip, XAxis, YAxis } from "recharts";
// import ReactApexChart from "react-apexcharts";
import dynamic from "next/dynamic";
import { ThemeContext } from "@/ThemeProvider/ThemeProvider";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const InnoPriceBar = ({ period, interval }) => {
  const { theme, setTheme } = useContext(ThemeContext);

  const [data, setData] = useState([]);
  const [minTokenPrice, setMinTokenPrice] = useState(null); // State to store the minimum token price
  // console.log(data);
  const fetchData = async () => {
    const query = `
      query GetTokenPriceCandles($address: String!, $period: String!, $interval: String) {
        tokenPriceCandles(address: $address, period: $period, interval: $interval) {
          timestamp
          open
          close
          max
          min
        }
      }
    `;
    const variables = {
      address: "0x49bf093277bf4dde49c48c6aa55a3bda3eedef68",
      period: `${period}`,
      interval: `${interval}`,
    };
    const operationName = "GetTokenPriceCandles";

    try {
      const response = await axios.post("https://api-v2.dhedge.org/graphql", {
        query: query,
        variables: variables,
        operationName: operationName,
      });

      const formattedData = response.data.data.tokenPriceCandles.map(
        (item) => ({
          ...item,
          open: parseFloat(
            (parseFloat(item.open) / Math.pow(10, 18)).toFixed(4)
          ),
          close: parseFloat(
            (parseFloat(item.close) / Math.pow(10, 18)).toFixed(4)
          ),
          max: parseFloat((parseFloat(item.max) / Math.pow(10, 18)).toFixed(4)),
          min: parseFloat((parseFloat(item.min) / Math.pow(10, 18)).toFixed(4)),
        })
      );

      setData(formattedData);

      // Find the minimum value of the 'min' field
      const minTokenPriceValue = Math.min(
        ...formattedData.map((item) => item.min)
      );
      setMinTokenPrice(minTokenPriceValue);
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle error here, such as showing an error message to the user
    }
  };

  const seriesData = data.map((item) => ({
    x: new Date(parseInt(item.timestamp)),
    y: [
      parseFloat(item.open),
      parseFloat(item.max),
      parseFloat(item.min),
      parseFloat(item.close),
    ],
  }));

  const options = {
    chart: {
      type: "candlestick",
      height: 250,
      toolbar: {
        show: false, // Hide the toolbar
      },
    },

    xaxis: {
      type: "datetime",
      labels: {
        formatter: function (value, timestamp) {
          const date = new Date(timestamp);
          const day = date.getDate();
          const month = date.toLocaleString("default", { month: "short" });
          return `${day} ${month}`;
        },
        style: {
          colors: theme === "dark" ? "#fff" : "#000",
        },
      },
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
      labels: {
        style: {
          colors: theme === "dark" ? "#fff" : "#000",
        },
      },
    },
    tooltip: {
      custom: function ({ series, seriesIndex, dataPointIndex, w }) {
        // console.log(series, seriesIndex, dataPointIndex); // Check the structure of the series object
        if (series[seriesIndex]) {
          const data = series[seriesIndex];
          // console.log(data); // Check if data is available
          if (data) {
            const o = data[0].toFixed(2);
            const h = data[1].toFixed(2);
            const l = data[2].toFixed(2);
            const c = data[3].toFixed(2);
            return `<div class="apexcharts-tooltip-candlestick">
                <div>O: <span>${o}</span></div>
                <div>H: <span>${h}</span></div>
                <div>L: <span>${l}</span></div>
                <div>C: <span>${c}</span></div>
              </div>`;
          }
        }
        return ""; // Return empty string if data is not available
      },
      style: {
        color: theme === "dark" ? "#000" : "#000", // Change tooltip label color based on theme
      },
    },
  };

  const series = [
    {
      name: "candle",
      data: seriesData,
    },
  ];

  useEffect(() => {
    fetchData();
  }, []);

  //   const formatDate = (timestamp) => {
  //     const date = new Date(timestamp * 1000);
  //     const options = { month: "long", day: "numeric", year: "numeric" };
  //     return date.toLocaleDateString("en-US", options);
  //   };
  const formatDate = (timestamp) => {
    // console.log(typeof timestamp);
    const num = parseFloat(timestamp);
    const date = new Date(num);
    const options = {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };

    return date.toLocaleDateString("en-US", options);
  };
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const convertTimestampToDate = (timestamp) => {
    const date = new Date(parseFloat(timestamp));
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const amPM = hours >= 12 ? "PM" : "AM";

    // Convert hours to 12-hour format
    hours = hours % 12 || 12;
    // return `${date.getDate()} ${months[date.getMonth()]}`;
    return hours + ":" + (minutes < 10 ? "0" : "") + minutes + " " + amPM;
  };

  // console.log("PD", formatDate(1717608900000));

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        background: "white",
        overflowX: "auto",
        overflowY: "hidden",
      }}
      className='candle_chart'
    >
      <ReactApexChart
        options={options}
        series={series}
        type='candlestick'
        height={200}
      />
    </div>
  );
};

export default InnoPriceBar;
