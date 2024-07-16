import mongoose from "mongoose";

const today = new Date(Date.UTC(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()));
const todayISOString = today.toISOString();

const GameSchema = new mongoose.Schema({
    tokenID: { type: String, required: true },
    gameID: { type: String, required: true, unique: true },
    score: { type: Number, required: true, default: 0 },
    correctGuesses: { type: Number, required: true, default: 0 },
    incorrectGuesses: { type: Number, required: true, default: 0 },
    remainingGuesses: { type: Number, required: true, default: 9 },
    guesses: [
        {
            boxID: { type: String, required: true },
            guess: { type: String, required: true },
            correct: { type: Boolean, required: true },
            image: { type: String, required: true },
            percentage: { type: String, required: true },
        }
    ],
    date: { type: String, default: todayISOString }
});

const Game = mongoose.models.games || mongoose.model('games', GameSchema);

export default Game;