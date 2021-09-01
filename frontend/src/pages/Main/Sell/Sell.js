import React from 'react';
import { useEffect, useState } from "react";
import { Col, CardGroup, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";


import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import { store } from 'react-notifications-component';

export default function Sell() {


    const [sell, setSell] = useState([]);


    useEffect(() => {
        getSell();

    }, []);

    //Gọi api để show product nổi bật
    async function getSell() {
        let result = await fetch("http://127.0.0.1:8000/api/getsell");
        result = await result.json();
        setSell(result);
    }


    return (
        <div>
             <ReactNotification />
            <Col>
                <div className="title">
                    <h1><b>Sản phẩm đăng bán</b></h1>
                </div>
                <CardGroup>
                    {sell.map((product, key) => (
                        <Col md={3} className="item" key={key}>
                            <Card>
                                <Card.Img variant="top" src={"http://127.0.0.1:8000/image/sell/" + product.image} alt={product.image} />
                                <Card.Body>
                                    <Card.Title>{product.name}</Card.Title>
                                    <Card.Text>
                                        <b>Giá mới: {product.price} VNĐ</b>
                                    </Card.Text>
                                    <Card.Text className="price_old">
                                        <p>Phần trăm giảm: {product.discount} %</p>
                                    </Card.Text>
                                    <Card.Text>
                                        {product.detail}
                                    </Card.Text>

                                    <Link to={"detailsellnosigup/" + product.id}>
                                        <Button variant="success">
                                            Chi tiết
                                        </Button>
                                    </Link>
                                    <Link to={"dangnhap"}>
                                        <Button variant="danger" >Mua ngay</Button>
                                    </Link> 
                                </Card.Body>
                                <Card.Footer>
                                    <small className="text-muted">{product.product_status}</small>
                                </Card.Footer>
                            </Card>
                        </Col>
                    ))}
                </CardGroup>
            </Col>
        </div>
    );
}