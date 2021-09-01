<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;


class ProductTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('products')->insert([
        [
            'name' => 'Sản phẩm cho tặng 1',
            'price_new'=>100000,
            'price_old'=>200000,
            'discount'=>10000,
            'image'=>"chotang1.png",
            'detail'=>'Sản phẩm cho tặng nhất tháng 8',
            'product_type'=>'chotang',
            'quantity'=>10,
            'product_status'=>"Còn hàng",
        ],
        [
            'name' => 'Sản phẩm cho tặng 2',
            'price_new'=>150000,
            'price_old'=>250000,
            'discount'=>16000,
            'image'=>"chotang2.png",
            'detail'=>'Sản phẩm được bảo quản tốt nhất',
            'product_type'=>'chotang',
            'quantity'=>8,
            'product_status'=>"Còn hàng",
        ],
        [
            'name' => 'Sản phẩm cho tặng 3',
            'price_new'=>550000,
            'price_old'=>1050000,
            'discount'=>50000,
            'image'=>"chotang3.png",
            'detail'=>'Sản phẩm vận chuyển từ Nhật Bản',
            'product_type'=>'chotang',
            'quantity'=>18,
            'product_status'=>"Còn hàng",
        ],
        [
            'name' => 'Sản phẩm cho tặng 4',
            'price_new'=>950000,
            'price_old'=>1900000,
            'discount'=>900000,
            'image'=>"chotang4.png",
            'detail'=>'Sản phẩm thanh lý của công ty',
            'product_type'=>'chotang',
            'quantity'=>98,
            'product_status'=>"Còn hàng",
        ],
        [
            'name' => 'Sản phẩm cho tặng 5',
            'price_new'=>300000,
            'price_old'=>700000,
            'discount'=>80000,
            'image'=>"chotang5.png",
            'detail'=>'Sản phẩm Việt Nam chất lượng cao',
            'product_type'=>'chotang',
            'quantity'=>2,
            'product_status'=>"Cháy hàng",
        ],
        [
            'name' => 'Sản phẩm cho tặng 6',
            'price_new'=>280000,
            'price_old'=>350000,
            'discount'=>90000,
            'image'=>"chotang6.png",
            'detail'=>'Sản phẩm mới 75%',
            'product_type'=>'chotang',
            'quantity'=>1,
            'product_status'=>"Chỉ còn 1 sản phẩm",
        ],
    ],
    );
    }
}
