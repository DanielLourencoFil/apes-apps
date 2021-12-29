import {checkboxChangeStatus, checkboxRenderStatus} from './checkbox.js'
import { getDataLocalStorage } from './localStorage.js';
import  {idGenerator} from './id-generator.js'
import { closeSecondaryGuestModal } from './edit-person.js';
// import { totalGuestsCounter } from './total-guests-counter.js';


export function renderPeopleList(dataObj) {
    let peopleList = dataObj;
    if (typeof dataObj == "function"){
        peopleList = getDataLocalStorage();
    }
        
    const peopleListTag = document.getElementsByClassName('people-list')[0];
  
    peopleListTag.innerHTML = '';
    
    peopleList.forEach(person => {
        // const guestsNumber = person['guestsNames'].length + 1;  // extra code ${person.guests > 1? person.guests: guestsNumber}
        // console.log(guestsNumber);
        // console.log(person.guests);
        //number for list order and quantity of primary guests
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

export function renderSecondaryGuestsList(person){
    const id = person.getAttribute('data-id')
    const peopleList = getDataLocalStorage();
    // const secondaryGuestList = document.querySelector('.secondary-guests-list')
    const secondaryGuestList = document.getElementsByClassName('secondary-guests-list')[0]
    // console.log(secondaryGuestList);
    //secondary guest list clean content
    // secondaryGuestList.innerHTML = '';
    secondaryGuestList.innerHTML = "";

    //show secondary guests modal
    secondaryGuestList.parentElement.classList.add('secondary-guests-show') 
    // debugger
    peopleList.forEach(person =>{
        if(person.id == id){
        // const secondaryGuestId =  idGenerator();   
                
        const secondaryGuestListLength = person["guestsNames"].length;
        
        // let secondaryGuestLi = "";
        let secondaryGuestLi = `<li data-id="${person.id}" class="people-row-secondary">
        <span class="person-number">${1}.</span>
        <input class="people-name" value="${person.name}"  type="text" disabled="true">
        <div class="people-row-btn people-secondary-btn">
        <i class="fa fa-user-plus people-add-icon" aria-hidden="true" data-id="${person.id}"></i>
        </div>
        </li>`;

        let list = [];
        
        //if guest list is empty create a guest array of menssages with the number of guests informed
        //if ZERO, create array with ONE message  
        if(secondaryGuestListLength == 0){
            const personGuestsNumber = person['guests'] || 1
            for(let i = 0; i < personGuestsNumber; i++){
                const messageEmptyList = `add guest name ${i+1}`; 
                list.push(messageEmptyList)
            }
        }
        else{
            list = person["guestsNames"]
            
        }

        list.forEach(guest =>{

            // console.log(list);
            const personNumber = parseInt(list.indexOf(guest)) + 2;
            secondaryGuestLi += 
            `<li data-id="${person.id}" class="people-row-secondary">
            <span class="person-number">${personNumber}.</span>
            <input class="people-name" type="text" value="${guest}" disabled="true">
            <div class="people-row-btn people-secondary-btn">
            <i class="fa fa-user-plus people-add-icon" aria-hidden="true" data-id="${person.id}"></i>
            <i class="fas fa-user-minus people-delete-icon data-id="${person.id}"></i>
            </div>
            </li>`;

            secondaryGuestList.innerHTML = secondaryGuestLi;
        })
        }
        
    })
    closeSecondaryGuestModal(secondaryGuestList)
}

