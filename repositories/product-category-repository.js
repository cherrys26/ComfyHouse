class Cat {
    async getCat(category) {
        try {
            let result = await fetch(`http://localhost:3000/api/categorys/${category}`);
            let data = await result.json();
            let cat = data;
            cat = cat.map(function (item) {
                return {
                    title: item.title,
                    id: item.id,
                    image: item.image,
                    price: item.price,
                    category: item.category,
                }
            });
            return cat

        } catch (error) {
            console.log(error);
        }

        console.log(cat);

    }
}
