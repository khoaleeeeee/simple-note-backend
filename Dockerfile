# Base image
FROM node:18.13.0-alpine as build-stage

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY ./package*.json ./

# Install dependencies
RUN npm install

COPY . .

RUN npm run build

# Expose the port your app runs on
EXPOSE 8001

# Command to run your app
CMD ["node", "dist/index.js"]
