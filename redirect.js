function renderSection(){
    fetch('./section.html')
            .then(response => response.text())
            .then(html => {
                document.getElementById('content-container').innerHTML = html;
            })
            .catch(error => console.error('Error loading HTML file:', error));

    fetch("./data.json")
            .then(res => res.json())
            .then((data) =>{ 
                let data1=""
                let clearData =  []
                data.data?.map(element => {
                    if (['bitcoin', 'bitcoin-cash', 'ethereum', 'litecoin','ripple'].includes(element.nameid)){
                        clearData.push(element)
                    }
                })
                console.log(clearData)
                clearData.forEach(element => {
                    data1+=`<div id="content_container__section" class="content_container__section">
                    <div class="content_container_header">
                        <img src="assets/${element.nameid}.png" alt="icon" class="icon">
                        <div id='symbol' class="symbol">${element.symbol}</div>
                        <div id='name' class="name">${element.name}</div>
                    </div>
                    <hr class="divider"></hr>
                    <div id='price' class="price">$${element.price_usd}</div>
                    <div id='percentage' class=${element.percent_change_24h > 0 ? "percentage-green" : "percentage-red" }>${element.percent_change_24h}%</div>
                </div>`
                });
                document.getElementById("content_container_section").innerHTML=data1;
        })
}

function renderRegisterForm(){
    fetch('./registration.html')
            .then(response => response.text())
            .then(html => {
                document.getElementById('content-container__form').innerHTML = html;
            })
            .catch(error => console.error('Error loading HTML file:', error));
}

function validateRegistrationForm() {
    var fullNameInput = document.getElementById('FullName');
    var fullNameError = document.getElementById('FullNameError');
    var dobInput = document.getElementById('dateOfBirth');
    var dobError = document.getElementById('dateOfBirthError');
    var continueBtn = document.getElementById('continueBtn');

    fullNameError.innerHTML = '';
    dobError.innerHTML = '';

    var fullName = fullNameInput.value.trim();
    var fullNameRegex = /^[a-zA-Z ]+$/;

    if (!fullNameRegex.test(fullName)) {
        fullNameError.innerHTML = 'Please Enter Valid Name';
        continueBtn.disabled = true;
        return false;
    }

    var dob = new Date(dobInput.value);
    var minDate = new Date();
    minDate.setFullYear(minDate.getFullYear() - 60);
    var maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() - 18);

    if (dob < minDate ) {
        dobError.innerHTML = 'Maximum age requirements, 60 years old';
        continueBtn.disabled = true;
        return false;
    } else if(dob > maxDate){
        dobError.innerHTML = 'Minimum age requirements, 18 years old';
        continueBtn.disabled = true;
        return false;
    }

    if(fullNameInput.value !== "" && dobInput.value !== "" ){
        continueBtn.disabled = false;
    }
}

function validateAndShowNextStep() {
    if (validateRegistrationForm()) {
        showNextStep();
    }
    return false;
}

function showNextStep() {
    var secondForm = document.getElementById('content-container__form2');
    secondForm.style.display = 'block';
    var secondFormData = document.getElementById('secondFormData');
    secondFormData.style.display = 'block';
}

function validateRegistrationForm2() {
    var emailInput = document.getElementById('email');
    var emailError = document.getElementById('emailError');
    var passwordInput = document.getElementById('password');
    var passwordError = document.getElementById('passwordError');
    var registerBtn = document.getElementById('registerBtn');

    emailError.innerHTML = '';
    passwordError.innerHTML = '';

    var email = emailInput.value.trim();
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        emailError.innerHTML = 'Please Enter Valid Email';
        registerBtn.disabled = true;
        return false;
    }

    var password = passwordInput.value;
    var passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[#\[\]()@$&*!?|,.^/\\+_\-])[a-zA-Z0-9#\[\]()@$&*!?|,.^/\\+_\-]{8,15}$/;

    var password = passwordInput.value;
    var passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[#\[\]()@$&*!?|,.^/\\+_\-])[a-zA-Z0-9#\[\]()@$&*!?|,.^/\\+_\-]{8,15}$/;

    if (!passwordRegex.test(password)) {
        const requirements = [
            { name: '8 - 15 characters', regex: /^.{8,15}$/ },
            { name: '1 or more numbers', regex: /\d/ },
            { name: '1 or more lowercase letters', regex: /[a-z]/ },
            { name: '1 or more uppercase letters', regex: /[A-Z]/ },
            { name: '1 or more special characters (#[]()@$&*!?|,.^/\\+_\\-)', regex: /[#\[\]()@$&*!?|,.^/\\+_\\-]/ },
        ];

        passwordError.innerHTML = 'Password must meet the following requirements:<br>';

        requirements.forEach((requirement) => {
            const isValid = requirement.regex.test(password);
            const color = isValid ? 'green' : 'red';
            passwordError.innerHTML += `<div style="color: ${color};">${requirement.name}</div>`;
        });

        registerBtn.disabled = requirements.some(requirement => !requirement.regex.test(password));
        return false;
    } else {
        registerBtn.disabled = false;
        return true;
    }
}


function validateAndShowNextStep2() {
        setTimeout(function() {
            showSuccess();
        }, 1000);
        return false;
}
function showSuccess() {
    var thirdPart = document.getElementById('content-container__last');
    thirdPart.style.display = 'block';
}