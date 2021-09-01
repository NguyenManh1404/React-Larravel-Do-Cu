import React from 'react';
import "./admin.css";
import { useEffect, useState } from "react";
import AdminHeader from './components/AdminHeader';
export default function Admin() {

  const [getuser, setUser] = useState([]);

  useEffect(() => {
      getUser();

  }, []);



  async function getUser() {
    let result = await fetch("http://127.0.0.1:8000/api/getuser");
    result = await result.json();
    setUser(result);
}


 return (
   <div>


<AdminHeader/>

  {/* Content Wrapper. Contains page content */}
  <div className="content-wrapper">
    {/* Content Header (Page header) */}
    <div className="content-header">
      <div className="container-fluid">
        <div className="row mb-2">
          <div className="col-sm-6">
           
            <div className="navbar-search-block">
            
          <form className="form-inline">
          <h4 className="m-0">Danh sách người dùng</h4>
            <div className="input-group input-group-sm">
              <input className="form-control form-control-navbar" type="search" placeholder="Search" aria-label="Search" />
              <div className="input-group-append">
                <button className="btn btn-navbar" type="submit">
                  <i className="fas fa-search" />
                </button>
              </div>
            </div>
          </form>
        </div>
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
            <th style={{width: '5%'}}>
              id
            </th>
            <th style={{width: '25%'}}>
              Tên Tài Khoản
            </th>
            <th style={{width: '25%'}}>
              Email
            </th>
            <th>
              Mật Khẩu
            </th>
            <th style={{width: '8%'}} className="text-center">
              Status
            </th>
            <th style={{width: '20%'}} className="text-center">
              Cập nhật
            </th>
          </tr>
        </thead><tbody>
        {getuser.map((user, key) => (
          <tr  key={key}>
            <td>
            {user.id}
            </td>
            <td>
            {user.name}
            </td>
            <td>
            {user.email}
            </td>
            <td className="project_progress">
            {user.password}Đã bị ẩn
            </td>
            <td className="project-state">
              <span className="badge badge-success">Đang hoạt động</span>
            </td>
            <td className="project-actions text-right">
              <a className="btn btn-info btn-sm" href="#">
                <i className="fas fa-pencil-alt">
                </i>
                Edit
              </a>
              {/* <button type="button"  class="btn btn-danger btn-sm">Xóa khỏi giỏ</button> */}
              <a className="btn btn-danger btn-sm" onclick="window.location='{{ route('xoauser',$item->id) }}'">
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