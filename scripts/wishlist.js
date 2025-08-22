
const wishlistRoot = document.getElementById('root-wishlist');

const activeUser = JSON.parse(localStorage.getItem('activeUser'));

displayWishlist();
function displayWishlist(){
    if(activeUser){
        if(activeUser.wishlist.length == 0){
            wishlistRoot.innerHTML = `<img class='empty-cart-image' src ="./assets/emptyCart.jpg">`
        }else{
            wishlistRoot.innerHTML = "";
            activeUser.wishlist.forEach(
                item =>{
                    const itemContainer = document.createElement('div');
                    itemContainer.classList.add("product-container");

                    const imageContainer = document.createElement('div');
                    imageContainer.classList.add('image-container');

                    const image = document.createElement('img');
                    image.src = item.images[0];
                    image.alt = item.title;

                    imageContainer.append(image);

                    const productDetails = document.createElement('div');
                    productDetails.classList.add('details-container');

                    const productTitle = document.createElement('div');
                    productTitle.innerText = item.title;
                    productTitle.classList.add('title');


                    const productTotalPrice = document.createElement('div');
                    productTotalPrice.innerText = `$ ${item.price}`;
                    productTotalPrice.classList.add('price');

                    const productRemoveButton = document.createElement('button');
                    productRemoveButton.innerText = "Remove";
                    productRemoveButton.addEventListener('click', () => {
                        itemContainer.remove();
                        removeItemFromWishlist(item);
                    });

                

                    productDetails.append(productTitle);
                    productDetails.append(productTotalPrice);
                    productDetails.append(productRemoveButton);

                    itemContainer.append(imageContainer);
                    itemContainer.append(productDetails);

                    wishlistRoot.append(itemContainer);
                }
            );
        }
    }else{
        root.innerHTML = `<h1>Please login to see the cart</h1>`
    }
}


function removeItemFromWishlist(item){
    const updatedWishlist = activeUser.wishlist.filter((productObject) => {
        console.log(productObject);
        return productObject.id != item.id;
    });

    activeUser.wishlist = [...updatedWishlist];

    localStorage.setItem("activeUser", JSON.stringify(activeUser));
    
    if(activeUser.wishlist.length == 0){
        displayWishlist();
    }
}