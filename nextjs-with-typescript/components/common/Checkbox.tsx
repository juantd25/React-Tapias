import {Component, useEffect, useState} from "react";
import {checkboxActive, checkboxBase, checkboxBaseSm, checkboxDisabled, labelBase, labelBaseSm} from "styles/checkbox";

type Props = {
  disabled?: boolean;
  checked?: boolean;
  size?: string;
  labelText?: string;
  id?: string;
};

export default function Checkbox({disabled, checked, size, labelText, id}: Props) {
  let checkboxStyle = size === "sm" ? checkboxBaseSm : checkboxBase;
  let labelStyle = size === "sm" ? labelBaseSm : labelBase;

  const [check, setCheck] = useState(false);
  const [disable, setDisable] = useState(false);

  useEffect(() => {
    setCheck(checked);
    setDisable(disabled);
  }, [checked, disabled]);

  disable
    ? ((checkboxStyle += checkboxDisabled), (labelStyle += "text-neutral60"))
    : ((checkboxStyle += checkboxActive), (labelStyle += "text-neutral80"));

  const onHandleChecked = event => {
    event.target.checked ? setCheck(true) : setCheck(false);
  };

  return (
    <div className="flex flex-row items-center p-0 h-6 w-80">
      <input
        className={checkboxStyle}
        type="checkbox"
        disabled={disable}
        defaultChecked={check}
        onClick={event => onHandleChecked(event)}
        id={id}
      />
      <label
        htmlFor={id}
        className={check && disable ? labelStyle : check ? labelStyle + "text-neutral90" : labelStyle}>
        {labelText}
      </label>
    </div>
  );
}
