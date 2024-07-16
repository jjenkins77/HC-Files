type RatingSource = string;

interface Rating {
    Source: RatingSource;
    Value: string;
}

export interface Movie {
    Title?: string;
    Year?: string;
    Rated?: string;
    Released?: string;
    Runtime?: string;
    Genre: string[];
    Director: string[];
    Writer: string[];
    Actors: string[];
    Plot?: string;
    Language: string[];
    Country: string[];
    Awards?: string;
    Poster: string;
    Ratings?: Rating[];
    Metascore?: string;
    imdbRating?: string;
    imdbVotes?: string;
    imdbID?: string;
    Type?: string;
    DVD?: string;
    BoxOffice?: string;
    Production?: string;
    Website?: string;
    Response?: string;
}



function calculateSimilarity(movie1: Movie, movie2: Movie): number {
    let similarity = 0;
    similarity += movie1.Actors.filter(actor => movie2.Actors.includes(actor)).length;
    similarity += movie1.Director.filter(director => movie2.Director.includes(director)).length;
    similarity += movie1.Writer.filter(writer => movie2.Writer.includes(writer)).length;
    similarity += movie1.Genre.filter(genre => movie2.Genre.includes(genre)).length;
    return similarity;
}

export function pickRelatedMovies(moviesData: Movie[], count: number = 9): Movie[] {

    const movieIndex = Math.floor(Math.random() * moviesData.length);
    const movie = moviesData[movieIndex];


    let relatedMovies = moviesData.filter(otherMovie =>
        otherMovie.Title !== movie.Title &&
        (otherMovie.Actors.some(actor => movie.Actors.includes(actor)) ||
            otherMovie.Director.some(director => movie.Director.includes(director)) ||
            otherMovie.Writer.some(writer => movie.Writer.includes(writer)) ||
            otherMovie.Genre.some(genre => movie.Genre.includes(genre)))
    );


    relatedMovies = relatedMovies.sort((a, b) => calculateSimilarity(b, movie) - calculateSimilarity(a, movie));


    return relatedMovies
}




function findMultipleCommonMovies(actor: string, director: string, writer: string, genre: string, movies: Movie[]): Movie[] {
    const commonMovies: Movie[] = [];
    for (const movie of movies) {
        if (movie.Actors.includes(actor) && movie.Director.includes(director) && movie.Writer.includes(writer) && movie.Genre.includes(genre)) {
            if (!commonMovies.includes(movie)) {
                commonMovies.push(movie);
            }
        }
    }
    return commonMovies;
}


export function generateClues(movies: Movie[]): { [key: string]: string } {
    const labeledClues: { [key: string]: string } = {};
    const labels = ['a1', 'a2', 'a3', 'a4', 'a8', 'a12'];
    const actors = movies.flatMap(movie => movie.Actors);
    const directors = movies.flatMap(movie => movie.Director);
    const writers = movies.flatMap(movie => movie.Writer);
    const genres = movies.flatMap(movie => movie.Genre);
    const languages = movies.flatMap(movie => movie.Language);
    const years = movies.flatMap(movie => movie.Year);

    for (let i = 0; i < 3; i++) {
        const commonMovies = findMultipleCommonMovies(actors[i], directors[i], writers[i], genres[i], movies);
        if (commonMovies.length === 1) {
            if (!Object.values(labeledClues).includes(actors[i])) {
                labeledClues[labels.shift() || ''] = actors[i];
            }
            if (!Object.values(labeledClues).includes(directors[i])) {
                labeledClues[labels.shift() || ''] = directors[i];
            }
            if (!Object.values(labeledClues).includes(writers[i])) {
                labeledClues[labels.shift() || ''] = writers[i];
            }
            if (!Object.values(labeledClues).includes(genres[i])) {
                labeledClues[labels.shift() || ''] = genres[i];
            }
            if (labels.length === 0) break;
        }
    }

    if (labels.length > 0 && languages[0] && !Object.values(labeledClues).includes(languages[0])) {
        labeledClues[labels.shift() || ''] = languages[0];
    }

    if (labels.length > 0 && years[0] && !Object.values(labeledClues).includes(years[0])) {
        labeledClues[labels.shift() || ''] = years[0];
    }

    for (let i = 0; i < 3; i++) {
        if (labels.length === 0) break;
        if (!Object.values(labeledClues).includes(actors[i])) {
            labeledClues[labels.shift() || ''] = actors[i];
        }
        if (labels.length === 0) break;
        if (!Object.values(labeledClues).includes(directors[i])) {
            labeledClues[labels.shift() || ''] = directors[i];
        }
        if (labels.length === 0) break;
        if (!Object.values(labeledClues).includes(writers[i])) {
            labeledClues[labels.shift() || ''] = writers[i];
        }
        if (labels.length === 0) break;
        if (!Object.values(labeledClues).includes(genres[i])) {
            labeledClues[labels.shift() || ''] = genres[i];
        }
    }

    return labeledClues;
}



export function findMoviesByClues(clues: { [key: string]: string }, movies: Movie[]): { [key: string]: string } {
    const gridBoxes = ['a5', 'a6', 'a7', 'a9', 'a10', 'a11', 'a13', 'a14', 'a15'];
    const result: { [key: string]: string } = {};
    const usedMovies: Movie[] = [];

    const cluePairs = [['a1', 'a4'], ['a2', 'a4'], ['a3', 'a4'], ['a1', 'a8'], ['a2', 'a8'], ['a3', 'a8'], ['a1', 'a12'], ['a2', 'a12'], ['a3', 'a12']];

    for (let i = 0; i < gridBoxes.length; i++) {
        const pair = cluePairs[i];
        let found = false;
        for (const movie of movies) {
            if (usedMovies.includes(movie)) {
                continue;
            }
            if (matchesClues(movie, clues, pair)) {
                result[gridBoxes[i]] = movie.Poster;
                usedMovies.push(movie);
                found = true;
                break;
            }
        }
        if (!found) {
            for (const movie of movies) {
                if (matchesClues(movie, clues, pair)) {
                    result[gridBoxes[i]] = movie.Poster;
                    break;
                }
            }
        }
    }

    return result;
}

function matchesClues(movie: Movie, clues: { [key: string]: string }, pair: string[]): boolean {
    return (movie.Actors.includes(clues[pair[0]]) || movie.Director.includes(clues[pair[0]]) || movie.Writer.includes(clues[pair[0]]) || movie.Genre.includes(clues[pair[0]]) || movie.Year === clues[pair[0]] || movie.Language.includes(clues[pair[0]])) &&
        (movie.Actors.includes(clues[pair[1]]) || movie.Director.includes(clues[pair[1]]) || movie.Writer.includes(clues[pair[1]]) || movie.Genre.includes(clues[pair[1]]) || movie.Year === clues[pair[1]] || movie.Language.includes(clues[pair[1]]));
}