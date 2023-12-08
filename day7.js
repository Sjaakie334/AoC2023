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

function p1(){
    const strength = '23456789TJQKA'
    const resultArray = lines.map(line =>{
        const splitLine = line.split(' ');
        let cards = splitLine[0];
        let bid = splitLine[1];
        cards = cards.split('').map(card => strength.indexOf(card));
        const freq = getFrequencies(cards);

        const hand = Object.values(freq).sort(sortDesc)
        const concatArr = hand.concat(cards);
        return {sort: concatArr, bid: Number(bid)}
    })
    const arr = resultArray.sort((a, b) => cleverSort(b.sort, a.sort))
    const finalArr = arr.map((hand, index) => hand.bid * (index + 1));
    console.log('p1: ', sum(finalArr));
}

p1();