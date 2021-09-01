<?php

namespace App\Http\Controllers;
use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;


class CommentController extends Controller
{
    public function createComment(Request $req){
        $val = Validator::make($req->all(),
        [
            "comment"=>"required",
        ],
        [
            "comment.required"=>"Hãy điền bình luận của bạn",
             
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

            $comment = new Comment;

            $comment->product_id= $req->product_id;
            $comment->user_id= $req->user_id;
            $comment->comment=$req->comment;
            $comment->image="null";
            $comment->save();
            return $comment;

        }
    }



    public function getComment($id){

        $comment =DB::table('comments')
        ->join('users','comments.user_id','=','users.id')
        ->where('comments.product_id',$id)
        ->select('users.*','comments.*','comments.created_at as day_comment')
        ->get();

        return $comment;



    }
}
