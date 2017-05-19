'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var API_ID = '4ee841cfbd26ba9d323591e315799f67',
    END_POINT = 'http://api.openweathermap.org/data/2.5/weather',
    KELVIN = -273.15;

//var promesa = ajaxGet(END_POINT + '?q=' + COUNTRY + '&appid=' + API_ID);


var Widget = function () {
    function Widget(country, wrapper_id) {
        _classCallCheck(this, Widget);

        this.country = country;
        this.wrapper = document.getElementById(wrapper_id);
        this.data = null; // json data

        this.paint();
        this.listenners();
        var promesa = this.callApi(END_POINT + '?q=' + this.country + '&appid=' + API_ID);

        this.repaint(promesa, this.country);
    }

    _createClass(Widget, [{
        key: 'paint',
        value: function paint() {
            var card = '<div id="widget-' + this.country + '" class="weather-card london">\n                        <button id="widget-btn-' + this.country + '">x</button>\n                        <div class="weather-icon"></div>\n                        <h1>X\xBA</h1>\n                        <p>cargando...</p>\n                    </div>';
            this.wrapper.innerHTML += card;
            console.debug('Widget:paint card');
        }
    }, {
        key: 'listenners',
        value: function listenners() {
            console.debug('Widget:listener');
            //let countries = document.getElementById(this.wrapper_id);
            //console.log("countries %o", countries);
            var button = document.getElementById('widget-btn-' + this.country);
            button.addEventListener('click', this.destroy);
        }
    }, {
        key: 'callApi',
        value: function callApi(url) {
            console.debug('Widget:callApi');

            return new Promise(function (resolve, reject) {
                var req = new XMLHttpRequest();
                req.open("GET", url);
                req.onload = function () {
                    if (req.status === 200) {
                        resolve(req.response);
                    } else {
                        reject(new Error(req.statusText));
                    }
                };

                req.onerror = function () {
                    reject(new Error("Network error"));
                };

                req.send();
            });
        }
    }, {
        key: 'repaint',
        value: function repaint(promesa, country) {
            console.debug('Widget:repaint');

            console.info(this.country);

            promesa.then(function (data) {
                console.log('response OpenWeather %o', data);
                // Pasar a JSON el string
                var json = JSON.parse(data);

                var widget = document.getElementById('widget-' + country);
                widget.querySelector('p').innerHTML = json.name;
                var temp = Math.round(json.main.temp + KELVIN);
                widget.querySelector('h1').innerHTML = temp + '\xBA';
            }).catch(function (error) {
                console.warn('OpenWeather Error %o', error);
            });
        }
    }, {
        key: 'destroy',
        value: function destroy() {
            console.debug('Widget:destroy');
            var widget = this.parentNode;
            widget.style.animation = 'disappear 1.1s';
            setInterval(function () {
                widget.remove();
            }, 1000);
        }
    }]);

    return Widget;
}();

;
