"use client";
import React, { useState, useEffect } from "react";
import arrow from "../../app/assets/images/fi_271228.png";
import network from "../../app/assets/images/Rectangle 3467615.png";
import vault from "../../app/assets/images/image 888.png";

const StableEdgeRow = () => {
  const [stableEdgeVault, setStableEdgeVault] = useState([]);
  const fetchstableEdgeVaultData = async () => {
    const apiEndpoint = "https://api-v2.dhedge.org/graphql";

    // Constructing the GraphQL query
    const graphqlQuery = `
        query GetFundData($address: String!) {
            fund(address: $address) {
               
                id
                name
                tokenPrice
                totalValue
                riskFactor
                performanceMetrics {
                  day
                  week
                  month
                  quarter
                  halfyear
                  year
              }
              apy{
                monthly
                weekly
              }

            
               
            }
        }
    `;

    // Address provided in the query
    const address = "0x1ec50880101022c11530a069690f5446d1464592";
    // const address = "0xb9243c495117343981ec9f8aa2abffee54396fc0";

    // Define the request options
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: graphqlQuery,
        variables: {
          address: address,
        },
      }),
    };

    try {
      // Fetching data from the API
      const response = await fetch(apiEndpoint, requestOptions);
      const responseData = await response.json();

      // Do something with the data...
      // Convert performance metrics to "1d", "1w", "1m", "6m", "1y" format
      const performanceMetrics = responseData.data.fund.performanceMetrics;

      // Function to format percentage change with sign
      const calculatePercentage = (value) => {
        return ((parseFloat(value) / 10 ** 18 - 1) * 100).toFixed(2);
      };

      // Calculate percentage change for each performance metric and format it with sign
      const formattedPerformanceMetrics = {
        "1d": calculatePercentage(performanceMetrics.day),

        "1w": calculatePercentage(performanceMetrics.week),
        "1m": calculatePercentage(performanceMetrics.month),
        "1q": calculatePercentage(performanceMetrics.quarter),
        "6m": calculatePercentage(performanceMetrics.halfyear),
        "1y": calculatePercentage(performanceMetrics.year),
      };

      const formatLargeNumber = (number) => {
        if (number >= 1e24) {
          // Handle numbers between 1e21 and 1e24, scale to "M"
          const scaledNumber = number / 1e24;
          return scaledNumber.toFixed(2) + "M";
        } else if (number >= 1e21) {
          // Handle very large numbers and scale to "K"
          const scaledNumber = number / 1e21;
          return scaledNumber.toFixed(1) + "K";
        } else {
          // General case
          const units = ["", "K", "M", "B", "T"];
          const unitIndex = Math.min(
            Math.floor(Math.log10(number) / 3),
            units.length - 1
          );
          const scaledNumber = number / Math.pow(1000, unitIndex);
          return scaledNumber.toFixed(2) + units[unitIndex];
        }
      };

      const data = {
        performanceMetrics: formattedPerformanceMetrics,
        d: formattedPerformanceMetrics["1d"],
        w: formattedPerformanceMetrics["1w"],
        m: formattedPerformanceMetrics["1m"],
        y: formattedPerformanceMetrics["1y"],
        total: calculatePercentage(responseData.data.fund.tokenPrice),
        managed: formatLargeNumber(responseData.data.fund.totalValue),
      };

      //   console.log(data.performanceMetrics);

      setStableEdgeVault(data);
    } catch (error) {
      console.error("Error fetching GraphQL data:", error);
    }
  };

  useEffect(() => {
    fetchstableEdgeVaultData();
  }, []);
  return (
    <tr>
      <td className='tw-bg-black-medium' scope='row'>
        <img src={network.src} alt='' />
      </td>
      <td
        className='tw-bg-black-medium'
        style={{ display: "flex", gap: "10px" }}
      >
        <div>
          <img src={vault.src} alt='' />
        </div>
        <div>
          <h5>Helion StableEdge</h5>
          <p>dHEDGE</p>
        </div>
      </td>
      <td className='tw-bg-black-medium' style={{ color: "#000" }}>
        ${stableEdgeVault.managed}
      </td>
      <td
        className='tw-bg-black-medium'
        style={{ color: stableEdgeVault.d < 0 ? "#DE0A0A" : "#01A412" }}
      >
        {stableEdgeVault.d}
      </td>
      <td
        className='tw-bg-black-medium'
        style={{ color: stableEdgeVault.w < 0 ? "#DE0A0A" : "#01A412" }}
      >
        {stableEdgeVault.w}
      </td>
      <td
        className='tw-bg-black-medium'
        style={{ color: stableEdgeVault.m < 0 ? "#DE0A0A" : "#01A412" }}
      >
        {stableEdgeVault.m}
      </td>

      <td
        className='tw-bg-black-medium'
        style={{ color: stableEdgeVault.y < 0 ? "#DE0A0A" : "#01A412" }}
      >
        {stableEdgeVault.y}
      </td>
      <td
        className='tw-p-3
                tw-whitespace-nowrap
                tw-text-sm
                tw-text-black-dark
                tw-text-white
                tw-bg-white-medium
                tw-bg-black-medium
                tw-text-center
                tw-rounded-l-lg
                group-hover:tw-bg-white-dark
                group-hover:tw-bg-black-light
                tw-cursor-pointer'
        style={{ color: "#000" }}
      >
        {stableEdgeVault.total}
      </td>
    </tr>
  );
};

export default StableEdgeRow;
