const emailVal = document.querySelector('#email');
const countryVal = document.querySelector('#country');
const zipCodeVal = document.querySelector('#zipcode')
const passwordVal = document.querySelector('#password');
const confirmPasswordVal = document.querySelector('#confirm-password');

const form = document.querySelector('#signup');

const checkEmail = () => {
    let valid = false;
    const email = emailVal.value.trim();
    if (!isRequired(email)) {
        showError(emailVal, 'Email cannot be blank.');
    } else if (!isEmailValid(email)) {
        showError(emailVal, 'Email is not valid.')
    } else {
        showSuccess(emailVal);
        valid = true;
    }
    return valid;
};

const isEmailValid = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

const checkCountry = () => {

    let valid = false;

    const country = countryVal.value.trim();

    if (!isRequired(country)) {
        showError(countryVal, 'Country cannot be blank.');

    } else if (!/^[a-zA-Z]*$/g.test(country)) {
        showError(countryVal, 'Country should only contain letters.');
    } else if (!/[A-Z]/.test(country[0])) {
        showError(countryVal, 'Country should start with capital letter.');
    } else {
        showSuccess(countryVal);
        valid = true;
    }
    return valid;
};

const checkZipCode = () => {

    let valid = false;

    const zipcode = zipCodeVal.value.trim();

    if (!isRequired(zipcode)) {
        showError(zipCodeVal, 'Zip Code cannot be blank.');

    } else {
        showSuccess(zipCodeVal);
        valid = true;
    }
    return valid;
};

const checkPassword = () => {
    let valid = false;

    const password = passwordVal.value.trim();

    if (!isRequired(password)) {
        showError(passwordVal, 'Password cannot be blank.');
    } else if (!isPasswordSecure(password)) {
        showError(passwordVal, 'Password must has at least 8 characters that include at least 1 lowercase character, 1 uppercase characters, 1 number, and 1 special character in (!@#$%^&*-)');
    } else {
        showSuccess(passwordVal);
        valid = true;
    }

    return valid;
};

const isPasswordSecure = (password) => {
    const re = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*-])(?=.{8,})");
    return re.test(password);
};

const isRequired = value => value === '' ? false : true;
const isBetween = (length, min, max) => length < min || length > max ? false : true;


const checkconfirmPassword = () => {
    let valid = false;
    const confirmPassword = confirmPasswordVal.value.trim();
    const password = passwordVal.value.trim();

    if (!isRequired(confirmPassword)) {
        showError(confirmPasswordVal, 'Please enter the password again');
    } else if (password !== confirmPassword) {
        showError(confirmPasswordVal, 'The password does not match!');
    } else {
        showSuccess(confirmPasswordVal);
        valid = true;
    }
    return valid;
};



const showError = (input, message) => {
    const formField = input.parentElement;
    formField.classList.remove('success');
    formField.classList.add('error');
    const error = formField.querySelector('small');
    error.textContent = message;
};

const showSuccess = (input) => {
    const formField = input.parentElement;
    formField.classList.remove('error');
    formField.classList.add('success');
    const error = formField.querySelector('small');
    error.textContent = '';
}

var textSubmitted = 'Succesfuly submited! \ud83d\ude00';

form.addEventListener('submit', function (e) {
    e.preventDefault();

    let isEmailValid = checkEmail(),
        isCountryValid = checkCountry(),
        isZipCodeValid = checkZipCode(),
        isPasswordValid = checkPassword(),
        isconfirmPasswordValid = checkconfirmPassword();

    let isFormValid =
        isEmailValid &&
        isCountryValid &&
        isZipCodeValid &&
        isPasswordValid &&
        isconfirmPasswordValid;
    if (isFormValid) {
        document.write(textSubmitted);
    }
});


const debounce = (fn, delay = 300) => {
    let timeoutId;
    return (...args) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            fn.apply(null, args)
        }, delay);
    };
};

form.addEventListener('input', debounce(function (e) {
    switch (e.target.id) {

        case 'email':
            checkEmail();
            break;
        case 'country':
            checkCountry();
            break;
        case 'zipcode':
            checkZipCode();
        case 'password':
            checkPassword();
            break;
        case 'confirm-password':
            checkconfirmPassword();
            break;
    }
}));