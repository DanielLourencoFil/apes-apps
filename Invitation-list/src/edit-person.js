import { renderPeopleList } from "./renderPeopleList.js";
import { getDataLocalStorage, updateLocalStorage } from "./localStorage.js";
import { totalGuestsCounter } from "./total-guests-counter.js";


export function editPerson(){
    const peopleListTag = document.getElementsByClassName('people-list')[0];
    console.log(peopleListTag);
    peopleListTag.addEventListener('click', (e)=>{
        const person = e.target.parentElement.parentElement
        if(e.target.classList.contains('people-delete-icon')){
            
            person.remove();
            updateLocalStorage(person, null,"remove")
            renderPeopleList(getDataLocalStorage)
            totalGuestsCounter()

        }
        if(e.target.classList.contains('people-add-icon')){
            console.log(e.target, 'add');

        }
    })
}

function deletePerson(){

}

function editGuests(){

}