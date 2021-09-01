import React from 'react';
import "./header.css";
import { Container } from "react-bootstrap";
import { Navbar,Button,Nav,NavDropdown,Form,FormControl,Col,CardGroup,Card } from 'react-bootstrap';
import { Link } from "react-router-dom";
import Baner from '../Baner/Baner';
import { useState } from "react";
function Header() {
    const [keysearch, setKeySearch] = useState("");
    const [getsearch, setSearch] = useState([]);



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
    return (
        <Container fluid>
             <Baner></Baner>
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="#"><b>MTK SHOP</b></Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="mr-auto my-5 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScrollfd
                    >
                        <Nav.Link href="/"><b>Trang Chủ</b></Nav.Link>
                        <Nav.Link href="/dangnhap"><b>Sản phẩm 0 đ</b></Nav.Link>
                       
                        <NavDropdown title="Danh mục" id="navbarScrollingDropdown">
                                <NavDropdown.Item href="/dangnhap">Bán đồ cũ</NavDropdown.Item>
                                <NavDropdown.Item href="/dangnhap">Mua đồ cũ</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="/dangnhap">Tặng đồ</NavDropdown.Item>
                            </NavDropdown>
                        <Nav.Link>
                           
                        </Nav.Link>
                        
                    </Nav>
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
                    <Nav className="user">
                    <span style={{fontSize: 20, color: '#5a1e0c'}}>
                        <i className="fas fa-user-lock" />
                    </span>
                    <NavDropdown title="Tài khoản">
                        <Nav.Link href="/dangnhap">Đăng nhập</Nav.Link >
                        <Nav.Link  href="/dangky">Đăng ký</Nav.Link >
                    </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

            <Col>
                <CardGroup>
                    {getsearch.map((product, key) => (
                        
                        <Col md={3} className="item" key={key}>
                       
                            <Card>
                            Tìm kiếm
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
                                </Card.Body>
                                <Card.Footer>
                                    <small className="text-muted">{product.product_status}</small>
                                </Card.Footer>
                            </Card>
                        </Col>
                    ))}
                </CardGroup>
            </Col>



        </Container>
    );
}
export default Header