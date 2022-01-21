export function hasImgVerify(imgPoster, defaultPoster){
    if(imgPoster.getAttribute('src') === ''){
        imgPoster.classList.add(defaultPoster)
    } 
}