import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import logo from "../../app/assets/images/footer_logo.png";
import location from "../../app/assets/images/mdi_location.png";
import call from "../../app/assets/images/002-viber 1.png";
import email from "../../app/assets/images/003-email 1.png";
import Link from "next/link";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className='footer'>
      <Container>
        <Row>
          <Col xs={12} xl={3}>
            <img src={logo.src} alt='' />
            <p>
              Helion EDGE: Elevate your trading with our advanced automated
              strategies.
            </p>
            <div className='socials'>
              <Link
                target='blank'
                href='https://www.linkedin.com/company/helion-edge/'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='45'
                  height='45'
                  viewBox='0 0 45 45'
                  fill='none'
                >
                  <path
                    opacity='0.25'
                    d='M44 22.5C44 34.3741 34.3741 44 22.5 44C10.6259 44 1 34.3741 1 22.5C1 10.6259 10.6259 1 22.5 1C34.3741 1 44 10.6259 44 22.5Z'
                    stroke='white'
                    strokeWidth='2'
                    className='path'
                  />
                  <path
                    d='M18 20C19.1046 20 20 19.1046 20 18C20 16.8954 19.1046 16 18 16C16.8954 16 16 16.8954 16 18C16 19.1046 16.8954 20 18 20Z'
                    fill='white'
                  />
                  <path
                    d='M19.6667 21H16.3333C16.1493 21 16 21.126 16 21.2812V29.7188C16 29.874 16.1493 30 16.3333 30H19.6667C19.8507 30 20 29.874 20 29.7188V21.2812C20 21.126 19.8507 21 19.6667 21Z'
                    fill='white'
                  />
                  <path
                    d='M27.9733 20.183C26.7712 19.7524 25.2677 20.1306 24.366 20.8089C24.3351 20.6824 24.2248 20.5883 24.0938 20.5883H21.2812C21.126 20.5883 21 20.72 21 20.8824V29.7059C21 29.8682 21.126 30 21.2812 30H24.0938C24.249 30 24.375 29.8682 24.375 29.7059V23.3647C24.8295 22.9553 25.4151 22.8247 25.8943 23.0377C26.3589 23.243 26.625 23.7441 26.625 24.4118V29.7059C26.625 29.8682 26.751 30 26.9062 30H29.7188C29.874 30 30 29.8682 30 29.7059V23.8194C29.9679 21.4024 28.8806 20.5077 27.9733 20.183Z'
                    fill='white'
                  />
                </svg>
              </Link>
              <Link target='blank' href='https://x.com/HelionEdge'>
                <div className='twitter'>
                  <FaXTwitter color='#FFF' />
                </div>
              </Link>
            </div>
          </Col>
          <Col xs={12} xl={2}>
            <h3>Pages</h3>
            <ul className='pages'>
              <li>
                <a href=''>About Us</a>
              </li>
              <li>
                <a href=''>How it Works</a>
              </li>
              <li>
                <a href=''>Partners</a>
              </li>
              <li>
                <a href=''>Start Your Journey</a>
              </li>
            </ul>
          </Col>
          <Col xs={12} xl={3}>
            <h3>Quick Links</h3>
            <ul className='links'>
              <li>
                <a href='' style={{ display: "flex", gap: "20px" }}>
                  <span style={{ display: "inline-block" }}>
                    <img src={location.src} alt='' />{" "}
                  </span>
                  <span style={{ display: "inline-block", maxWidth: "241px" }}>
                    Burj Daman Tower, Dubai, UAE Office 1102C
                  </span>
                </a>
              </li>
              <li>
                <a href='tel:+971045480355'>
                  <img style={{ marginRight: "20px" }} src={call.src} alt='' />{" "}
                  +971 (0)4 548 0355
                </a>
              </li>
              <li>
                <a href='mailto:contact@helion-edge.com'>
                  <img style={{ marginRight: "20px" }} src={email.src} alt='' />{" "}
                  contact@helion-edge.com
                </a>
              </li>
            </ul>
          </Col>
          <Col xs={12} xl={4}>
            <h3>Newsletter</h3>
            <p style={{ maxWidth: "326px" }}>
              Subscribe and stay up-to-date on the latest news.
            </p>
            <div className='d-flex'>
              <input type='text' placeholder='Enter your email' />
              <button type='submit' className='thm_btn lets_talk_btn'>
                Lets Talk
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='20'
                  height='20'
                  viewBox='0 0 20 20'
                  fill='none'
                >
                  <g clipPath='url(#clip0_6_5618)'>
                    <path
                      d='M16.2011 13.0557C16.2012 13.0531 16.2011 13.0504 16.2011 13.0477L16.2066 4.80214C16.2064 4.73685 16.1991 4.67176 16.185 4.608L16.131 4.42466L16.0771 4.31679L16.0178 4.25746C15.9436 4.14985 15.8504 4.05665 15.7428 3.98243L15.6888 3.92851L15.6241 3.86379L15.4839 3.82064C15.4051 3.79731 15.3234 3.7846 15.2412 3.78288L6.95248 3.79908C6.40072 3.79688 5.95162 4.2424 5.94942 4.79416C5.9494 4.79681 5.94942 4.79947 5.94942 4.80214C5.96224 5.34774 6.40148 5.78698 6.9471 5.79982L11.8707 5.80521C12.0813 5.80728 12.2504 5.97968 12.2483 6.19028C12.2473 6.28826 12.2087 6.3821 12.1404 6.45235L4.11046 14.4822C3.72026 14.8724 3.72021 15.505 4.11036 15.8952C4.50052 16.2854 5.13307 16.2854 5.5233 15.8953L5.5234 15.8952L13.5533 7.86528C13.7043 7.71849 13.9457 7.72185 14.0925 7.87284C14.1608 7.94309 14.1995 8.03692 14.2004 8.13491L14.195 13.0478C14.2051 13.5975 14.6484 14.0407 15.1981 14.0508C15.7499 14.053 16.199 13.6075 16.2011 13.0557Z'
                      fill='white'
                    />
                  </g>
                  <defs>
                    <clipPath id='clip0_6_5618'>
                      <rect width='20' height='20' fill='white' />
                    </clipPath>
                  </defs>
                </svg>
              </button>
            </div>
          </Col>
        </Row>
        <hr className='footer_line' />
        <p className='copyright'>@2024 Helion Edge. all rights reserved.</p>
      </Container>
    </footer>
  );
};

export default Footer;
