import unique from './unique';

let array = [1, '1', 2, 3, 4, 1, '1', -1, NaN, NaN, {a: 1}, {b:2}, {b: 2}];
console.log(unique(array));