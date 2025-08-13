const productsContainer = document.getElementById("displayProducts");

const fetchData = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    displayProducts(data);

    return data;
}

fetchData('https://dummyjson.com/products');


function displayProducts({products}){
    productsContainer.innerHTML = "";
    products.forEach((product) => {
        productsContainer.innerHTML += generateItemCart(product);
    });

    return;
}


function generateItemCart(product){
    // console.log(product)

    return `
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
    `    
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