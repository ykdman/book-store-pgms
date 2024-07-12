export type ThemeName = "light" | "dark";
export type ColorKey =
  | "primary"
  | "background"
  | "secondary"
  | "third"
  | "border"
  | "text";
export type HeadingSize = "small" | "medium" | "large";
export type ButtonSize = "small" | "medium" | "large";

export type ButtonScheme = "primary" | "normal";

export type LayoutWidth = "large" | "medium" | "small";

interface Theme {
  name: ThemeName;
  color: Record<ColorKey, string>;
  heading: {
    [key in HeadingSize]: {
      fontSize: string;
    };
  };
  button: {
    [key in ButtonSize]: {
      fontSize: string;
      padding: string;
    };
  };
  buttonScheme: {
    [key in ButtonScheme]: {
      color: string;
      backgroundColor: string;
    };
  };
  borderRadius: {
    default: string;
  };
  layout: {
    width: {
      [key in LayoutWidth]: string;
    };
  };
}

export const lightTheme: Theme = {
  name: "light",
  color: {
    primary: "#ff5800",
    background: "lightgrey",
    secondary: "#5f5f5f",
    third: "green",
    border: "grey",
    text: "black",
  },
  heading: {
    large: {
      fontSize: "2rem",
    },
    medium: {
      fontSize: "1.5rem",
    },
    small: {
      fontSize: "1rem",
    },
  },
  button: {
    large: {
      fontSize: "1.5rem",
      padding: "1rem 2rem",
    },
    medium: {
      fontSize: "1rem",
      padding: "0.5rem 1rem",
    },
    small: {
      fontSize: "0.75rem",
      padding: "0.25rem 0.5rem",
    },
  },
  buttonScheme: {
    primary: {
      color: "white",
      backgroundColor: "midnightblue",
    },
    normal: {
      color: "black",
      backgroundColor: "lightgray",
    },
  },
  borderRadius: {
    default: "4px",
  },
  layout: {
    width: {
      large: "1020px",
      medium: "760px",
      small: "320px",
    },
  },
};

export const darkTheme: Theme = {
  ...lightTheme,
  name: "dark",
  color: {
    primary: "coral",
    background: "midnightblue",
    secondary: "darkblue",
    third: "darkgreen",
    border: "grey",
    text: "black",
  },
};

export const getTheme = (themeName: ThemeName) => {
  switch (themeName) {
    case "light":
      return lightTheme;
    case "dark":
      return darkTheme;
  }
};
