'use strict';

(function () {
    var MinPrices = {
        'bungalo': 0,
        'flat': 1000,
        'house': 5000,
        'palace': 100000
    };
    var priceOfHouse = document.querySelector('#price');
    var typeOfHouse = document.querySelector('#type');
    var timeInOfHouse = document.querySelector('#checkin');
    var timeOutOfHouse = document.querySelector('#checkout');
    var roomsOfHouse = document.querySelector('#room_number');
    var questOfHouse = document.querySelector('#guests');
    var capacityQuest = questOfHouse.querySelectorAll('option');
    var userForm = document.querySelector('.notice__form');
    var resetForm = document.querySelector('.form__reset');
    var successPopup = document.querySelector('.success');
    var avatarImage = document.querySelector('.notice__preview img');

    var selectedQuest = function (value) {
        for (var i = 0; i < capacityQuest.length; i++) {
            if ((+capacityQuest[i].value <= +value) && (+capacityQuest[i].value)) {
                capacityQuest[i].disabled = false;
                capacityQuest[i].selected = true;
            }
            else {
                capacityQuest[i].disabled = true;
            }
        }
        if (+value == 100) {
            for (var i = 0; i < capacityQuest.length; i++) {
                capacityQuest[i].disabled = !capacityQuest[i].disabled;
                if (!capacityQuest[i].disabled) {
                    capacityQuest[i].selected = true;
                }
            }
        }
    }

    var enabledDisabled = function () {
        var fieldsetList = userForm.querySelectorAll('fieldset');
        if (userForm.classList.contains('notice__form--disabled')) {
            fieldsetList.forEach(element => {
                element.setAttribute('disabled', 'true');
            });
        }
        else {
            fieldsetList.forEach(element => {
                element.removeAttribute('disabled');
            });
        }
    }

    window.addEventListener('load', function (evt) {
        typeOfHouse.addEventListener('change', function () {
            var minPrice = MinPrices[typeOfHouse.value];
            priceOfHouse.setAttribute('min', minPrice);
            priceOfHouse.setAttribute('placeholder', minPrice);
        });
        timeInOfHouse.addEventListener('change', function () {
            timeOutOfHouse.value = timeInOfHouse.value;
        });
        timeOutOfHouse.addEventListener('change', function () {
            timeInOfHouse.value = timeOutOfHouse.value;
        });
        roomsOfHouse.addEventListener('input', function () {
            selectedQuest(roomsOfHouse.value);
        });
        enabledDisabled();
    })

    var onSubmitClick = function (evt) {
        evt.preventDefault();
        window.backend.save(new FormData(userForm), function () {
            successPopup.classList.remove('hidden');
            setTimeout(window.map.addToPage, 10000);
        }, window.map.errorHandler);
    };
    userForm.addEventListener('submit', onSubmitClick);
    successPopup.addEventListener('click', function () {
        successPopup.classList.add('hidden');
    });
    resetForm.addEventListener('click', function () {
        avatarImage.src = 'img/muffin.png';
        var imageRoomList = window.picture_loader.imagesContainer.querySelectorAll('.notice__image');
        imageRoomList.forEach(element => {
            element.remove();
        });
    });

    window.form = {
        enabledDisabled: enabledDisabled
    };
})();