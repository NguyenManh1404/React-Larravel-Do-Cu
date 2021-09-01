import React from 'react';
import {Row,Col,Carousel} from "react-bootstrap";
export default function Slide() {
 return (
   <div>
        <Row className="containe">
            <Col sm={9}  className="left">
                <Carousel >
                    <Carousel.Item className="slide">
                        <img
                        className="d-block w-100"
                        src="image/slide/1.jpg"
                        alt="First slide"
                        />
                        <Carousel.Caption className="text">
                        <h3>Sản phẩm cũ sẽ thay đổi</h3>
                        <p>Các sản phẩm đã được cải tạo lại</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                        className="d-block w-100"
                        src="image/slide/3.jpg"
                        alt="Second slide"
                        />

                        <Carousel.Caption className="text">
                        <h3>Cho đi để nhận lại</h3>
                        <p>Tôi đã cho đi để nhận lại rất nhiều giá trị</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                        className="d-block w-100"
                        src="image/slide/4.jpg"
                        alt="Third slide"
                        />

                        <Carousel.Caption className="text">
                        <h3>Đồ cũ là kỷ niệm</h3>
                        <p>Hãy luôn quý trọng những kỷ niệm của bạn</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </Col>
            <Col sm={3} className="right">
                
                <img src="image/slide/anh2.jpg"
                        alt="Third slide"/>
                        <img src="image/slide/anh5.jpg"
                        alt="Third slide"/>
            </Col>
        </Row>
   </div>
 );
}