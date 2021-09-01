<?php

namespace App\Http\Controllers;
use App\Models\Sell;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
class SellController extends Controller
{
    public function getSell(){
        $data=Sell::
        where('product_status', 'like', 'đang đăng bán')->get();
        return response()->json($data);
    }


    function chiTietSell($id){
        $data = DB::table('sells')
        ->join('users','sells.user_id','=','users.id')
        ->select('users.*','sells.*')
        ->where('sells.id',$id)
        ->get();
        return $data;
    }

  

    public function addSell(Request $req){

        $val = Validator::make($req->all(),
            [
               
                "price"=>"required",
                "name"=>"required",
                "discount"=>"required",
                "image"=>"required",
                "detail"=>"required",
                "product_type"=>"required",
                "quantity"=>"required",

            ],
            [  
                
                "name.required"=>"Bạn phải điền tên sản phẩm",
                "price.required"=>"Bạn phải điền giá san phẩm",
                "discount.required"=>"Bạn phải điền số tiền đã giảm ",
                "image.required"=>"Bạn phải chọn hình ảnh",
                "detail.required"=>"Bạn phải điền mô tả sản phẩm",
                "product_type.required"=>"Bạn phải chọn loại sản phẩm ",
                "quantity.required"=>"Bạn phải số lượng sản phẩm bạn sẵn có ",
               
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
                $destinationPath=public_path('image/sell');
                $file->move($destinationPath,$name);
                
                $sell= new Sell;
                $sell->product_id="2021";
                $sell->user_id=$req->user_id;
                $sell->name=$req->name;
                $sell->price=$req->price;
                $sell->discount=$req->discount;
                $sell->image=$name;
                $sell->detail=$req->detail;
                $sell->product_type=$req->product_type;
                $sell->quantity=$req->quantity;
                $sell->product_status="đang đăng bán";
                $sell->save();
                
                return $sell;

            }   
        }
    }


    public function editSell(Request $req,$id){
        $val = Validator::make($req->all(),
        [
            "name"=>"required",
            "price"=>"required",
            "discount"=>"required",
            "image"=>"required",
            "detail"=>"required",
            "product_type"=>"required",
            "quantity"=>"required",

        ],
        [  
            
            "name.required"=>"Bạn phải điền tên sản phẩm",
            "price.required"=>"Bạn phải điền giá san phẩm",
            "discount.required"=>"Bạn phải điền số tiền đã giảm ",
            "image.required"=>"Bạn phải chọn hình ảnh",
            "detail.required"=>"Bạn phải điền mô tả sản phẩm",
            "product_type.required"=>"Bạn phải chọn loại sản phẩm ",
            "quantity.required"=>"Bạn phải số lượng sản phẩm bạn sẵn có ",
           
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
            $destinationPath=public_path('image/sell');
            $file->move($destinationPath,$name);
            
            $sell= new Sell;
            $sell->product_id="2021";
            $sell->user_id=$req->user_id;
            $sell->name=$req->name;
            $sell->price=$req->price;
            $sell->discount=$req->discount;
            $sell->image=$name;
            $sell->detail=$req->detail;
            $sell->product_type=$req->product_type;
            $sell->quantity=$req->quantity;
            $sell->product_status=$req->product_status;
            $sell->save();

            Sell::where('id',$id)->delete();
            
            return $sell;

        }   
    }
    }

    public function getListSell(Request $req){
        $listsell=Sell::
        where('user_id', 'like', $req->user_id)->get();
        return response()->json($listsell);

    }

    public function deleteSell($id){
        $sell= Sell::where('id',$id)->delete();
        return $sell;

    }

//Edit
    function showID($id){
        return Sell::find($id);
    }


}
