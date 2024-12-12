# Use an official Node.js runtime as a parent image
FROM node:16.20.1
 
# Set the working directory
WORKDIR /app
 
# Copy package.json and package-lock.json (if available)
COPY package.json package-lock.json* ./
 
# Install any needed packages specified in package.json
RUN npm install
 
# Bundle app source inside Docker image
COPY . .
 
# Make port 5000 available to the world outside this container
EXPOSE 5000
 
# Define environment variable
# ENV NAME World
 
# Run the app when the container launches
CMD ["npm", "run", "start"]
