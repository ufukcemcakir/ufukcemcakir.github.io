/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/api.js":
/*!********************!*\
  !*** ./src/api.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   API_KEY: () => (/* binding */ API_KEY),
/* harmony export */   BASE_URL: () => (/* binding */ BASE_URL)
/* harmony export */ });
const API_KEY = "P6M7W4LZHVHDZVK9FDXC4B7HH";
const BASE_URL = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/';

/***/ }),

/***/ "./src/footer.js":
/*!***********************!*\
  !*** ./src/footer.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createFooter: () => (/* binding */ createFooter)
/* harmony export */ });
function createFooter() {
    const footer = document.createElement("footer");
    footer.classList.add("footer");
  
    const copyright = document.createElement("p");
    copyright.textContent = `Copyright © ${new Date().getFullYear()} ufukcemcakir`;
  
    const githubLink = document.createElement("a");
    githubLink.href = "https://github.com/ufukcemcakir";
  
    const githubIcon = document.createElement("i");
    githubIcon.classList.add("fab", "fa-github");
  
    githubLink.appendChild(githubIcon);
    footer.appendChild(copyright);
    footer.appendChild(githubLink);
  
    return footer;
}

/***/ }),

/***/ "./src/imageController.js":
/*!********************************!*\
  !*** ./src/imageController.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   updateBackgroundImage: () => (/* binding */ updateBackgroundImage)
/* harmony export */ });
const weatherImages = {
    'clear': './images/sunny.jpg',
    'cloudy': './images/cloudy.jpg',
    'partly-cloudy': './images/cloudy.jpg',
    'rain': './images/rain.jpg',
    'snow': './images/snow.jpg',
    'thunderstorm': './images/thunderstorm.jpg',
    'default': './images/default.jpg'
};

function updateBackgroundImage(condition) {
    const backgroundContainer = document.getElementById('background-container');
    const lowerCaseCondition = condition.toLowerCase();
    
    let imageUrl = weatherImages.default;
    
    for (const [key, url] of Object.entries(weatherImages)) {
        if (lowerCaseCondition.includes(key)) {
            imageUrl = url;
            break;
        }
    }
    
    backgroundContainer.style.backgroundImage = `url('${imageUrl}')`;
}

/***/ }),

/***/ "./src/uiController.js":
/*!*****************************!*\
  !*** ./src/uiController.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   displayWeatherInfo: () => (/* binding */ displayWeatherInfo),
/* harmony export */   hideWeatherInfo: () => (/* binding */ hideWeatherInfo)
/* harmony export */ });
/* harmony import */ var _imageController_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./imageController.js */ "./src/imageController.js");
/* harmony import */ var _weatherData_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./weatherData.js */ "./src/weatherData.js");



function displayWeatherInfo(data) {
    const weatherInfoContainer = document.getElementById('weather-info-container');
    const weatherInfo = document.getElementById('weather-info');
    const unit = document.querySelector('input[name="unit"]:checked').value;
    const temperature = unit === 'fahrenheit' ? (0,_weatherData_js__WEBPACK_IMPORTED_MODULE_1__.fahrenheitFromCelsius)(data.temperature) : data.temperature;
    const unitSymbol = unit === 'fahrenheit' ? '°F' : '°C';

    weatherInfo.innerHTML = `
        <h2>${data.location}</h2>
        <p id="temperature">Temperature: ${temperature.toFixed(1)}${unitSymbol}</p>
        <p>Condition: ${data.condition}</p>
        <p>Humidity: ${data.humidity}%</p>
        <p>Wind Speed: ${data.windSpeed} km/h</p>
    `;

    weatherInfoContainer.classList.remove('hidden');
    weatherInfoContainer.classList.add('visible');

    (0,_imageController_js__WEBPACK_IMPORTED_MODULE_0__.updateBackgroundImage)(data.condition);
}

function hideWeatherInfo() {
    const weatherInfoContainer = document.getElementById('weather-info-container');
    weatherInfoContainer.classList.remove('visible');
    weatherInfoContainer.classList.add('hidden');
}

/***/ }),

/***/ "./src/weatherData.js":
/*!****************************!*\
  !*** ./src/weatherData.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   celsiusFromFahrenheit: () => (/* binding */ celsiusFromFahrenheit),
/* harmony export */   fahrenheitFromCelsius: () => (/* binding */ fahrenheitFromCelsius),
/* harmony export */   getWeatherData: () => (/* binding */ getWeatherData)
/* harmony export */ });
/* harmony import */ var _api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api.js */ "./src/api.js");


async function getWeatherData(location) {
    const url = `${_api_js__WEBPACK_IMPORTED_MODULE_0__.BASE_URL}${location}?unitGroup=metric&key=${_api_js__WEBPACK_IMPORTED_MODULE_0__.API_KEY}&contentType=json`;
    
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Weather data not found');
        }
        const data = await response.json();
        return processWeatherData(data);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        throw error;
    }
}

function processWeatherData(data) {
    const currentConditions = data.currentConditions;
    return {
        location: data.resolvedAddress,
        temperature: currentConditions.temp,
        condition: currentConditions.conditions,
        icon: currentConditions.icon,
        humidity: currentConditions.humidity,
        windSpeed: currentConditions.windspeed
    };
}

function fahrenheitFromCelsius(celsius) {
    return (celsius * 9/5) + 32;
}

function celsiusFromFahrenheit(fahrenheit) {
    return (fahrenheit - 32) * 5/9;
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _weatherData_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./weatherData.js */ "./src/weatherData.js");
/* harmony import */ var _uiController_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./uiController.js */ "./src/uiController.js");
/* harmony import */ var _footer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./footer.js */ "./src/footer.js");




let currentWeatherData = null;

const weatherForm = document.getElementById('weather-form');
const locationInput = document.getElementById('location');
const loading = document.getElementById('loading');
const unitSelector = document.getElementById('unit-selector');

weatherForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const location = locationInput.value;
    
    loading.classList.remove('hidden');
    (0,_uiController_js__WEBPACK_IMPORTED_MODULE_1__.hideWeatherInfo)();

    try {
        currentWeatherData = await (0,_weatherData_js__WEBPACK_IMPORTED_MODULE_0__.getWeatherData)(location);
        (0,_uiController_js__WEBPACK_IMPORTED_MODULE_1__.displayWeatherInfo)(currentWeatherData);
    } catch (error) {
        document.getElementById('weather-info').innerHTML = `<p>Error: ${error.message}</p>`;
        document.getElementById('weather-info-container').classList.add('visible');
    } finally {
        loading.classList.add('hidden');
    }
});

unitSelector.addEventListener('change', () => {
    if (currentWeatherData) {
        (0,_uiController_js__WEBPACK_IMPORTED_MODULE_1__.displayWeatherInfo)(currentWeatherData);
    }
});

document.body.appendChild((0,_footer_js__WEBPACK_IMPORTED_MODULE_2__.createFooter)());
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBTztBQUNBOzs7Ozs7Ozs7Ozs7OztBQ0RBO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQ0FBMkMsMEJBQTBCO0FBQ3JFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7OztBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0RBQXdELFNBQVM7QUFDakU7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDeEI2RDtBQUNKO0FBQ3pEO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQSxnREFBZ0Qsc0VBQXFCO0FBQ3JFO0FBQ0E7QUFDQTtBQUNBLGNBQWMsY0FBYztBQUM1QiwyQ0FBMkMsdUJBQXVCLEVBQUUsV0FBVztBQUMvRSx3QkFBd0IsZUFBZTtBQUN2Qyx1QkFBdUIsY0FBYztBQUNyQyx5QkFBeUIsZ0JBQWdCO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLDBFQUFxQjtBQUN6QjtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM1QjZDO0FBQzdDO0FBQ087QUFDUCxtQkFBbUIsNkNBQVEsQ0FBQyxFQUFFLFNBQVMsd0JBQXdCLDRDQUFPLENBQUM7QUFDdkU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7Ozs7OztVQ3BDQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTmtEO0FBQ3NCO0FBQzdCO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSxpRUFBZTtBQUNuQjtBQUNBO0FBQ0EsbUNBQW1DLCtEQUFjO0FBQ2pELFFBQVEsb0VBQWtCO0FBQzFCLE1BQU07QUFDTix5RUFBeUUsY0FBYztBQUN2RjtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLFFBQVEsb0VBQWtCO0FBQzFCO0FBQ0EsQ0FBQztBQUNEO0FBQ0EsMEJBQTBCLHdEQUFZLEkiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9hcGkuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvZm9vdGVyLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2ltYWdlQ29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy91aUNvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvd2VhdGhlckRhdGEuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3QgQVBJX0tFWSA9IFwiUDZNN1c0TFpIVkhEWlZLOUZEWEM0QjdISFwiO1xyXG5leHBvcnQgY29uc3QgQkFTRV9VUkwgPSAnaHR0cHM6Ly93ZWF0aGVyLnZpc3VhbGNyb3NzaW5nLmNvbS9WaXN1YWxDcm9zc2luZ1dlYlNlcnZpY2VzL3Jlc3Qvc2VydmljZXMvdGltZWxpbmUvJzsiLCJleHBvcnQgZnVuY3Rpb24gY3JlYXRlRm9vdGVyKCkge1xyXG4gICAgY29uc3QgZm9vdGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImZvb3RlclwiKTtcclxuICAgIGZvb3Rlci5jbGFzc0xpc3QuYWRkKFwiZm9vdGVyXCIpO1xyXG4gIFxyXG4gICAgY29uc3QgY29weXJpZ2h0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XHJcbiAgICBjb3B5cmlnaHQudGV4dENvbnRlbnQgPSBgQ29weXJpZ2h0IMKpICR7bmV3IERhdGUoKS5nZXRGdWxsWWVhcigpfSB1ZnVrY2VtY2FraXJgO1xyXG4gIFxyXG4gICAgY29uc3QgZ2l0aHViTGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhXCIpO1xyXG4gICAgZ2l0aHViTGluay5ocmVmID0gXCJodHRwczovL2dpdGh1Yi5jb20vdWZ1a2NlbWNha2lyXCI7XHJcbiAgXHJcbiAgICBjb25zdCBnaXRodWJJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlcIik7XHJcbiAgICBnaXRodWJJY29uLmNsYXNzTGlzdC5hZGQoXCJmYWJcIiwgXCJmYS1naXRodWJcIik7XHJcbiAgXHJcbiAgICBnaXRodWJMaW5rLmFwcGVuZENoaWxkKGdpdGh1Ykljb24pO1xyXG4gICAgZm9vdGVyLmFwcGVuZENoaWxkKGNvcHlyaWdodCk7XHJcbiAgICBmb290ZXIuYXBwZW5kQ2hpbGQoZ2l0aHViTGluayk7XHJcbiAgXHJcbiAgICByZXR1cm4gZm9vdGVyO1xyXG59IiwiY29uc3Qgd2VhdGhlckltYWdlcyA9IHtcclxuICAgICdjbGVhcic6ICcuL2ltYWdlcy9zdW5ueS5qcGcnLFxyXG4gICAgJ2Nsb3VkeSc6ICcuL2ltYWdlcy9jbG91ZHkuanBnJyxcclxuICAgICdwYXJ0bHktY2xvdWR5JzogJy4vaW1hZ2VzL2Nsb3VkeS5qcGcnLFxyXG4gICAgJ3JhaW4nOiAnLi9pbWFnZXMvcmFpbi5qcGcnLFxyXG4gICAgJ3Nub3cnOiAnLi9pbWFnZXMvc25vdy5qcGcnLFxyXG4gICAgJ3RodW5kZXJzdG9ybSc6ICcuL2ltYWdlcy90aHVuZGVyc3Rvcm0uanBnJyxcclxuICAgICdkZWZhdWx0JzogJy4vaW1hZ2VzL2RlZmF1bHQuanBnJ1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZUJhY2tncm91bmRJbWFnZShjb25kaXRpb24pIHtcclxuICAgIGNvbnN0IGJhY2tncm91bmRDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYmFja2dyb3VuZC1jb250YWluZXInKTtcclxuICAgIGNvbnN0IGxvd2VyQ2FzZUNvbmRpdGlvbiA9IGNvbmRpdGlvbi50b0xvd2VyQ2FzZSgpO1xyXG4gICAgXHJcbiAgICBsZXQgaW1hZ2VVcmwgPSB3ZWF0aGVySW1hZ2VzLmRlZmF1bHQ7XHJcbiAgICBcclxuICAgIGZvciAoY29uc3QgW2tleSwgdXJsXSBvZiBPYmplY3QuZW50cmllcyh3ZWF0aGVySW1hZ2VzKSkge1xyXG4gICAgICAgIGlmIChsb3dlckNhc2VDb25kaXRpb24uaW5jbHVkZXMoa2V5KSkge1xyXG4gICAgICAgICAgICBpbWFnZVVybCA9IHVybDtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBiYWNrZ3JvdW5kQ29udGFpbmVyLnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IGB1cmwoJyR7aW1hZ2VVcmx9JylgO1xyXG59IiwiaW1wb3J0IHsgdXBkYXRlQmFja2dyb3VuZEltYWdlIH0gZnJvbSAnLi9pbWFnZUNvbnRyb2xsZXIuanMnO1xyXG5pbXBvcnQgeyBmYWhyZW5oZWl0RnJvbUNlbHNpdXMgfSBmcm9tICcuL3dlYXRoZXJEYXRhLmpzJztcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBkaXNwbGF5V2VhdGhlckluZm8oZGF0YSkge1xyXG4gICAgY29uc3Qgd2VhdGhlckluZm9Db250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnd2VhdGhlci1pbmZvLWNvbnRhaW5lcicpO1xyXG4gICAgY29uc3Qgd2VhdGhlckluZm8gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnd2VhdGhlci1pbmZvJyk7XHJcbiAgICBjb25zdCB1bml0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaW5wdXRbbmFtZT1cInVuaXRcIl06Y2hlY2tlZCcpLnZhbHVlO1xyXG4gICAgY29uc3QgdGVtcGVyYXR1cmUgPSB1bml0ID09PSAnZmFocmVuaGVpdCcgPyBmYWhyZW5oZWl0RnJvbUNlbHNpdXMoZGF0YS50ZW1wZXJhdHVyZSkgOiBkYXRhLnRlbXBlcmF0dXJlO1xyXG4gICAgY29uc3QgdW5pdFN5bWJvbCA9IHVuaXQgPT09ICdmYWhyZW5oZWl0JyA/ICfCsEYnIDogJ8KwQyc7XHJcblxyXG4gICAgd2VhdGhlckluZm8uaW5uZXJIVE1MID0gYFxyXG4gICAgICAgIDxoMj4ke2RhdGEubG9jYXRpb259PC9oMj5cclxuICAgICAgICA8cCBpZD1cInRlbXBlcmF0dXJlXCI+VGVtcGVyYXR1cmU6ICR7dGVtcGVyYXR1cmUudG9GaXhlZCgxKX0ke3VuaXRTeW1ib2x9PC9wPlxyXG4gICAgICAgIDxwPkNvbmRpdGlvbjogJHtkYXRhLmNvbmRpdGlvbn08L3A+XHJcbiAgICAgICAgPHA+SHVtaWRpdHk6ICR7ZGF0YS5odW1pZGl0eX0lPC9wPlxyXG4gICAgICAgIDxwPldpbmQgU3BlZWQ6ICR7ZGF0YS53aW5kU3BlZWR9IGttL2g8L3A+XHJcbiAgICBgO1xyXG5cclxuICAgIHdlYXRoZXJJbmZvQ29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xyXG4gICAgd2VhdGhlckluZm9Db250YWluZXIuY2xhc3NMaXN0LmFkZCgndmlzaWJsZScpO1xyXG5cclxuICAgIHVwZGF0ZUJhY2tncm91bmRJbWFnZShkYXRhLmNvbmRpdGlvbik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBoaWRlV2VhdGhlckluZm8oKSB7XHJcbiAgICBjb25zdCB3ZWF0aGVySW5mb0NvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd3ZWF0aGVyLWluZm8tY29udGFpbmVyJyk7XHJcbiAgICB3ZWF0aGVySW5mb0NvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKCd2aXNpYmxlJyk7XHJcbiAgICB3ZWF0aGVySW5mb0NvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcclxufSIsImltcG9ydCB7IEFQSV9LRVksIEJBU0VfVVJMIH0gZnJvbSAnLi9hcGkuanMnO1xyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFdlYXRoZXJEYXRhKGxvY2F0aW9uKSB7XHJcbiAgICBjb25zdCB1cmwgPSBgJHtCQVNFX1VSTH0ke2xvY2F0aW9ufT91bml0R3JvdXA9bWV0cmljJmtleT0ke0FQSV9LRVl9JmNvbnRlbnRUeXBlPWpzb25gO1xyXG4gICAgXHJcbiAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godXJsKTtcclxuICAgICAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignV2VhdGhlciBkYXRhIG5vdCBmb3VuZCcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xyXG4gICAgICAgIHJldHVybiBwcm9jZXNzV2VhdGhlckRhdGEoZGF0YSk7XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGZldGNoaW5nIHdlYXRoZXIgZGF0YTonLCBlcnJvcik7XHJcbiAgICAgICAgdGhyb3cgZXJyb3I7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHByb2Nlc3NXZWF0aGVyRGF0YShkYXRhKSB7XHJcbiAgICBjb25zdCBjdXJyZW50Q29uZGl0aW9ucyA9IGRhdGEuY3VycmVudENvbmRpdGlvbnM7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGxvY2F0aW9uOiBkYXRhLnJlc29sdmVkQWRkcmVzcyxcclxuICAgICAgICB0ZW1wZXJhdHVyZTogY3VycmVudENvbmRpdGlvbnMudGVtcCxcclxuICAgICAgICBjb25kaXRpb246IGN1cnJlbnRDb25kaXRpb25zLmNvbmRpdGlvbnMsXHJcbiAgICAgICAgaWNvbjogY3VycmVudENvbmRpdGlvbnMuaWNvbixcclxuICAgICAgICBodW1pZGl0eTogY3VycmVudENvbmRpdGlvbnMuaHVtaWRpdHksXHJcbiAgICAgICAgd2luZFNwZWVkOiBjdXJyZW50Q29uZGl0aW9ucy53aW5kc3BlZWRcclxuICAgIH07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBmYWhyZW5oZWl0RnJvbUNlbHNpdXMoY2Vsc2l1cykge1xyXG4gICAgcmV0dXJuIChjZWxzaXVzICogOS81KSArIDMyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY2Vsc2l1c0Zyb21GYWhyZW5oZWl0KGZhaHJlbmhlaXQpIHtcclxuICAgIHJldHVybiAoZmFocmVuaGVpdCAtIDMyKSAqIDUvOTtcclxufSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgZ2V0V2VhdGhlckRhdGEgfSBmcm9tICcuL3dlYXRoZXJEYXRhLmpzJztcclxuaW1wb3J0IHsgZGlzcGxheVdlYXRoZXJJbmZvLCBoaWRlV2VhdGhlckluZm8gfSBmcm9tICcuL3VpQ29udHJvbGxlci5qcyc7XHJcbmltcG9ydCB7IGNyZWF0ZUZvb3RlciB9IGZyb20gJy4vZm9vdGVyLmpzJztcclxuXHJcbmxldCBjdXJyZW50V2VhdGhlckRhdGEgPSBudWxsO1xyXG5cclxuY29uc3Qgd2VhdGhlckZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnd2VhdGhlci1mb3JtJyk7XHJcbmNvbnN0IGxvY2F0aW9uSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbG9jYXRpb24nKTtcclxuY29uc3QgbG9hZGluZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsb2FkaW5nJyk7XHJcbmNvbnN0IHVuaXRTZWxlY3RvciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1bml0LXNlbGVjdG9yJyk7XHJcblxyXG53ZWF0aGVyRm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCBhc3luYyAoZSkgPT4ge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgY29uc3QgbG9jYXRpb24gPSBsb2NhdGlvbklucHV0LnZhbHVlO1xyXG4gICAgXHJcbiAgICBsb2FkaW5nLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xyXG4gICAgaGlkZVdlYXRoZXJJbmZvKCk7XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgICBjdXJyZW50V2VhdGhlckRhdGEgPSBhd2FpdCBnZXRXZWF0aGVyRGF0YShsb2NhdGlvbik7XHJcbiAgICAgICAgZGlzcGxheVdlYXRoZXJJbmZvKGN1cnJlbnRXZWF0aGVyRGF0YSk7XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd3ZWF0aGVyLWluZm8nKS5pbm5lckhUTUwgPSBgPHA+RXJyb3I6ICR7ZXJyb3IubWVzc2FnZX08L3A+YDtcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnd2VhdGhlci1pbmZvLWNvbnRhaW5lcicpLmNsYXNzTGlzdC5hZGQoJ3Zpc2libGUnKTtcclxuICAgIH0gZmluYWxseSB7XHJcbiAgICAgICAgbG9hZGluZy5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcclxuICAgIH1cclxufSk7XHJcblxyXG51bml0U2VsZWN0b3IuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKCkgPT4ge1xyXG4gICAgaWYgKGN1cnJlbnRXZWF0aGVyRGF0YSkge1xyXG4gICAgICAgIGRpc3BsYXlXZWF0aGVySW5mbyhjdXJyZW50V2VhdGhlckRhdGEpO1xyXG4gICAgfVxyXG59KTtcclxuXHJcbmRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoY3JlYXRlRm9vdGVyKCkpOyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==