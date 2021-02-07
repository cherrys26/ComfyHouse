
class Categorys {
    async getCategorys() {
        try {
            let result = await fetch('categorys.json');
            let categorys = await result.json();
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


class UICategory {
    displayCategorys(categorys) {
        let result = '';
        categorys.forEach(category => {
            result += `
            <article class="category">
    <div class="img-container">
    <a href="../categorys/${category.title}.html">
        <img src=${category.image} alt="category" class="category-img">
                </a></div>
        <h3>${category.title
                }</h3>

            </article>
            `;
        });
        categorysDOM.innerHTML = result;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const uiCategory = new UICategory();
    const categorys = new Categorys();
    const ui = new UI();
    
    categorys.getCategorys().then(categorys => {
        uiCategory.displayCategorys(categorys);
    });


    ui.setupAPP()
    ui.getBagButtons();
    ui.cartLogic();
})