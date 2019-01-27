'use strict';
(function () {
    var adContent = document.querySelector('template').content.querySelector('.map__card');

    var renderAd = function (AD_OBJECT) {
        var adElement = adContent.cloneNode(true);
        adElement.classList.add('visuallyhidden');
        try {
            var avatarPath = AD_OBJECT.author.avatar.path;
        } catch (error) {
            var avatarPath = '';
        }
        adElement.querySelector('.popup__avatar').setAttribute('src', avatarPath);
        adElement.querySelector('.popup__close').setAttribute('tabinex', '0');
        adElement.querySelector('h3').textContent = AD_OBJECT.offer.title;
        adElement.querySelector('p small').textContent = AD_OBJECT.offer.adress;
        adElement.querySelector('.popup__price').innerHTML = AD_OBJECT.offer.price + '&#x20bd;/ночь';
        var typeOfHouse = function (type) {
            if (type === 'flat') {
                return 'квартира';
            }
            if (type === 'house') {
                return 'дом';
            }
            if (type === 'bungalo') {
                return 'бунгало'
            }
            if (type === 'palac') {
                return 'дворец'
            }
        }
        adElement.querySelector('h4').textContent = typeOfHouse(AD_OBJECT.offer.type);
        var prefixerRooms = function (Rooms) {
            if (Rooms == 1) {
                return 'комната';
            }
            if ((Rooms > 1) && (Rooms < 5)) {
                return 'комнаты';
            }
            else {
                return 'комнат';
            }
        }
        var prefixerGuest = function (Guest) {
            if (Guest == 1) {
                return 'гостя';
            }
            else {
                return 'гостей';
            }
        }
        adElement.querySelector('p:nth-of-type(3)').textContent = AD_OBJECT.offer.rooms + ' ' + prefixerRooms(AD_OBJECT.offer.rooms) + ' для '
            + AD_OBJECT.offer.guests + ' ' + prefixerGuest(AD_OBJECT.offer.guests);
        adElement.querySelector('p:nth-of-type(4)').textContent = 'Заезд после ' + AD_OBJECT.offer.checkin + ', выезд до ' + AD_OBJECT.offer.checkout;
        var adPoolsFeatures = adElement.querySelector('.popup__features');
        var adListFeatures = adElement.querySelectorAll('.feature');
        for (var i = 0; i < adListFeatures.length; i++) {
            var entrance = false;
            for (var j = 0; j < AD_OBJECT.offer.features.length; j++) {
                if (adListFeatures[i].classList.contains('feature--' + AD_OBJECT.offer.features[j])) {
                    entrance = true;
                    break;
                }
            }
            if (!entrance) {
                adPoolsFeatures.removeChild(adListFeatures[i]);
            }
        }
        adElement.querySelector('p:nth-of-type(5)').textContent = AD_OBJECT.offer.description;
        var adPictureRooms = adElement.querySelector('.popup__pictures');
        var pictureRoomsFragment = document.createDocumentFragment();
        AD_OBJECT.offer.photos.forEach(element => {
            var adElementPictureRooms = adPictureRooms.querySelector('li').cloneNode(true);
            adElementPictureRooms.querySelector('img').classList.add('notice__image');
            adElementPictureRooms.querySelector('img').setAttribute('src', element.path);
            adElementPictureRooms.querySelector('img').style.cssText = 'width : 45px; \ height:40px;\ margin : 5px 3px\ ';
            pictureRoomsFragment.appendChild(adElementPictureRooms);
        });
        adPictureRooms.querySelector('li').remove();
        adPictureRooms.appendChild(pictureRoomsFragment);
        return adElement;
    }
    window.card = {
        renderAd: renderAd
    }
})()