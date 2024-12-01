# Step 1: Use Node.js as the base image
FROM node:18 AS build

# Step 2: Set the working directory in the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Step 4: Install dependencies
RUN npm install --force

# Step 5: Copy the rest of the application files
COPY . .

# Step 6: Build the application
RUN npm run build

# Step 7: Use a lightweight image for serving the built app
FROM nginx:alpine AS production

# Step 8: Copy the built files to the Nginx web root
COPY --from=build /app/dist /usr/share/nginx/html

# Step 9: Expose port 80
EXPOSE 80

# Step 10: Start Nginx server
CMD ["nginx", "-g", "daemon off;"]