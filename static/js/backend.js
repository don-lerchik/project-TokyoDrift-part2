'use strict';
(function () {
    var LOAD_TIME = 100000;
    var SUCCESS_STATUS = 200;

    var xhrRequest = function (onSuccess, onError) {
        var xhr = new XMLHttpRequest();
        xhr.responseType = 'json';
        xhr.addEventListener('load', function () {
            if (xhr.status === SUCCESS_STATUS) {
                onSuccess(xhr.response);
            } else {
                onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
            }
        });
        xhr.addEventListener('error', function () {
            onError('Произошла ошибка соединения');
        });
        xhr.addEventListener('timeout', function () {
            onError('Запрос не успел выполниться за ' + LOAD_TIME + 'мс');
        });
        return xhr;
    };
    var load = function (onSuccess, onError) {
        var xhr = xhrRequest(onSuccess, onError);
        xhr.open('GET', window.SERVER_URL_GET);
        xhr.send();
    };

    var save = function (data, onSuccess, onError) {
        var xhr = xhrRequest(onSuccess, onError);
        xhr.open('POST', window.SERVER_URL_POST);
        xhr.send(data);
    };

    window.backend = {
        load: load,
        save: save
    };
})();