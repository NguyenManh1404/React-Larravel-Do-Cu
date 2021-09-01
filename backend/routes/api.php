<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\TintucController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\SellController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
// Tài khoản
Route::get('getuser',[UserController::class,'getUser']);
Route::post('dangnhap',[UserController::class,'Login']);
Route::post('dangky',[UserController::class,'Register']);

//Product



// Tìm kiếm
Route::post('getsearch',[ProductController::class,'getSearch']);
Route::get('getproduct',[ProductController::class,'index']);
    // Sản phẩm theo id
Route::get('chitiet/{id}',[ProductController::class,'chiTiet']);

Route::get('noibat_product',[ProductController::class,'noiBat']);
Route::get('banchay_product',[ProductController::class,'banChay']);

//Đồ cũ
Route::get('dientu_product',[ProductController::class,'dienTu']);
Route::get('noithat_product',[ProductController::class,'noiThat']);
Route::get('phuongtien_product',[ProductController::class,'phuongTien']);
Route::get('thucung_product',[ProductController::class,'thuCung']);
Route::get('sach_product',[ProductController::class,'Sach']);
Route::get('thoitrang_product',[ProductController::class,'thoiTrang']);

Route::get('chotang_product',[ProductController::class,'choTang']);

//Tin tức
Route::get('tintuc',[TintucController::class,'index']);
Route::post('addnew',[TintucController::class,'addNew']);
Route::delete('deletenew/{id}',[AdminController::class,'deleteNew']);

//Cart
Route::post('cartlist',[CartController::class,'cartList']);
Route::post('getcart',[CartController::class,'soCart']);
Route::post('themvaogio',[CartController::class,'themVaoGio']);
Route::post('tongtien',[CartController::class,'tongTien']);
Route::delete('xoacart/{id}',[CartController::class,'xoaCart']);



//Order
Route::post('getorder',[OrderController::class,'getOrder']);
Route::post('thanhtoan',[OrderController::class,'thanhToan']);
Route::get('getorderall',[OrderController::class,'index']);
Route::get('getorderwaitshipping',[OrderController::class,'choXuatKho']);
Route::get('getordershipping',[OrderController::class,'xuatKho']);
Route::get('getorderhistory',[OrderController::class,'daGiaoHang']);
Route::delete('deleteorder/{id}',[OrderController::class,'deleteOrder']);
Route::get('historybuy/{id}',[OrderController::class,'lichSuMua']);


//Admin
Route::post('addproduct',[AdminController::class,'addProduct']);
Route::post('editproduct/{id}',[AdminController::class,'editProduct']);
Route::delete('deleteproduct/{id}',[AdminController::class,'deleteProduct']);
Route::get('showid/{id}',[AdminController::class,'showID']);
Route::post('xacnhanorder/{id}',[AdminController::class,'xacNhanOrder']);
Route::post('xuatkho/{id}',[AdminController::class,'xuatKho']);
Route::post('vanchuyen/{id}',[AdminController::class,'vanChuyen']);


//Comment
Route::post('createcomment',[CommentController::class,'createComment']);
Route::get('getcomment/{id}',[CommentController::class,'getComment']);


//Sell
Route::get('getsell',[SellController::class,'getSell']);
Route::post('addsell',[SellController::class,'addSell']);
Route::post('getlistsell',[SellController::class,'getListSell']);
Route::delete('deletesell/{id}',[SellController::class,'deleteSell']);
Route::get('showidsell/{id}',[SellController::class,'showID']);
Route::post('editsell/{id}',[SellController::class,'editSell']);
Route::get('chitietsell/{id}',[SellController::class,'chiTietSell']);
