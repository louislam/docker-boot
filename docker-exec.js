#!/usr/bin/env node
const childProcess = require("child_process");

if (process.argv.length <= 2) {
    console.error("Please specify container name: docker-exec <container-name>");
    console.error("You can input a part of the container name, and the script will try to find the container for you.");
    process.exit(1);
}

let cmd = "bash";

if (process.argv[3] !== undefined) {
    cmd = process.argv[3];
}

// Get a list of all running container's names

let containerList = [];

try {
    containerList = childProcess.execSync("docker ps --format {{.Names}}").toString().split("\n").filter((item) => {
        return item !== "";
    });
} catch (e) {
    console.error("Failed to get the container list. Please check if docker is running.");
    process.exit(1);
}

let matchedContainerList = [];
let container = null;

for (let c of containerList) {
    // 100% match
    if (c === process.argv[2]) {
        container = c;
    }

    if (c.includes(process.argv[2])) {
        matchedContainerList.push(c);
    }
}


if (container === null) {
    if (matchedContainerList.length > 1) {
        console.error("Multiple containers found, which one did you mean?");
        for (let c of matchedContainerList) {
            console.error(c);
        }
        process.exit(1);
    } else if (matchedContainerList.length === 1) {
        container = matchedContainerList[0];
    } else {
        console.error("Container not found");
        process.exit(1);
    }
}

let docker = childProcess.spawn("docker", ["exec", "-it", container, cmd], {
    stdio: 'inherit'
});

docker.on('close', (code) => {
    if (code !== 0) {
        console.log(`Process exited with code ${code}`);
    }
});
