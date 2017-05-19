'use strict';

const API_ID = '4ee841cfbd26ba9d323591e315799f67',
      END_POINT = 'http://api.openweathermap.org/data/2.5/weather',
      KELVIN = -273.15;

//var promesa = ajaxGet(END_POINT + '?q=' + COUNTRY + '&appid=' + API_ID);


class Widget{

    constructor( country, wrapper_id ){
        this.country = country;
        this.wrapper = document.getElementById(wrapper_id);
        this.data = null; // json data

        this.paint();
        this.listenners();
        let promesa = this.callApi(`${END_POINT}?q=${this.country}&appid=${API_ID}`);

        this.repaint(promesa, this.country);

    }

    paint(){
        let card = `<div id="widget-${this.country}" class="weather-card london">
                        <button id="widget-btn-${this.country}">x</button>
                        <div class="weather-icon"></div>
                        <h1>Xº</h1>
                        <p>cargando...</p>
                    </div>`;
        this.wrapper.innerHTML += card;
        console.debug(`Widget:paint card`);

    }

    listenners(){
        console.debug('Widget:listener');
        //let countries = document.getElementById(this.wrapper_id);
        //console.log("countries %o", countries);
        let button = document.getElementById(`widget-btn-${this.country}`);
        button.addEventListener('click', this.destroy);

    }

    callApi(url){
        console.debug('Widget:callApi');

        return new Promise(function(resolve, reject) {
            let req = new XMLHttpRequest();
            req.open("GET", url);
            req.onload = function() {
                if (req.status === 200) {
                    resolve(req.response);
                } else {
                    reject(new Error(req.statusText));
                }
            };

            req.onerror = function() {
                reject(new Error("Network error"));
            };

            req.send();
        });
    }

    repaint(promesa, country){
        console.debug('Widget:repaint');

        console.info(this.country);

        promesa.then(function(data){
            console.log('response OpenWeather %o', data);
            // Pasar a JSON el string
            let json = JSON.parse(data);

            let widget = document.getElementById(`widget-${country}`);
            widget.querySelector('p').innerHTML = json.name;
            let temp = Math.round(json.main.temp + KELVIN)
            widget.querySelector('h1').innerHTML = `${temp}º`;

        }).catch(function(error){
           console.warn('OpenWeather Error %o', error);
        });

    }

    destroy(){
        console.debug('Widget:destroy');
        let widget = this.parentNode;
        widget.style.animation = 'disappear 1.1s';
        setInterval( () => { widget.remove(); }, 1000);
    }


};
