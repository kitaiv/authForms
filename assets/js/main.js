document.addEventListener('DOMContentLoaded', () => {
    const bg2 = document.querySelector('#bg-2'),
        eye = document.querySelector('#eye'),
        eye2 = document.querySelector('#eye2'),
        signUpBtnWrapper = document.querySelector('#signUpBtnWrapper'),
        signUpBtn = document.querySelector('#signUpBtn'),
        email = document.querySelector('#email'),
        password = document.querySelector('#password'),
        password2 = document.querySelector('#password2'),
        allInputs = document.querySelectorAll('.form-control');

    signUpBtnWrapper.style.cursor = 'not-allowed';


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

    const emptyCheck = () => {
        allInputs.forEach(el => {
            if (email.value === '' || password2.value === '' || password.value === '') {
                signUpBtn.classList.add('btn-silver')
                signUpBtn.classList.remove('btn-primary')
                signUpBtn.setAttribute('disabled', '')
                signUpBtnWrapper.style.cursor = 'not-allowed';
                signUpBtn.style.cursor = 'not-allowed'
                return null;
            }

            if (email.value !== '' || password2.value !== '' || password.value !== '') {
                signUpBtn.classList.remove('btn-silver')
                signUpBtn.classList.add('btn-primary')
                signUpBtn.removeAttribute('disabled')
                signUpBtnWrapper.style.cursor = 'pointer'
                signUpBtn.style.cursor = 'pointer'
                return null;
            }
        })
    }

    allInputs.forEach(el => {
        el.addEventListener('input', emptyCheck)
    })

    eye.addEventListener('click', togglePass)
    eye2.addEventListener('click', togglePass)

    changeBg();

})
