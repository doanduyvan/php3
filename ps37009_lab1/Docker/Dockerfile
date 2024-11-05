FROM php:7.4-apache

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- \
--install-dir=/usr/bin --filename=composer
# a2enmod rewrite
RUN a2enmod rewrite

CMD ["composer", "install"]