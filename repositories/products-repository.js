class Products {
    async getProducts() {
        try {
            let result = await fetch('http://localhost:3000/api/products');
            let data = await result.json();
            let products = data.items;
            products = products.map(function (item) {
                return {
                    title: item.title,
                    price: item.price,
                    id: item.id,
                    image: item.image,
                    category: item.category,
                }
            })
            return products
        } catch (error) {
            console.log(error);
        }
    }
    async getProd(id) {
        try {
            let display = await fetch(`http://localhost:3000/api/products/${id}`);
            let data = await display.json();
            return (data);
        } catch (error) {
            console.log(error);
        }
    }
    async getOtherProds(category) {
        try {
            let result = await fetch(`http://localhost:3000/api/categorys/${category}`);
            let data = await result.json();
            let otherProds = data;
            otherProds = otherProds.map(function (item) {
                return {
                    title: item.title,
                    id: item.id,
                    price: item.price,
                    image: item.image,
                    category: item.category,
                }
            })
            return otherProds;
        }
        catch (err) {
            console.log(err);
        }
    }
}

