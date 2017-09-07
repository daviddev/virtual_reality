server {
    listen 80;
    server_name admin2016.sharado.com;
    root /home/www/sharado/public;
    server_tokens off;
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    index index.html index.htm index.php;
    charset utf-8;

    add_header 'Access-Control-Allow-Origin' '*';
    add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS, PUT, DELETE';
    add_header 'Access-Control-Allow-Headers' 'X-Requested-With,Accept,Content-Type, Origin';
    proxy_set_header   Host             $host;
    proxy_set_header   X-Real-IP        $remote_addr;
    proxy_set_header   X-Forwarded-For  $proxy_add_x_forwarded_for;

    location / {
        try_files $uri $uri/ /index.html?$query_string;
    }

    location /admin {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location /email {
        try_files $uri $uri/ /index.php?$query_string;
    }
    location = /favicon.ico { access_log off; log_not_found off; }
    location = /robots.txt  { access_log off; log_not_found off; }
    error_log  /var/log/nginx/sharado-error.log error;
    error_page 404 /index.php;
    location ~ \.php$ {
        fastcgi_split_path_info ^(.+\.php)(/.+)$;
        fastcgi_pass unix:/var/run/php/php7.0-fpm.sock;
        fastcgi_index index.php;
        include fastcgi.conf;
    }
    location ~ /\.ht {
        deny all;
    }
}