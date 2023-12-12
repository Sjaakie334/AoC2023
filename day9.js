import { getLines } from './lib/utils.js'
const lines = getLines('d9a');

function p1 (){
  const result = lines.map(v => v.split(' ').map(Number)).reduce((total, seq) => {
    let val = seq.at(-1);
    while(seq.some(v => v !== 0)){
      seq = seq.slice(1).map((value, i) => value - seq[i]);
      val += seq.at(-1);
    }
    return total + val;
  }, 0);

  console.log('p1: ', result);
}

p1(); // p1:  2174807968

