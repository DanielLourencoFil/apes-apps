import { fetchDataMovies} from "./src/fecthDataMovies.js";
import { CreateAutoComplete} from "./src/autocomplete.js";
import { renderSingleMovie} from "./src/renderSingleMovie.js";


// variable to set the text content of title and placeholder for each search input
const textAutocomplete = (title) =>{
    const text = {
        title: title,
        alert: "Please, choose a movie from the dropdown menu",
        placeHolder: "Select movie to start the fight",
    }
    return text
};

// variable to set values for search, functions to fetchdata and to render items 
const movieConfig = {
   valuesToExtractFirst: ['Poster', 'Title', 'imdbID', 'Year', 'Title', 'default-poster-img'],
   valuesToExtractSecond: [['Poster', 'Title', 'Genre','Plot'], ['Awards', 'BoxOffice', 'Metascore','imdbRating', 'imdbVotes', 'Runtime']],
   fetchItems(searchType, inputSearch){
       return fetchDataMovies(searchType, inputSearch);
   },
   renderItem(item, domElement, valuesToExtract){
    renderSingleMovie(item, domElement, valuesToExtract)
   },
}



///////////////  create single input for movie search 
// movie 1
CreateAutoComplete({
    ...movieConfig,
    root: document.querySelector('#movie-1'),
    text(){
        return textAutocomplete("Movie 1")
    },
}
)

// movie 2 
CreateAutoComplete({
    ...movieConfig,
    root: document.querySelector('#movie-2'),
    text(){
        return textAutocomplete("Movie 2")
    },
}
)


