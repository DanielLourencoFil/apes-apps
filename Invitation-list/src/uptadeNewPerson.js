import { idGenerator } from "./id-generator.js";
import { getDataLocalStorage, setLocalStorage } from "./localStorage.js";
import {renderPeopleList} from './renderPeopleList.js'
import { totalGuestsCounter } from "./total-guests-counter.js";
import {emptyInputAlert} from "./empty-input.js"

export function updateNewPerson(){
    const addPeopleForm = document.getElementsByClassName('add-people-container')[0]
    addPeopleForm.addEventListener('click',(e)=>{
        let updatedPeopleList = getDataLocalStorage();
        const addPersonBtn = document.querySelector('.add-people-btn')

        const newGuestsNumber = document.querySelector('[data-input="guests"]') || 0;
        const newPersonName = document.querySelector('[data-input="people"]');
        const alertMessage = "Please, insert the guest name";
        
        console.log(newGuestsNumber.value);
        if(e.target == addPersonBtn){
            const newPersonId = idGenerator();
            // console.log(newPersonId);
            const newPersonStatus = 0;

            console.log(newPersonName);
            if(newPersonName.value == ''){
                 emptyInputAlert(newPersonName, alertMessage)
            }
           
            
            else {
                updatedPeopleList.push({
                "name": newPersonName.value,
                "id": newPersonId,
                "guests": (newGuestsNumber.value == "") ? 1 : parseInt(newGuestsNumber.value),
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
            
            emptyInputAlert(newPersonName, alertMessage)
        }

        setLocalStorage(updatedPeopleList)
        totalGuestsCounter()
    })
}



