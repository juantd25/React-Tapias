import {useEffect, useState} from "react";
import {
  radioButtonBase,
  radioButtonActive,
  labelBase,
  labelBaseSm,
  radioButtonDisabled,
  radioButtonBaseSm,
} from "styles/radiobutton";

type Props = {
  disabled?: boolean;
  checked?: boolean;
  size?: string;
  labelText?: string;
  id?: string;
};

export default function RadioButton({checked, disabled, size, labelText, id}: Props) {
  let radiobuttonStyle = size === "sm" ? radioButtonBaseSm : radioButtonBase;
  let labelStyle = size === "sm" ? labelBaseSm : labelBase;

  const [check, setCheck] = useState(false);
  const [disable, setDisable] = useState(false);

  useEffect(() => {
    setCheck(checked);
    setDisable(disabled);
  }, [checked, disabled]);

  disable
    ? ((radiobuttonStyle += radioButtonDisabled), (labelStyle += "text-neutral60"))
    : ((radiobuttonStyle += radioButtonActive), (labelStyle += "text-neutral80"));

  const onHandleChecked = event => {
    if (event.currentTarget.checked) {
      event.currentTarget.value = "off";
      event.currentTarget.checked = false;
      setCheck(false);
    } else {
      event.currentTarget.value = "on";
      event.currentTarget.checked = true;
      setCheck(true);
    }
    // event.currentTarget.value = "on" ? setCheck("on") : setCheck("off");
  };

  return (
    <div className="flex flex-row items-center p-0 h-6 w-80">
      <input
        className={radiobuttonStyle}
        type="radio"
        disabled={disable}
        defaultChecked={check}
        onClick={event => onHandleChecked(event)}
        onChange={event => onHandleChecked(event)}
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
