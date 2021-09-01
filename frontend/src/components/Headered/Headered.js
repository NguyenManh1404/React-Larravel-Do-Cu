import React from 'react';
import Baner from '../Baner/Baner';
import "./headered.css";
import { Container } from "react-bootstrap";
import { Navbar,Button,Nav,NavDropdown,Form,FormControl,Col,CardGroup,Card } from 'react-bootstrap';
import { Link } from "react-router-dom";

import { useHistory} from "react-router-dom";
import { useEffect, useState } from "react";
function Headered() {
    const history = useHistory();
    const [getcart, setGetCart] = useState([]);
    const [keysearch, setKeySearch] = useState("");
    const [getsearch, setSearch] = useState([]);
   

    useEffect(() => {
        getCart();

    }, []);
    let taikhoan = JSON.parse(localStorage.getItem("taikhoan"));


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









    async function getCart() {
        if(taikhoan){
        let user_id = taikhoan.id;


        const formData = new FormData();  
        formData.append("user_id", user_id);
        //Gọi api để lấy tất cả cart ra

        let result = await fetch("http://127.0.0.1:8000/api/getcart", {
            method: "post",
            body: formData,
        });
        result = await result.json();
        setGetCart(result);
        }
    }



    async function dangxuat() {
        localStorage.clear();
        history.push("/");
      }


    return (
        <Container fluid>
            <Baner></Baner>
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="/mained"><b>MTK SHOP</b></Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="mr-auto my-5 my-lg-0"
                       
                        navbarScrollfd
                    >
                        <Nav.Link href="/mained"><b>Trang Chủ</b></Nav.Link>
                        <Nav.Link disabled href="#"><b>Ưu đãi</b></Nav.Link>
                        <Nav.Link href="/order"><b>Đơn hàng của bạn</b></Nav.Link>
                        
                        <NavDropdown title="Danh mục" id="navbarScrollingDropdown">
                                <NavDropdown.Item href="/sell">Bán đồ cũ</NavDropdown.Item>
                                <NavDropdown.Item href="/listsell">List sản phẩm đang bán</NavDropdown.Item>
                        </NavDropdown>
                        
                        <Nav.Link href="/orderhistoryuser"><b>Lịch sử mua hàng</b></Nav.Link>
                        <Nav.Link href="#" disabled><b>Quản lý bán hàng</b></Nav.Link>
                        
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
                    <Link to="/cart">
                        <span style={{fontSize: 20, color: '#5a1e0c'}}>
                            <i className="fas fa-cart-plus" >{getcart}</i>
                        </span>
                    </Link>
                    
                    <NavDropdown title={taikhoan.name}>
                        <Nav.Link onClick={dangxuat}>Đăng xuất</Nav.Link >
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

                                    <Link to={"detail/" + product.id}>
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
export default Headered