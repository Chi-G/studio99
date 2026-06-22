<?php

namespace Database\Seeders;

use App\Models\Service;
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
                    ['name' => 'Landing Page', 'price' => 750000, 'billing_type' => 'one_time'],
                    ['name' => 'Corporate Website', 'price' => 2250000, 'billing_type' => 'one_time'],
                    ['name' => 'E-Commerce Store', 'price' => 4500000, 'billing_type' => 'one_time'],
                ],
            ],
            [
                'name' => 'Video Editing',
                'slug' => 'video-editing',
                'description' => 'Professional video editing for social media and corporate needs.',
                'packages' => [
                    ['name' => 'Short Form (TikTok/Reels)', 'price' => 150000, 'billing_type' => 'one_time'],
                    ['name' => 'YouTube Long Form', 'price' => 525000, 'billing_type' => 'one_time'],
                    ['name' => 'Monthly Retainer (10 videos)', 'price' => 2250000, 'billing_type' => 'monthly'],
                ],
            ],
            [
                'name' => 'Graphic Design',
                'slug' => 'graphic-design',
                'description' => 'Branding, logos, and marketing materials.',
                'packages' => [
                    ['name' => 'Logo & Branding Kit', 'price' => 1200000, 'billing_type' => 'one_time'],
                    ['name' => 'Social Media Templates', 'price' => 450000, 'billing_type' => 'one_time'],
                ],
            ],
            [
                'name' => 'Social Media Management',
                'slug' => 'social-media',
                'description' => 'Content creation, management, strategy and engagement.',
                'packages' => [
                    ['name' => 'Starter Monthly', 'price' => 750000, 'billing_type' => 'monthly'],
                    ['name' => 'Pro Monthly', 'price' => 1800000, 'billing_type' => 'monthly'],
                ],
            ],
        ];

        foreach ($services as $serviceData) {
            $packages = $serviceData['packages'];
            unset($serviceData['packages']);

            $service = Service::updateOrCreate(
                ['slug' => $serviceData['slug']],
                $serviceData
            );

            foreach ($packages as $packageData) {
                $service->packages()->updateOrCreate(
                    ['name' => $packageData['name']],
                    $packageData
                );
            }
        }
    }
}
