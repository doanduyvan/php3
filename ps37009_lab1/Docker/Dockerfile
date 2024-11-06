FROM php:7.4-apache

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- \
--install-dir=/usr/bin --filename=composer
# a2enmod rewrite
RUN a2enmod rewrite

# Install git
RUN apt-get update && apt-get install -y git

# Install unzip

RUN apt-get update && apt-get install -y unzip

# Install zip

RUN apt-get update && apt-get install -y zip

COPY . /var/www/html

CMD ["composer", "install"]