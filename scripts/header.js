let menuDisplayed = false;

document.querySelector('.ham-menu').addEventListener('click', () => {
    
    const navBar = document.querySelector('nav');
    const extraDetails = document.querySelector('.extra-details-container');

    if(menuDisplayed){
        navBar.style.display = "none";
        extraDetails.style.display = "none";
        menuDisplayed = false;
    }else{
        navBar.style.display = "flex";
        extraDetails.style.display = "flex";
        menuDisplayed = true;
    }
})