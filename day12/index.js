import { getLinesV2 } from '../lib/utils.js';

const lines = getLinesV2('day12/in');
const list = lines.map(l => l.split(" ").map((v, i) => [v, v.split(",").map(Number)][i]))
const cache = new Map();
const sum = (a, b) => a + b;
const unfold = ([c, s]) => [Array(5).fill(c).join("?"), Array(5).fill(s).flat()];

export const d12Result = {
    part1: list.map(arrangements).reduce(sum),              //7361
    part2: list.map(unfold).map(arrangements).reduce(sum)   //83317216247365
};


function arrangements ([conditions, sizes]){
    if (conditions === '') return sizes.length ? 0 : 1;
    if (sizes.length === 0) return conditions.includes('#') ? 0 : 1;
    
    const key = `${conditions}-${sizes}`;
    if (cache.has(key)) return cache.get(key);

    let result = 0;
    const condition = conditions[0];
    if(".?".indexOf(condition) !== -1) result += arrangements([conditions.slice(1), sizes]);

    const [first, ...rest] = sizes;
    if("#?".indexOf(condition) !== -1 && first <= conditions.length 
        && !conditions.slice(0, first).includes('.') 
        && (first === conditions.length || conditions[first] !== '#')
    ) result += arrangements([conditions.slice(first + 1), rest]);

    cache.set(key, result);
    return result;
};