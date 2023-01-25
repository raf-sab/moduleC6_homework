const btn = document.querySelector('.btn');
const icon1 = document.querySelector('.btn__icon--1');
const icon2 = document.querySelector('.btn__icon--2');
const text = document.querySelector('.btn__text');

let n = 0;
btn.addEventListener('click', () => {
    icon1.classList.toggle("hidden");
    icon2.classList.toggle("unset");
    n++;
    if (Math.floor(n / 2) == n / 2) {
        text.innerHTML = "Нажми на кнопку";
    } else {
        text.innerHTML = "Нажми еще разок";
    }
    console.log(n);
});