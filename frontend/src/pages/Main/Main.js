import React from 'react';
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import {Row} from "react-bootstrap";
import "./main.css";

import Noibat from "./Noibat";
import Banchay from './Banchay';
import Danhmuc from './Danhmuc';
import Tintuc from './Tintuc';
import Dichvu from './Dichvu';


import Slide from "../../components/Slide/Slide";
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import Sell from './Sell/Sell';
import { useEffect, useState } from "react";
import Scroll from '../../scroll/Scroll';
export default function Main() {

//   useEffect(() => {

//     window.scrollTo(0, 0)


// }, []);

 return (
   <div>
     <ReactNotification/>
     <Header></Header>
     <Scroll/>
     <Slide/>
        {/* Sản phẩm nổi bật */}

        <Row className="noibat">
          
        <Noibat  />
        </Row>
        <Row className="banchay">
          
          <Banchay/>
          </Row>
          <Row className="docu">
          <Danhmuc/>
          </Row>
          <Tintuc/>
          <Dichvu/>
          <Sell/>
          <Footer/>
   </div>
 );
}