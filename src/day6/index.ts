import { input1, test1 } from "./input1";

const hasDuplicate = (chars: string[]) => {
    const uniqueChars = new Set(chars);
    return uniqueChars.size !== chars.length;
};

export const solution = (numberOfUnique: number): number => {
    const data = input1;
    const firstFour = [...data.slice(0, numberOfUnique)];
    const rest = [...data.slice(numberOfUnique)];
    const { firstNoDuplicate: notDuplicate } = rest.reduce((acc, curr, index) => {
        if (hasDuplicate(acc.chars)) {
            return {
                ...acc,
                chars: [...acc.chars.slice(1), curr],
            }
        } else {
            if (!acc.firstNoDuplicate) {
                return {
                    ...acc,
                    firstNoDuplicate: numberOfUnique + index,
                }
            } else {
                return acc;
            }
        };
    }, {
        chars: firstFour,
        firstNoDuplicate: undefined
    } as {chars: string[], firstNoDuplicate: number | undefined});
    return notDuplicate ?? -1;
}

export const solution11 = (): number => {
    return solution(4);
}

export const solution12 = (): number => {
    return solution(14);
}