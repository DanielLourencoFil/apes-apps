//set data in localStorage
export function setLocalStorage(dataObj){
    localStorage.setItem('peopleList', JSON.stringify(dataObj));
}
//get data from localStorage
export function getDataLocalStorage() {
     return JSON.parse(localStorage.getItem('peopleList'));
}
// uptade diferent data values in local Storage based 
export function updateLocalStorage(currentPerson, currentPersonData, toUpDate) {
    let updatedPeopleList = getDataLocalStorage();
    updatedPeopleList.forEach(person => {
        const userId = parseInt(currentPerson.getAttribute('data-id'));
        ;
        console.log(userId);

        // select guest in localdata array based on id rendered in <li> tag on DOM
        if(person['id'] == userId){
        
            if(toUpDate == "add new guest secondary guests"){
                person.guestsNames = currentPersonData
                console.log(person, "yes");
                console.log(currentPersonData);
            }

            //updated value based on string sent as a parameter
            if (toUpDate === "status") {
                person['status'] = parseInt(currentPersonData.getAttribute('data-status'));
            }
            
            if(toUpDate === "remove primary guest"){
                updatedPeopleList.splice(updatedPeopleList.indexOf(person), 1)
            }
            
            if(toUpDate == "remove secondary guest"){
               if(person.guests > 1){person.guests --};
                
               person['guestsNames'].forEach(guest=>{
                   if(guest.idGuest == currentPersonData){
                    const guestIndex = person['guestsNames'].indexOf(guest); 
                       person['guestsNames'].splice(guestIndex, 1)
                   }
               })
            }

            if(toUpDate === "edit guest"){
           // array with 2: primary guest name edit
                if(currentPersonData.length == 2){
                    console.log('1111111111111', currentPersonData);
                    person.name = currentPersonData[0]
                }
            
           // array with 3: secondary guest name edit
                if(currentPersonData.length == 3){
                    console.log('333333333333', currentPersonData);
                    for(let guest of person.guestsNames){
                        if(guest.idGuest == currentPersonData[2]){
                            guest.name = currentPersonData[0]
                        };
                    }
                }
            }
        }
        setLocalStorage(updatedPeopleList)
    });
}
