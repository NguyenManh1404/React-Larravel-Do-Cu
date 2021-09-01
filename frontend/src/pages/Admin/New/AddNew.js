import React, { useState } from 'react';
import AdminHeader from '../components/AdminHeader';
import {Form, Button,Row,Col} from "react-bootstrap";

import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import { store } from 'react-notifications-component';
import { Link } from "react-router-dom";

export default function AddNew() {
    const [val,setValidator] = useState([]);
    const [name,setName] = useState("");
    const [image,setImage] = useState("");
    const [detail,setDetail] = useState("");


    async function addNew(){

        const formData = new FormData(); 
        formData.append("name", name);
        formData.append("image",image);
        formData.append("detail",detail);

        let result = await fetch("http://127.0.0.1:8000/api/addnew", {
            method: "post",
            body: formData,
          
        });
        result = await result.json();

        console.log("Trả về addproduct :",result);
        store.addNotification({
            title: "Thêm tin tức thành công !",
            message: "Hãy kiểm tra list tin tức của bạn !",
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

        if(result.val_err){

            setValidator(result.val_err);


        }

    }









 return (
   <div>
        <AdminHeader/>
        <ReactNotification/>


        <Row>
            <Col md={{ span: 4, offset: 4 }}>
            <Form className="form"> 
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label><b>Chủ đề tin tức</b></Form.Label>
                    <Form.Control type="text" placeholder="Nhập chủ đề tin tức" onChange={(e) => setName(e.target.value)} />
                    <Form.Text className="text-muted">
                        Hãy nhập chủ đề tin tức
                    </Form.Text>
                    <Form.Label className='err'>{val.name}</Form.Label>
                </Form.Group>
    

                <Form.Group className="mb-3" controlId="form------">
                    <Form.Label><b>Chọn hình ảnh cho tin</b></Form.Label>
                    <Form.Control  type="file" placeholder="Chọn hình ảnh cho tin tức" onChange={(e) => setImage(e.target.files[0])} />
                    <Form.Text className="text-muted">
                        -
                    </Form.Text>
                    <Form.Label className='err'>{val.image}</Form.Label>
                </Form.Group>

                <Form.Group className="mb-3" controlId="form------">
                    <Form.Label><b>Mô tả tin tức</b></Form.Label>
                    <Form.Control  type="text" placeholder="Chi tiết của tin tức" onChange={(e) => setDetail(e.target.value)} />
                    <Form.Text className="text-muted">
                        -
                    </Form.Text>
                    <Form.Label className='err'>{val.detail}</Form.Label>
                </Form.Group>

              

               
                

            
                
                <Link to={"listnew"}>
                <Button onClick={addNew}  variant="outline-success"><b>Thêm ngay</b></Button>{' '}
                </Link>
                
            </Form>
            </Col>
            </Row>



   </div>
 );
}