import {findWinner} from "./findWinner.js"

export function getMoviesDataToCompare(){
    const singleMoviesContainers = document.querySelectorAll('.single-movie-container')
    const matchItemValue = document.querySelectorAll('.macht-item-value')

    //-----------start comparison only after second movie data is render
    //-----------lenght is the number of values to compare in a single movie
    if(matchItemValue.length > 3){
        getMovieData(singleMoviesContainers)
        findWinner()
    }
}

//-----------function for comparison of movies 
function makeComparison([compareMovies, movie1, movie2]){
    if(movie1 > movie2){
        compareMovies[0].classList.add('match-sucess')
        compareMovies[1].classList.add('match-alert')
    }
    if (movie1 < movie2){
        compareMovies[0].classList.add('match-alert')
        compareMovies[1].classList.add('match-sucess')
    }
}

function getMovieData(movies){
    ////--------- starts processes of comparison of movies by seting out empty arrays for storage data
    ////---------- arrays contains html tag reference; values of movies 
    let movieBox = []
    let movieScore =[]
    let movieRunTime =[]

    //array with values to compare
    const selectedItemToMatch = ['BoxOffice', 'Metascore', 'Runtime']
    
    //functions for values extraction from html rendered values
    const extractBoxOffice = (movieData) => parseFloat((movieData.split('$')[1]).replaceAll(',', ''));
    const extractMetascore = (movieData) => parseFloat(movieData);
    const extractRuntime = (movieData) => parseFloat(movieData.split(' ')[0]);
    
    // loop based on single movies index
    movies.forEach((movie, index) => {
    
    // loop based on values form comparison    
        selectedItemToMatch.forEach(data =>{
            
            if(data === "BoxOffice"){
                extractMovieDataFromHtml(movieBox, data, index, extractBoxOffice)
            }
            if(data === "Metascore"){
                extractMovieDataFromHtml(movieScore, data, index, extractMetascore)
            }
            if(data === "Runtime"){
                extractMovieDataFromHtml(movieRunTime, data, index, extractRuntime)
            }
        })

    })
    // call function for comparison 
    makeComparison(movieBox)
    makeComparison(movieScore)
    makeComparison(movieRunTime)
}

function extractMovieDataFromHtml(array, data, index, extractAction){
    const compareMoviesBox = document.querySelectorAll(`[data-item="${data}"]`)
    //set single movies html reference as the first item of array : exclude the double value caused by the loop index based(this function is called inside a loop)
    array.shift();
    array.unshift(compareMoviesBox)
    
    let movieData = compareMoviesBox[index].querySelector('.macht-item-value').textContent;
                
    if(movieData == "N/A"){
        movieData = 0;
    }
    else{
        movieData = extractAction(movieData)
    }
    array.push(movieData)
}