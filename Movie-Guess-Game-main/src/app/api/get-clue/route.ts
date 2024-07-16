import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/DB";
import { v4 as uuidv4 } from 'uuid';
import Clue from "@/Models/Clue";
import Game from "@/Models/Game";

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
    await connectDB()
    try {

        const today = new Date(Date.UTC(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()));
        const todayISOString = today.toISOString();

        const { searchParams } = new URL(req.url);

        const tokenID = searchParams.get('tokenID');

        if (!tokenID || tokenID === '') {
            const newToken = uuidv4();
            const findTodayClues = await Clue.findOne({ date: todayISOString }).select('-_id -__v -date -createdAt -updatedAt');
            if (!findTodayClues) {
                const latestClue = await Clue.findOne().sort({ _id: -1 }).limit(1).select('-_id -__v -date -createdAt -updatedAt');
                return NextResponse.json({ success: true, clue: latestClue, newToken })
            }
            return NextResponse.json({ success: true, clue: findTodayClues, newToken })

        } else {

            const findGameRecord = await Game.findOne({ tokenID, date: todayISOString });


            const findTodayClues = await Clue.findOne({ date: today }).select('-_id -__v -date -createdAt -updatedAt');

            if (!findTodayClues) {

                const latestClue = await Clue.findOne().sort({ _id: -1 }).limit(1).select('-_id -__v -date -createdAt -updatedAt');

                return NextResponse.json({ success: true, clue: latestClue, newToken: tokenID, game: findGameRecord })

            }

            return NextResponse.json({ success: true, clue: findTodayClues, newToken: tokenID, game: findGameRecord })

        }


    } catch (error: any) {

        console.log('error in getting clue Server', error.message)

        return NextResponse.json({ success: false, message: "Something went wrong" });

    }
}
