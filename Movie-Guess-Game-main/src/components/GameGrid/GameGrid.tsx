'use client'
import React, { useEffect, useState } from 'react'
import { GridBox } from '..';
import { useGetClueQuery } from '@/lib/ReduxApi';
import { toast } from 'sonner';
import Loading from '@/app/loading';
import { Clue } from '@/types';


const grid = [
    'a0', 'a1', 'a2', 'a3',
    'a4', 'a5', 'a6', 'a7',
    'a8', 'a9', 'a10', 'a11',
    'a12', 'a13', 'a14', 'a15',
];

export interface CluesValuesType {
    [key: string]: string;
}




export default function GameGrid() {

    return (
        <div className='grid grid-cols-4 relative z-10  rounded-xl grid-rows-4 w-full h-full'>
            {
                grid?.map((gridName, index) => (
                    <GridBox key={index} gridName={gridName} />
                ))
            }
        </div>
    )

}
