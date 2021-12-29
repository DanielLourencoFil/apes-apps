export function setLocalStorage(dataObj){
    localStorage.setItem('peopleList', JSON.stringify(dataObj));
}

export function getDataLocalStorage() {
     return JSON.parse(localStorage.getItem('peopleList'));
}

export function updateLocalStorage(currentPerson, currentPersonData, toUpDate) {
    let updatedPeopleList = getDataLocalStorage();
    updatedPeopleList.forEach(person => {
        const userId = parseInt(currentPerson.getAttribute('data-id'));
        ;
        
        if(person['id'] == userId){
            if (toUpDate === "status") {
                person['status'] = parseInt(currentPersonData.getAttribute('data-status'));
            }
            
            if(toUpDate === "remove primary guest"){
                updatedPeopleList.splice(updatedPeopleList.indexOf(person), 1)
            }
            
            if(toUpDate == "remove secondary guest"){
               person.guests --;
               person['guestsNames'].forEach(guest=>{
                   if(guest.idGuest == currentPersonData){
                    //    console.log(person['guestsNames'].indexOf(guest));
                    const guestIndex = person['guestsNames'].indexOf(guest); 
                       person['guestsNames'].splice(guestIndex, 1)
                   }
              
               })
               console.log();
                // const primaryGuestIndex = updatedPeopleList.indexOf(person)
                // const primaryGuestIndex = updatedPeopleList[0]
                // console.log(primaryGuestIndex);
                // const secondaryGuestName = currentPerson.getElementsByClassName('people-name')[0].value;
                // const secondaryGuestNameIndex = person['guestsNames'].indexOf(secondaryGuestName);
                // const secondaryGuestsNamesList = updatedPeopleList[primaryGuestIndex]['guestsNames'];
     
                // console.log(secondaryGuestNameIndex);
                // secondaryGuestsNamesList.splice(secondaryGuestNameIndex, 1)
            }
            /*if(toUpDate === "edit guest"){
                console.log(updatedPeopleList);
                console.log(currentPersonData); // to be updated
                
                console.log(person.name); 
                
                for(let guest of updatedPeopleList){
                    if(guest.name == person.name){
                        console.log(guest, 'yes');
                    };
                }


                // const primaryGuestIndex = updatedPeopleList.indexOf(person.name)
                // const secondaryGuestName = currentPerson.getElementsByClassName('people-name')[0].value;
                // const secondaryGuestNameIndex = person['guestsNames'].indexOf(secondaryGuestName);
                // const secondaryGuestsNamesList = updatedPeopleList[primaryGuestIndex]['guestsNames'];
     
                // console.log(primaryGuestIndex);
                // console.log(secondaryGuestNameIndex);
                // secondaryGuestsNamesList.splice(secondaryGuestNameIndex, 1)
            }*/
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