
document.addEventListener("DOMContentLoaded", () => {
    const ui = new UI();
    const products = new Products();
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('p');
    const category = urlParams.get('c');

    products.getProd(productId).then(prod => {
        ui.displayProd(prod);
        Storage.saveProds(prod);
    })
        .then(() => {
            ui.getBagButtons();
        })

    products.getOtherProds(category, productId).then(otherProds => {
        ui.displayOtherProds(otherProds);
        console.log(productId);
    })
})

