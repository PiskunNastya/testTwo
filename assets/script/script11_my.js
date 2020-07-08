var modalWindowAlert = document.getElementById('modalWindowAlert__link');
var modalWindowPromt = document.getElementById('modalWindowPromt__link');

var modalWindowSeparate = document.getElementById('modalWindowSeparate__link');
var buttunModalSeparate = document.querySelector('[type="button"]');
var divModal = document.getElementById('separateModalWindow__div');







function event_modalWindowAlert() {
    alert('Вы открыли первое модальное окно - alert');
}

function event_modalWindowPromt() {
    var result = prompt('Вы открыли первое модальное окно - prompt. Введите, пожалуйста, числовое значение от 1 до 20. Результат в консоли', '10');

    if (result < 0) {
        console.log('результат меньше 0!');
    } else if (result > 20) {
        console.log('результат больше 20!');
    } else if (result == 10) {
        console.log('дефолтное значение 10!');
    } else {
        console.log(`ваше число ${result}`);
    }
}

function event_modalWindowSeparate() {
    divModal.classList.remove('separateModalWindow__none');
    divModal.classList.add('separateModalWindow');
}

function event_buttunModalSeparate() {
    divModal.classList.remove('separateModalWindow');
    divModal.classList.add('separateModalWindow__none');
}







modalWindowAlert.addEventListener('click', event_modalWindowAlert);
modalWindowPromt.addEventListener('click', event_modalWindowPromt);
modalWindowSeparate.addEventListener('click', event_modalWindowSeparate);
buttunModalSeparate.addEventListener('click', event_buttunModalSeparate);