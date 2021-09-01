import React from 'react';
import Header from '../../../components/Header/Header'
import Footer from '../../../components/Footer/Footer'
import { Row,Col,Image,Button,FloatingLabel,Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import "./detailnosigup.css";



import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import { store } from 'react-notifications-component';

function DetailNoSigup(props) {
  const [data, setData] = useState([]);
  const [getcomment, setGetComment] = useState([]);
  let id = props.match.params.id;
  
  useEffect(() => {
    showDetail()
    getComment()

}, []);

async function showDetail()  {
    let result = await fetch(
      "http://localhost:8000/api/chitiet/" + id
    );
    result = await result.json();
    setData(result);
    console.log(result);
  }

  async function getComment()  {
    let result = await fetch(
      "http://127.0.0.1:8000/api/getcomment/" + id
    );
    result = await result.json();
    setGetComment(result);
    console.log(result);


  }



//Giỏ hàng
    //Lấy thông tin user trong LocalStorage
    
    //Hàm thêm sản phẩm vào giỏ hàng
    async function themVaoGio() {

      store.addNotification({
        title: "Bạn chưa đăng nhập",
        message: "Hãy đăng ký hoặc đăng nhập ngay",
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
  
//Giỏ hàng




 return (
   <div>
     <ReactNotification/>
        <Header/>
      
       <h3>Chi tiết sản phẩm</h3>
       <Row >
         <Col md="1">
         </Col>
          <Col md="5" className="image_detail">
          <Image src={"http://127.0.0.1:8000/image/product/" + data.image} alt={data.image}></Image>
          </Col>
          <Col md="5" className="conten_detail">
            <h2><b>{data.name}</b></h2>
            <h4><b>Giá mới:</b> {data.price_new} VNĐ</h4>
            <h4><b>Giá cũ:</b> {data.price_old} VNĐ</h4>
            <h4><b>Giảm giá:</b> {data.discount} VNĐ</h4>
            <h4><b>Số lượng còn lại:</b> {data.quantity} sản phẩm </h4>
            <h4><b>Mô tả sản phẩm</b> <br></br> {data.detail}</h4>
            <h4><b>Trạng thái:</b><p className="conhang">{data.product_status}</p>  </h4>
            <div>
             
               
                <Button variant="danger" onClick={themVaoGio}>Mua ngay</Button> 
              
              
                  <Button variant="warning" onClick={themVaoGio}>Thêm Vào giỏ</Button>
          
                
 
            </div>
          </Col>
          <Col md="1">
         </Col>
       </Row>
       <Row className="comment">
       <Col md="6" >
          <p>Bình luận:</p>
          <FloatingLabel controlId="floatingTextarea2" >
            <Form.Control
              as="textarea"
              placeholder="Hãy viết nhận xét của bạn"
              style={{ height: '200px' }}
            />
              <Form.Label className="err"><i class="fas fa-comments"></i>Hãy đăng nhập để bình luận</Form.Label>
        </FloatingLabel>
          </Col>
          <Col md="6">
          <p><i class="fas fa-comments"></i>Nhận xét và đánh giá của sản phẩm</p>

          {getcomment.map((comment, key) => (
               <h5><b><i class="far fa-user"></i>{comment.name} :</b>{comment.comment}</h5>
          ))}
          
          </Col>
       </Row>
       <Footer/>
   </div>
 );
}

export default withRouter(DetailNoSigup);