import $switchCaseDefault, { $switchCaseStrict } from "dolla-switch";
import { input1, test1 } from "./input1";

type Range = {
    start: number;
    end: number; //exclusive
}

const isFullOverlap = (first: Range, second: Range) => 
    first.start >= second.start && first.end <= second.end
    || second.start >= first.start && second.end <= first.end;

const hasOverlap = (first: Range, second: Range) => 
    second.start >= first.start && second.start <= first.end
    || second.end >= first.start && second.end <= first.end;


export const solution11 = (): number => {
    return input1.map(line => {
        const splitted = line.split(',');
        const first = splitted[0].split('-');
        const second = splitted[1].split('-');
        const firstRange = {
            start: Number(first[0]),
            end: Number(first[1])
        };

        const secondRange = {
            start: Number(second[0]),
            end: Number(second[1])
        };
        const isInRange = isFullOverlap(firstRange, secondRange);
        return (isInRange ? 1 : 0) as number;
    }).reduce((prev, curr) => prev + curr);
}

export const solution12 = (): number => {
    return input1.map(line => {
        const splitted = line.split(',');
        const first = splitted[0].split('-');
        const second = splitted[1].split('-');
        const firstRange = {
            start: Number(first[0]),
            end: Number(first[1])
        };

        const secondRange = {
            start: Number(second[0]),
            end: Number(second[1])
        };
        const partialOverlap = hasOverlap(firstRange, secondRange) || hasOverlap(secondRange, firstRange);
        return (partialOverlap ? 1 : 0) as number;
    }).reduce((prev, curr) => prev + curr);
}