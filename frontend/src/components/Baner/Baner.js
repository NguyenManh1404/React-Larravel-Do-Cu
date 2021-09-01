import React from 'react';
import "./baner.css";
import { Row } from "react-bootstrap";
import Marquee from "react-fast-marquee";
// import Sticky from 'react-sticky-el';
export default function Baner() {
 return (
        <>
          <header>
          <Row className="run_text">
            <Marquee>
              <i>"MTK SHOP" </i> là nơi chia sẻ và tạo ra những giá trị mới cho những đồ dùng cũ, để nó mãi trường tồn với thời gian
            </Marquee>
             </Row>
          </header>
       </>
 );
}