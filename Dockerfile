# Stage 1: Build the Angular application
FROM node:22-alpine AS build

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
# Using npm set progress=false to reduce log verbosity
RUN npm ci

# Copy the rest of the application code
COPY . .

# Build the application
# output path is defined in angular.json as dist/sakai-ng
RUN npm run build

# Stage 2: Serve the application with Nginx
FROM nginx:alpine

# Remove default Nginx website
RUN rm -rf /usr/share/nginx/html/*

# Copy built application from the 'build' stage
COPY --from=build /app/dist/sakai-ng/browser /usr/share/nginx/html

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["/bin/sh",  "-c",  "envsubst < /usr/share/nginx/html/assets/js/env.template.js > /usr/share/nginx/html/assets/js/env.js && exec nginx -g 'daemon off;'"]