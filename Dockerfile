# Use official Node.js LTS image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the app
COPY . .

# Build the React app
RUN npm run build

# Install serve to serve the build folder
RUN npm install -g serve

# Expose port 3000 for the React app
EXPOSE 3000

# Start the app with serve, listen on all interfaces
CMD ["serve", "-s", "build", "-l", "0.0.0.0:3000"]
