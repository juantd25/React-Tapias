import {useEffect, useState} from "react";
import {toggleBase, labelBase, toggleBaseInside, toggleBaseSm, toggleBaseInsideSm, labelBaseSm} from "styles/toggle";

type Props = {
  disabled?: boolean;
  checked?: boolean;
  size?: string;
  labelOnText?: string;
  labelOffText?: string;
  id?: string;
};

export default function Toggle({disabled, checked, labelOnText, labelOffText, id, size}: Props) {
  let toggleStyle = size === "sm" ? toggleBaseSm : toggleBase;
  let toggleStyleInside = size === "sm" ? toggleBaseInsideSm : toggleBaseInside;
  let labelStyle = size === "sm" ? labelBaseSm : labelBase;

  const [check, setCheck] = useState(false);
  const [disable, setDisable] = useState(false);

  useEffect(() => {
    setCheck(checked);
    setDisable(disabled);
  }, [checked, disabled]);

  check && disable
    ? (toggleStyle += "bg-neutral40")
    : check
    ? (toggleStyle += "bg-blueDark40")
    : disable
    ? (toggleStyle += "bg-neutral40")
    : (toggleStyle += "bg-neutral50");

  const onHandleChecked = event => {
    event.target.checked ? setCheck(true) : setCheck(false);
  };

  return (
    <div className="flex flex-row items-center w-19 h-6 left-5 top-1">
      <label htmlFor={id} className="flex cursor-pointer">
        <div className="relative">
          <input
            type="checkbox"
            id={id}
            className="sr-only"
            defaultChecked={check}
            disabled={disable}
            onClick={event => onHandleChecked(event)}
          />
          <div className={toggleStyle}></div>
          <div className={toggleStyleInside}></div>
        </div>
        <label className={labelStyle} htmlFor={id}>
          {check ? labelOnText : labelOffText}
        </label>
      </label>
    </div>
  );
}
