export function makeComparison(cb = null){
    const itemSingleWrapper = document.getElementsByClassName('single-item-wrapper')

    if(itemSingleWrapper.length > 1){
        const itemSingleValues1 = itemSingleWrapper[0].querySelectorAll('[data-value]')
        const itemSingleValues2 = itemSingleWrapper[1].querySelectorAll('[data-value]')
      
        itemSingleValues1.forEach((itemValue, index)=>{
            if(parseFloat(itemValue.dataset.value) === 0 || parseFloat(itemSingleValues2[index].dataset.value) === 0){
                itemValue.classList.add('item-even')
                itemSingleValues2[index].classList.add('item-even')
            }
            else if(parseFloat(itemValue.dataset.value) < parseFloat(itemSingleValues2[index].dataset.value) ){
                itemValue.classList.add('item-is-smaller')
            }
            else{
                itemSingleValues2[index].classList.add('item-is-smaller')
            }
        })
        if(typeof cb === "function"){
            cb()
        }
        
    }
}