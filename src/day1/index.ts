import { input1, test1 } from "./input1";

const sortedCalories = input1.reduce((acc, curr) => {
    const numOrNan = parseInt(curr, 10);
    if (isNaN(numOrNan)) {
        return [...acc, 0];
    } else {
        acc[acc.length-1] += numOrNan;
        return acc;
    }
}, [0]).sort((a, b) => b - a);

export const solution11 = (): number => {
    return sortedCalories[0];
}

export const solution12 = (): number => {
    //Yes, I'm lazy
    return sortedCalories[0] + sortedCalories[1] + sortedCalories[2];
}

