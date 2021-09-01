import React from 'react';
import { Row,Col } from "react-bootstrap";
import "./main.css";

export default function Dichvu() {
    return (
        <div className="dichvu">
            <Row className="justify-content-center">
                <Col className="item" lg="3">
                <span style={{fontSize: '20px'}}>
                <span style={{color: '#480a21'}}>
                <i class="fas fa-shipping-fast"/>
                <b> Ship toàn quốc</b>
                </span>
                </span>        
                </Col>
                <Col className="item" lg="3">
                <span style={{fontSize: '20px'}}>
                <span style={{color: '#480a21'}}>
                <i class="fas fa-tools"></i>
                <b> Đồ cũ bảo hành 1 tuần</b>
                </span>
                </span>
                </Col>
                <Col className="item" lg="3">
                <span style={{fontSize: '20px'}}>
                <span style={{color: '#480a21'}}>
                <i class="fas fa-hand-holding-heart"/>
                <b> Nhận khuyến mãi khi tặng đồ cũ</b>
                </span>
                </span>
                </Col>
            </Row>
        </div>
    );
}