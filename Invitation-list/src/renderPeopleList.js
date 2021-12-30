import {checkboxChangeStatus, checkboxRenderStatus} from './checkbox.js'
import { getDataLocalStorage, updateLocalStorage } from './localStorage.js';
import  {idGenerator} from './id-generator.js'
import { closeSecondaryGuestModal } from './edit-person.js';
// import { totalGuestsCounter } from './total-guests-counter.js';


//----------- RENDER PRIMARY GUEST LIST -------------////
export function renderPeopleList(dataObj) {
    let peopleList = dataObj;
    if (typeof dataObj == "function"){
        peopleList = getDataLocalStorage();
    }
        
    const peopleListTag = document.getElementsByClassName('people-list')[0];
  
    peopleListTag.innerHTML = '';
    
    peopleList.forEach(person => {
        
        const personNumber = parseInt(peopleList.indexOf(person)) + 1
        
        const userLi = `<li data-id="${person.id}" class="people-row">
        <span class="person-number">${personNumber}.</span>
        <div class="checkbox" data-status = "${person.status}">
        <i class="fas fa-check checkbox-confirmed status-confirmed"></i>
        <i class="fas fa-times checkbox-denied status-denied"></i>
        </div>
        <input class="people-name" value="${person.name}"  type="text" disabled>
        <span class="people-guests">${person.guests}</span>
        <div class="people-row-btn">
        <i class="fa fa-user-plus people-add-icon" aria-hidden="true" data-id="${person.id}"></i>
        <i class="fas fa-user-minus people-delete-icon data-id="${person.id}"></i>
        </div>
        </li>`;
        peopleListTag.innerHTML += userLi;
    });
    checkboxRenderStatus()   
}

let counter = 0

//----------- RENDER SECONDARY GUEST LIST -------------//
export function renderSecondaryGuestsList(person){
    const id = person.getAttribute('data-id')
    const peopleList = getDataLocalStorage();
    
    const secondaryGuestList = document.getElementsByClassName('secondary-guests-list')[0]
    
    secondaryGuestList.innerHTML = "";
    
    //------------- Show secondary guests modal 
    secondaryGuestList.parentElement.classList.add('secondary-guests-show') 
  
    //------------- Secondary guests modal HTML structure generator -------------//
    peopleList.forEach(person =>{
        if(person.id == id){
           
            const secondaryGuestListLength = person["guestsNames"].length;
            
            let     guestsList = [];
            let secondaryNewGuestsTemporaryList = [];
            
    //------------- First part of HTML list : contains only primary guest name values
            let guestsListHTML = `<li data-id="${person.id}" class="people-row-secondary">
            <span class="person-number">${1}.</span>
            <input class="people-name" value="${person.name}"  type="text" disabled="true" data-id="${person.id}">
            <div class="people-row-btn people-secondary-btn">
            <i class="fa fa-user-plus people-add-icon" aria-hidden="true" data-id="${person.id}"></i>
            </div>
            </li>`;

    //------------- if guest list is NEW (empty) create a guest array of menssages with the number of guests informed
                    // in the input.
                    //if number is not informed (ZERO), create array with ONE message  
            if(secondaryGuestListLength == 0){
    
    //------------- counter is necessary to mark if user has insert a new primary guest: counter = 1 (YES/TRUE)
                    // if (YES/TRUE) it calls updateLocalStorage function by the end of "secondaryNewGuestsTemporaryList" generation
                    // It is necessary for the new secondary guests (whitout a name yeat) need a id  
                counter++
                if(counter > 1){
                    counter = 0
                }
                let messageEmptyList = {"name":`add guest's name` }; 
                // const personGuestsNumber = person['guests'] || 1
                const personGuestsNumber = (person['guests'] > 1) ? person['guests'] : 1;
                console.log(personGuestsNumber);
                if(personGuestsNumber > 2){
                    for(let i = 1; i < personGuestsNumber-1; i++){
                        messageEmptyList = {"name":`add guest's name ${i}` }
                        guestsList.push(messageEmptyList)
                    }
                }
                guestsList.push(messageEmptyList)

    }
    //------------- if guest list exist, calls list of guests from primary guest 
            else{
                guestsList = person["guestsNames"]
            }
            console.log(counter, 'counter');
            guestsList.forEach(guest =>{
                let newGuestId = idGenerator()
                
            let personNumber = parseInt(guestsList.indexOf(guest)) + 2;
            guestsListHTML += 
            `<li data-id="${person.id}" class="people-row-secondary">
            <span class="person-number">${personNumber}.</span>
            <input class="people-name" type="text" value="${guest.name}" disabled="true" data-id="${guest.idGuest || newGuestId}">
            <div class="people-row-btn people-secondary-btn">
            <i class="fa fa-user-plus people-add-icon" aria-hidden="true" data-id="${guest.idGuest || newGuestId}"></i>
            <i class="fas fa-user-minus people-delete-icon data-id="${guest.idGuest || newGuestId}"></i>
            </div>
            </li>`;
            secondaryNewGuestsTemporaryList.push({"name": "add guest name", "idGuest": newGuestId})
            secondaryGuestList.innerHTML = guestsListHTML;
            // console.log(guestsListHTML);
        })
    //------------- if guest list is NEW (empty) : counter == 1 (YES/TRUE)  update LocalStorage 
    console.log(counter);
        if(counter == 1 && secondaryGuestListLength == 0){
            counter = 0;
            person.guestsNames = secondaryNewGuestsTemporaryList;
            const currentPerson = document.querySelector(`[data-id="${person.id}"]`);
            const toUpDate = "add new guest secondary guests"
            updateLocalStorage(currentPerson, secondaryNewGuestsTemporaryList, toUpDate)
        }
    }
})
    closeSecondaryGuestModal(secondaryGuestList)
}

