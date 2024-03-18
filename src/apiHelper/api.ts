import axios from "axios"
export const api_key:string = "68d1ec38caf0f91e5e7b84f0d8ab5cdc"
export const BASE_URL = "https://api.themoviedb.org/3"
export const IMAGE_URL = "https://image.tmdb.org/t/p"
const HEADERS = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2OGQxZWMzOGNhZjBmOTFlNWU3Yjg0ZjBkOGFiNWNkYyIsInN1YiI6IjY0ZTAxZDhkNWFiODFhMDEzOTFhMmRkYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PVjpYD_yoeXMrhs563dcy09A15GLe_-4NdQBL02Q-sc"

export const axios_get  = async (url:string,params?:any)=>{
  console.log("INITIATE FETCHING; "+ url + " " +params);
  console.log("check params: ",params);
  
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
   console.log("API RESPONSE: ",res);
   
   return res.data
}


export const validateRequestToken = async(username:string,password:string,request_token:string,setLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
    const data = {
      username:username,
      password:password,
      request_token: request_token
      }
      const options = {
        method: 'POST',
        url: 'https://api.themoviedb.org/3/authentication/token/validate_with_login',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          Authorization: HEADERS
        },
        data: data
      };
      try {
        const response = await axios.request(options)
        return getSessionId(response.data.request_token,setLoading)
      } catch (error) {
        console.log("ERROR VALIDATE REQUEST TOKEN1: ",error);
        setLoading(false)
      }
 
}

export const getSessionId =async (request_token:string,setLoading:React.Dispatch<React.SetStateAction<boolean>>) => {
      // const request_token = await validateRequestToken(username,password)

      if(request_token!==null){
        const options = {
          method: 'POST',
          url: 'https://api.themoviedb.org/3/authentication/session/new',
          headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            Authorization: HEADERS
          },
          data: {request_token: request_token}
        };
        try {
            const response = await axios.request(options)
            return response.data.session_id
          } catch (error) {
            console.error("ERROR FETCH SESSION ID1: ",error);
            setLoading(false)
        }
      }

}

export const loginWithToken =  async (username:string,password:string,setLoading:React.Dispatch<React.SetStateAction<boolean>>) => {
  const options = {
    method: 'GET',
    url: 'https://api.themoviedb.org/3/authentication/token/new',
    headers: {
      accept: 'application/json',
      Authorization: HEADERS,
    }
  };
  try {
    const response = await axios.request(options)
    return validateRequestToken(username,password,response.data.request_token,setLoading)
  } catch (error) {
    console.error("ERROR FETCHING REQUEST TOKEN: ",error);
    setLoading(false)
  }
}

export const logOutWithToken =async (session_id:string) => {
  const options = {
    method: 'DELETE',
    url: 'https://api.themoviedb.org/3/authentication/session',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: HEADERS
    },
    data: {session_id:session_id}
  };
  try {
    const res = await axios.request(options)
  } catch (error) {
    console.log(error);
    
  }
    

}

export const fetchUserDetail = async (session_id:string,accessToken:string) => {
  console.log("FETCHING USER DETAIL:");
  
  const options = {
    method: 'GET',
    url: 'https://api.themoviedb.org/3/account/20321210',
    params: {session_id: session_id},
    headers: {
      accept: 'application/json',
      Authorization: accessToken,
    },
  };
  try {
    const response = await axios.request(options)
    console.log("CHECK USER DETAIL DATA: " , response.data);
    
    return response.data

  } catch (error) {
    console.log("ERROR FETCHING USER DETAIL: ");
    
  }
  
}