'use client'
import React, { useEffect, useState } from 'react'
import { GameGrid, Search } from '@/components'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { useGetClueQuery, useGiveUpMutation, useGuessMutation } from '@/lib/ReduxApi'
import { toast } from 'sonner'
import { GuessResponse } from '@/types'
import Rule from '../rules/Rule'

export default function MainWidget() {
    const searchBar = useSelector((state: RootState) => state.Game.searchbar)
    const isRuleOpen = useSelector((state: RootState) => state.Game.rulesOpen)
    const BoxID = useSelector((state: RootState) => state.Game.boxID)
    const [updateGuess, { isLoading: guessLoading }] = useGuessMutation();
    const [giveUp, { isLoading: giveUpLoading }] = useGiveUpMutation();
    const [token, setToken] = useState('')

    useEffect(() => {
        setToken(localStorage.getItem('token') ?? '')
    }, [])

    const { data: CluesData, isLoading: clueLoading, isError: clueError } = useGetClueQuery(token)

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            localStorage.setItem('token', CluesData?.newToken ?? '')
        }
    }, [CluesData])


    const Guess = async (guessed: string) => {
        const finalData = { tokenID: token, guess: guessed, boxID: BoxID }
        const res = await updateGuess(finalData);
        if ('data' in res) {
            const response: GuessResponse = res?.data;
            if (response.success) {
                toast.success(response.message);
            } else {
                if (response.message === 'retry') {
                    window.location.reload()
                }
                toast.error(response.message);
            }
        } else if ('error' in res) {
            toast.error("Something went wrong!")
        }
    };

    const GiveUpNow = async () => {
        const finalData = { tokenID: token }
        const res = await giveUp(finalData);
        if ('data' in res) {
            const response: GuessResponse = res?.data;
            if (response.success) {
                toast.success(response.message);
            } else {
                if (response.message === 'retry') {
                    window.location.reload()
                }
                toast.error(response.message);
            }
        } else if ('error' in res) {
            toast.error("Something went wrong!")
        }
    };

    return (
        <div className='lg:w-8/12 lg:h-5/6  w-full h-full py-2 px-4 flex  lg:flex-row flex-col items-center justify-center'>
            {searchBar && <Search guess={(guessed: string) => Guess(guessed)} />}
            {isRuleOpen && <Rule />}
            <div className='lg:w-4/6 w-full h-full relative z-[10]'>
                <GameGrid />
            </div>
            <div className='lg:w-2/6 w-full h-full flex items-center justify-center text-white flex-col gap-4'>
                <h1 className='text-xl tracking-wide'>Remaining Guesses</h1>
                <p>{CluesData?.game?.remainingGuesses !== undefined ? CluesData?.game?.remainingGuesses : 9}</p>
                <button onClick={() => GiveUpNow()} className='btn'>Give Up</button>
            </div>
        </div>
    )
}
