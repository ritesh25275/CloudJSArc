# Stage 1: Build the application
FROM node:18-alpine as builder

# Set the working directory inside the container
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the Next.js application
RUN npm run build

# Stage 2: Serve the application
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy only the production build from the builder stage
COPY --from=builder /app ./

# Expose the application port
EXPOSE 3000

# Start the Next.js application
CMD ["npm", "start"]
