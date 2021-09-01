import React from 'react';
import Headered from '../../components/Headered/Headered'
import Footer from '../../components/Footer/Footer'
import { useEffect, useState } from "react";
import { Form,Col,Row,Button} from "react-bootstrap";

import emailjs from 'emailjs-com';

import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import { store } from 'react-notifications-component';
 
import "./payment.css";

export default function Payment() {

    const [val, setValidator] = useState([]);

    const [tongtien, setTongTien] = useState("");
    

    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [payment, setPayment] = useState('');
    const [order_comment, setOrder_comment] = useState('');

    const dichvu=10000;
    const vanchuyen=20000;
    const tongthanhtoan= dichvu+ vanchuyen+tongtien;


    function PhoneChange(e) {
    setPhone(e.target.value);
    
    }
    function AddressChange(e) {
        
        setAddress(e.target.value);
        
    }
    function PaymentChange(e) {
        
        setPayment(e.target.value);
    }
    function Order_commentChange(e) {
        
        setOrder_comment(e.target.value);
    }

    useEffect(() => {
        
        tongTien();
    }, []);

    let taikhoan = JSON.parse(localStorage.getItem("taikhoan"));
    //lấy id của user để truyền vào hàm binhLuan()
    const email= taikhoan.email;
    const phone_number= taikhoan.phone;
    let user_id = taikhoan.id;

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

    }



    


    function sendEmail(e) {

        if(tongthanhtoan==30000){

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
            }else{


        e.preventDefault();
        emailjs.sendForm('service_16kb5ii', 'template_pk6idtd', e.target, 'user_mYV3rMZGGDjTx0cxgLYxN')
          .then((result) => {
              console.log(result.text);
          }, (error) => {
              console.log(error.text);
          });
     
          store.addNotification({
            title: "Theo dõi đơn hàng qua email thành công !!!",
            message: "Chúng tôi sẽ gửi email thường xuyên đến cho bạn",
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
      }
    






    async function thanhToan() {
        console.log(user_id);
        console.log(phone);
        console.log(address);
        console.log(payment);
        console.log(order_comment);



        if(tongthanhtoan==30000){

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

        }else{
            const formData = new FormData(); 
            formData.append("user_id", user_id);
            formData.append("phone", phone);
            formData.append("address",address);
            formData.append("payment",payment);
            formData.append("order_comment",order_comment);
            formData.append("order_code",tongthanhtoan);



            let result = await fetch("http://127.0.0.1:8000/api/thanhtoan", {
                method: "post",
                body: formData,
            });
            result = await result.json();
            

        if(result.val_err){

            //Nếu có lối thì truyền vào cho setValidator
            setValidator(result.val_err)
            store.addNotification({
                title: "Thanh toán thất bại !",
                message: "Vui lòng điền đầy đủ thông tin để thanh toán !",
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
           
            window.location.reload();
            store.addNotification({
                title: "Thanh toán thành công !",
                message: "Hãy kiểm tra tình trạng đơn hàng của bạn !",
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


    }

 return (
   <div>
        <ReactNotification />
       <Headered/>
       <div>
            <Row>
                <Col md={{ span: 4, offset: 4 }}>

                    <h1>Thanh toán</h1>


                    <Form>
                        <Form.Group className="mb-3" controlId="phone">
                            <Form.Label><b>Nhập số điện thoại:</b></Form.Label>
                            <Form.Control maxlength="11" type="number" onChange={PhoneChange} id="phone"  placeholder="(+84)xxxxxxxxx" value={phone} />
                            <Form.Label className="err">{val.phone}</Form.Label>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="">
                            <Form.Label><b>Nhập địa chỉ nhận hàng:</b></Form.Label>
                            <Form.Control type="text" onChange={AddressChange} id="address" value={address} placeholder="Vui lòng nhập cụ thể và chính xác" />
                            <Form.Label className="err">{val.address}</Form.Label>
                        </Form.Group>
                        
                        <Form.Select onChange={PaymentChange}  aria-label="Default select example">
                            <option>Chọn phương thức thanh toán</option>
                            <option value="Thanh toán khi nhận hàng">Thanh toán khi nhận hàng</option>
                            <option value="Thanh toán online">Thanh toán online</option>
                            <option value="Chuyển khoản ngân hàng">Chuyển khoản ngân hàng</option>
                            
                        </Form.Select>
                        <Form.Label className="err">{val.payment}</Form.Label>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label><b>Nhắn nhủ đến shop:</b></Form.Label>
                            <Form.Control onChange={Order_commentChange} id="order_comment" value={order_comment} as="textarea" rows={3} />
                            <Form.Label className="err">{val.order_comment}</Form.Label>
                        </Form.Group>
                    </Form>

                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label><b>Theo dõi qua email:</b></Form.Label>
                    <Form onSubmit={sendEmail}>
                        <Form.Control type="email" name="email" defaultValue={email} />
                        <Form.Control type="hidden" name="phone" defaultValue={phone_number} />
                        <Form.Control type="hidden" name="price" defaultValue={tongthanhtoan} />
                        <Button type="submit" value="send">Theo dõi ngay</Button>
                 </Form>
                    </Form.Group>
                   



                    <h3><b>Tổng số tiền: {tongthanhtoan} VNĐ</b></h3>
                        
                        <Button  variant="success" onClick={thanhToan}>
                            Xác nhận
                        </Button>
                       
                        
                    
                </Col>
            </Row>

        
           



            
       </div>
           
       <Footer/>
   </div>
 );
}