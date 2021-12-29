export function setLocalStorage(dataObj){
    localStorage.setItem('peopleList', JSON.stringify(dataObj));
}

export function getDataLocalStorage() {
     return JSON.parse(localStorage.getItem('peopleList'));
}

export function updateLocalStorage(currentPerson, currentPersonData, toUpdate) {
    let updatedPeopleList = getDataLocalStorage();
    
    updatedPeopleList.forEach(person => {
        const userId = parseInt(currentPerson.getAttribute('data-id'));
        ;
        
        if(person['id'] == userId){
            if (toUpdate === "status") {
                person['status'] = parseInt(currentPersonData.getAttribute('data-status'));
            }
            
            if(toUpdate === "remove primary guest"){
                console.log(updatedPeopleList.indexOf(person));
                updatedPeopleList.splice(updatedPeopleList.indexOf(person), 1)
            }
            
            if(toUpdate === "remove secondary guest"){
                person.guests = person.guests - 1;
               
                const primaryGuestIndex = updatedPeopleList.indexOf(person)
                const secondaryGuestName = currentPerson.getElementsByClassName('people-name')[0].value;
                const secondaryGuestNameIndex = person['guestsNames'].indexOf(secondaryGuestName);
                const secondaryGuestsNamesList = updatedPeopleList[primaryGuestIndex]['guestsNames'];
     
                console.log(secondaryGuestNameIndex);
                secondaryGuestsNamesList.splice(secondaryGuestNameIndex, 1)
            }
            if(toUpdate === "edit guest"){
                console.log(updatedPeopleList);
                console.log(currentPersonData); // to be updated
                
                console.log(person.name);
                


                
                for(let guest of updatedPeopleList){
                    if(guest.name == person.name){
                        console.log(guest, 'yes');
                    
                    


                    };
                }


                const primaryGuestIndex = updatedPeopleList.indexOf(person.name)
                const secondaryGuestName = currentPerson.getElementsByClassName('people-name')[0].value;
                const secondaryGuestNameIndex = person['guestsNames'].indexOf(secondaryGuestName);
                // const secondaryGuestsNamesList = updatedPeopleList[primaryGuestIndex]['guestsNames'];
     
                // console.log(primaryGuestIndex);
                // console.log(secondaryGuestNameIndex);
                // secondaryGuestsNamesList.splice(secondaryGuestNameIndex, 1)
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