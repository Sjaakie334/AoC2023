import { getFrequencies, getLines, sortDesc, sum } from './lib/utils.js';

const lines = getLines('d7a');

function cleverSort (a, b) {
    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]){
            return b[i] - a[i];
        }
    }
    return 0;
}

function part(partNumber){
    const isPartTwo = partNumber === 2;
    const strength = (isPartTwo) ? 'J23456789TQKA' : '23456789TJQKA';
    const resultArray = lines.map(line =>{
        const splitLine = line.split(' ');
        let cards = splitLine[0];
        let bid = splitLine[1];
        cards = cards.split('').map(card => strength.indexOf(card));
        const freq = getFrequencies(cards);

        let jokers;
        if (isPartTwo) {
            jokers = freq['0'];
            delete freq['0'];
        }

        const hand = Object.values(freq).sort(sortDesc)

        if (isPartTwo && jokers) {
            hand[0] ??= 0;
            hand[0] += jokers;
        }

        const concatArr = hand.concat(cards);
        return {sort: concatArr, bid: Number(bid)}
    })
    const arr = resultArray.sort((a, b) => cleverSort(b.sort, a.sort))
    const finalArr = arr.map((hand, index) => hand.bid * (index + 1));
    const resultString = `Part ${partNumber}: `;
    console.log(resultString, sum(finalArr));
}

part(1);
part(2);
/**
 * result with actual:
 * Part 1:  251029473
 * Part 2:  251003917
 */