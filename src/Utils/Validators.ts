import { reducers } from "./Reducers";

export const nonEmptyValidator = (val: string) => val.length > 0;
export const getRegexValidator = (regex: RegExp, noEmpty?: boolean) => (val: string) =>
  noEmpty === true ? regex.test(val) : val.length === 0 || regex.test(val);

export const validatorCombiner = (validators: ((val: string) => boolean)[]) => (val: string) =>
  validators.map((validator) => validator(val)).reduce(reducers.and);
