## Queue For Fun

### Get this project going

- This project don't use Docker-compose in order to practice more pure Docker.

#### Build images

``` bash
docker build -t pscruzzz/nginx-img ./nginx \
&& docker build -t pscruzzz/messages-service-img ./producer \
&& docker build -t pscruzzz/users-service-img ./consumer \
&& docker build -t pscruzzz/kafka-img ./kafka \
&& docker build -t pscruzzz/zookeeper-img ./zookeeper \
&& docker build -t pscruzzz/kafka-cc-img ./control-center-kafka
```

#### Download packages

``` bash
cd producer && yarn &&  cd ../consumer && yarn && cd ..
```

#### Set docker network

``` bash
docker network create {{networkName}}
```

#### Get Zookeeper Up

``` bash
docker run -itd --rm --net {{networkName}} --name zoo pscruzzz/zookeeper-img
```

#### Get Kafka Up

``` bash
docker run -itd --rm -p 9092:9092 -p 29092:29092 --net {{networkName}} --name kafka --add-host host.docker.internal:172.17.0.1  pscruzzz/kafka-img
```

#### Get Nginx Up

``` bash
docker run -itd --rm -p 80:80 --name nginx pscruzzz/nginx-img
```

#### Get User Service Up

``` bash
docker run -itd --rm -p 3333:3333 --name users-service pscruzzz/users-service-img
```

#### Get Messages Service Up

``` bash
docker run -itd --rm -p 3000:3000 --name messages-service pscruzzz/messages-service-img
```

#### Get Control Center Kafka Up

``` bash
docker run -itd --rm -p 9021:9021 --net {{networkName}} --name kafka-cc pscruzzz/kafka-cc-img
```

### Quick Overall Setup

- this will delete all custom docker networks

``` bash
docker build -t pscruzzz/nginx-img ./nginx \
&& docker build -t pscruzzz/messages-service-img ./producer \
&& docker build -t pscruzzz/users-service-img ./consumer \
&& docker build -t pscruzzz/kafka-img ./kafka \
&& docker build -t pscruzzz/zookeeper-img ./zookeeper \
&& cd producer && yarn &&  cd ../consumer && yarn && cd .. \
&& docker network prune \
&& docker network create kafkanet \
&& docker run -itd --rm --net kafkanet --name zoo pscruzzz/zookeeper-img \
&& docker run -itd --rm -p 9092:9092 -p 29092:29092 --net kafkanet --name kafka --add-host host.docker.internal:172.17.0.1  pscruzzz/kafka-img \
&& docker run -itd --rm -p 80:80 --name nginx pscruzzz/nginx-img \
&& docker run -itd --rm -p 3333:3333 --name users-service pscruzzz/users-service-img \
&& docker run -itd --rm -p 3000:3000 --name messages-service pscruzzz/messages-service-img \
&& docker run -itd --rm -p 9021:9021 --net kafkanet --name kafka-cc pscruzzz/kafka-cc-img
```