import React, { useReducer } from "react";
import toolboxContext from "./toolbox-context";
import { COLORS, TOOLBOX_ACTIONS, TOOL_ITEMS } from "../constants";

function toolboxReducer(state, action) {
  switch (action.type) {
    case TOOLBOX_ACTIONS.CHANGE_STROKE: {
      const newState = { ...state };
      newState[action.payload.tool].stroke = action.payload.stroke;
      return newState;
    }
    case TOOLBOX_ACTIONS.CHANGE_FILL: {
      const newState = { ...state };
      newState[action.payload.tool].fill = action.payload.fill;
      return newState;
    }
    case TOOLBOX_ACTIONS.CHANGE_SIZE: {
      const newState = { ...state };
      newState[action.payload.tool].size = action.payload.size;
      return newState;
    }
    case "MENU": {
      const newState = { ...state };
      newState.isMenu= newState.isMenu===true?false:true;
      return newState;
    }
    default:
      return state;
  }
}

const initialToolboxState = {
  [TOOL_ITEMS.BRUSH]: {
    stroke: COLORS.BLACK,
  },
  [TOOL_ITEMS.LINE]: {
    stroke: COLORS.BLACK,
    size: 1,
  },
  [TOOL_ITEMS.RECTANGLE]: {
    stroke: COLORS.BLACK,
    fill: null,
    size: 1,
  },
  [TOOL_ITEMS.CIRCLE]: {
    stroke: COLORS.BLACK,
    fill: null,
    size: 1,
  },
  [TOOL_ITEMS.ARROW]: {
    stroke: COLORS.BLACK,
    size: 1,
  },
  [TOOL_ITEMS.TEXT]: {
    stroke: COLORS.BLACK,
    size: 32,
  },
  isMenu : true,
};

const ToolboxProvider = ({ children }) => {
  const [toolboxState, dispatchToolboxAction] = useReducer(
    toolboxReducer,
    initialToolboxState
  );

  const changeStrokeHandler = (tool, stroke) => {
    dispatchToolboxAction({
      type: TOOLBOX_ACTIONS.CHANGE_STROKE,
      payload: {
        tool,
        stroke,
      },
    });
  };

  const changeFillHandler = (tool, fill) => {
    dispatchToolboxAction({
      type: TOOLBOX_ACTIONS.CHANGE_FILL,
      payload: {
        tool,
        fill,
      },
    });
  };

  const changeSizeHandler = (tool, size) => {
    dispatchToolboxAction({
      type: TOOLBOX_ACTIONS.CHANGE_SIZE,
      payload: {
        tool,
        size,
      },
    });
  };

  const handleMenu = () => {
    dispatchToolboxAction({
      type: "MENU",
    });
  }

  const toolboxContextValue = {
    toolboxState,
    changeStroke: changeStrokeHandler,
    changeFill: changeFillHandler,
    changeSize: changeSizeHandler,
    handleMenu : handleMenu,
  };

  return (
    <toolboxContext.Provider value={toolboxContextValue}>
      {children}
    </toolboxContext.Provider>
  );
};

export default ToolboxProvider;