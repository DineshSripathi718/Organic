const activeUser = JSON.parse(localStorage.getItem('activeUser'));

const root = document.getElementById('root');


displayCartItems();
function displayCartItems(){
    if(activeUser){
        if(activeUser.cart.length == 0){
            root.innerHTML = `<img class='empty-cart-image' src ="./assets/emptyCart.jpg">`
        }else{
            root.innerHTML = "";
            activeUser.cart.forEach(
                item =>{
                    const itemContainer = document.createElement('div');
                    itemContainer.classList.add("product-container");

                    const imageContainer = document.createElement('div');
                    imageContainer.classList.add('image-container');

                    const image = document.createElement('img');
                    image.src = item.product.images[0];
                    image.alt = item.product.title;

                    imageContainer.append(image);

                    const productDetails = document.createElement('div');
                    productDetails.classList.add('details-container');

                    const productTitle = document.createElement('div');
                    productTitle.innerText = item.product.title;
                    productTitle.classList.add('title');

                    const productQuantityContainer = document.createElement('div');
                    productQuantityContainer.classList.add("productQuantityContainer");

                    const productQuantity = document.createElement('div');
                    productQuantity.innerText = item.quantity;
                    productQuantity.classList.add('quantity');


                    const decreaseButton = document.createElement('button');
                    decreaseButton.innerText = "-";

                     const increaseButton = document.createElement('button');
                    increaseButton.innerText = "+";

                    productQuantityContainer.append(decreaseButton);
                    productQuantityContainer.append(productQuantity);
                    productQuantityContainer.append(increaseButton);

                    const productTotalPrice = document.createElement('div');
                    productTotalPrice.innerText = `$ ${item.totalPrice}`;
                    productTotalPrice.classList.add('price');

                    const productRemoveButton = document.createElement('button');
                    productRemoveButton.innerText = "Remove";
                    productRemoveButton.addEventListener('click', () => {
                        itemContainer.remove();
                        removeItemFromCart(item);
                    });

                   
                    increaseButton.addEventListener('click',
                        () => {
                            item.quantity += 1;
                            productQuantity.innerText = item.quantity;
                            productTotalPrice.innerText = `$ ${item.quantity * item.product.price}`;
                            updateItemFromCart(item);
                        }
                    )

                    decreaseButton.addEventListener('click',
                        () => {
                            item.quantity -= 1;
                            if(item.quantity > 0){
                                productQuantity.innerText = item.quantity;
                                productTotalPrice.innerText = `$ ${item.quantity * item.product.price}`;
                                updateItemFromCart(item);
                            }else{
                                itemContainer.remove();
                                removeItemFromCart(item);
                            }
                        }
                    )

                    productDetails.append(productTitle);
                    productDetails.append(productQuantityContainer);
                    productDetails.append(productTotalPrice);
                    productDetails.append(productRemoveButton);

                    itemContainer.append(imageContainer);
                    itemContainer.append(productDetails);

                    root.append(itemContainer);
                }
            );
        }
    }else{
        root.innerHTML = `<h1>Please login to see the cart</h1>`
    }
}



function removeItemFromCart(item){
    const updatedCart = activeUser.cart.filter((productObject) => {
        console.log(productObject);
        return productObject.product.id != item.product.id;
    });

    activeUser.cart = [...updatedCart];

    localStorage.setItem("activeUser", JSON.stringify(activeUser));
    
    if(activeUser.cart.length == 0){
        displayCartItems();
    }
}

function updateItemFromCart(item){
    console.log(item);
    const updatedCart = activeUser.cart.map((productObject) => {
        if(productObject.product.id == item.product.id){
            productObject.quantity = item.quantity;
            productObject.totalPrice = item.quantity * item.product.price;
        }
        return productObject;
    });

    activeUser.cart = [...updatedCart];

    localStorage.setItem("activeUser", JSON.stringify(activeUser));
}