import { eachMatrix, eachSurrounding, sum, getLines, getMatrix } from './lib/utils.js';


const isDigit = char => /[0-9]/.test(char);
const isSymbol = char => char !== '.' && !isDigit(char);
const isGear = char => char === '*';
const lines = getLines('d3a');
const matrix = getMatrix(lines);
const p2Lines = getLines('d3a');
const p2Matrix = getMatrix(p2Lines);


const extractPartNumber = (schematics, [x, y]) => {
    let number = '';
    let pos = x;

    while (isDigit(schematics[y][pos])) {
        pos -= 1;
    }

    // pos will end up one too small
    pos += 1;

    while (isDigit(schematics[y][pos])) {
        number += schematics[y][pos];
        schematics[y][pos] = 'X'; // Prevent counting numbers twice
        pos += 1;
    }

    return Number(number);
};


function partOne({ matrix }) {
    const parts = [];

    eachMatrix(matrix, (char, coords) => {
        if (isSymbol(char)) {
            eachSurrounding(matrix, coords, (adj, adjCoords) => {
                if (isDigit(adj)) {
                    parts.push(extractPartNumber(matrix, adjCoords));
                }
            });
        }
    });

    return sum(parts);
}


function partTwo({ matrix }) {
    const ratios = [];

    eachMatrix(matrix, (char, coords) => {
        if (isGear(char)) {
            const parts = [];

            eachSurrounding(matrix, coords, (adj, adjCoords) => {
                if (isDigit(adj)) {
                    parts.push(extractPartNumber(matrix, adjCoords));
                }
            });

            if (parts.length === 2) {
                ratios.push(parts[0] * parts[1]);
            }
        }
    });



    return sum(ratios);
}




const part1 = partOne({ matrix });
const part2 = partTwo({ matrix: p2Matrix });
// console.log('result1: ', part1, '\nresult2: ', part2);
export const d3Result = { part1, part2 };
