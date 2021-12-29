export function setLocalStorage(dataObj){
    localStorage.setItem('peopleList', JSON.stringify(dataObj));
}

export function getDataLocalStorage() {
     
     return JSON.parse(localStorage.getItem('peopleList'));
}

export function updateLocalStorage(currentPerson, currentPersonStatus, toUpdate) {
    let updatedPeopleList = getDataLocalStorage();
    
    updatedPeopleList.forEach(person => {
        const userId = parseInt(currentPerson.getAttribute('data-id'));
        ;
        
        if(person['id'] == userId){
            if (toUpdate === "status") {
                person['status'] = parseInt(currentPersonStatus.getAttribute('data-status'));
            }
            
            if(toUpdate === "remove primary guest"){
                console.log(updatedPeopleList.indexOf(person));
                updatedPeopleList.splice(updatedPeopleList.indexOf(person), 1)
                
                // console.log('i will remove');
            }
            
            if(toUpdate === "remove secondary guest"){

                console.log(toUpdate, "from update function");
                
                person.guests = (person.guests > 0) ? person.guests -1: 0;
                const primaryGuestIndex = updatedPeopleList.indexOf(person)
                const secondaryGuestName = currentPerson.querySelector('.people-name').value;
                const secondaryGuestNameIndex = person['guestsNames'].indexOf(secondaryGuestName);
                const secondaryGuestsNamesList = updatedPeopleList[primaryGuestIndex]['guestsNames'];
                
                // console.log(secondaryGuestNameIndex);
                // console.log(secondaryGuestsNamesList);
                
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