
import React from 'react';
import { useHistory} from "react-router-dom";
import {Form, Button,Row,Col} from "react-bootstrap";
import "./login.css";
import {useState} from "react";

import Header from "../../components/Header/Header";


import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import { store } from 'react-notifications-component';

export default function Login() {
    const history = useHistory();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [val, setValidator] = useState([]);
    const [error, setError] = useState("");

async function Login(){
    let item={email,password};
    //Gọi api 
    let result =await fetch("http://127.0.0.1:8000/api/dangnhap",{
        method: "post",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify(item),
    });

    try {
    result = await result.json();
    
    console.log("Trả về :",result);
    //dùng localStrage để lưu tài khoản
    localStorage.setItem("taikhoan", JSON.stringify(result));
    //chuyển sang String
    let taikhoan = JSON.parse(localStorage.getItem("taikhoan"));
    //Nếu trong local có name thì
    console.log("name: ", taikhoan.name);
    console.log("pass: ", taikhoan.password);
    if (taikhoan.name) {
        
        history.push("/mained");
        store.addNotification({
            title: "Đăng nhập thành công !",
            message: "Chúc bạn có trải nghiệm tuyệt vời với chúng tôi",
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
      } else {
      
      
        if(result.error){
            store.addNotification({
                title: "Thông tin tài khoản hoặc mật khẩu sai !",
                message: "Hãy kiểm tra lại emal đăng ký và mật khẩu của bạn !",
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
            setError(result.error);
        }


        if(result.val_err){
            setValidator(result.val_err);
            
            //Nếu có lối thì truyền vào cho setValidator
            
            store.addNotification({
                title: "Đăng nhập thất bại !",
                message: "Hãy kiểm tra lại emal đăng ký và mật khẩu của bạn !",
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
           
            
        }


      }
    } catch {
        
        store.addNotification({
            title: "Đăng nhập thất bại !",
            message: "Hãy kiểm tra lại emal đăng ký và mật khẩu của bạn !",
            type: 'danger',
            insert: "top",
            container: "top-right",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            
          });
    }

}
console.log("error :", error);

    return (
        <div className="">
             <ReactNotification />
            <Header></Header>
            <Row>
            <Col md={{ span: 4, offset: 4 }}>
            <Form className="form"> 
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label><b>Email đăng ký</b></Form.Label>
                    <Form.Control type="email" placeholder="Nhập email" onChange={(e) => setEmail(e.target.value)} />
                    <Form.Text className="text-muted">
                        Hãy nhập email của bạn đã đăng ký
                    </Form.Text>
                    <Form.Label className='err'>{val.email}</Form.Label>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label><b>Mật khẩu</b></Form.Label>
                    <Form.Control maxlength="11" type="password" placeholder="Nhập mật khẩu" onChange={(e) => setPassword(e.target.value)} />
                    <Form.Text className="text-muted">
                        Hãy nhập mật khẩu của bạn
                    </Form.Text>
                    <Form.Label className='err'>{val.password}</Form.Label>
                </Form.Group>
                
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Label className='err'>{error}</Form.Label>
                    <Form.Check type="checkbox" label="Nhớ mật khẩu ?" />
                </Form.Group>
                <Button  onClick={Login} variant="outline-success"><b>Đăng nhập</b></Button>{' '}
            </Form>
            </Col>
            </Row>
            
        </div>
    );
}