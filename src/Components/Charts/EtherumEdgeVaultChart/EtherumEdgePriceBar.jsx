"use client";

import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";

// import ReactApexChart from "react-apexcharts";
import dynamic from "next/dynamic";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});
const EtherumEdgePriceBar = ({ period, interval }) => {
  const [data, setData] = useState([]);
  const [minTokenPrice, setMinTokenPrice] = useState(null); // State to store the minimum token price

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
      address: "0xb2cfb909e8657c0ec44d3dd898c1053b87804755",
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
        show: false,
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
      },
    },
    yaxis: {
      tooltip: {
        enabled: true,
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

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        background: "white",
        overflowX: "auto",
        overflowY: "hidden",
      }}
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

export default EtherumEdgePriceBar;
