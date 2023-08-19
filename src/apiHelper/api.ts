import axios from "axios"
export const api_key:string = "68d1ec38caf0f91e5e7b84f0d8ab5cdc"
export const BASE_URL = "https://api.themoviedb.org/3"
export const IMAGE_URL = "https://image.tmdb.org/t/p"
const HEADERS = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2OGQxZWMzOGNhZjBmOTFlNWU3Yjg0ZjBkOGFiNWNkYyIsInN1YiI6IjY0ZTAxZDhkNWFiODFhMDEzOTFhMmRkYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PVjpYD_yoeXMrhs563dcy09A15GLe_-4NdQBL02Q-sc"

export const axios_get  = async (url:string,params?:any)=>{
    const options = {
        method: 'GET',
        url: BASE_URL+ url,
        params: params|| {language: 'en-US', page: '1'},
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          Authorization: HEADERS
        }
      };
      
   const res = await axios.request(options)
   return res.data
}