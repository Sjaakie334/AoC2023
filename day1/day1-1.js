const caliArr = [
	'1abc2',
	'pqr3stu8vwx',
	'a1b2c3d4e5f',
	'treb7uchet'
];

const values = [];
caliArr.forEach(value => {
	const copyValue = value.replace(/[^0-9]/g, '');
	const firstDigit = copyValue.charAt(0);
	const lastDigit = copyValue.charAt(copyValue.length - 1);
	const combi = `${firstDigit}${lastDigit}`;
	values.push(combi);
});
// console.log(values);
export const d1p1Result = values;

