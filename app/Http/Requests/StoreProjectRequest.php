<?php

declare(strict_types=1);

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreProjectRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true; // Anyone (client or guest) can submit an inquiry request
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $rules = [
            'service_id' => ['required', 'exists:services,id'],
            'package_id' => ['nullable', 'exists:packages,id'],
            'title' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'deadline' => ['nullable', 'date'],
            'company_name' => ['nullable', 'string', 'max:255'],
            'website' => ['nullable', 'string', 'max:255'],
            'preferred_contact' => ['nullable', 'string', 'max:255'],
            'business_goals' => ['nullable', 'string'],
            'existing_branding' => ['nullable', 'boolean'],
            'reference_links' => ['nullable', 'string'],
            'timeline' => ['nullable', 'string', 'max:255'],
            'budget_range' => ['nullable', 'string', 'max:255'],
            'hear_about_us' => ['nullable', 'string', 'max:255'],
            'additional_info' => ['nullable', 'string'],
            'reference_files' => ['nullable', 'array', 'max:10'],
            'reference_files.*' => ['file', 'mimes:jpg,jpeg,png,pdf,docx,zip,mp4,mov,avi,wmv,rar,7z', 'max:51200'], // max 50MB
        ];

        // If the user is a guest, require basic contact info for account creation
        if (! auth()->check()) {
            $rules['name'] = ['required', 'string', 'max:255'];
            $rules['email'] = ['required', 'string', 'email', 'max:255'];
            $rules['phone'] = ['nullable', 'string', 'max:255'];
        }

        return $rules;
    }
}
