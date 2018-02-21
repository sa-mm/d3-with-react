import random from "lodash/random";

const last = arr => {
  if (arr.length === 0) return { value: 0 };

  return arr[arr.length - 1];
};

const randomNum = lastInt => {
  const lowest = lastInt - 5 <= 0 ? 5 : lastInt;
  return random(lowest, lowest + 10);
};

export const randomIncreasingYearValueData = size => {
  const smoothRandomNumbers = (
    [head, ...tail] = Array(size),
    i = 0,
    acc = []
  ) => {
    const r = randomNum(last(acc).value);
    const newAcc = [...acc, { year: 1700 + i, value: r }];
    if (tail.length === 0) return newAcc;

    return smoothRandomNumbers(tail, i + 1, newAcc);
  };

  const data = Array.from(Array(size)).reduce((acc, e, i) => {
    const r = randomNum(last(acc).value);
    return [...acc, { year: i + 1700, value: r }];
  }, []);

  return data;
};
