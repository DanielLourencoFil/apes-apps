export function setLocalStorage(dataObj){
    localStorage.setItem('peopleList', JSON.stringify(dataObj));
}


export function getDataLocalStorage() {
     
     return JSON.parse(localStorage.getItem('peopleList'));
}

export function updateLocalStorage(currentPerson, currentPersonStatus, status) {
    let updatedPeopleList = getDataLocalStorage();
    // console.log(updatedPeopleList, currentPersonStatus, status, "update function");
    
    updatedPeopleList.forEach(person => {
        const userId = parseInt(currentPerson.getAttribute('data-id'));
        
        
        if (person['id'] == userId) {
            person['status'] = parseInt(currentPersonStatus.getAttribute('data-status'));
            // console.log(currentPersonStatus.getAttribute('data-status'));
           
        }
        setLocalStorage(updatedPeopleList)
    });
}