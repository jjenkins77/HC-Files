export interface Clue {
    a1: string;
    a2: string;
    a3: string;
    a4: string;
    a8: string;
    a12: string;
}
export interface Guess {
    boxID: string;
    guess: string;
    correct: boolean;
    image: string;
    percentage: string;
    _id: string;
}

export interface Game {
    _id: string;
    tokenID: string;
    gameID: string;
    score: number;
    correctGuesses: number;
    incorrectGuesses: number;
    remainingGuesses: number;
    guesses: Guess[];
    date: string;
    __v: number;
}

export interface getClueResponse {
    success: boolean;
    clue: Clue;
    newToken: string;
    game: Game;
}


export interface SearchResultType {
    label: string;
    value: string;
}

export interface getSearchResponse {
    success: boolean;
    data: SearchResultType[]
}

export interface GuessResponse {
    success: boolean;
    message: string;
    game: Game;
}

export interface Game {
    _id: string;
    tokenID: string;
    date: string;
    guesses: Guess[];
    score: number;
    correctGuesses: number;
    incorrectGuesses: number;
    remainingGuesses: number;
}

export interface Guess {
    boxID: string;
    guess: string;
    correct: boolean;
}