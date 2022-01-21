export function findWinner(){

    const singleItemsWrapper = document.getElementsByClassName('single-item-wrapper');

    const item1 = singleItemsWrapper[0].querySelectorAll('.item-is-smaller');
    const item2 = singleItemsWrapper[1].querySelectorAll('.item-is-smaller');
    const itemNumber1 = singleItemsWrapper[0].parentNode.querySelector('.item-final-match-result')
    const itemNumber2 = singleItemsWrapper[1].parentNode.querySelector('.item-final-match-result')
    
    
    if (item1.length < item2.length){
        itemNumber1.classList.add('is-winner')
        itemNumber1.textContent = "WINS!"
    }
    else if(item1.length === item2.length){
        itemNumber1.classList.add('is-winner')
        itemNumber2.classList.add('is-winner')
        itemNumber1.textContent = "DRAW!"
        itemNumber2.textContent = "DRAW!"
    }
    else{
        itemNumber2.classList.add('is-winner')
        itemNumber2.textContent = "WINS!"
    }
}