import React from 'react';
import { useState } from "react";
import { useHistory} from "react-router-dom";
import {Form, Button,Row,Col} from "react-bootstrap";
import "./register.css";
import Header from "../../components/Header/Header";

import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import { store } from 'react-notifications-component';
export default function Register() {
    const history = useHistory();
    
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");



    const [val, setValidator] = useState([]);


async function Register(){
    console.log(name,email,phone,password);
    const item={name,email,phone,password};

    let result =await fetch("http://127.0.0.1:8000/api/dangky",{
        method: "post",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify(item),
    });
    result = await result.json();
   
        
    if(result.message){
        
        store.addNotification({
            title: "Thông tin nhập bị trùng !",
            message: "Số điện thoại hoặc email bị trùng !",
            type: 'danger',
            insert: "top",
            container: "top-right",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
                duration: 5000,
                onScreen: true
            }
        });
    }else{

        if(result.val_err){
            console.log(result.val_err);
            setValidator(result.val_err);
            store.addNotification({
                title: "Đăng ký thất bại !",
                message: "Hãy kiểm tra lại thông tin đăng ký của bạn !",
                type: 'danger',
                insert: "top",
                container: "top-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                    duration: 5000,
                    onScreen: true
                }
            });
        }else{
        
            console.log("user :", result);
            history.push("/dangnhap");
            store.addNotification({
                title: "Đăng ký tài khoản thành công !",
                message: "Hãy tiến hành đăng nhập",
                type: 'success',
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
}















 return (
    <div className="">
        <ReactNotification />
    <Header></Header>
    <Row>
    <Col md={{ span: 6, offset: 3 }}>
    <Form className="form"> 
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label><b>Tên tài khoản</b></Form.Label>
            <Form.Control type="text" placeholder="Nhập tên tài khoản"   onChange={(e) => setName(e.target.value)}/>
            
            <Form.Label className="err">{val.name}</Form.Label>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label><b>Số điện thoại</b></Form.Label>
            <Form.Control type="number" placeholder="Nhập số điện thoại"  onChange={(e) => setPhone(e.target.value)} />
            
            <Form.Label className="err">{val.phone}</Form.Label>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label><b>Email đăng ký</b></Form.Label>
            <Form.Control type="email" placeholder="Nhập email của bạn"  onChange={(e) => setEmail(e.target.value)}/>
            
            <Form.Label className="err">{val.email}</Form.Label>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label><b>Mật khẩu</b></Form.Label>
            <Form.Control maxlength="8" type="password" placeholder="Nhập mật khẩu"  onChange={(e) => setPassword(e.target.value)} />
            
            <Form.Label className="err">{val.password}</Form.Label>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label><b>Xác nhận mật khẩu</b></Form.Label>
            <Form.Control maxlength="11" type="password" placeholder="Xác nhận mật khẩu" onChange={(e) => setPassword(e.target.value)} />
        </Form.Group>
      
        <Button  onClick={Register} variant="outline-success"><b>Đăng ký ngay</b></Button>{' '}
    </Form>
    </Col>
    </Row>
</div>
 );
}