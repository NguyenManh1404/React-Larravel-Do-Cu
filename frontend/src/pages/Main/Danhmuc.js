import React from 'react';
import {Tabs,Tab} from "react-bootstrap";

import Dientu from "./Danhmuc/Dientu";
import Noithat from "./Danhmuc/Noithat";
import Phuongtien from "./Danhmuc/Phuongtien";
import Thucung from "./Danhmuc/Thucung";
import Sach from "./Danhmuc/Sach";
import Thoitrang from "./Danhmuc/Thoitrang";
import Chotang from "./Danhmuc/Chotang";

export default function Danhmuc() {
    return (
        <div className="danhmuc">
            <div className="title">
                    <h1>
                        <b>Sản phẩm đồ cũ</b>
                    </h1>
            </div>
            <Tabs
                defaultActiveKey="dientu"
                transition={false}
                id="noanim-tab-example"
                className="mb-3"
            >
                <Tab eventKey="dientu" title="Đồ điện tử">
                    <Dientu/>
                </Tab>
                <Tab eventKey="noithat" title="Nội thất">
                   <Noithat/>
                </Tab>
                <Tab eventKey="phuongtien" title="Phương tiện">
                    <Phuongtien/>
                </Tab>
                <Tab eventKey="thucung" title="Thú cưng">
                    <Thucung/>
                </Tab>
                <Tab eventKey="sach" title="Sách">
                    <Sach/>
                </Tab>
                <Tab eventKey="thoitrang" title="Thời trang">
                    <Thoitrang/>
                </Tab>
                <Tab eventKey="chotang" title="Cho tặng">
                   <Chotang/>
                </Tab>
            </Tabs>

        </div>
    );
}