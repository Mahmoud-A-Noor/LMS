# Use official Node.js image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --only=production

# Copy all files to container
COPY . .

# Build the app
RUN npm run build

# Expose a different port for backend (5000)
EXPOSE 5000

# Start the application
CMD ["npm", "run", "start:prod"]
