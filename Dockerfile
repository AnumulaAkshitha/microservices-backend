# Dockerfile
# WHY: A Dockerfile tells Docker how to package your app
# into a container — like a box that has everything
# your app needs to run anywhere (GCP, AWS, Azure)

# WHY node:18-alpine: lightweight version of Node.js
# alpine = tiny Linux OS, only 5MB instead of 900MB
FROM node:18-alpine

# WHY: Create a folder inside the container for our app
WORKDIR /app

# WHY: Copy package.json FIRST before copying code
# This is a Docker best practice — if code changes but
# dependencies don't, Docker reuses the cached layer
# making builds much faster
COPY package*.json ./

# WHY: Install dependencies inside the container
RUN npm install --production

# WHY: Now copy the actual application code
COPY . .

# WHY: Tell Docker our app runs on port 3000
EXPOSE 3000

# WHY: This command runs when the container starts
CMD ["node", "index.js"]