# docker-boot

Quickly start a temporary container and go into the container's terminal. Easy to remember!

## Comparison

Original:
- `docker run --rm -it <image> <command>`
- `docker exec -it $(docker ps -q -f name=<container name>) <command>`

vs

- `docker-boot <image> <command>`
- `docker-exec <container name> <command>`

Isn't it easier to remember?

## Installation

```bash
npm install docker-boot -g
```

## Usage

### docker-boot

A short command that boot up a temporary container

Alias of `docker run --rm -it <image> <command>`.

```bash
docker-boot <image>

# Examples
docker-boot alpine
docker-boot debian:stable-slim
docker-boot centos:7
docker-boot louislam/uptime-kuma:1
```


Run a command in the container or change the shell:

```bash
docker-boot <image> <command>

# Examples
docker-boot centos:7 ls
docker-boot centos:7 sh
```

### docker-exec

A short command that go into a running container.

Alias of `docker exec -it $(docker ps -q -f name=<container name>) <command>`.

```bash
docker-exec <container name>

# Examples
docker-exec uptime-kuma

# You can input a part of the container name, and the script will try to find the container for you.
docker-exec uptime # Which will find the `uptime-kuma` container
```

Run a command in the container or change the shell:

```bash
docker-exec <container name> <command>

# Examples
docker-exec uptime-kuma ls
docker-exec uptime-kuma sh
```

