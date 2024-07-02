"use client";
import React, { useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import arrow from "../../app/assets/images/fi_271228.png";
import network from "../../app/assets/images/Rectangle 3467615.png";
// import vault from "../../app/assets/images/image 888.png";

import { ThemeContext } from "@/ThemeProvider/ThemeProvider";

const LeaderBoard = () => {
  const { leaderBoardData } = useContext(ThemeContext);
  const [data, setData] = useState(leaderBoardData);
  const [sortByManaged, setSortByManaged] = useState({
    ascending: true,
    active: false,
  });
  const [sortByD, setSortByD] = useState({ ascending: true, active: false });
  const [sortByW, setSortByW] = useState({ ascending: true, active: false });
  const [sortByM, setSortByM] = useState({ ascending: true, active: false });
  const [sortByY, setSortByY] = useState({ ascending: true, active: false });
  const [sortByT, setSortByT] = useState({ ascending: true, active: false });

  const [searchQuery, setSearchQuery] = useState("");

  // console.log(leaderBoardData);

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

  // Function to sort data by the "Managed" column
  const sortDataByManaged = (data, ascending) => {
    const sortedData = [...data];
    sortedData.sort((a, b) => {
      const parsedA = a.managed / 1000;
      const parsedB = b.managed / 1000;

      return ascending ? parsedA - parsedB : parsedB - parsedA;
    });
    return sortedData;
  };
  const sortDataByD = (data, ascending) => {
    const sortedData = [...data];
    sortedData.sort((a, b) => {
      const parsedA = a.d;
      const parsedB = b.d;

      return ascending ? parsedA - parsedB : parsedB - parsedA;
    });
    return sortedData;
  };
  const sortDataByW = (data, ascending) => {
    const sortedData = [...data];
    sortedData.sort((a, b) => {
      const parsedA = a.w;
      const parsedB = b.w;

      return ascending ? parsedA - parsedB : parsedB - parsedA;
    });
    return sortedData;
  };
  const sortDataByM = (data, ascending) => {
    const sortedData = [...data];
    sortedData.sort((a, b) => {
      const parsedA = a.m;
      const parsedB = b.m;

      return ascending ? parsedA - parsedB : parsedB - parsedA;
    });
    return sortedData;
  };
  const sortDataByY = (data, ascending) => {
    const sortedData = [...data];
    sortedData.sort((a, b) => {
      const parsedA = a.y;
      const parsedB = b.y;

      return ascending ? parsedA - parsedB : parsedB - parsedA;
    });
    return sortedData;
  };
  const sortDataByT = (data, ascending) => {
    const sortedData = [...data];
    sortedData.sort((a, b) => {
      const parsedA = a.total;
      const parsedB = b.total;

      return ascending ? parsedA - parsedB : parsedB - parsedA;
    });
    return sortedData;
  };

  // Function to toggle sorting direction
  const toggleSortDirection = () => {
    setSortByManaged((prevState) => ({
      ascending: !prevState.ascending,
      active: true,
    }));
  };
  const toggleSortDirectionD = () => {
    setSortByD((prevState) => ({
      ascending: !prevState.ascending,
      active: true,
    }));
  };
  const toggleSortDirectionW = () => {
    setSortByW((prevState) => ({
      ascending: !prevState.ascending,
      active: true,
    }));
  };
  const toggleSortDirectionM = () => {
    setSortByM((prevState) => ({
      ascending: !prevState.ascending,
      active: true,
    }));
  };

  const toggleSortDirectionY = () => {
    setSortByY((prevState) => ({
      ascending: !prevState.ascending,
      active: true,
    }));
  };
  const toggleSortDirectionT = () => {
    setSortByT((prevState) => ({
      ascending: !prevState.ascending,
      active: true,
    }));
  };

  useEffect(() => {
    setData(leaderBoardData);
  }, [leaderBoardData]);
  useEffect(() => {
    setData(sortDataByManaged(data, sortByManaged.ascending));
    // setData(sortDataByD(leaderBoardData, sortByD.ascending));
  }, [sortByManaged]);
  useEffect(() => {
    // setData(sortDataByManaged(data, sortByManaged.ascending));
    setData(sortDataByD(data, sortByD.ascending));
  }, [sortByD]);
  useEffect(() => {
    // setData(sortDataByManaged(data, sortByManaged.ascending));
    setData(sortDataByW(data, sortByW.ascending));
  }, [sortByW]);
  useEffect(() => {
    // setData(sortDataByManaged(data, sortByManaged.ascending));
    setData(sortDataByM(data, sortByM.ascending));
  }, [sortByM]);
  useEffect(() => {
    // setData(sortDataByManaged(data, sortByManaged.ascending));
    setData(sortDataByY(data, sortByY.ascending));
  }, [sortByY]);
  useEffect(() => {
    // setData(sortDataByManaged(data, sortByManaged.ascending));
    setData(sortDataByT(data, sortByT.ascending));
  }, [sortByT]);

  const filteredData = data.filter((item) =>
    item?.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className='leader_board'>
      <Container>
        <h2>Leaderboard</h2>
        <div className='d-lg-flex justify-content-between'>
          <button className='btn_all'>
            <div className='inside'>All</div>
          </button>
          <div className='search'>
            <input
              type='text'
              placeholder='Search Vault'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              className='search_icon'
            >
              <path
                d='M20.7263 19.3951L16.289 14.9395C17.4299 13.6301 18.055 11.9826 18.055 10.2675C18.055 6.26026 14.6781 3 10.5275 3C6.37691 3 3 6.26026 3 10.2675C3 14.2747 6.37691 17.535 10.5275 17.535C12.0857 17.535 13.5706 17.0812 14.8401 16.2199L19.3111 20.7093C19.498 20.8967 19.7494 21 20.0187 21C20.2737 21 20.5156 20.9062 20.6992 20.7355C21.0893 20.3731 21.1017 19.7721 20.7263 19.3951ZM10.5275 4.89587C13.5955 4.89587 16.0913 7.30552 16.0913 10.2675C16.0913 13.2295 13.5955 15.6391 10.5275 15.6391C7.45956 15.6391 4.9637 13.2295 4.9637 10.2675C4.9637 7.30552 7.45956 4.89587 10.5275 4.89587Z'
                fill='black'
              />
            </svg>
          </div>
        </div>
        <div className='table-responsive leader_table'>
          <table className='table'>
            <thead>
              <tr>
                <th scope='col'>Network</th>
                <th scope='col'>Vault</th>
                <th
                  scope='col'
                  style={{ minWidth: "150px" }}
                  className='cursor-pointer d-none'
                  onClick={() => {
                    toggleSortDirection();
                    sortDataByManaged();
                  }}
                >
                  Managed{" "}
                  {sortByManaged.active ? (
                    sortByManaged.ascending ? (
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth='1.5'
                        stroke='currentColor'
                        aria-hidden='true'
                        className='tw-inline-block tw-h-4 tw-w-4 tw-text-blue w-10'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M12 4.5v15m0 0 6.75-6.75M12 19.5l-6.75-6.75'
                        ></path>
                      </svg>
                    ) : (
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth='1.5'
                        stroke='currentColor'
                        aria-hidden='true'
                        className='tw-inline-block tw-h-4 tw-w-4 tw-text-blue w-10'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M12 19.5v-15m0 0-6.75 6.75M12 4.5l6.75 6.75'
                        ></path>
                      </svg>
                    )
                  ) : (
                    <img src={arrow.src} alt='' />
                  )}
                </th>
                <th
                  scope='col'
                  style={{ minWidth: "150px" }}
                  className='cursor-pointer'
                  onClick={() => {
                    toggleSortDirectionD();
                    sortDataByD();
                  }}
                >
                  1D{" "}
                  {sortByD.active ? (
                    sortByD.ascending ? (
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth='1.5'
                        stroke='currentColor'
                        aria-hidden='true'
                        className='tw-inline-block tw-h-4 tw-w-4 tw-text-blue w-10'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M12 4.5v15m0 0 6.75-6.75M12 19.5l-6.75-6.75'
                        ></path>
                      </svg>
                    ) : (
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth='1.5'
                        stroke='currentColor'
                        aria-hidden='true'
                        className='tw-inline-block tw-h-4 tw-w-4 tw-text-blue w-10'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M12 19.5v-15m0 0-6.75 6.75M12 4.5l6.75 6.75'
                        ></path>
                      </svg>
                    )
                  ) : (
                    <img src={arrow.src} alt='' />
                  )}
                </th>
                <th
                  scope='col'
                  style={{ minWidth: "120px" }}
                  className='cursor-pointer'
                  onClick={() => {
                    toggleSortDirectionW();
                    sortDataByW();
                  }}
                >
                  1W{" "}
                  {sortByW.active ? (
                    sortByW.ascending ? (
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth='1.5'
                        stroke='currentColor'
                        aria-hidden='true'
                        className='tw-inline-block tw-h-4 tw-w-4 tw-text-blue w-10'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M12 4.5v15m0 0 6.75-6.75M12 19.5l-6.75-6.75'
                        ></path>
                      </svg>
                    ) : (
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth='1.5'
                        stroke='currentColor'
                        aria-hidden='true'
                        className='tw-inline-block tw-h-4 tw-w-4 tw-text-blue w-10'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M12 19.5v-15m0 0-6.75 6.75M12 4.5l6.75 6.75'
                        ></path>
                      </svg>
                    )
                  ) : (
                    <img src={arrow.src} alt='' />
                  )}
                </th>
                <th
                  scope='col'
                  style={{ minWidth: "120px" }}
                  className='cursor-pointer'
                  onClick={() => {
                    toggleSortDirectionM();
                    sortDataByM();
                  }}
                >
                  1M{" "}
                  {sortByM.active ? (
                    sortByM.ascending ? (
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth='1.5'
                        stroke='currentColor'
                        aria-hidden='true'
                        className='tw-inline-block tw-h-4 tw-w-4 tw-text-blue w-10'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M12 4.5v15m0 0 6.75-6.75M12 19.5l-6.75-6.75'
                        ></path>
                      </svg>
                    ) : (
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth='1.5'
                        stroke='currentColor'
                        aria-hidden='true'
                        className='tw-inline-block tw-h-4 tw-w-4 tw-text-blue w-10'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M12 19.5v-15m0 0-6.75 6.75M12 4.5l6.75 6.75'
                        ></path>
                      </svg>
                    )
                  ) : (
                    <img src={arrow.src} alt='' />
                  )}
                </th>
                <th
                  scope='col'
                  style={{ minWidth: "120px" }}
                  className='cursor-pointer'
                  onClick={() => {
                    toggleSortDirectionY();
                    sortDataByY();
                  }}
                >
                  1Y{" "}
                  {sortByY.active ? (
                    sortByY.ascending ? (
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth='1.5'
                        stroke='currentColor'
                        aria-hidden='true'
                        className='tw-inline-block tw-h-4 tw-w-4 tw-text-blue w-10'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M12 4.5v15m0 0 6.75-6.75M12 19.5l-6.75-6.75'
                        ></path>
                      </svg>
                    ) : (
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth='1.5'
                        stroke='currentColor'
                        aria-hidden='true'
                        className='tw-inline-block tw-h-4 tw-w-4 tw-text-blue w-10'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M12 19.5v-15m0 0-6.75 6.75M12 4.5l6.75 6.75'
                        ></path>
                      </svg>
                    )
                  ) : (
                    <img src={arrow.src} alt='' />
                  )}
                </th>
                <th
                  scope='col'
                  style={{ minWidth: "120px" }}
                  className='cursor-pointer d-none'
                  onClick={() => {
                    toggleSortDirectionT();
                    sortDataByT();
                  }}
                >
                  Total{" "}
                  {sortByT.active ? (
                    sortByT.ascending ? (
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth='1.5'
                        stroke='currentColor'
                        aria-hidden='true'
                        className='tw-inline-block tw-h-4 tw-w-4 tw-text-blue w-10'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M12 4.5v15m0 0 6.75-6.75M12 19.5l-6.75-6.75'
                        ></path>
                      </svg>
                    ) : (
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth='1.5'
                        stroke='currentColor'
                        aria-hidden='true'
                        className='tw-inline-block tw-h-4 tw-w-4 tw-text-blue w-10'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M12 19.5v-15m0 0-6.75 6.75M12 4.5l6.75 6.75'
                        ></path>
                      </svg>
                    )
                  ) : (
                    <img src={arrow.src} alt='' />
                  )}
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredData?.map((data, index) => (
                <tr key={index}>
                  <td className='tw-bg-black-medium' scope='row'>
                    <img src={network.src} alt='' />
                  </td>
                  <td
                    className='tw-bg-black-medium'
                    style={{ display: "flex", gap: "10px" }}
                  >
                    <div>
                      <img src={data.image.src} alt='' />
                    </div>
                    <div>
                      <h5>{data.name}</h5>
                      <p>dHEDGE</p>
                    </div>
                  </td>
                  <td
                    className='tw-bg-black-medium d-none'
                    style={{ color: "#000" }}
                  >
                    ${formatLargeNumber(data.managed)}
                  </td>
                  <td
                    className='tw-bg-black-medium'
                    style={{ color: data.d < 0 ? "#DE0A0A" : "#01A412" }}
                  >
                    {data.d}%
                  </td>
                  <td
                    className='tw-bg-black-medium'
                    style={{ color: data.w < 0 ? "#DE0A0A" : "#01A412" }}
                  >
                    {data.w}%
                  </td>
                  <td
                    className='tw-bg-black-medium'
                    style={{ color: data.m < 0 ? "#DE0A0A" : "#01A412" }}
                  >
                    {data.m}%
                  </td>

                  <td
                    className='tw-bg-black-medium'
                    style={{ color: data.y < 0 ? "#DE0A0A" : "#01A412" }}
                  >
                    {data.y}%
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
                tw-cursor-pointer d-none'
                    style={{ color: "#000" }}
                  >
                    {data.total}%
                  </td>
                </tr>
              ))}
              {/* <tr>
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
                    <h5>Helion data</h5>
                    <p>dHEDGE</p>
                  </div>
                </td>
                <td className='tw-bg-black-medium' style={{ color: "#000" }}>
                  ${data.managed}
                </td>
                <td
                  className='tw-bg-black-medium'
                  style={{ color: data.d < 0 ? "#DE0A0A" : "#01A412" }}
                >
                  {data.d}
                </td>
                <td
                  className='tw-bg-black-medium'
                  style={{ color: data.w < 0 ? "#DE0A0A" : "#01A412" }}
                >
                  {data.w}
                </td>
                <td
                  className='tw-bg-black-medium'
                  style={{ color: data.m < 0 ? "#DE0A0A" : "#01A412" }}
                >
                  {data.m}
                </td>

                <td
                  className='tw-bg-black-medium'
                  style={{ color: data.y < 0 ? "#DE0A0A" : "#01A412" }}
                >
                  {data.y}
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
                  {data.total}
                </td>
              </tr>
              <PerpetualRow />
              <StableEdgeRow /> */}
              {/* <EtherumEdgeRow /> */}
            </tbody>
          </table>
        </div>
      </Container>
    </div>
  );
};

export default LeaderBoard;
