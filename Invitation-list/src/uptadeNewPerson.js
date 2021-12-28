import { getDataLocalStorage, setLocalStorage } from "./localStorage.js";
import {renderPeopleList} from './renderPeopleList.js'
import { totalGuestsCounter } from "./total-guests-counter.js";

export function updateNewPerson(){
    const addPeopleForm = document.getElementsByClassName('add-people-container')[0]
    addPeopleForm.addEventListener('click',(e)=>{
        let updatedPeopleList = getDataLocalStorage();

        // console.log(e.target);
        if(e.target.classList.contains('add-people-btn')){
            
            const newGuestsNumber = e.target.parentElement.querySelector('[data-input="guests"]')
            const newPersonName = e.target.parentElement.querySelector('[data-input="people"]')
            const newPersonId = updatedPeopleList[updatedPeopleList.length - 1].id + 1
            const newPersonStatus = 0;
            
            updatedPeopleList.push({
                "name": newPersonName.value,
                "id": newPersonId,
                "guests": parseInt(newGuestsNumber.value),
                "guestsNames": [],
                "status": newPersonStatus
            })
            
            // console.log('from new person funcyion');
            renderPeopleList(updatedPeopleList)
            
            newPersonName.value = ""
            newGuestsNumber.value = ""
            
            
        }
        setLocalStorage(updatedPeopleList)
        totalGuestsCounter()
    })
}