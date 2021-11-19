FROM python:3.7-slim
WORKDIR /opt
ADD . /opt
RUN pip install opencv-contrib-python-headless
RUN pip install -r requirements.txt
EXPOSE 1316
CMD ["python","app.py"]