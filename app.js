//variables
const cartBtn = document.querySelector(".cart-btn");
const closeCartBtn = document.querySelector(".close-cart");
const clearCartBtn = document.querySelector(".clear-cart");
const cartDOM = document.querySelector(".cart");
const cartOverlay = document.querySelector(".cart-overlay");
const cartItems = document.querySelector(".cart-items");
const cartTotal = document.querySelector(".cart-total");
const cartContent = document.querySelector(".cart-content");
const productsDOM = document.querySelector(".products-center");
const categorysDOM = document.querySelector(".categorys-center");
const productDOM = document.querySelector(".product-layout");
const productTitleDOM = document.querySelector(".product-section-title");
const catDOM = document.querySelector(".cat-center");
const titleDOM = document.querySelector(".cat-section-title");

//cart 
let cart = [];

//buttons
let buttonsDOM = [];

//getting the products

// class Products {
//     async getProducts() {
//         try {
//             let result = await fetch('/products.json');
//             let data = await result.json();
//             let products = data.items;
//             products = products.map(function (item) {
//                 return {
//                     title: item.title,
//                     price: item.price,
//                     id: item.id,
//                     image: item.image,
//                 }
//             })
//             return products
//         } catch (error) {
//             console.log(error);
//         }

//     }
// };

//UI - display products
class UI {

    displayProducts(products) {
        let result = '';
        products.forEach(product => {
            result += `
            <article class="all-products">
                <div class="img-container">
                <a href="../product/${product.id}">
                    <img src=${product.image} alt="products" class="products-img">
                </a>
                    <button class="bag-btn" data-id=${product.id}>
                        <i class="fas fa-shopping-cart"></i>
                        add to cart
                    </button>
                </div>
                <h3>${product.title}</h3>
                <h4>$${product.price}</h4>
            </article>
            `;
        });
        productsDOM.innerHTML = result;
    }


    getBagButtons() {
        const buttons = [...document.querySelectorAll(".bag-btn")];
        buttonsDOM = buttons;
        buttons.forEach(button => {
            let id = button.dataset.id;
            let inCart = cart.find(item => item.id === id);
            if (inCart) {
                button.innerText = "In Cart"
                button.disabled = true
            }
            button.addEventListener("click", event => {
                event.target.innerText = "In Cart";
                event.target.disabled = true;
                //get product from products 
                let cartItem = {
                    ...Storage.getProduct(id),
                    amount: 1
                };
                //add products to cart
                cart = [...cart, cartItem];
                //save cart in local storage
                Storage.saveCart(cart);
                //set cart values 
                this.setCartValues(cart);
                //display cart item
                this.addCartItem(cartItem);
                //show the cart
                this.showCart();
            });
        });
    }
    setCartValues(cart) {
        let tempTotal = 0;
        let itemsTotal = 0;
        cart.map(item => {
            tempTotal += item.price * item.amount;
            itemsTotal += item.amount
        });
        cartTotal.innerText = parseFloat(tempTotal.toFixed(2));
        cartItems.innerText = itemsTotal;
    }
    addCartItem(item) {
        const div = document.createElement('div');
        div.classList.add('cart-item');
        div.classList.add('add-cart');
        div.innerHTML = `<img src=${item.image} alt="product">
                    <div>
                        <h4>${item.title}</h4>
                        <h5>$${item.price}</h5>
                        <span class="remove-item" data-id=${item.id}>Remove</span>
                    </div>
                    <div>
                        <i class="fas fa-chevron-up" data-id=${item.id}></i>
                        <p class="item-amount">${item.amount}</p>
                        <i class="fas fa-chevron-down" data-id=${item.id}></i>
                    </div>`;
        cartContent.appendChild(div);

    }
    showCart() {
        cartOverlay.classList.add('transparentBcg');
        cartDOM.classList.add('showCart');
    }
    setupAPP() {
        cart = Storage.getCart();
        this.setCartValues(cart);
        this.populateCart(cart);
        cartBtn.addEventListener('click', this.showCart);
        closeCartBtn.addEventListener('click', this.hideCart);
    }
    populateCart(cart) {
        cart.forEach(item => this.addCartItem(item));
    }
    hideCart() {
        cartOverlay.classList.remove('transparentBcg');
        cartDOM.classList.remove('showCart');

    }
    cartLogic() {
        clearCartBtn.addEventListener('click', () => {
            this.clearCart()
        });
        //cart functionality
        cartContent.addEventListener('click', event => {
            if (event.target.classList.contains("remove-item")) {
                let removeItem = event.target;
                let id = removeItem.dataset.id;
                cartContent.removeChild(removeItem.parentElement.parentElement);
                this.removeItem(id);
            }
            else if (event.target.classList.contains("fa-chevron-up")) {
                let addAmount = event.target;
                let id = addAmount.dataset.id;
                let tempItem = cart.find(item => item.id === id);
                tempItem.amount = tempItem.amount + 1;
                Storage.saveCart(cart);
                this.setCartValues(cart);
                addAmount.nextElementSibling.innerText = tempItem.amount;
            }
            else if (event.target.classList.contains("fa-chevron-down")) {
                let lowerAmount = event.target;
                let id = lowerAmount.dataset.id;
                let tempItem = cart.find(item => item.id === id);
                tempItem.amount = tempItem.amount - 1;
                if (tempItem.amount > 0) {
                    Storage.saveCart(cart);
                    this.setCartValues(cart);
                    lowerAmount.previousElementSibling.innerText = tempItem.amount;

                }
                else {
                    cartContent.removeChild(lowerAmount.parentElement.parentElement);
                    this.removeItem(id);
                    lowerAmount.nextElementSibling.innerText = tempItem.amount;

                }
            }
        })
    }
    clearCart() {
        let cartItems = cart.map(item => item.id);
        cartItems.forEach(id => this.removeItem(id));
        console.log(cartContent.children)

        while (cartContent.children.length > 0) {
            cartContent.removeChild(cartContent.children[0]);
        }
        this.hideCart();
    }
    removeItem(id) {
        cart = cart.filter(item => item.id !== id);
        this.setCartValues(cart);
        Storage.saveCart(cart);
        let button = this.getSingleButton(id);
        button.disabled = false;
        button.innerHTML = `<i class="fas fa-shopping-cart"></i>
        add to cart`;
    }
    getSingleButton(id) {
        return buttonsDOM.find(button => button.dataset.id === id);
    }
}

//local storage
class Storage {
    static saveProducts(products) {
        localStorage.setItem("products", JSON.stringify(products));
    }
    static getProduct(id) {
        let products = JSON.parse(localStorage.getItem('products'));
        return products.find(product => product.id === id)
    }
    static saveCart(cart) {
        localStorage.setItem('cart', JSON.stringify(cart));
    }
    static getCart() {
        return localStorage.getItem('cart') ?
            JSON.parse(localStorage.getItem('cart')) : [];
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const ui = new UI();
    //setup application
    ui.setupAPP();

    //get all products
    // products.getProducts().then(products => {
    //     ui.displayProducts(products);
    //     Storage.saveProducts(products);
    // }).then(() => {
    // ui.getBagButtons();
    ui.cartLogic();
});



// {
//     "items": [
//         {
//             "sys": {
//                 "id": "1"
//             },
//             "fields": {
//                 "title": "queen panel bed",
//                 "price": 10.99,
//                 "image": {
//                     "fields": {
//                         "file": {
//                             "url": "../images/product-1.jpeg"
//                         }
//                     }
//                 },
//                 "description": "hello"
//             },
//             "category": "Panel"
//         },
//         {
//             "sys": {
//                 "id": "2"
//             },
//             "fields": {
//                 "title": "king panel bed",
//                 "price": 12.99,
//                 "image": {
//                     "fields": {
//                         "file": {
//                             "url": "../images/product-2.jpeg"
//                         }
//                     }
//                 },
//                 "description": "hello",
//                 "category": "Panel"
//             }
//         },
//         {
//             "sys": {
//                 "id": "3"
//             },
//             "fields": {
//                 "title": "single panel bed",
//                 "price": 12.99,
//                 "image": {
//                     "fields": {
//                         "file": {
//                             "url": "../images/product-3.jpeg"
//                         }
//                     }
//                 },
//                 "description": "hello",
//                 "category": "Panel"
//             }
//         },
//         {
//             "sys": {
//                 "id": "4"
//             },
//             "fields": {
//                 "title": "twin panel bed",
//                 "price": 22.99,
//                 "image": {
//                     "fields": {
//                         "file": {
//                             "url": "../images/product-4.jpeg"
//                         }
//                     }
//                 },
//                 "description": "hello",
//                 "category": "Panel"
//             }
//         },
//         {
//             "sys": {
//                 "id": "5"
//             },
//             "fields": {
//                 "title": "fridge",
//                 "price": 88.99,
//                 "image": {
//                     "fields": {
//                         "file": {
//                             "url": "../images/product-5.jpeg"
//                         }
//                     }
//                 },
//                 "description": "hello",
//                 "category": "Kitchen"
//             }
//         },
//         {
//             "sys": {
//                 "id": "6"
//             },
//             "fields": {
//                 "title": "dresser",
//                 "price": 32.99,
//                 "image": {
//                     "fields": {
//                         "file": {
//                             "url": "../images/product-6.jpeg"
//                         }
//                     }
//                 },
//                 "description": "hello",
//                 "category": "Bedroom"
//             }
//         },
//         {
//             "sys": {
//                 "id": "7"
//             },
//             "fields": {
//                 "title": "couch",
//                 "price": 45.99,
//                 "image": {
//                     "fields": {
//                         "file": {
//                             "url": "../images/product-7.jpeg"
//                         }
//                     }
//                 },
//                 "description": "hello",
//                 "category": "Living-Room"
//             }
//         },
//         {
//             "sys": {
//                 "id": "8"
//             },
//             "fields": {
//                 "title": "table",
//                 "price": 33.99,
//                 "image": {
//                     "fields": {
//                         "file": {
//                             "url": "../images/product-8.jpeg"
//                         }
//                     }
//                 },
//                 "description": "hello",
//                 "category": "Living-Room Bedroom"
//             }
//         }
//     ]
// }