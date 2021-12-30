import { renderPeopleList, renderSecondaryGuestsList} from "./renderPeopleList.js";
import { getDataLocalStorage, updateLocalStorage } from "./localStorage.js";
import { totalGuestsCounter } from "./total-guests-counter.js";

let callEditBtnCounter = 0;

export function editPerson(indexList){
    let peopleListTag = document.getElementsByClassName('people-list')[indexList];
    
    peopleListTag.addEventListener('click', (e)=>{
        let person = e.target.parentElement.parentElement;
        
        let personName = person.getElementsByClassName('people-name')[0].value;

        //------ DELETE Button pressed   ------// 
        if(e.target.classList.contains('people-delete-icon')){
            if(deletePersonAlert(personName) === true) {
               
                deletePerson(person, indexList)
            } 
        }
        
//------    EDIT Button pressed   ------// 
        if(e.target.classList.contains('people-add-icon')){
            const toUpDate = "edit guest";  

            // CALL function only if calling is made from primary guest list : avoid bug - li is freezed! 
        if(indexList == 0){
               renderSecondaryGuestsList(person)
        }    
        
     person = e.target.parentElement.parentElement;
    let personNameInput = person.getElementsByClassName('people-name')[0];
    let personName = personNameInput.value; 

    if(indexList == 1 ){
        callEditBtnCounter++;

        if(callEditBtnCounter == 1){
        personNameInput.disabled = false;
        personNameInput.focus();
        }
        
        if(callEditBtnCounter == 2){
            personNameInput.disabled = true;
            personNameInput.blur();
            callEditBtnCounter = 0

            let primaryGuestId = parseInt(person.getAttribute('data-id'));
            let secondaryGuestId = parseInt(person.querySelector('.people-name').getAttribute('data-id'))
            let guestsData = [];
            guestsData.push(personName, primaryGuestId, secondaryGuestId);
            
            //get unique values: array with 3 diferent values = secondary guest edit; 
            //with 2 different values = primary guest edit
            guestsData =  [...new Set(guestsData)];

            updateLocalStorage(person, guestsData, toUpDate);
            renderPeopleList(getDataLocalStorage)
        }
    }
}
})
}


function deletePerson(person, indexList){
    let toUpDate = "";
    console.log(person);
    console.log(indexList);
    if(indexList == 0){
        toUpDate = "remove primary guest"
        updateLocalStorage(person, null, toUpDate)
    }
    if(indexList == 1){
        toUpDate = "remove secondary guest"

        person.remove();

        const secondaryGuestId = person.querySelector('.people-name').getAttribute('data-id');

        updateLocalStorage(person, secondaryGuestId, toUpDate)
        renderSecondaryGuestsList(person)
    }
    person.remove();

    totalGuestsCounter()
    renderPeopleList(getDataLocalStorage)
}


function editGuests(){
//add secondary guests names
console.log('add secondary guest Extra');

}

function addExtraSecondaryGuest(){
console.log('add Extra');
}


function deletePersonAlert(person){
//alert before delete primary guest
return confirm(`Do you want delete ${person}?`)
}


export function closeSecondaryGuestModal(modal){
    const closeBtn = modal.parentElement.getElementsByClassName('close-secondary-modal')[0]
    closeBtn.addEventListener('click', (e)=>{
        if(e.target.classList.contains('close-secondary-modal')){
            //hide secondary guests modal
            modal.parentElement.classList.remove('secondary-guests-show')
            
            //clean secondary guest list content
            modal.innerHTML = ''

        }
    })
}