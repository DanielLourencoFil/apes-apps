import {checkboxChangeStatus, checkboxRenderStatus} from './checkbox.js'
import { getDataLocalStorage } from './localStorage.js';
import  {idGenerator} from './id-generator.js'
import { closeSecondaryGuestModal } from './edit-person.js';
// import { totalGuestsCounter } from './total-guests-counter.js';


export function renderPeopleList(dataObj) {
    let people = dataObj;
    if (typeof dataObj == "function"){
        people = getDataLocalStorage();
    }
        
    const peopleListTag = document.getElementsByClassName('people-list')[0];
  
    peopleListTag.innerHTML = '';
    
    people.forEach(person => {
        const guestsNumber = person['guestsNames'].length;
        // console.log(guestsNumber);
        // console.log(person.guests);
        //number for list order and quantity of primary guests
        const personNumber = parseInt(people.indexOf(person)) + 1
        
        const userLi = `<li data-id="${person.id}" class="people-row">
        <span class="person-number">${personNumber}.</span>
        <div class="checkbox" data-status = "${person.status}">
        <i class="fas fa-check checkbox-confirmed status-confirmed"></i>
        <i class="fas fa-times checkbox-denied status-denied"></i>
        </div>
        <span class="people-name">${person.name}</span>
        <span class="people-guests">${(guestsNumber == 0) ? person.guests : guestsNumber}</span>
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
    const secondaryGuestList = document.querySelector('.secondary-guests-list')
    
    //show secondary guests modal
    secondaryGuestList.parentElement.classList.add('secondary-guests-show') 
    
    peopleList.forEach(person =>{
        if(person.id == id){
        // const secondaryGuestId =  idGenerator();   
        let personNumber = 1;
        
        const emptySecondaryGuestList = person["guestsNames"].length == 0;

        let list = [];
        
        //if guest list is empty create a guest array of menssages with the num of guests informed
        //if ZERO, create array with ONE message  
        if(emptySecondaryGuestList){
            const messageEmptyList = "add guest name"; 
            const personGuestsNumber = person['guests'] || 1
            for(let i = 0; i < personGuestsNumber; i++){
                list.push(messageEmptyList)
            }
        }
        else{
            list = person["guestsNames"]
        }

        list.forEach(guest =>{
                      
            const secondaryGuestLi = 
            `<li data-id="${person.id}" class="people-row-secondary">
            <span class="person-number">${personNumber++}.</span>
            <span class="people-name">${guest}</span>
            <div class="people-row-btn people-secondary-btn">
            <i class="fa fa-user-plus people-add-icon" aria-hidden="true" data-id="${person.id}"></i>
            <i class="fas fa-user-minus people-delete-icon data-id="${person.id}"></i>
            </div>
            </li>`;

            secondaryGuestList.innerHTML += secondaryGuestLi;
        })
        }
    })
    closeSecondaryGuestModal(secondaryGuestList)
}

