import { renderPeopleList } from "./renderPeopleList.js";
import { getDataLocalStorage, updateLocalStorage } from "./localStorage.js";
import { totalGuestsCounter } from "./total-guests-counter.js";


export function editPerson(){
    const peopleListTag = document.getElementsByClassName('people-list')[0];
    peopleListTag.addEventListener('click', (e)=>{
        const person = e.target.parentElement.parentElement
        const personName = person.querySelector('.people-name').textContent;
        if(e.target.classList.contains('people-delete-icon')){
            if(deletePersonAlert(personName) === true) {
                deletePerson(person)
            } 
            

        }
        if(e.target.classList.contains('people-add-icon')){
            console.log(e.target, 'add');

        }
    })
}

function deletePerson(person){
    person.remove();
    updateLocalStorage(person, null,"remove")
    renderPeopleList(getDataLocalStorage)
    totalGuestsCounter()
}

function editGuests(){
//add secondary guests names
}

function deletePersonAlert(person){
//alert before delete primary guest
return confirm(`Do you want delete ${person}?`)

}