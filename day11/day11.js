import { getLinesV2 } from "../lib/utils.js";

//RUN FROM adventofcode.com
// let response = await fetch("https://adventofcode.com/2023/day/11/input");
// let txt = await response.text();

//let's expand based on part 1 vs 2... or do we??
function expand(int) {

  //since I mutate this, and I need the original for part2, ensure it is embedded within the function
  let inputs = getLinesV2('day11/in');

  //let's expand the universe twice, once horizontally, and another time... horizontally again;-)
  for (let i = 0; i < 2; i++) {
    let horizon = [];
    let transpose = [];
    for (let y of inputs) {
      let empty = true
      for (let x in y) {
        //check if line is empty. if not, no need to keep iterating over it
        if (y[x] == "#") {
          empty = false;
          break;
        }
      }
      //clone the row into horizon
      horizon.push(y);
      //if empty, clone it again to "expand" it
      //expand 1M times for part 2
      if (empty)
        for (let j = 0; j< int ; j++) horizon.push(y);
    }

    //transpose it. that way, we can run the same operation twice without thinking too hard
    for (let y in horizon) {
      for (let x in horizon[y]) {
        transpose[x] = transpose[x] || "";
        transpose[x] += horizon[y][x];
      }
    }
    //mutate inputs
    inputs = [...transpose];
  }

  //find coords of galaxies
  let coords = [];

  for (let y in inputs)
    for (let x in inputs[y])
      if (inputs[y][x] == "#") coords.push([y, x]);

  //to compute answer for part 1, we simply need to compare all galaxies together, and add the x distance to the y distance together. 
  let answer= 0;

  //arguably, I could end one loop earlier, but that's how I end up with a remnant from part1 into part2 that makes me waste 1h
  while (coords.length > 0) {

    //empty array to avoid unnecessary comparison of a galaxy to itself
    let pop = coords.pop();

    //loop over other coords. Add results
    for (let galaxy of coords) answer += Math.abs(pop[0] - galaxy[0]) + Math.abs(pop[1] - galaxy[1]);
  }
  return answer
}

const part1 = expand(1);
const part2 = (expand(0) + 999999*(expand(1)-expand(0)));

export const fullResult = `Part 1 answer: ${part1}

Trying to expand(1000000) will loop for a looooooong time.
Instead, we check how expansion affects the result

expand(2) - expand(1) = ${(expand(2) - expand(1))}
expand(3) - expand(2) = ${(expand(3) - expand(2))}
expand(4) - expand(3) = ${(expand(4) - expand(3))}
expand(5) - expand(4) = ${(expand(5) - expand(4))}
expand(6) - expand(5) = ${(expand(6) - expand(5))}

Since result increases by a fixed amount every expansion,
There will be no need to calculate a redrawn expanded map,
Just the original result + a million expansion factor:
Part 2 answer: ${part2}`;

// console.log(fullResult);

export const d11Result = {
    part1,
    part2
}