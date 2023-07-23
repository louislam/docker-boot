#!/usr/bin/env node
const childProcess = require("child_process");

if (process.argv.length <= 2) {
    console.error("Please input image name: docker-boot <image-name>");
    process.exit(1);
}

let cmd = "bash";

if (process.argv[3] !== undefined) {
    cmd = process.argv[3];
}

let docker = childProcess.spawn("docker", ["run", "-it", "--rm", process.argv[2], cmd], {
    stdio: 'inherit'
});

docker.on('close', (code) => {
    if (code !== 0) {
        console.log(`grep process exited with code ${code}`);
    }
});
