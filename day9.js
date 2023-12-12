import { getLines } from './lib/utils.js'
const lines = getLines('d9a');

function result (part){
    const result = lines.map(v => v.split(' ').map(Number)).reduce((total, seq) => {
      let val = (part === 1 ? seq : seq.reverse()).at(-1);
      while(seq.some(v => v !== 0)){
        seq = seq.slice(1).map((value, i) => value - seq[i]);
        val += seq.at(-1);
      }
      return total + val;
    }, 0);
  
    return result;
  }
  
  const finalRes = {
    p1: result(1),
    p2: result(2)
  } // { p1: 2174807968, p2: 1208 }
  
  console.log(finalRes);

