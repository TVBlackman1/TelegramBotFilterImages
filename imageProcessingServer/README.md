# image-processing-subserver

Project for studying, subserver for telegram bot

Required:

1. check '.env' structure and content
2. create docker container:
```
docker build -t image-processing . 
docker run -dp 1316:1316 --name=image-process-opencv image-processing
```