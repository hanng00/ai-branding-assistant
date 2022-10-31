FROM amazonlinux:2

RUN yum install gcc openssl-devel bzip2-devel libffi-devel gzip make -y
RUN yum install wget tar -y
WORKDIR /opt
RUN wget https://www.python.org/ftp/python/3.9.6/Python-3.9.6.tgz
RUN tar xzf Python-3.9.6.tgz
WORKDIR /opt/Python-3.9.6
RUN ./configure --enable-optimizations
RUN make altinstall
RUN rm -f /opt/Python-3.9.6.tgz

# Set up PIP and Venv
RUN python3.9 -m pip install --upgrade pip && \
    python3.9 -m pip install virtualenv

RUN yum install -y zip && \
    yum clean all
RUN python3.9 -m venv base
RUN source base/bin/activate

# Install dependencies
WORKDIR /

COPY ./requirements.txt .
RUN pip install -r requirements.txt -t ./python

# Zip it up for deployment.
RUN zip -r layer.zip ./python/
ENTRYPOINT ["/bin/bash", "-l"]