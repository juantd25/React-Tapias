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
  FormLabel,
  Radio,
  FormControlLabel,
  RadioProps,
  FormControlLabelProps,
  Checkbox,
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Icon from "public/icons/Icon";
import IconError from "public/icons/IconError";
import IconInformation from "public/icons/IconInformation";
import IconSuccess from "public/icons/IconSuccess";
import IconBuscar from "public/icons/IconBuscar";
import IconQuestion from "public/icons/IconQuestion";
import Radiobutton from "public/icons/Radiobutton";
import TerperTextField from "components/common/TerpelTextField";
import RadioGroup, {useRadioGroup} from "@material-ui/core/RadioGroup";
import Link from "src/Link";
import {useState} from "react";

interface StyledFormControlLabelProps extends FormControlLabelProps {
  checked: boolean;
}
const StyledFormControlLabel = styled((props: StyledFormControlLabelProps & {small?: boolean}) => (
  <FormControlLabel {...props} />
))(({theme, checked, small}) => ({
  color: "#555869",

  ".MuiFormControlLabel-label": checked
    ? {
        color: "#282B39",
        fontSize: small ? 14 : 16,
      }
    : {fontSize: small ? 14 : 16},
}));
function TerpelControlLabel(props: FormControlLabelProps & {small?: boolean}) {
  const radioGroup = useRadioGroup();

  let checked = false;

  if (radioGroup) {
    checked = radioGroup.value === props.value;
  }

  return <StyledFormControlLabel checked={checked} {...props} />;
}

const Buttons = () => (
  <Container>
    <Box sx={{flex: 1}}>
      <Grid container spacing={1}>
        <Grid item xs={4}>
          <Button variant="secundary" component={Link} noLinkStyle href="/about">
            Ir about
          </Button>
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

const Fabs = () => (
  <Box>
    <Fab variant="primary" size="small">
      <Icon />
    </Fab>
    <Fab variant="primary" size="medium">
      <Icon />
    </Fab>
    <Fab variant="primary" size="large">
      <Icon />
    </Fab>
  </Box>
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
  const [value, setValue] = useState("");

  const handleChange = (event: any) => {
    event.preventDefault();
    setValue(event.target.value);
    console.log(value);
  };

  return (
    <Container>
      <TerperTextField
        focused
        error={true}
        label="Label Top"
        placeholder="Label"
        message="Mensaje de error con la solución explicita para el usuario"
        id="input1"
      />
      <TerperTextField
        focused
        info
        label="Label Top"
        placeholder="Label"
        message="Mensaje de error con la solución explicita para el usuario"
        id="input2"
      />
      <TerperTextField
        focused
        success
        label="Label Top"
        placeholder="Label"
        message="Mensaje de error con la solución explicita para el usuario"
        id="input3"
      />
      <TerperTextField
        disabled
        variant="filled"
        focused
        label="Label Top"
        placeholder="Label"
        defaultValue="1036661586"
        id="input4"
      />
      <TerperTextField variant="filled" label="Label Top" placeholder="Label" id="input5" />
      <TerperTextField variant="filled" label="Label Top" placeholder="Label" defaultValue="Label" id="input6" />
      <TerperTextField
        variant="filled"
        label="Label Top"
        placeholder="Label"
        // iconleft={<IconUsuario />}
        iconright={<IconQuestion color="disabled" />}
        id="input7"
      />
      <TerperTextField
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
      <TerperTextField
        size="small"
        variant="filled"
        label="Label Top"
        placeholder="Label"
        iconleft={<Typography variant="h5">CC</Typography>}
        value={value}
        onChange={handleChange}
        onFocus={handleChange}
        onBlur={handleChange}
      />
      <TerperTextField
        variant="filled"
        label="Label Top"
        placeholder="Label"
        iconright={<TerpelRadioButton />}
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

const RadioButtons = () => (
  <RadioGroup name="use-radio-group" defaultValue="first">
    <TerpelControlLabel value="second" label="Second" control={<TerpelRadioButton size="medium" disabled />} />
    <TerpelControlLabel value="Tres" label="Tres" control={<TerpelRadioButton size="medium" />} />
    <TerpelControlLabel value="Cuatro" label="Cuatro" control={<TerpelRadioButton size="small" />} small />
    <TerpelControlLabel value="first" label="First" control={<TerpelRadioButton size="small" />} small />
  </RadioGroup>
);

const TerpelRadioButton = (props: RadioProps) => {
  return (
    <Radio
      {...props}
      sx={{
        width: props.size === "small" ? 18 : 24,
        height: props.size === "small" ? 18 : 24,
        margin: !props.size ? undefined : "0px 12px",
        backgroundColor: "#FFFFFF",
        "&:hover": {
          color: "#15ADCE",
        },
      }}
      checkedIcon={
        <Radiobutton
          sx={{width: props.size === "small" ? 18 : 24, height: props.size === "small" ? 18 : 24}}
          color={props.disabled ? "disabled" : "primary"}
        />
      }
    />
  );
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

export const TerperInput = (props: Props) => {
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
};

export default function Index() {
  return (
    <Container>
      <Buttons />
      <Fabs />
      <Inputs />
      <Typographys />
      <RadioButtons />

      <Checkbox
        disabled
        sx={{
          width: 24,
          height: 24,
        }}
      />

      <Checkbox
        sx={{
          width: 24,
          height: 24,
        }}
      />
    </Container>
  );
}
