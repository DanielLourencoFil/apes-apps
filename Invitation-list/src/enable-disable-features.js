export function inputOnFocusDisableAddGuestBtn(counter){
    const newSecondaryGuestBtn = document.getElementsByClassName('extra-guest-btn')[0]
    if(counter == 1){
        newSecondaryGuestBtn.disabled = true

    }
    if(counter == 2){
        newSecondaryGuestBtn.disabled = false
    }
}

//inputOnFocusDisableAddGuestBtn()

let keyDownCounter = 0
export function inputKeyDown(form){
    const inputGuestNumber = document.querySelector('[data-input="guests"]')
    const inputGuestName = document.querySelector('[data-input="people"]')

    form.addEventListener("keydown", (e)=>{
        if(e.key == 'Enter'){
            inputGuestNumber.focus()            
        }
        if(e.key == 'Escape'){
            keyDownCounter++
           
            if(keyDownCounter == 1){
                inputGuestName.value = ''
                inputGuestNumber.value = ''
                inputGuestName.focus()
            }
            if(keyDownCounter == 2){
                inputGuestName.value = ''
                inputGuestNumber.value = ''
                inputGuestName.blur()
                keyDownCounter = 0
            }

        }
    })
}


export function closeSecondaryGuestModal(){
    const modalSecondaryGuests = document.querySelector('.secondary-guests-container')
    const closeBtn = document.querySelector('.close-secondary-modal')
    const secondaryGuestsList = document.querySelector('.secondary-guests-list')
    
    closeBtn.addEventListener('click', (e)=>{
        
            //hide secondary guests modal
            modalSecondaryGuests.classList.remove('secondary-guests-show')
            
            //clean secondary guest list content
            secondaryGuestsList.innerHTML = ''

       
    })
    window.addEventListener("keydown", (e)=>{
        if(e.key == 'Escape'){
            //hide secondary guests modal
            modalSecondaryGuests.classList.remove('secondary-guests-show')
            
            //clean secondary guest list content
            secondaryGuestsList.innerHTML = ''

        }
    })
}