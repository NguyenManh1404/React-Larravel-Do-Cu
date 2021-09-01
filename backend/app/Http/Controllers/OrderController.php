<?php

namespace App\Http\Controllers;
use App\Models\Order;
use App\Models\Cart;
use App\Models\Product;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class OrderController extends Controller
{

    function index(){

        $data = DB::table('orders')
        ->join('products','orders.product_id','=','products.id')
        ->select('products.*','orders.*','orders.created_at as day_buy')
        ->where('orders.order_status',"chờ xác nhận")
        ->get();
        return response()->json($data);

    }


    function choXuatKho(){

        $data = DB::table('orders')
        ->join('products','orders.product_id','=','products.id')
        ->select('products.*','orders.*','orders.created_at as day_buy')
        ->where('orders.order_status',"chờ xuất kho")
        ->get();
        return response()->json($data);

    }

    function xuatKho(){

        $data = DB::table('orders')
        ->join('products','orders.product_id','=','products.id')
        ->select('products.*','orders.*','orders.created_at as day_buy')
        ->where('orders.order_status',"đang vận chuyển")
        ->get();
        return response()->json($data);

    }


    function daGiaoHang(){
        $data = DB::table('orders')
        ->join('products','orders.product_id','=','products.id')
        ->select('products.*','orders.*','orders.created_at as day_buy')
        ->where('orders.order_status',"giao hàng thành công")
        ->get();
        return response()->json($data);
    }


    function lichSuMua($id){
        $data = DB::table('orders')
        ->join('products','orders.product_id','=','products.id')
        ->select('products.*','orders.*','orders.created_at as day_buy')
        ->where('orders.order_status',"giao hàng thành công")
        ->where('orders.user_id',$id)
        ->get();
        return response()->json($data);
    }




    function thanhToan(Request $req){

        $val = Validator::make($req->all(),
        [
            "phone"=>"required",
            "address"=>"required",
            "order_comment"=>"required",
            "payment"=>"required",

        ],
        [
            "phone.required"=>"Bạn phải điền số điện thoại",
            "address.required"=>"Bạn phải điền địa chỉ nhận hàng",
            "order_comment.required"=>"Hãy nhận để lại lời nhắn",
            "payment.required"=>"Hãy lựa chọn phương thức thanh toán",
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

            $cartall = Cart::where('user_id',$req->user_id)->get();
            $date = Carbon::now();
            $var =$date->roundMinute(10)->format('H:i:s'); 
            foreach ($cartall as $cart) {
                $order = new Order;
                $order->product_id=$cart['product_id'];
                $order->user_id=$cart['user_id'];
                $order->phone=$req->phone;
                $order->address=$req->address;
                $order->order_comment=$req->order_comment;
                $order->order_status="Chờ xác nhận";
                $order->order_code=$req->order_code . $var;
                $order->payment=$req->payment;
                $order->payment_status="Chờ xác nhận";

                $order->save();

            //Xóa Cart sau khi thanh toán
            //Khi thanh toán thì xóa tất cả sản phẩm trong cart bởi vì khi thanh toán thì thanh toán tất cả sản phẩm trong card luôn
                Cart::where('user_id',$req->user_id)->delete(); 
            }
            $order= Order::all();
            return response()->json([
                'status'=>200,
                'message'=>"Đã thanh toán thanh công",
            ]);
        }
    }
     
    function getOrder(Request $req){
        if($req->user_id){
            $order = DB::table('orders')
            ->join('products','orders.product_id','=','products.id')
            ->where('orders.user_id',$req->user_id)
            ->select('products.*','orders.*','orders.created_at as day_buy')
            ->get();
            return $order;
        }


    }


    function deleteOrder($id){
        $order = Order::where('id',$id)->delete();
        return $order;
    }

    



}
