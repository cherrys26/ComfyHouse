
document.addEventListener("DOMContentLoaded", () => {
    const ui = new UI();
    const products = new Products();
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('p');
    const category = urlParams.get('c');

    products.getProd(id).then(prod => {
        ui.displayProd(prod);
    })

    products.getOtherProds(category).then(otherProds => {
        ui.displayOtherProds(otherProds)
    }).then(hideProd => {
        
    })
})
