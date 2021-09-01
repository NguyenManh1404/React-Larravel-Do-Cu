import React from 'react';
import Headered from '../../components/Headered/Headered'
import Footer from '../../components/Footer/Footer'
import { useEffect, useState } from "react";
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import { store } from 'react-notifications-component';

export default function OrderHistoryUser() {

    const [getorderhistory, setOrderHistory] = useState([]);

    let taikhoan = JSON.parse(localStorage.getItem("taikhoan"));
    //lấy id của user để truyền vào hàm binhLuan()
    const user_id= taikhoan.id;
    useEffect(() => {
        getOrderHistory() 
    }, []);

    async function getOrderHistory()  {
        let result = await fetch(
          "http://127.0.0.1:8000/api/historybuy/"+user_id
        );
        result = await result.json();
        setOrderHistory(result);
        console.log(result);
    
    
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
       <Headered/>
                <div className="content-wrapper">
                {/* Content Header (Page header) */}
                <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                    <div className="col-sm-6">
                        <h4 className="m-0"><b>Lịch Sử Mua Hàng Của Bạn </b></h4>
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
                        Lời nhắn của bạn
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
                    {getorderhistory.map((order, key) => (
                    <tr key={key}>
                        <td>
                        {order.order_code}
                        </td>
                        <td>
                    {order.name}
                        </td>
                        <td>
                        <img variant="top" src={"http://127.0.0.1:8000/image/product/" + order.image} alt={order.image} style={{width:"100px"}} />
                        </td>
                        <td>
                        {order.price_new} VNĐ
                        </td>
                        <td >
                        (+84){order.phone}
                        </td>
                        <td>
                        {order.address}
                        </td>
                        <td>
                            {order.day_buy}
                        </td>
                        <td>
                        {order.order_comment} 
                        </td>
                        <td>
                        {order.payment}
                        </td>
                        <td className="project-state">
                        <span className="badge badge-success">{order.order_status}</span>
                        </td>
                        <td className="project-state">
                        <span className="badge badge-success">{order.payment_status}</span>
                        </td>

                        <td className="project-actions text-right">
                        <a className="btn btn-danger btn-sm" onClick={() => deleteOrder(order.id)} href="#">
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
       <Footer/>
   </div>
 );
}