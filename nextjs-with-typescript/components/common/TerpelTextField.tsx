import Box from "@material-ui/core/Box";
import {TextField, styled, TextFieldProps, OutlinedInputProps, FormLabel} from "@material-ui/core";

import IconError from "public/icons/IconError";
import IconInformation from "public/icons/IconInformation";
import IconSuccess from "public/icons/IconSuccess";

type Props = TextFieldProps & {
  iconleft?: any;
  iconright?: any;
  info?: boolean | string;
  success?: boolean | string;
  message?: string;
};

const TerpelStyle = styled((props: Props) => (
  <TextField
    InputLabelProps={
      !props.iconleft
        ? undefined
        : {
            disableAnimation: true,
            style: {
              marginLeft: 32,
            },
          }
    }
    InputProps={
      props.iconright && props.iconleft
        ? ({
            disableUnderline: true,
            startAdornment: <Box sx={{display: "flex", alignItems: "center", mr: "10px"}}>{props.iconleft}</Box>,
            endAdornment: <Box sx={{display: "flex", alignItems: "center", ml: "10px"}}>{props.iconright}</Box>,
          } as Partial<OutlinedInputProps>)
        : props.iconleft
        ? ({
            disableUnderline: true,
            startAdornment: <Box sx={{display: "flex", alignItems: "center", mr: "10px"}}>{props.iconleft}</Box>,
          } as Partial<OutlinedInputProps>)
        : props.iconright
        ? ({
            disableUnderline: true,
            endAdornment: <Box sx={{display: "flex", alignItems: "center", ml: "10px"}}>{props.iconright}</Box>,
          } as Partial<OutlinedInputProps>)
        : ({
            disableUnderline: true,
          } as Partial<OutlinedInputProps>)
    }
    color={props.success ? "success" : props.info ? "info" : "primary"}
    {...props}
  />
))(props => ({
  "& .MuiFilledInput-root": {
    border: props.error ? "1px solid #F23E48" : "1px solid #C7C8CD",
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: props.disabled ? "#E3E6E6" : "#FFFFFF",
    transition: props.theme.transitions.create(["border-color", "background-color", "box-shadow"]),
    "&:hover": {
      backgroundColor: props.disabled ? "#E3E6E6" : "#FFFFFF",
    },
    "&.Mui-focused": {
      backgroundColor: props.error
        ? "#FEF0F0"
        : props.info
        ? "#FFFFFF"
        : props.success
        ? "#E9F7F0"
        : props.disabled
        ? "#E3E6E6"
        : "#FFFFFF",
      boxShadow: props.error || props.info || props.success ? "none" : "0px 0px 3px 1px rgba(36, 203, 240, 0.5)",
      borderColor: props.error ? "#F23E48" : props.info ? "#4065F6" : props.success ? "#0FAB0B" : "#15ADCE",
    },
  },
}));

export default function TerperTextField(props: Props) {
  const {info, success, error, message} = props;

  return (
    <Box sx={{display: "flex", flexDirection: "column"}}>
      <TerpelStyle {...props} variant="filled" />
      <Box sx={{display: "flex", flexDirection: "row", alignItems: "flex-start", margin: "8px 0px"}}>
        <Box sx={{flex: "none", order: 0, flexGrow: 0, paddingRight: 1}}>
          {!message ? null : error ? <IconError /> : info ? <IconInformation /> : success ? <IconSuccess /> : null}
        </Box>
        <Box sx={{width: 294}}>
          <FormLabel
            htmlFor="input3"
            sx={{
              color: error ? "#A6040E" : info ? "#4065F6" : success ? "#0FAB0B" : "#C7C8CD",
            }}>
            {message}
          </FormLabel>
        </Box>
      </Box>
    </Box>
  );
}
