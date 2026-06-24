<?php

namespace Database\Seeders;

use App\Models\Service;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ServiceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $services = [
            [
                'name' => 'Web Development',
                'slug' => 'web-development',
                'description' => 'Custom websites, web applications and platforms.',
                'icon' => 'monitor',
                'packages' => [
                    ['name' => 'Landing Page', 'price' => 750000, 'billing_type' => 'one_time'],
                    ['name' => 'Corporate Website', 'price' => 2250000, 'billing_type' => 'one_time'],
                    ['name' => 'E-Commerce Store', 'price' => 4500000, 'billing_type' => 'one_time'],
                ],
            ],
            [
                'name' => 'Graphic Design',
                'slug' => 'graphic-design',
                'description' => 'Logos, branding, social media graphics and more.',
                'icon' => 'pen',
                'packages' => [
                    ['name' => 'Logo & Branding Kit', 'price' => 1200000, 'billing_type' => 'one_time'],
                    ['name' => 'Social Media Templates', 'price' => 450000, 'billing_type' => 'one_time'],
                ],
            ],
            [
                'name' => 'UI/UX Design',
                'slug' => 'ui-ux-design',
                'description' => 'User interface and experience design for web and mobile.',
                'icon' => 'smartphone',
                'packages' => [
                    ['name' => 'Mobile App UI', 'price' => 1500000, 'billing_type' => 'one_time'],
                    ['name' => 'Web Dashboard UX', 'price' => 2000000, 'billing_type' => 'one_time'],
                ],
            ],
            [
                'name' => 'Video Editing',
                'slug' => 'video-editing',
                'description' => 'Promo videos, YouTube edits, reels and more.',
                'icon' => 'film',
                'packages' => [
                    ['name' => 'Short Form (TikTok/Reels)', 'price' => 150000, 'billing_type' => 'one_time'],
                    ['name' => 'YouTube Long Form', 'price' => 525000, 'billing_type' => 'one_time'],
                    ['name' => 'Monthly Retainer (10 videos)', 'price' => 2250000, 'billing_type' => 'monthly'],
                ],
            ],
            [
                'name' => 'Social Media Management',
                'slug' => 'social-media',
                'description' => 'Content creation, posting, and community management.',
                'icon' => 'share',
                'packages' => [
                    ['name' => 'Starter Monthly', 'price' => 750000, 'billing_type' => 'monthly'],
                    ['name' => 'Pro Monthly', 'price' => 1800000, 'billing_type' => 'monthly'],
                ],
            ],
            [
                'name' => 'Digital Marketing',
                'slug' => 'digital-marketing',
                'description' => 'SEO, ads, email marketing, and growth strategies.',
                'icon' => 'megaphone',
                'packages' => [
                    ['name' => 'SEO Audit & Setup', 'price' => 850000, 'billing_type' => 'one_time'],
                    ['name' => 'Ads Management', 'price' => 1200000, 'billing_type' => 'monthly'],
                ],
            ],
            [
                'name' => 'Content Writing',
                'slug' => 'content-writing',
                'description' => 'Blog posts, website content, copies and more.',
                'icon' => 'type',
                'packages' => [
                    ['name' => 'Blog Post (1500 words)', 'price' => 150000, 'billing_type' => 'one_time'],
                    ['name' => 'Website Copywriting', 'price' => 950000, 'billing_type' => 'one_time'],
                ],
            ],
            [
                'name' => 'Branding',
                'slug' => 'branding',
                'description' => 'Brand identity, strategy, and brand guidelines.',
                'icon' => 'star',
                'packages' => [
                    ['name' => 'Brand Strategy Session', 'price' => 500000, 'billing_type' => 'one_time'],
                    ['name' => 'Full Brand Identity', 'price' => 2500000, 'billing_type' => 'one_time'],
                ],
            ],
            [
                'name' => 'Other (Custom Request)',
                'slug' => 'custom-request',
                'description' => 'Have something specific in mind? Let us know.',
                'icon' => 'more',
                'packages' => [
                    ['name' => 'Custom Quote', 'price' => 0, 'billing_type' => 'one_time'],
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
