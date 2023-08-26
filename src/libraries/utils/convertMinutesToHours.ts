export const convertToHour=(minutes:number|undefined):string=>{
    if(minutes){
        const hours = Math.floor(minutes/60)
        const minute = minutes%60
        return hours +"h "+ minute+"m"
    }
    else return "1h 30m"
}