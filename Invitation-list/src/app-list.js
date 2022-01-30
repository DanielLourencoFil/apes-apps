import { setLocalStorage, getDataLocalStorage} from "./localStorage.js";
import { updateNewPerson} from "./uptadeNewPerson.js";
import { renderPeopleList} from "./renderPeopleList.js";
import { checkboxChangeStatus, checkboxRenderStatus } from "./checkbox.js";
import { totalGuestsCounter } from "./total-guests-counter.js";
import { editPerson} from "./edit-person.js";
import {closeSecondaryGuestModal} from "./enable-disable-features.js"


const url = "peopleList.json";

// let peopleList = []

window.addEventListener('DOMContentLoaded', () => {
    const loadingDisplayer = document.querySelector('.loading-displayer');
    loadingDisplayer.classList.add('hide-loading');
    
    
    if (localStorage.getItem('peopleList') != null) {
        
        let peopleList = getDataLocalStorage()
        renderPeopleList(peopleList)
        
        updateNewPerson()
        
        checkboxChangeStatus()

        totalGuestsCounter()
        editPerson(0)
        editPerson(1)
        closeSecondaryGuestModal()

    } else {
        
        fetch(url).then(response => response.json().then(peopleListAjax => {
            
            setLocalStorage(peopleListAjax);
            renderPeopleList(getDataLocalStorage)

            updateNewPerson()

            checkboxChangeStatus()
            checkboxRenderStatus()

            totalGuestsCounter()
            editPerson(0)
            editPerson(1)

            closeSecondaryGuestModal()
        }));
    }
});
