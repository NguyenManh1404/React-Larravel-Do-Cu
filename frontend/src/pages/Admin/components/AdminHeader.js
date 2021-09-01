import React from 'react';
import { useState } from "react";
import {Dropdown} from "react-bootstrap";
import Offcanvas from 'react-bootstrap/Offcanvas'

export default function AdminHeader() {




    // NÚT THANH XỔ BÊN TRÁI
    const options = [
        
        {
          name: 'Disable backdrop',
          scroll: false,
          backdrop: false,
        }
        
      ];
      
      function OffCanvasExample({ name, ...props }) {
        const [show, setShow] = useState(false);
      
        const handleClose = () => setShow(false);
        const toggleShow = () => setShow((s) => !s);
      
        return (
          <>

            <a className="nav-link" onClick={toggleShow} data-widget="pushmenu" href="#" role="button"><i className="fas fa-bars" /></a> 

            <Offcanvas show={show} onHide={handleClose} {...props}>
              <Offcanvas.Header closeButton>
                <Offcanvas.Title>DANH MỤC QUẢN LÝ</Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
            <div>
            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                <i class="fas fa-users"> Quản lý người dùng</i> 
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="admin">Danh sách người dùng</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">Thêm người dùng mới</Dropdown.Item>
                  <Dropdown.Item href="#/action-3">Thống kê người dùng</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
<br/><br/><br/><br/><br/>
              <Dropdown>
                <Dropdown.Toggle variant="warning"  id="dropdown-basic">
                <i class="fas fa-store"> Quản lý sản phẩm</i>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="listproduct">Danh sách sản phẩm</Dropdown.Item>
                  <Dropdown.Item href="addproduct">Thêm sản phẩm mới</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">Thống kê sản phẩm</Dropdown.Item>
                
                </Dropdown.Menu>
              </Dropdown>
              <br/><br/><br/><br/><br/>
              <Dropdown>
                <Dropdown.Toggle variant="info" id="dropdown-basic">
                <i class="fas fa-cart-plus"> Quản lý order</i>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="listorder">Đơn hàng mới</Dropdown.Item>
                  <Dropdown.Item href="waitshipping">Đơn hàng chờ xuất kho</Dropdown.Item>
                  <Dropdown.Item href="/shipping">Đơn hàng đang vận chuyển</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <br/><br/><br/><br/><br/>
              <Dropdown>
                <Dropdown.Toggle variant="primary" id="dropdown-basic">
                <i class="fas fa-history"> Lịch sử mua hàng</i>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="/orderhistory">Thanh toán thành công</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">Hủy thanh toán</Dropdown.Item>
                  <Dropdown.Item href="#/action-3">Bảo hành sản phẩm</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <br/><br/><br/><br/><br/>
              <Dropdown>
                <Dropdown.Toggle variant="primary" id="dropdown-basic">
                <i class="fas fa-history"> Quản lý tin tức</i>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="/listnew">Danh sách tin tức</Dropdown.Item>
                  <Dropdown.Item href="/addnew">Thêm tin mới</Dropdown.Item>
                  {/* <Dropdown.Item href="#/action-3">Bảo hành sản phẩm</Dropdown.Item> */}
                </Dropdown.Menu>
              </Dropdown>
            </div>
              <hr></hr>
            

              </Offcanvas.Body>
            </Offcanvas>
          </>
        );
      }


 return (
   <div>
       <div className="wrapper">
  {/* Preloader */}
  {/* Navbar */}
  <nav className="main-header navbar navbar-expand navbar-white navbar-light">
    {/* Left navbar links */}
    <ul className="navbar-nav">
      <li className="nav-item">
        {/* // NÚT THANH XỔ BÊN TRÁI */}
        <>
            {options.map((props, idx) => (
                <OffCanvasExample key={idx} {...props} />
            ))}
        </>
        {/* // NÚT THANH XỔ BÊN TRÁI */}
      </li>
      <li className="nav-item d-none d-sm-inline-block">
      <h4><b><a href="/" className="nav-link">Trang người dùng</a></b></h4>
      
      </li>
      <li className="nav-item d-none d-sm-inline-block">
      <h4><b><a href="/admin" className="nav-link">Trang chủ admin</a></b></h4>
      </li>
      
    </ul>
    {/* Right navbar links */}
    <ul className="navbar-nav ml-auto">
      {/* Navbar Search */}
      <li className="nav-item">
        
        <div className="navbar-search-block">
          <form className="form-inline">
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
      </li>
      {/* Messages Dropdown Menu */}
      <li className="nav-item dropdown">
        <a className="nav-link" data-toggle="dropdown" href="#">
          <i className="far fa-comments" />
          <span className="badge badge-danger navbar-badge">3</span>
        </a>
        <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
          <a href="#" className="dropdown-item">
            {/* Message Start */}
            <div className="media">
              <img src="dist/img/user1-128x128.jpg" alt="User Avatar" className="img-size-50 mr-3 img-circle" />
              <div className="media-body">
                <h3 className="dropdown-item-title">
                  Brad Diesel
                  <span className="float-right text-sm text-danger"><i className="fas fa-star" /></span>
                </h3>
                <p className="text-sm">Call me whenever you can...</p>
                <p className="text-sm text-muted"><i className="far fa-clock mr-1" /> 4 Hours Ago</p>
              </div>
            </div>
            {/* Message End */}
          </a>
          <div className="dropdown-divider" />
          <a href="#" className="dropdown-item">
            {/* Message Start */}
            <div className="media">
              <img src="dist/img/user8-128x128.jpg" alt="User Avatar" className="img-size-50 img-circle mr-3" />
              <div className="media-body">
                <h3 className="dropdown-item-title">
                  John Pierce
                  <span className="float-right text-sm text-muted"><i className="fas fa-star" /></span>
                </h3>
                <p className="text-sm">I got your message bro</p>
                <p className="text-sm text-muted"><i className="far fa-clock mr-1" /> 4 Hours Ago</p>
              </div>
            </div>
            {/* Message End */}
          </a>
          <div className="dropdown-divider" />
          <a href="#" className="dropdown-item">
            {/* Message Start */}
            <div className="media">
              <img src="dist/img/user3-128x128.jpg" alt="User Avatar" className="img-size-50 img-circle mr-3" />
              <div className="media-body">
                <h3 className="dropdown-item-title">
                  Nora Silvester
                  <span className="float-right text-sm text-warning"><i className="fas fa-star" /></span>
                </h3>
                <p className="text-sm">The subject goes here</p>
                <p className="text-sm text-muted"><i className="far fa-clock mr-1" /> 4 Hours Ago</p>
              </div>
            </div>
            {/* Message End */}
          </a>
          <div className="dropdown-divider" />
          <a href="#" className="dropdown-item dropdown-footer">See All Messages</a>
        </div>
      </li>
      {/* Notifications Dropdown Menu */}
      <li className="nav-item dropdown">
        <a className="nav-link" data-toggle="dropdown" href="#">
          <i className="far fa-bell" />
          <span className="badge badge-warning navbar-badge">15</span>
        </a>
        <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
          <span className="dropdown-item dropdown-header">15 Notifications</span>
          <div className="dropdown-divider" />
          <a href="#" className="dropdown-item">
            <i className="fas fa-envelope mr-2" /> 4 new messages
            <span className="float-right text-muted text-sm">3 mins</span>
          </a>
          <div className="dropdown-divider" />
          <a href="#" className="dropdown-item">
            <i className="fas fa-users mr-2" /> 8 friend requests
            <span className="float-right text-muted text-sm">12 hours</span>
          </a>
          <div className="dropdown-divider" />
          <a href="#" className="dropdown-item">
            <i className="fas fa-file mr-2" /> 3 new reports
            <span className="float-right text-muted text-sm">2 days</span>
          </a>
          <div className="dropdown-divider" />
          <a href="#" className="dropdown-item dropdown-footer">See All Notifications</a>
        </div>
      </li>
      <li className="nav-item">
        <a className="nav-link" data-widget="fullscreen" href="#" role="button">
          <i className="fas fa-expand-arrows-alt" />
        </a>
      </li>
    </ul>
  </nav>
  </div>
   </div>
 );
}