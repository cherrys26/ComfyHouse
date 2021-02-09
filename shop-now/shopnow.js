
class Categorys {
    async getCategorys() {
        try {
            let result = await fetch('http://localhost:3000/api/categorys');
            let data = await result.json();
            let categorys = data.items;
            categorys = categorys.map(function (item) {
                return {
                    title: item.title,
                    image: item.image

                }
            })
            return categorys
        } catch (error) {
            console.log(error);
        }
    }
}



class Cat {
    async getCat() {
        try {
            let result = await fetch(`http://localhost:3000/categorys/${category.title}`);
            console.log(category.title)
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
    const categorys = new Categorys();


    categorys.getCategorys().then(categorys => {
        ui.displayCategorys(categorys);

    });
    const cat = new Cat();

    cat.getCat().then(cat => {
        ui.displayCat(cat);
    },
    );
})

