import $switchCaseDefault, { $switchCaseStrict } from "dolla-switch";
import { batched } from "../utils";
import { input1, test1 } from "./input1";

const checkCase = (ch: string) =>
    ch === ch.toLowerCase() ? 'lower' : 'upper';

const getItemPriority = (ch: string) =>
    checkCase(ch) === 'lower'
    ? (ch.charCodeAt(0) - 'a'.charCodeAt(0)) + 1
    : (ch.charCodeAt(0) - 'A'.charCodeAt(0) + 27);

export const solution11 = (): number => {
    return input1
        .map(line => ([...line]))
        .map(lineArr => {
            const half = Math.ceil(lineArr.length / 2);
            const firstHalf = lineArr.slice(0, half);
            const secondHalf = lineArr.slice(-half);
            const firstPocket = new Set(firstHalf);
            const secondPocket = new Set(secondHalf);
            const diff = (firstPocket.size > secondPocket.size 
                ? firstHalf.filter(c => secondPocket.has(c)) 
                : secondHalf.filter(c => firstPocket.has(c)))[0];
            return getItemPriority(diff);
        }).reduce((prev, curr) => prev + curr);
}

export const solution12 = (): number => {
    return input1.reduce(batched(3), [])
    .map(rucksacks => {
        const sets = rucksacks.map( rucks => new Set([...rucks]));
        const all = [...sets.map( s => Array.from(s))].flat();
        const common = all.filter(item => sets.every(rs => rs.has(item)))[0];
        return getItemPriority(common);
    })
    .reduce((prev, curr) => prev + curr);
}