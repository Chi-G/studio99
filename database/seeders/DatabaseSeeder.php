<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::updateOrCreate(
            ['email' => 'test@example.com'],
            [
                'name' => 'Test User',
                'role' => 'client',
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
            ]
        );

        User::updateOrCreate(
            ['email' => 'dev@studio99.com'],
            [
                'name' => 'Studio99 Dev',
                'role' => 'team',
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
            ]
        );

        User::updateOrCreate(
            ['email' => 'chijindu.nwokeohuru@gmail.com'],
            [
                'name' => 'Chijindu Nwokeohuru',
                'role' => 'client',
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
            ]
        );

        User::updateOrCreate(
            ['email' => 'admin@studio99.com'],
            [
                'name' => 'Studio99 Admin',
                'role' => 'admin',
                'password' => Hash::make('Admin123!'),
                'email_verified_at' => now(),
            ]
        );

        $this->call([
            ServiceSeeder::class,
        ]);
    }
}
