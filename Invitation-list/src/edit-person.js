import { renderPeopleList, renderSecondaryGuestsList} from "./renderPeopleList.js";
import { getDataLocalStorage, updateLocalStorage } from "./localStorage.js";
import { totalGuestsCounter } from "./total-guests-counter.js";


export function editPerson(indexList){
    let peopleListTag = document.getElementsByClassName('people-list')[indexList];
    
    peopleListTag.addEventListener('click', (e)=>{
        let person = e.target.parentElement.parentElement;
        
        let personName = person.getElementsByClassName('people-name')[0].value;
        
        if(e.target.classList.contains('people-delete-icon')){
            if(deletePersonAlert(personName) === true) {
               
                deletePerson(person, indexList)
            } 
        }
        
        if(e.target.classList.contains('people-add-icon')){
        const toUpDate = "edit guest";       
        
        // CALL function only if calling is made from primary guest list : avoid bug - li is freezed! 
        if(indexList == 0){
        renderSecondaryGuestsList(person)
        }    
// console.log(indexList);
        person = e.target.parentElement.parentElement;
        let personNameInput = person.getElementsByClassName('people-name')[0];
        let personName = personNameInput.value; 

        let personId = person.getAttribute('data-id');
        // let personSecondaryId = person.getAttribute('data-id')
        personNameInput.disabled = false;
        personNameInput.focus();
        
        // console.log(personId);
        // console.log(personSecondaryId);

        // console.log(person, indexList);
        
        // console.log(personName);
        updateLocalStorage(person, personName, toUpDate);

        }
    })
}


function deletePerson(person, indexList){
    let toUpDate = "";
    console.log(person);
    console.log(indexList);
    if(indexList == 0){
        toUpDate = "remove primary guest"
        updateLocalStorage(person, null, toUpDate)
    }
    if(indexList == 1){
        toUpDate = "remove secondary guest"
        console.log(person, "delete", toUpDate)
        person.remove();
        console.log(person);
        const secondaryGuestId = person.querySelector('.people-name').getAttribute('data-id');
        console.log(secondaryGuestId);
        updateLocalStorage(person, secondaryGuestId, toUpDate)
        renderSecondaryGuestsList(person)
    }
    // console.log(indexList, toUpDate);
    person.remove();
    // renderSecondaryGuestsList(person)
    totalGuestsCounter()
    renderPeopleList(getDataLocalStorage)
}


function editGuests(){
//add secondary guests names
console.log('add secondary guest Extra');

}

function addExtraSecondaryGuest(){
console.log('add Extra');
}


function deletePersonAlert(person){
//alert before delete primary guest
return confirm(`Do you want delete ${person}?`)
}


export function closeSecondaryGuestModal(modal){
    const closeBtn = modal.parentElement.getElementsByClassName('close-secondary-modal')[0]
    closeBtn.addEventListener('click', (e)=>{
        if(e.target.classList.contains('close-secondary-modal')){
            //hide secondary guests modal
            modal.parentElement.classList.remove('secondary-guests-show')
            
            //clean secondary guest list content
            modal.innerHTML = ''

        }
    })
}



// CAN BE DELETED
// export function editSecondaryPerson(indexList){
//     const peopleListTag = document.getElementsByClassName('people-list')[indexList];
    
//     peopleListTag.addEventListener('click', (e)=>{
//         const person = e.target.parentElement.parentElement;
//         const personName = person.querySelector('.people-name').textContent;
//         // console.log(person);
        
//         if(e.target.classList.contains('people-delete-icon')){
//             if(deletePersonAlert(personName) === true) {
//                 deletePerson(person, indexList, e.target )
//                 console.log(e.target);
//             } 
            

//         }
//         if(e.target.classList.contains('people-add-icon')){
//             renderSecondaryGuestsList(e.target)
//             // console.log(e.target, 'add');

//         }
//     })
// }
