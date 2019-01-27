'use strict';
(function () {
    var maps = document.querySelector('.map__pins');
    var allPinsInMap = maps.querySelectorAll('.map__pin:not(.map__pin--main)');
    var allPopapMap = maps.querySelectorAll('.popup');
    var userDialog = document.querySelector('.map');
    var userForm = document.querySelector('.notice__form');
    var mapIconStart = document.querySelector('.map__pin--main');
    var mapFilters = userDialog.querySelector('.map__filters');

    var ESC_KEYCODE = 27;
    var ENTER_KEYCODE = 13;

    var addToPage = function () {
        allPinsInMap = maps.querySelectorAll('.map__pin:not(.map__pin--main)');
        allPopapMap = maps.querySelectorAll('.popup');
        allPinsInMap.forEach(element => {
            maps.removeChild(element);
        });
        allPopapMap.forEach(element => {
            maps.removeChild(element);
        })
        window.backend.load(successHandler, errorHandler);
        mapFilters.addEventListener('change', addToPage);
    };

    var openAdCard = function (card) {
        allPinsInMap = maps.querySelectorAll('.map__pin:not(.map__pin--main)');
        allPopapMap = maps.querySelectorAll('.popup');
        allPinsInMap.forEach(element => {
            element.classList.remove('map__pin--active');
        });
        allPopapMap.forEach(element => {
            element.classList.add('visuallyhidden');
        });
        card.classList.add('map__pin--active');
        maps.querySelector('.map__pin--active ~ .popup').classList.remove('visuallyhidden');
    }

    var closeAdCard = function () {
        maps.querySelector('.popup:not(.visuallyhidden)').classList.add('visuallyhidden');
        maps.querySelector('.map__pin--active').classList.remove('map__pin--active');
    }

    var closeAdCardKey = function (keyevent) {
        if (keyevent.keyCode === ESC_KEYCODE) {
            closeAdCard();
        }
    }

    var addCardOnPageMouse = function (adEventMouse) {
        adEventMouse.preventDefault();
        var target = adEventMouse.target;
        var parent = target.parentNode;
        if (parent.classList.contains('map__pin') && (!parent.classList.contains('map__pin--main'))) {
            openAdCard(parent);
            document.addEventListener('keydown', closeAdCardKey);
        }
      /*   Grebaniy FIrefox! */
        if (target.classList.contains('map__pin') && (!parent.classList.contains('map__pin--main'))) {
            openAdCard(target);
            document.addEventListener('keydown', closeAdCardKey);
        }
        if (target.classList.contains('popup__close')) {
            document.removeEventListener('keydown', closeAdCardKey);
            closeAdCard();
        }
       if (target.classList.contains('notice__image')) {
           window.slider.showSlider(parent.parentNode, target);
       }
    }
    var addCardOnPageKeyboard = function (adEventKeyboard) {
        var target = adEventKeyboard.target;
        if ((adEventKeyboard.keyCode === ENTER_KEYCODE) && (target.classList.contains('map__pin')) && (!target.classList.contains('map__pin--main'))) {
            openAdCard(target);
            document.addEventListener('keydown', closeAdCardKey);
        }
        if ((adEventKeyboard.keyCode === ENTER_KEYCODE) && target.classList.contains('popup__close')) {
            closeAdCard();
            document.removeEventListener('keydown', closeAdCardKey);
        }
    }

    var successHandler = function (data) {
        var fragment = document.createDocumentFragment();
        var arrData = window.filter.adFilter(data.data);
        arrData.forEach(element => {
            fragment.appendChild(window.pin.renderIcons(element));
            fragment.appendChild(window.card.renderAd(element));
        });
        maps.appendChild(fragment);
        maps.addEventListener('click', addCardOnPageMouse);
        maps.addEventListener('keydown', addCardOnPageKeyboard);

    };

    var errorHandler = function (message) {
        var node = document.createElement('div');
        node.style = 'z-index: 100; text-align: center; margin-left: -200px; background-color: #fefefe; border-radius: 10px; box-shadow: 0 30px 50px rgba(0, 0, 0, 0.7);';
        node.style.position = 'fixed';
        node.style.top = '30px';
        node.style.left = '50%';
        node.style.width = '400px';
        node.style.minHeight = '150px';
        node.style.padding = '18px 25px 25px 25px';
        node.style.fontSize = '15px';
        node.style.color = 'red';

        node.textContent = message;
        document.body.insertAdjacentElement('afterbegin', node);
        document.addEventListener('click', function () {
            node.remove();
        });
    };

    mapIconStart.addEventListener('mousedown', function (evt) {
        userDialog.classList.remove('map--faded');
        userForm.classList.remove('notice__form--disabled');
        window.form.enabledDisabled();
        var startCoords = {
            x: evt.clientX,
            y: evt.clientY
        };
        var finishCoords = {
            x: 0,
            y: 0
        }
        var limitCoords = {
            TOP: 100,
            BOTTOM: 600,
        }
        var coordinateOfHouse = document.querySelector('#coordinate');
        var onMouseMove = function (moveEvt) {
            var shift = {
                x: startCoords.x - moveEvt.clientX,
                y: startCoords.y - moveEvt.clientY
            };
            startCoords = {
                x: moveEvt.clientX,
                y: moveEvt.clientY
            }
            finishCoords.x = mapIconStart.offsetLeft - shift.x;
            finishCoords.y = mapIconStart.offsetTop - shift.y;
            if (finishCoords.y < limitCoords.TOP) {
                finishCoords.y = limitCoords.TOP;
            }
            if (finishCoords.y > limitCoords.BOTTOM) {
                finishCoords.y = limitCoords.BOTTOM;
            }
            mapIconStart.style.top = finishCoords.y + 'px';
            mapIconStart.style.left = finishCoords.x + 'px';
            coordinateOfHouse.value = (finishCoords.x + 21) + ' , ' + (finishCoords.y + 72);
        };
        var onMouseUp = function (upEvt) {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
            addToPage();
        }
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);

    });

    window.map = {
        addToPage: addToPage,
        successHandler: successHandler,
        errorHandler: errorHandler
    };
})();
