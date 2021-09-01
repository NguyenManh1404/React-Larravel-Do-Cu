import React from 'react';
import { withRouter } from "react-router-dom";
import { useEffect, useState } from "react";
import { Row,Col,Image,Button,FloatingLabel,Form } from "react-bootstrap";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import { Link } from "react-router-dom";

function DetailSell(props) {

    const [data, setData] = useState([]);


// lấy id trên thanh url
    let id = props.match.params.id;

    useEffect(() => {
        showDetail()
    }, []);

    async function showDetail()  {
        let result = await fetch(
          "http://localhost:8000/api/chitietsell/" + id
        );
        result = await result.json();
        setData(result);
        console.log(result);
      }

 

 return (
   <div>
       <Header/>

        <h3>Chi tiết sản phẩm</h3>
        {data.map((data, key) => (
       <Row >

         <Col md="1">
         </Col>
          <Col md="5" className="image_detail">
          <Image src={"http://127.0.0.1:8000/image/sell/" + data.image} alt={data.image}></Image>
          </Col>
          <Col md="5" className="conten_detail">
            <h2><b>Thông tin sản phẩm</b></h2>
            <h4><b>{data.name}</b></h4>
            <h4><b>Giá sản phẩm:</b> {data.price} VNĐ</h4>
            <h4><b>Giảm giá:</b> {data.discount} %</h4>
            <h4><b>Số lượng còn lại:</b> {data.quantity} sản phẩm </h4>
            <h4><b>Mô tả sản phẩm</b> <br></br> {data.detail}</h4>
            <h4><b>Mô tả sản phẩm</b> <br></br> {data.detail}</h4>
            <h4><b>Trạng thái:</b><p className="conhang">{data.product_status}</p></h4>
            <div>
             
            <hr/>
            <h2><b>Thông tin người bán</b></h2>
            <hr/>
            <h3><b>Email người bán :</b>{data.email}</h3>
            <h3><b>Phone người bán :</b>(+84){data.phone}</h3>
            <h4><p className="conhang">Vui lòng liên hệ nếu muốn mua !!</p></h4>
            </div>
          </Col>
          <Col md="1">
         </Col>
       </Row>
     ))}
       <Footer/>
   </div>
 );
}
export default withRouter(DetailSell);