import {SvgIcon, SvgIconProps} from "@material-ui/core";
export default function Radiobutton(props: SvgIconProps) {
  return (
    <SvgIcon {...props} viewBox="0 0 24 24">
      <rect x="2" y="2" width="20" height="20" rx="10" />
      <rect x="7" y="7" width="10" height="10" rx="5" fill="white" />
    </SvgIcon>
  );
}
