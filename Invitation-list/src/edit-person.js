import { renderPeopleList, renderSecondaryGuestsList} from "./renderPeopleList.js";
import { getDataLocalStorage, updateLocalStorage } from "./localStorage.js";
import { totalGuestsCounter } from "./total-guests-counter.js";


export function editPerson(indexList){
    let peopleListTag = document.getElementsByClassName('people-list')[indexList];
    
    peopleListTag.addEventListener('click', (e)=>{
        let person = e.target.parentElement.parentElement;

        console.log(person, indexList);
        
        // person.disabled = true;
        
        // const personName = person.querySelector('.people-name').value;
        let personName = person.getElementsByClassName('people-name')[0].value;
        if(e.target.classList.contains('people-delete-icon')){
            // console.log("deleteeeeeeeeeeeeeeeeeeee");
            if(deletePersonAlert(personName) === true) {
                deletePerson(person, indexList)
            } 
        }
        
        if(e.target.classList.contains('people-add-icon')){
        // console.log(person, indexList);

        // let functionCallCounter = 0;
        // console.log(functionCallCounter === 0);
        
        // CALL function only if calling is made from primary guest list : avoid bug - li is freezed! 
        if(indexList == 0){
        renderSecondaryGuestsList(person)
        console.log("calling render function");
        }    
            
        person = e.target.parentElement.parentElement;
        // renderSecondaryGuestsList(person)
        // console.log(person.getElementsByClassName('people-name'), 'person');
                
        let personNameInput = person.getElementsByClassName('people-name')[0];
        let personName = personNameInput.value; // change to personNameInput
        personNameInput.disabled = false;
        personNameInput.focus();
        
        console.log(person, indexList);
        
        console.log(personNameInput, personName);
        

        // const personName = person.getElementsByClassName('people-name')[0].value; // change to personNameInput
        // console.log(personName);
        
        // personNameInput.classList.add('show-input-name')
        // personNameInput.disabled = false;
        // console.log(personNameInput);
        // console.log(personNameInput.disabled);
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
        updateLocalStorage(person, null, toUpDate)
    }
    if(indexList == 1){
        toUpDate = "remove secondary guest"
        // console.log(person, "delete", toUpDate)
        updateLocalStorage(person, null, toUpDate)
        renderSecondaryGuestsList(person)
    }
    // console.log(indexList, toUpDate);
    person.remove();
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
