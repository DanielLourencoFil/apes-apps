export function setLocalStorage(dataObj){
    localStorage.setItem('peopleList', JSON.stringify(dataObj));
}


export function getDataLocalStorage() {
     
     return JSON.parse(localStorage.getItem('peopleList'));
}

export function updateLocalStorage(currentPerson, currentPersonStatus, toUpdate) {
    let updatedPeopleList = getDataLocalStorage();
    console.log(updatedPeopleList, currentPerson, "update function");

    updatedPeopleList.forEach(person => {
        const userId = parseInt(currentPerson.getAttribute('data-id'));
        ;
        
        if(person['id'] == userId){
            if (toUpdate === "status") {
                person['status'] = parseInt(currentPersonStatus.getAttribute('data-status'));
                // console.log('checkbox update');  
            }
            if(toUpdate === "remove"){
                console.log(updatedPeopleList.indexOf(person));
                updatedPeopleList.splice(updatedPeopleList.indexOf(person), 1)
                
                console.log('i will remove');
            }
        }
        
       console.log(updatedPeopleList);
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