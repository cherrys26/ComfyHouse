function userAction(title) {
    alert(title);
}
class Categorys {
    async getCategorys() {
        try {
            let result = await fetch('http://localhost:3000/api/categorys');
            let data = await result.json();
            let categorys = data.items;
            categorys = categorys.map(function (item) {
                return {
                    title: item.title,
                    image: item.image,
                    id: item.id
                }
            })
            return categorys
        } catch (error) {
            console.log(error);
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const ui = new UI();
    const categorys = new Categorys();

    categorys.getCategorys().then(categorys => {
        ui.displayCategorys(categorys);

    });

})

