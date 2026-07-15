#!/bin/sh
set -e

# Optimize application for production
echo "Caching configuration..."
php artisan config:cache

echo "Caching routes..."
php artisan route:cache

echo "Caching views..."
php artisan view:cache

# Run database migrations
echo "Running migrations..."
php artisan migrate --force

echo "Seeding necessary initial data..."
php artisan db:seed --class=ServiceSeeder --force

# Start the main process

