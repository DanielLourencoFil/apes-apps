import { renderPeopleList, renderSecondaryGuestsList} from "./renderPeopleList.js";
import { getDataLocalStorage, updateLocalStorage } from "./localStorage.js";
import { totalGuestsCounter } from "./total-guests-counter.js";


export function editPerson(indexList){
    const peopleListTag = document.getElementsByClassName('people-list')[indexList];
    
    peopleListTag.addEventListener('click', (e)=>{
        const person = e.target.parentElement.parentElement
       
       // person.disabled = true;

        const personName = person.querySelector('.people-name').value;
        if(e.target.classList.contains('people-delete-icon')){
            console.log("deleteeeeeeeeeeeeeeeeeeee");
            if(deletePersonAlert(personName) === true) {
                deletePerson(person, indexList)
            } 
            

        }
        if(e.target.classList.contains('people-add-icon')){
            console.log('iiiiiiiiiiii');
            const person = e.target.parentElement.parentElement
            
        renderSecondaryGuestsList(person)
        
        const personNameInput = person.getElementsByClassName('people-name')[0];
        // console.log(personNameInput[0]);
        const personName = person.querySelector('.people-name').value;
        
        // personNameInput.classList.add('show-input-name')
        // personNameInput.disabled = false;
        console.log(personNameInput);
        console.log(personNameInput.disabled);
        // personNameInput.focus()


        }
    })
}


function deletePerson(person, indexList){
    // console.log(person, 'from secondary');
    let toUpDate = "";
    // console.log(indexList);
    
    if(indexList == 0){
        toUpDate = "remove primary guest"
    }
    if(indexList == 1){
        toUpDate = "remove secondary guest"
        console.log(person, "delete", toUpDate)
        updateLocalStorage(person, null, toUpDate)
        renderSecondaryGuestsList(person)
    }
    // console.log(indexList, toUpDate);
    person.remove();
    updateLocalStorage(person, null, toUpDate)
    totalGuestsCounter()
    renderPeopleList(getDataLocalStorage)
}

function editGuests(){
//add secondary guests names
}

function deletePersonAlert(person){
//alert before delete primary guest
return confirm(`Do you want delete ${person}?`)
}

function addExtraSecondaryGuest(){

}

export function closeSecondaryGuestModal(modal){
    const closeBtn = modal.parentElement.querySelector('.close-secondary-modal')
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
