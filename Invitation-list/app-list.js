
const url = "peopleList.json";

let peopleList = [];

window.addEventListener('DOMContentLoaded', () => {
    const loadingDisplayer = document.querySelector('.loading-displayer');
    loadingDisplayer.classList.add('hide-loading');
    
    
    if (localStorage.getItem('peopleList') != null) {
        console.log('yes, local peopleLists exist');
        
        const peopleList = getDataLocalStorage()
        renderPeopleList(peopleList)
        
    } else {
        
        fetch(url).then(response => response.json().then(peopleListAjax => {
            console.log(peopleListAjax, "ajax request");

            setLocalStorage(peopleListAjax);
         
            renderPeopleList(peopleListAjax)
           
        }));
    }
});

let letLocalDataStorage = getDataLocalStorage()

changePeopleStatus()

updateNewUser()


function setLocalStorage(dataObj){
    localStorage.setItem('peopleList', JSON.stringify(dataObj));
}

function getDataLocalStorage() {
     
     return JSON.parse(localStorage.getItem('peopleList'));
}

function renderPeopleList(dataObj) {
    let people = dataObj;
    if (typeof dataObj == "function"){
        people = getDataLocalStorage();
    }
    
    const peopleListTag = document.getElementsByClassName('people-list')[0];

    peopleListTag.innerHTML = '';
    
    people.forEach(person => {
        const userLi = `<li data-people="${person.status}" data-id="${person.id}" class="people-row">
        <div class="checkbox">
        <i class="fas fa-check checkbox-confirmed"></i>
        <i class="fas fa-times checkbox-denied"></i>
        </div>
        <span class="people-name">${person.name}</span>
        <span class="people-guests">${person.guests}</span>
        <div class="people-row-btn">
        <i class="fa fa-user-plus people-add-icon" aria-hidden="true" ></i>
        <i class="fas fa-user-minus people-delete-icon data-id="${person.id}"></i>
        </div>
        </li>`;
        peopleListTag.innerHTML += userLi;
    });
}

function changePeopleStatus() {
    const peopleForm = document.getElementsByClassName('people-list')[0];
    peopleForm.addEventListener('click', (e)=>{
        if(e.target.classList.contains("people-delete-icon")){
            const deleteBtn = e.target;

            let currentPerson = deleteBtn.parentElement.parentElement;
console.log(currentPerson);
            const currentPersonStatus = currentPerson.getAttribute('data-people')
           
            if (currentPersonStatus == "true") {
                currentPerson.removeAttribute(`data-people`);
                currentPerson.setAttribute('data-people', 'false');
                updateLocalStorage(currentPerson);
            }
            else {
                currentPerson.removeAttribute(`data-people`);
                currentPerson.setAttribute('data-people', 'true');

                updateLocalStorage(currentPerson);
            }
        }
    });
};

function updateLocalStorage(user) {
    let updatedPeopleList = getDataLocalStorage();
    console.log(updatedPeopleList, "update function");

    updatedPeopleList.forEach(person => {
        const userId = user.getAttribute('data-id');
        const newStatus = user.getAttribute('data-people');

        if (person['id'] == userId) {
            person['status'] = newStatus;
        }
        localStorage.setItem('peopleList', JSON.stringify(updatedPeopleList));
    });
}


function updateNewUser(){
    const inputAddPeopleForm = document.getElementsByClassName('add-people-container')[0]
    
    inputAddPeopleForm.addEventListener('click',(e)=>{
        let updatedPeopleList = getDataLocalStorage();
        
        if(e.target.classList.contains('add-people-btn')){
                       
            const newGuestsNumber = e.target.parentElement.querySelector('[data-input="guests"]')
            const newPersonName = e.target.parentElement.querySelector('[data-input="people"]')
            const newPersonId = updatedPeopleList[updatedPeopleList.length - 1].id + 1
            const newPersonStatus = "true";

            updatedPeopleList.push({
                "name": newPersonName.value,
                "id": newPersonId,
                "guests": newGuestsNumber.value,
                "status": newPersonStatus
            })
      
            renderPeopleList(updatedPeopleList)

            newPersonName.value = ""
            newGuestsNumber.value = ""

            localStorage.setItem('peopleList', JSON.stringify(updatedPeopleList))

        }
    })
}
