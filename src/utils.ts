export const batched = <T>(batchSize: number) => (acc: T[][], curr: T, index: number) => {
    const ch = Math.floor(index/batchSize);
    if (acc[ch]) {
        acc[ch].push(curr);
    } else {
        acc[ch] = [curr];
    }
    return acc;
    }