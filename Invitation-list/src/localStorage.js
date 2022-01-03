import { totalGuestsCounter } from "./total-guests-counter.js";

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

        // select guest in localdata array based on id rendered in <li> tag on DOM
        if(person['id'] == userId){
        
            if(toUpDate == "add new guest secondary guests"){
                person.guestsNames = currentPersonData
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
                    person.name = currentPersonData[0]
                }
            
           // array with 3: secondary guest name edit
                if(currentPersonData.length == 3){
                    
                    const secondaryGuest = person.guestsNames.findIndex(element => element.idGuest === currentPersonData[2])
                    console.log(secondaryGuest, 'okkkkkkkkkk');
                    
                    if(secondaryGuest === -1){
                        person.guestsNames.push({"name": currentPersonData[0], "idGuest": currentPersonData[2]});
                        person.guests = person.guests + 1
                    }
                    if(secondaryGuest > -1){
                        person.guestsNames[secondaryGuest].name = currentPersonData[0];
                        person.guestsNames[secondaryGuest].idGuest = currentPersonData[2];
                    }
                }
            }
        }
        setLocalStorage(updatedPeopleList)
        totalGuestsCounter()
    });
}
