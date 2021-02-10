
document.addEventListener("DOMContentLoaded", () => {
    const ui = new UI();
    const cat = new Cat();
    const urlParams = new URLSearchParams(window.location.search);
    const title = urlParams.get('p');

    cat.getCat(title).then(cat => {
        ui.displayCat(cat);
    },
    );

})


