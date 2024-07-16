import React from 'react'

export default function Loading() {
    return (
        <div className='w-full min-h-screen fixed z-[10000] top-0 left-0 flex items-center justify-center flex-col bg-white/95 text-slate-900  font-semibold'>
            <span className="loading loading-dots loading-xl"></span>
            <span className='mt-4 text-sm tracking-wider'>Empowering Your Experience...</span>
        </div>
    )
}