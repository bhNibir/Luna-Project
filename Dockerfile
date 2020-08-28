# get base image from docker hub
FROM continuumio/miniconda3:latest

# create backend folder and copy requirements there
RUN mkdir -p /backend
COPY ./backend/requirements.yml /backend/requirements.yml

# create conda env based on requirements.yml
RUN /opt/conda/bin/conda env create -f /backend/requirements.yml

# set path variable and open bash
ENV PATH /opt/conda/envs/luna-backend/bin:$PATH
RUN echo "source activate luna-backend" >~/.bashrc

# copy env folder
RUN mkdir -p /env
COPY ./env /env

# copy scripts folder and make sure scripts can be executed
RUN mkdir -p /scripts
COPY ./scripts /scripts
RUN chmod +x /scripts/*


# install npm and node
RUN apt-get update && curl -sL https://deb.nodesource.com/setup_9.x | bash - && apt-get install -y nodejs && apt-get install -y npm && npm i npm@latest -g

# copy and install frontend
RUN mkdir -p /frontend
RUN mkdir -p /frontend_temp
WORKDIR /frontend_temp
COPY ./frontend/package.json /frontend_temp/
COPY ./frontend/package-lock.json /frontend_temp/
RUN npm install
COPY ./frontend/public /frontend_temp/public
COPY ./frontend/src /frontend_temp/src
RUN npm run build

# copy rest of backend folder and make it workdir
COPY ./backend /backend
WORKDIR /backend
