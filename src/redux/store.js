import { createStore } from 'redux';
import rootReducer from './reducers'; // Asegúrate de crear los reducers

const store = createStore(rootReducer);

export default store;
