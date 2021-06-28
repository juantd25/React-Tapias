import {SvgIcon, SvgIconProps} from "@material-ui/core";
export default function IconInformation(props: SvgIconProps) {
  return (
    <SvgIcon {...props} viewBox="0 0 24 24">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.475 2 2 6.475 2 12C2 17.525 6.475 22 12 22C17.525 22 22 17.525 22 12C22 6.475 17.525 2 12 2ZM13.25 5.75V8.25H10.75V5.75H13.25ZM9.5 17V18.25H14.5V17H13.25V9.5H9.5V10.75H10.75V17H9.5Z"
        fill="#4065F6"
      />
    </SvgIcon>
  );
}
