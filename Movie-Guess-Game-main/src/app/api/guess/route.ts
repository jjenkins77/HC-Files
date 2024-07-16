import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/DB";
import { v4 as uuidv4 } from 'uuid';
import Clue from "@/Models/Clue";
import Game from "@/Models/Game";
import { movieData } from "@/data/moviesData";
import { Movie } from "@/helper/Algorithm";


export async function POST(req: NextRequest) {
    await connectDB();

    try {
        const today = new Date(Date.UTC(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()));
        const todayISOString = today.toISOString();

        const data = await req.json();

        const { tokenID, boxID, guess } = data;

        if (tokenID === "" || guess === "" || boxID === "") return NextResponse.json({ success: false, message: "retry" })

        let gameID = ""
        let score = 0;

        const findTodayClues = await Clue.findOne({ date: todayISOString }).select('-_id -__v -date -createdAt -updatedAt');

        if (!findTodayClues) return NextResponse.json({ success: false, message: "Please wait, Till Game Reset " })

        const { a1, a2, a3, a4, a8, a12 } = findTodayClues;

        const gameExists = await Game.findOne({ tokenID, date: todayISOString }).select('-_id -__v -createdAt -updatedAt');

        if (gameExists) {
            gameID = gameExists?.gameID;
            if (gameExists?.remainingGuesses === 0) return NextResponse.json({ success: false, message: "Game Over ! Please try Again tomorrow" })
        } else {
            gameID = uuidv4();
        }




        if (boxID === "a5") {
            const checkIFExists = await Game.findOne({ tokenID, gameID, "guesses.boxID": "a5" });
            if (checkIFExists) return NextResponse.json({ success: false, message: "Already Guessed" })


            const findMovieByTitle = await movieData.find((movie) => movie.Title.toLowerCase() === guess?.toLowerCase());

            if (findMovieByTitle) {
                const checkClue1 = isCluePresentInMovie(findMovieByTitle, a1);
                const checkClue2 = isCluePresentInMovie(findMovieByTitle, a4);

                if (checkClue1 && checkClue2) {
                    const findGame = await Game.findOne({ tokenID, gameID, date: todayISOString });
                    if (findGame) {
                        findGame.guesses.push({ boxID, guess, correct: true, percentage: "100%", image: findMovieByTitle.Poster });
                        findGame.score += score;
                        findGame.correctGuesses += 1;
                        findGame.remainingGuesses -= 1;
                        await findGame.save();
                    } else {
                        const newGame = new Game({
                            tokenID,
                            gameID,
                            score: score + 1,
                            correctGuesses: 1,
                            incorrectGuesses: 0,
                            remainingGuesses: 9 - 1,
                            guesses: [{ boxID, guess, correct: true, percentage: "100%", image: findMovieByTitle.Poster }],
                        });
                        await newGame.save();
                    }

                    return NextResponse.json({ success: true, message: "Correct Guess" })
                } else {
                    const findGame = await Game.findOne({ tokenID, gameID, date: todayISOString });
                    if (findGame) {
                        findGame.incorrectGuesses += 1;
                        findGame.remainingGuesses -= 1;
                        await findGame.save();
                    } else {
                        const newGame = new Game({
                            tokenID,
                            gameID,
                            incorrectGuesses: +1,
                            remainingGuesses: 9 - 1,
                        });
                        await newGame.save();
                    }
                    return NextResponse.json({ success: false, message: "Incorrect Guess" })
                }

            } else {
                return NextResponse.json({ success: false, message: "Movie Not Found " })
            }

        } else if (boxID === "a6") {
            const checkIFExists = await Game.findOne({ tokenID, gameID, "guesses.boxID": "a6" });
            if (checkIFExists) return NextResponse.json({ success: false, message: "Already Guessed" })


            const findMovieByTitle = await movieData.find((movie) => movie.Title.toLowerCase() === guess?.toLowerCase());

            if (findMovieByTitle) {
                const checkClue1 = isCluePresentInMovie(findMovieByTitle, a2);
                const checkClue2 = isCluePresentInMovie(findMovieByTitle, a4);

                if (checkClue1 && checkClue2) {
                    const findGame = await Game.findOne({ tokenID, gameID, date: todayISOString });
                    if (findGame) {
                        findGame.guesses.push({ boxID, guess, correct: true, percentage: "100%", image: findMovieByTitle.Poster });
                        findGame.score += score;
                        findGame.correctGuesses += 1;
                        findGame.remainingGuesses -= 1;
                        await findGame.save();
                    } else {
                        const newGame = new Game({
                            tokenID,
                            gameID,
                            score: score + 1,
                            correctGuesses: 1,
                            incorrectGuesses: 0,
                            remainingGuesses: 9 - 1,
                            guesses: [{ boxID, guess, correct: true, percentage: "100%", image: findMovieByTitle.Poster }],
                        });
                        await newGame.save();
                    }

                    return NextResponse.json({ success: true, message: "Correct Guess" })
                } else {
                    const findGame = await Game.findOne({ tokenID, gameID, date: todayISOString });
                    if (findGame) {
                        findGame.incorrectGuesses += 1;
                        findGame.remainingGuesses -= 1;
                        await findGame.save();
                    } else {
                        const newGame = new Game({
                            tokenID,
                            gameID,
                            incorrectGuesses: +1,
                            remainingGuesses: 9 - 1,
                        });
                        await newGame.save();
                    }
                    return NextResponse.json({ success: false, message: "Incorrect Guess" })
                }
            } else {
                return NextResponse.json({ success: false, message: "Movie Not Found " })
            }


        } else if (boxID === "a7") {

            const checkIFExists = await Game.findOne({ tokenID, gameID, "guesses.boxID": "a7" });
            if (checkIFExists) return NextResponse.json({ success: false, message: "Already Guessed" })


            const findMovieByTitle = await movieData.find((movie) => movie.Title.toLowerCase() === guess?.toLowerCase());

            if (findMovieByTitle) {
                const checkClue1 = isCluePresentInMovie(findMovieByTitle, a3);
                const checkClue2 = isCluePresentInMovie(findMovieByTitle, a4);

                if (checkClue1 && checkClue2) {
                    const findGame = await Game.findOne({ tokenID, gameID, date: todayISOString });
                    if (findGame) {
                        findGame.guesses.push({ boxID, guess, correct: true, percentage: "100%", image: findMovieByTitle.Poster });
                        findGame.score += score;
                        findGame.correctGuesses += 1;
                        findGame.remainingGuesses -= 1;
                        await findGame.save();
                    } else {
                        const newGame = new Game({
                            tokenID,
                            gameID,
                            score: score + 1,
                            correctGuesses: 1,
                            incorrectGuesses: 0,
                            remainingGuesses: 9 - 1,
                            guesses: [{ boxID, guess, correct: true, percentage: "100%", image: findMovieByTitle.Poster }],
                        });
                        await newGame.save();
                    }

                    return NextResponse.json({ success: true, message: "Correct Guess" })
                } else {
                    const findGame = await Game.findOne({ tokenID, gameID, date: todayISOString });
                    if (findGame) {
                        findGame.incorrectGuesses += 1;
                        findGame.remainingGuesses -= 1;
                        await findGame.save();
                    } else {
                        const newGame = new Game({
                            tokenID,
                            gameID,
                            incorrectGuesses: +1,
                            remainingGuesses: 9 - 1,
                        });
                        await newGame.save();
                    }
                    return NextResponse.json({ success: false, message: "Incorrect Guess" })
                }
            } else {
                return NextResponse.json({ success: false, message: "Movie Not Found " })
            }
        } else if (boxID === 'a9') {
            const checkIFExists = await Game.findOne({ tokenID, gameID, "guesses.boxID": "a9" });
            if (checkIFExists) return NextResponse.json({ success: false, message: "Already Guessed" })


            const findMovieByTitle = await movieData.find((movie) => movie.Title.toLowerCase() === guess?.toLowerCase());

            if (findMovieByTitle) {
                const checkClue1 = isCluePresentInMovie(findMovieByTitle, a1);
                const checkClue2 = isCluePresentInMovie(findMovieByTitle, a8);

                if (checkClue1 && checkClue2) {
                    const findGame = await Game.findOne({ tokenID, gameID, date: todayISOString });
                    if (findGame) {
                        findGame.guesses.push({ boxID, guess, correct: true, percentage: "100%", image: findMovieByTitle.Poster });
                        findGame.score += score;
                        findGame.correctGuesses += 1;
                        findGame.remainingGuesses -= 1;
                        await findGame.save();
                    } else {
                        const newGame = new Game({
                            tokenID,
                            gameID,
                            score: score + 1,
                            correctGuesses: 1,
                            incorrectGuesses: 0,
                            remainingGuesses: 9 - 1,
                            guesses: [{ boxID, guess, correct: true, percentage: "100%", image: findMovieByTitle.Poster }],
                        });
                        await newGame.save();
                    }

                    return NextResponse.json({ success: true, message: "Correct Guess" })
                } else {
                    const findGame = await Game.findOne({ tokenID, gameID, date: todayISOString });
                    if (findGame) {
                        findGame.incorrectGuesses += 1;
                        findGame.remainingGuesses -= 1;
                        await findGame.save();
                    } else {
                        const newGame = new Game({
                            tokenID,
                            gameID,
                            incorrectGuesses: +1,
                            remainingGuesses: 9 - 1,
                        });
                        await newGame.save();
                    }
                    return NextResponse.json({ success: false, message: "Incorrect Guess" })
                }
            } else {
                return NextResponse.json({ success: false, message: "Movie Not Found " })
            }
        } else if (boxID === 'a10') {
            const checkIFExists = await Game.findOne({ tokenID, gameID, "guesses.boxID": "a10" });
            if (checkIFExists) return NextResponse.json({ success: false, message: "Already Guessed" })


            const findMovieByTitle = await movieData.find((movie) => movie.Title.toLowerCase() === guess?.toLowerCase());

            if (findMovieByTitle) {
                const checkClue1 = isCluePresentInMovie(findMovieByTitle, a2);
                const checkClue2 = isCluePresentInMovie(findMovieByTitle, a8);

                if (checkClue1 && checkClue2) {
                    const findGame = await Game.findOne({ tokenID, gameID, date: todayISOString });
                    if (findGame) {
                        findGame.guesses.push({ boxID, guess, correct: true, percentage: "100%", image: findMovieByTitle.Poster });
                        findGame.score += score;
                        findGame.correctGuesses += 1;
                        findGame.remainingGuesses -= 1;
                        await findGame.save();
                    } else {
                        const newGame = new Game({
                            tokenID,
                            gameID,
                            score: score + 1,
                            correctGuesses: 1,
                            incorrectGuesses: 0,
                            remainingGuesses: 9 - 1,
                            guesses: [{ boxID, guess, correct: true, percentage: "100%", image: findMovieByTitle.Poster }],
                        });
                        await newGame.save();
                    }

                    return NextResponse.json({ success: true, message: "Correct Guess" })
                } else {
                    const findGame = await Game.findOne({ tokenID, gameID, date: todayISOString });
                    if (findGame) {
                        findGame.incorrectGuesses += 1;
                        findGame.remainingGuesses -= 1;
                        await findGame.save();
                    } else {
                        const newGame = new Game({
                            tokenID,
                            gameID,
                            incorrectGuesses: +1,
                            remainingGuesses: 9 - 1,
                        });
                        await newGame.save();
                    }
                    return NextResponse.json({ success: false, message: "Incorrect Guess" })
                }
            } else {
                return NextResponse.json({ success: false, message: "Movie Not Found " })
            }
        } else if (boxID === 'a11') {
            const checkIFExists = await Game.findOne({ tokenID, gameID, "guesses.boxID": "a11" });
            if (checkIFExists) return NextResponse.json({ success: false, message: "Already Guessed" })


            const findMovieByTitle = await movieData.find((movie) => movie.Title.toLowerCase() === guess?.toLowerCase());

            if (findMovieByTitle) {
                const checkClue1 = isCluePresentInMovie(findMovieByTitle, a3);
                const checkClue2 = isCluePresentInMovie(findMovieByTitle, a8);

                if (checkClue1 && checkClue2) {
                    const findGame = await Game.findOne({ tokenID, gameID, date: todayISOString });
                    if (findGame) {
                        findGame.guesses.push({ boxID, guess, correct: true, percentage: "100%", image: findMovieByTitle.Poster });
                        findGame.score += score;
                        findGame.correctGuesses += 1;
                        findGame.remainingGuesses -= 1;
                        await findGame.save();
                    } else {
                        const newGame = new Game({
                            tokenID,
                            gameID,
                            score: score + 1,
                            correctGuesses: 1,
                            incorrectGuesses: 0,
                            remainingGuesses: 9 - 1,
                            guesses: [{ boxID, guess, correct: true, percentage: "100%", image: findMovieByTitle.Poster }],
                        });
                        await newGame.save();
                    }

                    return NextResponse.json({ success: true, message: "Correct Guess" })
                } else {
                    const findGame = await Game.findOne({ tokenID, gameID, date: todayISOString });
                    if (findGame) {
                        findGame.incorrectGuesses += 1;
                        findGame.remainingGuesses -= 1;
                        await findGame.save();
                    } else {
                        const newGame = new Game({
                            tokenID,
                            gameID,
                            incorrectGuesses: +1,
                            remainingGuesses: 9 - 1,
                        });
                        await newGame.save();
                    }
                    return NextResponse.json({ success: false, message: "Incorrect Guess" })
                }
            } else {
                return NextResponse.json({ success: false, message: "Movie Not Found " })
            }
        } else if (boxID === 'a13') {
            const checkIFExists = await Game.findOne({ tokenID, gameID, "guesses.boxID": "a13" });
            if (checkIFExists) return NextResponse.json({ success: false, message: "Already Guessed" })


            const findMovieByTitle = await movieData.find((movie) => movie.Title.toLowerCase() === guess?.toLowerCase());

            if (findMovieByTitle) {
                const checkClue1 = isCluePresentInMovie(findMovieByTitle, a1);
                const checkClue2 = isCluePresentInMovie(findMovieByTitle, a12);

                if (checkClue1 && checkClue2) {
                    const findGame = await Game.findOne({ tokenID, gameID, date: todayISOString });
                    if (findGame) {
                        findGame.guesses.push({ boxID, guess, correct: true, percentage: "100%", image: findMovieByTitle.Poster });
                        findGame.score += score;
                        findGame.correctGuesses += 1;
                        findGame.remainingGuesses -= 1;
                        await findGame.save();
                    } else {
                        const newGame = new Game({
                            tokenID,
                            gameID,
                            score: score + 1,
                            correctGuesses: 1,
                            incorrectGuesses: 0,
                            remainingGuesses: 9 - 1,
                            guesses: [{ boxID, guess, correct: true, percentage: "100%", image: findMovieByTitle.Poster }],
                        });
                        await newGame.save();
                    }

                    return NextResponse.json({ success: true, message: "Correct Guess" })
                } else {
                    const findGame = await Game.findOne({ tokenID, gameID, date: todayISOString });
                    if (findGame) {
                        findGame.incorrectGuesses += 1;
                        findGame.remainingGuesses -= 1;
                        await findGame.save();
                    } else {
                        const newGame = new Game({
                            tokenID,
                            gameID,
                            incorrectGuesses: +1,
                            remainingGuesses: 9 - 1,
                        });
                        await newGame.save();
                    }
                    return NextResponse.json({ success: false, message: "Incorrect Guess" })
                }
            } else {
                return NextResponse.json({ success: false, message: "Movie Not Found " })
            }
        } else if (boxID === 'a14') {
            const checkIFExists = await Game.findOne({ tokenID, gameID, "guesses.boxID": "a14" });
            if (checkIFExists) return NextResponse.json({ success: false, message: "Already Guessed" })


            const findMovieByTitle = await movieData.find((movie) => movie.Title.toLowerCase() === guess?.toLowerCase());

            if (findMovieByTitle) {
                const checkClue1 = isCluePresentInMovie(findMovieByTitle, a2);
                const checkClue2 = isCluePresentInMovie(findMovieByTitle, a12);

                if (checkClue1 && checkClue2) {
                    const findGame = await Game.findOne({ tokenID, gameID, date: todayISOString });
                    if (findGame) {
                        findGame.guesses.push({ boxID, guess, correct: true, percentage: "100%", image: findMovieByTitle.Poster });
                        findGame.score += score;
                        findGame.correctGuesses += 1;
                        findGame.remainingGuesses -= 1;
                        await findGame.save();
                    } else {
                        const newGame = new Game({
                            tokenID,
                            gameID,
                            score: score + 1,
                            correctGuesses: 1,
                            incorrectGuesses: 0,
                            remainingGuesses: 9 - 1,
                            guesses: [{ boxID, guess, correct: true, percentage: "100%", image: findMovieByTitle.Poster }],
                        });
                        await newGame.save();
                    }

                    return NextResponse.json({ success: true, message: "Correct Guess" })
                } else {
                    const findGame = await Game.findOne({ tokenID, gameID, date: todayISOString });
                    if (findGame) {
                        findGame.incorrectGuesses += 1;
                        findGame.remainingGuesses -= 1;
                        await findGame.save();
                    } else {
                        const newGame = new Game({
                            tokenID,
                            gameID,
                            incorrectGuesses: +1,
                            remainingGuesses: 9 - 1,
                        });
                        await newGame.save();
                    }
                    return NextResponse.json({ success: false, message: "Incorrect Guess" })
                }
            } else {
                return NextResponse.json({ success: false, message: "Movie Not Found " })
            }
        } else if (boxID === 'a15') {
            const checkIFExists = await Game.findOne({ tokenID, gameID, "guesses.boxID": "a15" });
            if (checkIFExists) return NextResponse.json({ success: false, message: "Already Guessed" })


            const findMovieByTitle = await movieData.find((movie) => movie.Title.toLowerCase() === guess?.toLowerCase());

            if (findMovieByTitle) {
                const checkClue1 = isCluePresentInMovie(findMovieByTitle, a3);
                const checkClue2 = isCluePresentInMovie(findMovieByTitle, a12);

                if (checkClue1 && checkClue2) {
                    const findGame = await Game.findOne({ tokenID, gameID, date: todayISOString });
                    if (findGame) {
                        findGame.guesses.push({ boxID, guess, correct: true, percentage: "100%", image: findMovieByTitle.Poster });
                        findGame.score += score;
                        findGame.correctGuesses += 1;
                        findGame.remainingGuesses -= 1;
                        await findGame.save();
                    } else {
                        const newGame = new Game({
                            tokenID,
                            gameID,
                            score: score + 1,
                            correctGuesses: 1,
                            incorrectGuesses: 0,
                            remainingGuesses: 9 - 1,
                            guesses: [{ boxID, guess, correct: true, percentage: "100%", image: findMovieByTitle.Poster }],
                        });
                        await newGame.save();
                    }

                    return NextResponse.json({ success: true, message: "Correct Guess" })
                } else {
                    const findGame = await Game.findOne({ tokenID, gameID, date: todayISOString });
                    if (findGame) {
                        findGame.incorrectGuesses += 1;
                        findGame.remainingGuesses -= 1;
                        await findGame.save();
                    } else {
                        const newGame = new Game({
                            tokenID,
                            gameID,
                            incorrectGuesses: +1,
                            remainingGuesses: 9 - 1,
                        });
                        await newGame.save();
                    }
                    return NextResponse.json({ success: false, message: "Incorrect Guess" })
                }
            } else {
                return NextResponse.json({ success: false, message: "Movie Not Found " })
            }
        } else {
            return NextResponse.json({ success: false, message: "Incorrect Box ID" })
        }

    } catch (error: any) {

        console.log("error in posting guess server", error.message)

        return NextResponse.json({ success: false, message: "Something went wrong" });

    }

}



function isCluePresentInMovie(movie: Movie, clue: string): boolean {
    const {
        Title,
        Year,
        Genre,
        Director,
        Writer,
        Actors,
        Language,
    } = movie;

    const fieldsToCheck = [
        Title,
        Year,
        ...Genre,
        ...Director,
        ...Writer,
        ...Actors,
        ...Language,
    ];

    const normalizedClue = clue.toLowerCase();

    return fieldsToCheck.some((field) => field?.toLowerCase().includes(normalizedClue));
}