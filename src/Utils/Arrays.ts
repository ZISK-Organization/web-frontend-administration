export const distinctBy = (arr: any[], mapper: (x: any) => any) => {
  const used = new Set();
  const res: any[] = [];
  arr.forEach((i) => {
    if (!used.has(mapper(i))) {
      used.add(mapper(i));
      res.push(i);
    }
  });
  return res;
};
