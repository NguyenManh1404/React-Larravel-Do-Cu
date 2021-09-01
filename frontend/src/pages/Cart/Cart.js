import React from 'react';
import Headered from '../../components/Headered/Headered'
import Footer from '../../components/Footer/Footer'
import { useEffect, useState } from "react";
import { Row,Button,Col, CardGroup, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import { store } from 'react-notifications-component';
import './cart.css';  


export default function Cart() {
    const [cartlist, setCartList] = useState([]);
    const [tongtien, setTongTien] = useState("");

    const dichvu=10000;
    const vanchuyen=20000;
    const tongthanhtoan= dichvu+ vanchuyen+tongtien;
    let taikhoan = JSON.parse(localStorage.getItem("taikhoan"));
    let user_id = taikhoan.id;




    






    useEffect(() => {
        
        cartList();
        tongTien();
    }, []);

    async function xoaCart(id) {
        await fetch("http://localhost:8000/api/xoacart/" + id, {
          method: "DELETE",
        });
        window.location.reload();
      }

    async function cartList() {

        const formData = new FormData();  
        formData.append("user_id", user_id);
        //Gọi api để lấy tất cả cart ra

        let result = await fetch("http://127.0.0.1:8000/api/cartlist", {
            method: "post",
            body: formData,
        });
        result = await result.json();
        setCartList(result);

       

                
            store.addNotification({
                title: "Đây là giỏ hàng của bạn",
                message: "Hãy thanh toán hoặc quay lại trang chủ để mua hàng",
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


    async function tongTien() {
        const formData = new FormData();  
        formData.append("user_id", user_id);
        //Gọi api để tổng thanh toán lấy tất cả cart ra

        let result = await fetch("http://127.0.0.1:8000/api/tongtien", {
            method: "post",
            body: formData,
        });
        result = await result.json();
        console.log(result);
        setTongTien(result);




        if (result===0){
            store.addNotification({
                title: "Chưa có sản phẩm nào trong giỏ",
                message: "Hãy quay lại trang chủ để mua hàng",
                type: "danger",
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

    }




 return (
   <div>
       <ReactNotification />
       <Headered/>
       <h1><b>Đây là giỏ hàng của bạn</b></h1>

       <Row >
        
          <Col md="9" >
          <CardGroup>
                    {cartlist.map((product, key) => (
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


                                    <Button variant="danger"  onClick={() => xoaCart(product.cart_id)}>Xóa</Button>

                                </Card.Body>
                                <Card.Footer>
                                    <small className="text-muted">{product.product_status}</small>
                                </Card.Footer>
                            </Card>
                        </Col>
                    ))}
                </CardGroup>
          </Col>
          <Col md="3" className="tongtien">
            <h2><b>TỔNG TIỀN THANH TOÁN</b></h2><br/>
             <h2>Giá sản phẩm :<br/> {tongtien} VNĐ</h2>
             <hr  width="60%" align="center" />
             <h2>Dịch vụ :<br/> {dichvu} VNĐ</h2>
             <hr  width="60%" align="center" />  
             <h2>Phí vận chuyển:<br/><h6>(Tùy theo vị trí và khối lượng hàng hóa mà phí ship có thể tăng thêm)</h6><br/> {vanchuyen} VNĐ</h2>
             
             <hr  width="60%" align="center" />
             <h2><b>Giá tổng :<br/> {tongthanhtoan} VNĐ</b></h2>
             <br/>
             <Link to={"thanhtoan"} refresh="true">
                <Button variant="success" size="lg">
                    Thanh toán ngay
                </Button>
            </Link>           
          </Col>
          
       </Row>


       <Footer/>
   </div>
 );
}