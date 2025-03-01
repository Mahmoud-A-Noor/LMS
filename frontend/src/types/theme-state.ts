
export type Theme = "light" | "dark" | "system";

export interface ThemeState {
    theme: Theme;
    mounted: boolean;
    setTheme: (theme: Theme) => void;
    toggleTheme: () => void;
    hydrateTheme: () => void; // Used to initialize the theme
  }