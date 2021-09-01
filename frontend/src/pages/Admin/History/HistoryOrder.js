import React from 'react';
import "../admin.css";
import { useEffect, useState } from "react";
import AdminHeader from '../components/AdminHeader';


import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import { store } from 'react-notifications-component';

export default function ListOrder() {

  const [getproduct, setProduct] = useState([]);



  useEffect(() => {
      getProduct();

  }, []);

  //Gọi api để show product nổi bật
  async function getProduct() {
      let result = await fetch("http://127.0.0.1:8000/api/getorderhistory");
      result = await result.json();
      setProduct(result);
      console.log("Danh sách order :",result);
  }
  

 
  async function deleteOrder(id) {
    await fetch("http://localhost:8000/api/deleteorder/" + id, {
      method: "DELETE",
    });
    window.location.reload();
    store.addNotification({
      title: "Hủy đơn thành công",
      message: "Hãy kiểm tra đơn hàng của bạn",
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






 return (
   <div>

<ReactNotification/>
<AdminHeader/>
  
    
    {/* /.sidebar */}

  {/* Content Wrapper. Contains page content */}
  <div className="content-wrapper">
    {/* Content Header (Page header) */}
    <div className="content-header">
      <div className="container-fluid">
        <div className="row mb-2">
          <div className="col-sm-6">
            <h4 className="m-0"><b>Lịch Sử Mua Hàng Của WEBSIZE </b></h4>
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
            <th style={{width: '5%'}}>
              Thanh toán
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
            <td className="project-state">
              <span className="badge badge-success">{product.payment_status}</span>
            </td>

            <td className="project-actions text-right">
              <a className="btn btn-danger btn-sm" onClick={() => deleteOrder(product.id)} href="#">
                <i className="fas fa-pencil-alt">
                </i>
                <b>Xóa đơn</b>
              </a>
              {/* <button type="button"  class="btn btn-danger btn-sm">Xóa khỏi giỏ</button> */}

              {/* <Button variant="danger"  >Hủy đơn</Button> */}


              
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