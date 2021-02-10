
document.addEventListener("DOMContentLoaded", () => {
    const ui = new UI();
    const products = new Products();
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('p');

    products.getProd(id).then(prod => {
        ui.displayProd(prod);

    })
});
