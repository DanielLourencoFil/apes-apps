export const fetchDataMovies = async (searchType, inputSearch) =>{
    const apikey = "b35dd6c4";
    const urlMovie = "https://omdbapi.com/"; 
    
    const params = {
        apikey: "b35dd6c4",
    }

    if(searchType === 'i'){
        params.i = inputSearch
    }
    if(searchType === 's'){
        params.s = inputSearch
    }

    const response = await axios.get(urlMovie, {
        params
    })
    // change movie poster value if it is N/A: avoid display broken image
    if(response.data.Search && searchType === 's'){
        for(let movie of response.data.Search){
            if(movie.Poster === "N/A"){
                movie.Poster = '';
            }
        }
    }
    // set boxOffice value to N/A if it is undefined
    if(response.data && searchType === 'i'){
            if(response.data.BoxOffice === undefined){
                response.data.BoxOffice = 'N/A';
            }
            if(response.data.Poster === "N/A" || response.data.Poster === undefined ){
                response.data.Poster = '';
            }

    }
   return response.data.Search? response.data.Search : response.data;
};