'use client'
import { setRulesOpen } from '@/lib/GameSlice'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useDispatch } from 'react-redux'

export default function Navbar() {
    const dispatch = useDispatch()
    return (
        <div className="navbar border-b bg-[#072251]">
            <div className="flex-1">
                <Link href="/">
                    <Image src={"/assets/Capture.PNG"} alt='' width={200} height={200} />
                </Link>
            </div>
            <div className="flex-none gap-2">
                <button className="btn tracking-widest">
                    Login
                </button>
                <button onClick={() => dispatch(setRulesOpen(true))} className="btn tracking-widest">
                    Rules
                </button>
            </div>
        </div>
    )
}
