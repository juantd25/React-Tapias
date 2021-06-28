import classNames from "classnames";
export const checkboxBase = classNames("w-5 h-5 ml-100 cursor-pointer appearance-none border-1 border-solid rounded");
export const checkboxBaseSm = classNames(
  "w-15 h-15 ml-100 cursor-pointer appearance-none border-1 border-solid rounded",
);
export const checkboxDisabled = classNames(
  " hover:border-neutral50 bg-neutral40 border-neutral50 disabled:opacity-90 text-neutral60",
);
export const checkboxActive = classNames(" hover:border-blueDark40 focus:ring-neutral00 text-blueDark40");
export const labelBase = classNames("text-base font-normal ml-3 cursor-pointer ");
export const labelBaseSm = classNames("text-sm font-normal ml-3 cursor-pointer ");
