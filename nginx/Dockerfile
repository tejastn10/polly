# Use the official NGINX base image
FROM nginx:alpine

# Set the working directory
WORKDIR /usr/share/nginx/html

# Copy custom HTML file into the NGINX html directory
COPY ./html/index.html /usr/share/nginx/html/index.html

# Expose port 80 for the NGINX server
EXPOSE 80

# Start NGINX server
CMD ["nginx", "-g", "daemon off;"]
