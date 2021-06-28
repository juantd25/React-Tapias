import {createTheme} from "@material-ui/core/styles";

const colors = {
  primaryLight80: "#FDCECC",
  primaryLight40: "#F27066",
  primary00: "#DF1A09",
  primaryDark40: "#BF0000",
  primaryDark80: "#A6040E",
  neutralBg: "#F1F6FB",
  neutral00: "#FFFFFF",
  neutral05: "#FCFDFE",
  neutral10: "#F4F5F5",
  neutral40: "#E3E6E6",
  neutral50: "#C7C8CD",
  neutral60: "#888A97",
  neutral80: "#555869",
  neutral90: "#282B39",
  neutral100: "#141A38",
  blueLight80: "#CDF6FF",
  blueLight40: "#81E6FC",
  blue00: "#24CBF0",
  blueDark40: "#15ADCE",
  blueDark80: "#0A8CA6",

  alert: "#FFB900",
  alertBg: "#FFFEE6",
  informationBg: "#E6F0FD",
  information: "#4065F6",
  successBg: "#CEEDD7",
  success: "#04BB00",
  error: "#F23E48",
  errorBg: "#FEF0F0",
  errorTextBg: "#870000",

  yellowLight80: "#FFFEE6",
  yellowLight40: "#FFF673",
  yellow00: "#FFE500",
  yellowDark80: "#FFB900",
};
// Create a theme instance.
const theme = createTheme({
  palette: {
    action: {
      disabledBackground: colors.neutral50,
      disabled: colors.neutral60,
      active: colors.primary00,
    },
    primary: {
      contrastText: colors.neutral00,
      main: colors.blueDark40,
      dark: colors.blueDark80,
      light: colors.blueLight80,
    },
    error: {
      main: colors.primaryDark80,
      light: colors.errorBg,
    },
    info: {
      main: colors.information,
      light: colors.informationBg,
    },
    success: {
      main: colors.success,
      light: colors.successBg,
    },
  },
  typography: {
    h6: undefined,
    fontFamily: "Nunito",
    fontWeightRegular: 400,
    fontWeightBold: 700,
    fontWeightMedium: 600,
    fontWeightLight: 200,
  },
  components: {
    // Name of the component

    MuiInputBase: {
      styleOverrides: {
        sizeSmall: {
          width: 320,
          height: 48,
        },
        root: {
          paddingLeft: 2,
          width: 320,
          height: 56,
        },
      },
    },

    // MuiTextField: {
    //   styleOverrides: {
    //     root: {},
    //   },
    // },

    MuiFormLabel: {
      styleOverrides: {
        root: {
          fontSize: 14,
          fontWeight: 400,
          fontStyle: "normal",
        },
      },
    },

    MuiInputLabel: {
      styleOverrides: {
        filled: {
          paddingLeft: 4,
          fontSize: 16,
        },
      },
    },

    MuiTypography: {
      styleOverrides: {
        h1: {
          fontSize: 36,
          fontWeight: 800,
          fontStyle: "normal",
        },
        h2: {
          fontSize: 30,
          fontWeight: 700,
          fontStyle: "normal",
        },
        h3: {
          fontSize: 24,
          fontWeight: 400,
          fontStyle: "normal",
        },
        h4: {
          fontSize: 20,
          fontWeight: 600,
          fontStyle: "normal",
        },
        h5: {
          fontSize: 20,
          fontWeight: 600,
          fontStyle: "normal",
        },
        body1: {
          fontSize: 16,
          fontWeight: 500,
          fontStyle: "normal",
        },
        h6: undefined,
      },
    },
    MuiFab: {
      styleOverrides: {
        sizeSmall: {
          width: 38,
          height: 38,
        },
        sizeMedium: {
          width: 48,
          height: 48,
        },

        root: {
          borderRadius: 12,
          boxShadow: "none",
          width: 56,
          height: 56,
        },
      },
      variants: [
        {
          props: {variant: "primary"},
          style: {
            color: colors.neutral00,
            backgroundColor: colors.primary00,
            "&:hover": {
              backgroundColor: colors.primaryDark40,
            },
            "&:disabled": {
              color: colors.neutral80,
              backgroundColor: colors.neutral50,
            },
          },
        },
        {
          props: {variant: "ghost"},
          style: {
            color: colors.primaryDark40,
            backgroundColor: "transparent",
            border: "1px solid " + colors.primaryDark40,
            "&:disabled": {
              borderColor: colors.neutral60,
              color: colors.neutral60,
              backgroundColor: "transparent",
            },
          },
        },
        {
          props: {variant: "secundary"},
          style: {
            border: "1px solid " + colors.primaryDark40,
            borderColor: colors.primaryDark40,
            color: colors.primaryDark40,
            backgroundColor: colors.neutral00,
            "&:hover": {
              backgroundColor: colors.neutral00,
            },
            "&:disabled": {
              borderColor: colors.neutral60,
              backgroundColor: colors.neutral05,
            },
          },
        },
        {
          props: {variant: "plain"},
          style: {
            color: colors.primaryDark40,
            backgroundColor: colors.neutral00,
            "&:hover": {
              backgroundColor: colors.neutral00,
            },
          },
        },
        {
          props: {variant: "tertiary"},
          style: {
            fontWeight: 600,
            color: colors.neutral100,
            backgroundColor: colors.yellowDark80,
            "&:hover": {
              backgroundColor: colors.yellowDark80,
            },
          },
        },
      ],
    },
    MuiButton: {
      styleOverrides: {
        // Name of the slot
        sizeSmall: {
          height: 38,
        },
        sizeMedium: {
          height: 48,
        },
        sizeLarge: {
          height: 56,
        },

        root: {
          // Some CSS
          width: "100%",
          textAlign: "justify",
          fontsize: 16,
          fontWeight: 400,
          borderRadius: 12,
          textTransform: "none",
        },
      },
      variants: [
        {
          props: {variant: "primary"},
          style: {
            color: colors.neutral00,
            backgroundColor: colors.primary00,
            "&:hover": {
              backgroundColor: colors.primaryDark40,
            },
            "&:disabled": {
              color: colors.neutral80,
              backgroundColor: colors.neutral50,
            },
          },
        },
        {
          props: {variant: "ghost"},
          style: {
            color: colors.primaryDark40,
            backgroundColor: "transparent",
            border: "1px solid " + colors.primaryDark40,
            "&:disabled": {
              border: "1px solid " + colors.neutral60,
              color: colors.neutral60,
              backgroundColor: "transparent",
            },
          },
        },
        {
          props: {variant: "secundary"},
          style: {
            border: "1px solid " + colors.primaryDark40,
            borderColor: colors.primaryDark40,
            color: colors.primaryDark40,
            backgroundColor: colors.neutral00,
            "&:hover": {
              backgroundColor: colors.neutral00,
            },
            "&:disabled": {
              borderColor: colors.neutral60,
              backgroundColor: colors.neutral05,
            },
          },
        },
        {
          props: {variant: "plain"},
          style: {
            color: colors.primaryDark40,
            backgroundColor: colors.neutral00,
            "&:hover": {
              backgroundColor: colors.neutral00,
            },
          },
        },
        {
          props: {variant: "tertiary"},
          style: {
            fontWeight: 600,
            color: colors.neutral100,
            backgroundColor: colors.yellowDark80,
            "&:hover": {
              backgroundColor: colors.yellowDark80,
            },
          },
        },
      ],
    },
  },
});

declare module "@material-ui/core/Button" {
  interface ButtonPropsVariantOverrides {
    primary: true;
    ghost: true;
    secundary: true;
    plain: true;
    tertiary: true;
    contained: false;
    outlined: false;
  }
}

declare module "@material-ui/core/Fab" {
  interface FabPropsVariantOverrides {
    primary: true;
    ghost: true;
    secundary: true;
    plain: true;
    tertiary: true;
    circular: false;
    extended: false;
  }
}

declare module "@material-ui/core/Typography" {
  interface TypographyPropsVariantOverrides {
    h1: true;
    h6: false;
  }
}

// declare module "@material-ui/core/styles" {
//   interface Palette {
//     neutral: Palette["primary"];
//   }
//   interface PaletteOptions {
//     neutral: PaletteOptions["primary"];
//   }
// }

export default theme;
