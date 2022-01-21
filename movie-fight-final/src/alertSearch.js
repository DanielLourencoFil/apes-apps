export function alertSearch(domElement = null){
    const alertSearchAll = document.querySelectorAll('.alert-search')
    alertSearchAll.forEach(alert =>{
        if(alert.classList.contains('show-alert-search')){
            alert.classList.remove('show-alert-search')
        }
    })
    const alertSearch = domElement.parentElement.querySelector('.alert-search')
    domElement.addEventListener('keypress', function(e){
        if(e.key === 'Enter'){
            alertSearch.classList.add('show-alert-search')
        }
    })
}
