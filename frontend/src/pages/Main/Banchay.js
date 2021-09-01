import React from 'react';
import { useEffect, useState } from "react";
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import {Button} from "react-bootstrap";
import { Link } from "react-router-dom";


import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import { store } from 'react-notifications-component';


import "./main.css";

export default function Banchay() {
    const [banchay, setBanChay] = useState([]);
    useEffect(() => {
        getBanChay();
    }, []);

    async function getBanChay() {
        let result = await fetch("http://127.0.0.1:8000/api/banchay_product");
        result = await result.json();
        setBanChay(result);
    }



//Giỏ hàng
    //Lấy thông tin user trong LocalStorage
    
    //Hàm thêm sản phẩm vào giỏ hàng
    async function themVaoGio(id) {

        
       
       
       

        
    }
//Giỏ hàng






    return (
        
        <div className="banchay">
            <ReactNotification />
            <div className="title">
                    <h1>
                        <b>Sản phẩm bán chạy</b>
                    </h1>
            </div>
            <div>
            
            {banchay.length && (
                <OwlCarousel className='owl-theme' loop margin={10} nav>
                    {banchay.map((product, key) => {
                        return (
                            <div class='items'  key={key}>
                                <details>
                                    <summary>
                                    <img
                                        className="d-block w-100"
                                        src={"http://127.0.0.1:8000/image/product/" + product.image}
                                        alt="First slide"
                                    />
                                    </summary>
                                    <div className="mota_banchay">
                                    <b><p>Sản phẩm: {product.name}</p></b>
                                    <b><p>Giá: {product.price_new} VNĐ</p></b>
                                    <p>Giá cũ: {product.price_old} VNĐ</p>
                                    <b><p>Chi tiết: {product.detail}</p></b>
                                    <Link to={"detailnosigup/" + product.id}>
                                        <Button variant="success">
                                            Chi tiết
                                        </Button>
                                    </Link>
                                    <Link to={"dangnhap/"}>
                                        <Button variant="danger">Mua ngay</Button>
                                    </Link>
                                  
                                    </div>
                                </details>
                            </div>
                        );
                    })}
                </OwlCarousel>
            )}
            </div>
        </div>

    );
}