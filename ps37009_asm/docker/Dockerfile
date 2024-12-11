# Sử dụng image PHP 7.4.33 với Apache
FROM php:7.4.33-apache

# Thiết lập thư mục làm việc
WORKDIR /var/www/html

# Cài đặt các gói cần thiết
RUN apt-get update && apt-get install -y \
    libzip-dev \
    zip \
    unzip \
    curl \
    git \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    libpq-dev \
    && docker-php-ext-install \
    pdo \
    pdo_mysql \
    pdo_pgsql \
    zip \
    gd \
    mbstring \
    xml \
    tokenizer \
    bcmath \
    && a2enmod rewrite

# Cài Composer (Trình quản lý gói PHP)
COPY --from=composer:2.6 /usr/bin/composer /usr/bin/composer

# Cấp quyền cho thư mục storage và bootstrap/cache
# RUN chown -R www-data:www-data /var/www/html \
#     && chmod -R 775 /var/www/html/storage \
#     && chmod -R 775 /var/www/html/bootstrap/cache


# Cài đặt các gói PHP trong Laravel (thông qua Composer)


# Copy file cấu hình Apache
COPY ./docker/apache/apache.conf /etc/apache2/sites-available/000-default.conf

# Mở cổng HTTP
EXPOSE 80
RUN a2enmod headers && service apache2 restart
# Lệnh khởi chạy Apache
CMD ["apache2-foreground"]
