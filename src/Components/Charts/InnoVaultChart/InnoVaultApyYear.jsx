"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Area, AreaChart, Tooltip, XAxis, YAxis } from "recharts";

const InnoVaultApyYear = () => {
  const [data, setData] = useState([]);
  // console.log(data);
  const fetchData = async () => {
    const query = `
      query GetPoolApyHistory($fundAddress: String!, $period: String!) {
        apyHistory(fundAddress: $fundAddress, period: $period) {
          monthly
          weekly
          timestamp
        }
      }
    `;
    const variables = {
      fundAddress: "0x49bf093277bf4dde49c48c6aa55a3bda3eedef68",
      period: "1y",
    };

    try {
      const response = await axios.post("https://api-v2.dhedge.org/graphql", {
        query: query,
        variables: variables,
        operationName: "GetPoolApyHistory",
      });
      setData(response.data.data.apyHistory);
    } catch (error) {
    } finally {
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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

  // console.log(data);
  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const options = { month: "long", day: "numeric", year: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  const convertTimestampToDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return `${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  // console.log("LL", convertTimestampToDate(1703894400));

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        background: "white",
        overflowX: "auto",
      }}
    >
      <AreaChart data={data} width={580} height={200}>
        <XAxis
          dataKey='timestamp'
          tickFormatter={(unixTime) => convertTimestampToDate(unixTime)}
          tick={{ fontSize: 10 }}
          interval={30}
        />
        <YAxis tickFormatter={(value) => `${value}%`} tick={{ fontSize: 10 }} />

        <Tooltip
          content={({ payload }) => {
            if (payload && payload.length > 0) {
              const weeklyValue = payload[0].payload.weekly;
              const percentage = (
                (weeklyValue / data[data.length - 1].weekly) *
                100
              ).toFixed(2);
              const date = formatDate(payload[0].payload.timestamp);
              return (
                <div
                  style={{
                    backgroundColor: "#fff",
                    padding: "10px",
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                    fontSize: "15px",
                  }}
                >
                  <p
                    style={{
                      marginBottom: "0",
                    }}
                  >
                    APY History
                  </p>
                  <p
                    style={{
                      marginBottom: "0",
                    }}
                  >
                    {" "}
                    {date}
                  </p>
                  <p
                    style={{
                      marginBottom: "0",
                    }}
                  >
                    {" "}
                    {weeklyValue}%
                  </p>
                </div>
              );
            }
            return null;
          }}
        />
        <Area
          type='monotone'
          dataKey='weekly'
          stroke='#38B6FF'
          fill='#38B6FF'
        />
      </AreaChart>
    </div>
  );
};

export default InnoVaultApyYear;
