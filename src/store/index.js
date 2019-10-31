import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import reducers from '../reducers'
import thunkMiddleware from 'redux-thunk'
import AsyncStorage from '@react-native-community/async-storage';

// import { createLogger } from 'redux-logger'

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel2,
  whitelist: ['auth', 'user', 'tree']
}

// Store
const configureStore = (reducers) => {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const enhancer = composeEnhancers(
    applyMiddleware(
      thunkMiddleware
    ),
  );
  return createStore(reducers, enhancer);
};

const persistedReducer = persistReducer(persistConfig, reducers)
const store = configureStore(persistedReducer)
let persistor = persistStore(store)

const dispatchAction = (action) => {
  store.dispatch(action)
}

const getStore = () => {
  return store
}

const getState = () => {
  return store.getState()
}

export { getStore, getState, dispatchAction, persistor };
