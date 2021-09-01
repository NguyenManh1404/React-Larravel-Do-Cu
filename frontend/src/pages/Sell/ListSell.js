import React from 'react';
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Headered from '../../components/Headered/Headered';
import Footer from '../../components/Footer/Footer';

import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import { store } from 'react-notifications-component';
export default function ListSell() {
    const [selllist, setSellList] = useState([]);

    let taikhoan = JSON.parse(localStorage.getItem("taikhoan"));
    let user_id = taikhoan.id;
    

    useEffect(() => {
        
        sellList();
    }, []);

    async function sellList() {

        const formData = new FormData();  
        formData.append("user_id", user_id);
        //Gọi api để lấy tất cả cart ra

        let result = await fetch("http://127.0.0.1:8000/api/getlistsell", {
            method: "post",
            body: formData,
        });
        result = await result.json();
        setSellList(result);

       

                
            store.addNotification({
                title: "Đây là những sản phẩm của bạn đang đăng bán ",
                message: "Hãy kiểm tra ",
                type: "warning",
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

    async function deleteSell(id) {
        await fetch("http://localhost:8000/api/deletesell/" + id, {
          method: "DELETE",
        });
        window.location.reload();
        store.addNotification({
          title: "Xóa thành công",
          message: "Hãy kiểm tra",
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
       <Headered/>
       <ReactNotification />
       {/* Content Wrapper. Contains page content */}
  <div className="content-wrapper">
    {/* Content Header (Page header) */}
    <div className="content-header">
      <div className="container-fluid">
        <div className="row mb-2">
          <div className="col-sm-6">
            <h4 className="m-0">Danh sách sản phẩm đang bán</h4>
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
              id
            </th>
            <th style={{width: '10%'}}>
              Tên sản phẩm
            </th>
            <th style={{width: '10%'}}>
              Hình ảnh
            </th>
            <th style={{width: '15%'}}>
              Giá sản phẩm
            </th>
            <th style={{width: '15%'}}>
              Giảm giá
            </th>
            <th style={{width: '20%'}} className="text-center">
              Mô tả
            </th>
            <th style={{width: '5%'}}>
              Loại
            </th>
            <th style={{width: '5%'}}>
              Số lượng
            </th>
            <th style={{width: '5%'}}>
              Trạng thái
            </th>
            <th style={{width: '10%'}} className="text-center">
              Cập nhật
            </th>
          </tr>
        </thead><tbody>
        {selllist.map((product, key) => (
          <tr key={key}>
            <td>
            {product.id}
            </td>
            <td>
           {product.name}
            </td>
            <td>
            <img variant="top" src={"http://127.0.0.1:8000/image/sell/" + product.image} alt={product.image} style={{width:"200px"}} />
            </td>
            <td>
            {product.price} VNĐ
            </td>
            <td>
            {product.discount} %
            </td>
            <td>
            {product.detail}
            </td>
            <td>
            {product.product_type}
            </td>
            <td >
            {product.quantity}
            </td>
            <td className="project-state">
              <span className="badge badge-success">{product.product_status}</span>
            </td>
            <td className="project-actions text-right">
            <Link to={"editsell/"+ product.id + "/"}>
              <a className="btn btn-info btn-sm" href="#">
                <i className="fas fa-pencil-alt">
                </i>
                Chỉnh sửa
              </a>
              </Link>
         <br/> <br/>
              <a className="btn btn-danger btn-s" onClick={() => deleteSell(product.id)}>
                <i className="fas fa-trash">
                </i>
                Xóa đi
              </a>
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