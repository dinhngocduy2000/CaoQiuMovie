import { NOW_PLAYING_RESULT } from "./now_playing_res"

export interface POPULAR_MOVIE{
    page:number,
    results:NOW_PLAYING_RESULT[],
    total_pages:number,
    total_results:number
}
