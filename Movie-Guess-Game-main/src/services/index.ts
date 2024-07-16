export const search_movie_by_name = async (movieName: string) => {
    try {
        const res = await fetch(`/api/search-movie?movieName=${movieName}`, {
            method: 'GET',
        })
        const data = res.json();
        return data;
    } catch (error) {
        console.log('error in searching movie (service) => ', error);
    }
}
