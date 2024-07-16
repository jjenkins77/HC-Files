"use client"

import { store } from '@/store/store'
import React from 'react'
import { Provider } from 'react-redux'
import { ApiProvider } from '@reduxjs/toolkit/dist/query/react'
import { ReduxApi } from '@/lib/ReduxApi'



type ProvidersProps = {
    children: React.ReactNode
}


export function ReduxProvider({ children }: ProvidersProps) {
    return (
        <ApiProvider api={ReduxApi} >
            <Provider store={store}>
                {children}
            </Provider>
        </ApiProvider>
    )
}