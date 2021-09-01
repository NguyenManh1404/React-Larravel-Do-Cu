import React from 'react';
import Headered from '../../components/Headered/Headered'
import Footer from '../../components/Footer/Footer'
import { useEffect, useState } from "react";


import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import { store } from 'react-notifications-component';
import { Link } from "react-router-dom";
import { Row,Button,Col, CardGroup, Card } from "react-bootstrap";
export default function Order() {

    const [orderlist, setOrderList] = useState([]);

    let taikhoan = JSON.parse(localStorage.getItem("taikhoan"));
    let user_id = taikhoan.id;
    

    useEffect(() => {
        
        orderList();
    }, []);


    async function orderList() {

        const formData = new FormData();  
        formData.append("user_id", user_id);
        //Gọi api để lấy tất cả cart ra

        let result = await fetch("http://127.0.0.1:8000/api/getorder", {
            method: "post",
            body: formData,
        });
        result = await result.json();
        setOrderList(result);

       

                
            store.addNotification({
                title: "Đây là những đơn hàng của bạn",
                message: "Hãy kiểm tra hoặc quay lại trang chủ để mua hàng",
                type: "warning",
                insert: "top",
                container: "top-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                    duration: 5000,
                    onScreen: true
                  }
              });
    

         
    }

    async function deleteOrder(id) {
        await fetch("http://localhost:8000/api/deleteorder/" + id, {
          method: "DELETE",
        });
        window.location.reload();
        store.addNotification({
          title: "Hủy đơn thành công",
          message: "Hãy kiểm tra đơn hàng của bạn",
          type: "success",
          insert: "top",
          container: "top-right",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
              duration: 5000,
              onScreen: true
            }
        });
      }



 return (
   <div>
    <Headered/>
    <ReactNotification/>
       <h1>Đơn hàng của bạn</h1>



       <Row >
        
        <Col md="9" >
        <CardGroup>
                  {orderlist.map((product, key) => (
                      <Col md={4} className="item" key={key}>
                          <Card>
                              <Card.Img variant="top" src={"http://127.0.0.1:8000/image/product/" + product.image} alt={product.image} />
                              <Card.Body>
                                  <Card.Title>{product.name}</Card.Title>
                                  <Card.Text>
                                      <b>Giá mới: {product.price_new} VNĐ</b>
                                  </Card.Text>
                                  <Card.Text className="price_old">
                                      <p>Giá cũ: {product.price_old} VNĐ</p>
                                  </Card.Text>
                                  <Card.Text>
                                      {product.detail}
                                      
                                  </Card.Text>

                                  <Link to={"detail/" + product.id}>
                                      <Button variant="success">
                                          Chi tiết
                                      </Button>
                                  </Link>

                                <Link to={"order"}>
                                <Button variant="danger" onClick={() => deleteOrder(product.id)} >Hủy đơn</Button>
                                </Link>
                                 

                              </Card.Body>
                              <Card.Footer>
                                 
                                  <span className="badge badge-success">{product.order_status}</span><br/>
                                  <span>Ngày mua: {product.day_buy}</span>
                                  
                              </Card.Footer>
                          </Card>
                      </Col>
                  ))}
              </CardGroup>
        </Col>
        <Col md="3" className="tongtien">
             
        </Col>
        
     </Row>












        
    <Footer/>

   </div>
 );
}