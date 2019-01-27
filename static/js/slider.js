'use strict';
(function () {
    var sliderBox = document.querySelector('.slider-box');
    var slider = sliderBox.querySelector('.slider');
    var buttonPrev = sliderBox.querySelector('.controls--previous');
    var buttonNext = sliderBox.querySelector('.controls--next');
    var buttonClose = sliderBox.querySelector('.close-slider');

    var showSlider = function (node, image) {
        var newSlider = node.cloneNode(true);
        newSlider.className = 'slider-list'
        var sliderList = newSlider.querySelectorAll('li');
        var whoIsNext = function (it) {
            var numberNext;
            sliderList.forEach(function (element, i) {
                element.querySelector('img').className= 'slide-image';
                element.querySelector('img').style = '';
                if (element.querySelector('img').src === it.src) {
                    numberNext = i;
                }
            });
            return numberNext;
        }

        var currentNumber = whoIsNext(image);
        goToSlide(currentNumber);
        function nextSlide() {
            goToSlide(currentNumber + 1);
        }

        function previousSlide() {
            goToSlide(currentNumber - 1);
        }
        function goToSlide(n) {
            sliderList[currentNumber].classList.remove('showing');
            currentNumber = (n + sliderList.length) % sliderList.length;
            sliderList[currentNumber].classList.add('showing');
        }
        function closeSlide() {
            sliderBox.classList.add('hidden');
            newSlider.remove();
            buttonPrev.removeEventListener('click',previousSlide);
            buttonNext.removeEventListener('click',nextSlide);
            buttonClose.removeEventListener('click',closeSlide);

        }
        buttonPrev.addEventListener('click',previousSlide);
        buttonNext.addEventListener('click',nextSlide);
        buttonClose.addEventListener('click',closeSlide);
        slider.appendChild(newSlider);
        sliderBox.classList.remove('hidden');
    };
    window.slider = {
        showSlider: showSlider
    }
})();