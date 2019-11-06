/**
 * Checks if the input values in the password and confirm password fields are the same
 * @param {HTMLInputElement} input - the confirm password input from the create user page form
 */
function check(input : HTMLInputElement){
    var password_input : HTMLInputElement = (<HTMLInputElement>document.getElementById('password'));
    if (input.value != password_input.value) {
        input.setCustomValidity('Password Does\'nt Match.');
    } else {
        input.setCustomValidity('');
    }
}
