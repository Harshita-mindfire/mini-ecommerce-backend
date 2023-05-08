FROM node:alpine
WORKDIR /app
COPY package*.json ./

# COPY ENV variable
#COPY .env ./

# COPY tsconfig.json file
COPY tsconfig.json ./

# COPY
COPY . .

RUN npm install
# Run and expose the server on port 3000
EXPOSE 3002

# A command to start the server
CMD ["npm", "start"]