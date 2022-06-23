import { combineReducers } from 'redux';
import repositoriesReducer from './repositoriesReducer';

const rootReducer = combineReducers({
  repositoriesReducer
})

export type RootState = ReturnType <typeof rootReducer>;

export default rootReducer;