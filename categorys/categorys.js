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
class Title {
    async getTitle() {
        try {
            let result = await fetch('../products.json');
            let data = await result.json();
            let title = data.items;
            title = title.map(function (item) {
                return {
                    category: item.category
                }
            });
            return title
        }
        catch (error) {
            console.log(error);
        }
        console.log(title)
    }

}


class UITitle {
    displayTitle(title) {
        let result = '';
        title.forEach(title => {
            // function filterBySearch(search) {
            //     return title.filter(
            //         ({ category }) => category.includes(search),
            //     );
            // }
            // filterBySearch('Panel').forEach(title => {
            result += `
            <h3>${title.category}<h3>
            `;
            console.log(title.category);

        })
        titleDOM.innerHTML = result;
        console.log(title.category);
    }
}

class UICat {
    // displayTitle(title) {
    //     let result = '4';
    //     title.forEach(title => {
    //         result = `
    //         <h3>${title.category}<h3>
    //         `;
    //     })
    //     titleDOM.innerHTML = result;
    //     console.log(title);
    // }
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

    const uiTitle = new UITitle();
    const title = new Title();

    title.getTitle().then(title => {
        uiTitle.displayTitle(title);
    },
    );


    const ui = new UI();

    ui.getBagButtons();
    ui.cartLogic();
})


