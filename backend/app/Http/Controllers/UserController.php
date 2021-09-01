<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
   public function Login(Request $req){
    $val = Validator::make($req->all(),
    [
        'email'=>'required',
        'password' => 'required',
    ],
    [
        'email.required' => 'Không được để trống email',
        'password.required' => 'Không được để trống password',
    ]);


    if($val->fails())
    {
        return response()->json([
            'val_err'=>$val->messages(),
        ]);
    }
    else
    {
            $user=User::where('email',$req->email)->first();
            
            if(!$user || !Hash::check($req->password,$user->password))
            {
            return ["error"=>"Mật khẩu hoăc email không đúng !"];
            }
            return $user;
        }
   }


   public function getUser(){
    $data = User::all();
    return response()->json($data);
   }



   function Register(Request $req){

        $val = Validator::make($req->all(),
        [
            'name'=>'required',
            'email'=>'required',
            'phone'=>'required',
            'password' => 'required',
        ],
        [   
            'name.required' => 'Không được để trống name ',
            'email.required' => 'Không được để trống email ',
            'phone.required' => 'Không được để trống phone',
            'password.required' => 'Không được để trống password',
        ]);

        if($val->fails())
            {
                return response()->json([
                    'val_err'=>$val->messages(),
                ]);
            }
        else
        {

            $user=new User;
            $user->name=$req->name;
            $user->email=$req->email;
            $user->phone=$req->phone;
            $user->password=Hash::make($req->password);
            $user->save();

            return $user;


        }    
   }
}
