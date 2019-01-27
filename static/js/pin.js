'use strict';
(function () {
    var iconsContent = document.querySelector('template').content.querySelector('.map__pin');
    var renderIcons = function (AD_OBJECT) {
        var iconsElement = iconsContent.cloneNode(true);
        try {
            var avatarPath = AD_OBJECT.author.avatar.path;
        } catch (error) {
            var avatarPath = '';
        }
        iconsElement.querySelector('img').setAttribute('src', avatarPath);
        iconsElement.setAttribute('style', 'left:' + (AD_OBJECT.location.x - 23) + 'px; top:' + (AD_OBJECT.location.y - 64) + 'px');
        iconsElement.setAttribute('tabindex', '0');
        return iconsElement;
    }
    window.pin = {
        renderIcons: renderIcons
    }
})()