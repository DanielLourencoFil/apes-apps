import {debounce} from "../utils/debounce.js"

export function CreateAutoComplete({valuesToExtractFirst,valuesToExtractSecond, text, root, fetchItems, renderItem}){
    const {title, alert, placeHolder} = text();
    
    const htmlTemplate = `<article class="item-search-wrapper">
    <h1 class="item-main-title">${title}<span class="item-final-match-result"></span></h1>
    <p class="alert-search">${alert}</p>
    <input class="item-input" type="text" placeholder="${placeHolder}">
    <ul class="search-dropdown-menu"></ul>
    </article>`
    
    root.innerHTML = htmlTemplate
    
    const input = root.querySelector('.item-input')
    const dropdownMenu = root.querySelector('.search-dropdown-menu')
    
    // show tutorial message: default
    const tutorial = document.querySelector('.tutorial')
    tutorial.classList.add('show-tutorial')
    
    // on search input create a html list with items
    const onInput = async (e)=> {
        //empty and hide dropdown menu : default behavior
        dropdownMenu.innerHTML='';
        dropdownMenu.classList.remove('show-dropdown-menu')

        //hide tutorial message
        tutorial.classList.remove('show-tutorial')

        const items = await fetchItems('s', e.target.value);
        
        for( let item of items) {
            
            const imgPosterDefaultImg =  item[valuesToExtractFirst[0]] === ''? valuesToExtractFirst[5]: '';
            const li = document.createElement('li');
            li.classList.add('item-result')
            li.setAttribute('data-id', item[valuesToExtractFirst[2]] )
            
            li.innerHTML =`
            <img class="item-img ${imgPosterDefaultImg}" src="${item[valuesToExtractFirst[0]]}" alt="">
            <p class="item-title">${ item[valuesToExtractFirst[1]]}</p>
            <p class="item-extra-info-1">(${ item[valuesToExtractFirst[3]]})</p>
            `;
    
            dropdownMenu.appendChild(li)

            li.addEventListener('click', async (e)=>{
                
                // hide dropdown menu after item selection
                dropdownMenu.classList.remove('show-dropdown-menu')
                dropdownMenu.innerHTML = ''
                
                //fetch data of delected item
                const dataItem = await fetchItems('i', item[valuesToExtractFirst[2]])
                
                //set one value of select item as the search input value
                input.value = dataItem[valuesToExtractFirst[4]]
                
                //close alert message
                root.querySelector('.alert-search').classList.remove('show-alert-search')
                
                //render html list with items
                renderItem(dataItem, root, valuesToExtractSecond, input)

            })
        }
    // show dropdown menu after render list of item 
        dropdownMenu.classList.add('show-dropdown-menu')
    };
    
    // call onInput after input entry; debounce funtion limit the number of fecth requests    
    input.addEventListener('input', debounce(onInput, 500));
    
    // hide menu after item selection; clean search input field if not item is selected 
    document.addEventListener('click', (e)=>{
        hideDropdownMenuAndCleanInput(e.target, input, dropdownMenu, root)
    })
    // clean item selection after render  for new matcth
    input.addEventListener('click', (e)=>{
        cleanSingleItem(e.target, root)
    })

    // display alert if user make no selection on list
    alertMessageIfNoValidySelection(root, dropdownMenu)
}


//------ hide menu after item selection; clean search input field if not item is selected 
function hideDropdownMenuAndCleanInput(target, input, menu, elementRoot){

    if(!menu.contains(target) && !target.classList.contains('item-input')
        &&!elementRoot.querySelector('.single-item-wrapper')){
            menu.classList.remove('show-dropdown-menu')
            menu.innerHTML = ''
            input.value = ''
            elementRoot.querySelector('.alert-search').classList.remove('show-alert-search')
   }
}

//----- clean item select for new match
function cleanSingleItem(target, root){

    if(target && root.querySelector('.single-item-wrapper')){
        const singleMovieWrapper = document.querySelectorAll('.single-item-wrapper')
        const searchInputAll = document.querySelectorAll('.item-input')
        const winner = document.querySelectorAll('.is-winner')
        singleMovieWrapper.forEach((movie, index)=>{
            movie.remove()
            searchInputAll[index].value = ""
            winner[index].classList.remove('is-winner')
        })
    }
}
    
/// // display alert if user make no selection on list

function alertMessageIfNoValidySelection(rootElement, menu){
    window.addEventListener('keydown',(e)=>{
        if(e.key === "Enter" && menu.childNodes.length > 0){
            console.log(menu, menu.childNodes.length >0);
            rootElement.querySelector('.alert-search').classList.add('show-alert-search')
        }
    })
}