import { NextRequest, NextResponse } from "next/server";
import Clue from "@/Models/Clue";
import Game from "@/Models/Game";
import connectDB from "@/DB";
import { v4 as uuidv4 } from 'uuid';
import { findMoviesByClues } from "@/helper/Algorithm";
import { movieData } from "@/data/moviesData";

export async function POST(req: NextRequest) {
    await connectDB()

    try {
        const today = new Date(Date.UTC(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()));
        const todayISOString = today.toISOString();

        let gameID = "";

        const data = await req.json();

        const { tokenID } = data;

        if (!tokenID) return NextResponse.json({ success: false, message: "retry" })

        const findTodayClues = await Clue.findOne({ date: todayISOString }).select('-_id -__v -date -createdAt -updatedAt');

        if (!findTodayClues) return NextResponse.json({ success: false, message: "Please wait, Till Game Reset " })

        const gameExists = await Game.findOne({ tokenID, date: todayISOString }).select('-_id -__v -createdAt -updatedAt');


        if (gameExists) {
            gameID = gameExists?.gameID;

        } else {
            gameID = uuidv4();
        }

        const movie = findMoviesByClues(findTodayClues, movieData);


        const findGame = await Game.findOne({ tokenID, gameID, date: todayISOString });

        if (findGame) {
            if (findGame?.remainingGuesses === 0) return NextResponse.json({ success: false, message: "Please wait, Till Game Reset " })

            for (const boxID in movie) {
                const image = movie[boxID];
                findGame.guesses.push({ boxID, guess: 'Anonymous', image, correct: true, percentage: "100%" });
            }
            findGame.remainingGuesses = 0;
            await findGame.save();
        } else {

            const newGame = new Game({
                tokenID,
                gameID,
                remainingGuesses: 0
            });

            for (const boxID in movie) {
                const image = movie[boxID];
                newGame.guesses.push({ boxID, image, guess: 'Anonymous', correct: true, percentage: "100%" });
            }

            await newGame.save();
        }

        return NextResponse.json({ success: true, data: movie, message: "Game Resetted" })

    } catch (error: any) {

        console.log("error in giving up server", error.message)

        return NextResponse.json({ success: false, message: "Something went wrong" });
    }
}
