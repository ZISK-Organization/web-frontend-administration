const max = (acc: any, val: any) => (acc >= val ? acc : val);
const min = (acc: any, val: any) => (acc <= val ? acc : val);
const or = (acc: boolean, val: boolean) => acc || val;
const and = (acc: boolean, val: boolean) => acc && val;
const sum = (acc: number, val: number) => acc + val;

const maxWithKeyExtractor = (extractor: (arg: any) => any) => (acc: any, val: any) =>
  extractor(acc) >= extractor(val) ? acc : val;

export const reducers = { max, min, or, and, sum, maxWithKeyExtractor };
