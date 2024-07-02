// import Sun from "./Sun.svg";
// import Moon from "./Moon.svg";
// import { ReactComponent as Sun } from "./Sun.svg";
// import { ReactComponent as Moon } from "./Moon.svg";
"use client";

import { ThemeContext } from "@/ThemeProvider/ThemeProvider";
import "./DarkMode.css";
import { useContext, useEffect } from "react";

const DarkMode = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  // useEffect(() => {
  //   if (theme === "dark") {
  //     document.documentElement.classList.add("dark");
  //     document.documentElement.classList.remove("light");
  //     localStorage.setItem("theme", "dark");
  //   } else {
  //     document.documentElement.classList.remove("dark");
  //     document.documentElement.classList.add("light");
  //     localStorage.setItem("theme", "light");
  //   }
  // }, [theme]); // Moved the dependency array inside useEffect

  const handleThemeSwitch = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  // console.log(theme);
  return (
    <div className='dark_mode'>
      <input
        className='dark_mode_input'
        type='checkbox'
        id='darkmode-toggle'
        defaultChecked={theme === "dark"}
        onClick={handleThemeSwitch}
      />
      <label className='dark_mode_label' htmlFor='darkmode-toggle'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='16'
          height='16'
          viewBox='0 0 16 16'
          fill='none'
          className='sun'
        >
          <g clipPath='url(#clip0_6_5985)'>
            <path
              d='M4.03659 3.09328L3.77659 2.83328C3.51659 2.57328 3.09659 2.57995 2.84326 2.83328L2.83659 2.83995C2.57659 3.09995 2.57659 3.51995 2.83659 3.77328L3.09659 4.03328C3.35659 4.29328 3.76992 4.29328 4.02992 4.03328L4.03659 4.02662C4.29659 3.77328 4.29659 3.34662 4.03659 3.09328ZM2.00992 7.33328H1.32992C0.963255 7.33328 0.669922 7.62662 0.669922 7.99328V7.99995C0.669922 8.36662 0.963255 8.65995 1.32992 8.65995H2.00326C2.37659 8.66662 2.66992 8.37328 2.66992 8.00662V7.99995C2.66992 7.62662 2.37659 7.33328 2.00992 7.33328ZM8.00992 0.699951H8.00326C7.62992 0.699951 7.33659 0.993284 7.33659 1.35995V1.99995C7.33659 2.36662 7.62992 2.65995 7.99659 2.65995H8.00326C8.37659 2.66662 8.66992 2.37328 8.66992 2.00662V1.35995C8.66992 0.993284 8.37659 0.699951 8.00992 0.699951ZM13.1699 2.83995C12.9099 2.57995 12.4899 2.57995 12.2299 2.83328L11.9699 3.09328C11.7099 3.35328 11.7099 3.77328 11.9699 4.02662L11.9766 4.03328C12.2366 4.29328 12.6566 4.29328 12.9099 4.03328L13.1699 3.77328C13.4299 3.51328 13.4299 3.09995 13.1699 2.83995ZM11.9633 12.9066L12.2233 13.1666C12.4833 13.4266 12.9033 13.4266 13.1633 13.1666C13.4233 12.9066 13.4233 12.4866 13.1633 12.2266L12.9033 11.9666C12.6433 11.7066 12.2233 11.7133 11.9699 11.9666C11.7033 12.2333 11.7033 12.6466 11.9633 12.9066ZM13.3366 7.99328V7.99995C13.3366 8.36662 13.6299 8.65995 13.9966 8.65995H14.6699C15.0366 8.65995 15.3299 8.36662 15.3299 7.99995V7.99328C15.3299 7.62662 15.0366 7.33328 14.6699 7.33328H13.9966C13.6299 7.33328 13.3366 7.62662 13.3366 7.99328ZM8.00326 3.99995C5.79659 3.99995 4.00326 5.79328 4.00326 7.99995C4.00326 10.2066 5.79659 12 8.00326 12C10.2099 12 12.0033 10.2066 12.0033 7.99995C12.0033 5.79328 10.2099 3.99995 8.00326 3.99995ZM7.99659 15.3H8.00326C8.36992 15.3 8.66326 15.0066 8.66326 14.64V14C8.66326 13.6333 8.36992 13.34 8.00326 13.34H7.99659C7.62992 13.34 7.33659 13.6333 7.33659 14V14.64C7.33659 15.0066 7.62992 15.3 7.99659 15.3ZM2.83659 13.16C3.09659 13.42 3.51659 13.42 3.77659 13.16L4.03659 12.9C4.29659 12.64 4.28992 12.22 4.03659 11.9666L4.02992 11.96C3.76992 11.7 3.34992 11.7 3.08992 11.96L2.82992 12.22C2.57659 12.4866 2.57659 12.9 2.83659 13.16Z'
              fill='#F2C050'
            />
          </g>
          <defs>
            <clipPath id='clip0_6_5985'>
              <rect width='16' height='16' fill='white' />
            </clipPath>
          </defs>
        </svg>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='16'
          height='16'
          viewBox='0 0 16 16'
          fill='none'
          className='moon'
        >
          <path
            d='M7.35465 2.0178C4.35465 2.34446 2.01465 4.89113 2.01465 7.98446C2.01465 11.2978 4.70132 13.9845 8.01465 13.9845C11.1013 13.9845 13.648 11.6511 13.9813 8.65113C14.0413 8.12446 13.4613 7.70446 12.9546 8.0178C12.3946 8.3778 11.728 8.58446 11.0146 8.58446C9.02798 8.58446 7.41465 6.97113 7.41465 4.98446C7.41465 4.2778 7.62132 3.61113 7.97465 3.0578C8.27465 2.61113 7.94798 1.97113 7.35465 2.0178Z'
            fill='#181A20'
          />
        </svg>
      </label>
    </div>
  );
};

export default DarkMode;
