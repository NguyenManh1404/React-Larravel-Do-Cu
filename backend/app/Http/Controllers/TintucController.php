<?php

namespace App\Http\Controllers;
use App\Models\Tintuc;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
class TintucController extends Controller
{
    public function index()
    {

        $data = Tintuc::all();
        return response()->json($data);
    }

    public function addNew(Request $req){
        $val = Validator::make($req->all(),
            [
                "name"=>"required",
                "image"=>"required",
                "detail"=>"required"
            ],
            [
                "name.required"=>"Bạn phải điền chủ đề tin tức",
                "image.required"=>"Bạn phải chọn hình ảnh",
                "detail.required"=>"Bạn phải điền mô tả tin tức",
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
            $destinationPath=public_path('image/tintuc');
            $file->move($destinationPath,$name);


            $tintuc = new Tintuc;
            $tintuc->name=$req->name;
            $tintuc->image=$name;
            $tintuc->detail=$req->detail;
            $tintuc->save();

            return $tintuc;

            }

        }
    }

    public function deleteNew($id){
        $tintuc= Tintuc::where('id',$id)->delete();
        return $tintuc;
    }
}
