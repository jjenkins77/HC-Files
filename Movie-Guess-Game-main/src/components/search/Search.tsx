'use client'
import { setSearchBar } from '@/lib/GameSlice';
import { search_movie_by_name } from '@/services';
import React, { useRef, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import AsyncSelect from 'react-select/async';




type ColourOption = {
    value: string;
    label: string;
};


type SearchProps = {
    guess: (x: string) => void;
};





export default function Search({ guess }: SearchProps) {
    const dispatch = useDispatch()



    const [guessed, setGuessed] = useState<string>("")

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


    const ref = useOutsideClick(() => dispatch(setSearchBar(false)));


    const promiseOptions = (inputValue: string) =>
        new Promise<ColourOption[]>((resolve) => {
            if (inputValue.trim() === '') {
                resolve([]);
            } else {
                setTimeout(async () => {
                    const res = await search_movie_by_name(inputValue);
                    if (res?.success) {
                        resolve(res.data);
                    } else {
                        resolve([]);
                    }
                }, 500);
            }
        });

    const handleOptionSelect = (selectedOption: ColourOption | null) => {
        if (selectedOption) {
            setGuessed(selectedOption.value);
        } else {
            setGuessed("");
        }
    };



    const handleGuess = (value: string) => {
        if (value === 'yes') {
            dispatch(setSearchBar(false))
            guess(guessed);
        } else {
            dispatch(setSearchBar(false))
        }
    }





    return (
        <div ref={ref} className='fixed  z-50 inset-x-0 mx-auto flex items-center justify-center flex-col top-[20%] bg-white p-4 lg:top-20 lg:w-9/12 w-11/12 '>
            <p className='text-xl font-semibold my-2'>Guess a Movie!</p>
            <AsyncSelect onChange={handleOptionSelect} cacheOptions defaultOptions loadOptions={promiseOptions} className='w-full dark:text-black' />
            <div className='w-full flex items-center justify-center'>
                <button onClick={() => handleGuess('yes')} className='btn btn-outline dark:text-black m-2 '>Guess</button>
                <button onClick={() => handleGuess('no')} className='btn btn-neutral m-2 '>cancel</button>
            </div>
        </div>
    );
}