import React, { useState } from 'react';
import Headered from '../../components/Headered/Headered';
import Footer from '../../components/Footer/Footer';


import {Form, Button,Row,Col} from "react-bootstrap";

import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import { store } from 'react-notifications-component';
import { Link } from "react-router-dom";





export default function Sell() {

  const [val,setValidator] = useState([]);

  const [name,setName] = useState("");
  const [price,setPrice]=useState("");
  const [discount,setDiscount]=useState("");
  const [image,setImage] = useState("");
  const [detail,setDetail] = useState("");
  const [product_type,setProductType] = useState("");
  const [quantity,setQuantity] = useState("");

  let taikhoan = JSON.parse(localStorage.getItem("taikhoan"));
  let user_id = taikhoan.id;

  async function addSell(){

    const formData = new FormData(); 
    formData.append("user_id", user_id);
    formData.append("name", name);
    formData.append("price",price );
    formData.append("discount",discount);
    formData.append("image",image);
    formData.append("detail",detail);
    formData.append("product_type",product_type );
    formData.append("quantity",quantity);

    let result = await fetch("http://127.0.0.1:8000/api/addsell", {
        method: "post",
        body: formData,
      
    });
    result = await result.json();

    console.log("Trả về addproduct :",result);
    

    if(result.val_err){

        setValidator(result.val_err);


    }else{
      store.addNotification({
        title: "Đăng bán sản phẩm thành công !",
        message: "Hãy kiểm tra list sản phẩm bán của bạn !",
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
    }

}




 return (
   <div>
      <Headered></Headered>
      <ReactNotification/>


<Row>
    <Col md={{ span: 4, offset: 4 }}>
      <h2>Thêm sản phẩm muốn bán</h2>
    <Form className="form"> 
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label><b>Tên sản phẩm muốn bán</b></Form.Label>
            <Form.Control type="text" placeholder="Tên sản phẩm muốn bán của bạn" onChange={(e) => setName(e.target.value)} />
            <Form.Text className="text-muted">
                Hãy nhập tên sản phẩm muốn bán của bạn
            </Form.Text>
            <Form.Label className='err'>{val.name}</Form.Label>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label><b>Giá sản phẩm muốn bán</b></Form.Label>
            <Form.Control type="number" placeholder="Giá sản phẩm muốn bán của bạn" onChange={(e) => setPrice(e.target.value)} />
            <Form.Text className="text-muted">
                Hãy nhập giá sản phẩm muốn bán của bạn
            </Form.Text>
            <Form.Label className='err'>{val.price}</Form.Label>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label><b>Phần trăm giảm giá</b></Form.Label>
            <Form.Control type="number" placeholder="Giá đã giảm của sản phẩm muốn bán của bạn" onChange={(e) => setDiscount(e.target.value)} />
            <Form.Text className="text-muted">
                Hãy nhập giá đã giảm của sản phẩm muốn bán của bạn
            </Form.Text>
            <Form.Label className='err'>{val.discount}</Form.Label>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label><b>Số lượng sản phẩm muốn bán</b></Form.Label>
            <Form.Control type="number" placeholder="Số lượng sản phẩm muốn bán" onChange={(e) => setQuantity(e.target.value)} />
            <Form.Text className="text-muted">
                Hãy nhập số lượng sản phẩm muốn bán
            </Form.Text>
            <Form.Label className='err'>{val.quantity}</Form.Label>
        </Form.Group>

        <Form.Group className="mb-3" controlId="form------">
            <Form.Label><b>Chọn hình ảnh cho sản phẩm của bạn</b></Form.Label>
            <Form.Control  type="file" placeholder="Chọn hình ảnh cho sản phẩm" onChange={(e) => setImage(e.target.files[0])} />
            <Form.Text className="text-muted">
                -
            </Form.Text>
            <Form.Label className='err'>{val.image}</Form.Label>
        </Form.Group>

        <Form.Group className="mb-3" controlId="form------">
            <Form.Label><b>Mô tả của sản phẩm</b></Form.Label>
            <Form.Control  type="text" placeholder="Mô tả của sản phẩm<" onChange={(e) => setDetail(e.target.value)} />
            <Form.Text className="text-muted">
                -
            </Form.Text>
            <Form.Label className='err'>{val.detail}</Form.Label>
        </Form.Group>

      
        <Form.Select  onChange={(e) => setProductType(e.target.value)} aria-label="Chọn loại sản phẩm">
                    <option>Hãy chọn loại sản phẩm</option>
                    <option value="ban">Bán</option>
                    <option value="chotang">Cho tặng</option>
          </Form.Select>
          <Form.Label className='err'>{val.product_type}</Form.Label>
                <br/><br/><br/><br/>
               
        

    
        
        {/* <Link to={"listnew"}> */}
        <Button onClick={addSell}  variant="outline-success"><b>Đăng bán ngay</b></Button>{' '}
        {/* </Link> */}
        
    </Form>
    </Col>
    </Row>

       <Footer/>
   </div>
 );
}