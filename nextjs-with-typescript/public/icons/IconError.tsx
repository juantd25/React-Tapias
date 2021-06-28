import {SvgIcon, SvgIconProps} from "@material-ui/core";
export default function Icon(props: SvgIconProps) {
  return (
    <SvgIcon {...props} viewBox="0 0 24 24">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.475 2 2 6.475 2 12C2 17.525 6.475 22 12 22C17.525 22 22 17.525 22 12C22 6.475 17.525 2 12 2ZM10.75 18.2501V15.7501H13.25V18.2501H10.75ZM10.75 5.75V14.5H13.25V5.75H10.75Z"
        fill="#F23E48"
      />
    </SvgIcon>
  );
}
