import { api_key } from "./api";

export const api_url= {
    MOVIE_NOW_PLAYING:`/movie/now_playing?api_key=${api_key}`,
    MOVIE_POPULAR:`/movie/popular?api_key=${api_key}`,
    MOVIE_TOP_RATED:`/movie/top_rated?api_key=${api_key}`,
    MOVIE_UPCOMING:`/movie/upcoming?api_key=${api_key}`,
    GENRE_LIST:`/genre/movie/list?api_key=${api_key}`,
    SEARCH_MOVIES:`/search/movie?api_key=${api_key}`
}