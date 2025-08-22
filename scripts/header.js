let menuDisplayed = false;
const currentUser = JSON.parse(localStorage.getItem('activeUser'));
const localStoredUsers = JSON.parse(localStorage.getItem('users'));

console.log(localStoredUsers);
console.log(currentUser);

//gets the path of the webpage - /filename.html
const path = window.location.pathname;

const userDetailContainer = document.querySelector('.user-detail');

if(currentUser){
    userDetailContainer.innerHTML = "";
    const logOutButton = document.createElement('button');
    logOutButton.innerText = "logout";

    logOutButton.addEventListener('click', () => {
        updateUsers();
        localStorage.removeItem('activeUser');
        alert("logout successfully");
        location.reload();
    })

    userDetailContainer.append(logOutButton);
}else{
    userDetailContainer.innerHTML = "";
    if(path === "/login.html"){
        userDetailContainer.innerHTML = `<a href="./registration.html">
            <i class="fa-solid fa-user"></i>
        </a>`;
    }else{
        userDetailContainer.innerHTML = `<a href="./login.html">
            <i class="fa-solid fa-user"></i>
        </a>`;
    }
}

function updateUsers(){
    const updatedLocalUsers = localStoredUsers.map(
        (user) => {
            if(user.phone == currentUser.phone){
                user.cart = currentUser.cart;
                console.log(currentUser);
                console.log(user);
            }

            return user;
        }
    );

    localStorage.setItem('users', JSON.stringify(updatedLocalUsers));
}


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
});