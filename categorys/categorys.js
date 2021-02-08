class Cat {
    async getCat() {
        try {
            let result = await fetch('../products.json');
            let data = await result.json();
            let cat = data.items;
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
        console.log(cat)
    }
}

class UICat {
    displayCat(cat) {
        let result = '';
        function filterBySearch(search) {
            return cat.filter(
                ({ category }) => category.includes(search),
            );
        }
        console.log(cat.category);
        filterBySearch('Panel').forEach(cat => {
            result += `
            <div class="img-container">
                <a href="../product/product.html">
                    <img src="${cat.image}" class="cat-img">
                </a>
                <div class="cat-title">
                    <h4>${cat.title}</h4>
                    <h3>$${cat.price}</h3>
                </div>
            </div>
            `;
        })
        catDOM.innerHTML = result;

    }
}

document.addEventListener("DOMContentLoaded", () => {
    const uiCat = new UICat();
    const cat = new Cat();

    cat.getCat().then(cat => {
        uiCat.displayCat(cat);
    },
    );

})


