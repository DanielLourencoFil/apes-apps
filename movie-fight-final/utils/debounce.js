export function debounce(cb, delay){
    let timeoutId;
    return function(e){
    clearTimeout(timeoutId);
    timeoutId = setTimeout(()=>{
         cb(e)
    },delay)
    }
}