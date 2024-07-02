"use client";
import React, { createContext, useState, useEffect } from "react";
import inno from "../app/assets/images/inno.png";
import perpetual from "../app/assets/images/perpetual.png";
import stable from "../app/assets/images/stable.png";
export const ThemeContext = createContext(null);
const ThemeProvider = ({ children }) => {
  const getInitialTheme = () => {
    if (typeof localStorage !== "undefined") {
      return localStorage.getItem("theme") || "light";
    }
    return "light";
  };

  const [theme, setTheme] = useState(getInitialTheme);

  const [innoVault, setInnoVault] = useState([]);
  const fetchInnoVaultData = async () => {
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
    const address = "0x49bf093277bf4dde49c48c6aa55a3bda3eedef68";
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
        managed: responseData.data.fund.totalValue,
        name: "Helion InnoVault",
        image: inno,
      };

      // console.log(data.performanceMetrics);

      setInnoVault(data);
    } catch (error) {
      console.error("Error fetching GraphQL data:", error);
    }
  };
  const [perpetualVault, setPerpetualVault] = useState([]);
  const fetchPerpetualVaultData = async () => {
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
    const address = "0xb9243c495117343981ec9f8aa2abffee54396fc0";
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
        managed: responseData.data.fund.totalValue,
        name: "Helion Perpetual Neutral Edge",
        image: perpetual,
      };

      //   console.log(data.performanceMetrics);

      setPerpetualVault(data);
    } catch (error) {
      console.error("Error fetching GraphQL data:", error);
    }
  };
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
        managed: responseData.data.fund.totalValue,
        name: "Helion StableEdge",
        image: stable,
      };

      //   console.log(data.performanceMetrics);

      setStableEdgeVault(data);
    } catch (error) {
      console.error("Error fetching GraphQL data:", error);
    }
  };
  console.log(stableEdgeVault, "ff");
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [week, setWeek] = useState("");
  const [year, setYear] = useState("");
  const etherumData = {
    d: day,
    w: week,
    m: month,
    y: year,
  };
  const [eherumEdgeVault, setEtherumEdgeVault] = useState([]);

  const fetchPerformDataDay = async () => {
    const apiEndpoint = "https://api-v2.dhedge.org/graphql";

    const query = `
  query GetPerformanceHistoryInTermsOfAsset($address: String!, $assetName: String!, $period: String!) {
    getPerformanceHistoryInTermsOfAsset(
      address: $address
      assetName: $assetName
      period: $period
    ) {
      
      periodChange
    }
  }
`;
    const address = "0xb2cfb909e8657c0ec44d3dd898c1053b87804755";
    const assetName = "ETH";
    const period = "1d";
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: query,
        variables: {
          address: address,
          assetName: assetName,
          period: period,
        },
      }),
    };

    try {
      // Fetching data from the API
      const response = await fetch(apiEndpoint, requestOptions);
      const responseData = await response.json();

      // Process the response data

      setDay(
        responseData?.data?.getPerformanceHistoryInTermsOfAsset?.periodChange
      );
    } catch (error) {
      console.log(error);
    }
  };
  const fetchPerformDataWeek = async () => {
    const apiEndpoint = "https://api-v2.dhedge.org/graphql";

    const query = `
  query GetPerformanceHistoryInTermsOfAsset($address: String!, $assetName: String!, $period: String!) {
    getPerformanceHistoryInTermsOfAsset(
      address: $address
      assetName: $assetName
      period: $period
    ) {
      
      periodChange
    }
  }
`;
    const address = "0xb2cfb909e8657c0ec44d3dd898c1053b87804755";
    const assetName = "ETH";
    const period = "1w";
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: query,
        variables: {
          address: address,
          assetName: assetName,
          period: period,
        },
      }),
    };

    try {
      // Fetching data from the API
      const response = await fetch(apiEndpoint, requestOptions);
      const responseData = await response.json();

      // Process the response data

      setWeek(
        responseData?.data?.getPerformanceHistoryInTermsOfAsset?.periodChange
      );
    } catch (error) {
      console.log(error);
    }
  };
  const fetchPerformDataMonth = async () => {
    const apiEndpoint = "https://api-v2.dhedge.org/graphql";

    const query = `
  query GetPerformanceHistoryInTermsOfAsset($address: String!, $assetName: String!, $period: String!) {
    getPerformanceHistoryInTermsOfAsset(
      address: $address
      assetName: $assetName
      period: $period
    ) {
      
      periodChange
    }
  }
`;
    const address = "0xb2cfb909e8657c0ec44d3dd898c1053b87804755";
    const assetName = "ETH";
    const period = "1m";
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: query,
        variables: {
          address: address,
          assetName: assetName,
          period: period,
        },
      }),
    };

    try {
      // Fetching data from the API
      const response = await fetch(apiEndpoint, requestOptions);
      const responseData = await response.json();

      // Process the response data

      setMonth(
        responseData?.data?.getPerformanceHistoryInTermsOfAsset?.periodChange
      );
    } catch (error) {
      console.log(error);
    }
  };
  const fetchPerformDataYear = async () => {
    const apiEndpoint = "https://api-v2.dhedge.org/graphql";

    const query = `
  query GetPerformanceHistoryInTermsOfAsset($address: String!, $assetName: String!, $period: String!) {
    getPerformanceHistoryInTermsOfAsset(
      address: $address
      assetName: $assetName
      period: $period
    ) {
      
      periodChange
    }
  }
`;
    const address = "0xb2cfb909e8657c0ec44d3dd898c1053b87804755";
    const assetName = "ETH";
    const period = "1y";
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: query,
        variables: {
          address: address,
          assetName: assetName,
          period: period,
        },
      }),
    };

    try {
      // Fetching data from the API
      const response = await fetch(apiEndpoint, requestOptions);
      const responseData = await response.json();

      // Process the response data

      setYear(
        responseData?.data?.getPerformanceHistoryInTermsOfAsset?.periodChange
      );
    } catch (error) {
      console.log(error);
    }
  };

  console.log(year, "year");
  const fetchEtherumEdgeVaultData = async () => {
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
    const address = "0xb2cfb909e8657c0ec44d3dd898c1053b87804755";
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
      const formattedDay = !isNaN(day) ? Number(day).toFixed(2) : "";
      const formattedWeek = !isNaN(week) ? Number(week).toFixed(2) : "";
      const formattedMonth = !isNaN(month) ? Number(month).toFixed(2) : "";
      const formattedYear = !isNaN(year) ? Number(year).toFixed(2) : "";
      const data = {
        performanceMetrics: formattedPerformanceMetrics,
        d: formattedDay,
        w: formattedWeek,
        m: formattedMonth,
        y: formattedYear,
        total: calculatePercentage(responseData.data.fund.tokenPrice),
        managed: responseData.data.fund.totalValue,
        name: "Helion EtherumEdge",
        image: perpetual,
      };

      //   console.log(data.performanceMetrics);

      setEtherumEdgeVault(data);
    } catch (error) {
      console.error("Error fetching GraphQL data:", error);
    }
  };
  console.log(eherumEdgeVault, "Re");

  const leaderBoardData = [
    innoVault,
    perpetualVault,
    stableEdgeVault,
    eherumEdgeVault,
  ];
  useEffect(() => {
    fetchPerformDataDay();
    fetchPerformDataMonth();
    fetchPerformDataWeek();
    fetchPerformDataYear();
  }, []);

  useEffect(() => {
    fetchInnoVaultData();
    fetchPerpetualVaultData();
    fetchstableEdgeVaultData();
    fetchEtherumEdgeVaultData();
  }, [day, week, month, year]);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  const themeInfo = {
    theme,
    setTheme,
    leaderBoardData,
  };
  return (
    <ThemeContext.Provider value={themeInfo}>{children}</ThemeContext.Provider>
  );
};

export default ThemeProvider;
