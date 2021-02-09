

class Cat {
    async getCat() {
        try {
            let result = await fetch(`http://localhost:3000/categorys/${category.title}`);
            let data = await result.json();
            let cat = data;
            cat = cat.map(function (item) {
                return {
                    title: item.title,
                    price: item.price,
                    id: item.id,
                    category: item.category,
                    image: item.image,
                }
            });
            return cat

        } catch (error) {
            console.log(error);
        }

        console.log(cat);

    }
}



document.addEventListener("DOMContentLoaded", () => {
    const ui = new UI();
    const cat = new Cat();

    cat.getCat().then(cat => {
        ui.displayCat(cat);
    },
    );

})


