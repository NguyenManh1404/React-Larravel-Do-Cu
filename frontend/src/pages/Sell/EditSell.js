import React from 'react';
import {Form, Button,Row,Col} from "react-bootstrap";
import Headered from '../../components/Headered/Headered';
import Footer from '../../components/Footer/Footer';

import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import { store } from 'react-notifications-component';

import { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";

function EditSell(props) {
    //chứa thông tin theo id của sell product   
    const [data, setData] = useState([]);


    const [val,setValidator] = useState([]);

    // const [name,setName] = useState(data.name);
    // const [price,setPrice]=useState(data.price);
    // const [discount,setDiscount]=useState(data.discount);
    const [image,setImage] = useState(data.image);
    // const [detail,setDetail] = useState(data.detail);
    const [product_type,setProductType] = useState(data.product_type);
    const [product_status,setProductStatus] = useState(data.product_status);
    // const [quantity,setQuantity] = useState(data.quantity);

    let id = props.match.params.id;
    let taikhoan = JSON.parse(localStorage.getItem("taikhoan"));
    let user_id = taikhoan.id;

    

    useEffect(() => {
        showID();
  
    }, []);



    async function showID(){
      let result = await fetch(
        "http://127.0.0.1:8000/api/showidsell/" + id
      );
      result = await result.json();
      setData(result);
      console.log(result);
    }
    

    async function editSell(){
        const name = document.getElementById("name");
        const price = document.getElementById("price");
        const discount= document.getElementById("discount");
        const detail= document.getElementById("detail");
        const quantity= document.getElementById("quantity");

        const formData = new FormData(); 
        formData.append("user_id",user_id);
        formData.append("name", name.value);
        formData.append("price", price.value);
        formData.append("discount",discount.value);
        formData.append("image",image);
        formData.append("detail",detail.value);
        formData.append("product_type",product_type);
        formData.append("product_status",product_status);
        formData.append("quantity",quantity.value);


        let result = await fetch("http://127.0.0.1:8000/api/editsell/" + id, {
            method: "post",
            body: formData,
          
        });
        result = await result.json();

        console.log("Trả về addproduct :",result);
        
        if(result.val_err){

            //Nếu có lối thì truyền vào cho setValidator
            setValidator(result.val_err)
        }else{
            window.location.reload();
            store.addNotification({
                title: "Chỉnh sửa sản phẩm thành công !",
                message: "Hãy kiểm tra list sản phẩm của bạn !",
                type: 'success',
                insert: "top",
                container: "top-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                    duration: 10000,
                    onScreen: true
                }
            });

        }

    }



 return (
   <div>
    <Headered></Headered>
    <ReactNotification/>

    <Row>
    <Col md={{ span: 4, offset: 4 }}>
      <h2>Chỉnh sản phẩm đang bán</h2>
    <Form className="form"> 
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label><b>Tên sản phẩm muốn bán</b></Form.Label>
            <Form.Control type="text" placeholder="Tên sản phẩm muốn bán của bạn" id="name" defaultValue={data.name} />
            <Form.Text className="text-muted">
                Hãy nhập tên sản phẩm muốn bán của bạn
            </Form.Text>
            <Form.Label className='err'>{val.name}</Form.Label>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label><b>Giá sản phẩm muốn bán</b></Form.Label>
            <Form.Control type="number" placeholder="Giá sản phẩm muốn bán của bạn" id="price" defaultValue={data.price} />
            <Form.Text className="text-muted">
                Hãy nhập giá sản phẩm muốn bán của bạn
            </Form.Text>
            <Form.Label className='err'>{val.price}</Form.Label>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label><b>Phần trăm đã giảm</b></Form.Label>
            <Form.Control type="number" placeholder="Giá đã giảm của sản phẩm muốn bán của bạn" id="discount" defaultValue={data.discount}/>
            <Form.Text className="text-muted">
                Hãy nhập giá đã giảm của sản phẩm muốn bán của bạn
            </Form.Text>
            <Form.Label className='err'>{val.discount}</Form.Label>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label><b>Số lượng sản phẩm muốn bán</b></Form.Label>
            <Form.Control type="number" placeholder="Số lượng sản phẩm muốn bán" id="quantity" defaultValue={data.quantity} />
            <Form.Text className="text-muted">
                Hãy nhập số lượng sản phẩm muốn bán
            </Form.Text>
            <Form.Label className='err'>{val.quantity}</Form.Label>
        </Form.Group>

        <Form.Group className="mb-3" controlId="form------">
            <Form.Label><b>Chọn hình ảnh cho sản phẩm của bạn</b></Form.Label>
            <Form.Control  type="file" placeholder="Chọn hình ảnh cho tin tức" onChange={(e) => setImage(e.target.files[0])} />
            <img variant="top" src={"http://127.0.0.1:8000/image/sell/" + data.image} alt={data.image} style={{width:"150px"}} />
            <Form.Text className="text-muted">
                -
            </Form.Text>
            <Form.Label className='err'>{val.image}</Form.Label>
        </Form.Group>

        <Form.Group className="mb-3" controlId="form------">
            <Form.Label><b>Mô tả của sản phẩm</b></Form.Label>
            <Form.Control  type="text" placeholder="Mô tả của sản phẩm" id="detail" defaultValue={data.detail}/>
            <Form.Text className="text-muted">
                -
            </Form.Text>
            <Form.Label className='err'>{val.detail}</Form.Label>
        </Form.Group>

        <Form.Label><b>Loại sản phẩm</b></Form.Label>
        <Form.Select  onChange={(e) => setProductType(e.target.value)} aria-label="Chọn loại sản phẩm">
        
                    <option>Hãy chọn loại sản phẩm</option>
                    <option value="ban">Bán</option>
                    <option value="chotang">Cho tặng</option>
          </Form.Select>
          <Form.Label className='err'>{val.product_type}</Form.Label>
                <br/><br/><br/><br/>
                <Form.Label><b>Trạng thái sản phẩm</b></Form.Label>
            <Form.Select  onChange={(e) => setProductStatus(e.target.value)} aria-label="Chọn loại sản phẩm">
                    <option>Hãy chọn trạng thái sản phẩm</option>
                    <option value="Đang đăng bán">Đang bán</option>
                    <option value="Dừng ngừng bán">Dừng bán</option>
          </Form.Select>
          <Form.Label className='err'>{val.product_type}</Form.Label>
                <br/><br/><br/><br/>
               
        

    
        
       
        <Button onClick={editSell}  variant="outline-success"><b>Chỉnh sửa ngay</b></Button>{' '}
     
        
    </Form>
    </Col>
    </Row>


    <Footer/>

   </div>
 );
}

export default withRouter(EditSell);