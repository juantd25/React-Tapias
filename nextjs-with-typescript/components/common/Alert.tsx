import Image from "next/image";
import {
  alertSuccess,
  alertTextSuccess,
  alertInformation,
  alertWarning,
  alertError,
  alertTextError,
  alertTextBody,
} from "styles/alert";

type Props = {
  error?: boolean;
  warning?: boolean;
  information?: boolean;
  success?: boolean;
  title?: string;
  body?: string;
  size?: string;
};

export default function Alert({size, success, information, warning, error, title, body}: Props) {
  let icon = "";
  let iconSize = 0;
  let alertClass = "";
  let alertText = "";
  let bodyText = "";

  information
    ? ((icon = "/icons/Information.svg"), (alertClass = alertInformation))
    : warning
    ? ((icon = "/icons/Warning.svg"), (alertClass = alertWarning))
    : error
    ? ((icon = "/icons/Error.svg"), (alertClass = alertError))
    : ((icon = "/icons/Successs.svg"), (alertClass = alertSuccess));

  error ? (alertText = alertTextError) : (alertText = alertTextSuccess);

  if (size === "sm") {
    alertClass += " h-9";
    iconSize = 18;
    alertText += " text-sm font-semibold";
  } else if (size === "mb") {
    alertClass += " h-12";
    iconSize = 24;
    alertText += " text-base font-normal";
  } else if (size === "lg") {
    alertClass += " h-auto";
    iconSize = 18;
    alertText += " text-sm font-bold";
    bodyText = alertTextBody + " text-sm";
  } else if (size === "xl") {
    alertClass += " h-auto";
    iconSize = 24;
    alertText += " text-base font-bold";
    bodyText = alertTextBody + " text-base";
  }

  return (
    <div className={alertClass}>
      <div className="flex items-center">
        <div className="mr-1 w-6 h-6">
          <Image src={icon} width={iconSize} height={iconSize} />
        </div>
      </div>
      <div className="flex flex-col p-">
        <p className={alertText}>{title}</p>
        <p className={bodyText}>{body}</p>
      </div>
    </div>
  );
}
