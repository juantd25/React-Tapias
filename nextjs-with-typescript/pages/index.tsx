import * as React from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import {
  Button,
  TextField,
  styled,
  Fab,
  TextFieldProps,
  OutlinedInputProps,
  FilledTextFieldProps,
  FormLabel,
  IconButton,
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  Radio,
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Icon from "../public/Icon";
import IconError from "../public/IconError";
import IconInformation from "../public/IconInformation";
import IconSuccess from "../public/IconSuccess";
import IconUsuario from "../public/IconUsuario";
import IconBuscar from "../public/IconBuscar";
import IconQuestion from "../public/IconQuestion";

const Buttons = () => (
  <Container>
    <Box sx={{flex: 1}}>
      <Grid container spacing={1}>
        <Grid item xs={4}>
          <Button variant="primary" size="large" endIcon={<Icon />} disableElevation>
            Label
          </Button>
          <Button disabled variant="primary" size="large" disableElevation>
            Label
          </Button>
          <Button variant="ghost" size="large" disableElevation>
            Label
          </Button>
          <Button disabled variant="ghost" size="large" disableElevation>
            Label
          </Button>
          <Button variant="secundary" size="large" disableElevation>
            Label
          </Button>
          <Button disabled variant="secundary" size="large" endIcon={<Icon />} disableElevation>
            Label
          </Button>
          <Button variant="plain" size="large" disableElevation>
            Label
          </Button>
          <Button variant="tertiary" size="large" disableElevation>
            Label
          </Button>
        </Grid>
        <Grid item xs={4}>
          <Button variant="primary" size="medium" startIcon={<Icon />} disableElevation>
            Label
          </Button>
          <Button disabled variant="primary" size="medium" disableElevation>
            Label
          </Button>
          <Button variant="ghost" size="medium" startIcon={<Icon />} disableElevation>
            Label
          </Button>
          <Button disabled variant="ghost" size="medium" disableElevation>
            Label
          </Button>
          <Button variant="secundary" size="medium" disableElevation>
            Label
          </Button>
          <Button disabled variant="secundary" size="medium" endIcon={<Icon />} disableElevation>
            Label
          </Button>
          <Button variant="plain" size="medium" disableElevation>
            Label
          </Button>
          <Button variant="tertiary" size="medium" disableElevation>
            Label
          </Button>
        </Grid>
        <Grid item xs={4}>
          <Button variant="primary" size="small" disableElevation>
            Label
          </Button>
          <Button disabled variant="primary" size="small" disableElevation>
            Label
          </Button>
          <Button variant="ghost" size="small" disableElevation>
            Label
          </Button>
          <Button disabled variant="ghost" size="small" disableElevation>
            Label
          </Button>
          <Button variant="secundary" size="small" endIcon={<Icon />} disableElevation>
            Label
          </Button>
          <Button disabled variant="secundary" size="small" disableElevation>
            Label
          </Button>
          <Button variant="plain" size="small" disableElevation>
            Label
          </Button>

          <Button variant="tertiary" size="small" endIcon={<Icon />} disableElevation>
            Label
          </Button>
          <Button variant="tertiary" size="small" startIcon={<Icon />} disableElevation>
            Label
          </Button>
        </Grid>
      </Grid>
    </Box>
  </Container>
);

const Typographys = () => (
  <Container>
    <Typography variant="h1">Texto</Typography>
    <Typography variant="h2">Texto</Typography>
    <Typography variant="h3">Texto</Typography>
    <Typography variant="h4">Texto</Typography>
    <Typography variant="h5">Texto</Typography>
    <Typography variant="body1">TextoTextoTextoTexto</Typography>
  </Container>
);

const Inputs = () => {
  const [value, setValue] = React.useState("");

  const handleChange = event => {
    event.preventDefault();
    setValue(event.target.value);
    console.log(value);
  };

  return (
    <Container>
      <TerpelMessageField
        focused
        error={true}
        label="Label Top"
        placeholder="Label"
        message="Mensaje de error con la solución explicita para el usuario"
        id="input1"
      />
      <TerpelMessageField
        focused
        info
        label="Label Top"
        placeholder="Label"
        message="Mensaje de error con la solución explicita para el usuario"
        id="input2"
      />
      <TerpelMessageField
        focused
        success
        label="Label Top"
        placeholder="Label"
        message="Mensaje de error con la solución explicita para el usuario"
        id="input3"
      />
      <TerpelMessageField
        disabled
        variant="filled"
        focused
        label="Label Top"
        placeholder="Label"
        defaultValue="1036661586"
        id="input4"
      />
      <TerpelMessageField variant="filled" label="Label Top" placeholder="Label" id="input5" />
      <TerpelMessageField variant="filled" label="Label Top" placeholder="Label" defaultValue="Label" id="input6" />
      <TerpelMessageField
        variant="filled"
        label="Label Top"
        placeholder="Label"
        // iconleft={<IconUsuario />}
        iconright={<IconQuestion color="action" />}
        id="input7"
      />
      <TerpelMessageField
        size="small"
        variant="filled"
        label="Label Top"
        placeholder="Label"
        iconleft={<IconBuscar color="action" />}
        value={value}
        onChange={handleChange}
        onFocus={handleChange}
        onBlur={handleChange}
      />

      <TerpelMessageField
        size="small"
        variant="filled"
        label="Label Top"
        placeholder="Label"
        iconright={<IconError />}
        value={value}
        onChange={handleChange}
        onFocus={handleChange}
        onBlur={handleChange}
      />
    </Container>
  );
};

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

const TerpelMessageField = (props: Props) => {
  const {info, success, error, message} = props;

  return (
    <Box sx={{display: "flex", flexDirection: "column"}}>
      <TerpelStyle {...props} variant="filled" />
      <Box sx={{display: "flex", flexDirection: "row", alignItems: "flex-start", margin: "8px 0px"}}>
        <Box sx={{flex: "none", order: 0, flexGrow: 0, paddingRight: 1}}>
          {!message ? null : error ? <IconError /> : info ? <IconInformation /> : success ? <IconSuccess /> : null}
        </Box>
        <Box>
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
};

export default function Index() {
  return (
    <Container>
      <Buttons />
      <Inputs />
      <Typographys />
    </Container>
  );
}
