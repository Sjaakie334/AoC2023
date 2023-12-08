import fs from 'fs'

export const eachMatrix = (matrix, eachFn) => {
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            eachFn(matrix[y][x], [x, y], matrix);
        }
    }
};

export const callAtCoords = (matrix, coords, callFn) => {
    const [x, y] = coords;

    if (hasProp(matrix, y) && hasProp(matrix[y], x)) {
        callFn(matrix[y][x], coords, matrix);
    }
};

export const eachSurrounding = (matrix, [x, y], eachFn) => {
    callAtCoords(matrix, [x, y - 1], eachFn);
    callAtCoords(matrix, [x + 1, y - 1], eachFn);
    callAtCoords(matrix, [x + 1, y], eachFn);
    callAtCoords(matrix, [x + 1, y + 1], eachFn);
    callAtCoords(matrix, [x, y + 1], eachFn);
    callAtCoords(matrix, [x - 1, y + 1], eachFn);
    callAtCoords(matrix, [x - 1, y], eachFn);
    callAtCoords(matrix, [x - 1, y - 1], eachFn);
};
export const sum = nums => nums.reduce((total, num) => total + num, 0);

const { hasOwnProperty } = Object.prototype;

export const hasProp = (val, prop) => {
    if (val == null) {
        return false;
    }

    return hasOwnProperty.call(val, prop);
};

const pathPrefix = 'inputs/'
export const getLines = (filename) => fs.readFileSync(`${pathPrefix}${filename}.txt`, 'utf-8').trim().split('\r\n');

export const getMatrix = lines => lines.map(line => line.split(''));

export const getChunks = (filename) => fs.readFileSync(`${pathPrefix}${filename}.txt`, 'utf-8').trim().split('\r\n\r\n');
