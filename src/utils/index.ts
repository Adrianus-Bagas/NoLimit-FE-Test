export const getRandomColor = () => {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);

  return `rgb(${r}, ${g}, ${b})`;
};

export const areEqual = (a: any[], b: any[]) =>
  a.length === b.length && a.every((element, index) => element === b[index]);
