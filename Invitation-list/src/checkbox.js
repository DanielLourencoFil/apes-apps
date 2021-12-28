import { updateLocalStorage } from "./localStorage.js";
import { totalGuestsCounter } from "./total-guests-counter.js";

//  CHECKBOX CHANCE STATUS

export function checkboxChangeStatus(){
    const peopleList = document.querySelector('.people-list')
    
    peopleList.addEventListener('click', (e) =>{
        // debugger
        const checkbox = [...document.getElementsByClassName('checkbox')];
        const checkboxCurrent = checkbox[checkbox.indexOf(e.target.parentElement)];
        // console.log(checkboxCurrent);
        
        if(e.target.parentElement == checkboxCurrent){
            const checkboxStatus = parseInt(checkboxCurrent.getAttribute('data-status'))
            const checkboxConfirmed = checkboxCurrent.getElementsByClassName('checkbox-confirmed')[0]
            const checkboxDenied = checkboxCurrent.getElementsByClassName('checkbox-denied')[0]
            
            const currentPerson = checkboxCurrent.parentElement.querySelector('.people-name');
            const currentGuestsNumber = checkboxCurrent.parentElement.querySelector('.people-guests');

            if(checkboxStatus == 0){
                checkboxConfirmed.classList.add('checkbox-icon-show')
                checkboxCurrent.setAttribute('data-status', 1)              
                
                currentPerson.classList.add('status-confirmed')
                currentGuestsNumber.classList.add('status-confirmed')
               
                
                updateLocalStorage(checkboxCurrent.parentElement, checkboxCurrent, checkboxStatus)
            }
            if(checkboxStatus == 1){
                checkboxDenied.classList.add('checkbox-icon-show')
                checkboxCurrent.setAttribute('data-status', 2)
                checkboxConfirmed.classList.remove('checkbox-icon-show')
                
                currentPerson.classList.remove('status-confirmed')
                currentGuestsNumber.classList.remove('status-confirmed')

                currentPerson.classList.add('status-denied')
                currentGuestsNumber.classList.add('status-denied')
                
                updateLocalStorage(checkboxCurrent.parentElement, checkboxCurrent)
                totalGuestsCounter()
            }
            if(checkboxStatus == 2){
                checkboxDenied.classList.remove('checkbox-icon-show')
                checkboxCurrent.setAttribute('data-status', 0)
                
                 currentPerson.classList.remove('status-denied')
                currentGuestsNumber.classList.remove('status-denied')

                updateLocalStorage(checkboxCurrent.parentElement, checkboxCurrent)
            }
        }
    })
    checkboxRenderStatus()
    
} 

//  CHECKBOX RENDER CHANCE STATUS
export function checkboxRenderStatus(){

    const checkbox = [...document.getElementsByClassName('checkbox')];
    
    checkbox.forEach(box=>{
        const checkboxConfirmed = box.querySelector('.checkbox-confirmed')
        const checkboxDenied = box.querySelector('.checkbox-denied')
        
        const currentPerson = box.parentElement.querySelector('.people-name');
        const currentGuestsNumber = box.parentElement.querySelector('.people-guests');

        
        if(box.getAttribute('data-status') == 1){
            checkboxConfirmed.classList.add('checkbox-icon-show')
            currentPerson.classList.add('status-confirmed')
                currentGuestsNumber.classList.add('status-confirmed')
        }
        if(box.getAttribute('data-status') == 2){
            checkboxDenied.classList.add('checkbox-icon-show')
            currentPerson.classList.add('status-denied')
            currentGuestsNumber.classList.add('status-denied')
        }
    
    })
}
