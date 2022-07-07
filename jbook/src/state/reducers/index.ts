import { combineReducers } from "redux";
import cellsReducer from "./cellsReducer";

const rootReducer = combineReducers({
  cells: cellsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;