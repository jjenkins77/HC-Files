import mongoose from "mongoose";
const today = new Date(Date.UTC(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()));
const todayISOString = today.toISOString();
const ClueSchema = new mongoose.Schema({
    a1: { type: String, required: true },
    a2: { type: String, required: true },
    a3: { type: String, required: true },
    a4: { type: String, required: true },
    a8: { type: String, required: true },
    a12: { type: String, required: true },
    date: { type: String, default: todayISOString, unique: true }
}, { timestamps: true });

const Clue = mongoose.models.clues || mongoose.model('clues', ClueSchema);

export default Clue;

