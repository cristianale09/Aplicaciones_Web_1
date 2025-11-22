const inputs = document.querySelectorAll('.contact__input');

function focusFunc() {
    let parent = this.parentNode;
    parent.classList.add('focus');
}

function blurFunc() {
    let parent = this.parentNode;
    if (this.value == "") {
        parent.classList.remove('focus');
    }
}

inputs.forEach((contact) => {
    contact.addEventListener('focus', focusFunc);
    contact.addEventListener('blur', blurFunc);
});