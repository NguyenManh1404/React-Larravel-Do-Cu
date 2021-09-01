<?php

namespace App\Http\Controllers;
use App\Models\Cart;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CartController extends Controller
{
    public function cartList(Request $req)
    {

        $cartlist = DB::table('carts')
        ->join('products','carts.product_id','=','products.id')
        ->where('carts.user_id',$req->user_id)
        ->select('products.*','carts.id as cart_id')
        ->get();
        return $cartlist;

    }

    function themVaoGio(Request $req)
    {    
        $cart= new Cart;
        $cart->user_id=$req->user_id;
        $cart->product_id=$req->product_id;
        $cart->save();
        return $cart->all();
    }

    function soCart(Request $req){
       $cart = Cart::where('user_id',$req->user_id)->count();
       return $cart;
    }

    function xoaCart($id)
    {
        $cart = Cart::where('id',$id)->delete();
        return $cart;
    }
   
    function tongTien(Request $req){

        $tongtien=DB::table('carts')
        ->join('products','carts.product_id','=','products.id')
        ->where('carts.user_id',$req->user_id)
        ->sum('products.price_new');

        return $tongtien;
    }


}
