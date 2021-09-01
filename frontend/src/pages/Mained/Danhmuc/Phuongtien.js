import React from 'react';
import { useEffect, useState } from "react";
import {Col,CardGroup,Card,Button} from "react-bootstrap";
import { Link } from "react-router-dom";

import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import { store } from 'react-notifications-component';
export default function Phuongtien() {
    const [phuongtien, setPhuongtien] = useState([]);
    useEffect(() => {
        getPhuongtien();
    }, []);

    async function getPhuongtien() {
        let result = await fetch("http://127.0.0.1:8000/api/phuongtien_product");
        result = await result.json();
        setPhuongtien(result);
      }


      //Giỏ hàng
    //Lấy thông tin user trong LocalStorage
    let taikhoan = JSON.parse(localStorage.getItem("taikhoan"));
    let user_id = taikhoan.id;

    //Hàm thêm sản phẩm vào giỏ hàng
    async function themVaoGio(id) {


        


        const formData = new FormData();

    
        formData.append("product_id", id);
        formData.append("user_id", user_id);


        //Gọi api để thêm product vào bảng cart

        let result = await fetch("http://127.0.0.1:8000/api/themvaogio", {
            method: "post",
            body: formData,
        });
       
        
        console.log(result);
        
        store.addNotification({
            title: "Thêm vào giỏ hàng thành công !",
            message: "Hãy vào giỏ hàng của bạn để thanh toán",
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
//Giỏ hàng
 return (
   <div>
       <ReactNotification/>
       <Col>
            <div className="titles">
                <h1><b>Phương tiện giao thông cũ</b></h1>
            </div>
            <CardGroup>
            {phuongtien.map((product,key) => (
                <Col md={3}  className="item" key={key}>
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
                    <Link to={"cart"}>
                        <Button variant="danger" onClick={()=>themVaoGio(product.id)}>Mua ngay</Button>
                    </Link> 
                    </Card.Body>
                    <Card.Footer>
                    <small className="text-muted">{product.product_status}</small>
                    </Card.Footer>
                </Card>
                </Col>
                 ))}
            </CardGroup>
        </Col>
   </div>
 );
}