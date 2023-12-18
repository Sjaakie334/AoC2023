import { getLines, sum } from './lib/utils.js'

const lines = getLines('d4a');
// console.log(lines);
const doubleSpaceRegex = / +/g;
const p2SScratchcards = getScratchCards(getLines('d4a'));
const p2scratchcards = getScratchCards(getLines('d4a'));

let test = 0;
for (let i = 1; i < 11; i++) {
    test = (test === 0) ? 1 : test * 2;
    // console.log(`${i} match: ${test} points.`);

}

function getScratchCards(inputArray) {
    const result = [];

    inputArray.forEach(line => {
        const card = line.split(': ');
        const cardID = Number(card[0].replace(doubleSpaceRegex, ' ').split(' ')[1]);
        // console.log('cardID: ', cardID);

        const numbers = card[1].split(' | ');
        // console.log('numbers: ', numbers);
        let winningNumbers = numbers[0].replace(doubleSpaceRegex, ' ').split(' ');
        let lotNumbers = numbers[1].replace(doubleSpaceRegex, ' ').split(' ');

        //filter away empty strings
        winningNumbers = winningNumbers.filter(number => number !== '');
        lotNumbers = lotNumbers.filter(number => number !== '');


        const scratchCard = { cardID, winningNumbers, lotNumbers, copies: 1 }; // copies has 1 since it occurs one time
        // console.log(scratchCard);
        result.push(scratchCard);
    });

    return result;
}

function partOne(scratchCards) {
    const collectedPoints = [];

    scratchCards.forEach(card => {
        let matches = 0;
        let points = 0;
        const lotNumbers = card.lotNumbers;
        lotNumbers.forEach(lot => {
            if (card.winningNumbers.includes(lot)) {
                // console.log(`from card: ${card.cardID}, match with lot: `, lot);
                points = (points === 0) ? 1 : points * 2;
                matches++;
            }
        });
        // if (matches > 10) console.log({ card, points, matches });
        collectedPoints.push(points);
        points = 0;
        matches = 0;
    });

    // console.log('collected: ', collectedPoints);

    return sum(collectedPoints);
}

function partTwoLong(scratchCards) {
    const arr = [...scratchCards]
    // const collectedPoints = [];
    // console.log(arr);
    for (let card of arr) {
        // console.log(card);
        const cardID = card.cardID;
        let matches = 0;
        // let points = 0;
        const lotNumbers = card.lotNumbers;
        lotNumbers.forEach(lot => {
            if (card.winningNumbers.includes(lot)) {
                // console.log(`from card: ${card.cardID}, match with lot: `, lot);
                // points = (points === 0) ? 1 : points * 2;
                matches++;
            }
        });

        for (let i = 1; i <= matches; i++) {
            const id = cardID + i
            const copiedObject = arr.find((card) => card.cardID === id);
            // console.log('copiedObject: ', copiedObject);

            arr.push(copiedObject);

        }
        // arr.sort((card1, card2) => card1 - card2);

        // if (matches > 10) console.log({card, points, matches});
        // collectedPoints.push(points);
        // points = 0;
        matches = 0;
        // console.log(arr.length);
    };

    // console.log('collected: ', collectedPoints);
    // arr.forEach(element => {
    //     console.log(element.cardID);
    // });

    return arr.length;
}

function partTwoShort(scratchCards) {
    const arr = [...scratchCards];
    let collectedPoints = 0;
    // console.log(arr);

    for (let card of arr) {
        const cardID = card.cardID;
        let matches = 0;
        const lotNumbers = card.lotNumbers;
        lotNumbers.forEach(lot => {
            if (card.winningNumbers.includes(lot)) {
                matches++;
            }
        });

        collectedPoints += (matches === 0) ? 0 : 1 << (matches - 1);

        for (let i = 1; i <= matches; i++) {
            const id = cardID + i
            const copiedObject = arr.find((card) => card.cardID === id);
            arr.push(copiedObject);
        }

        matches = 0;
        // console.log(arr.length);
    };

    return arr.length;
}


// console.log('scratchcards: ', scratchcards);

const part1 = partOne(getScratchCards(lines));
// console.log('result1: ', part1); // result1: 26426
export const d4Result = {part1, part2: 6227972}


// const result2Short = partTwoShort(p2SScratchcards);
// console.log('result2Short: ', result2Short); // result2: 6227972


// const result2Long = partTwoLong(p2scratchcards);
// console.log('result2Long: ', result2Long); // result2: 6227972