const users = JSON.parse(localStorage.getItem("users"));

const user =  {
    phoneNumber : "",
    password : ""
}

let activeUser = "";

document.getElementById("loginform").addEventListener('submit', (event) => {
    event.preventDefault();

    const phone = document.getElementById('phone');
    const password = document.getElementById('password');

    user.phoneNumber = phone.value;
    user.password = password.value;

    phone.value = "";
    password.value = "";
    
    checkUser();
});


function checkUser(){
    const fetchedUserRecord = users.find((item) => {
        return item.phone == user.phoneNumber;
    });

    if(fetchedUserRecord){
        if(user.password === fetchedUserRecord.password){
            displayMessage("user found, redirecting to homepage....");

            localStorage.setItem("activeUser", JSON.stringify(fetchedUserRecord));

            window.location.href = "/index.html";

        }else{
            displayMessage("invalid username or password");
        }
    }else{
        displayMessage("user not found");
    }
}

function displayMessage(message){
    const messageContainer = document.querySelector('.message');

    messageContainer.innerHTML = "";

    messageContainer.innerText = message;
}