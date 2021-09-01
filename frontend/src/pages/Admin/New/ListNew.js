import React from 'react';
import "../admin.css";
import { useEffect, useState } from "react";
import AdminHeader from '../components/AdminHeader';
import { Link } from "react-router-dom";

import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import { store } from 'react-notifications-component';

export default function ListNew() {

    const [getnew, setNew] = useState([]);
   
   

  useEffect(() => {
      getNew();

  }, []);

  //Gọi api để show product nổi bật
  async function getNew() {
      let result = await fetch("http://127.0.0.1:8000/api/tintuc");
      result = await result.json();
      setNew(result);
  }
  


async function deleteNew(id) {
  await fetch("http://localhost:8000/api/deletenew/" + id, {
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
            
            <h4 className="m-0">Danh sách tin tức của Website</h4>

              
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
              Chủ đề tin tức
            </th>
            <th style={{width: '10%'}}>
              Hình ảnh
            </th>
            <th style={{width: '20%'}} className="text-center">
              Chi tiết tin tức
            </th>
            <th style={{width: '10%'}} className="text-center">
              Cập nhật
            </th>
          </tr>
        </thead><tbody>

        {getnew.map((news, key) => (
          <tr key={key}>
            <td>
            {news.id}
            </td>
            <td>
           {news.name}
            </td>
            <td>
            <img variant="top" src={"http://127.0.0.1:8000/image/tintuc/" + news.image} alt={news.image} style={{width:"200px"}} />
            </td>
            <td>
           
            {news.detail}
            </td>
          
            <td className="project-actions text-right">
            <Link to={"editnew/"+ news.id + "/"}>
              <a className="btn btn-info btn-sm" href="#">
                <i className="fas fa-pencil-alt">a
                </i>
                Edit
              </a>
              </Link>
              {/* <button type="button"  class="btn btn-danger btn-sm">Xóa khỏi giỏ</button> */}
              <a className="btn btn-danger btn-s" onClick={() => deleteNew(news.id)}>
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