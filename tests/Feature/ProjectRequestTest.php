<?php

declare(strict_types=1);

namespace Tests\Feature;

use App\Models\Invoice;
use App\Models\ProjectRequest;
use App\Models\Service;
use App\Models\User;
use App\Notifications\ProjectRequestReceived;
use Database\Seeders\ServiceSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Notification;
use Tests\TestCase;

class ProjectRequestTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        // Seed the services and packages
        $this->seed(ServiceSeeder::class);
    }

    /**
     * Test guest request submission auto-registers client.
     */
    public function test_guest_request_submission_auto_registers_client(): void
    {
        $this->withoutExceptionHandling();
        Notification::fake();

        $service = Service::where('slug', 'logo-design')->first();
        $package = $service->packages->first();

        $data = [
            'service_id' => $service->id,
            'package_id' => $package->id,
            'title' => 'Logo Design Project',
            'description' => 'I need a minimalist logo design.',
            'name' => 'Guest User',
            'email' => 'guest@example.com',
            'phone' => '+2348000000000',
            'company_name' => 'Guest Corp',
            'website' => 'https://guestcorp.com',
            'preferred_contact' => 'Email',
            'business_goals' => 'Increase Brand Awareness',
            'existing_branding' => false,
            'timeline' => 'Immediate',
            'budget_range' => 'Under ₦100,000',
            'hear_about_us' => 'Google',
        ];

        $response = $this->post(route('client.requests.store'), $data);

        // Verify the client user was created
        $user = User::where('email', 'guest@example.com')->first();
        $this->assertNotNull($user);
        $this->assertEquals('client', $user->role);

        // Verify the user is authenticated after registration
        $this->assertAuthenticatedAs($user);

        // Verify the project request is stored
        $request = ProjectRequest::where('client_id', $user->id)->first();
        $this->assertNotNull($request);
        $this->assertEquals('Logo Design Project', $request->title);
        $this->assertEquals('pending', $request->status);

        // Verify notification/email was sent
        Notification::assertSentTo($user, ProjectRequestReceived::class);

        // Verify redirect to client dashboard
        $response->assertRedirect(route('client.dashboard'));
    }

    /**
     * Test authenticated client request submission.
     */
    public function test_authenticated_client_request_submission(): void
    {
        $this->withoutExceptionHandling();
        Notification::fake();

        $client = User::factory()->create([
            'role' => 'client',
        ]);

        $service = Service::where('slug', 'web-development')->first();
        $package = $service->packages->first();

        $data = [
            'service_id' => $service->id,
            'package_id' => $package->id,
            'title' => 'WordPress Website',
            'description' => 'I need a business website built on WordPress.',
            'company_name' => 'Client Corp',
            'website' => 'https://clientcorp.com',
            'preferred_contact' => 'WhatsApp',
            'business_goals' => 'Drive Sales',
            'existing_branding' => true,
            'timeline' => '1-2 weeks',
            'budget_range' => '₦100,000 – ₦300,000',
            'hear_about_us' => 'LinkedIn',
        ];

        $response = $this->actingAs($client)
            ->post(route('client.requests.store'), $data);

        // Verify request is stored
        $request = ProjectRequest::where('client_id', $client->id)->first();
        $this->assertNotNull($request);
        $this->assertEquals('WordPress Website', $request->title);
        $this->assertEquals('WhatsApp', $request->preferred_contact);

        Notification::assertSentTo($client, ProjectRequestReceived::class);
        $response->assertRedirect(route('client.dashboard'));
    }

    /**
     * Test admin reviews request and sends quotation.
     */
    public function test_admin_can_send_quotation(): void
    {
        $admin = User::factory()->create([
            'role' => 'admin',
        ]);

        $client = User::factory()->create([
            'role' => 'client',
        ]);

        $service = Service::where('slug', 'graphic-design')->first();
        $package = $service->packages->first();

        $projectRequest = ProjectRequest::create([
            'client_id' => $client->id,
            'service_id' => $service->id,
            'package_id' => $package->id,
            'title' => 'Social Banner',
            'description' => 'Need flyer design.',
            'status' => 'pending',
        ]);

        $response = $this->actingAs($admin)
            ->post(route('admin.requests.quotation', $projectRequest->id), [
                'amount' => 5000.00,
            ]);

        // Verify database is updated
        $projectRequest->refresh();
        $this->assertEquals(5000.00, $projectRequest->budget);
        $this->assertEquals('reviewed', $projectRequest->status);

        // Verify invoice is generated
        $invoice = Invoice::where('project_request_id', $projectRequest->id)->first();
        $this->assertNotNull($invoice);
        $this->assertEquals(5000.00, $invoice->amount);
        $this->assertEquals('unpaid', $invoice->status);

        $response->assertRedirect();
    }
}
