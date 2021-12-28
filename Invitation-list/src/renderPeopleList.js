import {checkboxChangeStatus, checkboxRenderStatus} from './checkbox.js'
import { getDataLocalStorage } from './localStorage.js';
// import { totalGuestsCounter } from './total-guests-counter.js';

export function renderPeopleList(dataObj) {
    let people = dataObj;
    if (typeof dataObj == "function"){
        people = getDataLocalStorage();
    }
        
    const peopleListTag = document.getElementsByClassName('people-list')[0];
  
    peopleListTag.innerHTML = '';
    
    people.forEach(person => {
        //number for list order and quantity of primary guests
        const personNumber = parseInt(people.indexOf(person)) + 1
        
        const userLi = `<li data-id="${person.id}" class="people-row">
        <span class="person-number">${personNumber}.</span>
        <div class="checkbox" data-status = "${person.status}">
        <i class="fas fa-check checkbox-confirmed status-confirmed"></i>
        <i class="fas fa-times checkbox-denied status-denied"></i>
        </div>
        <span class="people-name">${person.name}</span>
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