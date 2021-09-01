<?php

namespace App\Http\Controllers;
use App\Models\User;
use App\Models\Product;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AdminController extends Controller
{




    //Product
    public function addProduct(Request $req){

        $val = Validator::make($req->all(),
            [
                "name"=>"required",
                "price_new"=>"required",
                "price_old"=>"required",
                "discount"=>"required",
                "image"=>"required",
                "detail"=>"required",
                "product_type"=>"required",
                "quantity"=>"required",
                "product_status"=>"required",

            ],
            [
                "name.required"=>"Bạn phải điền tên sản phẩm",
                "price_new.required"=>"Bạn phải điền giá mới",
                "price_old.required"=>"Bạn phải điền giá cũ",
                "discount.required"=>"Bạn phải điền giảm giá",
                "image.required"=>"Bạn phải chọn hình ảnh",
                "detail.required"=>"Bạn phải điền chi tiết sản phẩm",
                "product_type.required"=>"Bạn phải chọn loại sản phẩm",
                "quantity.required"=>"Bạn phải điền số lượng sản phẩm trong kho",
                "product_status.required"=>"Bạn phải điền trạng thái sản phẩm",
                
            ]
        );
        
        if($val->fails())
        {
            return response()->json([
                'val_err'=>$val->messages(),
            ]);
        }
        else
        {
            $name="";

            
            if($req->hasfile('image')){

            $file =$req->file('image');
            $name=time().'_'.$file->getClientOriginalName();
            $destinationPath=public_path('image/product');
            $file->move($destinationPath,$name);



                $product = new Product;
                $product->name= $req->name;
                $product->price_new=$req->price_new;
                $product->price_old=$req->price_old;
                $product->discount=$req->discount;
                // $product->image=$req->file('image')->store('image/product');
                $product->image=$name;
                $product->detail=$req->detail;
                $product->product_type=$req->product_type;
                $product->quantity=$req->quantity;
                $product->product_status=$req->product_status;
                $product->save();
                 
                return $product;   
            }
        }
    }

    function showID($id){
        return Product::find($id);
        
    }

    public function editProduct(Request $req,$id){

        $val = Validator::make($req->all(),
            [
                "name"=>"required",
                "price_new"=>"required",
                "price_old"=>"required",
                "discount"=>"required",
                "detail"=>"required",
                "product_type"=>"required",
                "quantity"=>"required",
                "product_status"=>"required",

            ],
            [
                "name.required"=>"Bạn phải điền tên sản phẩm",
                "price_new.required"=>"Bạn phải điền giá mới",
                "price_old.required"=>"Bạn phải điền giá cũ",
                "discount.required"=>"Bạn phải điền giảm giá",
                "detail.required"=>"Bạn phải điền chi tiết sản phẩm",
                "product_type.required"=>"Bạn phải chọn loại sản phẩm",
                "quantity.required"=>"Bạn phải điền số lượng sản phẩm trong kho",
                "product_status.required"=>"Bạn phải điền trạng thái sản phẩm",
                
            ]
        );
        
        if($val->fails())
        {
            return response()->json([
                'val_err'=>$val->messages(),
            ]);
        }
        else
        {
            $name="";

            
            if($req->hasfile('image')){

            $file =$req->file('image');
            $name=time().'_'.$file->getClientOriginalName();
            $destinationPath=public_path('image/product');
            $file->move($destinationPath,$name);



                $product =Product::find($id);
                $product->name= $req->name;
                $product->price_new=$req->price_new;
                $product->price_old=$req->price_old;
                $product->discount=$req->discount;
                
                $product->image=$name;
                $product->detail=$req->detail;
                $product->product_type=$req->product_type;
                $product->quantity=$req->quantity;
                $product->product_status=$req->product_status;
                $product->save();
                 
                return $product;   
            }
        }
    }

    public function deleteProduct($id){
        $product = Product::where('id',$id)->delete();
        return $product;
    }


    public function xacNhanOrder(Request $req,$id){

        // $userId=$req->user_id;
        
          
                $order = new Order;
                $order->product_id=$id;
                $order->user_id=$req->user_id;
                $order->phone=$req->phone;
                $order->address=$req->address;
                $order->order_comment=$req->order_comment;
                $order->order_status="Chờ xuất kho";
                $order->order_code=$req->order_code;
                $order->payment=$req->payment;
                $order->payment_status="Chờ xác nhận";

                $order->save();
                // return  $req->order_id;

                Order::where('id',$req->order_id)->delete();
                return $order;
                
               
        
    }
    public function xuatKho(Request $req,$id){

        // $userId=$req->user_id;
        
          
                $order = new Order;
                $order->product_id=$id;
                $order->user_id=$req->user_id;
                $order->phone=$req->phone;
                $order->address=$req->address;
                $order->order_comment=$req->order_comment;
                $order->order_status="Đang vận chuyển";
                $order->order_code=$req->order_code;
                $order->payment=$req->payment;
                $order->payment_status="Chờ xác nhận";

                $order->save();
                // return  $req->order_id;

                Order::where('id',$req->order_id)->delete();
                return $order;
               
    }

    public function vanChuyen(Request $req,$id){

        // $userId=$req->user_id;
        
          
                $order = new Order;
                $order->product_id=$id;
                $order->user_id=$req->user_id;
                $order->phone=$req->phone;
                $order->address=$req->address;
                $order->order_comment=$req->order_comment;
                $order->order_status="Giao hàng thành công";
                $order->order_code=$req->order_code;
                $order->payment=$req->payment;
                $order->payment_status="Thanh toán thành công";

                $order->save();
                

                Order::where('id',$req->order_id)->delete();
                return $order;
                
              
    }

}
