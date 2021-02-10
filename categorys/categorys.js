document.addEventListener("DOMContentLoaded", () => {
    const ui = new UI();
    const categorys = new Categorys();

    categorys.getCategorys().then(categorys => {
        ui.displayCategorys(categorys);

    });

})

