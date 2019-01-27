'use strict';
(function () {
    var FILE_TYPES = ['gif', 'jpeg', 'jpg', 'png'];

    var avatarChooser = document.querySelector('#avatar');
    var imagesChooser = document.querySelector('#preview');
    var avatarImage = document.querySelector('.notice__preview img');
    var imagesContainer = document.querySelector('.form__photo-container');
    var dropZone = document.querySelectorAll('.drop-zone');

    var renderRoom = function (link) {
        var imageRoom = document.createElement('div');
        imageRoom.classList.add('notice__image');
        imageRoom.innerHTML = '<img src="" width="60" height="55" alt=""><button class="close__image" type="button"></button>';
        imageRoom.querySelector('img').src = link;
        imageRoom.querySelector('img').alt = 'Фото квартиры #';
        imageRoom.querySelector('.close__image').addEventListener('click', function () {
            var parent = this.parentNode;
            imagesContainer.removeChild(parent);
        })
        imagesContainer.appendChild(imageRoom);
    }

    var show = function (inputFile, target) {
        Array.from(inputFile.files).forEach(function (element) {
            var file = element;
            var fileName = file.name.toLowerCase();
            var matches = FILE_TYPES.some(function (it) {
                return fileName.endsWith(it);
            });
            if (matches) {
                var reader = new FileReader();
                if (target === avatarChooser) {
                    reader.addEventListener('load', function () {
                        avatarImage.src = reader.result;
                    });
                }
                if (target === imagesChooser) {
                    reader.addEventListener('load', function () {
                        renderRoom(reader.result);
                    });
                }
                reader.readAsDataURL(file);
            }
        });
    }

    avatarChooser.addEventListener('change', function (evt) {
        show(evt.target, evt.target);
    });
    imagesChooser.addEventListener('change', function (evt) {
        show(evt.target, evt.target);
    });
    var preventDefaults = function (event) {
        event.preventDefault();
        event.stopPropagation();
    };
    var highlight = function () {
        this.classList.add('highlight');
    };

    var unhighlight = function () {
        this.classList.remove('highlight');
    };

    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(function (eventName) {
        dropZone.forEach(function (eventObject) {
            eventObject.addEventListener(eventName, preventDefaults, false);
        })
        document.body.addEventListener(eventName, preventDefaults, false);
    });

    ['dragenter', 'dragover'].forEach(eventName => {
        dropZone.forEach(function (eventObject) {
            eventObject.addEventListener(eventName, highlight, false);
        });
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropZone.forEach(function (eventObject) {
            eventObject.addEventListener(eventName, unhighlight, false);
        })
    });

    dropZone.forEach(function (eventObject) {
        eventObject.addEventListener('drop', function (event) {
            var target = event.target.parentNode.querySelector('input');
            show(event.dataTransfer, target);
        })
    });
    window.picture_loader = {
        imagesContainer: imagesContainer
    };

}())
