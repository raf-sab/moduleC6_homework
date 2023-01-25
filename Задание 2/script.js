const btn = document.querySelector('.btn');

btn.addEventListener('click', () => {
    alert(`Размер вашего экрана: \n${screen.width} x ${screen.height}\n\n\
Размер окна браузера: \n${document.documentElement.clientWidth} x ${document.documentElement.clientHeight}`);
});