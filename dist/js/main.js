'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

window.onload = function () {

    //comenzamos
    var x = 5;
    console.log("variable x = " + x);

    /********************************************************************/
    //OpenWeather
    var COUNTRY = 'bilbao';
    var API_ID = '4ee841cfbd26ba9d323591e315799f67';
    var END_POINT = 'http://api.openweathermap.org/data/2.5/weather';

    var promesa = ajaxGet(END_POINT + '?q=' + COUNTRY + '&appid=' + API_ID);
    //ajaxGet('http://api.openweathermap.org/data/2.5/weather?q=bilbao&appid=4ee841cfbd26ba9d323591e315799f67');
    //ajaxGet('http://samples.openweathermap.org/data/2.5/weather?q=jjj&appid=b1b15e88fa797225412429c1c50c122a1');


    var KELVIN = -273.15;

    promesa.then(function (data) {
        console.log('response OpenWeather %o', data);
        // Pasar a JSON el string
        var json = JSON.parse(data);

        var widget = document.getElementById('widget-bilbao');
        widget.querySelector('p').innerHTML = json.name;
        var temp = Math.round(json.main.temp + KELVIN);
        widget.querySelector('h1').innerHTML = temp + '\xBA';
    }).catch(function (error) {
        console.warn('OpenWeather Error %o', error);
    });

    /********************************************************************/
    // crear dos Orcos y que saluden
    var orco1 = new Orco();
    orco1.saluda();

    var orco2 = new Orco('Tomasin');
    orco2.saluda();

    //LLAMADA A LA FUNCION DE PROMESA
    hacerAlgoPromesa().then(function () {
        console.info('Terminada Ejecucion :-)');
    }).catch(function () {
        console.info('Peto la Ejecucion :-(');
    });

    hacerAlgoPromesa(13).then(function () {
        console.info('Terminada Ejecucion :-)');
    }).catch(function () {
        console.info('Peto la Ejecucion :-(');
    });
};

//////////////////////////////////////
//VARIABLES NUEVAS
//////////////////////////////////////

var PI = 3.14;

var PERSONA = {
    id: '01',
    name: 'David'
};
PERSONA.name = 'Miguel';
console.log(PERSONA.name);

function funcion_let(nombre) {
    console.log(miVar);
    if (true) {
        var _miVar = 'Hola ' + nombre;
    }
    console.log(miVar);
}

//////////////////////////////////////
//PROMESAS
//////////////////////////////////////

function hacerAlgoPromesa(parametro) {
    function haciendoalgo(resolve, reject) {
        console.log('hacer algo que ocupa un tiempo...');
        if (parametro == 13) {
            setTimeout(reject, 2000);
        } else {
            setTimeout(resolve, 4000);
        }
    }
    return new Promise(haciendoalgo);
}

//////////////////////////////////////
//Arrow
//////////////////////////////////////

function lista_compra() {
    var lista = ["pizza", "cerveza", "cordonices"];

    lista.forEach(function (elemento) {
        console.log(elemento);
    });
}

//////////////////////////////////////
//Clases
//////////////////////////////////////

var Orco = function () {
    function Orco() {
        var nombre = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "Anorg";

        _classCallCheck(this, Orco);

        this.nombre = nombre;
    }

    _createClass(Orco, [{
        key: 'saluda',
        value: function saluda() {
            console.info('Mi nombre es ' + this.nombre);
        }
    }]);

    return Orco;
}();

//////////////////////////////////////
//Weather London
//////////////////////////////////////
/*function cargarDatos(){

    console.log('iniciado carga de datos');

    // Obtener la instancia del objeto XMLHttpRequest
    if(window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    }
    else if(window.ActiveXObject) {
        //internet explorer =< IE6
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }

    //funccion de Respuesta ( response )
    xhr.onreadystatechange = rellenarLista();

    // Realizar Request
    xhr.open('get', 'http://samples.openweathermap.org/data/2.5/weather?q=London,uk&appid=b1b15e88fa797225412429c1c50c122a1', true);
    xhr.send();

}
*/

//////////////////////////////////////
//Weather Bilbao
//////////////////////////////////////

/**
    Metodo para realizar una llamada Ajax por GET
    return: Promise
*/

function ajaxGet(url) {
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

function cerrar() {
    console.debug('cerrar widget');

    var widget = document.getElementById('widget-bilbao');
    widget.style.animation = 'disappear 1.1s';
    //setInterval(function(){ widget.remove(); }, 1000);
    setInterval(function () {
        widget.remove();
    }, 1000);
}
