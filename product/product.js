class Prod {
    async getProd() {
        try {
            let display = await fetch(`http://localhost:3000/api/products`);
            let data = await display.json();
            let prod = data.items;
            prod = prod.map(function (item) {
                return {
                    id: item.id,
                    title: item.title,
                    price: item.price,
                    image: item.image,
                    description: item.description,
                    category: item.category,
                    rating: item.rating,
                }
            })
            return prod
        } catch (error) {
            console.log(error);
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const ui = new UI();
    const prod = new Prod();


    prod.getProd().then(prod => {
        ui.displayProd(prod);

    })
});
