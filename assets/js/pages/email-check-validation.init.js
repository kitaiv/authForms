let arr = [];
function emailValidation(symbol, index){
    // window.location = 'verification-success.html'
    let result;
    let code = 'D72A9E';
    arr[index] = symbol.value

    if(arr.length === 6) {
        result = arr.join('')
        code === result ?  window.location = 'verification-success.html' : alert('Wrong code!')
    }


}
