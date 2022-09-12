import ColourModeProvider, { ColourModeContext } from "../src/theme/ThemeProvider";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}
export const decorators = [
  (Story) => {
    const ColorModeToggleButton = () => {
      return (
        <ColourModeContext.Consumer>
          {(context) => (
            <button onClick={context.cycleToggleMode}>
              Mode: {context.colorMode}
            </button>
          )}
        </ColourModeContext.Consumer>
      );
    };
    return (
      <ColourModeProvider>
        <ColorModeToggleButton />
        <Story />
      </ColourModeProvider>
    );
  }



]