import $switchCaseDefault, { $switchCaseStrict } from "dolla-switch";
import { input1, test1 } from "./input1";

type RPS = "rock" | "paper" | "scissors";
type RPSResult = "win" | "lose" | "draw";

const getRPS = (input: string): RPS => {
    return $switchCaseDefault(input, {
        A: () => "rock",
        X: () => "rock",
        B: () => "paper",
        Y: () => "paper",
        C: () => "scissors",
        Z: () => "scissors"
    }, () => {throw new Error("Invalid input")});
}

const getRPSResult = (player1: RPS, player2: RPS): RPSResult => {
    if (player1 === player2) {
        return "draw";
    } else if (player1 === "rock" && player2 === "scissors") {
        return "win";
    } else if (player1 === "paper" && player2 === "rock") {
        return "win";
    } else if (player1 === "scissors" && player2 === "paper") {
        return "win";
    } else {
        return "lose";
    }
}

const calculateMyMove = (oppenentMove: RPS, expectedOutcome: string): RPS => {
    //I'm lazy mapping X: loose, Y: draw, Z: win
    return $switchCaseStrict(expectedOutcome, {
        X: () => {
            return $switchCaseStrict(oppenentMove, {
                rock: () => "scissors",
                paper: () => "rock",
                scissors: () => "paper"
                });
        },
        Y: () => {
            return oppenentMove;
        },
        Z: () => {
            return $switchCaseStrict(oppenentMove, {
                rock: () => "paper",
                paper: () => "scissors",
                scissors: () => "rock"
            });
        }
    });
}

const getScore = (res: RPSResult, rps: RPS): number => {
    const scoreFromResult = $switchCaseStrict(res, {
        win: () => 6,
        lose: () => 0,
        draw: () => 3
    });
    const scoreFromRps = $switchCaseStrict(rps, {
        rock: () => 1,
        paper: () => 2,
        scissors: () => 3
    });
    return scoreFromResult + scoreFromRps;
}

export const solution11 = (): number => {
    return input1.reduce((acc, curr) => {
        const opponent = getRPS(curr[0]);
        const me = getRPS(curr[1]);
        const res = getRPSResult(me, opponent);
        const score = getScore(res, me);
        return acc + score;
    }, 0);
}

export const solution12 = (): number => {
    return input1.reduce((acc, curr) => {
        const opponent = getRPS(curr[0]);
        const expectedOutcome = curr[1];
        const myMove = calculateMyMove(opponent, expectedOutcome);
        const res = getRPSResult(myMove, opponent);
        const score = getScore(res, myMove);
        return acc + score;
    }, 0);
}