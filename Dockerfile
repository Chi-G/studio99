# Stage 1: Build Frontend
FROM node:20-alpine AS node-builder
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build

# Stage 2: Build Backend Dependencies
FROM composer:2 AS composer-builder
WORKDIR /app
COPY composer*.json ./
RUN composer install --no-dev --optimize-autoloader --no-scripts --ignore-platform-reqs
COPY . .
RUN composer dump-autoload --optimize --no-dev

# Stage 3: Final Production Image
FROM dunglas/frankenphp:1-php8.4 AS final

# Install required PHP extensions
RUN install-php-extensions \
    pcntl \
    bcmath \
    gd \
    intl \
    pdo_pgsql \
    zip

# Set working directory
WORKDIR /var/www/html

# Copy application code
COPY --from=composer-builder /app /var/www/html
COPY --from=node-builder /app/public/build /var/www/html/public/build

# Setup environment
ENV APP_ENV=production
ENV APP_DEBUG=false

# Render deployment fixes
ENV SERVER_NAME=":${PORT:-8000}"

# Remove capabilities that block execution in restricted environments like Render
RUN setcap -r /usr/local/bin/frankenphp

# Fix permissions
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

# Startup Hook
COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh
ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]
# Run FrankenPHP
CMD ["frankenphp", "run", "--config", "/etc/caddy/Caddyfile"]
