'use client'
import Loading from '@/app/loading';
import { setSearchBar, setboxID } from '@/lib/GameSlice';
import { useGetClueQuery } from '@/lib/ReduxApi';
import { Clue } from '@/types';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';


interface Props {
    gridName: string;
}

export default function GridBox({ gridName }: Props) {
    const dispatch = useDispatch()

    const [token, setToken] = useState('')

    useEffect(() => {
        setToken(localStorage.getItem('token') ?? '')
    }, [])

    const { data: CluesData, isLoading: clueLoading, isError: clueError } = useGetClueQuery(token)



    const aoClass = 'bg-transparent border-none text-[#072251]'
    const guessClasses = 'border relative flex items-center justify-center'
    const colClueClasses = 'bg-transparent  border-none flex items-center justify-end text-white text-xl '
    const rowClueClasses = 'bg-transparent border-none flex items-end justify-center text-white text-xl '


    const isA0Class = gridName === 'a0' && aoClass;
    const isColCLue = ['a4', 'a8', 'a12'].includes(gridName) && colClueClasses;
    const isRowCLue = ['a1', 'a2', 'a3'].includes(gridName) && rowClueClasses;
    const isGuessClass = ['a5', 'a6', 'a7', 'a9', 'a10', 'a11', 'a13', 'a14', 'a15'].includes(gridName) && guessClasses;

    const openSearch = () => {
        dispatch(setSearchBar(true))
        dispatch(setboxID(gridName))
    }


    return (
        <div className={`${isA0Class} ${isColCLue} ${isRowCLue} ${isGuessClass} `}>
            {
                clueLoading && <Loading />
            }
            {
                CluesData?.clue[gridName as keyof Clue] ? <p className='text-sm font-light px-1'>{CluesData?.clue[gridName as keyof Clue]}</p> :
                    CluesData?.game?.guesses.find(guess => guess.boxID === gridName)?.image ? <Image src={CluesData?.game.guesses.find(guess => guess.boxID === gridName)?.image as string} alt='Correctly Guessed' fill /> :
                        <button onClick={openSearch} className='w-full h-full' />
            }
        </div>
    )
}
