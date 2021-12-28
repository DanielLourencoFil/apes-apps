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
        
        // console.log(e.target);
        if(e.target == addPersonBtn){
            const newPersonId = updatedPeopleList[updatedPeopleList.length - 1].id + 1 ? updatedPeopleList[updatedPeopleList.length - 1].id + 1 : 1;
            console.log(newPersonId);
            const newPersonStatus = 0;

            console.log(newPersonName);
            if(newPersonName.value == ''){
                 emptyInputAlert(newPersonName)
            }
           
            
            else {
                updatedPeopleList.push({
                "name": newPersonName.value,
                "id": newPersonId ? newPersonId : 1,
                "guests": parseInt(newGuestsNumber.value),
                "guestsNames": [],
                "status": newPersonStatus
            })
            
            // console.log('from new person funcyion');
            renderPeopleList(updatedPeopleList)
            
            newPersonName.value = ""
            newGuestsNumber.value = ""
        }
            
        }
         //clean input field if it has a alert
         if(newPersonName.value){
            
            emptyInputAlert(newPersonName)
        }

        setLocalStorage(updatedPeopleList)
        totalGuestsCounter()
    })
}

function emptyInputAlert(input){
    const alertMessage = "Please, insert the guest name"
if(input.value == ''){
    input.classList.add('input-alert')
    input.value = alertMessage;
}
if(input.value == alertMessage && input === document.activeElement){
    input.value = ''
    input.classList.remove('input-alert')
}

}

// function inputFocus(input, alert){
//     if(input === document.activeElement && input.value == alertMessage){
//         console.log(input.value, "cleaning input");
//         input.value = ''
//         input.classList.remove('input-alert')
//     }
// }