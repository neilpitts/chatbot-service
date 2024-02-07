# Use an official Node runtime as the base image
FROM node:18

# Create app directory in Docker
WORKDIR /usr/src/app

# Copy package.json and yarn.lock files to the work directory
COPY package.json yarn.lock ./

# Install app dependencies
RUN yarn install

# Bundle app source in Docker
COPY . .

# TypeScript
RUN yarn build

# Define the command to run your app using CMD which defines your runtime
CMD [ "yarn", "start" ]
