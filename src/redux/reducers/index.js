import { combineReducers } from 'redux';
// Importa aquí todos los reducers que necesites
import userReducer from './userReducer';

const rootReducer = combineReducers({
  user: userReducer,
  // Agrega más reducers aquí si es necesario
});

export default rootReducer;
