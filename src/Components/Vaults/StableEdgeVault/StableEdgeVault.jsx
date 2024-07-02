"use client";
import React, { useEffect, useState } from "react";
import { Tab, Nav } from "react-bootstrap";

import StableEdgePriceDay from "@/Components/Charts/StableEdgeVaultChart/StableEdgePriceDay";
import StableEdgePriceWeek from "@/Components/Charts/StableEdgeVaultChart/StableEdgePriceWeek";
import StableEdgePriceYear from "@/Components/Charts/StableEdgeVaultChart/StableEdgePriceYear";
import StableEdgePriceMonth from "@/Components/Charts/StableEdgeVaultChart/StableEdgePriceMonth";
import StableEdgeVaultApyMonth from "@/Components/Charts/StableEdgeVaultChart/StableEdgeVaultApyMonth";
import StableEdgeVaultApyYear from "@/Components/Charts/StableEdgeVaultChart/StableEdgeVaultApyYear";
import Link from "next/link";
import StableEdgePriceBar from "@/Components/Charts/StableEdgeVaultChart/StableEdgePriceBar";

const StableEdgeVault = () => {
  const [vaultApy, setvaultApy] = useState({});
  const [tvl, setTvl] = useState("");
  const [price, setPrice] = useState(true);
  const [apy, setApy] = useState(false);

  const [m, setM] = useState(null);
  const [w, setW] = useState(null);
  const [d, setD] = useState(null);
  const [q, setQ] = useState(null);
  const [hM, setHM] = useState(null);
  const [y, setY] = useState(null);
  const [tokenPerformance, setTokenPerformance] = useState(y);
  const [tokenPerformStat, setTokenPerformStat] = useState("1Y");
  const [apyP, setApyP] = useState(`${Math.abs(d)}`);

  useEffect(() => {
    setTokenPerformance(y);
  }, [y]);
  const [chartBar, setChartBar] = useState(false);
  useEffect(() => {
    setApyP(`${Math.abs(d)}`);
  }, [vaultApy]);

  const toggleChartBar = () => {
    setChartBar(!chartBar);
  };
  const handleSelectChange = (e) => {
    const value = e.target.value;

    if (isNaN(value) || value === undefined) {
      setApyP("");
    } else {
      setApyP(value);
    }
  };
  const handlePrice = () => {
    setPrice(true);
    setApy(false);
  };
  const handleApy = () => {
    setPrice(false);
    setApy(true);
  };
  const fetchVaultData = async () => {
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

      // Process the response data
      // console.log(responseData); // Access the specific field from the response

      // Do something with the data...
      // Convert performance metrics to "1d", "1w", "1m", "6m", "1y" format
      const performanceMetrics = responseData.data.fund.performanceMetrics;
      setvaultApy(responseData.data.fund.apy);
      setTvl(responseData.data.fund.totalValue);

      const formatLargeNumberP = (number) => {
        return new Intl.NumberFormat().format(number);
      };

      const longNumberToShort = (num) =>
        String(num).replace(/\B(?=(\d{3})+(?!\d))/g, ",");

      // Function to format percentage change with sign
      // const calculatePercentage = (value) => {
      //   return ((parseFloat(value) / 10 ** 18 - 1) * 100).toFixed(2);
      // };
      const calculatePercentage = (value) => {
        // Parse the value to float and divide by 10^18
        const percentageChange = parseFloat(value) / 10 ** 18;

        // Calculate the percentage change relative to 1 (subtract 1 to get the change)
        const change = (percentageChange - 1) * 100;

        // Format the change to 2 decimal places
        const formattedChange = change.toFixed(2);

        // Determine the sign (+ or -)
        const sign = change > 0 ? "+" : change < 0 ? "-" : "";

        // Return the formatted percentage change with sign
        return `${sign}${formattedChange}`;
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
        const units = ["", "k", "M", "B", "T"];
        const unitIndex = Math.floor((number.toString().length - 1) / 3);
        // console.log(unitIndex);

        const scaledNumber = number / Math.pow(1000, unitIndex);
        return scaledNumber.toFixed(1) + "K";
      };
      const totalValue = formatLargeNumber(responseData.data.fund.totalValue);
      // console.log(totalValue);
      const v = formatLargeNumberP(
        parseFloat(responseData.data.fund.totalValue) / 10 ** 18
      );

      // Process the response data
      setD(formattedPerformanceMetrics["1d"]);
      setM(formattedPerformanceMetrics["1m"]);
      setW(formattedPerformanceMetrics["1w"]);
      setQ(formattedPerformanceMetrics["1q"]);
      setHM(formattedPerformanceMetrics["6m"]);
      setY(formattedPerformanceMetrics["1y"]);
    } catch (error) {
      console.error("Error fetching GraphQL data:", error);
    }
  };
  useEffect(() => {
    fetchVaultData();
  }, []);
  return (
    <div className='vaults'>
      <div className='d-flex justify-content-between'>
        <div className='d-flex gap-4 w-100 align-items-start'>
          {/* <img src={img.src} alt='' /> */}
          <h3>Helion StableEdge</h3>
        </div>
        <div>
          <Link
            target='_blank'
            href='https://dhedge.org/vault/0xd0872b912b0e6eed2b1d5564b4bf146d0f2b2499'
          >
            <button className='thm_btn'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='20'
                height='20'
                viewBox='0 0 20 20'
                fill='none'
              >
                <g clipPath='url(#clip0_8_6454)'>
                  <path
                    d='M16.2011 13.0557C16.2012 13.0531 16.2011 13.0504 16.2011 13.0477L16.2066 4.80214C16.2064 4.73685 16.1991 4.67176 16.185 4.608L16.131 4.42466L16.0771 4.31679L16.0178 4.25746C15.9436 4.14985 15.8504 4.05665 15.7428 3.98243L15.6888 3.92851L15.6241 3.86379L15.4839 3.82064C15.4051 3.79731 15.3234 3.7846 15.2412 3.78288L6.95248 3.79908C6.40072 3.79688 5.95162 4.2424 5.94942 4.79416C5.9494 4.79681 5.94942 4.79947 5.94942 4.80214C5.96224 5.34774 6.40148 5.78698 6.9471 5.79982L11.8707 5.80521C12.0813 5.80728 12.2504 5.97968 12.2483 6.19028C12.2473 6.28826 12.2087 6.3821 12.1404 6.45235L4.11046 14.4822C3.72026 14.8724 3.72021 15.505 4.11036 15.8952C4.50052 16.2854 5.13307 16.2854 5.5233 15.8953L5.5234 15.8952L13.5533 7.86528C13.7043 7.71849 13.9457 7.72185 14.0925 7.87284C14.1608 7.94309 14.1995 8.03692 14.2004 8.13491L14.195 13.0478C14.2051 13.5975 14.6484 14.0407 15.1981 14.0508C15.7499 14.053 16.199 13.6075 16.2011 13.0557Z'
                    fill='white'
                  />
                </g>
                <defs>
                  <clipPath id='clip0_8_6454'>
                    <rect width='20' height='20' fill='white' />
                  </clipPath>
                </defs>
              </svg>
            </button>
          </Link>
        </div>
      </div>
      <div className='d-flex align-items-center gap-4 mt-16'>
        <div className='m_percentage'>
          <p>APR</p>
          <p className={`${tokenPerformance > 0 ? "green" : "red"}`}>
            {isNaN(tokenPerformance) || tokenPerformance === undefined
              ? ""
              : `${tokenPerformance > 0 ? "▲" : "▼"} ${Math.abs(
                  tokenPerformance
                )}% ${tokenPerformStat}`}
          </p>
        </div>
        <div className='m_total d-none'>
          <div className='m_total-head '>
            <div className='d-flex align-items-baseline gap-2'>
              <p>APR</p>
              <div className='custom_select'>
                <select
                  onChange={handleSelectChange}
                  name=''
                  id=''
                  defaultValue={d}
                >
                  <option value={`${Math.abs(d)}`}>1D </option>
                  <option value={vaultApy.weekly}>1W </option>
                  <option value={vaultApy.monthly}>1M </option>
                  <option value={`${Math.abs(y)}`}>1Y </option>
                </select>
              </div>
            </div>
            <div className='line'></div>
            {/* <div>
              <p
                style={{
                  lineHeight: "160%",
                  fontSize: "12px",
                  marginBottom: "10px",
                }}
              >
                The Annual Percentage Yield (APY) Is Extrapolated From The
                Previous Week.
              </p>
              <p
                style={{
                  lineHeight: "160%",
                  fontSize: "12px",
                  marginBottom: "10px",
                  display: "none",
                }}
              >
                The APY And Price Chart You See Have Already Taken All Fees Into
                Account.
              </p>
            </div> */}
          </div>
          <div className='pool-stats d-flex '>
            <div className='w-33'>
              <p>{apyP} %</p>
            </div>
            {/* <div className='w-33'>
              <p>
                $
                {String(tvl)
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  .slice(0, 9)}
              </p>
            </div> */}
            {/* <div className='w-33'> <img src={img_1.src} alt='' /></div> */}
          </div>
        </div>
      </div>
      <Tab.Container id='left-tabs-example' defaultActiveKey='priceYear'>
        <div className='pool_btn_group d-md-flex'>
          <div className='d-flex gap-4'>
            <div className='d-flex gap-2'>
              <button onClick={handlePrice} className={price ? "active" : ""}>
                APR
              </button>
              <button
                onClick={handleApy}
                className={apy ? "active d-none" : "d-none"}
              >
                APY
              </button>
            </div>

            <div className='pool_btn'>
              {price ? (
                <Nav variant='pills' className='flex'>
                  <Nav.Item>
                    <Nav.Link eventKey='priceDay'>
                      <button
                        onClick={() => {
                          setTokenPerformance(d);
                          setTokenPerformStat("1D");
                        }}
                        className='responsive-button short-text-day'
                      >
                        Day
                      </button>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey='priceWeek'>
                      <button
                        onClick={() => {
                          setTokenPerformance(w);
                          setTokenPerformStat("1W");
                        }}
                        className='responsive-button short-text-week'
                      >
                        Week
                      </button>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey='priceMonth'>
                      <button
                        onClick={() => {
                          setTokenPerformance(m);
                          setTokenPerformStat("1M");
                        }}
                        className='responsive-button short-text-month'
                      >
                        Month
                      </button>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey='priceYear'>
                      <button
                        onClick={() => {
                          setTokenPerformance(y);
                          setTokenPerformStat("1Y");
                        }}
                        className='responsive-button short-text-year'
                      >
                        Year
                      </button>
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              ) : null}
              {apy ? (
                <Nav variant='pills' className='flex'>
                  <Nav.Item>
                    <Nav.Link eventKey='apyMonth'>
                      <button
                        onClick={() => {
                          setTokenPerformance(m);
                          setTokenPerformStat("1M");
                        }}
                        className='responsive-button short-text-month'
                      >
                        Month
                      </button>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey='apyYear'>
                      <button
                        onClick={() => {
                          setTokenPerformance(y);
                          setTokenPerformStat("1Y");
                        }}
                        className='responsive-button short-text-year'
                      >
                        Year
                      </button>
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              ) : null}
            </div>
          </div>
          <div className='btn_pool'>
            {apy ? null : (
              <button
                className={`${chartBar ? "active" : "as"}  cursor-pointer`}
                onClick={toggleChartBar}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='16'
                  height='16'
                  viewBox='0 0 16 16'
                  fill='none'
                >
                  <path
                    d='M15.9908 2.67075C15.9432 2.20725 15.7182 1.79003 15.3572 1.4959C14.996 1.20162 14.5418 1.06581 14.0787 1.11347C13.1228 1.21181 12.425 2.07037 12.5232 3.02728C12.5579 3.36606 12.6879 3.67987 12.896 3.93925L11.2567 6.21987C11.011 6.1294 10.7461 6.09518 10.4781 6.12275C10.0471 6.16709 9.66893 6.36628 9.39215 6.65897L7.21768 5.50818C7.25606 5.33231 7.26806 5.14768 7.24868 4.95909C7.20112 4.49559 6.97612 4.07837 6.61515 3.78425C6.25396 3.49 5.80003 3.35425 5.33668 3.40181C4.38071 3.50018 3.68287 4.35872 3.78106 5.31562C3.81331 5.62968 3.92724 5.92234 4.10949 6.17003L2.41134 8.33575C2.14687 8.22546 1.85765 8.18206 1.56484 8.21215C0.60887 8.3105 -0.0889739 9.16903 0.00921359 10.126C0.0567761 10.5895 0.281807 11.0067 0.642776 11.3008C0.95662 11.5565 1.34053 11.6926 1.73978 11.6926C1.79996 11.6926 1.86056 11.6895 1.92128 11.6832C2.29731 11.6446 2.63306 11.4879 2.89646 11.2543L5.01971 12.631C4.95099 12.8502 4.92446 13.0865 4.94937 13.3292C4.99693 13.7927 5.22196 14.2099 5.58293 14.5041C5.89678 14.7598 6.28071 14.8958 6.67993 14.8958C6.74015 14.8958 6.80071 14.8927 6.86143 14.8865C7.8174 14.7882 8.51521 13.9296 8.41703 12.9727C8.36946 12.5092 8.14446 12.092 7.78349 11.7978C7.42231 11.5036 6.9684 11.3678 6.50503 11.4154C6.12899 11.4541 5.79324 11.6107 5.52984 11.8444L3.40659 10.4677C3.47531 10.2484 3.50181 10.0122 3.4769 9.76947C3.44465 9.4554 3.33074 9.16272 3.14846 8.91506L4.84662 6.74934C5.05621 6.83675 5.28134 6.88228 5.51162 6.88228C5.57184 6.88228 5.6324 6.87918 5.69312 6.87293C6.12409 6.82859 6.50224 6.62943 6.77899 6.33672L8.95346 7.4875C8.91509 7.66337 8.90309 7.848 8.92243 8.03659C8.97 8.50009 9.19503 8.91731 9.55599 9.21143C9.86984 9.46715 10.2537 9.60318 10.653 9.60318C10.7132 9.60318 10.7738 9.60009 10.8345 9.59384C11.7905 9.4955 12.4883 8.63697 12.3901 7.68003C12.3553 7.34125 12.2254 7.0274 12.0172 6.76806L13.6565 4.48756C13.8466 4.55753 14.0481 4.59393 14.2537 4.59393C14.3139 4.59393 14.3745 4.59084 14.4352 4.58459C15.3911 4.48618 16.0889 3.62765 15.9908 2.67075ZM1.82531 10.7506C1.61124 10.7725 1.40174 10.7099 1.23493 10.574C1.0679 10.4379 0.963807 10.2448 0.941807 10.0302C0.89637 9.58743 1.21887 9.19018 1.66078 9.14475C1.68878 9.14187 1.71671 9.14043 1.74453 9.14043C1.92881 9.14043 2.10615 9.20328 2.25112 9.3214C2.41815 9.45743 2.52224 9.65056 2.54424 9.86512C2.58968 10.3079 2.26718 10.7052 1.82531 10.7506ZM6.6009 12.348C6.6289 12.3451 6.65684 12.3437 6.68465 12.3437C6.86893 12.3437 7.04628 12.4065 7.19124 12.5246C7.35828 12.6607 7.46237 12.8538 7.48437 13.0684C7.52981 13.5112 7.20731 13.9084 6.76543 13.9539C6.55146 13.9758 6.34187 13.9132 6.17506 13.7772C6.00803 13.6412 5.90393 13.4481 5.88193 13.2335C5.83649 12.7907 6.15906 12.3934 6.6009 12.348ZM5.59712 5.94031C5.38315 5.96228 5.17353 5.89956 5.00674 5.76365C4.83971 5.62759 4.73562 5.43447 4.71362 5.2199C4.66818 4.77709 4.99071 4.37984 5.43259 4.33437C5.46059 4.3315 5.48853 4.33006 5.51634 4.33006C5.70062 4.33006 5.87796 4.3929 6.02293 4.51103C6.18996 4.64709 6.29406 4.84022 6.31606 5.05478C6.36149 5.49759 6.03899 5.89484 5.59712 5.94031ZM10.7385 8.66122C10.5245 8.68315 10.3149 8.62047 10.1481 8.48459C9.98109 8.34853 9.877 8.1554 9.85499 7.94084C9.80956 7.49803 10.1321 7.10078 10.574 7.05531C10.602 7.05243 10.6299 7.051 10.6577 7.051C10.842 7.051 11.0194 7.11384 11.1643 7.23197C11.3313 7.36803 11.4354 7.56112 11.4575 7.77572C11.5029 8.21853 11.1804 8.61578 10.7385 8.66122ZM14.3392 3.65197C14.1254 3.6739 13.9157 3.61125 13.7489 3.47531C13.5818 3.33925 13.4777 3.14612 13.4557 2.93156C13.4103 2.48875 13.7328 2.0915 14.1747 2.04603C14.2027 2.04315 14.2307 2.04172 14.2584 2.04172C14.4427 2.04172 14.6201 2.10456 14.7651 2.22268C14.9321 2.35875 15.0362 2.55187 15.0582 2.76643C15.1036 3.20925 14.7811 3.6065 14.3392 3.65197Z'
                    fill='black'
                  />
                </svg>
              </button>
            )}
            <button className='active d-none'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='16'
                height='16'
                viewBox='0 0 16 16'
                fill='none'
              >
                <path
                  d='M6.74987 14.75C6.61726 14.75 6.49009 14.6973 6.39632 14.6036C6.30255 14.5098 6.24987 14.3826 6.24987 14.25V9.4425L1.61487 4.345C1.43242 4.14394 1.31224 3.89424 1.26893 3.62621C1.22563 3.35818 1.26105 3.08334 1.3709 2.83505C1.48075 2.58676 1.66031 2.37569 1.88778 2.22746C2.11526 2.07923 2.38087 2.00021 2.65237 2H13.3474C13.6189 2.00021 13.8845 2.07923 14.112 2.22746C14.3394 2.37569 14.519 2.58676 14.6288 2.83505C14.7387 3.08334 14.7741 3.35818 14.7308 3.62621C14.6875 3.89424 14.5673 4.14394 14.3849 4.345L9.74987 9.4425V12.25C9.74983 12.3249 9.73295 12.3988 9.7005 12.4663C9.66805 12.5338 9.62084 12.5932 9.56237 12.64L7.06237 14.64C6.97373 14.7111 6.86351 14.7499 6.74987 14.75ZM2.65237 3C2.57457 3.00019 2.49849 3.02293 2.43334 3.06547C2.36819 3.108 2.31676 3.16851 2.28529 3.23966C2.25381 3.31082 2.24363 3.38957 2.25598 3.46639C2.26833 3.54321 2.30268 3.6148 2.35487 3.6725L7.11987 8.9225C7.20151 9.01227 7.24771 9.12868 7.24987 9.25V13.21L8.74987 12V9.25C8.74957 9.12522 8.79594 9.00484 8.87987 8.9125L13.6449 3.6625C13.694 3.60454 13.7256 3.53387 13.7363 3.45867C13.7469 3.38346 13.736 3.30679 13.7049 3.2375C13.6738 3.16821 13.6237 3.10914 13.5604 3.06712C13.4972 3.02509 13.4233 3.00182 13.3474 3H2.65237Z'
                  fill='black'
                />
              </svg>
            </button>
            <button className='active d-none'>1d</button>
          </div>
        </div>
        <Tab.Content>
          <Tab.Pane eventKey='priceDay'>
            {chartBar ? (
              <StableEdgePriceBar period='1d' interval='1h' />
            ) : (
              <StableEdgePriceDay />
            )}
          </Tab.Pane>
          <Tab.Pane eventKey='priceWeek'>
            {chartBar ? (
              <StableEdgePriceBar period='1w' interval='4h' />
            ) : (
              <StableEdgePriceWeek />
            )}
          </Tab.Pane>
          <Tab.Pane eventKey='priceMonth'>
            {chartBar ? (
              <StableEdgePriceBar period='1m' interval='1d' />
            ) : (
              <StableEdgePriceMonth />
            )}
          </Tab.Pane>
          <Tab.Pane eventKey='priceYear'>
            {chartBar ? (
              <StableEdgePriceBar period='1y' interval='1w' />
            ) : (
              <StableEdgePriceYear />
            )}
          </Tab.Pane>

          <Tab.Pane eventKey='apyMonth'>
            <StableEdgeVaultApyMonth />
          </Tab.Pane>
          <Tab.Pane eventKey='apyYear'>
            <StableEdgeVaultApyYear />
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </div>
  );
};

export default StableEdgeVault;
