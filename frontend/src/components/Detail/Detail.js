import React from 'react';
import Headered from '../Headered/Headered'
import Footer from '../Footer/Footer'
import { Row,Col,Image,Button,FloatingLabel,Form} from "react-bootstrap";
import { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";

import "./detail.css";



import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import { store } from 'react-notifications-component';

function Detail(props) {
  const [val, setValidator] = useState([]);
  const [comment,setComment] = useState("");
  const [data, setData] = useState([]);
  const [getcomment, setGetComment] = useState([]);

  let id = props.match.params.id;

  let taikhoan = JSON.parse(localStorage.getItem("taikhoan"));
  //lấy id của user để truyền vào hàm binhLuan()
  const user_id= taikhoan.id;

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
      "http://127.0.0.1:8000/api/getcomment/"+id
    );
    result = await result.json();
    setGetComment(result);
    console.log(result);


  }




//Giỏ hàng
    //Lấy thông tin user trong LocalStorage
    
    //Hàm thêm sản phẩm vào giỏ hàng
    async function themVaoGio(id) {


        const formData = new FormData();

        let taikhoan = JSON.parse(localStorage.getItem("taikhoan"));
        let user_id = taikhoan.id;
    
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
//Bình luận


  async function binhLuan(){

    const formData = new FormData();

    formData.append("user_id", user_id);
    formData.append("product_id", id);
    formData.append("comment", comment);

    let result = await fetch("http://127.0.0.1:8000/api/createcomment", {
      method: "post",
      body: formData,
      
    });
    result = await result.json();


    window.location.reload();
            store.addNotification({
                title: "Bình luận thành công !",
                message: "Cảm ơn bạn đã đưa ra bình luận!",
                type: 'success',
                insert: "top",
                container: "top-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                    duration: 10000,
                    onScreen: true
                }
            });
    console.log(result);
    if(result.val_err){
      setValidator(result.val_err);
    }

  }



 return (
   <div>
     <ReactNotification/>
     
       <Headered/>
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
              <Button variant="danger" onClick={()=>themVaoGio(id)}>Mua ngay</Button> 


          
                  <Button variant="warning" onClick={()=>themVaoGio(id)}>Thêm Vào giỏ</Button>
             




            </div>
          </Col>
          <Col md="1">
         </Col>
       </Row>
       <Row className="comment">
       <Col md="6" >
          <p>Bình luận:</p>
          <Form>
            <FloatingLabel controlId="floatingTextarea2" >
              <Form.Control
                as="textarea"
                placeholder="Hãy viết nhận xét của bạn"
                style={{ height: '200px' }}
                onChange={(e) => setComment(e.target.value)}
              />
               <Form.Label className="err">{val.comment}</Form.Label>
          </FloatingLabel>
         
          <Button variant="primary" onClick={binhLuan}><b>Bình luận</b></Button>
        </Form>
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

export default withRouter(Detail);