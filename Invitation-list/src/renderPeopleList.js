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
            
            let guestsList = [];
            let secondaryNewGuestsTemporaryList = [];
            
    //------------- First part of HTML list : contains only primary guest values
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
                // if(counter > 1){
                //     // counter = 0
                // }
                let messageEmptyList = {"name":`add guest's name` }; 
                // const personGuestsNumber = person['guests'] || 1
                const personGuestsNumber = (person['guests'] > 1) ? person['guests'] : 1;
                if(personGuestsNumber >= 2){
                    for(let i = 1; i < personGuestsNumber; i++){
                        messageEmptyList = {"name":`add guest's name ${i}` }
                        guestsList.push(messageEmptyList)
                    }
                }
    }
    //------------- if guest list exist, calls list of guests from primary guest 
            else{
                guestsList = person["guestsNames"]
            }
            
    //------------- Second part of HTML list : contains only secondary guest values
        
        // if secondary guest number is ZERO or there is only 1 guests, render secondary modal with primary guest
        // name only. It permits to edit guest name 
        if(counter == 1 && person.guests == 1 ){
            secondaryGuestList.innerHTML = guestsListHTML;
        } 
        
        // if guest number is greater than 1, render secondary modal with slots for each guest based on the number informed
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
            secondaryNewGuestsTemporaryList.push({guest, "idGuest": newGuestId})
            secondaryGuestList.innerHTML = guestsListHTML;
            // console.log(guestsListHTML);
        })

    //------------- if guest list is NEW (empty) : counter == 1 (YES/TRUE)  update LocalStorage 
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

export function renderNewSecondaryGuest(person){
    console.log(person, 'from new function!!!!');
    // let guestsListHTML = "";
    console.log(person);
    
    const personNumber = person.children.length + 1;
    const primaryGuestId = person.querySelector('[data-id]').getAttribute('data-id');
    const secondaryGuestName = `add guest's name ${personNumber}`
     
    const newGuestId = idGenerator()

    const newSecondaryHTML = 
    `<li data-id="${primaryGuestId}" class="people-row-secondary">
    <span class="person-number">${personNumber}.</span>
    <input class="people-name" type="text" value="${secondaryGuestName}" disabled="true" data-id="${newGuestId}">
    <div class="people-row-btn people-secondary-btn">
    <i class="fa fa-user-plus people-add-icon" aria-hidden="true" data-id="${newGuestId}"></i>
    <i class="fas fa-user-minus people-delete-icon data-id="${newGuestId}"></i>
    </div>
    </li>`;

    person.innerHTML += newSecondaryHTML

    // const toUpDate = "add new guest secondary guests"
    //         updateLocalStorage(person, secondaryNewGuestsTemporaryList, toUpDate)
}