import random from "lodash/random";

const last = arr => {
  if (arr.length === 0) return { value: 0 };

  return arr[arr.length - 1];
};

const randomNum = lastInt => {
  const lowest = lastInt - 5 <= 0 ? 5 : lastInt;
  return random(lowest, lowest + 10);
};

export const randomIncreasingYearValueData = ({
  startYear = 1700,
  duration = 300
}) => {
  const smoothRandomNumbers = (
    [head, ...tail] = Array(duration),
    i = 0,
    acc = []
  ) => {
    const r = randomNum(last(acc).value);
    const newAcc = [...acc, { year: startYear + i, value: r }];
    if (tail.length === 0) return newAcc;

    return smoothRandomNumbers(tail, i + 1, newAcc);
  };

  const data = Array.from(Array(duration)).reduce((acc, e, i) => {
    const r = randomNum(last(acc).value);
    return [...acc, { year: i + startYear, value: r }];
  }, []);

  return data;
};

export const randomYearValueData = ({ startYear = 1700, duration = 300 }) => {
  return Array.from(Array(duration)).map((e, i) => {
    return { year: i + startYear, value: random(0, 100) };
  });
};
