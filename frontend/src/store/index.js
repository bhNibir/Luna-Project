import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

// import reducers
import { user } from './user';

// combine reducers and create store
const combinedReducers = combineReducers({ user });
const store = createStore(combinedReducers, applyMiddleware(thunk));

// export store
export default store;
