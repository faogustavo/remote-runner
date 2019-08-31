FROM ubuntu:eoan
LABEL maintainer="Gustavo Fao <faogustavo@gmail.com>"

ARG DEBIAN_FRONTEND=noninteractive

# Basic commands needed
RUN apt update; \
    apt install wget curl git unzip -y;

# C
RUN apt update; \
    apt install build-essential -y

# NodeJS
RUN apt update; \
    apt install nodejs npm -y; \
    npm i -g yarn

# Ruby
RUN apt update; \
    apt install ruby-full -y

# Python
RUN apt update; \
    apt install python -y

# Java
RUN apt update; \
    apt install openjdk-8-jdk -y

# Kotlin
RUN cd /usr/lib; \
    wget -q https://github.com/JetBrains/kotlin/releases/download/v1.3.50/kotlin-compiler-1.3.50.zip; \
    unzip kotlin-compiler-*.zip; \
    rm kotlin-compiler-*.zip; \
    rm -f kotlinc/bin/*.bat

ENV PATH $PATH:/usr/lib/kotlinc/bin

# PHP
RUN apt update; \
    apt install php -y

ADD . /remote-runner
WORKDIR /remote-runner

RUN yarn; \
    yarn run build

EXPOSE 8080
CMD ["node", "dist/server/server.js"]