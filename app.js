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
const prodDOM = document.querySelector(".prod-main");
const otherProdsDOM = document.querySelector(".other-product");

//cart 
let cart = [];

//buttons
let buttonsDOM = [];

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
    ui.setupAPP();

    ui.cartLogic();
});



