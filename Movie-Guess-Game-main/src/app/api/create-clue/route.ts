import { NextRequest, NextResponse } from "next/server";
import { movieData } from "@/data/moviesData";
import { generateClues, pickRelatedMovies } from "@/helper/Algorithm";
import Clue from "@/Models/Clue";
import connectDB from "@/DB";

export const dynamic = 'force-dynamic'



export async function GET(req: NextRequest) {
    await connectDB()
    try {
        const today = new Date(Date.UTC(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()));
        const todayISOString = today.toISOString();
        const findTodayClues = await Clue.findOne({ date: todayISOString });

        if (findTodayClues) {
            return NextResponse.json({ success: false, message: "Today's clue has already been created" });
        }

        const clues = generateClues(pickRelatedMovies(movieData));

        const saveClues = await Clue.create({ ...clues, date: todayISOString });

        return NextResponse.json({ success: true, message: "Clues created successfully" });
    } catch (error: any) {
        return NextResponse.json({ success: false, message: error.message });
    }
}