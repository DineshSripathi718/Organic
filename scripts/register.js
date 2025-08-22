let formData = {
    
}

const users = JSON.parse(localStorage.getItem("users")) || [];
console.log(users);


function displayToast(message, status){
    console.log(message);
    const toastBar = document.querySelector('.toast-bar');
    const toastContainer = document.createElement('div');
    toastContainer.classList.add('toast');
    toastContainer.classList.add(status);
    
    toastContainer.innerText = message;

    toastBar.append(toastContainer);
    setTimeout(() => {
        toastContainer.style.display = 'none';
    },1800);
}

document.getElementById('registrationForm').addEventListener('submit', (event) => {
    event.preventDefault();
    
    const name = document.querySelector('#name');

    const email = document.querySelector("#email");

    const phone = document.querySelector("#phone");

    const password = document.querySelector("#password");

    const reCheckPassword = document.querySelector("#recheckPassword");

    formData = {
        name : name.value,
        email : email.value,
        phone : phone.value,
        password : password.value,
        recheckPassword : reCheckPassword.value
    }

    const validated = validateFormData(formData);
    if(validated){
        const {name, email, phone, password} = formData;
        const jsonFormData ={
            name : name,
            email : email,
            password : password,
            phone : phone,
            cart : [],
            wishlist : []
        };

        // sendDataToBackend(JSON.stringify(jsonFormData));

        users.push(jsonFormData);
        console.log(users);

        localStorage.setItem("users", JSON.stringify(users));    

        displayToast("Login Successful, redirecting to login page", "success");

        setTimeout(() => {
            window.location.href = "/login.html";
        }, 2000);
        
    }else{
        displayToast("Not able to submit the form", "error");
    }
    
});

async function sendDataToBackend(data){
    console.log(data);
    const url = "http://localhost:8080/student/register";
    const header = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: data
    };

    const response = await fetch(url, header);
    const view = await response.text();
    console.log(view);
}

function validateFormData({name, email, phone, password, recheckPassword}){

    let failure = false;

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*_-])[A-Za-z\d@$!%*?&]{8,}$/

    const phonePattern = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$/

    const nameError = document.querySelector('.name-error');

    const nameSuccess = document.querySelector('.name-success');

    if(name != "" && name.length > 2){
        //success message
        
        nameError.innerText = "";
        nameSuccess.innerText = "valid name";
    }else{
        //error message
        nameSuccess.innerText = "";
        nameError.innerText = "name should be greater than 2 characters";
        failure = true;
    }

    const emailError = document.querySelector('.email-error');

    const emailSuccess = document.querySelector('.email-success');

    if(email != "" && emailPattern.test(email)){
        emailError.innerText = "";
        emailSuccess.innerText = "valid email";
    }else{
        emailSuccess.innerText = "";
        emailError.innerText = "invalid email";
        failure = true;
    }

    const phoneError = document.querySelector('.phone-error');

    const phoneSuccess = document.querySelector('.phone-success');

    if(phone != "" && phonePattern.test(phone)){
        phoneError.innerText = "";
        phoneSuccess.innerText = "valid phone number";
    }else{
        phoneSuccess.innerText = "";
        phoneError.innerText = "invalid phone number";
        failure = true;
    }

    const passwordError = document.querySelector('.password-error');

    const passwordSuccess = document.querySelector('.password-success');

    if(password != "" && passwordPattern.test(password)){
        passwordError.innerText = "";
        passwordSuccess.innerText = "valid password";
    }else{
        passwordSuccess.innerText = "";
        passwordError.innerHTML = `
            <div>invalid Password </div>
            <ul>
                <li>
                    Password must contain 1 uppercase letter 
                </li>
                <li>
                    Password must   contain 1 special character (@ $ ! % * _ -) 
                </li>
                <li>
                    Password must contain atleast one number 
                </li>
            </ul>
        `;
        failure = true;
    }

    const recheckPasswordError = document.querySelector('.recheckPassword-error');

    const recheckPasswordSuccess = document.querySelector('.recheckPassword-success');

    if(recheckPassword && password === recheckPassword){
        recheckPasswordError.innerText = "";
        recheckPasswordSuccess.innerText = "password match";
    }else{
        recheckPasswordSuccess.innerText = "";
        recheckPasswordError.innerText = "password mis-match";
        failure = true;
    }

    return !failure;
}