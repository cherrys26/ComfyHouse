class Product {
    async getProduct() {
        try {
            let display = await fetch(`http://localhost:3000/api/product/${id}`);
            let data = await display.json();
            let product = data.items;
            product = product.map(function (item) {
                return {
                    id: item.id,
                    title: item.title,
                    price: item.price,
                    image: item.image,
                    description: item.description,
                    category: item.category,
                }
            })
            return product
        } catch (error) {
            console.log(error);
        }
    }
}
// class ProductTitle {
//     async getProductTitle() {
//         try {
//             let result = await fetch('../products.json');
//             let data = await result.json();
//             let productTitle = data.items;
//             productTitle = productTitle.map(item => {
//                 const { title
//                 } = item.fields;
//                 return {
//                     title
//                 }
//             })
//             return productTitle
//         } catch (error) {
//             console.log(error);
//         }
//     }
// }

// // class UIProductTitle {
// //     displayProductTitle(productTitle) {
// //         let result = '';
// //         productTitle.forEach(productTitle => {
// //             result += `
// //             <h2> ${productTitle.title} </h2>
// //             `;
// //         });
// //         productTitleDOM.innerHTML = result;
// //         console.log(result);
// //     }
// // }

// // class UIProduct {
// //     displayProduct(product) {
// //         let display = '';
// //         product.forEach(product => {
// //             display += `
// //             <article class="product">
// //     <div class="img-container">
// //         <img src=${product.image} alt="product" class="product-img">
// //         </div>
// //         <h3>
// //             ${product.description}
// //         </h3>
// //             </article>
// //             `;
// //         });
// //         productDOM.innerHTML = display;
// //     }
// // }


// document.addEventListener("DOMContentLoaded", () => {
//     // const uiProduct = new UIProduct();
//     const product = new Product();
//     // const uiProductTitle = new UIProductTitle();
//     const productTitle = new ProductTitle();

//     product.getProduct().then(product => {
//         uiProduct.displayProduct(product);

//     }),
//         productTitle.getProductTitle().then(productTitle => {
//             uiProductTitle.displayProductTitle(productTitle);
//         });

//     const ui = new UI();

//     ui.getBagButtons();
//     ui.cartLogic();
// })

