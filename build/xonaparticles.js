var Xona =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/EmissionArea.js":
/*!*****************************!*\
  !*** ./src/EmissionArea.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Point = __webpack_require__(/*! ./Point.js */ \"./src/Point.js\");\n\n\"use strict\";\n\nclass EmissionArea {\n  constructor(config = EmissionArea.DEFAULT_CONFIG) {\n    this._parseConfig(config);\n  }\n\n  static create(config) {\n    switch (config.shape) {\n      case EmissionArea.SHAPE.POINT:\n        {\n          return new PointEmissionArea(config);\n        }\n\n      case EmissionArea.SHAPE.CIRCLE:\n        {\n          return new CircleEmissionArea(config);\n        }\n\n      case EmissionArea.SHAPE.RECT:\n        {\n          return new RectEmissionArea(config);\n        }\n    }\n  }\n\n  getSpawnPosition() {\n    return new Point(0, 0);\n  }\n\n  _parseConfig(config) {\n    this._shape = config.shape;\n    this._emitOnEdge = config.emitOnEdge || false;\n  }\n\n  _clamp(value, min, max) {\n    return Math.min(Math.max(value, min), max);\n  }\n\n}\n\nclass PointEmissionArea extends EmissionArea {}\n\nclass CircleEmissionArea extends EmissionArea {\n  getSpawnPosition() {\n    const angle = Math.random() * Math.PI * 2;\n    const radius = this._emitOnEdge ? this._radius : this._radius * Math.random();\n    return new Point(Math.sin(angle) * radius, Math.cos(angle) * radius);\n  }\n\n  _parseConfig(config) {\n    super._parseConfig(config);\n\n    this._radius = config.radius;\n  }\n\n}\n\nclass RectEmissionArea extends EmissionArea {\n  getSpawnPosition() {\n    if (this._emitOnEdge) {\n      return this._getSpawnPositionOnEdge();\n    } else {\n      return this._getSpawnPositionInbound();\n    }\n  }\n\n  _getSpawnPositionOnEdge() {\n    const angle = Math.random() * Math.PI * 2;\n    return new Point(this._clamp(Math.sin(angle) * this._halfDiagonal, -this._halfWidth, this._halfWidth), this._clamp(Math.cos(angle) * this._halfDiagonal, -this._halfHeight, this._halfHeight));\n  }\n\n  _getSpawnPositionInbound() {\n    return new Point(Math.random() * this._width - this._halfWidth, Math.random() * this._height - this._halfHeight);\n  }\n\n  _parseConfig(config) {\n    super._parseConfig(config);\n\n    this._width = config.width;\n    this._height = config.height;\n    this._halfWidth = this._width * 0.5;\n    this._halfHeight = this._height * 0.5;\n    this._halfDiagonal = Math.sqrt(Math.pow(this._halfWidth, 2) + Math.pow(this._halfHeight, 2));\n  }\n\n}\n\nEmissionArea.SHAPE = {\n  POINT: \"point\",\n  CIRCLE: \"circle\",\n  RECT: \"rectangle\"\n};\nEmissionArea.DEFAULT_CONFIG = {\n  shape: EmissionArea.SHAPE.POINT\n};\nmodule.exports = EmissionArea;\n\n//# sourceURL=webpack://Xona/./src/EmissionArea.js?");

/***/ }),

/***/ "./src/Particle.js":
/*!*************************!*\
  !*** ./src/Particle.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nclass Particle {\n  constructor(point) {\n    this._initialize(point);\n  }\n\n  setPosition(x, y) {\n    this.x = x;\n    this.y = y;\n  }\n\n  _initialize(point) {\n    this.setPosition(point.x, point.y);\n  }\n\n}\n\nmodule.exports = Particle;\n\n//# sourceURL=webpack://Xona/./src/Particle.js?");

/***/ }),

/***/ "./src/ParticleEmitter.js":
/*!********************************!*\
  !*** ./src/ParticleEmitter.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const EmissionArea = __webpack_require__(/*! ./EmissionArea.js */ \"./src/EmissionArea.js\");\n\nconst Particle = __webpack_require__(/*! ./Particle.js */ \"./src/Particle.js\");\n\n\"use strict\";\n\nclass ParticleEmitter {\n  constructor(config = ParticleEmitter.DEFAULT_CONFIG) {\n    this._initialize(config);\n  }\n\n  step(time) {\n    if (time % 500 <= 20) {\n      this._spawnParticle();\n    }\n  }\n\n  _initialize(config) {\n    this._parseConfig(config);\n\n    this._particles = [];\n  }\n\n  _parseConfig(config) {\n    this._parseEmission(config.emission);\n  }\n\n  _parseEmission(emissionConfig) {\n    this._emissionArea = EmissionArea.create(emissionConfig);\n  }\n\n  _spawnParticle() {\n    this._particles.push(this._createParticle());\n  }\n\n  _createParticle() {\n    return new Particle(this._emissionArea.getSpawnPosition());\n  }\n\n}\n\nParticleEmitter.DEFAULT_CONFIG = {\n  emission: EmissionArea.DEFAULT_CONFIG\n};\nmodule.exports = ParticleEmitter;\n\n//# sourceURL=webpack://Xona/./src/ParticleEmitter.js?");

/***/ }),

/***/ "./src/ParticleSystem.js":
/*!*******************************!*\
  !*** ./src/ParticleSystem.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const ParticleEmitter = __webpack_require__(/*! ./ParticleEmitter.js */ \"./src/ParticleEmitter.js\");\n\n\"use strict\";\n\nclass ParticleSystem {\n  constructor(config = ParticleSystem.DEFAULT_CONFIG) {\n    this._initialize(config);\n  }\n\n  step(time) {\n    this._emitters.forEach(function (emitter) {\n      emitter.step(time);\n    }, this);\n  }\n\n  _initialize(config) {\n    this._emitters = config.emitters.map(this._createEmitter, this);\n  }\n\n  _createEmitter(emitterConfig) {\n    return new ParticleEmitter(emitterConfig);\n  }\n\n}\n\nParticleSystem.DEFAULT_CONFIG = {\n  emitters: [ParticleEmitter.DEFAULT_CONFIG]\n};\nmodule.exports = ParticleSystem;\n\n//# sourceURL=webpack://Xona/./src/ParticleSystem.js?");

/***/ }),

/***/ "./src/Point.js":
/*!**********************!*\
  !*** ./src/Point.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class Point {\n  constructor(x = 0, y = 0) {\n    this.x = x;\n    this.y = y;\n  }\n\n}\n\nmodule.exports = Point;\n\n//# sourceURL=webpack://Xona/./src/Point.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const ParticleSystem = __webpack_require__(/*! ./ParticleSystem */ \"./src/ParticleSystem.js\");\n\nconst ParticleEmitter = __webpack_require__(/*! ./ParticleEmitter */ \"./src/ParticleEmitter.js\");\n\nconst Particle = __webpack_require__(/*! ./Particle */ \"./src/Particle.js\");\n\nconst EmissionArea = __webpack_require__(/*! ./EmissionArea */ \"./src/EmissionArea.js\");\n\nmodule.exports = {\n  ParticleSystem: ParticleSystem,\n  ParticleEmitter: ParticleEmitter,\n  Particle: Particle,\n  EmissionArea: EmissionArea\n};\n\n//# sourceURL=webpack://Xona/./src/index.js?");

/***/ })

/******/ });