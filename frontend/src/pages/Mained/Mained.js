
import React from 'react';
import { useEffect, useState } from "react";
import Headered from '../../components/Headered/Headered';
import Footer from '../../components/Footer/Footer';
import {Row} from "react-bootstrap";
import Noibat from "./Noibat";
import Banchay from './Banchay';
import Danhmuc from './Danhmuc';
import Tintuc from './Tintuc';
import Dichvu from './Dichvu';


import Slide from "../../components/Slide/Slide";
// import "./mained.css";
import Sell from './Sell/Sell';

export default function Mained() {

    const [data, setData] = useState([]);
        useEffect(() => {
        getData();
    }, []);


    async function getData() {
        let result = await fetch("http://127.0.0.1:8000/api/getproduct");
        result = await result.json();
        setData(result);
       
      }
    console.log("data: ", data);
  
 return (
   <div>
     <Headered></Headered>
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
          <Sell></Sell>
          <Footer/>
         


   </div>




 );
}
