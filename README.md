# Studio99 Digital – Agency Operating System & Client Portal

Studio99 Digital is a robust, centralized Agency Operating System designed exclusively for service providers. It serves as an all-in-one platform for managing agency operations, team collaboration, and client interactions. This is a closed-ecosystem client portal, **not** a decentralized marketplace.

## Tech Stack

- **Backend:** Laravel 11 (PHP 8.3)
- **Frontend:** React 18, Inertia.js v2, Tailwind CSS v3
- **Database:** PostgreSQL
- **Architecture:** Service-Oriented MVC Architecture (Decoupled Services)
- **Deployment:** Docker (FrankenPHP) ready, 1-click deployment via Render

## Core Features

The platform is strictly structured around three role-based dashboards:
1. ** Admin Dashboard:** Full oversight of agency operations, user management, and subscription management.
2. ** Team Dashboard:** Internal workspace for agency employees to handle projects and communicate.
3. ** Client Dashboard:** A secure, dedicated portal for clients to track their projects, view files, and make payments.

### Data Models
- **Users:** Role-based access control (Admin, Team, Client).
- **Projects:** Centralized tracking for ongoing agency work.
- **Files:** Secure document and asset sharing.
- **Payments:** Integrated payment and invoicing tracking.
- **Subscriptions:** Recurring billing management.
- **Notifications:** Real-time event broadcasting and system alerts.

## Local Development Setup

### Prerequisites
- PHP 8.3+
- Node.js 20+
- Composer
- PostgreSQL
- Docker & Docker Compose (Optional, for Sail)

### Installation

1. **Clone the repository and install dependencies:**
   ```bash
   git clone <repository-url>
   cd studio99
   composer install
   npm install
   ```

2. **Environment Configuration:**
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```
   *Note: Update your `.env` file with your database credentials. If using Docker Sail, ensure `DB_PORT` and `FORWARD_DB_PORT` are configured to avoid host conflicts.*

3. **Database Migration & Seeding:**
   ```bash
   php artisan migrate:fresh --seed
   ```
   *This will seed the database with test accounts for Admin, Team, and Client roles.*

4. **Start the Application:**
   ```bash
   # Start the Laravel backend
   php artisan serve

   # Start the Vite development server (required for React/Inertia)
   npm run dev
   ```

## Test Accounts

After running the database seeder, you can log in with the following default accounts (Password for all: `password`):

- **Admin:** `admin@example.com`
- **Team:** `team@example.com`
- **Client:** `test@example.com`

## Deployment (Render)

This project is fully containerized and production-ready. A highly-optimized `Dockerfile` (using FrankenPHP) and a `render.yaml` blueprint are included.

1. Connect your repository to [Render.com](https://render.com).
2. Create a new **Blueprint** and select your repository.
3. Render will automatically provision the PostgreSQL database and deploy the Dockerized web service based on the `render.yaml` configuration.

## Architectural Rules (For Contributors)

This project strictly adheres to a decoupled architecture to prevent "Fat Controllers":
- **Strict Typing:** All PHP files must declare `strict_types=1`. Every method MUST have return types.
- **Service Layer:** Business logic MUST live in `app/Services/`. Controllers only handle HTTP validation and return responses.
- **Form Requests:** All validation is done via Form Requests (`app/Http/Requests/`).
- **Data Transformation:** Data sent to the Inertia frontend must be transformed using Eloquent API Resources (`app/Http/Resources/`).
- **Background Jobs:** Heavy synchronous operations must be dispatched as Jobs (`app/Jobs/`).

---
*Built with ❤️ for the Studio99 Digital Team.*
