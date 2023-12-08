import { getLines } from './lib/utils.js';

const lines = getLines('d6a');

const excludeNumbers = /[^0-9]/g
const doubleSpaceRegex = / +/g;
let emptystring = ''
const times = lines[0].split(':')[1].replace(doubleSpaceRegex, ' ').split(' '); 
const distances = lines[1].split(':')[1].replace(doubleSpaceRegex, ' ').split(' ');
emptystring = times.shift();
emptystring = distances.shift();
console.log({times, distance: distances});


const getDistance = (holdTime, maxTime) => (maxTime - holdTime) * holdTime;

function p1(){
    const possibilities = []
    for (let i = 0; i < times.length; i++) {
        const time = Number(times[i]);
        const record = Number(distances[i]);
        let recordBeaters = 0;
    
        for (let j = 1; j < time; j++) {
            const dist = getDistance(j, time);
            if (dist > record) {
                recordBeaters++;
            }
        }
    
        possibilities.push(recordBeaters);
    }
    
    console.log('p1: ', possibilities.reduce((total, current) => total * current, 1));
}

p1(); //example: 288, act: 503424

function p2(){
    const p2Time = Number(lines[0].replace(excludeNumbers, ''));
    const p2Distance = Number(lines[1].replace(excludeNumbers, ''));
    console.log({p2Time, p2Distance});

    let recordBeaters = 0;

    for (let i = 1; i < p2Time; i++) {
        const dist = getDistance(i, p2Time);
        if (dist > p2Distance) {
            recordBeaters++;
        }
    }
    
    console.log('p2: ', recordBeaters);
}

p2(); // example: 71530, actual: 

