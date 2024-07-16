import { GuessResponse, getClueResponse } from '@/types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseURl = process.env.baseURL as string;

export const ReduxApi = createApi({
    reducerPath: 'ReduxApi',
    tagTypes: ['getClue', 'guess'],
    baseQuery: fetchBaseQuery({
        baseUrl: baseURl,
    }),
    endpoints: (build) => ({
        getClue: build.query<getClueResponse, string>({
            query: (tokenID) => ({
                url: `/api/get-clue?tokenID=${tokenID}`,
                method: 'GET',
            }),
            transformResponse: (res: getClueResponse) => res,
            providesTags: ['getClue'],
        }),
        guess: build.mutation<GuessResponse, { tokenID: string, boxID: string, guess: string }>({
            query: (finalData) => ({
                url: `/api/guess`,
                method: 'POST',
                body: JSON.stringify(finalData),
            }),
            transformResponse: (res: GuessResponse) => res,
            invalidatesTags: ['getClue']
        }),
        giveUp: build.mutation<GuessResponse, { tokenID: string }>({
            query: (finalData) => ({
                url: `/api/give-up`,
                method: 'POST',
                body: JSON.stringify(finalData),
            }),
            transformResponse: (res: GuessResponse) => res,
            invalidatesTags: ['getClue']
        })
    }),
});

export const { useGetClueQuery, useGuessMutation, useGiveUpMutation } = ReduxApi;