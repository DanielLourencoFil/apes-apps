import { hasImgVerify} from "../utils/hasImgVerify.js";
import { findWinner } from "../utils/findWinner.js";
import { makeComparison } from "../utils/makeComparison.js";


export function renderSingleMovie(dataSingleMovie, domElement, valuesToExtract){
    const valuesHeader = valuesToExtract[0]
    const valuesBody = valuesToExtract[1]

    const singleItemWrapper = document.createElement('article')
    singleItemWrapper.classList.add('single-item-wrapper')
    
    const singleItemHTMLTemplateHeader = `
    <div class="single-item-header">
        <img class="single-item-img" src="${dataSingleMovie[valuesHeader[0]]}" alt="">
        <div class="single-item-text-content">
        <h2 class="single-item-title">${dataSingleMovie[valuesHeader[1]]}</h2>
        <p class="single-item-text single-item-genre">${dataSingleMovie[valuesHeader[2]]}</p>
        <p class="single-item-text single-item-description">${dataSingleMovie[valuesHeader[3]]}</p>
        </div>
    </div>
    `;
    singleItemWrapper.innerHTML = singleItemHTMLTemplateHeader;
    domElement.appendChild(singleItemWrapper);
    
    valuesBody.forEach((value)=>{
        let stats;
            if(value === "Awards"){
                let count = 0
                stats = dataSingleMovie[value].split(' ').forEach(stat =>{
                   if(parseFloat(stat))
                        count += parseFloat(stat)
                    })
                    stats = count;
            }
            if(value === "BoxOffice"){
                stats = dataSingleMovie[value].replace(/\$/g, '').replace(/\,/g, '')
            }
            if(value === "Metascore"){
                stats = dataSingleMovie[value]
            }
            if(value === "imdbRating"){
                stats = dataSingleMovie[value]
            }
            if(value === "imdbVotes"){
                stats = dataSingleMovie[value].replace(/\,/g, '')
            }
            if(value === "Runtime"){
                stats = dataSingleMovie[value].split(' ')[0]
            }
            if(stats === 'N/A'){
                stats = 0
            }
        
            const singleItemHTMLTemplateBody = `
            <article class="item-single-value item-sucess" data-value="${stats}">
            <p class="macht-item-title">${value}</p>
            <p class="macht-item-value">${dataSingleMovie[value]}</p>
            </article>
            `;
         singleItemWrapper.innerHTML += singleItemHTMLTemplateBody   
    })
    const imgPoster = domElement.querySelector('.single-item-img')
    hasImgVerify(imgPoster, 'default-poster-img-single')

    makeComparison(findWinner)
}



