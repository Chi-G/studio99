<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ServiceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $services = [
            [
                'name' => 'Web Design & Development',
                'slug' => 'web-design',
                'description' => 'Custom websites built with modern technologies.',
                'packages' => [
                    ['name' => 'Landing Page', 'price' => 500, 'billing_type' => 'one_time'],
                    ['name' => 'Corporate Website', 'price' => 1500, 'billing_type' => 'one_time'],
                    ['name' => 'E-Commerce Store', 'price' => 3000, 'billing_type' => 'one_time'],
                ]
            ],
            [
                'name' => 'Video Editing',
                'slug' => 'video-editing',
                'description' => 'Professional video editing for social media and corporate needs.',
                'packages' => [
                    ['name' => 'Short Form (TikTok/Reels)', 'price' => 100, 'billing_type' => 'one_time'],
                    ['name' => 'YouTube Long Form', 'price' => 350, 'billing_type' => 'one_time'],
                    ['name' => 'Monthly Retainer (10 videos)', 'price' => 1500, 'billing_type' => 'monthly'],
                ]
            ],
            [
                'name' => 'Graphic Design',
                'slug' => 'graphic-design',
                'description' => 'Branding, logos, and marketing materials.',
                'packages' => [
                    ['name' => 'Logo & Branding Kit', 'price' => 800, 'billing_type' => 'one_time'],
                    ['name' => 'Social Media Templates', 'price' => 300, 'billing_type' => 'one_time'],
                ]
            ]
        ];

        foreach ($services as $serviceData) {
            $packages = $serviceData['packages'];
            unset($serviceData['packages']);
            
            $service = \App\Models\Service::create($serviceData);
            
            foreach ($packages as $packageData) {
                $service->packages()->create($packageData);
            }
        }
    }
}
