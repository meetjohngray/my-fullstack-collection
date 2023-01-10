import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware  from 'redux-thunk'
import { composeWithDevTools } from '@redux-devtools/extension'
import type { ThunkAction as BaseThunkAction } from 'redux-thunk'
import type { AnyAction } from 'redux'

import reducers from './reducers'

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunkMiddleware))
)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
// <T = void> means that if the Promise<T> returns nothing, then the type is void
export type ThunkAction<T = void> = BaseThunkAction<
// The return type will be a Promise with a type designated by the generic
Promise<T>,
// State that it's attached to...
RootState,
// Extra thunk argument...
void,
// The action that comes from redux, expects it to be an object with a type property
AnyAction
>

export default store