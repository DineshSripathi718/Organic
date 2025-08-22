const productsContainer = document.getElementById("displayProducts");

const fetchData = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    displayProducts(data);

    return data;
}
const activeUser = JSON.parse(localStorage.getItem('activeUser'));

let cart = [];
let userWishlist = [];

const cartItemCount = document.querySelector('.cart-item-count');

if(activeUser){
    cart = activeUser.cart; 
    userWishlist = activeUser.wishlist;  
}


fetchData('https://dummyjson.com/products');


function displayProducts({products}){
    productsContainer.innerHTML = "";
    products.forEach((product) => {
        const productContainer = generateItemCart(product);
        productsContainer.append(productContainer);
    });

    return;
}

//displays toast message
function displayToast(message, status){
    const toastBar = document.querySelector('.toast-bar');
    const toastContainer = document.createElement('div');
    toastBar.innerHTML = "";
    toastContainer.classList.add('toast');
    toastContainer.classList.add(status);
    
    toastContainer.innerText = message;

    toastBar.append(toastContainer);
    setTimeout(() => {
        toastContainer.style.display = 'none';
    },1800);
}


function generateItemCart(product){
    // console.log(product);

    const itemContainer = document.createElement('div');
    itemContainer.classList.add('item-container');

    const banner = document.createElement('div');
    banner.innerText = product.category;
    banner.classList.add('banner');

    const imageContainer = document.createElement('div');
    imageContainer.classList.add('image-container');
    imageContainer.innerHTML = `<img src=${product.images[0]} alt="product"></img>`;

    const infoContainer = document.createElement("div");
    infoContainer.classList.add('info-container');

    infoContainer.innerHTML = `<div class="title">${product.title}</div>
                        <div class="description item-description">
                            ${product.description.slice(0, 50)}
                        </div>`;

    const ctaContainer = document.createElement('div');
    ctaContainer.classList.add('cta-container');
    ctaContainer.innerHTML = `<div class="price">$ ${product.price} / Kg</div>`;

    const addToCart = document.createElement('button');
    addToCart.innerText = 'add to cart';

    addToCart.addEventListener('click', () => {
        if(activeUser){
            addProductToCart(product);
            saveUserInfo();
            cartItemCount.innerText = cart.length;
            
        }else{
            displayToast("Login required", "error")
        }
    });

    const wishlist = document.createElement('button');
    wishlist.innerText = 'wishlist';

    wishlist.addEventListener('click', () => {
        if(activeUser){
            addProductToWishlist(product);
            saveUserInfo();
        }else{
            displayToast("Login required", "error")
        }
    });

    ctaContainer.append(addToCart);
    ctaContainer.append(wishlist);

    itemContainer.append(imageContainer);
    itemContainer.append(infoContainer);
    itemContainer.append(ctaContainer);

    return itemContainer
/*     return `
        <div class="item-container">
                    <div class="banner">
                        ${product.category}
                    </div>
                    <div class="image-container">
                        <img src=${product.images[0]}>
                    </div>
                    <div class="info-container">
                        <div class="title">${product.title}</div>
                        <div class="description item-description">
                            ${product.description.slice(0, 50)}
                        </div>
                    </div>
                    <div class="cta-container">
                        <div class="price">$ ${product.price} / Kg</div>
                        <button>Add To Cart</button>
                    </div>
                </div>
    `     */
}


/* 
    item1, item2

    cart - 
    item2 - 2 - 40
    item1 - 1 - 20

    ------
    check if the item present in the cart or not?
    adding item 1st time
        -    we should not worry about quantity, just add the item
    adding existing item
        - we must worry about quantity as item already in the cart. increase quantity
*/

function saveUserInfo(){
    activeUser.cart = cart;
    localStorage.setItem("activeUser", JSON.stringify(activeUser));
}

function addProductToWishlist(product){

    const wishlistProduct =  isProductAvailInWishlist(product);
    console.log(wishlistProduct);
    if(userWishlist.length == 0 || !wishlistProduct){
        userWishlist.push(product);
        displayToast(`${product.title} added to Wishlist`, "success");
    }
    else{
        displayToast(product.title+" already added in wishlist", 'error');
    }
    
}

function addProductToCart(product){
    let cartItem = {};

    //
    const cartProduct =  isProductAvailInCart(product);
    //we are adding product to the cart only when the cart is empty or else product is not present in the cart
    if(cart.length == 0 || !cartProduct){
        cartItem.product = product;
        cartItem.quantity = 1;
        cartItem.totalPrice = product.price * cartItem.quantity;
        cart.push(cartItem);
    }
    //we are updating quantity as well as total price as item already present in the cart.
    else{
        cartProduct.quantity += 1;
        cartProduct.totalPrice = cartProduct.quantity * cartProduct.product.price;
    }
    displayToast(`${product.title} added to Cart`, "success");
    console.log(cart);
}

function isProductAvailInCart(product){
    if(cart.length == 0){
        return false;
    }
    return cart.find((item) => item.product.id == product.id);
}

function isProductAvailInWishlist(product){
    if(userWishlist.length == 0){
        return false;
    }
    return userWishlist.find((item) => item.id == product.id);
}

const beautyFilter = document.querySelector('#beauty-filter');

const fragrancesFilter = document.getElementById('fragrances');

const furnitureFilter = document.getElementById('furniture');

const groceriesFilter = document.getElementById('groceries');

beautyFilter.addEventListener('click', async () => {
    const apiData = await fetchData('https://dummyjson.com/products')

    const data = filterData('beauty', apiData);

    displayProducts({products: data});
})


fragrancesFilter.addEventListener('click', async () => {
    const apiData = await fetchData('https://dummyjson.com/products')

    const data = filterData('fragrances', apiData);

    displayProducts({products: data});
})

furnitureFilter.addEventListener('click', async () => {
    const apiData = await fetchData('https://dummyjson.com/products')

    const data = filterData('furniture', apiData);

    displayProducts({products: data});
})

groceriesFilter.addEventListener('click', async () => {
    const apiData = await fetchData('https://dummyjson.com/products')

    const data = filterData('groceries', apiData);

    displayProducts({products: data});
})


function filterData(category, data){
    const filteredData = data.products.filter((product) => {
        return product.category == category
    })

    return filteredData;
}