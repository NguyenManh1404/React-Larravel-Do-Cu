import React from 'react';
import "../admin.css";
import { useEffect, useState } from "react";
import AdminHeader from '../components/AdminHeader';

import {Form} from "react-bootstrap";
export default function ListOrder() {

  const [getproduct, setProduct] = useState([]);

  // const [phone, setPhone] = useState('');
  // const [address, setAddress] = useState('');
  // const [payment, setPayment] = useState('');
  // const [order_comment, setOrder_comment] = useState('');
  // const [order_code, setOrder_code] = useState('');
  // const [user_id, setUser_id] = useState('');
  


  useEffect(() => {
      getProduct();

  }, []);

  //Gọi api để show product nổi bật
  async function getProduct() {
      let result = await fetch("http://127.0.0.1:8000/api/getorderall");
      result = await result.json();
      setProduct(result);
      console.log("Danh sách order :",result);
  }
  

  async function xacNhanOrder(id){
    // console.log("đầu vào :",user_id,phone,address,payment,order_comment,order_code);
   const user_id= document.getElementById("user_id");
   const order_id= document.getElementById("order_id");
   const phone= document.getElementById("phone");
   const address= document.getElementById("address");
   const payment= document.getElementById("payment");
   const order_comment= document.getElementById("order_comment");
   const order_code= document.getElementById("order_code");
   console.log(order_id.value);
    const formData = new FormData();

    formData.append("order_id", order_id.value);
    formData.append("user_id", user_id.value);
    formData.append("phone", phone.value);
    formData.append("address",address.value);
    formData.append("payment",payment.value);
    formData.append("order_comment",order_comment.value);
    formData.append("order_code",order_code.value);



    let result = await fetch("http://127.0.0.1:8000/api/xacnhanorder/"+ id, {
        method: "post",
        body: formData,
    });
    result = await result.json();
    console.log(result);

    console.log("id p",id);
    
    // Hiển thị lại trang
    window.location.reload();

  }







 return (
   <div>


<AdminHeader/>
  
    
    {/* /.sidebar */}

  {/* Content Wrapper. Contains page content */}
  <div className="content-wrapper">
    {/* Content Header (Page header) */}
    <div className="content-header">
      <div className="container-fluid">
        <div className="row mb-2">
          <div className="col-sm-6">
            <h4 className="m-0"><b>Danh Sách Order Chờ Xác Nhận </b></h4>
          </div>{/* /.col */}
          <div className="col-sm-6">
            
          </div>{/* /.col */}
        </div>{/* /.row */}
      </div>{/* /.container-fluid */}
    </div>
    <section className="content">
    
      <table className="table table-striped projects">
        <thead>
          <tr>
            <th style={{width: '1%'}}>
            Mã đơn hàng
            </th>
            <th style={{width: '10%'}}>
              Tên sản phẩm
            </th>
            <th style={{width: '10%'}}>
              Hình ảnh
            </th>
            <th style={{width: '10%'}}>
              Giá
            </th>
            <th style={{width: '10%'}}>
              Số điện thoại nhận
            </th>
            <th style={{width: '15%'}}>
              Địa chỉ
            </th>
            <th style={{width: '15%'}}>
              Time  đặt đơn
            </th>
            <th style={{width: '20%'}} className="text-center">
              Lời nhắn của khách
            </th>
            <th style={{width: '10%'}}>
              Phương thức thanh toán
            </th>
            <th style={{width: '5%'}}>
              Trạng thái
            </th>
            <th style={{width: '10%'}} className="text-center">
              Cập nhật
            </th>
          </tr>
        </thead><tbody>
        {getproduct.map((product, key) => (
          <tr key={key}>
            <td>
            {product.order_code}
            </td>
            <td>
           {product.name}
            </td>
            <td>
            <img variant="top" src={"http://127.0.0.1:8000/image/product/" + product.image} alt={product.image} style={{width:"100px"}} />
            </td>
            <td>
            {product.price_new} VNĐ
            </td>
            <td >
            (+84){product.phone}
            </td>
            <td>
            {product.address}
            </td>
            <td>
                {product.day_buy}
            </td>
            <td>
            {product.order_comment} 
            </td>
            <td>
            {product.payment}
            </td>
            <td className="project-state">
              <span className="badge badge-success">{product.order_status}</span>
            </td>
            

            <td className="project-actions text-right">
              <a className="btn btn-danger btn-sm" href="#">
                <i className="fas fa-pencil-alt">
                </i>
                <b>Hủy đơn</b>
              </a>
              {/* <button type="button"  class="btn btn-danger btn-sm">Xóa khỏi giỏ</button> */}



              <Form>
              <Form.Control type="hidden"  id="user_id" defaultValue={product.user_id} />
              <Form.Control maxlength="11" type="hidden" id="phone" defaultValue={product.phone} />
              <Form.Control type="hidden" id="address" defaultValue={product.address} />
              <Form.Control type="hidden" id="payment" defaultValue={product.payment} />
              <Form.Control type="hidden" id="order_comment" defaultValue={product.order_comment} />
              <Form.Control type="hidden" id="order_code" defaultValue={product.order_code} />
              <Form.Control type="hidden" id="order_id" defaultValue={product.id} />


                <a className="btn btn-success btn-s" onClick={()=>xacNhanOrder(product.product_id)}>
                  <i className="fas fa-trash">
                  </i>
                  <b>Xác nhận</b>
                </a>

            </Form>

              


              
            </td>
          </tr>
              ))}
        </tbody>
      </table>
    </section>
    {/* /.content */}
  </div>
  {/* /.content-wrapper */}
  <footer className="main-footer">
  </footer>
 
 
</div>





  
 );
}