<?php

declare(strict_types=1);

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
            // ONE-OFF SERVICES
            [
                'name' => 'Logo Design',
                'slug' => 'logo-design',
                'category' => 'one_off',
                'description' => 'Standalone logo creation.',
                'icon' => 'star',
                'packages' => [
                    [
                        'name' => 'Logo Design',
                        'price' => 10000.00,
                        'billing_type' => 'one_time',
                        'features' => ['Custom logo options', 'Source files', 'Vector formats'],
                    ],
                ],
            ],
            [
                'name' => 'Brand Identity',
                'slug' => 'brand-identity',
                'category' => 'one_off',
                'description' => 'Complete branding package (logo, colours, typography, brand guidelines, business card, social media kit, etc.).',
                'icon' => 'pen',
                'packages' => [
                    [
                        'name' => 'Brand Identity',
                        'price' => 25000.00,
                        'billing_type' => 'one_time',
                        'features' => ['Logo design', 'Brand color palette & typography', 'Brand guidelines', 'Business card design', 'Social media kit'],
                    ],
                ],
            ],
            [
                'name' => 'Graphic Design',
                'slug' => 'graphic-design',
                'category' => 'one_off',
                'description' => 'Flyers, posters, brochures, banners, presentations, social media graphics, and other design requests.',
                'icon' => 'pen',
                'packages' => [
                    [
                        'name' => 'Graphic Design',
                        'price' => 1500.00,
                        'billing_type' => 'one_time',
                        'features' => ['Flyers & Posters', 'Social media graphics', 'Banners & Business cards', 'Other marketing materials'],
                    ],
                ],
            ],
            [
                'name' => 'Website Development',
                'slug' => 'web-development',
                'category' => 'one_off',
                'description' => 'Website design and development.',
                'icon' => 'monitor',
                'packages' => [
                    [
                        'name' => 'WordPress Website (Starter)',
                        'price' => 40000.00,
                        'billing_type' => 'one_time',
                        'features' => ['Up to 5 pages', 'Mobile responsive', 'Contact form', 'Basic SEO', 'Social media integration'],
                    ],
                ],
            ],
            [
                'name' => 'Mobile App Development',
                'slug' => 'mobile-app',
                'category' => 'one_off',
                'description' => 'Mobile application design and development.',
                'icon' => 'smartphone',
                'packages' => [
                    [
                        'name' => 'Mobile App',
                        'price' => 150000.00,
                        'billing_type' => 'one_time',
                        'features' => ['iOS & Android support', 'UI/UX design', 'Store deployment assistance'],
                    ],
                ],
            ],
            [
                'name' => 'Video Editing',
                'slug' => 'video-editing',
                'category' => 'one_off',
                'description' => 'Editing videos for marketing, social media, and promotional purposes.',
                'icon' => 'film',
                'packages' => [
                    [
                        'name' => 'Video Editing',
                        'price' => 2000.00,
                        'billing_type' => 'one_time',
                        'features' => ['Short-form videos (Reels/TikTok)', 'Promotional videos', 'Basic transitions & captions'],
                    ],
                ],
            ],

            // MONTHLY SERVICES
            [
                'name' => 'Social Media Management',
                'slug' => 'social-media-management',
                'category' => 'monthly',
                'description' => 'Monthly SMM, content creation, scheduling, community engagement, and analytics.',
                'icon' => 'share',
                'packages' => [
                    [
                        'name' => 'Social Media Management',
                        'price' => 10000.00,
                        'billing_type' => 'monthly',
                        'features' => ['Content creation', 'Scheduling & Posting', 'Community engagement', 'Basic analytics'],
                    ],
                ],
            ],
            [
                'name' => 'Digital Marketing',
                'slug' => 'digital-marketing',
                'category' => 'monthly',
                'description' => 'Lead generation and growth through SEO, paid advertising, email marketing, and digital marketing strategies.',
                'icon' => 'megaphone',
                'packages' => [
                    [
                        'name' => 'Digital Marketing',
                        'price' => 15000.00,
                        'billing_type' => 'monthly',
                        'features' => ['Search Engine Optimization (SEO)', 'Paid advertising campaign setup', 'Email marketing strategy', 'Growth analytics'],
                    ],
                ],
            ],

            // BUSINESS PACKAGES
            [
                'name' => 'Business Packages',
                'slug' => 'business-packages',
                'category' => 'business_package',
                'description' => 'Bundled solutions for businesses that need multiple services.',
                'icon' => 'package',
                'packages' => [
                    [
                        'name' => 'Starter Package',
                        'price' => 20000.00,
                        'billing_type' => 'monthly',
                        'features' => [
                            'Social Media Management (1 platform)',
                            '8 social media posts',
                            'Basic graphic designs',
                            'Monthly performance report',
                        ],
                    ],
                    [
                        'name' => 'Growth Package',
                        'price' => 40000.00,
                        'billing_type' => 'monthly',
                        'features' => [
                            'Social Media Management (up to 2 platforms)',
                            '12 social media posts',
                            '2 short-form edited videos',
                            'Basic content calendar',
                            'Monthly analytics report',
                        ],
                        'is_popular' => true,
                    ],
                    [
                        'name' => 'Business Pro Package',
                        'price' => 75000.00,
                        'billing_type' => 'monthly',
                        'features' => [
                            'Social Media Management (up to 3 platforms)',
                            '20 social media posts',
                            '4 edited videos',
                            'Premium graphic designs',
                            'Community management',
                            'Monthly strategy session',
                            'Performance report',
                        ],
                    ],
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

            // Clean up any packages that might be stale for this service
            $service->packages()->delete();

            foreach ($packages as $packageData) {
                $service->packages()->create($packageData);
            }
        }
    }
}
