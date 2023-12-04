import fs from "fs";

const exampleInPath = './inputs/d3e1.txt';
const actualInPath = './inputs/d3a.txt';
const lines = fs.readFileSync(exampleInPath, 'utf-8').trim().split('\r\n');
const noDigitOrDot = /[^0-9.]/g;
const noDigit = /[^0-9]/g;
const digitRegx = /[0-9]/g;
const symbolIndexes = getSymbolIndexes();
const numberIndices = {};

lines.forEach((str, row) => {
  for (let col = 0; col < str.length; col++) {
    const char = str[col];
    if (/\d/.test(char)) {
      const numberStart = col;
      while (col < str.length && /\d/.test(str[col])) {
        col++;
      }
      const numberEnd = col - 1;
      const number = str.substring(numberStart, numberEnd + 1);
      
      if (!numberIndices[number]) {
        numberIndices[number] = [];
      }
      
      numberIndices[number].push({ start: { row, col: numberStart }, end: { row, col: numberEnd } });
    }
  }
});
const numberKeys = Object.keys(numberIndices);

function getSymbolIndexes(){
    let symbolResult = [];

    for (let rowNumber = 0; rowNumber < lines.length; rowNumber++) {
        const line = lines[rowNumber];
        for (let colomNumber = 0; colomNumber < line.length; colomNumber++) {
            const char = line[colomNumber];

            if (noDigitOrDot.test(char)) {
                symbolResult.push({ rowNumber, colomNumber, symbol: char });
            }
        }
    }
    return symbolResult;
}

function checkSurroundings(start, end) {
  // console.log('start', start);
  // console.log('end', end);
  let numberCounts = false
  let colStart = 0;
  let colEnd = 0;
  const rowLength = lines[0].length;
  const startcol = start.col;
  const endcol = end.col;

  colStart = (startcol === 0) ? 0 : startcol - 1;
  colEnd = (endcol === rowLength) ? rowLength : endcol + 1;

  const row = start.row;
  const preRow = (row === 0) ? null : row - 1;
  const nexRow = (row === lines.length) ? null : row + 1;

  if (preRow !== null) {
    const line = lines[preRow];
    for (let index = colStart; index <= colEnd; index++) {
      const char = line.charAt(index);
      if (noDigitOrDot.test(char)) {
        numberCounts = true;
        return numberCounts;
      }
    }
  }

  if (row) {
    const line = lines[row];
    if (noDigitOrDot.test(line[colStart])) {
      numberCounts = true;
      return numberCounts;
    }

    if (noDigitOrDot.test(line[colEnd])) {
      numberCounts = true;
      return numberCounts;
    }
  }

  if (nexRow !== null) {
    const line = lines[nexRow];
    for (let index = colStart; index <= colEnd; index++) {
      const char = line.charAt(index);
      if (noDigitOrDot.test(char)) {
        numberCounts = true;
        return numberCounts;
      }
    }
  }
  return numberCounts;
}

function getValidNumberKeys() {
  const validKeys = [];
  numberKeys.forEach(key => {
    // console.log(`value from ${key}`, numberIndices[key]);
    const validNumber = checkSurroundings(numberIndices[key][0].start, numberIndices[key][0].end);

    if (validNumber) {
      validKeys.push(key);
    }
    // console.log(validNumber);
  });

  return validKeys;
}

function getNumberFromKey(key) {
  const start = numberIndices[key][0].start;
  const end = numberIndices[key][0].end;
  const row = start.row;

  const numberString = lines[row].substring(start.col, end.col + 1);
  const numberResult = Number(numberString);
  // console.log('numberResult', numberResult); 

  return numberResult;
}

function partOne(){
  const validKeys = getValidNumberKeys();
  // console.log('validKeys:', validKeys);
  const result = validKeys.reduce((sum, current)=>{
    return Number(sum) + getNumberFromKey(current)
  })
  console.log(`result: ${result}`);
}

partOne();

// console.log(lines);
// console.log(symbolIndexes);


// console.log(numberIndices);
// console.log(numberKeys);



// function getLines(file){
//     const path = `inputs/${file}`;
//     fs.readFile(path, 'utf8', (err, data)=>{
//         if (err) {
//             console.error(err);
//             return;
//         }

//         return data.split('\n');
//     })
// }