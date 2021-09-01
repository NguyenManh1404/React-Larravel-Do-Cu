import React from 'react';
import "../admin.css";
import { useEffect, useState } from "react";
import AdminHeader from '../components/AdminHeader';
import { Button,Form,FormControl} from 'react-bootstrap';
import { Link } from "react-router-dom";

import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import { store } from 'react-notifications-component';

export default function ListProduct() {

  const [getproduct, setProduct] = useState([]);
    const [keysearch, setKeySearch] = useState("");
    const [getsearch, setSearch] = useState([]);
   

  useEffect(() => {
      getProduct();

  }, []);

  //Gọi api để show product nổi bật
  async function getProduct() {
      let result = await fetch("http://127.0.0.1:8000/api/getproduct");
      result = await result.json();
      setProduct(result);
  }
  
  async function timKiem(){
    const formData = new FormData();  
    formData.append("keysearch", keysearch);
    //Gọi api để lấy tất cả cart ra

    let result = await fetch("http://127.0.0.1:8000/api/getsearch", {
        method: "post",
        body: formData,
    });
    result = await result.json();
    setSearch(result);
console.log("Tìm kiếm :",result);

}



async function deleteProduct(id) {
  await fetch("http://localhost:8000/api/deleteproduct/" + id, {
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


<AdminHeader/>
  
    <ReactNotification/>
    {/* /.sidebar */}

  {/* Content Wrapper. Contains page content */}
  <div className="content-wrapper">
    {/* Content Header (Page header) */}
    <div className="content-header">
      <div className="container-fluid">
        <div className="row mb-2">
          <div className="col-sm-6">
            
            <h4 className="m-0">Danh sách sản phẩm</h4>

            <Form className="d-flex">
              <FormControl
                  name="keysearch"
                  type="search"
                  placeholder="Search"
                  className="mr-2"
                  aria-label="Search"
                  onChange={(e) => setKeySearch(e.target.value)}
              />
              <Button onClick={timKiem} variant="outline-success">Search</Button>
            </Form>

              
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
              Giá mới
            </th>
            <th style={{width: '15%'}}>
              Giá cũ
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

        {getsearch.map((product, key) => (
          <tr key={key}>
            <td>
            {product.id}
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
            {product.price_old} VNĐ
            </td>
            <td>
            {product.discount} VNĐ
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
              <Link to={"editproduct/"+ product.id + "/"}>
              <a className="btn btn-info btn-sm" href="#">
                <i className="fas fa-pencil-alt">
                </i>
                Edit
              </a>
              </Link>
              {/* <button type="button"  class="btn btn-danger btn-sm">Xóa khỏi giỏ</button> */}
              <a className="btn btn-danger btn-s" onClick={() => deleteProduct(product.id)}>
                <i className="fas fa-trash">
                </i>
                Delete
              </a>
            </td>
          </tr>
              ))}



        {getproduct.map((product, key) => (
          <tr key={key}>
            <td>
            {product.id}
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
            {product.price_old} VNĐ
            </td>
            <td>
            {product.discount} VNĐ
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
            <Link to={"editproduct/"+ product.id + "/"}>
              <a className="btn btn-info btn-sm" href="#">
                <i className="fas fa-pencil-alt">a
                </i>
                Edit
              </a>
              </Link>
              {/* <button type="button"  class="btn btn-danger btn-sm">Xóa khỏi giỏ</button> */}
              <a className="btn btn-danger btn-s" onClick={() => deleteProduct(product.id)}>
                <i className="fas fa-trash">
                </i>
                Delete
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
 
 
</div>

 );
}