document.addEventListener('DOMContentLoaded', () => {
    const bg2 = document.querySelector('#bg-2'),
        eye = document.querySelector('#eye'),
        eye2 = document.querySelector('#eye2'),
        signUpBtnWrapper = document.querySelector('#signUpBtnWrapper'),
        signUpBtn = document.querySelector('#signUpBtn'),

        //auth data
        email = document.querySelector('#email'),
        password = document.querySelector('#password'),


        password2 = document.querySelector('#password2'),
        allInputs = document.querySelectorAll('.form-control'),
        emailError = document.querySelector('#email-error'),
        passError = document.querySelector('#pass-error');


    signUpBtnWrapper.style.cursor = 'not-allowed';

    const error = ["Email should include @ symbol!", "Password must contain 1 symbol, 1 title, 1 digit and from 6 characters", "Passwords doesn't match"]


    //changing background function on sign up page
    const changeBg = () => {
        setInterval(() => {
            if (bg2.classList.contains('fade-out-image')) {
                bg2.classList.remove('fade-out-image')
                bg2.classList.add('fade-in-image')
            } else {
                bg2.classList.add('fade-out-image')
                bg2.classList.remove('fade-in-image')
            }
        }, 8000)

    }

    //show or hide password input function
    const togglePass = e => {
        //fa-eye --> show
        //fa-eye-slash --> hide
        const target = e.target,
            input = target.nextSibling.nextElementSibling.nextElementSibling,
            inputType = input.getAttribute('type');

        switch (inputType) {
            case 'password':
                input.setAttribute('type', 'text')
                target.classList.remove('fa-eye')
                target.classList.add('fa-eye-slash')
                break;
            case 'text':
                input.setAttribute('type', 'password')
                target.classList.remove('fa-eye-slash')
                target.classList.add('fa-eye')
                break;
            default:
                console.error('ERROR: ', e)
        }

    }

    //input validation check
    const checkInputs = () => {
        allInputs.forEach(el => {
            const mailRegExp = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            const passwordRegExp = /^(?=.*\d)(?=.*[a-zA-Z]).{6,}$/
            const emailReg = email.value.match(mailRegExp);
            const passReg = password.value.match(passwordRegExp)
            const passReg2 = password2.value.match(passwordRegExp)
            const mailCheckRequirements = emailReg ? emailReg.length > 0 : false
            const passCheckRequirements = passReg && passReg2 ? passReg.length > 0 && passReg2.length > 0 : false
            if (email.value === '' || password2.value === '' || password.value === '') {
                signUpBtn.classList.add('btn-silver')
                signUpBtn.classList.remove('btn-primary')
                signUpBtn.setAttribute('disabled', '')
                signUpBtnWrapper.style.cursor = 'not-allowed';
                signUpBtn.style.cursor = 'not-allowed'
                return false;

            }

            if (email.value !== '' || password2.value !== '' || password.value !== '') {
                if (mailCheckRequirements) {
                    emailError.textContent = ''
                    if(passCheckRequirements){
                        passError.textContent = ''
                        if(password.value === password2.value){
                            passError.textContent = '';
                            signUpBtn.classList.remove('btn-silver')
                            signUpBtn.classList.add('btn-primary')
                            signUpBtn.removeAttribute('disabled')
                            signUpBtnWrapper.style.cursor = 'pointer'
                            signUpBtn.style.cursor = 'pointer'
                            return false;
                        }
                        else{
                            passError.textContent = error[2]
                            signUpBtn.classList.add('btn-silver')
                            signUpBtn.classList.remove('btn-primary')
                            signUpBtn.setAttribute('disabled', '')
                            signUpBtnWrapper.style.cursor = 'not-allowed';
                            signUpBtn.style.cursor = 'not-allowed'
                            return false;
                        }
                    }
                    else{
                        passError.textContent = error[1]
                        signUpBtn.classList.add('btn-silver')
                        signUpBtn.classList.remove('btn-primary')
                        signUpBtn.setAttribute('disabled', '')
                        signUpBtnWrapper.style.cursor = 'not-allowed';
                        signUpBtn.style.cursor = 'not-allowed'
                        return false;
                    }
                } else {
                    emailError.textContent = error[0]
                    signUpBtn.classList.add('btn-silver')
                    signUpBtn.classList.remove('btn-primary')
                    signUpBtn.setAttribute('disabled', '')
                    signUpBtnWrapper.style.cursor = 'not-allowed';
                    signUpBtn.style.cursor = 'not-allowed'
                    return false;
                }
            }

        })
    }

    const authUser = () => {

        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        let raw = JSON.stringify({
            "email": email.value,
            "password": password.value
        });

        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };


        function sendEmail(email){

            let raw = JSON.stringify({
                "email": email
            });

            let requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'manual'
            };

            fetch("http://localhost:8080/api/mail/send", requestOptions)
                .then(response => response.text())
                .then(result => console.log(result))
                .catch(error => console.log('error', error));
        }

        fetch("http://localhost:8080/api/auth/signup", requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log(result)
                window.location = 'mail-verification.html'
                sendEmail(email.value)
            })
            .catch(error => console.log('ERROR: ', error));
    }

    allInputs.forEach(el => {
        el.addEventListener('input', checkInputs)
    })

    eye.addEventListener('click', togglePass)
    eye2.addEventListener('click', togglePass)
    signUpBtn.addEventListener('click', authUser)

    changeBg();

})
