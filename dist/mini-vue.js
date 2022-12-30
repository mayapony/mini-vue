/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/reactive/effect.js":
/*!********************************!*\
  !*** ./src/reactive/effect.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "effect": () => (/* binding */ effect),
/* harmony export */   "track": () => (/* binding */ track),
/* harmony export */   "trigger": () => (/* binding */ trigger)
/* harmony export */ });
// target and key map a activeEffect(a function)
let activeEffect;

const effect = (fn) => {
  //
  const effectFn = () => {
    try {
      activeEffect = effectFn;
      return fn();
    } finally {
      // TODO effect try-catch finally...
    }
  };

  return effectFn();
};

/**
 * weakmap only allow object as it's key
 * targetMap = object(reactive object) -> key -> [activeEffectFn()]
 * reactive object and key (object.key) may correspond to multiple function
 */
const targetMap = new WeakMap();
const track = (target, key) => {
  if (!target || !key) {
    console.error('you lost target or key in track!');
    return;
  }
  if (!activeEffect) return;

  let depsMap = targetMap.get(target);
  if (!depsMap) targetMap.set(target, (depsMap = new Map()));
  let deps = depsMap.get(key);
  if (!deps) depsMap.set(key, (deps = new Set()));
  deps.add(activeEffect);
};

const trigger = (target, key) => {
  if (!target || !key) {
    console.error('you lost target or key in trigger!');
    return;
  }
  const depsMap = targetMap.get(target);
  if (!depsMap) return;
  const deps = depsMap.get(key);
  if (!deps) return;

  deps.forEach((fn) => {
    fn();
  });
};


/***/ }),

/***/ "./src/reactive/reactive.js":
/*!**********************************!*\
  !*** ./src/reactive/reactive.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "reactive": () => (/* binding */ reactive)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ "./src/utils/index.js");
/* harmony import */ var _effect__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./effect */ "./src/reactive/effect.js");



const reactive = (target) => {
  // target must be object
  if (!(0,_utils__WEBPACK_IMPORTED_MODULE_0__.isObject)(target)) {
    return target;
  }

  // proxy intercepts
  const proxy = new Proxy(target, {
    get: (target, key, receiver) => {
      const res = Reflect.get(target, key, receiver);
      (0,_effect__WEBPACK_IMPORTED_MODULE_1__.track)(target, key);
      return res;
    },
    set: (target, key, value, receiver) => {
      const res = Reflect.set(target, key, value, receiver);
      (0,_effect__WEBPACK_IMPORTED_MODULE_1__.trigger)(target, key);
      return res;
    },
  });

  return proxy;
};


/***/ }),

/***/ "./src/utils/index.js":
/*!****************************!*\
  !*** ./src/utils/index.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isObject": () => (/* binding */ isObject)
/* harmony export */ });
function isObject(target) {
  return typeof target === 'object' && target !== null;
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
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _reactive_effect__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./reactive/effect */ "./src/reactive/effect.js");
/* harmony import */ var _reactive_reactive__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./reactive/reactive */ "./src/reactive/reactive.js");



const counter = (window.counter = (0,_reactive_reactive__WEBPACK_IMPORTED_MODULE_1__.reactive)({
  count: 0,
}));

(0,_reactive_effect__WEBPACK_IMPORTED_MODULE_0__.effect)(() => {
  console.log('count change...' + counter.count);
});

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWluaS12dWUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNsREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ3hCQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUN2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUNQQTs7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdnVlLW1pbmkvLi9zcmMvcmVhY3RpdmUvZWZmZWN0LmpzIiwid2VicGFjazovL3Z1ZS1taW5pLy4vc3JjL3JlYWN0aXZlL3JlYWN0aXZlLmpzIiwid2VicGFjazovL3Z1ZS1taW5pLy4vc3JjL3V0aWxzL2luZGV4LmpzIiwid2VicGFjazovL3Z1ZS1taW5pL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3Z1ZS1taW5pL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly92dWUtbWluaS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3Z1ZS1taW5pL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdnVlLW1pbmkvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gdGFyZ2V0IGFuZCBrZXkgbWFwIGEgYWN0aXZlRWZmZWN0KGEgZnVuY3Rpb24pXG5sZXQgYWN0aXZlRWZmZWN0O1xuXG5leHBvcnQgY29uc3QgZWZmZWN0ID0gKGZuKSA9PiB7XG4gIC8vXG4gIGNvbnN0IGVmZmVjdEZuID0gKCkgPT4ge1xuICAgIHRyeSB7XG4gICAgICBhY3RpdmVFZmZlY3QgPSBlZmZlY3RGbjtcbiAgICAgIHJldHVybiBmbigpO1xuICAgIH0gZmluYWxseSB7XG4gICAgICAvLyBUT0RPIGVmZmVjdCB0cnktY2F0Y2ggZmluYWxseS4uLlxuICAgIH1cbiAgfTtcblxuICByZXR1cm4gZWZmZWN0Rm4oKTtcbn07XG5cbi8qKlxuICogd2Vha21hcCBvbmx5IGFsbG93IG9iamVjdCBhcyBpdCdzIGtleVxuICogdGFyZ2V0TWFwID0gb2JqZWN0KHJlYWN0aXZlIG9iamVjdCkgLT4ga2V5IC0+IFthY3RpdmVFZmZlY3RGbigpXVxuICogcmVhY3RpdmUgb2JqZWN0IGFuZCBrZXkgKG9iamVjdC5rZXkpIG1heSBjb3JyZXNwb25kIHRvIG11bHRpcGxlIGZ1bmN0aW9uXG4gKi9cbmNvbnN0IHRhcmdldE1hcCA9IG5ldyBXZWFrTWFwKCk7XG5leHBvcnQgY29uc3QgdHJhY2sgPSAodGFyZ2V0LCBrZXkpID0+IHtcbiAgaWYgKCF0YXJnZXQgfHwgIWtleSkge1xuICAgIGNvbnNvbGUuZXJyb3IoJ3lvdSBsb3N0IHRhcmdldCBvciBrZXkgaW4gdHJhY2shJyk7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmICghYWN0aXZlRWZmZWN0KSByZXR1cm47XG5cbiAgbGV0IGRlcHNNYXAgPSB0YXJnZXRNYXAuZ2V0KHRhcmdldCk7XG4gIGlmICghZGVwc01hcCkgdGFyZ2V0TWFwLnNldCh0YXJnZXQsIChkZXBzTWFwID0gbmV3IE1hcCgpKSk7XG4gIGxldCBkZXBzID0gZGVwc01hcC5nZXQoa2V5KTtcbiAgaWYgKCFkZXBzKSBkZXBzTWFwLnNldChrZXksIChkZXBzID0gbmV3IFNldCgpKSk7XG4gIGRlcHMuYWRkKGFjdGl2ZUVmZmVjdCk7XG59O1xuXG5leHBvcnQgY29uc3QgdHJpZ2dlciA9ICh0YXJnZXQsIGtleSkgPT4ge1xuICBpZiAoIXRhcmdldCB8fCAha2V5KSB7XG4gICAgY29uc29sZS5lcnJvcigneW91IGxvc3QgdGFyZ2V0IG9yIGtleSBpbiB0cmlnZ2VyIScpO1xuICAgIHJldHVybjtcbiAgfVxuICBjb25zdCBkZXBzTWFwID0gdGFyZ2V0TWFwLmdldCh0YXJnZXQpO1xuICBpZiAoIWRlcHNNYXApIHJldHVybjtcbiAgY29uc3QgZGVwcyA9IGRlcHNNYXAuZ2V0KGtleSk7XG4gIGlmICghZGVwcykgcmV0dXJuO1xuXG4gIGRlcHMuZm9yRWFjaCgoZm4pID0+IHtcbiAgICBmbigpO1xuICB9KTtcbn07XG4iLCJpbXBvcnQgeyBpc09iamVjdCB9IGZyb20gJy4uL3V0aWxzJztcbmltcG9ydCB7IHRyYWNrLCB0cmlnZ2VyIH0gZnJvbSAnLi9lZmZlY3QnO1xuXG5leHBvcnQgY29uc3QgcmVhY3RpdmUgPSAodGFyZ2V0KSA9PiB7XG4gIC8vIHRhcmdldCBtdXN0IGJlIG9iamVjdFxuICBpZiAoIWlzT2JqZWN0KHRhcmdldCkpIHtcbiAgICByZXR1cm4gdGFyZ2V0O1xuICB9XG5cbiAgLy8gcHJveHkgaW50ZXJjZXB0c1xuICBjb25zdCBwcm94eSA9IG5ldyBQcm94eSh0YXJnZXQsIHtcbiAgICBnZXQ6ICh0YXJnZXQsIGtleSwgcmVjZWl2ZXIpID0+IHtcbiAgICAgIGNvbnN0IHJlcyA9IFJlZmxlY3QuZ2V0KHRhcmdldCwga2V5LCByZWNlaXZlcik7XG4gICAgICB0cmFjayh0YXJnZXQsIGtleSk7XG4gICAgICByZXR1cm4gcmVzO1xuICAgIH0sXG4gICAgc2V0OiAodGFyZ2V0LCBrZXksIHZhbHVlLCByZWNlaXZlcikgPT4ge1xuICAgICAgY29uc3QgcmVzID0gUmVmbGVjdC5zZXQodGFyZ2V0LCBrZXksIHZhbHVlLCByZWNlaXZlcik7XG4gICAgICB0cmlnZ2VyKHRhcmdldCwga2V5KTtcbiAgICAgIHJldHVybiByZXM7XG4gICAgfSxcbiAgfSk7XG5cbiAgcmV0dXJuIHByb3h5O1xufTtcbiIsImV4cG9ydCBmdW5jdGlvbiBpc09iamVjdCh0YXJnZXQpIHtcbiAgcmV0dXJuIHR5cGVvZiB0YXJnZXQgPT09ICdvYmplY3QnICYmIHRhcmdldCAhPT0gbnVsbDtcbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgZWZmZWN0IH0gZnJvbSAnLi9yZWFjdGl2ZS9lZmZlY3QnO1xuaW1wb3J0IHsgcmVhY3RpdmUgfSBmcm9tICcuL3JlYWN0aXZlL3JlYWN0aXZlJztcblxuY29uc3QgY291bnRlciA9ICh3aW5kb3cuY291bnRlciA9IHJlYWN0aXZlKHtcbiAgY291bnQ6IDAsXG59KSk7XG5cbmVmZmVjdCgoKSA9PiB7XG4gIGNvbnNvbGUubG9nKCdjb3VudCBjaGFuZ2UuLi4nICsgY291bnRlci5jb3VudCk7XG59KTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==