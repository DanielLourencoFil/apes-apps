export function setLocalStorage(dataObj){
    localStorage.setItem('peopleList', JSON.stringify(dataObj));
}

export function getDataLocalStorage() {
     
     return JSON.parse(localStorage.getItem('peopleList'));
}

export function updateLocalStorage(currentPerson, currentPersonStatus, toUpdate) {
    let updatedPeopleList = getDataLocalStorage();
    console.log(toUpdate, "from update function");

    updatedPeopleList.forEach(person => {
        const userId = parseInt(currentPerson.getAttribute('data-id'));
        ;
        
        if(person['id'] == userId){
            if (toUpdate === "status") {
                person['status'] = parseInt(currentPersonStatus.getAttribute('data-status'));
            }

            if(toUpdate === "remove"){
                console.log(updatedPeopleList.indexOf(person));
                updatedPeopleList.splice(updatedPeopleList.indexOf(person), 1)
                
                console.log('i will remove');
            }

            if(toUpdate === "remove secondary guest"){
                const primaryGuestIndex = updatedPeopleList.indexOf(person)
                const secondaryGuestName = currentPerson.querySelector('.people-name').textContent;
                const secondaryGuestNameIndex = person['guestsNames'].indexOf(secondaryGuestName);
                const secondaryGuestsNamesList = updatedPeopleList[primaryGuestIndex]['guestsNames'];
                
                secondaryGuestsNamesList.splice(secondaryGuestNameIndex, 1)
                
            }
            
        }
        
    //    console.log(updatedPeopleList);
        setLocalStorage(updatedPeopleList)
    });
}




// export function updateLocalStorage(currentPerson, currentPersonStatus) {
//     let updatedPeopleList = getDataLocalStorage();
//     console.log(updatedPeopleList, currentPersonStatus, "update function");
    
//     updatedPeopleList.forEach(person => {
//         const userId = parseInt(currentPerson.getAttribute('data-id'));
//         
        
//         if (person['id'] == userId) {
//             person['status'] = parseInt(currentPersonStatus.getAttribute('data-status'));
//             // console.log(currentPersonStatus.getAttribute('data-status'));
           
//         }
//         setLocalStorage(updatedPeopleList)
//     });
// }