<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert(
            [
                'name' => "hangmow",
                'email' =>"hangmo@gmail.com",
                'phone'=>"09876543",
                'password' => Hash::make('12345678'),
            ],
            [
                'name' => "manh",
                'email' =>"manh@gmail.com",
                'phone'=>"09876543",
                'password' => Hash::make('12345678'),
            ],
        );
    }
}
