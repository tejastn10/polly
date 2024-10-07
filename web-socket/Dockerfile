# Use a specific version of the official Node.js image
FROM node:20.17.0-alpine

# Set the working directory inside the container
WORKDIR /app/server

# Copy server files
COPY . .

# Install only production dependencies
RUN npm ci --only=production

# Expose all potential ports (for documentation; actual ports are handled by Docker Compose)
EXPOSE 2222 3333 4444 5555

# Start the application
CMD ["node", "index.js"]
