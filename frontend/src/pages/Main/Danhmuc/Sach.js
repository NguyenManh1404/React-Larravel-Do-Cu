import React from 'react';
import { useEffect, useState } from "react";
import {Col,CardGroup,Card,Button} from "react-bootstrap";
import { Link } from "react-router-dom";
export default function Sach() {
    const [sach, setSach] = useState([]);
    useEffect(() => {
        getSach();
    }, []);

    async function getSach() {
        let result = await fetch("http://127.0.0.1:8000/api/sach_product");
        result = await result.json();
        setSach(result);
      }
 return (
   <div>
       <Col>
            <div className="titles">
                <h1><b>Trao đổi sách cũ</b></h1>
            </div>
            <CardGroup>
            {sach.map((product, key) => (
                <Col md={3}  className="item" key={key}>
                <Card>
                    <Card.Img variant="top" src={"http://127.0.0.1:8000/image/product/" + product.image} alt={product.image} />
                    <Card.Body>
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Text>
                        <b>Giá mới: {product.price_new} VNĐ</b>
                    </Card.Text>
                    <Card.Text className="price_old">
                        <p>Giá cũ: {product.price_old} VNĐ</p>
                    </Card.Text>
                    <Card.Text>
                        {product.detail}
                    </Card.Text>
                    <Link to={"detailnosigup/" + product.id}>
                        <Button variant="success">
                            Chi tiết
                        </Button>
                    </Link>
                    <Link to={"dangnhap/"}>
                        <Button variant="danger">Mua ngay</Button>
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