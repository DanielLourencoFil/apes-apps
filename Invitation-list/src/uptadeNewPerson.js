import { idGenerator } from "./id-generator.js";
import { getDataLocalStorage, setLocalStorage } from "./localStorage.js";
import {renderPeopleList} from './renderPeopleList.js'
import { totalGuestsCounter } from "./total-guests-counter.js";

export function updateNewPerson(){
    const addPeopleForm = document.getElementsByClassName('add-people-container')[0]
    addPeopleForm.addEventListener('click',(e)=>{
        let updatedPeopleList = getDataLocalStorage();
        const addPersonBtn = document.querySelector('.add-people-btn')

        const newGuestsNumber = document.querySelector('[data-input="guests"]') || 0;
        const newPersonName = document.querySelector('[data-input="people"]');
        
        console.log(newGuestsNumber.value);
        if(e.target == addPersonBtn){
            const newPersonId = idGenerator();
            console.log(newPersonId);
            const newPersonStatus = 0;

            console.log(newPersonName);
            if(newPersonName.value == ''){
                 emptyInputAlert(newPersonName)
            }
           
            
            else {
                updatedPeopleList.push({
                "name": newPersonName.value,
                "id": !newPersonId ? 1 :newPersonId,
                // "guests": parseInt(newGuestsNumber.value),
                "guests": (newGuestsNumber.value != "") ? parseInt(newGuestsNumber.value): 0,
                "guestsNames": [],
                "status": newPersonStatus
            })
            
            // console.log('from new person function');
            renderPeopleList(updatedPeopleList)
            
            newPersonName.value = ""
            newGuestsNumber.value = ""
        }
            
        }
         //clean input field if it has a alert message
         if(newPersonName.value){
            
            emptyInputAlert(newPersonName)
        }

        setLocalStorage(updatedPeopleList)
        totalGuestsCounter()
    })
}

function emptyInputAlert(input){
    const alertMessage = "Please, insert the guest name"

//empty input
    if(input.value == ''){
    input.classList.add('input-alert')
    input.value = alertMessage;
}

// input with alert message
if(input.value == alertMessage && input === document.activeElement){
    input.value = ''
    input.classList.remove('input-alert')
}

}

