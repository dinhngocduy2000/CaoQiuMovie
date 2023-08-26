import { genre } from "./genre_list";

export interface MovieDetails{
    adult:boolean,
    backdrop_path:string,
    belong_to_collection:any,
    budget:number,
    genres:genre[],
    homepage:string,
    id:number,
    imdb_id:string,
    original_language:string,
    original_title:string,
    overview:string,
    popularity:number,
    poster_path:string,
    production_companies:production_companies[],
    production_countries:production_countries[],
    release_date:string,
    revenue:number,
    runtime:number,
    spoken_languages:spoken_languages[],
    status:string,
    tagline:string,
    title:string,
    video: boolean,
    vote_average:number,
    vote_count:number
    credits:credits,
    videos:videos

}

export interface production_companies{
    id:number,
    logo_path:string,
    name:string,
    origin_country:string
}
export interface production_countries{
    iso_3166_1:string,
    name:string
}
export interface spoken_languages{
    english_name:string,
    iso_639_1:string,
    name:string
}
export interface credits{
    cast:cast[]
}
export interface cast{
    adult:boolean,
    gender:0|1|2|3,
    id:number,
    known_for_department:string,
    name:string,
    original_name:string,
    popularity:number,
    profile_path:string,
    cast_id:number,
    character:string,
    credit_id:string,
    order:number
}
export interface videos{
    results:videos_result[]
}
export interface videos_result{
    id:string,
    iso_3166_1:string,
    iso_639_1:string,
    key:string,
    name:string,
    official:boolean,
    published_at:string,
    site:string,
    size:number,
    type:string
}