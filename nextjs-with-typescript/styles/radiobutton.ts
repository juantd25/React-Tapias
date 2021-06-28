import classNames from "classnames";
export const radioButtonBase = classNames("w-5 h-5 ml-100 border-1 cursor-pointer");
export const radioButtonBaseSm = classNames("w-15 h-15 ml-100 border-1 cursor-pointer");
export const radioButtonDisabled = classNames(
  " hover:border-neutral60 bg-neutral40 border-neutral60 disabled:opacity-90 text-neutral60",
);
export const radioButtonActive = classNames(
  " hover:border-blueDark40 hover:shadow-inner focus:ring-neutral00 text-blueDark40",
);

export const labelBase = classNames("text-base font-normal ml-3 cursor-pointer ");
export const labelBaseSm = classNames("text-sm font-normal ml-3 cursor-pointer ");
