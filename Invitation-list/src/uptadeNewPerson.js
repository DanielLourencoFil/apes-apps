import { idGenerator } from "./id-generator.js";
import { getDataLocalStorage, setLocalStorage } from "./localStorage.js";
import {renderNewSecondaryGuest, renderPeopleList} from './renderPeopleList.js'
import { totalGuestsCounter } from "./total-guests-counter.js";
import {emptyInputAlert} from "./empty-input.js"
import { inputKeyDown } from "./enable-disable-features.js";


export function updateNewPerson(){
    const addPeopleForm = document.getElementsByClassName('add-people-container')[0]
    const addPersonBtn = document.querySelector('.add-people-btn')
    
    const newGuestsNumber = document.querySelector('[data-input="guests"]') || 0;
    const newPersonName = document.querySelector('[data-input="people"]');
    const alertMessage = "Please, insert the guest name";
    
    
    addPeopleForm.addEventListener("keydown", (e)=>{
        let updatedPeopleList = getDataLocalStorage();
        if(e.key === 'Enter' && newGuestsNumber.value == ''){
            emptyInputAlert(newPersonName, alertMessage)              
        }

        if(e.key === 'Enter' && newGuestsNumber.value != ''){
         addPrimaryNewGuest(newPersonName, newGuestsNumber, updatedPeopleList, alertMessage)                 
        }
        
        setLocalStorage(updatedPeopleList)
        totalGuestsCounter()
    })
    
    addPeopleForm.addEventListener('click',(e)=>{
        let updatedPeopleList = getDataLocalStorage();

        if(e.target == addPersonBtn){
            addPrimaryNewGuest(newPersonName, newGuestsNumber, updatedPeopleList, alertMessage)
        }
         //clean input field if it has a alert message
         if(newPersonName.value){
            
            emptyInputAlert(newPersonName, alertMessage)
            inputKeyDown(addPeopleForm); 
        }
        if(!newPersonName.value){
           // what happens if enter or escape are pressed down
           inputKeyDown(addPeopleForm); 
        }

        setLocalStorage(updatedPeopleList)
        totalGuestsCounter()
    })

      //clean input field if it has a alert message
      if(newPersonName.value){
            
        emptyInputAlert(newPersonName, alertMessage)
        inputKeyDown(addPeopleForm); 
    }
    if(!newPersonName.value){
       // what happens if enter or escape are pressed down
       inputKeyDown(addPeopleForm); 
    }

//------------ new secondary guest
let modalSecondaryGuests = document.getElementsByClassName('secondary-guests-container')[0]
    
        modalSecondaryGuests.addEventListener('click', (e)=>{
            
            if(e.target.classList.contains('extra-guest-btn')){
            const currentPerson = e.target.parentElement.getElementsByClassName('secondary-guests-list')[0];
            addNewSecondaryGuest(currentPerson)
        }
    })
}

function addPrimaryNewGuest(inputName, inputNumber, updatePeopleList, alertMessage){

    const newPersonId = idGenerator();

    const newPersonStatus = 0;
    
    if(inputName.value == '' || inputName.value == alertMessage){
            emptyInputAlert(inputName, alertMessage)
    }
    
    else {
            updatePeopleList.push({
            "name": inputName.value,
            "id": newPersonId,
            "guests": (inputNumber.value == "") ? 1 : parseInt(inputNumber.value),
            "guestsNames": [],
            "status": newPersonStatus
        })
    
        renderPeopleList(updatePeopleList)
        
        inputName.value = ""
        inputNumber.value = ""
    }
}

function addNewSecondaryGuest(currentPerson){
    const newSecondaryGuestBtn = document.getElementsByClassName('extra-guest-btn')[0]
    renderNewSecondaryGuest(currentPerson)
}

