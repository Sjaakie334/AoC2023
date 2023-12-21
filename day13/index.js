import { getChunks, getLinesV2 } from '../lib/utils.js';
const path = '../day13/in'


function part1() {
    const input = getChunks(path).map(x => x.split('\r\n').map(y => y.split('')));
    let output = 0;
    for (const str of input) {
        const rows = Array(str.length).fill('').map((_x, i) => str[i].join(''));
        const cols = Array(str[0].length).fill('').map((_y, i) => str.map(x => x[i]).join(''));

        const rowReflects = processReflect1(rows);

        const colReflects = processReflect1(cols);

        if (rowReflects.length > 0) output += 100 * rowReflects[0];
        if (colReflects.length > 0) output += colReflects[0];
    }

    return output;
}

function processReflect1(arr) {
    const arrReflects = [];
    for (let a = 1; a < arr.length; a++) {
        const failedInstances = [];
        arrReflects.push(a);
        for (let i = a - 1, j = a; i >= 0 && j < arr.length; i--, j++) {
            // this happens in part1
            if (arr[i] != arr[j]) {
                arrReflects.splice(arrReflects.length - 1, 1);
                break;
            }

        }

    }
    return arrReflects;
}

function part2() {
    const input = getChunks(path).map(x => x.split('\r\n').map(y => y.split('')));
    let result = 0;

    for (const str of input) {
        const rows = Array(str.length).fill("").map((_, i) => str[i].join(""));
        const columns = Array(str[0].length).fill("").map((_, i) => str.map(x => x[i]).join(""));

        const rowsOfReflection = [];
        for (let r = 1; r < rows.length; r++) {
            const failedInstances = [];
            rowsOfReflection.push(r);
            for (let i = r - 1, j = r; i >= 0 && j < rows.length; i--, j++) {
                if (rows[i] != rows[j]) failedInstances.push([i, j]);
            }

            if (failedInstances.length != 1 || rows[failedInstances[0][0]].split("").map((x, i) => x != rows[failedInstances[0][1]][i]).filter(x => x).length != 1)
                rowsOfReflection.splice(rowsOfReflection.length - 1, 1);
        }

        const columnsOfReflection = [];
        for (let c = 1; c < columns.length; c++) {
            const failedInstances = [];
            columnsOfReflection.push(c);
            for (let i = c - 1, j = c; i >= 0 && j < columns.length; i--, j++) {
                if (columns[i] != columns[j]) failedInstances.push([i, j]);
            }

            if (failedInstances.length != 1 || columns[failedInstances[0][0]].split("").map((x, i) => x != columns[failedInstances[0][1]][i]).filter(x => x).length != 1)
                columnsOfReflection.splice(columnsOfReflection.length - 1, 1);
        }

        if (rowsOfReflection.length > 0) result += 100 * rowsOfReflection[0];
        if (columnsOfReflection.length > 0) result += columnsOfReflection[0];
    }

    return result;
}

export const d13Results = {
    part1: part1(),
    part2: part2()
}

console.log(d13Results);