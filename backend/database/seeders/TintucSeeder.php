<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
class TintucSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('tintucs')->insert([
            [
                'name' => 'Tin tức 1',
                'image'=>"tintuc1.png",
                'detail'=>'Sản phẩm thời trang nhất tháng 8',
            ],
            [
                'name' => 'Tin tức 2',
                'image'=>"tintuc2.png",
                'detail'=>'Sự kiện thời trang 2021',
            ],
            [
                'name' => 'Tin tức 3',
                'image'=>"tintuc3.png",
                'detail'=>'Hôm nay là ngày sale của của các thương hiệu lớn',
            ],
            [
                'name' => 'Tin tức 4',
                'image'=>"tintuc4.png",
                'detail'=>'Hiện tại đồ cũ đang rất nhiều tuy nhiên vẫn chưa biết xử lý như thế nào cho hợp lý',
            ],
            [
                'name' => 'Tin tức 5',
                'image'=>"tintuc5.png",
                'detail'=>'Mẫu thiết kế mới của GuCi',
            ],
            [
                'name' => 'Tin tức 6',
                'image'=>"tintuc6.png",
                'detail'=>'Trang phục thu đông mới',
            ],
        ]);
    }
}
