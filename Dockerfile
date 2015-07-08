FROM ubuntu:trusty
MAINTAINER ddunderfelt

RUN apt-get update && apt-get install -y -q --no-install-recommends \
        apt-transport-https \
        build-essential \
        ca-certificates \
        curl \
        git \
        libssl-dev \
        python \
        software-properties-common \
        python-software-properties \
    && rm -rf /var/lib/apt/lists/*

RUN curl -sL https://deb.nodesource.com/setup_iojs_2.x | sudo bash -
RUN apt-get install -y iojs

EXPOSE 8080
ENV NODE_ENV production

ADD ./ /app/
WORKDIR /app
RUN npm install --unsafe-perm

CMD ["npm", "run", "serve"]