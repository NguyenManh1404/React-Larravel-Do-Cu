<?php

namespace App\Http\Controllers;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index()
    {

        $data = Product::all();
        return response()->json($data);
    }




    public function noiBat()
    {

        $noibat=Product::
        where('product_type', 'like', 'noibat')->get();
        return response()->json($noibat);
    }

    public function banChay()
    {
        $banchay=Product::
        where('product_type', 'like', 'banchay')->get();
        return response()->json($banchay);
    }

    public function dienTu()
    {
        $dientu=Product::
        where('product_type', 'like', 'dientu')->get();
        return response()->json($dientu);
    }

    public function noiThat()
    {
        $noithat=Product::
        where('product_type', 'like', 'noithat')->get();
        return response()->json($noithat);
    }

    public function phuongTien()
    {
        $phuongtien=Product::
        where('product_type', 'like', 'phuongtien')->get();
        return response()->json($phuongtien);
    }

    public function thuCung()
    {
        $thucung=Product::
        where('product_type', 'like', 'thucung')->get();
        return response()->json($thucung);
    }

    public function Sach()
    {
        $sach=Product::
        where('product_type', 'like', 'sach')->get();
        return response()->json($sach);
    }
    
    public function thoiTrang()
    {
        $thoitrang=Product::
        where('product_type', 'like', 'thoitrang')->get();
        return response()->json($thoitrang);
    }


    public function choTang()
    {
        $chotang=Product::
        where('product_type', 'like', 'chotang')->get();
        return response()->json($chotang);
    }


//Add product



   



// Sản phẩm theo id

    function chiTiet($id){
        return Product::find($id);
        
    }



    public function getSearch(Request $req){
        $products= Product:: where('name','like','%'.$req->input('keysearch').'%')
                            ->orWhere('price_new','like','%'.$req->input('keysearch').'%')
                            ->get();

        return $products;
    }



}
