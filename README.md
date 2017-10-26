## *project_chuck* ##

# Microservice
To build source code run*

> ``` npm build ```

To build docker container code run*

> ``` docker build . -t=<image_name_you_want>```

To fully build (source + image) run*

> ``` make build```

  this will build image with name ```ms-chuck``` 
  
  to run it with docker run 

> ``` docker run ms-chuck ```

  logs will be dumped to stdout to listen to log run with interactive flags 


> ``` docker run -it -p 3000:3000 ms-chuck ```


# WEB
To build source code run*

> ``` npm build ```

To fully build (source + image) run*

> ``` make build```
  this will build image with name ```web-chuck```

  to run it with docker run 


> ``` docker run -it -p 5000:5000 web-chuck ```


# BOTH
To run both web and ms run command below ONLY after building both projects 
> ``` docker run -d -p 3000:3000 ms-chuck && docker run -d -p 5000:5000 web-chuck ```

and hit localhost:5000/?tid=AX01
