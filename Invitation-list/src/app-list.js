import { setLocalStorage, getDataLocalStorage, updateLocalStorage } from "./localStorage.js";
import { updateNewPerson} from "./uptadeNewPerson.js";
import { renderPeopleList} from "./renderPeopleList.js";
import { checkboxChangeStatus, checkboxRenderStatus } from "./checkbox.js";
import { totalGuestsCounter } from "./total-guests-counter.js";
import { editPerson} from "./edit-person.js";
// import { editPerson, editSecondaryPerson } from "./edit-person.js";


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
        editPerson(0)
        editPerson(1)

        // editSecondaryPerson(1);

        
    } else {
        
        fetch(url).then(response => response.json().then(peopleListAjax => {
            console.log(peopleListAjax, "ajax request");
            
            setLocalStorage(peopleListAjax);
            renderPeopleList(getDataLocalStorage)

            checkboxChangeStatus()
            checkboxRenderStatus()
            
            updateNewPerson()

            totalGuestsCounter()
            editPerson(0)
            editPerson(1)
            // editSecondaryPerson(1);

            
        }));
    }
});

// editPersonSecondary();
