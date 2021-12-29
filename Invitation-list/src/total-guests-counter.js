import { getDataLocalStorage } from "./localStorage.js";

export function totalGuestsCounter(){
    const peopleList = getDataLocalStorage()
    let totalGuestsNumber = 0;

    peopleList.forEach(guest => {
    if(guest['status'] != 2){
        totalGuestsNumber += guest['guests'];
    }
    });
    
    renderTotalGuestNumber(totalGuestsNumber)

}

function renderTotalGuestNumber(number){
    const displayerTotalGuestsNumber = document.getElementById('total-guests-number')
    displayerTotalGuestsNumber.textContent = number
}

