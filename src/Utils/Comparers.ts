export const stringComparerAsc = (a: string, b: string) => (a < b ? -1 : a === b ? 0 : 1);
export const stringComparerDesc = (a: string, b: string) => (a < b ? 1 : a === b ? 0 : -1);
export const getStringComparer = (direction: "asc" | "desc") => (direction === "asc" ? stringComparerAsc : stringComparerDesc);

export const getNumberComparer = (direction: "asc" | "desc") =>
  direction === "asc" ? (a: number, b: number) => a - b : (a: number, b: number) => b - a;

export const getKeyExtractorComparer = (key: string) => (a: any, b: any) => {
  if (a[key] === undefined && b[key] === undefined) return 0;
  if (a[key] === undefined) return 1;
  if (b[key] === undefined) return -1;
  return a[key] < b[key] ? -1 : a[key] === b[key] ? 0 : 1;
};

export const getKeyExtractorReversedComparer = (key: string) => (a: any, b: any) => {
  if (a[key] === undefined && b[key] === undefined) return 0;
  if (a[key] === undefined) return -1;
  if (b[key] === undefined) return 1;
  return a[key] < b[key] ? 1 : a[key] === b[key] ? 0 : -1;
};
