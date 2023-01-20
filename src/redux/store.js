import { configureStore,combineReducers } from "@reduxjs/toolkit";
import cartReducer from './cartRedux';
import userReducer from './userRedux';
import listReducer from './listRedux';
import orderReducer from './orderRedux';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist'
  import storage from 'redux-persist/lib/storage'
  const persistConfig = {
    key: 'root',
    version: 1,
    storage,
  }
  const rootReducer=combineReducers({user:userReducer,cart:cartReducer,list:listReducer,order:orderReducer});

  const persistedReducer = persistReducer(persistConfig, rootReducer)
  //combined both to persist

export const store= configureStore({    //this should be = not =()=>
    reducer:persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor=persistStore(store);

//store get all the reducer and export to persist the states