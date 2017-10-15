FROM node:6

RUN useradd -ms /bin/bash chuck
USER chuck
WORKDIR /home/chuck

# copy all files to WORKDIR (ignoring files in .dockerignore)
COPY . .
RUN ls -lah
RUN npm install --production

EXPOSE 3000

CMD npm start