export function emptyInputAlert(input, alertMessage){
    
//empty input
    if(input.value == ''){
    input.classList.add('input-alert')
    input.value = alertMessage;
}

// input with alert message
if(input.value == alertMessage && input === document.activeElement){
    input.value = ''
    input.classList.remove('input-alert')
}

}

