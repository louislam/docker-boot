# docker-boot

Quickly start a temporary container and go into the container's terminal. Easy to remember!

Alias of `docker run --rm -it <image> <command>`.


## Usage

Directly go into the container's terminal:

```bash
docker-boot <image>
docker-boot alpine
docker-boot debian:stable-slim
docker-boot centos:7
docker-boot louislam/uptime-kuma:1
```


Run a command in the container:

```bash
docker-boot <image> <command>
docker-boot centos:7 ls
```
