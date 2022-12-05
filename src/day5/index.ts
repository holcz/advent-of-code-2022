import $switchCaseDefault, { $switchCaseStrict } from "dolla-switch";
import { batched } from "../utils";
import { input1, inputInitial, test1, testInitial } from "./input1";

const processInitialData = (data: string[]) => {
    //I'm not proud of this
    const d = data
        .map((line) => ([...line]))
        .map((row) => {
            return row.reduce(batched(4), []).map((batch) => batch.join("")).map(
                craneOrNot => {
                    if (craneOrNot !== '    ') {
                        return craneOrNot[2];
                    } else {
                        return '';
                    }
                }
            );
    }).reverse();
    const acc = [];
    // Here I'm just getting super lazy
    for (let i = 0; i < d.length; i++) {
        const row = d[i];
        for (let j = 0; j < row.length; j++) {
            const col = row[j];
            if (col) {
                if (acc[j]) {
                    acc[j].push(col);
                } else {
                    acc[j] = [col];
                }
            }
        }
    }
    return acc;
}
type Move = {
    amount: number;
    from: number;
    to: number;
}

const doTheMoves = (from: number, to: number) => (amount: number, initial: string[][]) => {
    const fromRow = initial[from];
    const toRow = initial[to];
    const fromRowNew = fromRow.slice(0, fromRow.length - amount);
    const toRowNew = toRow.concat(fromRow.slice(fromRow.length - amount).reverse());
    const initialNew = [...initial];
    initialNew[from] = fromRowNew;
    initialNew[to] = toRowNew;
    return initialNew;
}

const doTheMoves2 = (from: number, to: number) => (amount: number, initial: string[][]) => {
    const fromRow = initial[from];
    const toRow = initial[to];
    const fromRowNew = fromRow.slice(0, fromRow.length - amount);
    const toRowNew = toRow.concat(fromRow.slice(fromRow.length - amount));
    const initialNew = [...initial];
    initialNew[from] = fromRowNew;
    initialNew[to] = toRowNew;
    return initialNew;
}

const processMoves = (moves: string[]): Move[] => {
    return moves.map(move => {
        const [amount, _from] = move.split(' from ');
        const [from, to ] = _from.split(' to ');
        return {
            amount: parseInt(amount),
            from: parseInt(from) - 1,
            to: parseInt(to) - 1,
        }
    });
}

export const solution11 = (): string => {
    const initialData = processInitialData(inputInitial);
    const moves = processMoves(input1);
    const finalData = moves.reduce((acc, curr) => {
        return doTheMoves(curr.from, curr.to)(curr.amount, acc);
    }, initialData);
    return finalData.map(col => col.at(-1)).join('');
}

export const solution12 = (): string => {
    const initialData = processInitialData(inputInitial);
    const moves = processMoves(input1);
    const finalData = moves.reduce((acc, curr) => {
        return doTheMoves2(curr.from, curr.to)(curr.amount, acc);
    }, initialData);
    return finalData.map(col => col.at(-1)).join('');
}