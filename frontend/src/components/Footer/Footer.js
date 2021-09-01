import React from 'react';
import { Row,Col } from "react-bootstrap";
import "./footer.css";

export default function Footer() {
    return (
        <div className="footer">
            <Row className="justify-content-center">
                <Col className="logo" md="2">
                   <p> MTK SHOP</p>
                </Col>
                <Col className="giatri" md="4">
                    <div className="titles">
                        <p>Giá trị của chúng tôi</p>
                    </div>
                   
                    <Col className="giatri_conten">
                        <p>Tạo nên giá trị mới cho đồ dùng cũ</p>
                        <p>Cũ mình mới ta</p>
                        <p>Hãy biết chia sẻ để nhận lại</p>
                        <p>Bạn là nơi gửi gắm niệm của tôi</p>
                   </Col>
                   

                   

                </Col>
                <Col className="giatri" md="3">
                    <div className="titles">
                        <p>Thông tin liên hệ</p>
                    </div>
                    <Col className="giatri_conten"> 
                    <p>
                        <i
                          className="fas fa-phone"
                          style={{ fontSize: 22, color: "#d54d41" }}
                          aria-hidden="true"
                        />
                            _0918691864
                        </p>
                        <p>
                            <i
                          className="fa fa-envelope"
                          aria-hidden="true"
                          style={{ fontSize: 22, color: "rgb(68 179 225)" }}
                        
                            /> _hungmanh14042001@gmail.com
                        </p>
                        
                        <p>
                        <i
                          className="fa fa-map-marker"
                          style={{ fontSize: 22, color: "#d54d41" }}
                          aria-hidden="true"
                        />
                        
                            _101B Lê Hữu Trác,Sơn Trà, Đà Nẵng
                        </p>

                        
                        
                   </Col>
                   
                

                </Col>
                <Col className="lienket" md="2">
                    <div className="titles">
                        <p> Liên kế xã hội</p>
                    </div>
                    <div>
                    <p className="link">
                      <a href="">
                        <i
                          className="fab fa-facebook"
                          style={{ fontSize: 22, color: "blue" }}
                        />
                      </a>
                      <a href="">
                        <i
                          className="fa fa-map-marker"
                          style={{ fontSize: 22, color: "#d54d41" }}
                          aria-hidden="true"
                        />
                      </a>
                      <a href="#">
                        <i
                          className="fa fa-envelope"
                          aria-hidden="true"
                          style={{ fontSize: 22, color: "rgb(68 179 225)" }}
                        />
                      </a>
                      <a href="">
                        <i
                          className="fa fa-globe"
                          aria-hidden="true"
                          style={{ fontSize: 25, color: "#df0022" }}
                        />
                      </a>
                      <a href="">
                        <i
                          className="fab fa-youtube"
                          aria-hidden="true"
                          style={{ fontSize: 25, color: "#df0022" }}
                        />
                      </a>
                    </p>
                    </div>
                   
                </Col>
            </Row>
        </div>
    );
}