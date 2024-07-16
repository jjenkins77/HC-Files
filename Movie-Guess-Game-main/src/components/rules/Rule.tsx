'use client'
import { setRulesOpen } from '@/lib/GameSlice';
import { RootState } from '@/store/store';
import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';

export default function Rule() {
    const dispatch = useDispatch()
    const isRuleOpen = useSelector((state: RootState) => state.Game.rulesOpen)
    const useOutsideClick = (callback: () => void) => {
        const ref = useRef<HTMLDivElement | null>(null);

        useEffect(() => {
            const handleClick = (event: MouseEvent) => {
                if (ref.current && !ref.current.contains(event.target as Node)) {
                    callback();
                }
            };

            document.addEventListener('click', handleClick, true);

            return () => {
                document.removeEventListener('click', handleClick, true);
            };
        }, [callback]);

        return ref;
    };


    const ref = useOutsideClick(() => dispatch(setRulesOpen(false)));

    return (
        <div className={`${isRuleOpen ? "fixed inset-0 px-2 bg-black/75 z-[999999999999999999] flex items-center justify-center" : "hidden"}`}>
            <div ref={ref} className={`h-max lg:w-max bg-red-100 p-4 rounded-lg shadow-lg`}>
                <h2 className='text-2xl font-bold mb-4'>How to Play Hollywood Conundrum</h2>
                <ul className='list-disc list-inside space-y-2'>
                    <li>Select a movie for each cell using the clues that correspond to that cells rows and columns.</li>
                    <li>Movies in the drop down are ordered by popularity and they must be exact, down to the punctuation.</li>
                    <li>Each game, you have nine movie guesses to fill out the grid.</li>
                    <li>Each movie, whether correct or incorrect, will count as one of your nine guesses.</li>
                    <li>If a movie poster pops up, congratulations -- you got it right you little cinephile.</li>
                    <li>If you need a refresher on who someone is, click on their name for a headshot.</li>
                    <li>A movie cannot be used twice.</li>
                    <li>If a clue is just a name, movies that actor directed will not count.</li>
                </ul>
            </div>
        </div>
    )
}
