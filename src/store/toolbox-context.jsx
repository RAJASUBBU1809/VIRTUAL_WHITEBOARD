import { createContext } from "react";

const toolboxContext = createContext({
  toolboxState: {},
  changeStroke: () => {},
  changeFill: () => {},
  changeSize: () => {},
  handleMenu : () => {},
});

export default toolboxContext;