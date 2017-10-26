## *project_chuck* ##

To build source code run*

> ``` npm build ```

To build docker container code run*

> ``` docker build . -t=<image_name_you_want>```

To fully build (source + image) run*

> ``` make build```

  this will build image with name ```project_chuck``` 
  to run it with docker run 

> ``` docker run project_chuck ```

  logs will be dumped to stdout to listen to log run with interactive flags 


> ``` docker run -it project_chuck ```
