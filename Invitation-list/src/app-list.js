import { setLocalStorage, getDataLocalStorage, updateLocalStorage } from "./localStorage.js";
import { updateNewPerson} from "./uptadeNewPerson.js";
import { renderPeopleList } from "./renderPeopleList.js";
import { checkboxChangeStatus, checkboxRenderStatus } from "./checkbox.js";
import { totalGuestsCounter } from "./total-guests-counter.js";

const url = "peopleList.json";

// let peopleList = []

window.addEventListener('DOMContentLoaded', () => {
    const loadingDisplayer = document.querySelector('.loading-displayer');
    loadingDisplayer.classList.add('hide-loading');
    
    
    if (localStorage.getItem('peopleList') != null) {
        console.log('yes, local peopleLists exist');
        
        let peopleList = getDataLocalStorage()
        renderPeopleList(peopleList)
        checkboxChangeStatus()
        updateNewPerson()

        totalGuestsCounter()
        
    } else {
        
        fetch(url).then(response => response.json().then(peopleListAjax => {
            console.log(peopleListAjax, "ajax request");
            
            setLocalStorage(peopleListAjax);
            renderPeopleList(getDataLocalStorage)

            checkboxChangeStatus()
            checkboxRenderStatus()
            
            updateNewPerson()

            totalGuestsCounter()
            
        }));
    }
});

