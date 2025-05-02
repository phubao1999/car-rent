# Build Angular app
FROM node:20-alpine AS build
WORKDIR /app

# Copy package.json and package-lock.json for dependency installation
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Angular app for production
RUN npm run build --prod

# Serve Angular app with Nginx
FROM nginx:alpine
WORKDIR /usr/share/nginx/html

# Copy the built Angular app from the build stage
COPY --from=build /app/dist/client/browser/ .

# Copy custom Nginx configuration (if applicable)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 for the application
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
