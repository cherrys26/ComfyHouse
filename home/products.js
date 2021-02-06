
class Products {
    async getProducts() {
        try {
            let result = await fetch('../products.json');
            let data = await result.json();
            let products = data.items;
            products = products.map(function (item) {
                return {
                    title: item.title,
                    price: item.price,
                    id: item.id,
                    image: item.image,
                }
            })

            return products
        } catch (error) {
            console.log(error);
        }

    }
}

document.addEventListener("DOMContentLoaded", () => {
    const ui = new UI();
    const products = new Products();
    //setup application
    ui.setupAPP();

    //get all products
    products.getProducts().then(products => {
        ui.displayProducts(products);
        Storage.saveProducts(products);
    }).then(() => {
        ui.getBagButtons();
        ui.cartLogic();
    });
})


