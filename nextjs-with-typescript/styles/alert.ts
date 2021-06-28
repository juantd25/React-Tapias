import classNames from "classnames";
export const alertSuccess = classNames(
  "flex items-start w-80 py-2 px-4 border border-solid rounded-lg border-success bg-successBg",
);
export const alertInformation = classNames(
  "flex items-start w-80 py-2 px-4 border border-solid rounded-lg border-information bg-informationBg",
);
export const alertWarning = classNames(
  "flex items-start w-80 py-2 px-4 border border-solid rounded-lg border-alert bg-alertBg",
);
export const alertError = classNames(
  "flex items-start w-80 py-2 px-4 border border-solid rounded-lg border-error bg-errorBg",
);

export const alertTextSuccess = classNames("text-neutral90");
export const alertTextError = classNames("text-errorTextBg");
export const alertTextBody = classNames("text-neutral80");
