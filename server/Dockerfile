# Use a specific version of the official Node.js image
FROM node:20.17.0-alpine

# Set the working directory inside the container
WORKDIR /app/server

# Copy server files
COPY . .

# Install only production dependencies (if applicable)
RUN npm ci --only=production

# Expose the port if the app runs on a specific one (optional, depends on your app)
EXPOSE 8080

# Start the application
CMD [ "node", "index.js" ]
