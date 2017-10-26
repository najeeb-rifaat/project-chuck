FROM node:6

# add user and chnage to home dir
RUN useradd -ms /bin/bash chuck
USER chuck
WORKDIR /home/chuck

# copy all files to WORKDIR (ignoring files in .dockerignore)
COPY . .
RUN npm install --production

# change this if config (./config/index) changes is pointed to diffrent port
EXPOSE 3000

# run start to spin up server
CMD node build/main.js