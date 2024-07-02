import React from "react";
import { Container } from "react-bootstrap";
import product_1 from "../../app/assets/images/product-1.png";
import product_2 from "../../app/assets/images/product-2.png";
import Link from "next/link";

const OurProducts = () => {
  return (
    <div className='our_products'>
      <Container>
        <h2>Our Products</h2>
        <div className=' d-md-flex justify-content-center gap-60'>
          <Link href='https://prime-allocation.fund/' target='_blank'>
            <img src={product_1.src} alt='' />
          </Link>
          <Link href='https://www.helion-innovault.fund/' target='_blank'>
            <img src={product_2.src} alt='' />
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default OurProducts;
