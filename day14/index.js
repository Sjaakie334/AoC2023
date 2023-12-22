import { getLinesV2, getMatrix, getMatrixFromPath } from '../lib/utils.js';

const path = 'day14/in'

function part1 () {
    const lines = getMatrixFromPath(path);
    const platform = Array(lines.length).fill().map((x, i) => [...lines[i]]);
    let result = 0;
    
    rollNorth(platform);
    
    for (let i = 0; i < platform.length; i++) {
        result += platform[i].filter(x => x === 'O').length * (platform.length - i);
    }

    return result;
}

function part2() {
    const cycles = 1000000000
    const lines = getMatrixFromPath(path);
    const platform = Array(lines.length).fill().map((x, i) => [...lines[i]]);
    let result = 0;
    const cache = {};
    let loops = 0;
    let tempPlatform = '';

    let i = 0
    for (; i < cycles; i++) {
        const str = platform.map(x => x.join('')).join('');
        const test = cache[str];

        if (test) {
            if (str === tempPlatform) break;
            if (loops === 0) tempPlatform = str;

            platform.splice(0, platform.length, ...test.map(x => [...x]));
            loops++;
            continue;
        }

        rollNorth(platform);
        rollWest(platform);
        rollSouth(platform);
        rollEast(platform);

        cache[str] = platform.map(x => [...x])
    }

    for (let j = 0; j < (cycles - i) % loops; j++) {
        rollNorth(platform);
        rollWest(platform);
        rollSouth(platform);
        rollEast(platform);
    }

    for (let i = 0; i < platform.length; i++) {
        result += platform[i].filter(x => x == "O").length * (platform.length - i);
    }

    return result;
}

function rollNorth(platform) {
    for (let i = 0; i < platform.length; i++) {
        for (let j = 0; j < platform[i].length; j++) {
            if (platform[i][j] == "O") {
                for (let k = i - 1; k >= 0 && platform[k][j] == "."; k--) {
                    platform[k][j] = "O";
                    platform[k + 1][j] = ".";
                }
            }
        }
    }
}

function rollWest(platform) {
    for (let i = 0; i < platform.length; i++) {
        for (let j = 0; j < platform[i].length; j++) {
            if (platform[i][j] == "O") {
                for (let k = j - 1; k >= 0 && platform[i][k] == "."; k--) {
                    platform[i][k] = "O";
                    platform[i][k + 1] = ".";
                }
            }
        }
    }
}

function rollSouth(platform) {
    for (let i = platform.length - 1; i >= 0; i--) {
        for (let j = 0; j < platform[i].length; j++) {
            if (platform[i][j] == "O") {
                for (let k = i + 1; k < platform.length && platform[k][j] == "."; k++) {
                    platform[k][j] = "O";
                    platform[k - 1][j] = ".";
                }
            }
        }
    }
}

function rollEast(platform) {
    for (let i = platform.length - 1; i >= 0; i--) {
        for (let j = platform[i].length - 1; j >= 0; j--) {
            if (platform[i][j] == "O") {
                for (let k = j + 1; k < platform[i].length && platform[i][k] == "."; k++) {
                    platform[i][k] = "O";
                    platform[i][k - 1] = ".";
                }
            }
        }
    }
}

export const d14Results = {
    part1: part1(),
    part2: part2()
}

console.log(d14Results);