class UI {
    displayProducts(products) {
        let result = '';
        products.forEach(product => {
            result += `
            <article class="all-products">
                <div class="img-container">
                <a href="/product/product.html?p=${product.id}&c=${product.category}">
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

    displayProd(prod) {
        let result = `
            <div class="product-section-title">
            <h2>${prod.title}</h2>
        </div>
        <div class="product-format">
            <div class="img-container">
                <div class="product-layout">
                    <img src="${prod.image}" class="product-img">
                    <div>
                        <div class="product-description">
                            ${prod.description}
                        </div>
                        <div class="product-price">
                            $${prod.price}
                            <span class="score">
                                <div class="score-wrap">
                                    <span class="stars-active" style="width:${prod.rating}%">
                                        <i class="fa fa-star" aria-hidden="true"></i>
                                        <i class="fa fa-star" aria-hidden="true"></i>
                                        <i class="fa fa-star" aria-hidden="true"></i>
                                        <i class="fa fa-star" aria-hidden="true"></i>
                                        <i class="fa fa-star" aria-hidden="true"></i>
                                    </span>
                                    <span class="stars-inactive">
                                        <i class="fa fa-star-o" aria-hidden="true"></i>
                                        <i class="fa fa-star-o" aria-hidden="true"></i>
                                        <i class="fa fa-star-o" aria-hidden="true"></i>
                                        <i class="fa fa-star-o" aria-hidden="true"></i>
                                        <i class="fa fa-star-o" aria-hidden="true"></i>
                                    </span>
                                </div>
                            </span>
                        </div>
                        <div class="add-cart">
                            <button class="add-banner-btn">Add to Cart</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
            `;
        console.log(result)
        prodDOM.innerHTML = result;
    }

    displayCat(cat) {
        let result = '';
        cat.forEach(cat => {
            result += `
            <div class="img-container">
                <a href="/product/product.html?p=${cat.id}">
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

    displayCategorys(categorys) {
        let result = '';
        categorys.forEach(category => {
            result += `
            <article class="category">
    <div class="img-container">
    <a href="/product-categorys/product-categorys.html?p=${category.title}">
        <img src=${category.image} alt="category" class="category-img">
                </a></div>
        <h3>${category.title
                }</h3>

            </article>
            `;
        });
        categorysDOM.innerHTML = result;
    }

    displayOtherProds(otherProds) {
        let result = '';
        otherProds.forEach(otherProd => {
            result += ` <div class="other-product-title">
                    <a href="/product/product.html?p=${otherProd.id}">
                        <img src="${otherProd.image}" class="other-product-img ">
                    </a>
                    <h3>${otherProd.title}</h3>
                    <h4>$${otherProd.price}</h4>
                </div>
                `;
        })
        console.log(result);
        otherProdsDOM.innerHTML = result;
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
