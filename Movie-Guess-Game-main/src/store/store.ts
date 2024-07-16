
import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { ReduxApi } from '@/lib/ReduxApi'
import GameSliceReducer from '@/lib/GameSlice';


export const store = configureStore({
    reducer: {
        Game: GameSliceReducer,
        [ReduxApi?.reducerPath]: ReduxApi?.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(ReduxApi?.middleware),
})

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch