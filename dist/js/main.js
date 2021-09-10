// UI Variables
const clickCountHolder = document.querySelector('#click-count');
const customHeight = document.querySelector('.custom-vh');
const navbarHeight = document.querySelector('nav').offsetHeight;
const footerHeight = document.querySelector('footer').offsetHeight;

console.log(navbarHeight);

customHeight.style.height = `calc(100vh - ${navbarHeight + footerHeight}px)`;

// Localstorage methods
const commitToStorage = () => {

    if(localStorage.getItem('clickcount')) {
        let currentValue = JSON.parse(localStorage.getItem('clickcount'));
        if(!(clickCountHolder.value >= 100000)) {
            let addingValue = parseInt(currentValue) + 1;
            localStorage.setItem('clickcount', JSON.stringify(addingValue));
        }
    } else {
        let currentValue = 1;
        localStorage.setItem('clickcount', JSON.stringify(currentValue));
    }
}

const removeFromStorage = () => {
    if(localStorage.getItem('clickcount')) {
        let currentValue = JSON.parse(localStorage.getItem('clickcount'));
        let addingValue = 0;
        if(!(clickCountHolder.value <= 0)) {
            addingValue = parseInt(currentValue) - 1;
            localStorage.setItem('clickcount', JSON.stringify(addingValue));
        }
    }
}

function clearFromLocalStorage() {
    localStorage.removeItem('clickcount');
}

// clearFromLocalStorage();

// Methods

const increaseCount = () => {
    let value = clickCountHolder.value;
    clickCountHolder.value = parseInt(value) + 1;
    commitToStorage();
};

const decreaseCount = () => {
    let value = clickCountHolder.value;
    if(!(value <= 0)) {
        clickCountHolder.value = parseInt(value) - 1;
    }
    removeFromStorage();
};

const clearCount = () => {
    let value = 0;
    clickCountHolder.value = parseInt(value);
    clearFromLocalStorage();
};

// Events

document.addEventListener('DOMContentLoaded', (e) => {
    if(localStorage.getItem('clickcount')) {
        clickCountHolder.value = parseInt(JSON.parse(localStorage.getItem('clickcount')));
    }
})

clickCountHolder.addEventListener('change', (e) => {
    if(e.target.value < 0) {
        e.target.value = 0;
        Swal.fire(
            'Negative value detected',
            'Values less than 0 are not allowed!',
            'error'
        )
    } else if(e.target.value > 100000) {
        e.target.value = 0;
        Swal.fire(
            'Larger value detected',
            'Currently larger value is set to 100K!',
            'error'
        )
    } else {
        commitToStorage();
    }
});