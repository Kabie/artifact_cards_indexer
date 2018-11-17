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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/App.imba");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/imba/imba.imba":
/*!*************************************!*\
  !*** ./node_modules/imba/imba.imba ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./src/imba/index.imba */ "./node_modules/imba/src/imba/index.imba");


/***/ }),

/***/ "./node_modules/imba/src/imba/dom/event-manager.imba":
/*!***********************************************************!*\
  !*** ./node_modules/imba/src/imba/dom/event-manager.imba ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

function iter$(a){ return a ? (a.toArray ? a.toArray() : a) : []; };
var Imba = __webpack_require__(/*! ../imba */ "./node_modules/imba/src/imba/imba.imba");
__webpack_require__(/*! ./pointer */ "./node_modules/imba/src/imba/dom/pointer.imba");

var native$ = [
	'keydown','keyup','keypress',
	'textInput','input','change','submit',
	'focusin','focusout','focus','blur',
	'contextmenu','selectstart','dblclick','selectionchange',
	'mousewheel','wheel','scroll',
	'beforecopy','copy','beforepaste','paste','beforecut','cut',
	'dragstart','drag','dragend','dragenter','dragover','dragleave','dragexit','drop',
	'mouseup','mousedown','mouseenter','mouseleave','mouseout','mouseover','mousemove'
];



Imba.EventManager = function EventManager(node,pars){
	var self = this;
	if(!pars||pars.constructor !== Object) pars = {};
	var events = pars.events !== undefined ? pars.events : [];
	self._shimFocusEvents =  true && window.netscape && node.onfocusin === undefined;
	self.setRoot(node);
	self.setListeners([]);
	self.setDelegators({});
	self.setDelegator(function(e) {
		self.delegate(e);
		return true;
	});
	
	for (let i = 0, items = iter$(events), len = items.length; i < len; i++) {
		self.register(items[i]);
	};
	
	return self;
};

Imba.EventManager.prototype.root = function(v){ return this._root; }
Imba.EventManager.prototype.setRoot = function(v){ this._root = v; return this; };
Imba.EventManager.prototype.count = function(v){ return this._count; }
Imba.EventManager.prototype.setCount = function(v){ this._count = v; return this; };
Imba.EventManager.prototype.__enabled = {'default': false,watch: 'enabledDidSet',name: 'enabled'};
Imba.EventManager.prototype.enabled = function(v){ return this._enabled; }
Imba.EventManager.prototype.setEnabled = function(v){
	var a = this.enabled();
	if(v != a) { this._enabled = v; }
	if(v != a) { this.enabledDidSet && this.enabledDidSet(v,a,this.__enabled) }
	return this;
}
Imba.EventManager.prototype._enabled = false;
Imba.EventManager.prototype.listeners = function(v){ return this._listeners; }
Imba.EventManager.prototype.setListeners = function(v){ this._listeners = v; return this; };
Imba.EventManager.prototype.delegators = function(v){ return this._delegators; }
Imba.EventManager.prototype.setDelegators = function(v){ this._delegators = v; return this; };
Imba.EventManager.prototype.delegator = function(v){ return this._delegator; }
Imba.EventManager.prototype.setDelegator = function(v){ this._delegator = v; return this; };

var initialBind = [];

Imba.EventManager.prototype.enabledDidSet = function (bool){
	bool ? this.onenable() : this.ondisable();
	return this;
};

Imba.EventManager.bind = function (name){
	if (Imba.Events) {
		return Imba.Events.autoregister(name);
	} else if (initialBind.indexOf(name) == -1 && native$.indexOf(name) >= 0) {
		return initialBind.push(name);
	};
};

Imba.EventManager.activate = function (){
	var Imba_;
	if (Imba.Events) { return Imba.Events };
	Imba.Events = new Imba.EventManager(Imba.document(),{events: []});
	if (false) {};
	
	Imba.POINTER || (Imba.POINTER = new Imba.Pointer());
	
	var hasTouchEvents = window && window.ontouchstart !== undefined;
	
	if (hasTouchEvents) {
		Imba.Events.listen('touchstart',function(e) {
			return Imba.Touch.ontouchstart(e);
		});
		
		Imba.Events.listen('touchmove',function(e) {
			return Imba.Touch.ontouchmove(e);
		});
		
		Imba.Events.listen('touchend',function(e) {
			return Imba.Touch.ontouchend(e);
		});
		
		Imba.Events.listen('touchcancel',function(e) {
			return Imba.Touch.ontouchcancel(e);
		});
	};
	
	Imba.Events.register('click',function(e) {
		// Only for main mousebutton, no?
		if ((e.timeStamp - Imba.Touch.LastTimestamp) > Imba.Touch.TapTimeout) {
			e._imbaSimulatedTap = true;
			var tap = new Imba.Event(e);
			tap.setType('tap');
			tap.process();
			if (tap._responder && tap.defaultPrevented) {
				return e.preventDefault();
			};
		};
		
		return Imba.Events.delegate(e);
	});
	
	Imba.Events.listen('mousedown',function(e) {
		if ((e.timeStamp - Imba.Touch.LastTimestamp) > Imba.Touch.TapTimeout) {
			if (Imba.POINTER) { return Imba.POINTER.update(e).process() };
		};
	});
	
	Imba.Events.listen('mouseup',function(e) {
		if ((e.timeStamp - Imba.Touch.LastTimestamp) > Imba.Touch.TapTimeout) {
			if (Imba.POINTER) { return Imba.POINTER.update(e).process() };
		};
	});
	
	Imba.Events.register(['mousedown','mouseup']);
	Imba.Events.register(initialBind);
	Imba.Events.setEnabled(true);
	return Imba.Events;
};




Imba.EventManager.prototype.register = function (name,handler){
	if(handler === undefined) handler = true;
	if (name instanceof Array) {
		for (let i = 0, items = iter$(name), len = items.length; i < len; i++) {
			this.register(items[i],handler);
		};
		return this;
	};
	
	if (this.delegators()[name]) { return this };
	
	
	var fn = this.delegators()[name] = (handler instanceof Function) ? handler : this.delegator();
	if (this.enabled()) { return this.root().addEventListener(name,fn,true) };
};

Imba.EventManager.prototype.autoregister = function (name){
	if (native$.indexOf(name) == -1) { return this };
	return this.register(name);
};

Imba.EventManager.prototype.listen = function (name,handler,capture){
	if(capture === undefined) capture = true;
	this.listeners().push([name,handler,capture]);
	if (this.enabled()) { this.root().addEventListener(name,handler,capture) };
	return this;
};

Imba.EventManager.prototype.delegate = function (e){
	var event = Imba.Event.wrap(e);
	event.process();
	if (this._shimFocusEvents) {
		if (e.type == 'focus') {
			Imba.Event.wrap(e).setType('focusin').process();
		} else if (e.type == 'blur') {
			Imba.Event.wrap(e).setType('focusout').process();
		};
	};
	return this;
};



Imba.EventManager.prototype.create = function (type,target,pars){
	if(!pars||pars.constructor !== Object) pars = {};
	var data = pars.data !== undefined ? pars.data : null;
	var source = pars.source !== undefined ? pars.source : null;
	var event = Imba.Event.wrap({type: type,target: target});
	if (data) { (event.setData(data),data) };
	if (source) { (event.setSource(source),source) };
	return event;
};



Imba.EventManager.prototype.trigger = function (){
	return this.create.apply(this,arguments).process();
};

Imba.EventManager.prototype.onenable = function (){
	for (let o = this.delegators(), handler, i = 0, keys = Object.keys(o), l = keys.length, name; i < l; i++){
		name = keys[i];handler = o[name];this.root().addEventListener(name,handler,true);
	};
	
	for (let i = 0, items = iter$(this.listeners()), len = items.length, item; i < len; i++) {
		item = items[i];
		this.root().addEventListener(item[0],item[1],item[2]);
	};
	
	if (true) {
		window.addEventListener('hashchange',Imba.commit);
		window.addEventListener('popstate',Imba.commit);
	};
	return this;
};

Imba.EventManager.prototype.ondisable = function (){
	for (let o = this.delegators(), handler, i = 0, keys = Object.keys(o), l = keys.length, name; i < l; i++){
		name = keys[i];handler = o[name];this.root().removeEventListener(name,handler,true);
	};
	
	for (let i = 0, items = iter$(this.listeners()), len = items.length, item; i < len; i++) {
		item = items[i];
		this.root().removeEventListener(item[0],item[1],item[2]);
	};
	
	if (true) {
		window.removeEventListener('hashchange',Imba.commit);
		window.removeEventListener('popstate',Imba.commit);
	};
	
	return this;
};


/***/ }),

/***/ "./node_modules/imba/src/imba/dom/event.imba":
/*!***************************************************!*\
  !*** ./node_modules/imba/src/imba/dom/event.imba ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

function iter$(a){ return a ? (a.toArray ? a.toArray() : a) : []; };
var Imba = __webpack_require__(/*! ../imba */ "./node_modules/imba/src/imba/imba.imba");

var keyCodes = {
	esc: 27,
	tab: 9,
	enter: 13,
	space: 32,
	up: 38,
	down: 40
};

var el = Imba.Tag.prototype;
el.stopModifier = function (e){
	return e.stop() || true;
};
el.preventModifier = function (e){
	return e.prevent() || true;
};
el.silenceModifier = function (e){
	return e.silence() || true;
};
el.bubbleModifier = function (e){
	return e.bubble(true) || true;
};
el.ctrlModifier = function (e){
	return e.event().ctrlKey == true;
};
el.altModifier = function (e){
	return e.event().altKey == true;
};
el.shiftModifier = function (e){
	return e.event().shiftKey == true;
};
el.metaModifier = function (e){
	return e.event().metaKey == true;
};
el.keyModifier = function (key,e){
	return e.keyCode() ? ((e.keyCode() == key)) : true;
};
el.delModifier = function (e){
	return e.keyCode() ? ((e.keyCode() == 8 || e.keyCode() == 46)) : true;
};
el.selfModifier = function (e){
	return e.event().target == this._dom;
};
el.leftModifier = function (e){
	return (e.button() != undefined) ? ((e.button() === 0)) : el.keyModifier(37,e);
};
el.rightModifier = function (e){
	return (e.button() != undefined) ? ((e.button() === 2)) : el.keyModifier(39,e);
};
el.middleModifier = function (e){
	return (e.button() != undefined) ? ((e.button() === 1)) : true;
};

el.getHandler = function (str,event){
	if (this[str]) { return this };
};



Imba.Event = function Event(e){
	this.setEvent(e);
	this._bubble = true;
};



Imba.Event.prototype.event = function(v){ return this._event; }
Imba.Event.prototype.setEvent = function(v){ this._event = v; return this; };

Imba.Event.prototype.prefix = function(v){ return this._prefix; }
Imba.Event.prototype.setPrefix = function(v){ this._prefix = v; return this; };

Imba.Event.prototype.source = function(v){ return this._source; }
Imba.Event.prototype.setSource = function(v){ this._source = v; return this; };

Imba.Event.prototype.data = function(v){ return this._data; }
Imba.Event.prototype.setData = function(v){ this._data = v; return this; };

Imba.Event.prototype.responder = function(v){ return this._responder; }
Imba.Event.prototype.setResponder = function(v){ this._responder = v; return this; };

Imba.Event.wrap = function (e){
	return new this(e);
};

Imba.Event.prototype.setType = function (type){
	this._type = type;
	this;
	return this;
};



Imba.Event.prototype.type = function (){
	return this._type || this.event().type;
};
Imba.Event.prototype.native = function (){
	return this._event;
};

Imba.Event.prototype.name = function (){
	return this._name || (this._name = this.type().toLowerCase().replace(/\:/g,''));
};


Imba.Event.prototype.bubble = function (v){
	if (v != undefined) {
		this.setBubble(v);
		return this;
	};
	return this._bubble;
};

Imba.Event.prototype.setBubble = function (v){
	this._bubble = v;
	return this;
	return this;
};



Imba.Event.prototype.stop = function (){
	this.setBubble(false);
	return this;
};

Imba.Event.prototype.stopPropagation = function (){
	return this.stop();
};
Imba.Event.prototype.halt = function (){
	return this.stop();
};


Imba.Event.prototype.prevent = function (){
	if (this.event().preventDefault) {
		this.event().preventDefault();
	} else {
		this.event().defaultPrevented = true;
	};
	this.defaultPrevented = true;
	return this;
};

Imba.Event.prototype.preventDefault = function (){
	console.warn("Event#preventDefault is deprecated - use Event#prevent");
	return this.prevent();
};



Imba.Event.prototype.isPrevented = function (){
	return this.event() && this.event().defaultPrevented;
};



Imba.Event.prototype.cancel = function (){
	console.warn("Event#cancel is deprecated - use Event#prevent");
	return this.prevent();
};

Imba.Event.prototype.silence = function (){
	this._silenced = true;
	return this;
};

Imba.Event.prototype.isSilenced = function (){
	return !(!this._silenced);
};



Imba.Event.prototype.target = function (){
	return Imba.getTagForDom(this.event()._target || this.event().target);
};



Imba.Event.prototype.responder = function (){
	return this._responder;
};



Imba.Event.prototype.redirect = function (node){
	this._redirect = node;
	return this;
};

Imba.Event.prototype.processHandlers = function (node,handlers){
	let i = 1;
	let l = handlers.length;
	let bubble = this._bubble;
	let state = handlers.state || (handlers.state = {});
	let result;
	
	if (bubble) {
		this._bubble = 1;
	};
	
	while (i < l){
		let isMod = false;
		let handler = handlers[i++];
		let params = null;
		let context = node;
		
		if (handler instanceof Array) {
			params = handler.slice(1);
			handler = handler[0];
		};
		
		if (typeof handler == 'string') {
			if (keyCodes[handler]) {
				params = [keyCodes[handler]];
				handler = 'key';
			};
			
			let mod = handler + 'Modifier';
			
			if (node[mod]) {
				isMod = true;
				params = (params || []).concat([this,state]);
				handler = node[mod];
			};
		};
		
		
		
		if (typeof handler == 'string') {
			let el = node;
			let fn = null;
			let ctx = state.context;
			
			if (ctx) {
				if (ctx.getHandler instanceof Function) {
					ctx = ctx.getHandler(handler,this);
				};
				
				if (ctx[handler] instanceof Function) {
					handler = fn = ctx[handler];
					context = ctx;
				};
			};
			
			if (!(fn)) {
				console.warn(("event " + this.type() + ": could not find '" + handler + "' in context"),ctx);
			};
			
			
			
			
			
			
			
			
			
			
			
		};
		
		if (handler instanceof Function) {
			// what if we actually call stop inside function?
			// do we still want to continue the chain?
			let res = handler.apply(context,params || [this]);
			
			if (!(isMod)) {
				this._responder || (this._responder = node);
			};
			
			if (res == false) {
				// console.log "returned false - breaking"
				break;
			};
			
			if (res && !this._silenced && (res.then instanceof Function)) {
				res.then(Imba.commit);
			};
		};
	};
	
	
	if (this._bubble === 1) {
		this._bubble = bubble;
	};
	
	return null;
};

Imba.Event.prototype.process = function (){
	var name = this.name();
	var meth = ("on" + (this._prefix || '') + name);
	var args = null;
	var domtarget = this.event()._target || this.event().target;
	var domnode = domtarget._responder || domtarget;
	
	var result;
	var handlers;
	
	while (domnode){
		this._redirect = null;
		let node = domnode._dom ? domnode : domnode._tag;
		
		if (node) {
			if (handlers = node._on_) {
				for (let i = 0, items = iter$(handlers), len = items.length, handler; i < len; i++) {
					handler = items[i];
					if (!(handler)) { continue; };
					let hname = handler[0];
					if (name == handler[0] && this.bubble()) {
						this.processHandlers(node,handler);
					};
				};
				if (!(this.bubble())) { break; };
			};
			
			if (this.bubble() && (node[meth] instanceof Function)) {
				this._responder || (this._responder = node);
				this._silenced = false;
				result = args ? node[meth].apply(node,args) : node[meth](this,this.data());
			};
			
			if (node.onevent) {
				node.onevent(this);
			};
		};
		
		
		if (!(this.bubble() && (domnode = (this._redirect || (node ? node.parent() : domnode.parentNode))))) {
			break;
		};
	};
	
	this.processed();
	
	
	
	if (result && (result.then instanceof Function)) {
		result.then(this.processed.bind(this));
	};
	return this;
};


Imba.Event.prototype.processed = function (){
	if (!this._silenced && this._responder) {
		Imba.emit(Imba,'event',[this]);
		Imba.commit(this.event());
	};
	return this;
};



Imba.Event.prototype.x = function (){
	return this.native().x;
};



Imba.Event.prototype.y = function (){
	return this.native().y;
};

Imba.Event.prototype.button = function (){
	return this.native().button;
};
Imba.Event.prototype.keyCode = function (){
	return this.native().keyCode;
};
Imba.Event.prototype.ctrl = function (){
	return this.native().ctrlKey;
};
Imba.Event.prototype.alt = function (){
	return this.native().altKey;
};
Imba.Event.prototype.shift = function (){
	return this.native().shiftKey;
};
Imba.Event.prototype.meta = function (){
	return this.native().metaKey;
};
Imba.Event.prototype.key = function (){
	return this.native().key;
};



Imba.Event.prototype.which = function (){
	return this.event().which;
};



/***/ }),

/***/ "./node_modules/imba/src/imba/dom/html.imba":
/*!**************************************************!*\
  !*** ./node_modules/imba/src/imba/dom/html.imba ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

function iter$(a){ return a ? (a.toArray ? a.toArray() : a) : []; };
var Imba = __webpack_require__(/*! ../imba */ "./node_modules/imba/src/imba/imba.imba");

Imba.defineTag('fragment', 'element', function(tag){
	tag.createNode = function (){
		return Imba.document().createDocumentFragment();
	};
});

Imba.extendTag('html', function(tag){
	tag.prototype.parent = function (){
		return null;
	};
});

Imba.extendTag('canvas', function(tag){
	tag.prototype.context = function (type){
		if(type === undefined) type = '2d';
		return this.dom().getContext(type);
	};
});

function DataProxy(node,path,args){
	this._node = node;
	this._path = path;
	this._args = args;
	if (this._args) { this._setter = Imba.toSetter(this._path) };
};

DataProxy.bind = function (receiver,data,path,args){
	let proxy = receiver._data || (receiver._data = new this(receiver,path,args));
	proxy.bind(data,path,args);
	return receiver;
};

DataProxy.prototype.bind = function (data,key,args){
	if (data != this._data) {
		this._data = data;
	};
	return this;
};

DataProxy.prototype.getFormValue = function (){
	return this._setter ? this._data[this._path]() : this._data[this._path];
};

DataProxy.prototype.setFormValue = function (value){
	return this._setter ? this._data[this._setter](value) : ((this._data[this._path] = value));
};


var isArray = function(val) {
	return val && val.splice && val.sort;
};

var isSimilarArray = function(a,b) {
	let l = a.length,i = 0;
	if (l != b.length) { return false };
	while (i++ < l){
		if (a[i] != b[i]) { return false };
	};
	return true;
};

Imba.extendTag('input', function(tag){
	tag.prototype.lazy = function(v){ return this._lazy; }
	tag.prototype.setLazy = function(v){ this._lazy = v; return this; };
	tag.prototype.number = function(v){ return this._number; }
	tag.prototype.setNumber = function(v){ this._number = v; return this; };
	
	tag.prototype.bindData = function (target,path,args){
		DataProxy.bind(this,target,path,args);
		return this;
	};
	
	tag.prototype.checked = function (){
		return this._dom.checked;
	};
	
	tag.prototype.setChecked = function (value){
		if (!(!(value)) != this._dom.checked) {
			this._dom.checked = !(!(value));
		};
		return this;
	};
	
	tag.prototype.setValue = function (value,source){
		if (this._localValue == undefined || source == undefined) {
			this.dom().value = this._value = value;
			this._localValue = undefined;
		};
		return this;
	};
	
	tag.prototype.setType = function (value){
		this.dom().type = this._type = value;
		return this;
	};
	
	tag.prototype.value = function (){
		let val = this._dom.value;
		return (this._number && val) ? parseFloat(val) : val;
	};
	
	tag.prototype.oninput = function (e){
		let val = this._dom.value;
		this._localValue = val;
		if (this._data && !(this.lazy()) && this.type() != 'radio' && this.type() != 'checkbox') {
			this._data.setFormValue(this.value(),this);
		};
		return;
	};
	
	tag.prototype.onchange = function (e){
		this._modelValue = this._localValue = undefined;
		if (!(this.data())) { return };
		
		if (this.type() == 'radio' || this.type() == 'checkbox') {
			let checked = this.checked();
			let mval = this._data.getFormValue(this);
			let dval = (this._value != undefined) ? this._value : this.value();
			
			if (this.type() == 'radio') {
				return this._data.setFormValue(dval,this);
			} else if (this.dom().value == 'on' || this.dom().value == undefined) {
				return this._data.setFormValue(!(!(checked)),this);
			} else if (isArray(mval)) {
				let idx = mval.indexOf(dval);
				if (checked && idx == -1) {
					return mval.push(dval);
				} else if (!(checked) && idx >= 0) {
					return mval.splice(idx,1);
				};
			} else {
				return this._data.setFormValue(dval,this);
			};
		} else {
			return this._data.setFormValue(this.value());
		};
	};
	
	tag.prototype.onblur = function (e){
		return this._localValue = undefined;
	};
	
	
	tag.prototype.end = function (){
		if (this._localValue !== undefined || !this._data) {
			return this;
		};
		
		let mval = this._data.getFormValue(this);
		if (mval == this._modelValue) { return this };
		if (!isArray(mval)) { this._modelValue = mval };
		
		if (this.type() == 'radio' || this.type() == 'checkbox') {
			let dval = this._value;
			let checked = isArray(mval) ? (
				mval.indexOf(dval) >= 0
			) : ((this.dom().value == 'on' || this.dom().value == undefined) ? (
				!(!(mval))
			) : (
				mval == this._value
			));
			
			this.setChecked(checked);
		} else {
			this._dom.value = mval;
		};
		return this;
	};
});

Imba.extendTag('textarea', function(tag){
	tag.prototype.lazy = function(v){ return this._lazy; }
	tag.prototype.setLazy = function(v){ this._lazy = v; return this; };
	
	tag.prototype.bindData = function (target,path,args){
		DataProxy.bind(this,target,path,args);
		return this;
	};
	
	tag.prototype.setValue = function (value,source){
		if (this._localValue == undefined || source == undefined) {
			this.dom().value = value;
			this._localValue = undefined;
		};
		return this;
	};
	
	tag.prototype.oninput = function (e){
		let val = this._dom.value;
		this._localValue = val;
		if (this._data && !(this.lazy())) { return this._data.setFormValue(this.value(),this) };
	};
	
	tag.prototype.onchange = function (e){
		this._localValue = undefined;
		if (this._data) { return this._data.setFormValue(this.value(),this) };
	};
	
	tag.prototype.onblur = function (e){
		return this._localValue = undefined;
	};
	
	tag.prototype.render = function (){
		if (this._localValue != undefined || !this._data) { return };
		if (this._data) {
			let dval = this._data.getFormValue(this);
			this._dom.value = (dval != undefined) ? dval : '';
		};
		return this;
	};
});

Imba.extendTag('option', function(tag){
	tag.prototype.setValue = function (value){
		if (value != this._value) {
			this.dom().value = this._value = value;
		};
		return this;
	};
	
	tag.prototype.value = function (){
		return this._value || this.dom().value;
	};
});

Imba.extendTag('select', function(tag){
	tag.prototype.bindData = function (target,path,args){
		DataProxy.bind(this,target,path,args);
		return this;
	};
	
	tag.prototype.setValue = function (value,syncing){
		let prev = this._value;
		this._value = value;
		if (!(syncing)) { this.syncValue(value) };
		return this;
	};
	
	tag.prototype.syncValue = function (value){
		let prev = this._syncValue;
		
		if (this.multiple() && (value instanceof Array)) {
			if ((prev instanceof Array) && isSimilarArray(prev,value)) {
				return this;
			};
			
			value = value.slice();
		};
		
		this._syncValue = value;
		
		if (typeof value == 'object') {
			let mult = this.multiple() && (value instanceof Array);
			
			for (let i = 0, items = iter$(this.dom().options), len = items.length, opt; i < len; i++) {
				opt = items[i];
				let oval = (opt._tag ? opt._tag.value() : opt.value);
				if (mult) {
					opt.selected = value.indexOf(oval) >= 0;
				} else if (value == oval) {
					this.dom().selectedIndex = i;
					break;
				};
			};
		} else {
			this.dom().value = value;
		};
		return this;
	};
	
	tag.prototype.value = function (){
		if (this.multiple()) {
			let res = [];
			for (let i = 0, items = iter$(this.dom().selectedOptions), len = items.length, option; i < len; i++) {
				option = items[i];
				res.push(option._tag ? option._tag.value() : option.value);
			};
			return res;
		} else {
			let opt = this.dom().selectedOptions[0];
			return opt ? ((opt._tag ? opt._tag.value() : opt.value)) : null;
		};
	};
	
	tag.prototype.onchange = function (e){
		if (this._data) { return this._data.setFormValue(this.value(),this) };
	};
	
	tag.prototype.end = function (){
		if (this._data) {
			this.setValue(this._data.getFormValue(this),1);
		};
		
		if (this._value != this._syncValue) {
			this.syncValue(this._value);
		};
		return this;
	};
});


/***/ }),

/***/ "./node_modules/imba/src/imba/dom/index.imba":
/*!***************************************************!*\
  !*** ./node_modules/imba/src/imba/dom/index.imba ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Imba = __webpack_require__(/*! ../imba */ "./node_modules/imba/src/imba/imba.imba");

__webpack_require__(/*! ./manager */ "./node_modules/imba/src/imba/dom/manager.imba");
__webpack_require__(/*! ./event-manager */ "./node_modules/imba/src/imba/dom/event-manager.imba");

Imba.TagManager = new Imba.TagManagerClass();

__webpack_require__(/*! ./tag */ "./node_modules/imba/src/imba/dom/tag.imba");
__webpack_require__(/*! ./html */ "./node_modules/imba/src/imba/dom/html.imba");
__webpack_require__(/*! ./pointer */ "./node_modules/imba/src/imba/dom/pointer.imba");
__webpack_require__(/*! ./touch */ "./node_modules/imba/src/imba/dom/touch.imba");
__webpack_require__(/*! ./event */ "./node_modules/imba/src/imba/dom/event.imba");

if (true) {
	__webpack_require__(/*! ./reconciler */ "./node_modules/imba/src/imba/dom/reconciler.imba");
};

if (false) {};


/***/ }),

/***/ "./node_modules/imba/src/imba/dom/manager.imba":
/*!*****************************************************!*\
  !*** ./node_modules/imba/src/imba/dom/manager.imba ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

function iter$(a){ return a ? (a.toArray ? a.toArray() : a) : []; };
var Imba = __webpack_require__(/*! ../imba */ "./node_modules/imba/src/imba/imba.imba");

Imba.TagManagerClass = function TagManagerClass(){
	this._inserts = 0;
	this._removes = 0;
	this._mounted = [];
	this._mountables = 0;
	this._unmountables = 0;
	this._unmounting = 0;
	this;
};

Imba.TagManagerClass.prototype.mounted = function (){
	return this._mounted;
};

Imba.TagManagerClass.prototype.insert = function (node,parent){
	this._inserts++;
	if (node && node.mount) { this.regMountable(node) };
	
	
	
	return;
};

Imba.TagManagerClass.prototype.remove = function (node,parent){
	return this._removes++;
};


Imba.TagManagerClass.prototype.changes = function (){
	return this._inserts + this._removes;
};

Imba.TagManagerClass.prototype.mount = function (node){
	return;
};

Imba.TagManagerClass.prototype.refresh = function (force){
	if(force === undefined) force = false;
	if (false) {};
	if (!(force) && this.changes() == 0) { return };
	
	if ((this._inserts && this._mountables > this._mounted.length) || force) {
		this.tryMount();
	};
	
	if ((this._removes || force) && this._mounted.length) {
		this.tryUnmount();
	};
	
	this._inserts = 0;
	this._removes = 0;
	return this;
};

Imba.TagManagerClass.prototype.unmount = function (node){
	return this;
};

Imba.TagManagerClass.prototype.regMountable = function (node){
	if (!(node.FLAGS & Imba.TAG_MOUNTABLE)) {
		node.FLAGS |= Imba.TAG_MOUNTABLE;
		return this._mountables++;
	};
};


Imba.TagManagerClass.prototype.tryMount = function (){
	var count = 0;
	var root = document.body;
	var items = root.querySelectorAll('.__mount');
	
	for (let i = 0, ary = iter$(items), len = ary.length, el; i < len; i++) {
		el = ary[i];
		if (el && el._tag) {
			if (this._mounted.indexOf(el._tag) == -1) {
				this.mountNode(el._tag);
			};
		};
	};
	return this;
};

Imba.TagManagerClass.prototype.mountNode = function (node){
	if (this._mounted.indexOf(node) == -1) {
		this.regMountable(node);
		this._mounted.push(node);
		
		node.FLAGS |= Imba.TAG_MOUNTED;
		if (node.mount) { node.mount() };
		
		
		
		
		
	};
	return;
};

Imba.TagManagerClass.prototype.tryUnmount = function (){
	this._unmounting++;
	
	var unmount = [];
	var root = document.body;
	for (let i = 0, items = iter$(this._mounted), len = items.length, item; i < len; i++) {
		item = items[i];
		if (!(item)) { continue; };
		if (!document.documentElement.contains(item._dom)) {
			unmount.push(item);
			this._mounted[i] = null;
		};
	};
	
	this._unmounting--;
	
	if (unmount.length) {
		this._mounted = this._mounted.filter(function(item) { return item && unmount.indexOf(item) == -1; });
		for (let i = 0, len = unmount.length, item; i < len; i++) {
			item = unmount[i];
			item.FLAGS = item.FLAGS & ~Imba.TAG_MOUNTED;
			if (item.unmount && item._dom) {
				item.unmount();
			} else if (item._scheduler) {
				item.unschedule();
			};
		};
	};
	return this;
};


/***/ }),

/***/ "./node_modules/imba/src/imba/dom/pointer.imba":
/*!*****************************************************!*\
  !*** ./node_modules/imba/src/imba/dom/pointer.imba ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Imba = __webpack_require__(/*! ../imba */ "./node_modules/imba/src/imba/imba.imba");

Imba.Pointer = function Pointer(){
	this._button = -1;
	this._event = {x: 0,y: 0,type: 'uninitialized'};
	return this;
};

Imba.Pointer.prototype.button = function (){
	return this._button;
};

Imba.Pointer.prototype.touch = function (){
	return this._touch;
};

Imba.Pointer.prototype.update = function (e){
	this._event = e;
	this._dirty = true;
	return this;
};


Imba.Pointer.prototype.process = function (){
	var e1 = this._event;
	
	if (this._dirty) {
		this._prevEvent = e1;
		this._dirty = false;
		
		
		if (e1.type == 'mousedown') {
			this._button = e1.button;
			
			if ((this._touch && this._button != 0)) {
				return;
			};
			
			
			if (this._touch) { this._touch.cancel() };
			this._touch = new Imba.Touch(e1,this);
			this._touch.mousedown(e1,e1);
		} else if (e1.type == 'mousemove') {
			if (this._touch) { this._touch.mousemove(e1,e1) };
		} else if (e1.type == 'mouseup') {
			this._button = -1;
			
			if (this._touch && this._touch.button() == e1.button) {
				this._touch.mouseup(e1,e1);
				this._touch = null;
			};
			
		};
	} else if (this._touch) {
		this._touch.idle();
	};
	return this;
};

Imba.Pointer.prototype.x = function (){
	return this._event.x;
};
Imba.Pointer.prototype.y = function (){
	return this._event.y;
};


/***/ }),

/***/ "./node_modules/imba/src/imba/dom/reconciler.imba":
/*!********************************************************!*\
  !*** ./node_modules/imba/src/imba/dom/reconciler.imba ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

function iter$(a){ return a ? (a.toArray ? a.toArray() : a) : []; };
var self = {};
// externs;

var Imba = __webpack_require__(/*! ../imba */ "./node_modules/imba/src/imba/imba.imba");

var removeNested = function(root,node,caret) {
	// if node/nodes isa String
	// 	we need to use the caret to remove elements
	// 	for now we will simply not support this
	if (node instanceof Array) {
		for (let i = 0, items = iter$(node), len = items.length; i < len; i++) {
			removeNested(root,items[i],caret);
		};
	} else if (node && node._slot_) {
		root.removeChild(node);
	} else if (node != null) {
		// what if this is not null?!?!?
		// take a chance and remove a text-elementng
		let next = caret ? caret.nextSibling : root._dom.firstChild;
		if ((next instanceof Text) && next.textContent == node) {
			root.removeChild(next);
		} else {
			throw 'cannot remove string';
		};
	};
	
	return caret;
};

var appendNested = function(root,node) {
	if (node instanceof Array) {
		let i = 0;
		let c = node.taglen;
		let k = (c != null) ? ((node.domlen = c)) : node.length;
		while (i < k){
			appendNested(root,node[i++]);
		};
	} else if (node && node._dom) {
		root.appendChild(node);
	} else if (node != null && node !== false) {
		root.appendChild(Imba.createTextNode(node));
	};
	
	return;
};






var insertNestedBefore = function(root,node,before) {
	if (node instanceof Array) {
		let i = 0;
		let c = node.taglen;
		let k = (c != null) ? ((node.domlen = c)) : node.length;
		while (i < k){
			insertNestedBefore(root,node[i++],before);
		};
	} else if (node && node._dom) {
		root.insertBefore(node,before);
	} else if (node != null && node !== false) {
		root.insertBefore(Imba.createTextNode(node),before);
	};
	
	return before;
};


self.insertNestedAfter = function (root,node,after){
	var before = after ? after.nextSibling : root._dom.firstChild;
	
	if (before) {
		insertNestedBefore(root,node,before);
		return before.previousSibling;
	} else {
		appendNested(root,node);
		return root._dom.lastChild;
	};
};

var reconcileCollectionChanges = function(root,new$,old,caret) {
	
	var newLen = new$.length;
	var lastNew = new$[newLen - 1];
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	var newPosition = [];
	
	
	var prevChain = [];
	
	var lengthChain = [];
	
	
	var maxChainLength = 0;
	var maxChainEnd = 0;
	
	var hasTextNodes = false;
	var newPos;
	
	for (let idx = 0, items = iter$(old), len = items.length, node; idx < len; idx++) {
		// special case for Text nodes
		node = items[idx];
		if (node && node.nodeType == 3) {
			newPos = new$.indexOf(node.textContent);
			if (newPos >= 0) { new$[newPos] = node };
			hasTextNodes = true;
		} else {
			newPos = new$.indexOf(node);
		};
		
		newPosition.push(newPos);
		
		if (newPos == -1) {
			root.removeChild(node);
			prevChain.push(-1);
			lengthChain.push(-1);
			continue;
		};
		
		var prevIdx = newPosition.length - 2;
		
		
		while (prevIdx >= 0){
			if (newPosition[prevIdx] == -1) {
				prevIdx--;
			} else if (newPos > newPosition[prevIdx]) {
				// Yay, we're bigger than the previous!
				break;
			} else {
				// Nope, let's walk back the chain
				prevIdx = prevChain[prevIdx];
			};
		};
		
		prevChain.push(prevIdx);
		
		var currLength = (prevIdx == -1) ? 0 : (lengthChain[prevIdx] + 1);
		
		if (currLength > maxChainLength) {
			maxChainLength = currLength;
			maxChainEnd = idx;
		};
		
		lengthChain.push(currLength);
	};
	
	var stickyNodes = [];
	
	
	
	var cursor = newPosition.length - 1;
	while (cursor >= 0){
		if (cursor == maxChainEnd && newPosition[cursor] != -1) {
			stickyNodes[newPosition[cursor]] = true;
			maxChainEnd = prevChain[maxChainEnd];
		};
		
		cursor -= 1;
	};
	
	
	for (let idx = 0, items = iter$(new$), len = items.length, node; idx < len; idx++) {
		node = items[idx];
		if (!stickyNodes[idx]) {
			// create textnode for string, and update the array
			if (!(node && node._dom)) {
				node = new$[idx] = Imba.createTextNode(node);
			};
			
			var after = new$[idx - 1];
			self.insertNestedAfter(root,node,(after && after._slot_ || after || caret));
		};
		
		caret = node._slot_ || (caret && caret.nextSibling || root._dom.firstChild);
	};
	
	
	return lastNew && lastNew._slot_ || caret;
};



var reconcileCollection = function(root,new$,old,caret) {
	var k = new$.length;
	var i = k;
	var last = new$[k - 1];
	
	
	if (k == old.length && new$[0] === old[0]) {
		// running through to compare
		while (i--){
			if (new$[i] !== old[i]) { break; };
		};
	};
	
	if (i == -1) {
		return last && last._slot_ || last || caret;
	} else {
		return reconcileCollectionChanges(root,new$,old,caret);
	};
};



var reconcileLoop = function(root,new$,old,caret) {
	var nl = new$.length;
	var ol = old.length;
	var cl = new$.cache.i$; 
	var i = 0,d = nl - ol;
	
	
	
	
	while (i < ol && i < nl && new$[i] === old[i]){
		i++;
	};
	
	
	if (cl > 1000 && (cl - nl) > 500) {
		new$.cache.$prune(new$);
	};
	
	if (d > 0 && i == ol) {
		// added at end
		while (i < nl){
			root.appendChild(new$[i++]);
		};
		return;
	} else if (d > 0) {
		let i1 = nl;
		while (i1 > i && new$[i1 - 1] === old[i1 - 1 - d]){
			i1--;
		};
		
		if (d == (i1 - i)) {
			let before = old[i]._slot_;
			while (i < i1){
				root.insertBefore(new$[i++],before);
			};
			return;
		};
	} else if (d < 0 && i == nl) {
		// removed at end
		while (i < ol){
			root.removeChild(old[i++]);
		};
		return;
	} else if (d < 0) {
		let i1 = ol;
		while (i1 > i && new$[i1 - 1 + d] === old[i1 - 1]){
			i1--;
		};
		
		if (d == (i - i1)) {
			while (i < i1){
				root.removeChild(old[i++]);
			};
			return;
		};
	} else if (i == nl) {
		return;
	};
	
	return reconcileCollectionChanges(root,new$,old,caret);
};


var reconcileIndexedArray = function(root,array,old,caret) {
	var newLen = array.taglen;
	var prevLen = array.domlen || 0;
	var last = newLen ? array[newLen - 1] : null;
	
	
	if (prevLen > newLen) {
		while (prevLen > newLen){
			var item = array[--prevLen];
			root.removeChild(item._slot_);
		};
	} else if (newLen > prevLen) {
		// find the item to insert before
		let prevLast = prevLen ? array[prevLen - 1]._slot_ : caret;
		let before = prevLast ? prevLast.nextSibling : root._dom.firstChild;
		
		while (prevLen < newLen){
			let node = array[prevLen++];
			before ? root.insertBefore(node._slot_,before) : root.appendChild(node._slot_);
		};
	};
	
	array.domlen = newLen;
	return last ? last._slot_ : caret;
};




var reconcileNested = function(root,new$,old,caret) {
	
	// var skipnew = new == null or new === false or new === true
	var newIsNull = new$ == null || new$ === false;
	var oldIsNull = old == null || old === false;
	
	
	if (new$ === old) {
		// remember that the caret must be an actual dom element
		// we should instead move the actual caret? - trust
		if (newIsNull) {
			return caret;
		} else if (new$._slot_) {
			return new$._slot_;
		} else if ((new$ instanceof Array) && new$.taglen != null) {
			return reconcileIndexedArray(root,new$,old,caret);
		} else {
			return caret ? caret.nextSibling : root._dom.firstChild;
		};
	} else if (new$ instanceof Array) {
		if (old instanceof Array) {
			// look for slot instead?
			let typ = new$.static;
			if (typ || old.static) {
				// if the static is not nested - we could get a hint from compiler
				// and just skip it
				if (typ == old.static) { // should also include a reference?
					for (let i = 0, items = iter$(new$), len = items.length; i < len; i++) {
						// this is where we could do the triple equal directly
						caret = reconcileNested(root,items[i],old[i],caret);
					};
					return caret;
				} else {
					removeNested(root,old,caret);
				};
				
				
			} else {
				// Could use optimized loop if we know that it only consists of nodes
				return reconcileCollection(root,new$,old,caret);
			};
		} else if (!(oldIsNull)) {
			if (old._slot_) {
				root.removeChild(old);
			} else {
				// old was a string-like object?
				root.removeChild(caret ? caret.nextSibling : root._dom.firstChild);
			};
		};
		
		return self.insertNestedAfter(root,new$,caret);
		
	} else if (!(newIsNull) && new$._slot_) {
		if (!(oldIsNull)) { removeNested(root,old,caret) };
		return self.insertNestedAfter(root,new$,caret);
	} else if (newIsNull) {
		if (!(oldIsNull)) { removeNested(root,old,caret) };
		return caret;
	} else {
		// if old did not exist we need to add a new directly
		let nextNode;
		
		if (old instanceof Array) {
			removeNested(root,old,caret);
		} else if (old && old._slot_) {
			root.removeChild(old);
		} else if (!(oldIsNull)) {
			// ...
			nextNode = caret ? caret.nextSibling : root._dom.firstChild;
			if ((nextNode instanceof Text) && nextNode.textContent != new$) {
				nextNode.textContent = new$;
				return nextNode;
			};
		};
		
		
		return self.insertNestedAfter(root,new$,caret);
	};
};


Imba.extendTag('element', function(tag){
	
	// 1 - static shape - unknown content
	// 2 - static shape and static children
	// 3 - single item
	// 4 - optimized array - only length will change
	// 5 - optimized collection
	// 6 - text only
	
	tag.prototype.setChildren = function (new$,typ){
		// if typeof new == 'string'
		// 	return self.text = new
		var old = this._tree_;
		
		if (new$ === old && (!(new$) || new$.taglen == undefined)) {
			return this;
		};
		
		if (!(old) && typ != 3) {
			this.removeAllChildren();
			appendNested(this,new$);
		} else if (typ == 1) {
			let caret = null;
			for (let i = 0, items = iter$(new$), len = items.length; i < len; i++) {
				caret = reconcileNested(this,items[i],old[i],caret);
			};
		} else if (typ == 2) {
			return this;
		} else if (typ == 3) {
			let ntyp = typeof new$;
			
			if (ntyp != 'object') {
				return this.setText(new$);
			};
			
			if (new$ && new$._dom) {
				this.removeAllChildren();
				this.appendChild(new$);
			} else if (new$ instanceof Array) {
				if (new$._type == 5 && old && old._type == 5) {
					reconcileLoop(this,new$,old,null);
				} else if (old instanceof Array) {
					reconcileNested(this,new$,old,null);
				} else {
					this.removeAllChildren();
					appendNested(this,new$);
				};
			} else {
				return this.setText(new$);
			};
		} else if (typ == 4) {
			reconcileIndexedArray(this,new$,old,null);
		} else if (typ == 5) {
			reconcileLoop(this,new$,old,null);
		} else if ((new$ instanceof Array) && (old instanceof Array)) {
			reconcileNested(this,new$,old,null);
		} else {
			// what if text?
			this.removeAllChildren();
			appendNested(this,new$);
		};
		
		this._tree_ = new$;
		return this;
	};
	
	tag.prototype.content = function (){
		return this._content || this.children().toArray();
	};
	
	tag.prototype.setText = function (text){
		if (text != this._tree_) {
			var val = (text === null || text === false) ? '' : text;
			(this._text_ || this._dom).textContent = val;
			this._text_ || (this._text_ = this._dom.firstChild);
			this._tree_ = text;
		};
		return this;
	};
});


var proto = Imba.Tag.prototype;
proto.setContent = proto.setChildren;


var apple = typeof navigator != 'undefined' && (navigator.vendor || '').indexOf('Apple') == 0;
if (apple) {
	proto.setText = function (text){
		if (text != this._tree_) {
			this._dom.textContent = ((text === null || text === false) ? '' : text);
			this._tree_ = text;
		};
		return this;
	};
};


/***/ }),

/***/ "./node_modules/imba/src/imba/dom/tag.imba":
/*!*************************************************!*\
  !*** ./node_modules/imba/src/imba/dom/tag.imba ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

function iter$(a){ return a ? (a.toArray ? a.toArray() : a) : []; };
var Imba = __webpack_require__(/*! ../imba */ "./node_modules/imba/src/imba/imba.imba");

Imba.CSSKeyMap = {};

Imba.TAG_BUILT = 1;
Imba.TAG_SETUP = 2;
Imba.TAG_MOUNTING = 4;
Imba.TAG_MOUNTED = 8;
Imba.TAG_SCHEDULED = 16;
Imba.TAG_AWAKENED = 32;
Imba.TAG_MOUNTABLE = 64;



Imba.document = function (){
	return window.document;
};



Imba.root = function (){
	return Imba.getTagForDom(Imba.document().body);
};

Imba.static = function (items,typ,nr){
	items._type = typ;
	items.static = nr;
	return items;
};



Imba.mount = function (node,into){
	into || (into = Imba.document().body);
	into.appendChild(node.dom());
	Imba.TagManager.insert(node,into);
	node.scheduler().configure({events: true}).activate(false);
	Imba.TagManager.refresh();
	return node;
};


Imba.createTextNode = function (node){
	if (node && node.nodeType == 3) {
		return node;
	};
	return Imba.document().createTextNode(node);
};





Imba.Tag = function Tag(dom,ctx){
	this.setDom(dom);
	this.$ = TagCache.build(this);
	this.$up = this._owner_ = ctx;
	this._tree_ = null;
	this.FLAGS = 0;
	this.build();
	this;
};

Imba.Tag.buildNode = function (){
	var dom = Imba.document().createElement(this._nodeType || 'div');
	if (this._classes) {
		var cls = this._classes.join(" ");
		if (cls) { dom.className = cls };
	};
	return dom;
};

Imba.Tag.createNode = function (){
	var proto = (this._protoDom || (this._protoDom = this.buildNode()));
	return proto.cloneNode(false);
};

Imba.Tag.build = function (ctx){
	return new this(this.createNode(),ctx);
};

Imba.Tag.dom = function (){
	return this._protoDom || (this._protoDom = this.buildNode());
};

Imba.Tag.end = function (){
	return this.commit(0);
};



Imba.Tag.inherit = function (child){
	child._protoDom = null;
	
	if (this._nodeType) {
		child._nodeType = this._nodeType;
		child._classes = this._classes.slice();
		
		if (child._flagName) {
			return child._classes.push(child._flagName);
		};
	} else {
		child._nodeType = child._name;
		child._flagName = null;
		return child._classes = [];
	};
};



Imba.Tag.prototype.optimizeTagStructure = function (){
	if (false) {};
	var ctor = this.constructor;
	let keys = Object.keys(this);
	
	if (keys.indexOf('mount') >= 0) {
		if (ctor._classes && ctor._classes.indexOf('__mount') == -1) {
			ctor._classes.push('__mount');
		};
		
		if (ctor._protoDom) {
			ctor._protoDom.classList.add('__mount');
		};
	};
	
	for (let i = 0, items = iter$(keys), len = items.length, key; i < len; i++) {
		key = items[i];
		if ((/^on/).test(key)) { Imba.EventManager.bind(key.slice(2)) };
	};
	return this;
};


Imba.attr(Imba.Tag,'name');
Imba.attr(Imba.Tag,'role');
Imba.attr(Imba.Tag,'tabindex');
Imba.Tag.prototype.title = function(v){ return this.getAttribute('title'); }
Imba.Tag.prototype.setTitle = function(v){ this.setAttribute('title',v); return this; };

Imba.Tag.prototype.dom = function (){
	return this._dom;
};

Imba.Tag.prototype.setDom = function (dom){
	dom._tag = this;
	this._dom = this._slot_ = dom;
	return this;
};

Imba.Tag.prototype.ref = function (){
	return this._ref;
};

Imba.Tag.prototype.root = function (){
	return this._owner_ ? this._owner_.root() : this;
};



Imba.Tag.prototype.ref_ = function (ref){
	this.flag(this._ref = ref);
	return this;
};



Imba.Tag.prototype.setData = function (data){
	this._data = data;
	return this;
};



Imba.Tag.prototype.data = function (){
	return this._data;
};


Imba.Tag.prototype.bindData = function (target,path,args){
	return this.setData(args ? target[path].apply(target,args) : target[path]);
};



Imba.Tag.prototype.setHtml = function (html){
	if (this.html() != html) {
		this._dom.innerHTML = html;
	};
	return this;
};



Imba.Tag.prototype.html = function (){
	return this._dom.innerHTML;
};

Imba.Tag.prototype.on$ = function (slot,handler,context){
	let handlers = this._on_ || (this._on_ = []);
	let prev = handlers[slot];
	
	if (slot < 0) {
		if (prev == undefined) {
			slot = handlers[slot] = handlers.length;
		} else {
			slot = prev;
		};
		prev = handlers[slot];
	};
	
	handlers[slot] = handler;
	if (prev) {
		handler.state = prev.state;
	} else {
		handler.state = {context: context};
		if (true) { Imba.EventManager.bind(handler[0]) };
	};
	return this;
};


Imba.Tag.prototype.setId = function (id){
	if (id != null) {
		this.dom().id = id;
	};
	return this;
};

Imba.Tag.prototype.id = function (){
	return this.dom().id;
};



Imba.Tag.prototype.setAttribute = function (name,value){
	var old = this.dom().getAttribute(name);
	
	if (old == value) {
		value;
	} else if (value != null && value !== false) {
		this.dom().setAttribute(name,value);
	} else {
		this.dom().removeAttribute(name);
	};
	return this;
};

Imba.Tag.prototype.setNestedAttr = function (ns,name,value,modifiers){
	if (this[ns + 'SetAttribute']) {
		this[ns + 'SetAttribute'](name,value,modifiers);
	} else {
		this.setAttributeNS(ns,name,value);
	};
	return this;
};

Imba.Tag.prototype.setAttributeNS = function (ns,name,value){
	var old = this.getAttributeNS(ns,name);
	
	if (old != value) {
		if (value != null && value !== false) {
			this.dom().setAttributeNS(ns,name,value);
		} else {
			this.dom().removeAttributeNS(ns,name);
		};
	};
	return this;
};




Imba.Tag.prototype.removeAttribute = function (name){
	return this.dom().removeAttribute(name);
};



Imba.Tag.prototype.getAttribute = function (name){
	return this.dom().getAttribute(name);
};


Imba.Tag.prototype.getAttributeNS = function (ns,name){
	return this.dom().getAttributeNS(ns,name);
};


Imba.Tag.prototype.set = function (key,value,mods){
	let setter = Imba.toSetter(key);
	if (this[setter] instanceof Function) {
		this[setter](value,mods);
	} else {
		this._dom.setAttribute(key,value);
	};
	return this;
};


Imba.Tag.prototype.get = function (key){
	return this._dom.getAttribute(key);
};



Imba.Tag.prototype.setContent = function (content,type){
	this.setChildren(content,type);
	return this;
};



Imba.Tag.prototype.setChildren = function (nodes,type){
	// overridden on client by reconciler
	this._tree_ = nodes;
	return this;
};



Imba.Tag.prototype.setTemplate = function (template){
	if (!this._template) {
		if (this.render == Imba.Tag.prototype.render) {
			this.render = this.renderTemplate; 
		};
	};
	
	this.template = this._template = template;
	return this;
};

Imba.Tag.prototype.template = function (){
	return null;
};



Imba.Tag.prototype.renderTemplate = function (){
	var body = this.template();
	if (body != this) { this.setChildren(body) };
	return this;
};




Imba.Tag.prototype.removeChild = function (child){
	var par = this.dom();
	var el = child._slot_ || child;
	if (el && el.parentNode == par) {
		Imba.TagManager.remove(el._tag || el,this);
		par.removeChild(el);
	};
	return this;
};



Imba.Tag.prototype.removeAllChildren = function (){
	if (this._dom.firstChild) {
		var el;
		while (el = this._dom.firstChild){
			 true && Imba.TagManager.remove(el._tag || el,this);
			this._dom.removeChild(el);
		};
	};
	this._tree_ = this._text_ = null;
	return this;
};



Imba.Tag.prototype.appendChild = function (node){
	if ((typeof node=='string'||node instanceof String)) {
		this.dom().appendChild(Imba.document().createTextNode(node));
	} else if (node) {
		this.dom().appendChild(node._slot_ || node);
		Imba.TagManager.insert(node._tag || node,this);
		
	};
	return this;
};



Imba.Tag.prototype.insertBefore = function (node,rel){
	if ((typeof node=='string'||node instanceof String)) {
		node = Imba.document().createTextNode(node);
	};
	
	if (node && rel) {
		this.dom().insertBefore((node._slot_ || node),(rel._slot_ || rel));
		Imba.TagManager.insert(node._tag || node,this);
		
	};
	return this;
};

Imba.Tag.prototype.detachFromParent = function (){
	if (this._slot_ == this._dom) {
		this._slot_ = (this._dom._placeholder_ || (this._dom._placeholder_ = Imba.document().createComment("node")));
		this._slot_._tag || (this._slot_._tag = this);
		
		if (this._dom.parentNode) {
			Imba.TagManager.remove(this,this._dom.parentNode);
			this._dom.parentNode.replaceChild(this._slot_,this._dom);
		};
	};
	return this;
};

Imba.Tag.prototype.attachToParent = function (){
	if (this._slot_ != this._dom) {
		let prev = this._slot_;
		this._slot_ = this._dom;
		if (prev && prev.parentNode) {
			Imba.TagManager.insert(this);
			prev.parentNode.replaceChild(this._dom,prev);
		};
	};
	
	return this;
};



Imba.Tag.prototype.orphanize = function (){
	var par;
	if (par = this.parent()) { par.removeChild(this) };
	return this;
};



Imba.Tag.prototype.text = function (v){
	return this._dom.textContent;
};



Imba.Tag.prototype.setText = function (txt){
	this._tree_ = txt;
	this._dom.textContent = (txt == null || this.text() === false) ? '' : txt;
	this;
	return this;
};




Imba.Tag.prototype.dataset = function (key,val){
	if (key instanceof Object) {
		for (let v, i = 0, keys = Object.keys(key), l = keys.length, k; i < l; i++){
			k = keys[i];v = key[k];this.dataset(k,v);
		};
		return this;
	};
	
	if (arguments.length == 2) {
		this.setAttribute(("data-" + key),val);
		return this;
	};
	
	if (key) {
		return this.getAttribute(("data-" + key));
	};
	
	var dataset = this.dom().dataset;
	
	if (!(dataset)) {
		dataset = {};
		for (let i = 0, items = iter$(this.dom().attributes), len = items.length, atr; i < len; i++) {
			atr = items[i];
			if (atr.name.substr(0,5) == 'data-') {
				dataset[Imba.toCamelCase(atr.name.slice(5))] = atr.value;
			};
		};
	};
	
	return dataset;
};



Imba.Tag.prototype.render = function (){
	return this;
};



Imba.Tag.prototype.build = function (){
	return this;
};



Imba.Tag.prototype.setup = function (){
	return this;
};



Imba.Tag.prototype.commit = function (){
	if (this.beforeRender() !== false) this.render();
	return this;
};

Imba.Tag.prototype.beforeRender = function (){
	return this;
};



Imba.Tag.prototype.tick = function (){
	if (this.beforeRender() !== false) this.render();
	return this;
};



Imba.Tag.prototype.end = function (){
	this.setup();
	this.commit(0);
	this.end = Imba.Tag.end;
	return this;
};


Imba.Tag.prototype.$open = function (context){
	if (context != this._context_) {
		this._tree_ = null;
		this._context_ = context;
	};
	return this;
};



Imba.Tag.prototype.synced = function (){
	return this;
};




Imba.Tag.prototype.awaken = function (){
	return this;
};



Imba.Tag.prototype.flags = function (){
	return this._dom.classList;
};



Imba.Tag.prototype.flag = function (name,toggler){
	// it is most natural to treat a second undefined argument as a no-switch
	// so we need to check the arguments-length
	if (arguments.length == 2) {
		if (this._dom.classList.contains(name) != !(!(toggler))) {
			this._dom.classList.toggle(name);
		};
	} else {
		// firefox will trigger a change if adding existing class
		if (!this._dom.classList.contains(name)) { this._dom.classList.add(name) };
	};
	return this;
};



Imba.Tag.prototype.unflag = function (name){
	this._dom.classList.remove(name);
	return this;
};



Imba.Tag.prototype.toggleFlag = function (name){
	this._dom.classList.toggle(name);
	return this;
};



Imba.Tag.prototype.hasFlag = function (name){
	return this._dom.classList.contains(name);
};


Imba.Tag.prototype.flagIf = function (flag,bool){
	var f = this._flags_ || (this._flags_ = {});
	let prev = f[flag];
	
	if (bool && !(prev)) {
		this._dom.classList.add(flag);
		f[flag] = true;
	} else if (prev && !(bool)) {
		this._dom.classList.remove(flag);
		f[flag] = false;
	};
	
	return this;
};



Imba.Tag.prototype.setFlag = function (name,value){
	let flags = this._namedFlags_ || (this._namedFlags_ = {});
	let prev = flags[name];
	if (prev != value) {
		if (prev) { this.unflag(prev) };
		if (value) { this.flag(value) };
		flags[name] = value;
	};
	return this;
};




Imba.Tag.prototype.scheduler = function (){
	return (this._scheduler == null) ? (this._scheduler = new Imba.Scheduler(this)) : this._scheduler;
};



Imba.Tag.prototype.schedule = function (options){
	if(options === undefined) options = {events: true};
	this.scheduler().configure(options).activate();
	return this;
};



Imba.Tag.prototype.unschedule = function (){
	if (this._scheduler) { this.scheduler().deactivate() };
	return this;
};




Imba.Tag.prototype.parent = function (){
	return Imba.getTagForDom(this.dom().parentNode);
};



Imba.Tag.prototype.children = function (sel){
	let res = [];
	for (let i = 0, items = iter$(this._dom.children), len = items.length, item; i < len; i++) {
		item = items[i];
		res.push(item._tag || Imba.getTagForDom(item));
	};
	return res;
};

Imba.Tag.prototype.querySelector = function (q){
	return Imba.getTagForDom(this._dom.querySelector(q));
};

Imba.Tag.prototype.querySelectorAll = function (q){
	var items = [];
	for (let i = 0, ary = iter$(this._dom.querySelectorAll(q)), len = ary.length; i < len; i++) {
		items.push(Imba.getTagForDom(ary[i]));
	};
	return items;
};



Imba.Tag.prototype.matches = function (sel){
	var fn;
	if (sel instanceof Function) {
		return sel(this);
	};
	
	if (sel.query instanceof Function) { sel = sel.query() };
	if (fn = (this._dom.matches || this._dom.matchesSelector || this._dom.webkitMatchesSelector || this._dom.msMatchesSelector || this._dom.mozMatchesSelector)) {
		return fn.call(this._dom,sel);
	};
};



Imba.Tag.prototype.closest = function (sel){
	return Imba.getTagForDom(this._dom.closest(sel));
};



Imba.Tag.prototype.contains = function (node){
	return this.dom().contains(node._dom || node);
};




Imba.Tag.prototype.log = function (){
	var $0 = arguments, i = $0.length;
	var args = new Array(i>0 ? i : 0);
	while(i>0) args[i-1] = $0[--i];
	args.unshift(console);
	Function.prototype.call.apply(console.log,args);
	return this;
};

Imba.Tag.prototype.css = function (key,val,mod){
	if (key instanceof Object) {
		for (let v, i = 0, keys = Object.keys(key), l = keys.length, k; i < l; i++){
			k = keys[i];v = key[k];this.css(k,v);
		};
		return this;
	};
	
	var name = Imba.CSSKeyMap[key] || key;
	
	if (val == null) {
		this.dom().style.removeProperty(name);
	} else if (val == undefined && arguments.length == 1) {
		return this.dom().style[name];
	} else if (name.match(/^--/)) {
		this.dom().style.setProperty(name,val);
	} else {
		if ((typeof val=='number'||val instanceof Number) && (name.match(/width|height|left|right|top|bottom/) || (mod && mod.px))) {
			this.dom().style[name] = val + "px";
		} else {
			this.dom().style[name] = val;
		};
	};
	return this;
};

Imba.Tag.prototype.setStyle = function (style){
	return this.setAttribute('style',style);
};

Imba.Tag.prototype.style = function (){
	return this.getAttribute('style');
};



Imba.Tag.prototype.trigger = function (name,data){
	if(data === undefined) data = {};
	return  true && Imba.Events.trigger(name,this,{data: data});
};



Imba.Tag.prototype.focus = function (){
	this.dom().focus();
	return this;
};



Imba.Tag.prototype.blur = function (){
	this.dom().blur();
	return this;
};

Imba.Tag.prototype.toString = function (){
	return this.dom().outerHTML;
};


Imba.Tag.prototype.initialize = Imba.Tag;

Imba.SVGTag = function SVGTag(){ return Imba.Tag.apply(this,arguments) };

Imba.subclass(Imba.SVGTag,Imba.Tag);
Imba.SVGTag.namespaceURI = function (){
	return "http://www.w3.org/2000/svg";
};

Imba.SVGTag.buildNode = function (){
	var dom = Imba.document().createElementNS(this.namespaceURI(),this._nodeType);
	if (this._classes) {
		var cls = this._classes.join(" ");
		if (cls) { dom.className.baseVal = cls };
	};
	return dom;
};

Imba.SVGTag.inherit = function (child){
	child._protoDom = null;
	
	if (this == Imba.SVGTag) {
		child._nodeType = child._name;
		return child._classes = [];
	} else {
		child._nodeType = this._nodeType;
		var className = "_" + child._name.replace(/_/g,'-');
		return child._classes = (this._classes || []).concat(className);
	};
};

Imba.HTML_TAGS = "a abbr address area article aside audio b base bdi bdo big blockquote body br button canvas caption cite code col colgroup data datalist dd del details dfn div dl dt em embed fieldset figcaption figure footer form h1 h2 h3 h4 h5 h6 head header hr html i iframe img input ins kbd keygen label legend li link main map mark menu menuitem meta meter nav noscript object ol optgroup option output p param pre progress q rp rt ruby s samp script section select small source span strong style sub summary sup table tbody td textarea tfoot th thead time title tr track u ul var video wbr".split(" ");
Imba.HTML_TAGS_UNSAFE = "article aside header section".split(" ");

Imba.HTML_ATTRS = {
	a: "href target hreflang media download rel type",
	form: "method action enctype autocomplete target",
	button: "autofocus type",
	input: "accept disabled form list max maxlength min minlength pattern required size step type",
	label: "accesskey for form",
	img: "src srcset",
	link: "rel type href media",
	iframe: "referrerpolicy src srcdoc sandbox",
	meta: "property content charset desc",
	optgroup: "label",
	option: "label",
	output: "for form",
	object: "type data width height",
	param: "name value",
	progress: "max",
	script: "src type async defer crossorigin integrity nonce language",
	select: "size form multiple",
	textarea: "rows cols minlength maxlength",
	td: "colspan rowspan",
	th: "colspan rowspan"
};


Imba.HTML_PROPS = {
	input: "autofocus autocomplete autocorrect value placeholder required disabled multiple checked readOnly",
	textarea: "autofocus autocomplete autocorrect value placeholder required disabled multiple checked readOnly",
	form: "novalidate",
	fieldset: "disabled",
	button: "disabled",
	select: "autofocus disabled required",
	option: "disabled selected value",
	optgroup: "disabled",
	progress: "value",
	fieldset: "disabled",
	canvas: "width height"
};

var extender = function(obj,sup) {
	for (let v, i = 0, keys = Object.keys(sup), l = keys.length, k; i < l; i++){
		k = keys[i];v = sup[k];(obj[k] == null) ? (obj[k] = v) : obj[k];
	};
	
	obj.prototype = Object.create(sup.prototype);
	obj.__super__ = obj.prototype.__super__ = sup.prototype;
	obj.prototype.constructor = obj;
	if (sup.inherit) { sup.inherit(obj) };
	return obj;
};


function Tag(){
	return function(dom,ctx) {
		this.initialize(dom,ctx);
		return this;
	};
};

Imba.Tags = function Tags(){
	this;
};

Imba.Tags.prototype.__clone = function (ns){
	var clone = Object.create(this);
	clone._parent = this;
	return clone;
};

Imba.Tags.prototype.ns = function (name){
	return this['_' + name.toUpperCase()] || this.defineNamespace(name);
};

Imba.Tags.prototype.defineNamespace = function (name){
	var clone = Object.create(this);
	clone._parent = this;
	clone._ns = name;
	this['_' + name.toUpperCase()] = clone;
	return clone;
};

Imba.Tags.prototype.baseType = function (name,ns){
	return (Imba.indexOf(name,Imba.HTML_TAGS) >= 0) ? 'element' : 'div';
};

Imba.Tags.prototype.defineTag = function (fullName,supr,body){
	if(body==undefined && typeof supr == 'function') body = supr,supr = '';
	if(supr==undefined) supr = '';
	if (body && body._nodeType) {
		supr = body;
		body = null;
	};
	
	if (this[fullName]) {
		console.log("tag already exists?",fullName);
	};
	
	
	var ns;
	var name = fullName;
	let nsidx = name.indexOf(':');
	if (nsidx >= 0) {
		ns = fullName.substr(0,nsidx);
		name = fullName.substr(nsidx + 1);
		if (ns == 'svg' && !(supr)) {
			supr = 'svg:element';
		};
	};
	
	supr || (supr = this.baseType(fullName));
	
	let supertype = ((typeof supr=='string'||supr instanceof String)) ? this.findTagType(supr) : supr;
	let tagtype = Tag();
	
	tagtype._name = name;
	tagtype._flagName = null;
	
	if (name[0] == '#') {
		Imba.SINGLETONS[name.slice(1)] = tagtype;
		this[name] = tagtype;
	} else if (name[0] == name[0].toUpperCase()) {
		tagtype._flagName = name;
	} else {
		tagtype._flagName = "_" + fullName.replace(/[_\:]/g,'-');
		this[fullName] = tagtype;
	};
	
	extender(tagtype,supertype);
	
	if (body) {
		body.call(tagtype,tagtype,tagtype.TAGS || this);
		if (tagtype.defined) { tagtype.defined() };
		this.optimizeTag(tagtype);
	};
	return tagtype;
};

Imba.Tags.prototype.defineSingleton = function (name,supr,body){
	return this.defineTag(name,supr,body);
};

Imba.Tags.prototype.extendTag = function (name,supr,body){
	if(body==undefined && typeof supr == 'function') body = supr,supr = '';
	if(supr==undefined) supr = '';
	var klass = (((typeof name=='string'||name instanceof String)) ? this.findTagType(name) : name);
	
	if (body) { body && body.call(klass,klass,klass.prototype) };
	if (klass.extended) { klass.extended() };
	this.optimizeTag(klass);
	return klass;
};

Imba.Tags.prototype.optimizeTag = function (tagtype){
	var prototype_;
	return (prototype_ = tagtype.prototype) && prototype_.optimizeTagStructure  &&  prototype_.optimizeTagStructure();
};

Imba.Tags.prototype.findTagType = function (type){
	var attrs, props;
	let klass = this[type];
	if (!(klass)) {
		if (type.substr(0,4) == 'svg:') {
			klass = this.defineTag(type,'svg:element');
		} else if (Imba.HTML_TAGS.indexOf(type) >= 0) {
			klass = this.defineTag(type,'element');
			
			if (attrs = Imba.HTML_ATTRS[type]) {
				for (let i = 0, items = iter$(attrs.split(" ")), len = items.length; i < len; i++) {
					Imba.attr(klass,items[i]);
				};
			};
			
			if (props = Imba.HTML_PROPS[type]) {
				for (let i = 0, items = iter$(props.split(" ")), len = items.length; i < len; i++) {
					Imba.attr(klass,items[i],{dom: true});
				};
			};
		};
	};
	return klass;
};

Imba.createElement = function (name,ctx,ref,pref){
	var type = name;
	var parent;
	if (name instanceof Function) {
		type = name;
	} else {
		if (null) {};
		type = Imba.TAGS.findTagType(name);
	};
	
	if (ctx instanceof TagMap) {
		parent = ctx.par$;
	} else if (pref instanceof Imba.Tag) {
		parent = pref;
	} else {
		parent = (ctx && pref != undefined) ? ctx[pref] : ((ctx && ctx._tag || ctx));
	};
	
	var node = type.build(parent);
	
	if (ctx instanceof TagMap) {
		ctx.i$++;
		node.$key = ref;
	};
	
	if (ctx && ref != undefined) {
		ctx[ref] = node;
	};
	
	return node;
};

Imba.createTagCache = function (owner){
	var item = [];
	item._tag = owner;
	return item;
	
	var par = ((this.pref() != undefined) ? this.ctx()[this.pref()] : this.ctx()._tag);
	var node = new TagMap(this.ctx(),this.ref(),par);
	this.ctx()[this.ref()] = node;
	return node;
};

Imba.createTagMap = function (ctx,ref,pref){
	var par = ((pref != undefined) ? pref : ctx._tag);
	var node = new TagMap(ctx,ref,par);
	ctx[ref] = node;
	return node;
};

Imba.createTagList = function (ctx,ref,pref){
	var node = [];
	node._type = 4;
	node._tag = ((pref != undefined) ? pref : ctx._tag);
	ctx[ref] = node;
	return node;
};

Imba.createTagLoopResult = function (ctx,ref,pref){
	var node = [];
	node._type = 5;
	node.cache = {i$: 0};
	return node;
};


function TagCache(owner){
	this._tag = owner;
	this;
};
TagCache.build = function (owner){
	var item = [];
	item._tag = owner;
	return item;
};



function TagMap(cache,ref,par){
	this.cache$ = cache;
	this.key$ = ref;
	this.par$ = par;
	this.i$ = 0;
};

TagMap.prototype.$iter = function (){
	var item = [];
	item._type = 5;
	item.cache = this;
	return item;
};

TagMap.prototype.$prune = function (items){
	let cache = this.cache$;
	let key = this.key$;
	let clone = new TagMap(cache,key,this.par$);
	for (let i = 0, ary = iter$(items), len = ary.length, item; i < len; i++) {
		item = ary[i];
		clone[item.key$] = item;
	};
	clone.i$ = items.length;
	return cache[key] = clone;
};

Imba.TagMap = TagMap;
Imba.TagCache = TagCache;
Imba.SINGLETONS = {};
Imba.TAGS = new Imba.Tags();
Imba.TAGS.element = Imba.TAGS.htmlelement = Imba.Tag;
Imba.TAGS['svg:element'] = Imba.SVGTag;

Imba.defineTag = function (name,supr,body){
	if(body==undefined && typeof supr == 'function') body = supr,supr = '';
	if(supr==undefined) supr = '';
	return Imba.TAGS.defineTag(name,supr,body);
};

Imba.defineSingletonTag = function (id,supr,body){
	if(body==undefined && typeof supr == 'function') body = supr,supr = 'div';
	if(supr==undefined) supr = 'div';
	return Imba.TAGS.defineTag(this.name(),supr,body);
};

Imba.extendTag = function (name,body){
	return Imba.TAGS.extendTag(name,body);
};

Imba.getTagSingleton = function (id){
	var klass;
	var dom,node;
	
	if (klass = Imba.SINGLETONS[id]) {
		if (klass && klass.Instance) { return klass.Instance };
		
		
		if (dom = Imba.document().getElementById(id)) {
			// we have a live instance - when finding it through a selector we should awake it, no?
			// console.log('creating the singleton from existing node in dom?',id,type)
			node = klass.Instance = new klass(dom);
			node.awaken(dom); 
			return node;
		};
		
		dom = klass.createNode();
		dom.id = id;
		node = klass.Instance = new klass(dom);
		node.end().awaken(dom);
		return node;
	} else if (dom = Imba.document().getElementById(id)) {
		return Imba.getTagForDom(dom);
	};
};

var svgSupport = typeof SVGElement !== 'undefined';


Imba.getTagForDom = function (dom){
	if (!(dom)) { return null };
	if (dom._dom) { return dom };
	if (dom._tag) { return dom._tag };
	if (!dom.nodeName) { return null };
	
	var name = dom.nodeName.toLowerCase();
	var type = name;
	var ns = Imba.TAGS;
	
	if (dom.id && Imba.SINGLETONS[dom.id]) {
		return Imba.getTagSingleton(dom.id);
	};
	
	if (svgSupport && (dom instanceof SVGElement)) {
		type = ns.findTagType("svg:" + name);
	} else if (Imba.HTML_TAGS.indexOf(name) >= 0) {
		type = ns.findTagType(name);
	} else {
		type = Imba.Tag;
	};
	
	return new type(dom,null).awaken(dom);
};


if (false) { var camelCase, unprefixed, styles; };

Imba.Tag;


/***/ }),

/***/ "./node_modules/imba/src/imba/dom/touch.imba":
/*!***************************************************!*\
  !*** ./node_modules/imba/src/imba/dom/touch.imba ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

function iter$(a){ return a ? (a.toArray ? a.toArray() : a) : []; };
var Imba = __webpack_require__(/*! ../imba */ "./node_modules/imba/src/imba/imba.imba");










Imba.Touch = function Touch(event,pointer){
	// @native  = false
	this.setEvent(event);
	this.setData({});
	this.setActive(true);
	this._button = event && event.button || 0;
	this._suppress = false; 
	this._captured = false;
	this.setBubble(false);
	pointer = pointer;
	this.setUpdates(0);
	return this;
};

Imba.Touch.LastTimestamp = 0;
Imba.Touch.TapTimeout = 50;



var touches = [];
var count = 0;
var identifiers = {};

Imba.Touch.count = function (){
	return count;
};

Imba.Touch.lookup = function (item){
	return item && (item.__touch__ || identifiers[item.identifier]);
};

Imba.Touch.release = function (item,touch){
	var v_, $1;
	(((v_ = identifiers[item.identifier]),delete identifiers[item.identifier], v_));
	((($1 = item.__touch__),delete item.__touch__, $1));
	return;
};

Imba.Touch.ontouchstart = function (e){
	for (let i = 0, items = iter$(e.changedTouches), len = items.length, t; i < len; i++) {
		t = items[i];
		if (this.lookup(t)) { continue; };
		var touch = identifiers[t.identifier] = new this(e); 
		t.__touch__ = touch;
		touches.push(touch);
		count++;
		touch.touchstart(e,t);
	};
	return this;
};

Imba.Touch.ontouchmove = function (e){
	var touch;
	for (let i = 0, items = iter$(e.changedTouches), len = items.length, t; i < len; i++) {
		t = items[i];
		if (touch = this.lookup(t)) {
			touch.touchmove(e,t);
		};
	};
	
	return this;
};

Imba.Touch.ontouchend = function (e){
	var touch;
	for (let i = 0, items = iter$(e.changedTouches), len = items.length, t; i < len; i++) {
		t = items[i];
		if (touch = this.lookup(t)) {
			touch.touchend(e,t);
			this.release(t,touch);
			count--;
		};
	};
	
	
	
	
	return this;
};

Imba.Touch.ontouchcancel = function (e){
	var touch;
	for (let i = 0, items = iter$(e.changedTouches), len = items.length, t; i < len; i++) {
		t = items[i];
		if (touch = this.lookup(t)) {
			touch.touchcancel(e,t);
			this.release(t,touch);
			count--;
		};
	};
	return this;
};

Imba.Touch.onmousedown = function (e){
	return this;
};

Imba.Touch.onmousemove = function (e){
	return this;
};

Imba.Touch.onmouseup = function (e){
	return this;
};


Imba.Touch.prototype.phase = function(v){ return this._phase; }
Imba.Touch.prototype.setPhase = function(v){ this._phase = v; return this; };
Imba.Touch.prototype.active = function(v){ return this._active; }
Imba.Touch.prototype.setActive = function(v){ this._active = v; return this; };
Imba.Touch.prototype.event = function(v){ return this._event; }
Imba.Touch.prototype.setEvent = function(v){ this._event = v; return this; };
Imba.Touch.prototype.pointer = function(v){ return this._pointer; }
Imba.Touch.prototype.setPointer = function(v){ this._pointer = v; return this; };
Imba.Touch.prototype.target = function(v){ return this._target; }
Imba.Touch.prototype.setTarget = function(v){ this._target = v; return this; };
Imba.Touch.prototype.handler = function(v){ return this._handler; }
Imba.Touch.prototype.setHandler = function(v){ this._handler = v; return this; };
Imba.Touch.prototype.updates = function(v){ return this._updates; }
Imba.Touch.prototype.setUpdates = function(v){ this._updates = v; return this; };
Imba.Touch.prototype.suppress = function(v){ return this._suppress; }
Imba.Touch.prototype.setSuppress = function(v){ this._suppress = v; return this; };
Imba.Touch.prototype.data = function(v){ return this._data; }
Imba.Touch.prototype.setData = function(v){ this._data = v; return this; };
Imba.Touch.prototype.__bubble = {chainable: true,name: 'bubble'};
Imba.Touch.prototype.bubble = function(v){ return v !== undefined ? (this.setBubble(v),this) : this._bubble; }
Imba.Touch.prototype.setBubble = function(v){ this._bubble = v; return this; };
Imba.Touch.prototype.timestamp = function(v){ return this._timestamp; }
Imba.Touch.prototype.setTimestamp = function(v){ this._timestamp = v; return this; };

Imba.Touch.prototype.gestures = function(v){ return this._gestures; }
Imba.Touch.prototype.setGestures = function(v){ this._gestures = v; return this; };



Imba.Touch.prototype.capture = function (){
	this._captured = true;
	this._event && this._event.stopPropagation();
	if (!this._selblocker) {
		this._selblocker = function(e) { return e.preventDefault(); };
		Imba.document().addEventListener('selectstart',this._selblocker,true);
	};
	return this;
};

Imba.Touch.prototype.isCaptured = function (){
	return !(!this._captured);
};



Imba.Touch.prototype.extend = function (plugin){
	// console.log "added gesture!!!"
	this._gestures || (this._gestures = []);
	this._gestures.push(plugin);
	return this;
};



Imba.Touch.prototype.redirect = function (target){
	this._redirect = target;
	return this;
};



Imba.Touch.prototype.suppress = function (){
	// collision with the suppress property
	this._active = false;
	
	return this;
};

Imba.Touch.prototype.setSuppress = function (value){
	console.warn('Imba.Touch#suppress= is deprecated');
	this._supress = value;
	this;
	return this;
};

Imba.Touch.prototype.touchstart = function (e,t){
	this._event = e;
	this._touch = t;
	this._button = 0;
	this._x = t.clientX;
	this._y = t.clientY;
	this.began();
	this.update();
	if (e && this.isCaptured()) { e.preventDefault() };
	return this;
};

Imba.Touch.prototype.touchmove = function (e,t){
	this._event = e;
	this._x = t.clientX;
	this._y = t.clientY;
	this.update();
	if (e && this.isCaptured()) { e.preventDefault() };
	return this;
};

Imba.Touch.prototype.touchend = function (e,t){
	this._event = e;
	this._x = t.clientX;
	this._y = t.clientY;
	this.ended();
	
	Imba.Touch.LastTimestamp = e.timeStamp;
	
	if (this._maxdr < 20) {
		var tap = new Imba.Event(e);
		tap.setType('tap');
		tap.process();
	};
	
	if (e && this.isCaptured()) {
		e.preventDefault();
	};
	
	return this;
};

Imba.Touch.prototype.touchcancel = function (e,t){
	return this.cancel();
};

Imba.Touch.prototype.mousedown = function (e,t){
	var self = this;
	self._event = e;
	self._button = e.button;
	self._x = t.clientX;
	self._y = t.clientY;
	self.began();
	self.update();
	self._mousemove = function(e) { return self.mousemove(e,e); };
	Imba.document().addEventListener('mousemove',self._mousemove,true);
	return self;
};

Imba.Touch.prototype.mousemove = function (e,t){
	this._x = t.clientX;
	this._y = t.clientY;
	this._event = e;
	if (this.isCaptured()) { e.preventDefault() };
	this.update();
	this.move();
	return this;
};

Imba.Touch.prototype.mouseup = function (e,t){
	this._x = t.clientX;
	this._y = t.clientY;
	this.ended();
	return this;
};

Imba.Touch.prototype.idle = function (){
	return this.update();
};

Imba.Touch.prototype.began = function (){
	this._timestamp = Date.now();
	this._maxdr = this._dr = 0;
	this._x0 = this._x;
	this._y0 = this._y;
	
	var dom = this.event().target;
	var node = null;
	
	this._sourceTarget = dom && Imba.getTagForDom(dom);
	
	while (dom){
		node = Imba.getTagForDom(dom);
		if (node && node.ontouchstart) {
			this._bubble = false;
			this.setTarget(node);
			this.target().ontouchstart(this);
			if (!this._bubble) { break; };
		};
		dom = dom.parentNode;
	};
	
	this._updates++;
	return this;
};

Imba.Touch.prototype.update = function (){
	var target_;
	if (!this._active || this._cancelled) { return this };
	
	var dr = Math.sqrt(this.dx() * this.dx() + this.dy() * this.dy());
	if (dr > this._dr) { this._maxdr = dr };
	this._dr = dr;
	
	
	if (this._redirect) {
		if (this._target && this._target.ontouchcancel) {
			this._target.ontouchcancel(this);
		};
		this.setTarget(this._redirect);
		this._redirect = null;
		if (this.target().ontouchstart) { this.target().ontouchstart(this) };
		if (this._redirect) { return this.update() }; 
	};
	
	
	this._updates++;
	if (this._gestures) {
		for (let i = 0, items = iter$(this._gestures), len = items.length; i < len; i++) {
			items[i].ontouchupdate(this);
		};
	};
	
	(target_ = this.target()) && target_.ontouchupdate  &&  target_.ontouchupdate(this);
	if (this._redirect) this.update();
	return this;
};

Imba.Touch.prototype.move = function (){
	var target_;
	if (!this._active || this._cancelled) { return this };
	
	if (this._gestures) {
		for (let i = 0, items = iter$(this._gestures), len = items.length, g; i < len; i++) {
			g = items[i];
			if (g.ontouchmove) { g.ontouchmove(this,this._event) };
		};
	};
	
	(target_ = this.target()) && target_.ontouchmove  &&  target_.ontouchmove(this,this._event);
	return this;
};

Imba.Touch.prototype.ended = function (){
	var target_;
	if (!this._active || this._cancelled) { return this };
	
	this._updates++;
	
	if (this._gestures) {
		for (let i = 0, items = iter$(this._gestures), len = items.length; i < len; i++) {
			items[i].ontouchend(this);
		};
	};
	
	(target_ = this.target()) && target_.ontouchend  &&  target_.ontouchend(this);
	this.cleanup_();
	return this;
};

Imba.Touch.prototype.cancel = function (){
	if (!this._cancelled) {
		this._cancelled = true;
		this.cancelled();
		this.cleanup_();
	};
	return this;
};

Imba.Touch.prototype.cancelled = function (){
	var target_;
	if (!this._active) { return this };
	
	this._cancelled = true;
	this._updates++;
	
	if (this._gestures) {
		for (let i = 0, items = iter$(this._gestures), len = items.length, g; i < len; i++) {
			g = items[i];
			if (g.ontouchcancel) { g.ontouchcancel(this) };
		};
	};
	
	(target_ = this.target()) && target_.ontouchcancel  &&  target_.ontouchcancel(this);
	return this;
};

Imba.Touch.prototype.cleanup_ = function (){
	if (this._mousemove) {
		Imba.document().removeEventListener('mousemove',this._mousemove,true);
		this._mousemove = null;
	};
	
	if (this._selblocker) {
		Imba.document().removeEventListener('selectstart',this._selblocker,true);
		this._selblocker = null;
	};
	
	return this;
};



Imba.Touch.prototype.dr = function (){
	return this._dr;
};



Imba.Touch.prototype.dx = function (){
	return this._x - this._x0;
};



Imba.Touch.prototype.dy = function (){
	return this._y - this._y0;
};



Imba.Touch.prototype.x0 = function (){
	return this._x0;
};



Imba.Touch.prototype.y0 = function (){
	return this._y0;
};



Imba.Touch.prototype.x = function (){
	return this._x;
};



Imba.Touch.prototype.y = function (){
	return this._y;
};



Imba.Touch.prototype.tx = function (){
	this._targetBox || (this._targetBox = this._target.dom().getBoundingClientRect());
	return this._x - this._targetBox.left;
};



Imba.Touch.prototype.ty = function (){
	this._targetBox || (this._targetBox = this._target.dom().getBoundingClientRect());
	return this._y - this._targetBox.top;
};



Imba.Touch.prototype.button = function (){
	return this._button;
}; 

Imba.Touch.prototype.sourceTarget = function (){
	return this._sourceTarget;
};

Imba.Touch.prototype.elapsed = function (){
	return Date.now() - this._timestamp;
};


Imba.TouchGesture = function TouchGesture(){ };

Imba.TouchGesture.prototype.__active = {'default': false,name: 'active'};
Imba.TouchGesture.prototype.active = function(v){ return this._active; }
Imba.TouchGesture.prototype.setActive = function(v){ this._active = v; return this; }
Imba.TouchGesture.prototype._active = false;

Imba.TouchGesture.prototype.ontouchstart = function (e){
	return this;
};

Imba.TouchGesture.prototype.ontouchupdate = function (e){
	return this;
};

Imba.TouchGesture.prototype.ontouchend = function (e){
	return this;
};



/***/ }),

/***/ "./node_modules/imba/src/imba/imba.imba":
/*!**********************************************!*\
  !*** ./node_modules/imba/src/imba/imba.imba ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {



var Imba = {VERSION: '1.4.0'};



Imba.setTimeout = function (delay,block){
	return setTimeout(function() {
		block();
		return Imba.commit();
	},delay);
};



Imba.setInterval = function (interval,block){
	return setInterval(block,interval);
};



Imba.clearInterval = function (id){
	return clearInterval(id);
};



Imba.clearTimeout = function (id){
	return clearTimeout(id);
};


Imba.subclass = function (obj,sup){
	for (let k in sup){
		let v;
		v = sup[k];if (sup.hasOwnProperty(k)) { obj[k] = v };
	};
	
	obj.prototype = Object.create(sup.prototype);
	obj.__super__ = obj.prototype.__super__ = sup.prototype;
	obj.prototype.initialize = obj.prototype.constructor = obj;
	return obj;
};



Imba.iterable = function (o){
	return o ? ((o.toArray ? o.toArray() : o)) : [];
};



Imba.await = function (value){
	if (value instanceof Array) {
		console.warn("await (Array) is deprecated - use await Promise.all(Array)");
		return Promise.all(value);
	} else if (value && value.then) {
		return value;
	} else {
		return Promise.resolve(value);
	};
};

var dashRegex = /-./g;
var setterCache = {};

Imba.toCamelCase = function (str){
	if (str.indexOf('-') >= 0) {
		return str.replace(dashRegex,function(m) { return m.charAt(1).toUpperCase(); });
	} else {
		return str;
	};
};

Imba.toSetter = function (str){
	return setterCache[str] || (setterCache[str] = Imba.toCamelCase('set-' + str));
};

Imba.indexOf = function (a,b){
	return (b && b.indexOf) ? b.indexOf(a) : [].indexOf.call(a,b);
};

Imba.len = function (a){
	return a && ((a.len instanceof Function) ? a.len.call(a) : a.length) || 0;
};

Imba.prop = function (scope,name,opts){
	if (scope.defineProperty) {
		return scope.defineProperty(name,opts);
	};
	return;
};

Imba.attr = function (scope,name,opts){
	if(opts === undefined) opts = {};
	if (scope.defineAttribute) {
		return scope.defineAttribute(name,opts);
	};
	
	let getName = Imba.toCamelCase(name);
	let setName = Imba.toCamelCase('set-' + name);
	let proto = scope.prototype;
	
	if (opts.dom) {
		proto[getName] = function() { return this.dom()[name]; };
		proto[setName] = function(value) {
			if (value != this[name]()) {
				this.dom()[name] = value;
			};
			return this;
		};
	} else {
		proto[getName] = function() { return this.getAttribute(name); };
		proto[setName] = function(value) {
			this.setAttribute(name,value);
			return this;
		};
	};
	return;
};

Imba.propDidSet = function (object,property,val,prev){
	let fn = property.watch;
	if (fn instanceof Function) {
		fn.call(object,val,prev,property);
	} else if ((typeof fn=='string'||fn instanceof String) && object[fn]) {
		object[fn](val,prev,property);
	};
	return;
};



var emit__ = function(event,args,node) {
	// var node = cbs[event]
	var prev,cb,ret;
	
	while ((prev = node) && (node = node.next)){
		if (cb = node.listener) {
			if (node.path && cb[node.path]) {
				ret = args ? cb[node.path].apply(cb,args) : cb[node.path]();
			} else {
				// check if it is a method?
				ret = args ? cb.apply(node,args) : cb.call(node);
			};
		};
		
		if (node.times && --node.times <= 0) {
			prev.next = node.next;
			node.listener = null;
		};
	};
	return;
};


Imba.listen = function (obj,event,listener,path){
	var cbs,list,tail;
	cbs = obj.__listeners__ || (obj.__listeners__ = {});
	list = cbs[event] || (cbs[event] = {});
	tail = list.tail || (list.tail = (list.next = {}));
	tail.listener = listener;
	tail.path = path;
	list.tail = tail.next = {};
	return tail;
};


Imba.once = function (obj,event,listener){
	var tail = Imba.listen(obj,event,listener);
	tail.times = 1;
	return tail;
};


Imba.unlisten = function (obj,event,cb,meth){
	var node,prev;
	var meta = obj.__listeners__;
	if (!(meta)) { return };
	
	if (node = meta[event]) {
		while ((prev = node) && (node = node.next)){
			if (node == cb || node.listener == cb) {
				prev.next = node.next;
				
				node.listener = null;
				break;
			};
		};
	};
	return;
};


Imba.emit = function (obj,event,params){
	var cb;
	if (cb = obj.__listeners__) {
		if (cb[event]) { emit__(event,params,cb[event]) };
		if (cb.all) { emit__(event,[event,params],cb.all) }; 
	};
	return;
};

Imba.observeProperty = function (observer,key,trigger,target,prev){
	if (prev && typeof prev == 'object') {
		Imba.unlisten(prev,'all',observer,trigger);
	};
	if (target && typeof target == 'object') {
		Imba.listen(target,'all',observer,trigger);
	};
	return this;
};

module.exports = Imba;


/***/ }),

/***/ "./node_modules/imba/src/imba/index.imba":
/*!***********************************************!*\
  !*** ./node_modules/imba/src/imba/index.imba ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var Imba = __webpack_require__(/*! ./imba */ "./node_modules/imba/src/imba/imba.imba");
var activate = false;
var ns = ((typeof window !== 'undefined') ? window : (((typeof global !== 'undefined') ? global : null)));

if (ns && ns.Imba) {
	console.warn(("Imba v" + (ns.Imba.VERSION) + " is already loaded."));
	Imba = ns.Imba;
} else if (ns) {
	ns.Imba = Imba;
	activate = true;
	if (ns.define && ns.define.amd) {
		ns.define("imba",[],function() { return Imba; });
	};
};

module.exports = Imba;

if (true) {
	__webpack_require__(/*! ./scheduler */ "./node_modules/imba/src/imba/scheduler.imba");
	__webpack_require__(/*! ./dom/index */ "./node_modules/imba/src/imba/dom/index.imba");
};

if (activate) {
	Imba.EventManager.activate();
};

if (false) {};

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/imba/src/imba/scheduler.imba":
/*!***************************************************!*\
  !*** ./node_modules/imba/src/imba/scheduler.imba ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

function iter$(a){ return a ? (a.toArray ? a.toArray() : a) : []; };
var Imba = __webpack_require__(/*! ./imba */ "./node_modules/imba/src/imba/imba.imba");

var requestAnimationFrame; 
var cancelAnimationFrame;

if (false) {};

if (true) {
	cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame || window.webkitRequestAnimationFrame;
	requestAnimationFrame = window.requestAnimationFrame;
	requestAnimationFrame || (requestAnimationFrame = window.webkitRequestAnimationFrame);
	requestAnimationFrame || (requestAnimationFrame = window.mozRequestAnimationFrame);
	requestAnimationFrame || (requestAnimationFrame = function(blk) { return setTimeout(blk,1000 / 60); });
};

function Ticker(){
	var self = this;
	self._queue = [];
	self._stage = -1;
	self._scheduled = false;
	self._ticker = function(e) {
		self._scheduled = false;
		return self.tick(e);
	};
	self;
};

Ticker.prototype.stage = function(v){ return this._stage; }
Ticker.prototype.setStage = function(v){ this._stage = v; return this; };
Ticker.prototype.queue = function(v){ return this._queue; }
Ticker.prototype.setQueue = function(v){ this._queue = v; return this; };

Ticker.prototype.add = function (item,force){
	if (force || this._queue.indexOf(item) == -1) {
		this._queue.push(item);
	};
	
	if (!this._scheduled) { return this.schedule() };
};

Ticker.prototype.tick = function (timestamp){
	var items = this._queue;
	if (!this._ts) { this._ts = timestamp };
	this._dt = timestamp - this._ts;
	this._ts = timestamp;
	this._queue = [];
	this._stage = 1;
	this.before();
	if (items.length) {
		for (let i = 0, ary = iter$(items), len = ary.length, item; i < len; i++) {
			item = ary[i];
			if (item instanceof Function) {
				item(this._dt,this);
			} else if (item.tick) {
				item.tick(this._dt,this);
			};
		};
	};
	this._stage = 2;
	this.after();
	this._stage = this._scheduled ? 0 : (-1);
	return this;
};

Ticker.prototype.schedule = function (){
	if (!this._scheduled) {
		this._scheduled = true;
		if (this._stage == -1) {
			this._stage = 0;
		};
		requestAnimationFrame(this._ticker);
	};
	return this;
};

Ticker.prototype.before = function (){
	return this;
};

Ticker.prototype.after = function (){
	if (Imba.TagManager) {
		Imba.TagManager.refresh();
	};
	return this;
};

Imba.TICKER = new Ticker();
Imba.SCHEDULERS = [];

Imba.ticker = function (){
	return Imba.TICKER;
};

Imba.requestAnimationFrame = function (callback){
	return requestAnimationFrame(callback);
};

Imba.cancelAnimationFrame = function (id){
	return cancelAnimationFrame(id);
};




var commitQueue = 0;

Imba.commit = function (params){
	commitQueue++;
	
	Imba.emit(Imba,'commit',(params != undefined) ? [params] : undefined);
	if (--commitQueue == 0) {
		Imba.TagManager && Imba.TagManager.refresh();
	};
	return;
};



Imba.Scheduler = function Scheduler(target){
	var self = this;
	self._id = counter++;
	self._target = target;
	self._marked = false;
	self._active = false;
	self._marker = function() { return self.mark(); };
	self._ticker = function(e) { return self.tick(e); };
	
	self._dt = 0;
	self._frame = {};
	self._scheduled = false;
	self._timestamp = 0;
	self._ticks = 0;
	self._flushes = 0;
	
	self.onevent = self.onevent.bind(self);
	self;
};

var counter = 0;

Imba.Scheduler.event = function (e){
	return Imba.emit(Imba,'event',e);
};



Imba.Scheduler.prototype.__raf = {watch: 'rafDidSet',name: 'raf'};
Imba.Scheduler.prototype.raf = function(v){ return this._raf; }
Imba.Scheduler.prototype.setRaf = function(v){
	var a = this.raf();
	if(v != a) { this._raf = v; }
	if(v != a) { this.rafDidSet && this.rafDidSet(v,a,this.__raf) }
	return this;
};
Imba.Scheduler.prototype.__interval = {watch: 'intervalDidSet',name: 'interval'};
Imba.Scheduler.prototype.interval = function(v){ return this._interval; }
Imba.Scheduler.prototype.setInterval = function(v){
	var a = this.interval();
	if(v != a) { this._interval = v; }
	if(v != a) { this.intervalDidSet && this.intervalDidSet(v,a,this.__interval) }
	return this;
};
Imba.Scheduler.prototype.__events = {watch: 'eventsDidSet',name: 'events'};
Imba.Scheduler.prototype.events = function(v){ return this._events; }
Imba.Scheduler.prototype.setEvents = function(v){
	var a = this.events();
	if(v != a) { this._events = v; }
	if(v != a) { this.eventsDidSet && this.eventsDidSet(v,a,this.__events) }
	return this;
};
Imba.Scheduler.prototype.marked = function(v){ return this._marked; }
Imba.Scheduler.prototype.setMarked = function(v){ this._marked = v; return this; };

Imba.Scheduler.prototype.rafDidSet = function (bool){
	if (bool && this._active) this.requestTick();
	return this;
};

Imba.Scheduler.prototype.intervalDidSet = function (time){
	clearInterval(this._intervalId);
	this._intervalId = null;
	if (time && this._active) {
		this._intervalId = setInterval(this.oninterval.bind(this),time);
	};
	return this;
};

Imba.Scheduler.prototype.eventsDidSet = function (new$,prev){
	if (this._active && new$ && !(prev)) {
		return Imba.listen(Imba,'commit',this,'onevent');
	} else if (!(new$) && prev) {
		return Imba.unlisten(Imba,'commit',this,'onevent');
	};
};



Imba.Scheduler.prototype.active = function (){
	return this._active;
};



Imba.Scheduler.prototype.dt = function (){
	return this._dt;
};



Imba.Scheduler.prototype.configure = function (options){
	var v_;
	if(options === undefined) options = {};
	if (options.raf != undefined) { (this.setRaf(v_ = options.raf),v_) };
	if (options.interval != undefined) { (this.setInterval(v_ = options.interval),v_) };
	if (options.events != undefined) { (this.setEvents(v_ = options.events),v_) };
	return this;
};



Imba.Scheduler.prototype.mark = function (){
	this._marked = true;
	if (!this._scheduled) {
		this.requestTick();
	};
	return this;
};



Imba.Scheduler.prototype.flush = function (){
	this._flushes++;
	this._target.tick(this);
	this._marked = false;
	return this;
};



Imba.Scheduler.prototype.tick = function (delta,ticker){
	this._ticks++;
	this._dt = delta;
	
	if (ticker) {
		this._scheduled = false;
	};
	
	this.flush();
	
	if (this._raf && this._active) {
		this.requestTick();
	};
	return this;
};

Imba.Scheduler.prototype.requestTick = function (){
	if (!this._scheduled) {
		this._scheduled = true;
		Imba.TICKER.add(this);
	};
	return this;
};



Imba.Scheduler.prototype.activate = function (immediate){
	if(immediate === undefined) immediate = true;
	if (!this._active) {
		this._active = true;
		this._commit = this._target.commit;
		this._target.commit = function() { return this; };
		this._target && this._target.flag  &&  this._target.flag('scheduled_');
		Imba.SCHEDULERS.push(this);
		
		if (this._events) {
			Imba.listen(Imba,'commit',this,'onevent');
		};
		
		if (this._interval && !this._intervalId) {
			this._intervalId = setInterval(this.oninterval.bind(this),this._interval);
		};
		
		if (immediate) {
			this.tick(0);
		} else if (this._raf) {
			this.requestTick();
		};
	};
	return this;
};



Imba.Scheduler.prototype.deactivate = function (){
	if (this._active) {
		this._active = false;
		this._target.commit = this._commit;
		let idx = Imba.SCHEDULERS.indexOf(this);
		if (idx >= 0) {
			Imba.SCHEDULERS.splice(idx,1);
		};
		
		if (this._events) {
			Imba.unlisten(Imba,'commit',this,'onevent');
		};
		
		if (this._intervalId) {
			clearInterval(this._intervalId);
			this._intervalId = null;
		};
		
		this._target && this._target.unflag  &&  this._target.unflag('scheduled_');
	};
	return this;
};

Imba.Scheduler.prototype.track = function (){
	return this._marker;
};

Imba.Scheduler.prototype.oninterval = function (){
	this.tick();
	Imba.TagManager.refresh();
	return this;
};

Imba.Scheduler.prototype.onevent = function (event){
	if (!this._events || this._marked) { return this };
	
	if (this._events instanceof Function) {
		if (this._events(event,this)) this.mark();
	} else if (this._events instanceof Array) {
		if (this._events.indexOf((event && event.type) || event) >= 0) {
			this.mark();
		};
	} else {
		this.mark();
	};
	return this;
};


/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1, eval)("this");
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./src/App.imba":
/*!**********************!*\
  !*** ./src/App.imba ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

function iter$(a){ return a ? (a.toArray ? a.toArray() : a) : []; };
var Imba = __webpack_require__(/*! imba */ "./node_modules/imba/imba.imba"), _2 = Imba.createTagList, _3 = Imba.createTagMap, _1 = Imba.createElement;
var CardRow = __webpack_require__(/*! ./CardRow */ "./src/CardRow.imba").CardRow;
var CardView = __webpack_require__(/*! ./CardView */ "./src/CardView.imba").CardView;

let languages = [
	"english",
	"german",
	"french",
	"italian",
	"koreana",
	"spanish",
	"schinese",
	"tchinese",
	"russian",
	"thai",
	"japanese",
	"portuguese",
	"polish",
	"danish",
	"dutch",
	"finnish",
	"norwegian",
	"swedish",
	"hungarian",
	"czech",
	"romanian",
	"turkish",
	"brazilian",
	"bulgarian",
	"greek",
	"ukrainian",
	"latam",
	"vietnamese"
];

var App = Imba.defineTag('App', function(tag){
	tag.prototype.searchText = function(v){ return this._searchText; }
	tag.prototype.setSearchText = function(v){ this._searchText = v; return this; };
	tag.prototype.__language = {'default': 'english',name: 'language'};
	tag.prototype.language = function(v){ return this._language; }
	tag.prototype.setLanguage = function(v){ this._language = v; return this; }
	tag.prototype._language = 'english';
	tag.prototype.__query = {'default': {
		text: '',
		type: {
			Hero: true,
			Creep: true,
			Spell: true,
			Improvement: true,
			Item: true
		},
		sub_type: {
			Armor: true,
			Weapon: true,
			Accessory: true,
			Consumable: true
		},
		color: {
			is_red: true,
			is_green: true,
			is_blue: true,
			is_black: true
		},
		no_color: true,
		rarity: {
			Basic: true,
			Common: true,
			Uncommon: true,
			Rare: true
		}
	},name: 'query'};
	tag.prototype.query = function(v){ return this._query; }
	tag.prototype.setQuery = function(v){ this._query = v; return this; }
	tag.prototype._query = {
		text: '',
		type: {
			Hero: true,
			Creep: true,
			Spell: true,
			Improvement: true,
			Item: true
		},
		sub_type: {
			Armor: true,
			Weapon: true,
			Accessory: true,
			Consumable: true
		},
		color: {
			is_red: true,
			is_green: true,
			is_blue: true,
			is_black: true
		},
		no_color: true,
		rarity: {
			Basic: true,
			Common: true,
			Uncommon: true,
			Rare: true
		}
	};
	tag.prototype.__sets = {'default': [],name: 'sets'};
	tag.prototype.sets = function(v){ return this._sets; }
	tag.prototype.setSets = function(v){ this._sets = v; return this; }
	tag.prototype._sets = [];
	tag.prototype.__cards = {'default': [],name: 'cards'};
	tag.prototype.cards = function(v){ return this._cards; }
	tag.prototype.setCards = function(v){ this._cards = v; return this; }
	tag.prototype._cards = [];
	tag.prototype.__cardsIndex = {'default': {},name: 'cardsIndex'};
	tag.prototype.cardsIndex = function(v){ return this._cardsIndex; }
	tag.prototype.setCardsIndex = function(v){ this._cardsIndex = v; return this; }
	tag.prototype._cardsIndex = {};
	tag.prototype.viewingCard = function(v){ return this._viewingCard; }
	tag.prototype.setViewingCard = function(v){ this._viewingCard = v; return this; };
	
	tag.prototype.setSearchText = function (value){
		this._searchText = value;
		if (value) {
			this._query.text = new RegExp(value,'i');
		} else {
			this._query.text = value;
		};
		return this;
	};
	
	tag.prototype.viewCard = function (card){
		return (this.setViewingCard(card),card);
	};
	
	tag.prototype.changeLanguage = function (e){
		let newLanguage = e.target().value();
		let res = [];
		for (let i = 0, items = iter$(this._cards), len = items.length; i < len; i++) {
			res.push(items[i].language);
		};
		return res;
	};
	
	
	tag.prototype.matchText = function (card,text){
		var $1, $2, illustrator_, attack_, armor_, hit_points_, mana_cost_, gold_cost_;
		if (($1 = card.card_name[this.language()]) && $1.search  &&  $1.search(text) >= 0) {
			return true;
		};
		
		if (($2 = card.card_text[this.language()]) && $2.search  &&  $2.search(text) >= 0) {
			return true;
		};
		
		if ((illustrator_ = card.illustrator) && illustrator_.search  &&  illustrator_.search(text) >= 0) {
			return true;
		};
		
		if ((attack_ = card.attack) && attack_.toString  &&  attack_.toString().search(text) >= 0) {
			return true;
		};
		
		if ((armor_ = card.armor) && armor_.toString  &&  armor_.toString().search(text) >= 0) {
			return true;
		};
		
		if ((hit_points_ = card.hit_points) && hit_points_.toString  &&  hit_points_.toString().search(text) >= 0) {
			return true;
		};
		
		if ((mana_cost_ = card.mana_cost) && mana_cost_.toString  &&  mana_cost_.toString().search(text) >= 0) {
			return true;
		};
		
		if ((gold_cost_ = card.gold_cost) && gold_cost_.toString  &&  gold_cost_.toString().search(text) >= 0) {
			return true;
		};
	};
	
	tag.prototype.matchColor = function (card,colors,noColor){
		var hasColor = false;
		for (let color in colors){
			let is_color;
			is_color = colors[color];if (card[color]) {
				hasColor = true;
				if (is_color && card[color] === is_color) {
					return true;
				};
			};
		};
		return hasColor ? (
			false
		) : (
			noColor !== hasColor
		);
	};
	
	tag.prototype.matchType = function (card,types){
		for (let type in types){
			let is_type;
			is_type = types[type];if (card.card_type) {
				if (is_type && card.card_type == type) {
					return true;
				};
			};
		};
		
		return false;
	};
	
	tag.prototype.matchSubType = function (card,sub_types){
		for (let sub_type in sub_types){
			let is_sub_type;
			is_sub_type = sub_types[sub_type];if (card.sub_type) {
				if (is_sub_type && card.sub_type == sub_type) {
					return true;
				};
			};
		};
		
		return false;
	};
	
	tag.prototype.matchRarity = function (card,rarities){
		for (let rarity in rarities){
			let is_rarity;
			is_rarity = rarities[rarity];if (card.rarity) {
				if (is_rarity && card.rarity == rarity) {
					return true;
				};
			} else {
				if (rarity == 'Basic' && is_rarity) {
					return true;
				};
			};
		};
		
		return false;
	};
	
	tag.prototype.matchs = function (card,query){
		if (!this.matchColor(card,query.color,query.no_color)) {
			return false;
		};
		
		if (!this.matchType(card,query.type)) {
			return false;
		};
		
		if (card.sub_type && !this.matchSubType(card,query.sub_type)) {
			return false;
		};
		
		if (!this.matchRarity(card,query.rarity)) {
			return false;
		};
		
		if (query.text && !this.matchText(card,query.text)) {
			return false;
		};
		
		return true;
	};
	
	
	tag.prototype.build = async function (){
		var dict;
		for (let i = 0, items = ['./data/card_set_0.C0748A17E2C08252A9CCE75BB593E62D71DCDA77.json','./data/card_set_1.130CC34F7AC434B206D832879328A0D91D312873.json'], len = items.length; i < len; i++) {
			let res = await window.fetch(items[i]);
			let json = await res.json();
			this._sets.push(json.card_set);
		};
		
		for (let i = 0, items = iter$(this._sets), len = items.length, set; i < len; i++) {
			set = items[i];
			for (let j = 0, ary = iter$(set.card_list), len = ary.length, card; j < len; j++) {
				card = ary[j];
				this._cards.push(card);
				this._cardsIndex[card.card_id] = card;
			};
		};
		
		for (let _ in dict = this.cardsIndex()){
			let card;
			card = dict[_];for (let i = 0, items = iter$(card.references), len = items.length, refCard; i < len; i++) {
				refCard = items[i];
				refCard.ref = this._cardsIndex[refCard.card_id];
			};
		};
		
		return Imba.commit();
	};
	
	
	tag.prototype.render = function (){
		var $ = this.$, self = this;
		return self.$open(0).flag('vbox').setChildren([
			($[0] || _1('header',$,0,self).flag('query').setContent([
				_1('input',$,1,0).setPlaceholder('Search...'),
				
				_1('fieldset',$,2,0),
				
				_1('fieldset',$,4,0),
				
				_1('fieldset',$,6,0),
				
				_1('fieldset',$,11,0),
				
				_1('select',$,13,0).flag('language').on$(0,['change','changeLanguage'],self)
			],2)).end((
				$[1].bindData(self,'searchText',[]).end(),
				$[2].setContent(
					// <legend> 'Type'
					(function tagLoop($0) {
						var t0;
						for (let i = 0, items = ['Hero','Creep','Spell','Improvement','Item'], len = $0.taglen = items.length, type; i < len; i++) {
							type = items[i];
							(t0 = $0[i] || (t0=_1('div',$0,i)).flag('checkbox').flag('type').setContent([
								_1('input',t0.$,'A',t0).setType('checkbox'),
								_1('label',t0.$,'B',t0)
							],2)).setFlag(0,type).end((
								t0.$.A.bindData(self.query().type,type).end()
							,true));
						};return $0;
					})($[3] || _2($,3,$[2]))
				,4),
				$[4].setContent(
					// <legend> 'SubType'
					(function tagLoop($0) {
						var t0;
						for (let i = 0, items = ['Armor','Weapon','Accessory','Consumable'], len = $0.taglen = items.length, sub_type; i < len; i++) {
							sub_type = items[i];
							(t0 = $0[i] || (t0=_1('div',$0,i)).flag('checkbox').flag('type').setContent([
								_1('input',t0.$,'A',t0).setType('checkbox'),
								_1('label',t0.$,'B',t0)
							],2)).setFlag(0,sub_type).end((
								t0.$.A.bindData(self.query().sub_type,sub_type).end()
							,true));
						};return $0;
					})($[5] || _2($,5,$[4]))
				,4),
				$[6].setContent([
					// <legend> 'Color'
					(function tagLoop($0) {
						var t0;
						for (let i = 0, items = ['red','green','blue','black'], len = $0.taglen = items.length, color; i < len; i++) {
							color = items[i];
							(t0 = $0[i] || (t0=_1('div',$0,i)).flag('checkbox').flag('color').setContent([
								_1('input',t0.$,'A',t0).setType('checkbox'),
								_1('label',t0.$,'B',t0)
							],2)).setFlag(0,'is_' + color).end((
								t0.$.A.bindData(self.query().color,("is_" + color)).end()
							,true));
						};return $0;
					})($[7] || _2($,7,$[6])),
					$[8] || _1('div',$,8,6).flag('checkbox').flag('color').flag('none').setContent([
						_1('input',$,9,8).setType('checkbox'),
						_1('label',$,10,8)
					],2)
				],1).end((
					$[9].bindData(self.query(),'no_color').end()
				,true)),
				$[11].setContent(
					// <legend> 'Rarity'
					(function tagLoop($0) {
						var t0;
						for (let i = 0, items = ['Basic','Common','Uncommon','Rare'], len = $0.taglen = items.length, rarity; i < len; i++) {
							rarity = items[i];
							(t0 = $0[i] || (t0=_1('div',$0,i)).flag('checkbox').flag('rarity').setContent([
								_1('input',t0.$,'A',t0).setType('checkbox'),
								_1('label',t0.$,'B',t0)
							],2)).setFlag(0,rarity).end((
								t0.$.A.bindData(self.query().rarity,rarity).end()
							,true));
						};return $0;
					})($[12] || _2($,12,$[11]))
				,4),
				$[13].bindData(self,'language',[]).setContent((function tagLoop($0) {
					for (let i = 0, len = $0.taglen = languages.length, lang; i < len; i++) {
						lang = languages[i];
						($0[i] || _1('option',$0,i)).setValue(lang,1).setContent(lang,3).end();
					};return $0;
				})($[14] || _2($,14,$[13])),4).end()
			,true)),
			
			($[15] || _1('ul',$,15,self).flag('CardList')).setContent(
				(function tagLoop($0) {
					var $$ = $0.$iter();
					for (let i = 0, items = iter$(self._cards), len = items.length, card; i < len; i++) {
						card = items[i];
						if (!self.matchs(card,self.query())) { continue; };
						$$.push(($0[i] || _1(CardRow,$0,i)).setData(card).setLanguage(self._language).on$(0,['click',['viewCard',card]],self).end());
					};return $$;
				})($[16] || _3($,16,$[15]))
			,5),
			
			self.viewingCard() ? (
				($[17] || _1(CardView,$,17,self).on$(0,['click','self',['viewCard',null]],self)).bindData(self,'viewingCard',[]).setLanguage(self._language).end()
			) : void(0)
		],1).synced();
	};
});

Imba.mount((_1(App)).end());


/***/ }),

/***/ "./src/CardRow.imba":
/*!**************************!*\
  !*** ./src/CardRow.imba ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Imba = __webpack_require__(/*! imba */ "./node_modules/imba/imba.imba"), _1 = Imba.createElement;
var CardRow = Imba.defineTag('CardRow', 'li', function(tag){
	tag.prototype.language = function(v){ return this._language; }
	tag.prototype.setLanguage = function(v){ this._language = v; return this; };
	
	tag.prototype.setup = function (){
		var cardType;
		if (this.data().is_red) { this.dom().classList.add("colorRed") };
		if (this.data().is_green) { this.dom().classList.add("colorGreen") };
		if (this.data().is_blue) { this.dom().classList.add("colorBlue") };
		if (this.data().is_black) { this.dom().classList.add("colorBlack") };
		
		if (this.data().rarity) {
			this.dom().classList.add(("rarity" + (this.data().rarity)));
		};
		
		if (cardType = this.data().card_type && this.data().card_type.replace(' ','')) {
			this.dom().classList.add(("type" + cardType));
		};
		
		if (this.data().sub_type) {
			return this.dom().classList.add(("subType" + (this.data().sub_type)));
		};
	};
	
	
	tag.prototype.render = function (){
		var $ = this.$, cardIconUrl, mini_image_, cardCost, ingameImageUrl, ingame_image_;
		return this.$open(0).setChildren([
			(cardIconUrl = (mini_image_ = this.data().mini_image) && mini_image_.default) ? (
				($[0] || _1('div',$,0,this).flag('cardIcon')).setStyle(("background-image: url(" + cardIconUrl + ");")).end()
			) : (
				($[1] || _1('div',$,1,this).flag('cardIcon'))
			),
			
			($[2] || _1('div',$,2,this).flag('cardType')),
			
			(cardCost = this.data().mana_cost || this.data().gold_cost) ? (
				($[3] || _1('div',$,3,this).flag('cardCost')).setContent(cardCost,3)
			) : ((ingameImageUrl = (ingame_image_ = this.data().ingame_image) && ingame_image_.default) ? (
				($[4] || _1('div',$,4,this).flag('cardIngameImage')).setStyle(("background-image: url(" + ingameImageUrl + ");")).end()
			) : void(0)),
			
			($[5] || _1('div',$,5,this).flag('cardName')).setContent(this.data().card_name[this.language()],3),
			
			($[6] || _1('div',$,6,this).flag('cardStat').flag('Attack')).setContent(this.data().attack,3),
			($[7] || _1('div',$,7,this).flag('cardStat').flag('Armor')).setContent(this.data().armor,3),
			($[8] || _1('div',$,8,this).flag('cardStat').flag('HitPoints')).setContent(this.data().hit_points,3)
		],1).synced();
	};
})
exports.CardRow = CardRow;


/***/ }),

/***/ "./src/CardView.imba":
/*!***************************!*\
  !*** ./src/CardView.imba ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

function iter$(a){ return a ? (a.toArray ? a.toArray() : a) : []; };
var Imba = __webpack_require__(/*! imba */ "./node_modules/imba/imba.imba"), _4 = Imba.createTagList, _2 = Imba.createTagMap, _3 = Imba.createTagLoopResult, _1 = Imba.createElement;
var CardImage = Imba.defineTag('CardImage', function(tag){
	tag.prototype.language = function(v){ return this._language; }
	tag.prototype.setLanguage = function(v){ this._language = v; return this; };
	
	tag.prototype.abilityDesc = function (innerHTML){
		let elem = (_1('div').flag('abilityDesc'));
		elem.dom().innerHTML = innerHTML;
		return elem;
	};
	
	tag.prototype.render = function (){
		var $ = this.$, self = this, largeImageUrl;
		return self.$open(0).setChildren(
			(largeImageUrl = self.data().large_image[self._language] || self.data().large_image.default) ? Imba.static([
				($[0] || _1('div',$,0,self).flag('largeImage')).setStyle(("background-image: url(" + largeImageUrl + ");")).setContent(
					(function tagLoop($0,$1,$$) {
						var t0;
						for (let i = 0, items = iter$(self.data().references), len = items.length, refCard; i < len; i++) {
							refCard = items[i];
							switch (refCard.ref_type) {
								case 'active_ability': 
								case 'passive_ability': {
									$$.push(($0[i] || _1('div',$0,i).flag('ability')));
									$$.push((t0 = $1[i] || (t0=_1('label',$1,i)).flag('abilityText')).setContent([
										t0.$.A || _1('div',t0.$,'A',t0).flag('abilityName'),
										t0.$.B || _1('div',t0.$,'B',t0).flag('abilityType'),
										self.abilityDesc(refCard.ref.card_text[self.language()])
									],1).end((
										t0.$.A.setContent(refCard.ref.card_name[self.language()],3),
										t0.$.B.setContent(refCard.ref.card_type,3)
									,true)));
									break;
								}
							};
						};return $$;
					})($[1] || _2($,1,$[0]),$[2] || _2($,2,$[0]),_3())
				,5).end(),
				
				($[3] || _1('div',$,3,self).flag('illustrator')).setContent(self.data().illustrator,3)
			],2,1) : void(0)
		,3).synced();
	};
});


var CardView = Imba.defineTag('CardView', function(tag){
	tag.prototype.language = function(v){ return this._language; }
	tag.prototype.setLanguage = function(v){ this._language = v; return this; };
	tag.prototype.refImageCards = function(v){ return this._refImageCards; }
	tag.prototype.setRefImageCards = function(v){ this._refImageCards = v; return this; };
	
	tag.prototype.setupProps = function (){
		var cardType;
		if (this.data().is_red) { this.dom().classList.toggle("colorRed") };
		if (this.data().is_green) { this.dom().classList.toggle("colorGreen") };
		if (this.data().is_blue) { this.dom().classList.toggle("colorBlue") };
		if (this.data().is_black) { this.dom().classList.toggle("colorBlack") };
		
		if (this.data().rarity) {
			this.dom().classList.toggle(("rarity" + (this.data().rarity)));
		};
		
		if (cardType = this.data().card_type && this.data().card_type.replace(' ','')) {
			this.dom().classList.toggle(("type" + cardType));
		};
		
		if (this.data().sub_type) {
			this.dom().classList.toggle(("subType" + (this.data().sub_type)));
		};
		
		this._refImageCards = this.collectRefImages(this.data(),[],[]);
		return Imba.commit();
	};
	
	
	tag.prototype.collectRefImages = function (card,acc,refedAcc){
		if (refedAcc.indexOf(card) < 0) {
			refedAcc.push(card);
			if (card.large_image.default) {
				acc.push(card);
			};
			
			for (let i = 0, items = iter$(card.references), len = items.length, refCard; i < len; i++) {
				refCard = items[i];
				if (refedAcc.indexOf(refCard) < 0) {
					this.collectRefImages(refCard.ref,acc,refedAcc);
				};
			};
		};
		
		return acc;
	};
	
	tag.prototype.mount = function (){
		return this.setupProps();
	};
	
	tag.prototype.unmount = function (){
		return this.setupProps();
	};
	
	tag.prototype.render = function (){
		var $ = this.$, self = this;
		return self.$open(0).flag('modal-overlay').setId("cv").setChildren(
			$[0] || _1('div',$,0,self).flag('modal').setContent([
				_1('h2',$,1,0).flag('cardName'),
				
				_1('div',$,2,0).flag('cardText'),
				
				_1('div',$,3,0).flag('cardImages')
			],2)
		,2).synced((
			$[1].setContent(self.data().card_name[self._language],3),
			$[3].setContent(
				(function tagLoop($0) {
					for (let i = 0, items = iter$(self._refImageCards), len = $0.taglen = items.length; i < len; i++) {
						($0[i] || _1(CardImage,$0,i)).setData(items[i]).setLanguage(self._language).end();
					};return $0;
				})($[4] || _4($,4,$[3]))
			,4)
		,true));
	};
})
exports.CardView = CardView;


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2ltYmEvaW1iYS5pbWJhIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9pbWJhL3NyYy9pbWJhL2RvbS9ldmVudC1tYW5hZ2VyLmltYmEiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2ltYmEvc3JjL2ltYmEvZG9tL2V2ZW50LmltYmEiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2ltYmEvc3JjL2ltYmEvZG9tL2h0bWwuaW1iYSIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvaW1iYS9zcmMvaW1iYS9kb20vaW5kZXguaW1iYSIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvaW1iYS9zcmMvaW1iYS9kb20vbWFuYWdlci5pbWJhIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9pbWJhL3NyYy9pbWJhL2RvbS9wb2ludGVyLmltYmEiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2ltYmEvc3JjL2ltYmEvZG9tL3JlY29uY2lsZXIuaW1iYSIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvaW1iYS9zcmMvaW1iYS9kb20vdGFnLmltYmEiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2ltYmEvc3JjL2ltYmEvZG9tL3RvdWNoLmltYmEiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2ltYmEvc3JjL2ltYmEvaW1iYS5pbWJhIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9pbWJhL3NyYy9pbWJhL2luZGV4LmltYmEiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2ltYmEvc3JjL2ltYmEvc2NoZWR1bGVyLmltYmEiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9idWlsZGluL2dsb2JhbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQXBwLmltYmEiLCJ3ZWJwYWNrOi8vLy4vc3JjL0NhcmRSb3cuaW1iYSIsIndlYnBhY2s6Ly8vLi9zcmMvQ2FyZFZpZXcuaW1iYSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNsRkEsT0FBTyxRQUFRLEVBQUUsbUJBQU87Ozs7Ozs7Ozs7Ozs7SUNBcEIsS0FBSyxFQUFFLG1CQUFPLENBQUMsdURBQVM7OztJQUd4QixRQUFPOzs7Ozs7Ozs7Ozs7O0FBc0JMLEtBQUssZUFxRVYsU0FyRVU7Ozs7TUFzRVQsaUJBQWlCLEVBQUUsTUFBTSxHQUFHLE9BQU8sU0FBUyxHQUFHLEtBQUssVUFBVSxJQUFJO01BQ2xFLFFBQU87TUFDUDtNQUNBO01BQ0E7T0FDQyxTQUFTO1NBQ0Y7OztDQUVSLDhCQUFhO09BQ1osU0FBUzs7Ozs7O0FBL0VOLEtBQUs7QUFBTCxLQUFLO0FBQUwsS0FBSztBQUFMLEtBQUs7QUFBTCxLQUFLLCtDQUlZO0FBSmpCLEtBQUs7QUFBTCxLQUFLOzs7Ozs7QUFBTCxLQUFLLGtDQUlZO0FBSmpCLEtBQUs7QUFBTCxLQUFLO0FBQUwsS0FBSztBQUFMLEtBQUs7QUFBTCxLQUFLO0FBQUwsS0FBSzs7SUFTTixZQUFZOztBQUVoQixLQVhVO0NBWVQsT0FBTyxrQkFBVzs7OztBQUduQixLQWZVO0NBZ0JULElBQUcsS0FBSztTQUNQLEtBQUssT0FBTyxhQUFhO1FBQzFCLElBQUssWUFBWSxRQUFRLE1BQU0sSUFBSSxFQUFFLEdBQUksUUFBTyxRQUFRLE1BQU0sR0FBRztTQUNoRSxZQUFZLEtBQUs7Ozs7QUFFbkIsS0FyQlU7O0NBc0JVLElBQUcsS0FBSyxpQkFBcEIsS0FBSztDQUNaLEtBQUssT0FBTyxNQUFFLEtBQUssYUFBaUIsS0FBSztDQUNsQzs7Q0FFUCxLQUFLLFlBQUwsS0FBSyxjQUFZLEtBQUs7O0tBRWxCLGVBQWUsRUFBRSxPQUFPLEdBQUcsT0FBTyxhQUFhLElBQUk7O0NBRXZELElBQUc7RUFDRixLQUFLLE9BQU87VUFDWCxLQUFLLE1BQU0sYUFBYTs7O0VBRXpCLEtBQUssT0FBTztVQUNYLEtBQUssTUFBTSxZQUFZOzs7RUFFeEIsS0FBSyxPQUFPO1VBQ1gsS0FBSyxNQUFNLFdBQVc7OztFQUV2QixLQUFLLE9BQU87VUFDWCxLQUFLLE1BQU0sY0FBYzs7OztDQUUzQixLQUFLLE9BQU87O0VBRVgsS0FBSSxFQUFFLFVBQVUsRUFBRSxLQUFLLE1BQU0sZUFBZSxFQUFFLEtBQUssTUFBTTtHQUN4RCxFQUFFLGtCQUFrQixFQUFFO09BQ2xCLElBQUksTUFBRSxLQUFLLE1BQVU7R0FDekIsSUFBSTtHQUNKLElBQUk7R0FDSixJQUFHLElBQUksV0FBVyxHQUFJLElBQUk7V0FDbEIsRUFBRTs7OztTQUVYLEtBQUssT0FBTyxTQUFTOzs7Q0FFdEIsS0FBSyxPQUFPO0VBQ1gsS0FBSSxFQUFFLFVBQVUsRUFBRSxLQUFLLE1BQU0sZUFBZSxFQUFFLEtBQUssTUFBTTtHQUN6QixJQUFHLEtBQUssa0JBQXZDLEtBQUssUUFBUSxPQUFPLEdBQUc7Ozs7Q0FFekIsS0FBSyxPQUFPO0VBQ1gsS0FBSSxFQUFFLFVBQVUsRUFBRSxLQUFLLE1BQU0sZUFBZSxFQUFFLEtBQUssTUFBTTtHQUN6QixJQUFHLEtBQUssa0JBQXZDLEtBQUssUUFBUSxPQUFPLEdBQUc7Ozs7Q0FFekIsS0FBSyxPQUFPO0NBQ1osS0FBSyxPQUFPLFNBQVM7Q0FDckIsS0FBSyxPQUFPLFdBQVU7UUFDZixLQUFLOzs7Ozs7QUF5QmIsS0EzRlU7cUNBMkZtQjtDQUM1QixJQUFHLGdCQUFTO0VBQ1MsOEJBQVM7UUFBN0IsU0FBUyxTQUFFOzs7OztDQUdBLElBQUcsa0JBQVc7OztLQUd0QixHQUFHLEVBQUUsa0JBQVcsTUFBTSxHQUFFLG1CQUFZLFlBQVcsVUFBVTtDQUMxQixJQUFHLHlCQUF0QyxZQUFLLGlCQUFpQixLQUFLLEdBQUc7OztBQUUvQixLQXRHVTtDQXVHRyxJQUFHLFFBQU8sUUFBUSxNQUFNLElBQUk7YUFDeEMsU0FBUzs7O0FBRVYsS0ExR1U7cUNBMEcwQjtDQUNuQyxpQkFBVSxNQUFNLEtBQUssUUFBUTtDQUNlLElBQUcsa0JBQS9DLFlBQUssaUJBQWlCLEtBQUssUUFBUTs7OztBQUdwQyxLQS9HVTtLQWdITCxNQUFNLEVBQUUsS0FBSyxNQUFNLEtBQUs7Q0FDNUIsTUFBTTtDQUNOLFNBQUc7RUFDRixJQUFHLEVBQUUsS0FBSztHQUNULEtBQUssTUFBTSxLQUFLLEdBQUcsbUJBQW1CO1NBQ3ZDLElBQUssRUFBRSxLQUFLO0dBQ1gsS0FBSyxNQUFNLEtBQUssR0FBRyxvQkFBb0I7Ozs7Ozs7O0FBUTFDLEtBOUhVOztrREE4SHFCO3dEQUFjO0tBQ3hDLE1BQU0sRUFBRSxLQUFLLE1BQU0sWUFBVyxhQUFjO0NBQzlCLElBQUcsU0FBckIsTUFBTSxRQUFPO0NBQ1MsSUFBRyxXQUF6QixNQUFNLFVBQVM7UUFDZjs7Ozs7QUFPRCxLQXpJVTthQTBJVCw2QkFBbUI7OztBQUVwQixLQTVJVTtDQTZJVCxhQUF3QjttQ0FDdkIsWUFBSyxpQkFBaUIsS0FBSyxRQUFROzs7Q0FFcEMsOEJBQVk7O0VBQ1gsWUFBSyxpQkFBaUIsS0FBSyxHQUFHLEtBQUssR0FBRyxLQUFLOzs7Q0FFNUM7RUFDQyxPQUFPLDhCQUE4QixLQUFLO0VBQzFDLE9BQU8sNEJBQTRCLEtBQUs7Ozs7O0FBRzFDLEtBeEpVO0NBeUpULGFBQXdCO21DQUN2QixZQUFLLG9CQUFvQixLQUFLLFFBQVE7OztDQUV2Qyw4QkFBWTs7RUFDWCxZQUFLLG9CQUFvQixLQUFLLEdBQUcsS0FBSyxHQUFHLEtBQUs7OztDQUUvQztFQUNDLE9BQU8saUNBQWlDLEtBQUs7RUFDN0MsT0FBTywrQkFBK0IsS0FBSzs7Ozs7Ozs7Ozs7Ozs7Ozs7SUMxTDFDLEtBQUssRUFBRSxtQkFBTyxDQUFDLHVEQUFTOztJQUV4QixTQUFTO01BQ1A7TUFDQTtRQUNFO1FBQ0E7S0FDSDtPQUNFOzs7SUFHSCxHQUFHLEVBQUUsS0FBSyxJQUFJO0FBQ2xCO1FBQXlCLEVBQUUsT0FBSyxHQUFHOztBQUNuQztRQUE0QixFQUFFLFVBQVEsR0FBRzs7QUFDekM7UUFBNEIsRUFBRSxVQUFRLEdBQUc7O0FBQ3pDO1FBQTJCLEVBQUUsT0FBTyxNQUFLLEdBQUc7O0FBQzVDO1FBQXlCLEVBQUUsUUFBTSxRQUFRLEdBQUc7O0FBQzVDO1FBQXdCLEVBQUUsUUFBTSxPQUFPLEdBQUc7O0FBQzFDO1FBQTBCLEVBQUUsUUFBTSxTQUFTLEdBQUc7O0FBQzlDO1FBQXlCLEVBQUUsUUFBTSxRQUFRLEdBQUc7O0FBQzVDO1FBQTZCLEVBQUUsY0FBVyxFQUFFLFVBQVEsR0FBRyxRQUFPOztBQUM5RDtRQUF3QixFQUFFLGNBQVcsRUFBRSxVQUFRLEdBQUcsRUFBRSxHQUFHLEVBQUUsVUFBUSxHQUFHLE9BQU07O0FBQzFFO1FBQXlCLEVBQUUsUUFBTSxPQUFPLFFBQUc7O0FBQzNDO1NBQXlCLEVBQUUsU0FBTyxHQUFHLGVBQWEsRUFBRSxTQUFPLElBQUksTUFBSyxHQUFHLFlBQVksR0FBRzs7QUFDdEY7U0FBMEIsRUFBRSxTQUFPLEdBQUcsZUFBYSxFQUFFLFNBQU8sSUFBSSxNQUFLLEdBQUcsWUFBWSxHQUFHOztBQUN2RjtTQUEyQixFQUFFLFNBQU8sR0FBRyxlQUFhLEVBQUUsU0FBTyxJQUFJLE1BQUs7OztBQUV0RTtDQUNhLFNBQVE7Ozs7O0FBV2YsS0FBSyxRQWdCVixTQWhCVTtNQWlCVCxTQUFRO01BQ1IsUUFBUSxFQUFFOzs7OztBQWxCTixLQUFLO0FBQUwsS0FBSzs7QUFBTCxLQUFLO0FBQUwsS0FBSzs7QUFBTCxLQUFLO0FBQUwsS0FBSzs7QUFBTCxLQUFLO0FBQUwsS0FBSzs7QUFBTCxLQUFLO0FBQUwsS0FBSzs7QUFhVixLQWJVO2lCQWNBOzs7QUFNVixLQXBCVTtNQXFCVCxNQUFNLEVBQUU7Ozs7Ozs7QUFNVCxLQTNCVTthQTJCRSxNQUFNLEdBQUcsYUFBTTs7QUFDM0IsS0E1QlU7YUE0Qkk7OztBQUVkLEtBOUJVO2FBK0JULHVCQUFVLFlBQUssY0FBWTs7OztBQUc1QixLQWxDVTtDQW1DVCxJQUFHLEVBQUUsR0FBRztPQUNGLFVBQVM7OzthQUVSOzs7QUFFUixLQXhDVTtNQXlDVCxRQUFRLEVBQUU7Ozs7Ozs7QUFPWCxLQWhEVTtNQWlEVCxVQUFTOzs7O0FBR1YsS0FwRFU7UUFvRGE7O0FBQ3ZCLEtBckRVO1FBcURFOzs7O0FBR1osS0F4RFU7Q0F5RFQsSUFBRyxhQUFNO0VBQ1IsYUFBTTs7RUFFTixhQUFNLGlCQUFpQixFQUFFOztNQUNyQixpQkFBaUIsRUFBRTs7OztBQUd6QixLQWhFVTtDQWlFVCxRQUFRO1FBQ1I7Ozs7O0FBT0QsS0F6RVU7UUEwRVQsYUFBTSxHQUFJLGFBQU07Ozs7O0FBT2pCLEtBakZVO0NBa0ZULFFBQVE7UUFDUjs7O0FBRUQsS0FyRlU7TUFzRlQsVUFBVSxFQUFFOzs7O0FBR2IsS0F6RlU7Z0JBMEZQOzs7OztBQUtILEtBL0ZVOzBCQWdHTCxhQUFNLFFBQVEsR0FBRyxhQUFNOzs7OztBQUs1QixLQXJHVTthQXNHVDs7Ozs7QUFLRCxLQTNHVTtNQTRHVCxVQUFVLEVBQUU7Ozs7QUFHYixLQS9HVTtLQWdITCxFQUFFLEVBQUU7S0FDSixFQUFFLEVBQUUsU0FBUztLQUNiLE9BQU8sT0FBRTtLQUNULE1BQU0sRUFBRSxTQUFTLFVBQVQsU0FBUztLQUNqQjs7Q0FFSixJQUFHO09BQ0YsUUFBUSxFQUFFOzs7UUFFTCxFQUFFLEVBQUU7TUFDTCxNQUFNLEVBQUU7TUFDUixRQUFRLEVBQUUsU0FBUztNQUNuQixPQUFRLEVBQUU7TUFDVixRQUFRLEVBQUU7O0VBRWQsSUFBRyxtQkFBWTtHQUNkLE9BQU8sRUFBRSxRQUFRLE1BQU07R0FDdkIsUUFBUSxFQUFFLFFBQVE7OztFQUVuQixXQUFVLFFBQVE7R0FDakIsSUFBRyxTQUFTO0lBQ1gsT0FBTyxHQUFHLFNBQVM7SUFDbkIsUUFBUTs7O09BRUwsSUFBSSxFQUFFLFFBQVE7O0dBRWxCLElBQUcsS0FBSztJQUNQLE1BQU0sRUFBRTtJQUNSLE9BQU8sR0FBRyxPQUFPLE9BQU8sYUFBYTtJQUNyQyxRQUFRLEVBQUUsS0FBSzs7Ozs7O0VBSWpCLFdBQVUsUUFBUTtPQUNiLEdBQUcsRUFBRTtPQUNMLEdBQUcsRUFBRTtPQUNMLElBQUksRUFBRSxNQUFNOztHQUVoQixJQUFHO0lBQ0YsSUFBRyxJQUFJLHNCQUFlO0tBQ3JCLElBQUksRUFBRSxJQUFJLFdBQVc7OztJQUV0QixJQUFHLElBQUksb0JBQWE7S0FDbkIsUUFBUSxFQUFFLEdBQUcsRUFBRSxJQUFJO0tBQ25CLFFBQVEsRUFBRTs7OztHQUVaLE1BQU87SUFDTixRQUFRLGlCQUFhLHFDQUF3QiwwQkFBc0I7Ozs7Ozs7Ozs7Ozs7OztFQWFyRSxJQUFHLG1CQUFZOzs7T0FHVixJQUFJLEVBQUUsUUFBUSxNQUFNLFFBQVEsT0FBTzs7R0FFdkMsTUFBSTtTQUNILGlDQUFlOzs7R0FFaEIsSUFBRyxJQUFJLEdBQUc7Ozs7O0dBSVYsSUFBRyxJQUFJLFNBQUssVUFBVSxJQUFJLElBQUksZ0JBQVM7SUFDdEMsSUFBSSxLQUFLLEtBQUs7Ozs7OztDQUdqQixTQUFHLFFBQVEsSUFBSTtPQUNkLFFBQVEsRUFBRTs7O1FBRUo7OztBQUVSLEtBak1VO0tBa01MLEtBQUssT0FBTztLQUNaLEtBQUssZ0JBQU0sUUFBUSxTQUFPO0tBQzFCLEtBQUssRUFBRTtLQUNQLFVBQVUsRUFBRSxhQUFNLFFBQVEsR0FBRyxhQUFNO0tBQ25DLFFBQVEsRUFBRSxVQUFVLFdBQVcsR0FBRzs7S0FFbEM7S0FDQTs7UUFFRTtPQUNMLFVBQVUsRUFBRTtNQUNSLEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxRQUFROztFQUU1QyxJQUFHO0dBQ0YsSUFBRyxTQUFTLEVBQUUsS0FBSztJQUNsQiw4QkFBZTs7V0FBYztTQUN4QixNQUFNLEVBQUUsUUFBUTtLQUNwQixJQUFHLEtBQUssR0FBRyxRQUFRLEdBQUcsR0FBSTtXQUN6QixnQkFBZ0IsS0FBSzs7O0lBQ2pCLE1BQU87OztHQUVkLElBQUcsY0FBTyxJQUFJLEtBQUssaUJBQVU7U0FDNUIsaUNBQWU7U0FDZixVQUFVLEVBQUU7SUFDWixPQUFPLEVBQUUsT0FBTyxLQUFLLE1BQU0sTUFBTSxLQUFLLFFBQVEsS0FBSyxXQUFXOzs7R0FFL0QsSUFBRyxLQUFLO0lBQ1AsS0FBSzs7Ozs7RUFHUCxNQUFPLGNBQU8sSUFBSSxRQUFRLFFBQUcsVUFBVSxJQUFJLE9BQU8sS0FBSyxXQUFTLFFBQVE7Ozs7O0NBR3pFOzs7O0NBSUEsSUFBRyxPQUFPLElBQUksT0FBTyxnQkFBUztFQUM3QixPQUFPLFVBQVUsVUFBVTs7Ozs7O0FBSTdCLEtBNU9VO0NBNk9ULFVBQUksVUFBVSxRQUFJO0VBQ2pCLEtBQUssS0FBSztFQUNWLEtBQUssT0FBTzs7Ozs7OztBQU9kLEtBdFBVO1FBc1BELGNBQU87Ozs7O0FBTWhCLEtBNVBVO1FBNFBELGNBQU87OztBQUVoQixLQTlQVTtRQThQSSxjQUFPOztBQUNyQixLQS9QVTtRQStQSyxjQUFPOztBQUN0QixLQWhRVTtRQWdRRSxjQUFPOztBQUNuQixLQWpRVTtRQWlRQyxjQUFPOztBQUNsQixLQWxRVTtRQWtRRyxjQUFPOztBQUNwQixLQW5RVTtRQW1RRSxjQUFPOztBQUNuQixLQXBRVTtRQW9RQyxjQUFPOzs7OztBQVlsQixLQWhSVTtRQWdSRyxhQUFNOzs7Ozs7Ozs7Ozs7Ozs7SUN2VGhCLEtBQUssRUFBRSxtQkFBTyxDQUFDLHVEQUFTOztBQUU1QjtDQUNDO1NBQ0MsS0FBSyxXQUFTOzs7O0FBRVQ7Q0FDTjtTQUNDOzs7O0FBRUs7Q0FDTjs7U0FDQyxXQUFJLFdBQVc7Ozs7QUFRaEIsU0FOSztNQU9KLE1BQU0sRUFBRTtNQUNSLE1BQU0sRUFBRTtNQUNSLE1BQU0sRUFBRTtDQUN1QixTQUFHLGNBQWxDLFFBQVEsRUFBRSxLQUFLLGNBQVM7OztBQVR6QjtLQUNLLE1BQU0sRUFBRSxTQUFTLFVBQVQsU0FBUyxpQkFBbUIsU0FBUyxLQUFLO0NBQ3RELE1BQU0sS0FBSyxLQUFLLEtBQUs7UUFDZDs7O0FBUVI7Q0FDQyxJQUFHLEtBQUssUUFBRztPQUNWLE1BQU0sRUFBRTs7Ozs7QUFHVjthQUNDLGVBQVUsV0FBTSxnQkFBVyxXQUFNOzs7QUFFbEM7YUFDQyxlQUFVLFdBQU0sU0FBUyxnQkFBVSxXQUFNLE9BQU8sRUFBRTs7OztJQUdoRCxRQUFRO1FBQ1gsSUFBSSxHQUFJLElBQUksT0FBTyxHQUFJLElBQUk7OztJQUV4QixlQUFlO0tBQ2QsRUFBRSxFQUFFLEVBQUUsT0FBUSxFQUFFLEVBQUU7Q0FDWixJQUFPLEVBQUUsR0FBRyxFQUFFLGlCQUFqQjtRQUNELElBQUksRUFBRTtFQUNELElBQUcsRUFBRSxHQUFHLEdBQUcsRUFBRSxhQUFoQjs7UUFDRDs7O0FBRUQ7Ozs7OztDQUlOO0VBQ0MsVUFBVSxVQUFVLE9BQU8sS0FBSzs7OztDQUdqQztjQUNDLEtBQUs7OztDQUVOO0VBQ0MsUUFBSyxRQUFNLFFBQUcsS0FBSztRQUNsQixLQUFLLFFBQVEsTUFBSTs7Ozs7Q0FHbkI7RUFDQyxTQUFHLFlBQVksR0FBRyxVQUFVLEdBQUcsT0FBTyxHQUFHO0dBQ3hDLFdBQUksTUFBTSxPQUFFLE9BQU8sRUFBRTtRQUNyQixZQUFZLEVBQUU7Ozs7O0NBR2hCO0VBQ0MsV0FBSSxLQUFLLE9BQUUsTUFBTSxFQUFFOzs7O0NBR3BCO01BQ0ssSUFBSSxPQUFFLEtBQUs7ZUFDZixRQUFRLEdBQUksT0FBTSxXQUFXLE9BQU87OztDQUVyQztNQUNLLElBQUksT0FBRSxLQUFLO09BQ2YsWUFBWSxFQUFFO0VBQ2QsU0FBRyxNQUFNLEtBQUssYUFBSyxHQUFJLFlBQUssV0FBVyxHQUFJLFlBQUs7UUFDL0MsTUFBTSxhQUFhOzs7OztDQUdyQjtPQUNDLFlBQVksT0FBRSxZQUFZLEVBQUU7RUFDckIsTUFBTzs7RUFFZCxJQUFHLFlBQUssV0FBVyxHQUFHLFlBQUs7T0FDdEIsUUFBUSxPQUFPO09BQ2YsS0FBSyxPQUFFLE1BQU07T0FDYixLQUFLLFFBQUUsT0FBTyxHQUFHLGtCQUFZLFNBQVM7O0dBRTFDLElBQUcsWUFBSztnQkFDUCxNQUFNLGFBQWE7VUFDcEIsSUFBSyxXQUFJLE1BQU0sUUFBUSxHQUFHLFdBQUksTUFBTSxHQUFHO2dCQUN0QyxNQUFNLGlCQUFlO1VBQ3RCLElBQUssUUFBUTtRQUNSLElBQUksRUFBRSxLQUFLLFFBQVE7SUFDdkIsSUFBRyxRQUFRLEdBQUksSUFBSSxJQUFJO1lBQ3RCLEtBQUssS0FBSztXQUNYLE1BQU0sU0FBUSxHQUFJLElBQUksR0FBRztZQUN4QixLQUFLLE9BQU8sSUFBSTs7O2dCQUVqQixNQUFNLGFBQWE7OztlQUVwQixNQUFNLGFBQWE7Ozs7Q0FFckI7Y0FDQyxZQUFZLEVBQUU7Ozs7Q0FHZjtFQUNDLFNBQUcsWUFBWSxJQUFJLFVBQVUsU0FBSTs7OztNQUc3QixLQUFLLE9BQUUsTUFBTTtFQUNMLElBQUcsS0FBSyxRQUFHO0VBQ0osS0FBTyxRQUFRLGNBQWxDLFlBQVksRUFBRTs7RUFFZCxJQUFHLFlBQUssV0FBVyxHQUFHLFlBQUs7T0FDdEIsS0FBSyxPQUFFO09BQ1AsUUFBUSxFQUFLLFFBQVE7SUFDeEIsS0FBSyxRQUFRLE1BQU0sR0FBRztTQUNsQixXQUFJLE1BQU0sUUFBUSxHQUFHLFdBQUksTUFBTSxHQUFHO1FBQ3BDOztJQUVGLEtBQUssUUFBRzs7O1FBRUosV0FBVTs7UUFFZixLQUFLLE1BQU0sRUFBRTs7Ozs7O0FBR1Q7Ozs7Q0FHTjtFQUNDLFVBQVUsVUFBVSxPQUFPLEtBQUs7Ozs7Q0FHakM7RUFDQyxTQUFHLFlBQVksR0FBRyxVQUFVLEdBQUcsT0FBTyxHQUFHO0dBQ3hDLFdBQUksTUFBTSxFQUFFO1FBQ1osWUFBWSxFQUFFOzs7OztDQUdoQjtNQUNLLElBQUksT0FBRSxLQUFLO09BQ2YsWUFBWSxFQUFFO0VBQ2lCLFNBQUcsTUFBTSxLQUFLLDRCQUE3QyxNQUFNLGFBQWE7OztDQUVwQjtPQUNDLFlBQVksRUFBRTtFQUNpQixTQUFHLHFCQUFsQyxNQUFNLGFBQWE7OztDQUVwQjtjQUNDLFlBQVksRUFBRTs7O0NBRWY7RUFDUSxTQUFHLFlBQVksR0FBRyxVQUFVLFNBQUk7RUFDdkMsU0FBRztPQUNFLEtBQUssT0FBRSxNQUFNO1FBQ2pCLEtBQUssTUFBTSxHQUFFLEtBQUssR0FBRyxhQUFZOzs7Ozs7QUFHN0I7Q0FDTjtFQUNDLElBQUcsTUFBTSxRQUFHO0dBQ1gsV0FBSSxNQUFNLE9BQUUsT0FBTyxFQUFFOzs7OztDQUd2QjtjQUNDLE9BQU8sR0FBRyxXQUFJOzs7O0FBRVQ7Q0FDTjtFQUNDLFVBQVUsVUFBVSxPQUFPLEtBQUs7Ozs7Q0FHakM7TUFDSyxLQUFLLE9BQUU7T0FDWCxPQUFPLEVBQUU7RUFDUSxNQUFPLGlCQUF4QixVQUFVOzs7O0NBR1g7TUFDSyxLQUFLLE9BQUU7O0VBRVgsSUFBRyxnQkFBUyxJQUFJLGlCQUFVO0dBQ3pCLEtBQUcsZ0JBQVMsT0FBTSxHQUFJLGVBQWUsS0FBSzs7OztHQUcxQyxNQUFNLEVBQUUsTUFBTTs7O09BRWYsV0FBVyxFQUFFOztFQUViLFdBQVUsTUFBTTtPQUNYLEtBQUssRUFBRSxnQkFBUyxJQUFJLGlCQUFVOztHQUVsQyw4QkFBYSxXQUFJOztRQUNaLEtBQUssR0FBRyxJQUFJLE9BQU8sSUFBSSxLQUFLLFVBQVEsSUFBSTtJQUM1QyxJQUFHO0tBQ0YsSUFBSSxTQUFTLEVBQUUsTUFBTSxRQUFRLE1BQU0sR0FBRztXQUN2QyxJQUFLLE1BQU0sR0FBRztLQUNiLFdBQUksY0FBYyxFQUFFOzs7OztHQUd0QixXQUFJLE1BQU0sRUFBRTs7Ozs7Q0FHZDtFQUNDLElBQUc7O0dBQ0YsOEJBQWMsV0FBSTs7YUFDakIsT0FBTyxPQUFPLE9BQU8sS0FBSyxVQUFRLE9BQU87Ozs7T0FFdEMsSUFBSSxFQUFFLFdBQUksZ0JBQWdCO1VBQzlCLFFBQU8sSUFBSSxPQUFPLElBQUksS0FBSyxVQUFRLElBQUksVUFBUzs7OztDQUVsRDtFQUNnQyxTQUFHLHFCQUFsQyxNQUFNLGFBQWE7OztDQUVwQjtFQUNDLFNBQUc7UUFDRixjQUFTLE1BQU0sbUJBQW1COzs7RUFFbkMsU0FBRyxPQUFPLFFBQUc7UUFDWixlQUFVOzs7Ozs7Ozs7Ozs7Ozs7O0lDcE9ULEtBQUssRUFBRSxtQkFBTyxDQUFDLHVEQUFTOzs7OztBQUs1QixLQUFLLFdBQVcsTUFBRSxLQUFLOzs7Ozs7OztBQVF2Qjs7OztBQUdBOzs7Ozs7Ozs7Ozs7O0lDaEJJLEtBQUssRUFBRSxtQkFBTyxDQUFDLHVEQUFTOztBQUV0QixLQUFLLGtCQUNWLFNBRFU7TUFFVCxTQUFTLEVBQUU7TUFDWCxTQUFTLEVBQUU7TUFDWCxTQUFTO01BQ1QsWUFBWSxFQUFFO01BQ2QsY0FBYyxFQUFFO01BQ2hCLFlBQVksRUFBRTs7OztBQUdmLEtBVlU7YUFXVDs7O0FBRUQsS0FiVTtNQWNUO0NBQ21CLElBQUcsS0FBSyxHQUFJLEtBQUssY0FBcEMsYUFBYTs7Ozs7OztBQU1kLEtBckJVO2FBc0JUOzs7O0FBR0QsS0F6QlU7YUEwQlQsU0FBUyxPQUFFOzs7QUFFWixLQTVCVTs7OztBQStCVixLQS9CVTtpQ0ErQlU7Q0FDWjtDQUNBLE1BQUksT0FBTSxHQUFJLGVBQVEsR0FBRzs7Q0FFaEMsVUFBSSxTQUFTLFFBQUksWUFBWSxPQUFFLFNBQVMsUUFBUSxHQUFHO0VBQ2xEOzs7Q0FFRCxVQUFJLFNBQVMsR0FBRyxPQUFPLFFBQUksU0FBUztFQUNuQzs7O01BRUQsU0FBUyxFQUFFO01BQ1gsU0FBUyxFQUFFOzs7O0FBR1osS0E3Q1U7Ozs7QUFnRFYsS0FoRFU7Q0FpRFQsTUFBTyxLQUFLLE1BQU0sRUFBRSxLQUFLO0VBQ3hCLEtBQUssTUFBTSxHQUFHLEtBQUs7Y0FDbkI7Ozs7O0FBR0YsS0F0RFU7S0F1REwsTUFBTSxFQUFFO0tBQ1IsS0FBSyxFQUFFLFNBQVM7S0FDaEIsTUFBTSxFQUFFLEtBQUs7O0NBRWpCLDRCQUFVOztFQUNULElBQUcsR0FBRyxHQUFJLEdBQUc7R0FDWixTQUFHLFNBQVMsUUFBUSxHQUFHLE1BQU0sSUFBSTtTQUNoQyxVQUFVLEdBQUc7Ozs7Ozs7QUFHakIsS0FqRVU7Q0FrRVQsU0FBRyxTQUFTLFFBQVEsTUFBTSxJQUFJO09BQzdCLGFBQWE7T0FDYixTQUFTLEtBQUs7O0VBRWQsS0FBSyxNQUFNLEdBQUcsS0FBSztFQUNSLElBQUcsS0FBSyxTQUFuQixLQUFLOzs7Ozs7Ozs7O0FBUVAsS0EvRVU7TUFnRlQ7O0tBRUksUUFBUTtLQUNSLEtBQUssRUFBRSxTQUFTO0NBQ3BCLG1DQUFlOztFQUNMLE1BQU87RUFDaEIsS0FBTyxTQUFTLGdCQUFnQixTQUFTLEtBQUs7R0FDN0MsUUFBUSxLQUFLO1FBQ2IsU0FBUyxHQUFHLEVBQUU7Ozs7TUFFaEI7O0NBRUEsSUFBRyxRQUFRO09BQ1YsU0FBUyxPQUFFLFNBQVMsK0JBQWlCLEtBQUssR0FBSSxRQUFRLFFBQVEsTUFBTSxJQUFJO0VBQ3hFLHNCQUFZO1VBQUE7R0FDWCxLQUFLLE1BQU0sRUFBRSxLQUFLLE1BQU0sRUFBRSxDQUFDLEtBQUs7R0FDaEMsSUFBRyxLQUFLLFFBQVEsR0FBSSxLQUFLO0lBQ3hCLEtBQUs7VUFDTixJQUFLLEtBQUs7SUFDVCxLQUFLOzs7Ozs7Ozs7Ozs7Ozs7OztJQ3JHTixLQUFLLEVBQUUsbUJBQU8sQ0FBQyx1REFBUzs7QUFFdEIsS0FBSyxVQUVWLFNBRlU7TUFHVCxRQUFRLEdBQUc7TUFDWCxPQUFPLE1BQU0sS0FBTTs7OztBQUdwQixLQVBVO2FBUVQ7OztBQUVELEtBVlU7YUFXVDs7O0FBRUQsS0FiVTtNQWNULE9BQU8sRUFBRTtNQUNULE9BQU8sRUFBRTs7Ozs7QUFJVixLQW5CVTtLQW9CTCxHQUFHLE9BQUU7O0NBRVQsU0FBRztPQUNGLFdBQVcsRUFBRTtPQUNiLE9BQU8sRUFBRTs7O0VBR1QsSUFBRyxHQUFHLEtBQUs7UUFDVixRQUFRLEVBQUUsR0FBRzs7R0FFYixVQUFJLE9BQU8sUUFBSSxRQUFRLEdBQUc7Ozs7O0dBSVosU0FBRyxlQUFqQixPQUFPO1FBQ1AsT0FBTyxNQUFFLEtBQUssTUFBVTtRQUN4QixPQUFPLFVBQVUsR0FBRztTQUVyQixJQUFLLEdBQUcsS0FBSztHQUNZLFNBQUcsZUFBM0IsT0FBTyxVQUFVLEdBQUc7U0FFckIsSUFBSyxHQUFHLEtBQUs7UUFDWixRQUFRLEdBQUc7O0dBRVgsU0FBRyxPQUFPLFFBQUksT0FBTyxTQUFPLEdBQUcsR0FBRztTQUNqQyxPQUFPLFFBQVEsR0FBRztTQUNsQixPQUFPLEVBQUU7Ozs7UUFFWixTQUFLO09BQ0osT0FBTzs7Ozs7QUFHVCxLQXBEVTthQW9ERCxPQUFPOztBQUNoQixLQXJEVTthQXFERCxPQUFPOzs7Ozs7Ozs7Ozs7Ozs7OztJQ3JEYixLQUFLLEVBQUUsbUJBQU8sQ0FBQyx1REFBUzs7SUFFeEIsYUFBYTs7OztDQUloQixJQUFHLGdCQUFTO0VBQ3FCLDhCQUFjO0dBQTlDLGFBQWEsS0FBSyxTQUFPOztRQUMxQixJQUFLLEtBQUssR0FBSSxLQUFLO0VBQ2xCLEtBQUssWUFBWTtRQUNsQixJQUFLLEtBQUssR0FBRzs7O01BR1IsS0FBSyxFQUFFLFFBQVEsTUFBTSxjQUFjLEtBQUssS0FBSztFQUNqRCxLQUFHLGdCQUFTLE1BQUssR0FBSSxLQUFLLFlBQVksR0FBRztHQUN4QyxLQUFLLFlBQVk7Ozs7OztRQUlaOzs7SUFFSixhQUFhO0NBQ2hCLElBQUcsZ0JBQVM7TUFDUCxFQUFFLEVBQUU7TUFDSixFQUFFLEVBQUUsS0FBSztNQUNULEVBQUUsR0FBRSxFQUFFLEdBQUcsVUFBUSxLQUFLLE9BQU8sRUFBRSxNQUFLLEtBQUs7U0FDVixFQUFFLEVBQUU7R0FBdkMsYUFBYSxLQUFLLEtBQUs7O1FBQ3hCLElBQUssS0FBSyxHQUFJLEtBQUs7RUFDbEIsS0FBSyxZQUFZO1FBQ2xCLElBQUssS0FBSyxHQUFHLEtBQUssR0FBSSxLQUFLLElBQUk7RUFDOUIsS0FBSyxZQUFZLEtBQUssZUFBZTs7Ozs7Ozs7Ozs7SUFTbkMsbUJBQW1CO0NBQ3RCLElBQUcsZ0JBQVM7TUFDUCxFQUFFLEVBQUU7TUFDSixFQUFFLEVBQUUsS0FBSztNQUNULEVBQUUsR0FBRSxFQUFFLEdBQUcsVUFBUSxLQUFLLE9BQU8sRUFBRSxNQUFLLEtBQUs7U0FDRyxFQUFFLEVBQUU7R0FBcEQsbUJBQW1CLEtBQUssS0FBSyxLQUFLOztRQUVuQyxJQUFLLEtBQUssR0FBSSxLQUFLO0VBQ2xCLEtBQUssYUFBYSxLQUFLO1FBQ3hCLElBQUssS0FBSyxHQUFHLEtBQUssR0FBSSxLQUFLLElBQUk7RUFDOUIsS0FBSyxhQUFhLEtBQUssZUFBZSxNQUFNOzs7UUFFdEM7Ozs7QUFHUjtLQUNLLE9BQU8sRUFBRSxRQUFRLE1BQU0sY0FBYyxLQUFLLEtBQUs7O0NBRW5ELElBQUc7RUFDRixtQkFBbUIsS0FBSyxLQUFLO1NBQ3RCLE9BQU87O0VBRWQsYUFBYSxLQUFLO1NBQ1gsS0FBSyxLQUFLOzs7O0lBRWYsMkJBQTJCOztLQUUxQixPQUFPLEVBQUUsS0FBSTtLQUNiLFFBQVEsRUFBRSxLQUFJLE9BQU8sRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0tBa0J2QixZQUFZOzs7S0FHWixVQUFVOztLQUVWLFlBQVk7OztLQUdaLGVBQWUsRUFBRTtLQUNqQixZQUFZLEVBQUU7O0tBRWQsYUFBYSxFQUFFO0tBQ2Y7O0NBRUosZ0NBQWlCOzs7RUFFaEIsSUFBRyxLQUFLLEdBQUksS0FBSyxTQUFTLEdBQUc7R0FDNUIsT0FBTyxFQUFFLEtBQUksUUFBUSxLQUFLO0dBQ1AsSUFBRyxPQUFPLEdBQUcsS0FBaEMsS0FBSSxRQUFRLEVBQUU7R0FDZCxhQUFhLEVBQUU7O0dBRWYsT0FBTyxFQUFFLEtBQUksUUFBUTs7O0VBRXRCLFlBQVksS0FBSzs7RUFFakIsSUFBRyxPQUFPLElBQUk7R0FDYixLQUFLLFlBQVk7R0FDakIsVUFBVSxNQUFNO0dBQ2hCLFlBQVksTUFBTTs7OztNQUdmLFFBQVEsRUFBRSxZQUFZLE9BQU8sRUFBRTs7O1NBRzdCLFFBQVEsR0FBRztHQUNoQixJQUFHLFlBQVksU0FBUyxJQUFJO0lBQzNCO1VBQ0QsSUFBSyxPQUFPLEVBQUUsWUFBWTs7Ozs7SUFLekIsUUFBUSxFQUFFLFVBQVU7Ozs7RUFFdEIsVUFBVSxLQUFLOztNQUVYLFdBQVcsR0FBRyxRQUFRLElBQUksS0FBSyxLQUFJLFlBQVksU0FBUSxFQUFDOztFQUU1RCxJQUFHLFdBQVcsRUFBRTtHQUNmLGVBQWUsRUFBRTtHQUNqQixZQUFZLEVBQUU7OztFQUVmLFlBQVksS0FBSzs7O0tBRWQsWUFBWTs7OztLQUlaLE9BQU8sRUFBRSxZQUFZLE9BQU8sRUFBRTtRQUM1QixPQUFPLEdBQUc7RUFDZixJQUFHLE9BQU8sR0FBRyxZQUFZLEdBQUksWUFBWSxRQUFRLElBQUk7R0FDcEQsWUFBWSxZQUFZLFNBQVMsRUFBRTtHQUNuQyxZQUFZLEVBQUUsVUFBVTs7O0VBRXpCLE9BQU8sR0FBRzs7OztDQUdYLGdDQUFpQjs7RUFDaEIsS0FBSSxZQUFZOztHQUVmLE1BQU8sS0FBSyxHQUFJLEtBQUs7SUFDcEIsS0FBSyxFQUFFLEtBQUksS0FBSyxFQUFFLEtBQUssZUFBZTs7O09BRW5DLE1BQU0sRUFBRSxLQUFJLElBQUksRUFBRTtRQUN0QixrQkFBa0IsS0FBTSxNQUFPLE1BQU0sR0FBSSxNQUFNLE9BQU8sR0FBRyxNQUFNLEdBQUc7OztFQUVuRSxNQUFNLEVBQUUsS0FBSyxPQUFPLElBQUksTUFBTSxHQUFJLE1BQU0sWUFBWSxHQUFHLEtBQUssS0FBSzs7OztRQUczRCxRQUFRLEdBQUksUUFBUSxPQUFPLEdBQUc7Ozs7O0lBSWxDLG9CQUFvQjtLQUNuQixFQUFFLEVBQUUsS0FBSTtLQUNSLEVBQUUsRUFBRTtLQUNKLEtBQUssRUFBRSxLQUFJLEVBQUUsRUFBRTs7O0NBR25CLElBQUcsRUFBRSxHQUFHLElBQUksT0FBTyxHQUFJLEtBQUksR0FBRyxJQUFJLElBQUk7O1NBRS9CO0dBQ0MsSUFBRyxLQUFJLEdBQUcsSUFBSSxJQUFJOzs7O0NBRTFCLElBQUcsRUFBRSxJQUFJO1NBQ0QsS0FBSyxHQUFJLEtBQUssT0FBTyxHQUFHLEtBQUssR0FBRzs7U0FFaEMsMkJBQTJCLEtBQUssS0FBSSxJQUFJOzs7Ozs7SUFJN0MsY0FBYztLQUNiLEdBQUcsRUFBRSxLQUFJO0tBQ1QsR0FBRyxFQUFFLElBQUk7S0FDVCxHQUFHLEVBQUUsS0FBSSxNQUFNO0tBQ2YsRUFBRSxFQUFFLEVBQUcsRUFBRSxFQUFFLEdBQUcsRUFBRTs7Ozs7UUFLVixFQUFFLEVBQUUsR0FBRyxHQUFJLEVBQUUsRUFBRSxHQUFHLEdBQUksS0FBSSxHQUFHLElBQUksSUFBSTtFQUEvQzs7OztDQUdBLElBQUcsR0FBRyxFQUFFLEtBQUssSUFBSyxHQUFHLEVBQUUsSUFBSSxFQUFFO0VBQzVCLEtBQUksTUFBTSxPQUFPOzs7Q0FFbEIsSUFBRyxFQUFFLEVBQUUsRUFBRSxHQUFJLEVBQUUsR0FBRzs7U0FFZ0IsRUFBRSxFQUFFO0dBQXJDLEtBQUssWUFBWSxLQUFJOzs7UUFHdEIsSUFBSyxFQUFFLEVBQUU7TUFDSixHQUFHLEVBQUU7U0FDRSxHQUFHLEVBQUUsRUFBRSxHQUFJLEtBQUksR0FBRyxFQUFFLEdBQUcsSUFBSSxJQUFJLEdBQUcsRUFBRSxFQUFFLEVBQUU7R0FBbkQ7OztFQUVBLElBQUcsRUFBRSxJQUFJLEdBQUcsRUFBRTtPQUNULE9BQU8sRUFBRSxJQUFJLEdBQUc7VUFDcUIsRUFBRSxFQUFFO0lBQTdDLEtBQUssYUFBYSxLQUFJLEtBQUs7Ozs7UUFHN0IsSUFBSyxFQUFFLEVBQUUsRUFBRSxHQUFJLEVBQUUsR0FBRzs7U0FFYyxFQUFFLEVBQUU7R0FBckMsS0FBSyxZQUFZLElBQUk7OztRQUV0QixJQUFLLEVBQUUsRUFBRTtNQUNKLEdBQUcsRUFBRTtTQUNFLEdBQUcsRUFBRSxFQUFFLEdBQUksS0FBSSxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUcsSUFBSSxJQUFJLEdBQUcsRUFBRTtHQUFuRDs7O0VBRUEsSUFBRyxFQUFFLElBQUksRUFBRSxFQUFFO1VBQ3FCLEVBQUUsRUFBRTtJQUFyQyxLQUFLLFlBQVksSUFBSTs7OztRQUd2QixJQUFLLEVBQUUsR0FBRzs7OztRQUdILDJCQUEyQixLQUFLLEtBQUksSUFBSTs7OztJQUc1QyxzQkFBc0I7S0FDckIsT0FBTyxFQUFFLE1BQU07S0FDZixRQUFRLEVBQUUsTUFBTSxPQUFPLEdBQUc7S0FDMUIsS0FBSyxFQUFFLFNBQVMsTUFBTSxPQUFPLEVBQUUsS0FBSzs7O0NBR3hDLElBQUcsUUFBUSxFQUFFO1NBQ04sUUFBUSxFQUFFO09BQ1gsS0FBSyxFQUFFLFFBQVE7R0FDbkIsS0FBSyxZQUFZLEtBQUs7O1FBRXhCLElBQUssT0FBTyxFQUFFOztNQUVULFNBQVMsRUFBRSxVQUFVLE1BQU0sUUFBUSxFQUFFLEdBQUcsU0FBUztNQUNqRCxPQUFPLEVBQUUsV0FBVyxTQUFTLGNBQWMsS0FBSyxLQUFLOztTQUVuRCxRQUFRLEVBQUU7T0FDWCxLQUFLLEVBQUUsTUFBTTtHQUNqQixTQUFTLEtBQUssYUFBYSxLQUFLLE9BQU8sVUFBVSxLQUFLLFlBQVksS0FBSzs7OztDQUV6RSxNQUFNLE9BQU8sRUFBRTtRQUNSLE9BQU8sS0FBSyxTQUFTOzs7Ozs7SUFLekIsZ0JBQWdCOzs7S0FHZixVQUFVLEVBQUUsS0FBSSxHQUFHLEtBQUssR0FBRyxLQUFJLElBQUk7S0FDbkMsVUFBVSxFQUFFLElBQUksR0FBRyxLQUFLLEdBQUcsSUFBSSxJQUFJOzs7Q0FHdkMsSUFBRyxLQUFJLElBQUk7OztFQUdWLElBQUc7VUFDSztTQUNSLElBQUssS0FBSTtVQUNELEtBQUk7U0FDWixLQUFLLGdCQUFRLE9BQU0sR0FBSSxLQUFJLE9BQU8sR0FBRztVQUM3QixzQkFBc0IsS0FBSyxLQUFJLElBQUk7O1VBRW5DLFFBQVEsTUFBTSxjQUFjLEtBQUssS0FBSzs7UUFFL0MsSUFBSyxnQkFBUTtFQUNaLElBQUcsZUFBUTs7T0FFTixJQUFJLEVBQUUsS0FBSTtHQUNkLElBQUcsSUFBSSxHQUFHLElBQUk7OztJQUdiLElBQUcsSUFBSSxHQUFHLElBQUk7S0FDYiw4QkFBYzs7TUFFYixNQUFNLEVBQUUsZ0JBQWdCLEtBQUssU0FBSyxJQUFJLEdBQUc7O1lBQ25DOztLQUVQLGFBQWEsS0FBSyxJQUFJOzs7Ozs7V0FLaEIsb0JBQW9CLEtBQUssS0FBSSxJQUFJOztTQUMxQyxNQUFNO0dBQ0wsSUFBRyxJQUFJO0lBQ04sS0FBSyxZQUFZOzs7SUFHakIsS0FBSyxZQUFZLFFBQVEsTUFBTSxjQUFjLEtBQUssS0FBSzs7OztjQUVsRCxrQkFBa0IsS0FBSyxLQUFJOztRQUduQyxNQUFNLFdBQVUsR0FBSSxLQUFJO0VBQ00sTUFBTyxjQUFwQyxhQUFhLEtBQUssSUFBSTtjQUNmLGtCQUFrQixLQUFLLEtBQUk7UUFFbkMsSUFBSztFQUN5QixNQUFPLGNBQXBDLGFBQWEsS0FBSyxJQUFJO1NBQ2Y7OztNQUdIOztFQUVKLElBQUcsZUFBUTtHQUNWLGFBQWEsS0FBSyxJQUFJO1NBQ3ZCLElBQUssSUFBSSxHQUFJLElBQUk7R0FDaEIsS0FBSyxZQUFZO1NBQ2xCLE1BQU07O0dBRUwsU0FBUyxFQUFFLFFBQVEsTUFBTSxjQUFjLEtBQUssS0FBSztHQUNqRCxLQUFHLG9CQUFhLE1BQUssR0FBSSxTQUFTLFlBQVksR0FBRztJQUNoRCxTQUFTLFlBQVksRUFBRTtXQUNoQjs7Ozs7Y0FHRixrQkFBa0IsS0FBSyxLQUFJOzs7OztBQUc3Qjs7Ozs7Ozs7O0NBU047OztNQUdLLElBQUksT0FBRTs7RUFFVixJQUFHLEtBQUksSUFBSSxJQUFJLE1BQU0sTUFBSSxHQUFHLEtBQUksT0FBTyxHQUFHOzs7O0VBRzFDLE1BQUksS0FBSSxHQUFJLElBQUksR0FBRztHQUNsQjtHQUNBLGtCQUFrQjtTQUVuQixJQUFLLElBQUksR0FBRztPQUNQLE1BQU0sRUFBRTtHQUNaLDhCQUFjO0lBQ2IsTUFBTSxFQUFFLHFCQUFxQixTQUFLLElBQUksR0FBRzs7U0FFM0MsSUFBSyxJQUFJLEdBQUc7O1NBR1osSUFBSyxJQUFJLEdBQUc7T0FDUCxLQUFLLFNBQVM7O0dBRWxCLElBQUcsS0FBSztnQkFDQSxRQUFROzs7R0FFaEIsSUFBRyxLQUFJLEdBQUksS0FBSTtJQUNkO1NBQ0EsWUFBWTtVQUdiLElBQUssZ0JBQVE7SUFDWixJQUFHLEtBQUksTUFBTSxHQUFHLEVBQUUsR0FBSSxJQUFJLEdBQUksSUFBSSxNQUFNLEdBQUc7S0FDMUMsbUJBQW1CLEtBQUksSUFBSTtXQUM1QixJQUFLLGVBQVE7S0FDWixxQkFBcUIsS0FBSSxJQUFJOztLQUU3QjtLQUNBLGtCQUFrQjs7O2dCQUVaLFFBQVE7O1NBRWpCLElBQUssSUFBSSxHQUFHO0dBQ1gsMkJBQTJCLEtBQUksSUFBSTtTQUVwQyxJQUFLLElBQUksR0FBRztHQUNYLG1CQUFtQixLQUFJLElBQUk7U0FFNUIsS0FBSyxnQkFBUSxPQUFNLElBQUksZUFBUTtHQUM5QixxQkFBcUIsS0FBSSxJQUFJOzs7R0FHN0I7R0FDQSxrQkFBa0I7OztPQUVuQixPQUFPLEVBQUU7Ozs7Q0FHVjtjQUNDLFNBQVMsR0FBRyxnQkFBUzs7O0NBRXRCO0VBQ0MsSUFBRyxLQUFLLFFBQUc7T0FDTixJQUFJLEdBQUUsS0FBSyxJQUFJLEtBQUssR0FBRyxLQUFLLElBQUksY0FBYTtTQUNoRCxPQUFPLFFBQUcsTUFBTSxZQUFZLEVBQUU7UUFDL0IsOEJBQVcsS0FBSztRQUNoQixPQUFPLEVBQUU7Ozs7Ozs7SUFJUixNQUFNLEVBQUUsS0FBSyxJQUFJO0FBQ3JCLE1BQU0sV0FBVyxFQUFFLE1BQU07OztJQUdyQixNQUFNLFNBQVMsVUFBVSxlQUFlLElBQUssVUFBVSxPQUFPLE9BQU8saUJBQWlCLEdBQUc7QUFDN0YsSUFBRztDQUNGO0VBQ0MsSUFBRyxLQUFLLFFBQUc7UUFDVixLQUFLLFlBQVksSUFBRyxLQUFLLElBQUksS0FBSyxHQUFHLEtBQUssSUFBSSxjQUFhO1FBQzNELE9BQU8sRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7SUN2YVIsS0FBSyxFQUFFLG1CQUFPLENBQUMsdURBQVM7O0FBRTVCLEtBQUssVUFBVTs7QUFFZixLQUFLLFVBQVUsRUFBRTtBQUNqQixLQUFLLFVBQVUsRUFBRTtBQUNqQixLQUFLLGFBQWEsRUFBRTtBQUNwQixLQUFLLFlBQVksRUFBRTtBQUNuQixLQUFLLGNBQWMsRUFBRTtBQUNyQixLQUFLLGFBQWEsRUFBRTtBQUNwQixLQUFLLGNBQWMsRUFBRTs7OztBQUtyQjtRQUNDLE9BQU87Ozs7O0FBS1I7MEJBQ0ssS0FBSyxXQUFTOzs7QUFFbkI7Q0FDQyxNQUFNLE1BQU0sRUFBRTtDQUNkLE1BQU0sT0FBTyxFQUFFO1FBQ1I7Ozs7O0FBS1I7Q0FDQyxnQkFBUyxLQUFLLFdBQVM7Q0FDdkIsS0FBSyxZQUFZLEtBQUs7Q0FDdEIsS0FBSyxXQUFXLE9BQU8sS0FBSztDQUM1QixLQUFLLFlBQVUsbUJBQWtCLE9BQUssU0FBUztDQUMvQyxLQUFLLFdBQVc7UUFDVDs7OztBQUdSO0NBQ0MsSUFBRyxLQUFLLEdBQUksS0FBSyxTQUFTLEdBQUc7U0FDckI7O1FBQ0QsS0FBSyxXQUFTLGVBQWU7Ozs7Ozs7QUFRL0IsS0FBSyxNQThEVixTQTlEVTtNQStESixPQUFNO01BQ04sRUFBRSxFQUFFLFNBQVM7TUFDYixJQUFJLE9BQUUsUUFBUSxFQUFFO01BQ3JCLE9BQU8sRUFBRTtNQUNKLE1BQU0sRUFBRTtDQUNiOzs7O0FBbEVELEtBRlU7S0FHTCxJQUFJLEVBQUUsS0FBSyxXQUFTLG1CQUFjLFVBQVU7Q0FDaEQsU0FBRztNQUNFLElBQUksT0FBRSxTQUFTO0VBQ0MsSUFBRyxPQUF2QixJQUFJLFVBQVUsRUFBRTs7UUFDakI7OztBQUVELEtBVFU7S0FVTCxNQUFNLFFBQUcsK0JBQWM7UUFDM0IsTUFBTSxVQUFVOzs7QUFFakIsS0FiVTtzQkFjSyxhQUFXOzs7QUFFMUIsS0FoQlU7YUFpQlQsK0JBQWM7OztBQUVmLEtBbkJVO2FBb0JULE9BQU87Ozs7O0FBS1IsS0F6QlU7Q0EwQlQsTUFBTSxVQUFVLEVBQUU7O0NBRWxCLFNBQUc7RUFDRixNQUFNLFVBQVUsT0FBRTtFQUNsQixNQUFNLFNBQVMsT0FBRSxTQUFTOztFQUUxQixJQUFHLE1BQU07VUFDUixNQUFNLFNBQVMsS0FBSyxNQUFNOzs7RUFFM0IsTUFBTSxVQUFVLEVBQUUsTUFBTTtFQUN4QixNQUFNLFVBQVUsRUFBRTtTQUNsQixNQUFNLFNBQVM7Ozs7OztBQVFqQixLQTdDVTtDQThDRjtLQUNILEtBQUssT0FBTztLQUNaLEtBQUssRUFBRSxPQUFPOztDQUVsQixJQUFHLEtBQUssaUJBQWlCLEdBQUc7RUFDM0IsSUFBRyxLQUFLLFNBQVMsR0FBSSxLQUFLLFNBQVMsbUJBQW9CLElBQUk7R0FDMUQsS0FBSyxTQUFTOzs7RUFFZixJQUFHLEtBQUs7R0FDUCxLQUFLLFVBQVUsVUFBVTs7OztDQUUzQiw4QkFBVzs7RUFDMkIsWUFBVyxLQUFLLFFBQXJELEtBQUssYUFBYSxLQUFLLElBQUksTUFBTTs7Ozs7O1VBMUQ5QixLQUFLO1VBQUwsS0FBSztVQUFMLEtBQUs7QUFBTCxLQUFLO0FBQUwsS0FBSzs7QUE0RVYsS0E1RVU7YUE2RVQ7OztBQUVELEtBL0VVO0NBZ0ZULElBQUksS0FBSztNQUNULEtBQUssT0FBRSxPQUFPLEVBQUU7Ozs7QUFHakIsS0FwRlU7YUFxRlQ7OztBQUVELEtBdkZVO2FBd0ZULGVBQVUsUUFBUTs7Ozs7QUFVbkIsS0FsR1U7TUFtR1QsVUFBSyxLQUFLLEVBQUU7Ozs7OztBQU9iLEtBMUdVO01BMkdULE1BQU0sRUFBRTs7Ozs7O0FBS1QsS0FoSFU7YUFpSFQ7Ozs7QUFHRCxLQXBIVTthQXFIVCxRQUFRLE9BQU8sT0FBTyxNQUFNLE1BQU0sT0FBTyxRQUFRLE9BQU87Ozs7O0FBS3pELEtBMUhVO0NBMkhULFNBQVEsT0FBSyxHQUFHO09BQ2YsS0FBSyxVQUFVLEVBQUU7Ozs7Ozs7QUFLbkIsS0FqSVU7YUFrSVQsS0FBSzs7O0FBRU4sS0FwSVU7S0FxSUwsU0FBUyxPQUFFO0tBQ1gsS0FBSyxFQUFFLFNBQVM7O0NBRXBCLElBQUcsS0FBSyxFQUFFO0VBQ1QsSUFBRyxLQUFLLEdBQUc7R0FDVixLQUFLLEVBQUUsU0FBUyxNQUFNLEVBQUUsU0FBUzs7R0FFakMsS0FBSyxFQUFFOztFQUNSLEtBQUssRUFBRSxTQUFTOzs7Q0FFakIsU0FBUyxNQUFNLEVBQUU7Q0FDakIsSUFBRztFQUNGLFFBQVEsTUFBTSxFQUFFLEtBQUs7O0VBRXJCLFFBQVEsTUFBTSxZQUFZO0VBQ1MsWUFBbkMsS0FBSyxhQUFhLEtBQUssUUFBUTs7Ozs7O0FBSWpDLEtBeEpVO0NBeUpULElBQUcsR0FBRyxHQUFHO0VBQ1IsV0FBSSxHQUFHLEVBQUU7Ozs7O0FBRVgsS0E1SlU7UUE2SlQsV0FBSTs7Ozs7QUFRTCxLQXJLVTtLQXNLTCxJQUFJLEVBQUUsV0FBSSxhQUFhOztDQUUzQixJQUFHLElBQUksR0FBRztFQUNUO1FBQ0QsSUFBSyxNQUFNLEdBQUcsS0FBSyxHQUFHLE1BQU0sSUFBSTtFQUMvQixXQUFJLGFBQWEsS0FBSzs7RUFFdEIsV0FBSSxnQkFBZ0I7Ozs7O0FBR3RCLEtBaExVO0NBaUxULFNBQVEsR0FBRTtPQUNKLEdBQUUsa0JBQWlCLEtBQUssTUFBTzs7T0FFcEMsZUFBZSxHQUFJLEtBQUs7Ozs7O0FBRzFCLEtBdkxVO0tBd0xMLElBQUksT0FBRSxlQUFlLEdBQUc7O0NBRTVCLElBQUcsSUFBSSxHQUFHO0VBQ1QsSUFBRyxNQUFNLEdBQUcsS0FBSyxHQUFHLE1BQU0sSUFBSTtHQUM3QixXQUFJLGVBQWUsR0FBRyxLQUFLOztHQUUzQixXQUFJLGtCQUFrQixHQUFHOzs7Ozs7Ozs7QUFPNUIsS0FyTVU7UUFzTVQsV0FBSSxnQkFBZ0I7Ozs7O0FBT3JCLEtBN01VO1FBOE1ULFdBQUksYUFBYTs7OztBQUdsQixLQWpOVTtRQWtOVCxXQUFJLGVBQWUsR0FBRzs7OztBQUd2QixLQXJOVTtLQXNOTCxPQUFPLEVBQUUsS0FBSyxTQUFTO0NBQzNCLFNBQVEsbUJBQVk7T0FDZCxRQUFRLE1BQU07O09BRW5CLEtBQUssYUFBYSxJQUFJOzs7Ozs7QUFJeEIsS0E5TlU7YUErTlQsS0FBSyxhQUFhOzs7OztBQU1uQixLQXJPVTtNQXNPVCxZQUFZLFFBQVM7Ozs7OztBQVF0QixLQTlPVTs7TUFnUFQsT0FBTyxFQUFFOzs7Ozs7QUFPVixLQXZQVTtDQXdQVCxVQUFPO0VBQ04sU0FBUSxPQUFPLEdBQUcsS0FBSyxJQUFJLFVBQVU7UUFDL0IsT0FBTyxPQUFPOzs7O01BRWhCLFNBQVMsT0FBRSxVQUFVLEVBQUU7Ozs7QUFHN0IsS0EvUFU7UUFnUVQ7Ozs7O0FBT0QsS0F2UVU7S0F3UUwsS0FBSyxFQUFFO0NBQ08sSUFBRyxLQUFLLGdCQUExQixZQUFZOzs7Ozs7O0FBUWIsS0FqUlU7S0FrUkwsSUFBSSxFQUFFO0tBQ04sR0FBRyxFQUFFLE1BQU0sT0FBTyxHQUFHO0NBQ3pCLElBQUcsR0FBRyxHQUFJLEdBQUcsV0FBVyxHQUFHO0VBQzFCLEtBQUssV0FBVyxPQUFPLEdBQUcsS0FBSyxHQUFHO0VBQ2xDLElBQUksWUFBWTs7Ozs7OztBQU1sQixLQTVSVTtDQTZSVCxTQUFHLEtBQUs7TUFDSDtTQUNFLEdBQUcsT0FBRSxLQUFLO1NBQ1QsR0FBSSxLQUFLLFdBQVcsT0FBTyxHQUFHLEtBQUssR0FBRztRQUM1QyxLQUFLLFlBQVk7OztNQUNuQixPQUFPLE9BQUUsT0FBTyxFQUFFOzs7Ozs7QUFTbkIsS0EzU1U7Q0E0U1QsWUFBRztFQUNGLFdBQUksWUFBWSxLQUFLLFdBQVMsZUFBZTtRQUM5QyxJQUFLO0VBQ0osV0FBSSxZQUFZLEtBQUssT0FBTyxHQUFHO0VBQy9CLEtBQUssV0FBVyxPQUFPLEtBQUssS0FBSyxHQUFHOzs7Ozs7OztBQVF0QyxLQXhUVTtDQXlUVCxZQUFHO0VBQ0YsS0FBSyxFQUFFLEtBQUssV0FBUyxlQUFlOzs7Q0FFckMsSUFBRyxLQUFLLEdBQUk7RUFDWCxXQUFJLGNBQWUsS0FBSyxPQUFPLEdBQUcsT0FBUSxJQUFJLE9BQU8sR0FBRztFQUN4RCxLQUFLLFdBQVcsT0FBTyxLQUFLLEtBQUssR0FBRzs7Ozs7O0FBSXRDLEtBbFVVO0NBbVVULFNBQUcsT0FBTyxRQUFHO09BQ1osT0FBTyxRQUFHLEtBQUssdUJBQUwsS0FBSyxnQkFBa0IsS0FBSyxXQUFTO09BQy9DLE9BQU8sY0FBUCxPQUFPOztFQUVQLFNBQUcsS0FBSztHQUNQLEtBQUssV0FBVyxpQkFBWSxLQUFLO1FBQ2pDLEtBQUssV0FBVyxrQkFBYSxZQUFPOzs7Ozs7QUFHdkMsS0E1VVU7Q0E2VVQsU0FBRyxPQUFPLFFBQUc7TUFDUixLQUFLLE9BQUU7T0FDWCxPQUFPLE9BQUU7RUFDVCxJQUFHLEtBQUssR0FBSSxLQUFLO0dBQ2hCLEtBQUssV0FBVztHQUNoQixLQUFLLFdBQVcsa0JBQWEsS0FBSzs7Ozs7Ozs7O0FBUXJDLEtBMVZVOztDQTJWYSxJQUFPLElBQUksRUFBRSxpQkFBbkMsSUFBSTs7Ozs7O0FBUUwsS0FuV1U7YUFvV1QsS0FBSzs7Ozs7QUFNTixLQTFXVTtNQTJXVCxPQUFPLEVBQUU7TUFDVCxLQUFLLFlBQVksR0FBRyxJQUFJLEdBQUcsS0FBSyxHQUFHLFlBQUssSUFBSSxjQUFjOzs7Ozs7OztBQWtCM0QsS0E5WFU7Q0ErWFQsSUFBRyxlQUFRO0VBQ0c7K0JBQWIsUUFBUSxFQUFFOzs7OztDQUdYLGNBQWEsT0FBTyxHQUFHO09BQ3RCLHdCQUFvQixLQUFNOzs7O0NBRzNCLElBQUc7Y0FDSyx3QkFBb0I7OztLQUV4QixRQUFRLEVBQUUsV0FBSTs7Q0FFbEIsTUFBTztFQUNOLFFBQVE7RUFDUiw4QkFBYSxXQUFJOztHQUNoQixJQUFHLElBQUksS0FBSyxPQUFPLEVBQUUsR0FBRztJQUN2QixRQUFRLEtBQUssWUFBWSxJQUFJLEtBQUssTUFBTSxLQUFLLEVBQUUsSUFBSTs7Ozs7UUFFL0M7Ozs7O0FBT1IsS0F6WlU7Ozs7OztBQWlhVixLQWphVTs7Ozs7O0FBMGFWLEtBMWFVOzs7Ozs7QUFrYlYsS0FsYlU7Q0FtYkYsSUFBRyxvQkFBYSxJQUFJLE9BQTNCOzs7O0FBR0QsS0F0YlU7Ozs7OztBQWdjVixLQWhjVTtDQWljRixJQUFHLG9CQUFhLElBQUksT0FBM0I7Ozs7OztBQWNELEtBL2NVO0NBZ2RUO01BQ0EsT0FBTztNQUNGLElBQUksRUFBRSxLQUFLLElBQUk7Ozs7O0FBSXJCLEtBdGRVO0NBdWRULElBQUcsUUFBUSxRQUFHO09BQ2IsT0FBTyxFQUFFO09BQ1QsVUFBVSxFQUFFOzs7Ozs7O0FBUWQsS0FqZVU7Ozs7Ozs7QUF1ZVYsS0F2ZVU7Ozs7OztBQTZlVixLQTdlVTthQThlVCxLQUFLOzs7OztBQVFOLEtBdGZVOzs7Q0F5ZlQsY0FBYSxPQUFPLEdBQUc7RUFDdEIsU0FBRyxLQUFLLFVBQVUsU0FBUyxNQUFNLE9BQUs7UUFDckMsS0FBSyxVQUFVLE9BQU87Ozs7RUFHRSxVQUFPLEtBQUssVUFBVSxTQUFTLGNBQXhELEtBQUssVUFBVSxJQUFJOzs7Ozs7O0FBT3JCLEtBcmdCVTtNQXNnQlQsS0FBSyxVQUFVLE9BQU87Ozs7OztBQU92QixLQTdnQlU7TUE4Z0JULEtBQUssVUFBVSxPQUFPOzs7Ozs7QUFPdkIsS0FyaEJVO2FBc2hCVCxLQUFLLFVBQVUsU0FBUzs7OztBQUd6QixLQXpoQlU7S0EwaEJMLEVBQUUsT0FBRTtLQUNKLEtBQUssRUFBRSxFQUFFOztDQUViLElBQUcsS0FBSyxLQUFLO09BQ1osS0FBSyxVQUFVLElBQUk7RUFDbkIsRUFBRSxNQUFNLEVBQUU7UUFDWCxJQUFLLEtBQUssS0FBSztPQUNkLEtBQUssVUFBVSxPQUFPO0VBQ3RCLEVBQUUsTUFBTSxFQUFFOzs7Ozs7OztBQWNaLEtBaGpCVTtLQWlqQkwsTUFBTSxPQUFFO0tBQ1IsS0FBSyxFQUFFLE1BQU07Q0FDakIsSUFBRyxLQUFLLEdBQUc7RUFDRyxJQUFHLGFBQWhCLE9BQU87RUFDSyxJQUFHLGNBQWYsS0FBSztFQUNMLE1BQU0sTUFBTSxFQUFFOzs7Ozs7OztBQVVoQixLQWhrQlU7Y0Fpa0JULDZDQUFjLEtBQUssd0JBQW5COzs7OztBQVVELEtBM2tCVTs4Q0Eya0JzQjtDQUMvQixpQkFBVSxVQUFVLFNBQVM7Ozs7OztBQU85QixLQW5sQlU7Q0FvbEJZLFNBQUcsY0FBeEIsaUJBQVU7Ozs7Ozs7QUFRWCxLQTVsQlU7UUE2bEJULEtBQUssYUFBYSxXQUFJOzs7OztBQU12QixLQW5tQlU7O0NBb21CVCxtQ0FBWSxLQUFLOztXQUNoQixLQUFLLEtBQUssR0FBRyxLQUFLLGFBQWE7Ozs7O0FBRWpDLEtBdm1CVTtRQXdtQlQsS0FBSyxrQkFBYSxLQUFLLGNBQWM7OztBQUV0QyxLQTFtQlU7S0EybUJMLE1BQU07Q0FDVixpQ0FBWSxLQUFLLGlCQUFpQjtFQUNqQyxNQUFNLEtBQU0sS0FBSyxhQUFhOztRQUN4Qjs7Ozs7QUFNUixLQXBuQlU7O0NBcW5CVCxJQUFHLGVBQVE7U0FDSDs7O0NBRVEsSUFBRyxJQUFJLGlCQUFVLFlBQWpDLElBQUksRUFBRSxJQUFJO0NBQ1YsSUFBTyxHQUFHLFFBQUcsS0FBSyxRQUFRLFFBQUcsS0FBSyxnQkFBZ0IsUUFBRyxLQUFLLHNCQUFzQixRQUFHLEtBQUssa0JBQWtCLFFBQUcsS0FBSztTQUMxRyxHQUFHLFVBQUssS0FBSzs7Ozs7O0FBT3RCLEtBam9CVTtRQWtvQlQsS0FBSyxrQkFBYSxLQUFLLFFBQVE7Ozs7O0FBTWhDLEtBeG9CVTtRQXlvQlQsV0FBSSxTQUFTLEtBQUssS0FBSyxHQUFHOzs7Ozs7QUFPM0IsS0FocEJVOzs7O0NBaXBCVCxLQUFLLFFBQVE7Q0FDYixTQUFTLFVBQVUsS0FBSyxNQUFNLFFBQVEsSUFBSzs7OztBQUc1QyxLQXJwQlU7Q0FzcEJULElBQUcsZUFBUTtFQUNEOytCQUFULElBQUksRUFBRTs7Ozs7S0FHSCxLQUFLLEVBQUUsS0FBSyxVQUFVLEtBQUssR0FBRzs7Q0FFbEMsSUFBRyxJQUFJLEdBQUc7RUFDVCxXQUFJLE1BQU0sZUFBZTtRQUMxQixJQUFLLElBQUksR0FBRyxVQUFVLGFBQWMsT0FBTyxHQUFHO1NBQ3RDLFdBQUksTUFBTTtRQUNsQixJQUFLLEtBQUs7RUFDVCxXQUFJLE1BQU0sWUFBWSxLQUFLOztFQUUzQixZQUFHLHNDQUFlLElBQUssS0FBSyw0Q0FBNEMsSUFBSSxJQUFJLEdBQUksSUFBSTtHQUN2RixXQUFJLE1BQU0sTUFBTSxFQUFFLElBQUk7O0dBRXRCLFdBQUksTUFBTSxNQUFNLEVBQUU7Ozs7OztBQUdyQixLQXpxQlU7YUEwcUJULHFCQUFxQjs7O0FBRXRCLEtBNXFCVTthQTZxQlQ7Ozs7O0FBUUQsS0FyckJVOztpQkFzckJELEtBQUssT0FBTyxRQUFRLGlCQUFnQjs7Ozs7QUFNN0MsS0E1ckJVO0NBNnJCVCxXQUFJOzs7Ozs7QUFPTCxLQXBzQlU7Q0Fxc0JULFdBQUk7Ozs7QUFHTCxLQXhzQlU7UUF5c0JULFdBQUk7Ozs7QUFHTixLQUFLLElBQUksVUFBVSxXQUFXLEVBQUUsS0FBSzs7QUFFL0IsS0FBSyxTQUFYLFNBQVcsaUJBQVMsS0FBSzs7Y0FBbkIsS0FBSyxPQUFTLEtBQUs7QUFFeEIsS0FGVTs7OztBQUtWLEtBTFU7S0FNTCxJQUFJLEVBQUUsS0FBSyxXQUFTLGdCQUFnQix5QkFBYTtDQUNyRCxTQUFHO01BQ0UsSUFBSSxPQUFFLFNBQVM7RUFDUyxJQUFHLE9BQS9CLElBQUksVUFBVSxRQUFRLEVBQUU7O1FBQ3pCOzs7QUFFRCxLQVpVO0NBYVQsTUFBTSxVQUFVLEVBQUU7O0NBRWxCLFNBQVEsR0FBRyxLQUFLO0VBQ2YsTUFBTSxVQUFVLEVBQUUsTUFBTTtTQUN4QixNQUFNLFNBQVM7O0VBRWYsTUFBTSxVQUFVLE9BQUU7TUFDZCxVQUFVLE1BQU0sRUFBRSxNQUFNLE1BQU07U0FDbEMsTUFBTSxTQUFTLFFBQUcsU0FBUyxPQUFPLE9BQU87Ozs7QUFFNUMsS0FBSyxVQUFVLHdrQkFBd2tCO0FBQ3ZsQixLQUFLLGlCQUFpQixpQ0FBaUM7O0FBRXZELEtBQUssV0FBVzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBdUJoQixLQUFLLFdBQVc7Ozs7Ozs7Ozs7Ozs7O0lBYVosU0FBUztDQUNaOzBCQUNDLElBQUksZUFBSixJQUFJLEtBQU0sS0FBVixJQUFJOzs7Q0FFTCxJQUFJLFVBQVUsRUFBRSxPQUFPLE9BQU8sSUFBSTtDQUNsQyxJQUFJLFVBQVUsRUFBRSxJQUFJLFVBQVUsVUFBVSxFQUFFLElBQUk7Q0FDOUMsSUFBSSxVQUFVLFlBQVksRUFBRTtDQUNYLElBQUcsSUFBSSxXQUF4QixJQUFJLFFBQVE7UUFDTDs7OztBQUdKOztPQUVHLFdBQVcsSUFBSTs7Ozs7QUFHaEIsS0FBSyxPQUVWLFNBRlU7Ozs7QUFLVixLQUxVO0tBTUwsTUFBTSxFQUFFLE9BQU87Q0FDbkIsTUFBTSxRQUFRO1FBQ1A7OztBQUVSLEtBVlU7aUJBV0EsRUFBRSxLQUFLLGVBQWEsUUFBRyxnQkFBZ0I7OztBQUVqRCxLQWJVO0tBY0wsTUFBTSxFQUFFLE9BQU87Q0FDbkIsTUFBTSxRQUFRO0NBQ2QsTUFBTSxJQUFJLEVBQUU7VUFDSCxFQUFFLEtBQUssZUFBYSxFQUFFO1FBQ3hCOzs7QUFFUixLQXBCVTtzQkFxQlQsS0FBUSxLQUFLOzs7QUFFZCxLQXZCVTs7O0NBd0JULElBQUcsS0FBSyxHQUFJLEtBQUs7RUFDaEIsS0FBSyxFQUFFO0VBQ1AsS0FBSyxFQUFFOzs7Q0FFUixTQUFRO0VBQ1AsUUFBUSwwQkFBMEI7Ozs7S0FHL0I7S0FDQSxLQUFLLEVBQUU7S0FDUCxNQUFNLEVBQUUsS0FBSztDQUNqQixJQUFJLE1BQU0sR0FBRztFQUNaLEdBQUcsRUFBRSxTQUFTLE9BQU8sRUFBRTtFQUN2QixLQUFLLEVBQUUsU0FBUyxPQUFPLE1BQU0sRUFBRTtFQUMvQixJQUFHLEdBQUcsU0FBUyxLQUFLO0dBQ25CLEtBQUs7Ozs7Q0FFUCxxQkFBUyxTQUFTOztLQUVkLFVBQVUsV0FBRSxnREFBa0IsWUFBWSxRQUFRO0tBQ2xELFFBQVEsRUFBRTs7Q0FFZCxRQUFRLE1BQU0sRUFBRTtDQUNoQixRQUFRLFVBQVUsRUFBRTs7Q0FFcEIsSUFBRyxLQUFLLEdBQUc7RUFDVixLQUFLLFdBQVcsS0FBSyxNQUFNLElBQUksRUFBRTtPQUM1QixNQUFNLEVBQUU7UUFDZCxJQUFLLEtBQUssR0FBRyxHQUFHLEtBQUssR0FBRztFQUN2QixRQUFRLFVBQVUsRUFBRTs7RUFFcEIsUUFBUSxVQUFVLE1BQU0sRUFBRSxTQUFTO09BQzlCLFVBQVUsRUFBRTs7O0NBRWxCLFNBQVMsUUFBUTs7Q0FFakIsSUFBRztFQUNGLEtBQUssS0FBSyxRQUFRLFFBQVMsUUFBUSxLQUFLO0VBQ3hCLElBQUcsUUFBUSxXQUEzQixRQUFRO09BQ1IsWUFBWTs7UUFDTjs7O0FBRVIsS0FsRVU7YUFtRVQsVUFBVSxLQUFLLEtBQUs7OztBQUVyQixLQXJFVTs7O0tBc0VMLE1BQU0sWUFBRyxnREFBa0IsWUFBWSxRQUFROztDQUVILElBQUcsUUFBbkQsS0FBSyxHQUFJLEtBQUssS0FBSyxNQUFNLE1BQU0sTUFBTTtDQUN0QixJQUFHLE1BQU0sWUFBeEIsTUFBTTtNQUNOLFlBQVk7UUFDTDs7O0FBRVIsS0E3RVU7O3NCQThFVCxRQUFRLHlCQUFXOzs7QUFFcEIsS0FoRlU7O0tBaUZMLE1BQU0sT0FBTztDQUNqQixNQUFPO0VBQ04sSUFBRyxLQUFLLE9BQU8sRUFBRSxHQUFHO0dBQ25CLE1BQU0sT0FBRSxVQUFVO1NBRW5CLElBQUssS0FBSyxVQUFVLFFBQVEsTUFBTSxHQUFHO0dBQ3BDLE1BQU0sT0FBRSxVQUFVOztHQUVsQixJQUFPLE1BQU0sRUFBRSxLQUFLLFdBQVc7SUFDOUIsOEJBQVksTUFBTTtLQUNqQixLQUFLLEtBQUssTUFBTTs7OztHQUVsQixJQUFPLE1BQU0sRUFBRSxLQUFLLFdBQVc7SUFDOUIsOEJBQVksTUFBTTtLQUNqQixLQUFLLEtBQUssTUFBTSxlQUFVOzs7OztRQUN2Qjs7O0FBRVQ7S0FDSyxLQUFLLEVBQUU7S0FDUDtDQUNKLElBQUcsZ0JBQVM7RUFDWCxLQUFLLEVBQUU7O0VBRVA7RUFFQSxLQUFLLEVBQUUsS0FBSyxLQUFLLFlBQVk7OztDQUU5QixJQUFHLGVBQVE7RUFDVixPQUFPLEVBQUUsSUFBSTtRQUNkLElBQUssZ0JBQVMsS0FBSztFQUNsQixPQUFPLEVBQUU7O0VBRVQsT0FBTyxHQUFFLElBQUksR0FBSSxLQUFLLEdBQUcsYUFBWSxJQUFJLFVBQVMsSUFBSSxHQUFJLElBQUksS0FBSyxHQUFHOzs7S0FFbkUsS0FBSyxFQUFFLEtBQUssTUFBTTs7Q0FFdEIsSUFBRyxlQUFRO0VBQ1YsSUFBSTtFQUNKLEtBQUssS0FBSyxFQUFFOzs7Q0FFYixJQUFHLElBQUksR0FBSSxJQUFJLEdBQUc7RUFDakIsSUFBSSxLQUFLLEVBQUU7OztRQUVMOzs7QUFFUjtLQUNLLEtBQUs7Q0FDVCxLQUFLLEtBQUssRUFBRTtRQUNMOztLQUVILElBQUksSUFBRyxZQUFLLEdBQUcsYUFBWSxXQUFJLGVBQVEsV0FBSTtLQUMzQyxLQUFLLE1BQUUsT0FBVyxXQUFJLFdBQUk7Q0FDOUIsV0FBSSxZQUFLLEVBQUU7UUFDSjs7O0FBRVI7S0FDSyxJQUFJLElBQUcsS0FBSyxHQUFHLGFBQVksT0FBTyxJQUFJO0tBQ3RDLEtBQUssTUFBRSxPQUFXLElBQUksSUFBSTtDQUM5QixJQUFJLEtBQUssRUFBRTtRQUNKOzs7QUFFUjtLQUNLLEtBQUs7Q0FDVCxLQUFLLE1BQU0sRUFBRTtDQUNiLEtBQUssS0FBSyxJQUFHLEtBQUssR0FBRyxhQUFZLE9BQU8sSUFBSTtDQUM1QyxJQUFJLEtBQUssRUFBRTtRQUNKOzs7QUFFUjtLQUNLLEtBQUs7Q0FDVCxLQUFLLE1BQU0sRUFBRTtDQUNiLEtBQUssTUFBTSxPQUFPO1FBQ1g7Ozs7QUFTUCxTQU5LO01BT0MsS0FBSyxFQUFFOzs7QUFOYjtLQUNLLEtBQUs7Q0FDVCxLQUFLLEtBQUssRUFBRTtRQUNMOzs7OztBQVFSLFNBRks7TUFHQyxPQUFPLEVBQUU7TUFDVCxLQUFLLEVBQUU7TUFDUCxLQUFLLEVBQUU7TUFDUCxHQUFHLEVBQUU7OztBQUVYO0tBQ0ssS0FBSztDQUNULEtBQUssTUFBTSxFQUFFO0NBQ2IsS0FBSyxNQUFNO1FBQ0o7OztBQUVSO0tBQ0ssTUFBTSxPQUFPO0tBQ2IsSUFBSSxPQUFPO0tBQ1gsTUFBTSxNQUFFLE9BQVcsTUFBTSxTQUFTO0NBQ3RDLDRCQUFZOztFQUNYLE1BQU0sS0FBSyxNQUFNLEVBQUU7O0NBQ3BCLE1BQU0sR0FBRyxFQUFFLE1BQU07UUFDVixNQUFNLEtBQUssRUFBRTs7O0FBRXRCLEtBQUssT0FBTyxFQUFFO0FBQ2QsS0FBSyxTQUFTLEVBQUU7QUFDaEIsS0FBSyxXQUFXO0FBQ2hCLEtBQUssS0FBSyxNQUFFLEtBQUs7QUFDakIsS0FBSyxhQUFlLEVBQUUsS0FBSyxpQkFBbUIsRUFBRSxLQUFLO0FBQ3JELEtBQUssb0JBQW9CLEVBQUUsS0FBSzs7QUFFaEM7OztRQUNRLEtBQUssS0FBSyxVQUFVLEtBQUssS0FBSzs7O0FBRXRDOzs7UUFDUSxLQUFLLEtBQUssVUFBVSxZQUFLLEtBQUs7OztBQUV0QztRQUNRLEtBQUssS0FBSyxVQUFVLEtBQUs7OztBQUVqQzs7S0FDSyxJQUFLOztDQUVULElBQU8sTUFBTSxFQUFFLEtBQUssV0FBVztFQUNSLElBQUcsTUFBTSxHQUFJLE1BQU0sbUJBQWxDLE1BQU07OztFQUdiLElBQUcsSUFBSSxFQUFFLEtBQUssV0FBUyxlQUFlOzs7R0FHckMsS0FBSyxFQUFFLE1BQU0sU0FBUyxNQUFFLE1BQVU7R0FDbEMsS0FBSyxPQUFPO1VBQ0w7OztFQUVSLElBQUksRUFBRSxNQUFNO0VBQ1osSUFBSSxHQUFHLEVBQUU7RUFDVCxLQUFLLEVBQUUsTUFBTSxTQUFTLE1BQUUsTUFBVTtFQUNsQyxLQUFLLE1BQUksT0FBTztTQUNUO1FBQ1IsSUFBSyxJQUFJLEVBQUUsS0FBSyxXQUFTLGVBQWU7U0FDaEMsS0FBSyxhQUFhOzs7O0lBRXZCLFdBQVcsU0FBUyxXQUFXOzs7QUFHbkM7Q0FDYSxNQUFPLGVBQVo7Q0FDSSxJQUFHLElBQUksZUFBWDtDQUNTLElBQUcsSUFBSSxlQUFoQixJQUFJO0NBQ0MsS0FBTyxJQUFJLG1CQUFoQjs7S0FFSCxLQUFLLEVBQUUsSUFBSSxTQUFTO0tBQ3BCLEtBQUssRUFBRTtLQUNQLEdBQUcsRUFBRSxLQUFLOztDQUVkLElBQUcsSUFBSSxHQUFHLEdBQUksS0FBSyxXQUFXLElBQUk7U0FDMUIsS0FBSyxnQkFBZ0IsSUFBSTs7O0NBRWpDLElBQUcsV0FBVyxJQUFJLGVBQVE7RUFDekIsS0FBSyxFQUFFLEdBQUcsbUJBQW1CLEVBQUU7UUFDaEMsSUFBSyxLQUFLLFVBQVUsUUFBUSxNQUFNLEdBQUc7RUFDcEMsS0FBSyxFQUFFLEdBQUcsWUFBWTs7RUFFdEIsS0FBSyxFQUFFLEtBQUs7OztZQUVOLEtBQVMsSUFBSSxNQUFNLE9BQU87Ozs7QUFHbEMsU0FBK0Isd0M7O0FBd0MvQixLQUFLOzs7Ozs7Ozs7Ozs7O0lDcm5DRCxLQUFLLEVBQUUsbUJBQU8sQ0FBQyx1REFBUzs7Ozs7Ozs7Ozs7QUFpQ3RCLEtBQUssUUFzRlYsU0F0RlU7O01Bd0ZKLFNBQVE7TUFDYjtNQUNBLFVBQVM7TUFDVCxRQUFRLEVBQUUsTUFBTSxHQUFJLE1BQU0sT0FBTyxHQUFHO01BQ3BDLFVBQVUsRUFBRTtNQUNaLFVBQVUsRUFBRTtNQUNaLFVBQVM7Q0FDVCxRQUFRLEVBQUU7TUFDVixXQUFVOzs7O0FBaEdOLEtBQUssTUFDTCxjQUFjLEVBQUU7QUFEaEIsS0FBSyxNQUVMLFdBQVcsRUFBRTs7OztJQUlkLFFBQVE7SUFDUixNQUFNLEVBQUU7SUFDUixZQUFZOztBQUVoQixLQVZVO1FBV1Q7OztBQUVELEtBYlU7UUFjRixLQUFLLElBQUssS0FBSyxVQUFVLEdBQUcsWUFBWSxLQUFLOzs7QUFFckQsS0FoQlU7O1NBaUJGLFlBQVksS0FBSyxvQkFBakIsWUFBWSxLQUFLO1NBQ2pCLEtBQUssa0JBQUwsS0FBSzs7OztBQUdiLEtBckJVO0NBc0JULDhCQUFTLEVBQUU7O0VBQ0QsU0FBRyxPQUFPO01BQ2YsTUFBTSxFQUFFLFlBQVksRUFBRSxZQUFZLFdBQVc7RUFDakQsRUFBRSxVQUFVLEVBQUU7RUFDZCxRQUFRLEtBQUs7RUFDYjtFQUNBLE1BQU0sV0FBVyxFQUFFOzs7OztBQUdyQixLQS9CVTs7Q0FnQ1QsOEJBQVMsRUFBRTs7RUFDVixJQUFPLE1BQU0sT0FBRSxPQUFPO0dBQ3JCLE1BQU0sVUFBVSxFQUFFOzs7Ozs7O0FBSXJCLEtBdENVOztDQXVDVCw4QkFBUyxFQUFFOztFQUNWLElBQU8sTUFBTSxPQUFFLE9BQU87R0FDckIsTUFBTSxTQUFTLEVBQUU7UUFDakIsUUFBUSxFQUFFO0dBQ1Y7Ozs7Ozs7Ozs7QUFPSCxLQWxEVTs7Q0FtRFQsOEJBQVMsRUFBRTs7RUFDVixJQUFPLE1BQU0sT0FBRSxPQUFPO0dBQ3JCLE1BQU0sWUFBWSxFQUFFO1FBQ3BCLFFBQVEsRUFBRTtHQUNWOzs7Ozs7QUFHSCxLQTFEVTs7OztBQTZEVixLQTdEVTs7OztBQWdFVixLQWhFVTs7Ozs7QUFBTCxLQUFLO0FBQUwsS0FBSztBQUFMLEtBQUs7QUFBTCxLQUFLO0FBQUwsS0FBSztBQUFMLEtBQUs7QUFBTCxLQUFLO0FBQUwsS0FBSztBQUFMLEtBQUs7QUFBTCxLQUFLO0FBQUwsS0FBSztBQUFMLEtBQUs7QUFBTCxLQUFLO0FBQUwsS0FBSztBQUFMLEtBQUs7QUFBTCxLQUFLO0FBQUwsS0FBSztBQUFMLEtBQUs7QUFBTCxLQUFLLHVDQTZFYTtBQTdFbEIsS0FBSztBQUFMLEtBQUs7QUFBTCxLQUFLO0FBQUwsS0FBSzs7QUFBTCxLQUFLO0FBQUwsS0FBSzs7OztBQW1HVixLQW5HVTtNQW9HVCxVQUFVLEVBQUU7TUFDWixPQUFPLFFBQUksT0FBTztDQUNsQixVQUFPO09BQ04sWUFBWSx1QkFBUyxFQUFFO0VBQ3ZCLEtBQUssV0FBUyxvQ0FBK0IsWUFBWTs7Ozs7QUFHM0QsS0EzR1U7Z0JBNEdQOzs7OztBQVFILEtBcEhVOztNQXNIVDtNQUNBLFVBQVUsS0FBSzs7Ozs7O0FBUWhCLEtBL0hVO01BZ0lULFVBQVUsRUFBRTs7Ozs7O0FBT2IsS0F2SVU7O01BeUlULFFBQVEsRUFBRTs7Ozs7QUFJWCxLQTdJVTtDQThJVCxRQUFRO01BQ1IsU0FBUyxFQUFFOzs7OztBQUdaLEtBbEpVO01BbUpULE9BQU8sRUFBRTtNQUNULE9BQU8sRUFBRTtNQUNULFFBQVEsRUFBRTtNQUNWLEdBQUcsRUFBRSxFQUFFO01BQ1AsR0FBRyxFQUFFLEVBQUU7Q0FDUDtDQUNBO0NBQ2lCLElBQUcsRUFBRSxHQUFJLHFCQUExQixFQUFFOzs7O0FBR0gsS0E3SlU7TUE4SlQsT0FBTyxFQUFFO01BQ1QsR0FBRyxFQUFFLEVBQUU7TUFDUCxHQUFHLEVBQUUsRUFBRTtDQUNQO0NBQ2lCLElBQUcsRUFBRSxHQUFJLHFCQUExQixFQUFFOzs7O0FBR0gsS0FyS1U7TUFzS1QsT0FBTyxFQUFFO01BQ1QsR0FBRyxFQUFFLEVBQUU7TUFDUCxHQUFHLEVBQUUsRUFBRTtDQUNQOztDQUVBLEtBQUssTUFBTSxjQUFjLEVBQUUsRUFBRTs7Q0FFN0IsU0FBRyxPQUFPLEVBQUU7TUFDUCxJQUFJLE1BQUUsS0FBSyxNQUFVO0VBQ3pCLElBQUk7RUFDSixJQUFJOzs7Q0FFTCxJQUFHLEVBQUUsR0FBSTtFQUNSLEVBQUU7Ozs7OztBQUlKLEtBdkxVO1FBd0xUOzs7QUFFRCxLQTFMVTs7TUEyTFQsT0FBTyxFQUFFO01BQ1QsUUFBUSxFQUFFLEVBQUU7TUFDWixHQUFHLEVBQUUsRUFBRTtNQUNQLEdBQUcsRUFBRSxFQUFFO0NBQ1A7Q0FDQTtNQUNBLFdBQVcsNEJBQU8sVUFBVSxFQUFFO0NBQzlCLEtBQUssV0FBUyxrQ0FBNkIsV0FBVzs7OztBQUd2RCxLQXJNVTtNQXNNVCxHQUFHLEVBQUUsRUFBRTtNQUNQLEdBQUcsRUFBRSxFQUFFO01BQ1AsT0FBTyxFQUFFO0NBQ1EsSUFBRyxxQkFBcEIsRUFBRTtDQUNGO0NBQ0E7Ozs7QUFHRCxLQTlNVTtNQStNVCxHQUFHLEVBQUUsRUFBRTtNQUNQLEdBQUcsRUFBRSxFQUFFO0NBQ1A7Ozs7QUFHRCxLQXBOVTtRQXFOVDs7O0FBRUQsS0F2TlU7TUF3TlQsV0FBVyxFQUFFLEtBQUs7TUFDbEIsT0FBTyxPQUFFLElBQUksRUFBRTtNQUNmLElBQUksT0FBRTtNQUNOLElBQUksT0FBRTs7S0FFRixJQUFJLEVBQUUsYUFBTTtLQUNaLEtBQUssRUFBRTs7TUFFWCxjQUFjLEVBQUUsSUFBSSxxQkFBUTs7UUFFdEI7RUFDTCxLQUFLLG9CQUFNO0VBQ1gsSUFBRyxLQUFLLEdBQUcsS0FBSztRQUNmLFFBQVEsRUFBRTtRQUNWLFVBQVM7R0FDVCxjQUFPO0dBQ0QsVUFBTzs7RUFDZCxJQUFJLEVBQUUsSUFBSTs7O01BRVg7Ozs7QUFHRCxLQTlPVTs7Q0ErT0csVUFBSSxRQUFRLFFBQUc7O0tBRXZCLEdBQUcsRUFBRSxLQUFLLEtBQUssVUFBRSxFQUFDLFVBQUcsRUFBRSxVQUFFLEVBQUM7Q0FDbEIsSUFBRyxHQUFHLE9BQUUsWUFBcEIsT0FBTyxFQUFFO01BQ1QsSUFBSSxFQUFFOzs7Q0FHTixTQUFHO0VBQ0YsU0FBRyxRQUFRLFFBQUksUUFBUTtRQUN0QixRQUFROztPQUNULGVBQVM7T0FDVCxVQUFVLEVBQUU7RUFDYyxJQUFHLGNBQU8sZ0JBQXBDLGNBQU87RUFDTyxTQUFHLG9CQUFWOzs7O01BR1I7Q0FDQSxTQUFHO0VBQ29CLG1DQUFTO0dBQS9CLFNBQUU7Ozs7Q0FFSCxxQ0FBUSxtQkFBUixRQUFRO0NBQ0QsU0FBRyxXQUFWOzs7O0FBR0QsS0F2UVU7O0NBd1FHLFVBQUksUUFBUSxRQUFHOztDQUUzQixTQUFHO0VBQ0YsbUNBQVM7O0dBQ21CLElBQUcsRUFBRSxlQUFoQyxFQUFFLHNCQUFpQjs7OztDQUVyQixxQ0FBUSxpQkFBUixRQUFRLHNCQUFpQjs7OztBQUcxQixLQWpSVTs7Q0FrUkcsVUFBSSxRQUFRLFFBQUc7O01BRTNCOztDQUVBLFNBQUc7RUFDaUIsbUNBQVM7R0FBNUIsU0FBRTs7OztDQUVILHFDQUFRLGdCQUFSLFFBQVE7Q0FDUjs7OztBQUdELEtBN1JVO0NBOFJULFVBQU87T0FDTixXQUFXLEVBQUU7RUFDYjtFQUNBOzs7OztBQUdGLEtBcFNVOztDQXFTRyxVQUFPOztNQUVuQixXQUFXLEVBQUU7TUFDYjs7Q0FFQSxTQUFHO0VBQ0YsbUNBQVM7O0dBQ2MsSUFBRyxFQUFFLGlCQUEzQixFQUFFOzs7O0NBRUoscUNBQVEsbUJBQVIsUUFBUTs7OztBQUdULEtBalRVO0NBa1RULFNBQUc7RUFDRixLQUFLLFdBQVMscUNBQWdDLFdBQVc7T0FDekQsV0FBVyxFQUFFOzs7Q0FFZCxTQUFHO0VBQ0YsS0FBSyxXQUFTLHVDQUFrQyxZQUFZO09BQzVELFlBQVksRUFBRTs7Ozs7Ozs7QUFRaEIsS0FoVVU7YUFnVUE7Ozs7O0FBTVYsS0F0VVU7YUFzVUEsR0FBRyxPQUFFOzs7OztBQU1mLEtBNVVVO2FBNFVBLEdBQUcsT0FBRTs7Ozs7QUFNZixLQWxWVTthQWtWQTs7Ozs7QUFNVixLQXhWVTthQXdWQTs7Ozs7QUFNVixLQTlWVTthQThWRDs7Ozs7QUFNVCxLQXBXVTthQW9XRDs7Ozs7QUFNVCxLQTFXVTtNQTJXVCxzQ0FBZSxRQUFRLE1BQUk7YUFDM0IsR0FBRyxPQUFFLFdBQVc7Ozs7O0FBTWpCLEtBbFhVO01BbVhULHNDQUFlLFFBQVEsTUFBSTthQUMzQixHQUFHLE9BQUUsV0FBVzs7Ozs7QUFNakIsS0ExWFU7YUEwWEk7OztBQUVkLEtBNVhVO2FBNlhUOzs7QUFFRCxLQS9YVTtRQWdZVCxLQUFLLE1BQUksT0FBRTs7OztBQUdQLEtBQUssZUFBWCxTQUFXOztBQUFMLEtBQUssOENBRVc7QUFGaEIsS0FBSztBQUFMLEtBQUs7QUFBTCxLQUFLLGlDQUVXOztBQUVyQixLQUpVOzs7O0FBT1YsS0FQVTs7OztBQVVWLEtBVlU7Ozs7Ozs7Ozs7Ozs7Ozs7O0lDaGFQLEtBQUs7Ozs7QUFTVDtRQUNDO0VBQ0M7U0FDQSxLQUFLO0dBRk87Ozs7O0FBV2Q7UUFDQyxZQUFZLE1BQU07Ozs7O0FBS25CO1FBQ0MsY0FBYzs7Ozs7QUFLZjtRQUNDLGFBQWE7Ozs7QUFHZDtDQUNDOzthQUNZLElBQUcsSUFBSSxlQUFlLE1BQWpDLElBQUksR0FBRyxFQUFFOzs7Q0FFVixJQUFJLFVBQVUsRUFBRSxPQUFPLE9BQU8sSUFBSTtDQUNsQyxJQUFJLFVBQVUsRUFBRSxJQUFJLFVBQVUsVUFBVSxFQUFFLElBQUk7Q0FDOUMsSUFBSSxVQUFVLFdBQVcsRUFBRSxJQUFJLFVBQVUsWUFBWSxFQUFFO1FBQ2hEOzs7OztBQXNCUjtRQUNRLE1BQUssRUFBRSxVQUFVLEVBQUUsWUFBVTs7Ozs7QUFTckM7Q0FDQyxJQUFHLGlCQUFVO0VBQ1osUUFBUTtTQUNSLFFBQVEsSUFBSTtRQUNiLElBQUssTUFBTSxHQUFJLE1BQU07U0FDcEI7O1NBRUEsUUFBUSxRQUFROzs7O0lBRWQsVUFBVTtJQUNWLFlBQVk7O0FBRWhCO0NBQ0MsSUFBRyxJQUFJLGFBQWEsR0FBRztTQUN0QixJQUFJLFFBQVEsK0JBQWtCLEVBQUUsT0FBTyxHQUFHOztTQUUxQzs7OztBQUVGO1FBQ0MsWUFBWSxTQUFaLFlBQVksT0FBUyxLQUFLLG1CQUFtQixFQUFFOzs7QUFFaEQ7U0FDUyxFQUFFLEdBQUcsRUFBRSxXQUFXLEVBQUUsUUFBUSxRQUFRLFFBQVEsS0FBSyxFQUFFOzs7QUFFNUQ7UUFDUSxFQUFFLEtBQUksRUFBRSxlQUFRLFlBQVcsRUFBRSxJQUFJLEtBQUssS0FBSyxFQUFFLFFBQVEsR0FBRzs7O0FBRWhFO0NBQ0MsSUFBRyxNQUFNO1NBQ0QsTUFBTSxlQUFlLEtBQUs7Ozs7O0FBR25DOztDQUNDLElBQUcsTUFBTTtTQUNELE1BQU0sZ0JBQWdCLEtBQUs7OztLQUUvQixRQUFRLEVBQUUsS0FBSyxZQUFZO0tBQzNCLFFBQVEsRUFBRSxLQUFLLG1CQUFtQixFQUFFO0tBQ3BDLE1BQU0sRUFBRSxNQUFNOztDQUVsQixJQUFHLEtBQUs7RUFDUCxNQUFNLFNBQVMsMkJBQVUsTUFBSTtFQUM3QixNQUFNLFNBQVM7R0FDZCxJQUFHLE1BQU0sUUFBUTtTQUNYLE1BQUksTUFBTSxFQUFFOzs7OztFQUduQixNQUFNLFNBQVMsMkJBQVUsYUFBYTtFQUN0QyxNQUFNLFNBQVM7UUFDVCxhQUFhLEtBQUs7Ozs7Ozs7QUFJMUI7S0FDSyxHQUFHLEVBQUUsU0FBUztDQUNsQixJQUFHLGNBQU87RUFDVCxHQUFHLEtBQUssT0FBTyxJQUFJLEtBQUs7UUFDekIsWUFBSyxvQ0FBYyxHQUFJLE9BQU87RUFDN0IsT0FBTyxJQUFJLElBQUksS0FBSzs7Ozs7OztJQUtsQixPQUFPOztLQUVOLEtBQU0sR0FBSTs7U0FFUCxLQUFLLEVBQUUsTUFBTSxJQUFLLEtBQUssRUFBRSxLQUFLO0VBQ3BDLElBQUcsR0FBRyxFQUFFLEtBQUs7R0FDWixJQUFHLEtBQUssS0FBSyxHQUFJLEdBQUcsS0FBSztJQUN4QixJQUFJLEVBQUUsT0FBTyxHQUFHLEtBQUssTUFBTSxNQUFNLEdBQUcsUUFBUSxHQUFHLEtBQUs7OztJQUdwRCxJQUFJLEVBQUUsT0FBTyxHQUFHLE1BQU0sS0FBTSxRQUFRLEdBQUcsS0FBSzs7OztFQUU5QyxJQUFHLEtBQUssTUFBTSxLQUFLLEtBQUssTUFBTSxHQUFHO0dBQ2hDLEtBQUssS0FBSyxFQUFFLEtBQUs7R0FDakIsS0FBSyxTQUFTLEVBQUU7Ozs7Ozs7QUFJbkI7S0FDSyxJQUFLLEtBQU07Q0FDZixJQUFJLEVBQUUsSUFBSSxrQkFBSixJQUFJO0NBQ1YsS0FBSyxFQUFFLElBQUksV0FBSixJQUFJO0NBQ1gsS0FBSyxFQUFFLEtBQUssS0FBSyxJQUFJLEtBQUssS0FBSyxHQUFHLEtBQUssS0FBSztDQUM1QyxLQUFLLFNBQVMsRUFBRTtDQUNoQixLQUFLLEtBQUssRUFBRTtDQUNaLEtBQUssS0FBSyxFQUFFLEtBQUssS0FBSztRQUNmOzs7O0FBR1I7S0FDSyxLQUFLLEVBQUUsS0FBSyxPQUFPLElBQUksTUFBTTtDQUNqQyxLQUFLLE1BQU0sRUFBRTtRQUNOOzs7O0FBR1I7S0FDSyxLQUFNO0tBQ04sS0FBSyxFQUFFLElBQUk7Q0FDUixNQUFPOztDQUVkLElBQUcsS0FBSyxFQUFFLEtBQUs7VUFDUCxLQUFLLEVBQUUsTUFBTSxJQUFLLEtBQUssRUFBRSxLQUFLO0dBQ3BDLElBQUcsS0FBSyxHQUFHLEdBQUcsR0FBRyxLQUFLLFNBQVMsR0FBRztJQUNqQyxLQUFLLEtBQUssRUFBRSxLQUFLOztJQUVqQixLQUFLLFNBQVMsRUFBRTs7Ozs7Ozs7O0FBS3BCOztDQUNDLElBQU8sR0FBRyxFQUFFLElBQUk7RUFDZ0IsSUFBRyxHQUFHLFVBQXJDLE9BQU8sTUFBTSxPQUFPLEdBQUc7RUFDYSxJQUFHLEdBQUcsT0FBMUMsT0FBTyxPQUFPLE1BQU0sUUFBUSxHQUFHOzs7OztBQUdqQztDQUNDLElBQUcsS0FBSyxVQUFXLEtBQUs7RUFDdkIsS0FBSyxTQUFTLFdBQVcsU0FBUzs7Q0FDbkMsSUFBRyxPQUFPLFVBQVcsT0FBTztFQUMzQixLQUFLLE9BQU8sYUFBYSxTQUFTOzs7OztBQUdwQyxPQUFPLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7O2tEQzlNYixLQUFLLEVBQUUsbUJBQU8sQ0FBQyxzREFBUTtJQUN2QixTQUFTLEVBQUU7SUFDWCxHQUFHLFdBQVUsT0FBTyxtQkFBa0IsbUJBQWlCLE9BQU8sbUJBQWtCLFNBQVM7O0FBRTdGLElBQUcsR0FBRyxHQUFJLEdBQUc7Q0FDWixRQUFRLGtCQUFhLEdBQUcsS0FBSztDQUM3QixLQUFLLEVBQUUsR0FBRztPQUNYLElBQUs7Q0FDSixHQUFHLEtBQUssRUFBRTtDQUNWLFNBQVMsRUFBRTtDQUNYLElBQUcsR0FBRyxPQUFPLEdBQUksR0FBRyxPQUFPO0VBQzFCLEdBQUcscUNBQXFCOzs7O0FBRTFCLE9BQU8sUUFBUSxFQUFFOztBQUVqQjs7Ozs7QUFJQSxJQUFHO0NBQ0YsS0FBSyxhQUFhOzs7QUFFbkI7Ozs7Ozs7Ozs7Ozs7O0lDdEJJLEtBQUssRUFBRSxtQkFBTyxDQUFDLHNEQUFROztJQUV2QjtJQUNBOztBQUVKOztBQUlBO0NBQ0MscUJBQXFCLEVBQUUsT0FBTyxxQkFBcUIsR0FBRyxPQUFPLHdCQUF3QixHQUFHLE9BQU87Q0FDL0Ysc0JBQXNCLEVBQUUsT0FBTztDQUMvQixrREFBMEIsT0FBTztDQUNqQyxrREFBMEIsT0FBTztDQUNqQyx5RUFBbUMsV0FBVyxJQUFJLEtBQUssRUFBRTs7O0FBT3pELFNBTEs7O01BTUosT0FBTztNQUNQLE9BQU8sR0FBRztNQUNWLFdBQVcsRUFBRTtNQUNiLFFBQVE7T0FDUCxXQUFXLEVBQUU7Y0FDYixLQUFLOzs7OztBQVhGO0FBQUE7QUFBQTtBQUFBOztBQWNMO0NBQ0MsSUFBRyxNQUFNLFFBQUcsT0FBTyxRQUFRLE1BQU0sSUFBSTtPQUNwQyxPQUFPLEtBQUs7OztDQUVKLFVBQU8scUJBQWhCOzs7QUFFRDtLQUNLLE1BQU0sT0FBRTtDQUNJLFVBQU8sWUFBdkIsSUFBSSxFQUFFO01BQ04sSUFBSSxFQUFFLFVBQVUsT0FBRTtNQUNsQixJQUFJLEVBQUU7TUFDTixPQUFPO01BQ1AsT0FBTyxFQUFFO0NBQ1Q7Q0FDQSxJQUFHLE1BQU07RUFDUiw0QkFBYzs7R0FDYixJQUFHLGdCQUFTO0lBQ1gsVUFBSztVQUNOLElBQUssS0FBSztJQUNULEtBQUssVUFBSzs7OztNQUNiLE9BQU8sRUFBRTtDQUNUO01BQ0EsT0FBTyxPQUFFLGFBQWEsTUFBSzs7OztBQUc1QjtDQUNDLFVBQUk7T0FDSCxXQUFXLEVBQUU7RUFDYixTQUFHLE9BQU8sSUFBSTtRQUNiLE9BQU8sRUFBRTs7RUFDViwyQkFBc0I7Ozs7O0FBR3hCOzs7O0FBR0E7Q0FDQyxJQUFHLEtBQUs7RUFDUCxLQUFLLFdBQVc7Ozs7O0FBR25CLEtBQUssT0FBTyxNQUFFO0FBQ2QsS0FBSyxXQUFXOztBQUVoQjtRQUNDLEtBQUs7OztBQUVOO1FBQ0Msc0JBQXNCOzs7QUFFdkI7UUFDQyxxQkFBcUI7Ozs7OztJQUtsQixZQUFZLEVBQUU7O0FBRWxCO0NBQ0M7O0NBRUEsS0FBSyxLQUFLLGVBQWMsT0FBTyxHQUFHLGNBQWEsVUFBVTtDQUN6RCxNQUFLLFlBQVksR0FBRztFQUNuQixLQUFLLFdBQVcsR0FBSSxLQUFLLFdBQVc7Ozs7Ozs7QUFjaEMsS0FBSyxZQVdWLFNBWFU7O01BWVQsSUFBSSxFQUFFO01BQ04sUUFBUSxFQUFFO01BQ1YsUUFBUSxFQUFFO01BQ1YsUUFBUSxFQUFFO01BQ1YsUUFBUSxzQkFBSztNQUNiLFFBQVEsNEJBQVMsS0FBSzs7TUFFdEIsSUFBSSxFQUFFO01BQ04sT0FBTztNQUNQLFdBQVcsRUFBRTtNQUNiLFdBQVcsRUFBRTtNQUNiLE9BQU8sRUFBRTtNQUNULFNBQVMsRUFBRTs7TUFFTixRQUFRLE9BQU8sUUFBUTs7OztJQXhCekIsUUFBUSxFQUFFOztBQUVkLEtBSlU7UUFLVCxLQUFLLEtBQUssYUFBYTs7Ozs7QUFMbkIsS0FBSztBQUFMLEtBQUs7QUFBTCxLQUFLOzs7Ozs7QUFBTCxLQUFLO0FBQUwsS0FBSztBQUFMLEtBQUs7Ozs7OztBQUFMLEtBQUs7QUFBTCxLQUFLO0FBQUwsS0FBSzs7Ozs7O0FBQUwsS0FBSztBQUFMLEtBQUs7O0FBa0NWLEtBbENVO0NBbUNHLElBQUcsS0FBSyxRQUFJLFNBQXhCOzs7O0FBR0QsS0F0Q1U7Q0F1Q1QsbUJBQWM7TUFDZCxZQUFZLEVBQUU7Q0FDZCxJQUFHLEtBQUssUUFBSTtPQUNYLFlBQVksRUFBRSxpQkFBaUIsV0FBVyxXQUFXOzs7OztBQUd2RCxLQTdDVTtDQThDVCxTQUFHLFFBQVEsR0FBSSxLQUFJLEtBQUs7U0FDdkIsS0FBSyxPQUFPO1FBQ2IsTUFBTSxNQUFJLEdBQUk7U0FDYixLQUFLLFNBQVM7Ozs7OztBQU1oQixLQXZEVTthQXdEVDs7Ozs7QUFNRCxLQTlEVTthQStEVDs7Ozs7QUFNRCxLQXJFVTs7O0NBc0VTLElBQUcsUUFBUSxJQUFJLEdBQUcsbUJBQXBDLFlBQU0sUUFBUTtDQUNjLElBQUcsUUFBUSxTQUFTLEdBQUcsbUJBQW5ELGlCQUFXLFFBQVE7Q0FDSyxJQUFHLFFBQVEsT0FBTyxHQUFHLG1CQUE3QyxlQUFTLFFBQVE7Ozs7OztBQVFsQixLQWhGVTtNQWlGVCxRQUFRLEVBQUU7Q0FDVixVQUFJO0VBQ0g7Ozs7Ozs7QUFTRixLQTVGVTtNQTZGVDtNQUNBLFFBQVE7TUFDUixRQUFRLEVBQUU7Ozs7OztBQXFCWCxLQXBIVTtNQXFIVDtNQUNBLElBQUksRUFBRTs7Q0FFTixJQUFHO09BQ0YsV0FBVyxFQUFFOzs7Q0FFZDs7Q0FFQSxTQUFHLEtBQUssUUFBSTtFQUNYOzs7OztBQUdGLEtBaklVO0NBa0lULFVBQU87T0FDTixXQUFXLEVBQUU7RUFDYixLQUFLLE9BQU87Ozs7Ozs7QUFXZCxLQS9JVTt5Q0ErSWU7Q0FDeEIsVUFBTztPQUNOLFFBQVEsRUFBRTtPQUNWLFFBQVEsT0FBRSxRQUFRO09BQ2xCLFFBQVEsT0FBTztPQUNmLHdCQUFTLGVBQVQsUUFBUztFQUNULEtBQUssV0FBVzs7RUFFaEIsU0FBRztHQUNGLEtBQUssT0FBTzs7O0VBRWIsU0FBRyxVQUFVLFNBQUs7UUFDakIsWUFBWSxFQUFFLGlCQUFpQixXQUFXLGdCQUFXOzs7RUFFdEQsSUFBRztRQUNGLEtBQUs7U0FDTixTQUFLO0dBQ0o7Ozs7Ozs7O0FBTUgsS0F0S1U7Q0F1S1QsU0FBRztPQUNGLFFBQVEsRUFBRTtPQUNWLFFBQVEsT0FBTyxPQUFFO01BQ2IsSUFBSSxFQUFFLEtBQUssV0FBVztFQUMxQixJQUFHLElBQUksR0FBRztHQUNULEtBQUssV0FBVyxPQUFPLElBQUk7OztFQUU1QixTQUFHO0dBQ0YsS0FBSyxTQUFTOzs7RUFFZixTQUFHO0dBQ0YsbUJBQWM7UUFDZCxZQUFZLEVBQUU7OztPQUVmLHdCQUFTLGlCQUFULFFBQVM7Ozs7O0FBR1gsS0F4TFU7YUF5TFQ7OztBQUVELEtBM0xVO0NBNExUO0NBQ0EsS0FBSyxXQUFXOzs7O0FBR2pCLEtBaE1VO0NBaU1HLFVBQUksUUFBUSxRQUFHOztDQUUzQixTQUFHLG1CQUFZO0VBQ1QsU0FBRyxRQUFRLGFBQWhCO1FBQ0QsU0FBSyxtQkFBWTtFQUNoQixTQUFHLFFBQVEsU0FBUyxNQUFNLEdBQUksTUFBTSxNQUFNLEdBQUcsT0FBTyxHQUFHO0dBQ3REOzs7RUFFRDs7Ozs7Ozs7Ozs7Ozs7O0FDcFRIOztBQUVBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsNENBQTRDOztBQUU1Qzs7Ozs7Ozs7Ozs7Ozs7eUVDbkJPOzRFQUNBOztJQUVILFVBQVU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7VUErQmQ7Ozs7Ozs7Ozs7U0FNWTtVQUNDO1VBQ0E7Z0JBQ007U0FDUDs7O1VBR0M7V0FDQztjQUNHO2VBQ0M7OztXQUdKO2FBQ0U7WUFDRDthQUNDOztZQUVGOztVQUVEO1dBQ0M7YUFDRTtTQUNKOzs7Ozs7OztTQXZCQTtVQUNDO1VBQ0E7Z0JBQ007U0FDUDs7O1VBR0M7V0FDQztjQUNHO2VBQ0M7OztXQUdKO2FBQ0U7WUFDRDthQUNDOztZQUVGOztVQUVEO1dBQ0M7YUFDRTtTQUNKOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Q0FRVjtPQUNFLFlBQVksRUFBRTtFQUNkLElBQUc7UUFDRCxPQUFPLEtBQUssTUFBRSxPQUFXOztRQUV6QixPQUFPLEtBQUssRUFBRTs7Ozs7Q0FFbEI7ZUFDRSxlQUFjOzs7Q0FFaEI7TUFDTSxZQUFZLEVBQUUsRUFBRSxTQUFPOztFQUMzQixtQ0FBWTtZQUNWLFNBQUs7Ozs7OztDQUdUOztFQUNFLFVBQUcsS0FBSyxVQUFVLHdCQUFXLHNCQUFPLE1BQU0sR0FBRztVQUNwQzs7O0VBRVQsVUFBRyxLQUFLLFVBQVUsd0JBQVcsc0JBQU8sTUFBTSxHQUFHO1VBQ3BDOzs7RUFFVCxvQkFBRyxLQUFLLDZCQUFhLGdDQUFPLE1BQU0sR0FBRztVQUM1Qjs7O0VBRVQsZUFBRyxLQUFLLG1CQUFRLGlDQUFTLE9BQU8sTUFBTSxHQUFHO1VBQ2hDOzs7RUFFVCxjQUFHLEtBQUssaUJBQU8sZ0NBQVMsT0FBTyxNQUFNLEdBQUc7VUFDL0I7OztFQUVULG1CQUFHLEtBQUssMkJBQVkscUNBQVMsT0FBTyxNQUFNLEdBQUc7VUFDcEM7OztFQUVULGtCQUFHLEtBQUsseUJBQVcsb0NBQVMsT0FBTyxNQUFNLEdBQUc7VUFDbkM7OztFQUVULGtCQUFHLEtBQUsseUJBQVcsb0NBQVMsT0FBTyxNQUFNLEdBQUc7VUFDbkM7Ozs7Q0FFWDtNQUNNLFNBQVMsRUFBRTtFQUNmOzs0QkFDRSxJQUFHLEtBQUs7SUFDTixTQUFTLEVBQUU7SUFDWCxJQUFHLFNBQVMsR0FBRyxLQUFLLE9BQU8sSUFBSTtZQUN0Qjs7OztTQUNIO0dBQ1I7O0dBRUEsUUFBUSxJQUFJOzs7O0NBRWhCO0VBQ0U7O3lCQUNFLElBQUcsS0FBSztJQUNOLElBQUcsUUFBUSxHQUFHLEtBQUssVUFBVSxHQUFHO1lBQ3ZCOzs7OztTQUVOOzs7Q0FFVDtFQUNFOztxQ0FDRSxJQUFHLEtBQUs7SUFDTixJQUFHLFlBQVksR0FBRyxLQUFLLFNBQVMsR0FBRztZQUMxQjs7Ozs7U0FFTjs7O0NBRVQ7RUFDRTs7Z0NBQ0UsSUFBRyxLQUFLO0lBQ04sSUFBRyxVQUFVLEdBQUcsS0FBSyxPQUFPLEdBQUc7WUFDdEI7OztJQUVULElBQUcsT0FBTyxXQUFXLEdBQUc7WUFDZjs7Ozs7U0FFTjs7O0NBRVQ7RUFDRSxVQUFJLFdBQVcsS0FBTSxNQUFNLE1BQU8sTUFBTTtVQUMvQjs7O0VBRVQsVUFBSSxVQUFVLEtBQU0sTUFBTTtVQUNqQjs7O0VBRVQsSUFBRyxLQUFLLFNBQVMsU0FBSSxhQUFhLEtBQU0sTUFBTTtVQUNyQzs7O0VBRVQsVUFBSSxZQUFZLEtBQU0sTUFBTTtVQUNuQjs7O0VBRVQsSUFBRyxNQUFNLEtBQUssU0FBSSxVQUFVLEtBQU0sTUFBTTtVQUMvQjs7O1NBRUY7Ozs7Q0FHVDs7RUFDRTtPQUVNLElBQUksUUFBUSxPQUFPLE1BQU07T0FDekIsS0FBSyxRQUFRLElBQUk7UUFDckIsTUFBTSxLQUFLLEtBQUs7OztFQUVsQixtQ0FBVzs7R0FDVCw0QkFBWSxJQUFJOztTQUNkLE9BQU8sS0FBSztTQUNaLFlBQVksS0FBSyxTQUFTLEVBQUU7Ozs7RUFFaEMscUJBQWU7O2tCQUNiLDhCQUFlLEtBQUs7O0lBQ2xCLFFBQVEsSUFBSSxPQUFFLFlBQVksUUFBUTs7OztTQUV0QyxLQUFLOzs7O0NBR1A7O3VCQUNPO2tDQUNJO3NCQUNjOzs7Ozs7Ozs7O3dCQWlDRixpQkFBVTs7Ozs7OztNQTdCekI7OzBDQUNNLGlCQUFTO2dDQUNjOzt1QkFEUDt3QkFDWCxhQUFNLEtBQUs7Ozs7Ozs7OztNQUt0Qjs7MENBQ00saUJBQVM7Z0NBQ3NCOzt1QkFEZjt3QkFDWCxhQUFNLFNBQVM7Ozs7Ozs7OztNQUsxQjs7MENBQ00saUJBQVM7Z0NBQ3VCOzs2QkFEVixFQUFDO3dCQUNsQixhQUFNLGVBQVc7Ozs7NkJBRXhCLGlCQUFTLGNBQU07d0JBQ007Ozs7bUJBQWhCOzs7Ozs7TUFLVDs7MENBQ00saUJBQVM7Z0NBQ2tCOzt1QkFEVDt3QkFDYixhQUFNLE9BQU87Ozs7OztLQUd5QixrQ0FBWTthQUFBO21DQUNyRCxTQUFNLG1CQUFNOzs7OztnQ0FFckI7OztLQUNELG1DQUFZOztnQkFBWSxPQUFPLEtBQU07d0RBQ3BCLGlCQUFTLFdBQVUsMkJBQWdCOzs7OztHQUVuRDtxQ0FDeUMsa0NBQXFCLDhDQUF4QyxpQkFBUzs7Ozs7O0FBRXhDLEtBQUs7Ozs7Ozs7Ozs7Ozs7Y0MzT0U7Ozs7Q0FHTDs7RUFDRSxJQUFHLFlBQUssVUFBWSxXQUFJLFVBQVU7RUFDbEMsSUFBRyxZQUFLLFlBQWMsV0FBSSxVQUFVO0VBQ3BDLElBQUcsWUFBSyxXQUFhLFdBQUksVUFBVTtFQUNuQyxJQUFHLFlBQUssWUFBYyxXQUFJLFVBQVU7O0VBRXBDLElBQUcsWUFBSztHQUNOLFdBQUksVUFBVSxpQkFBWSxZQUFLOzs7RUFFakMsSUFBTyxTQUFTLEVBQUUsWUFBSyxVQUFVLEdBQUcsWUFBSyxVQUFVO0dBQ2pELFdBQUksVUFBVSxjQUFVOzs7RUFFMUIsSUFBRyxZQUFLO1VBQ04sV0FBSSxVQUFVLGtCQUFhLFlBQUs7Ozs7O0NBR3BDOzs7SUFFVyxZQUFZLGlCQUFFLFlBQUssMkJBQVk7Z0NBQ2hDLGtCQUFVLHFDQUE4Qjs7Z0NBRXhDOzs7K0JBRUY7O0lBRUcsU0FBUyxFQUFFLFlBQUssVUFBVSxHQUFHLFlBQUs7Z0NBQ25DLDZCQUFXO1NBQ1IsZUFBZSxtQkFBRSxZQUFLLCtCQUFjO2dDQUN2Qyx5QkFBaUIscUNBQThCOzs7K0JBRWpELDZCQUFXLFlBQUssVUFBVTs7K0JBRTFCLGlCQUFTLDJCQUFTLFlBQUs7K0JBQ3ZCLGlCQUFTLDBCQUFRLFlBQUs7K0JBQ3RCLGlCQUFTLDhCQUFZLFlBQUs7Ozs7Ozs7Ozs7Ozs7Ozs7OztnQkNyQ3BDOzs7O0NBR0U7TUFDTSxLQUFLLGFBQU07RUFDZixLQUFLLE1BQUksVUFBVSxFQUFFO1NBQ2Q7OztDQUVUOzs7SUFFVyxjQUFjLEVBQUUsWUFBSyxpQkFBWSxXQUFXLEdBQUcsWUFBSyxZQUFZO2dDQUNqRSxvQkFBWSxxQ0FBOEI7OztNQUM1Qyw4QkFBZSxZQUFLOztlQUNYLFFBQVE7OzswQ0FFUDtzREFDRTswQ0FDQTswQ0FDQTtlQUNKLFlBQVksUUFBUSxJQUFJLFVBQVU7OzRCQUZoQixRQUFRLElBQUksVUFBVTs0QkFDdEIsUUFBUSxJQUFJOzs7Ozs7Ozs7Z0NBR3BDLGdDQUFjLFlBQUs7Ozs7Ozs7ZUFHeEI7Ozs7OztDQUlMOztFQUNFLElBQUcsWUFBSyxVQUFZLFdBQUksVUFBVTtFQUNsQyxJQUFHLFlBQUssWUFBYyxXQUFJLFVBQVU7RUFDcEMsSUFBRyxZQUFLLFdBQWEsV0FBSSxVQUFVO0VBQ25DLElBQUcsWUFBSyxZQUFjLFdBQUksVUFBVTs7RUFFcEMsSUFBRyxZQUFLO0dBQ04sV0FBSSxVQUFVLG9CQUFlLFlBQUs7OztFQUVwQyxJQUFPLFNBQVMsRUFBRSxZQUFLLFVBQVUsR0FBRyxZQUFLLFVBQVU7R0FDakQsV0FBSSxVQUFVLGlCQUFhOzs7RUFFN0IsSUFBRyxZQUFLO0dBQ04sV0FBSSxVQUFVLHFCQUFnQixZQUFLOzs7T0FFckMsZUFBZSxPQUFFLGlCQUFpQjtTQUNsQyxLQUFLOzs7O0NBR1A7RUFDRSxJQUFHLFNBQVMsUUFBUSxNQUFNLEVBQUU7R0FDMUIsU0FBUyxLQUFLO0dBQ2QsSUFBRyxLQUFLLFlBQVk7SUFDbEIsSUFBSSxLQUFLOzs7R0FFWCw4QkFBZSxLQUFLOztJQUNsQixJQUFHLFNBQVMsUUFBUSxTQUFTLEVBQUU7VUFDN0IsaUJBQWlCLFFBQVEsSUFBSyxJQUFLOzs7OztTQUVsQzs7O0NBRVQ7U0FDRTs7O0NBRUY7U0FDRTs7O0NBRUY7O3VCQUNPLHNCQUFlOzhCQUNkO21CQUNDOztvQkFFQzs7b0JBRUE7OzttQkFKVSxZQUFLLGVBQVU7OztLQUszQixtQ0FBaUI7c0RBQ08saUJBQVMiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvQXBwLmltYmFcIik7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUgXCIuL3NyYy9pbWJhL2luZGV4LmltYmFcIiIsInZhciBJbWJhID0gcmVxdWlyZShcIi4uL2ltYmFcIilcbnJlcXVpcmUoXCIuL3BvaW50ZXJcIilcblxudmFyIG5hdGl2ZSA9IFtcblx0OmtleWRvd24sIDprZXl1cCwgOmtleXByZXNzLFxuXHQ6dGV4dElucHV0LCA6aW5wdXQsIDpjaGFuZ2UsIDpzdWJtaXQsXG5cdDpmb2N1c2luLCA6Zm9jdXNvdXQsIDpmb2N1cywgOmJsdXIsXG5cdDpjb250ZXh0bWVudSwgOnNlbGVjdHN0YXJ0LCA6ZGJsY2xpY2ssOnNlbGVjdGlvbmNoYW5nZVxuXHQ6bW91c2V3aGVlbCwgOndoZWVsLCA6c2Nyb2xsLFxuXHQ6YmVmb3JlY29weSwgOmNvcHksIDpiZWZvcmVwYXN0ZSwgOnBhc3RlLCA6YmVmb3JlY3V0LCA6Y3V0LCBcblx0OmRyYWdzdGFydCw6ZHJhZyw6ZHJhZ2VuZCwgOmRyYWdlbnRlciw6ZHJhZ292ZXIsOmRyYWdsZWF2ZSw6ZHJhZ2V4aXQsIDpkcm9wLFxuXHQ6bW91c2V1cCwgOm1vdXNlZG93biwgOm1vdXNlZW50ZXIsIDptb3VzZWxlYXZlLCA6bW91c2VvdXQsIDptb3VzZW92ZXIsIDptb3VzZW1vdmVcbl1cblxuIyMjXG5cbk1hbmFnZXIgZm9yIGxpc3RlbmluZyB0byBhbmQgZGVsZWdhdGluZyBldmVudHMgaW4gSW1iYS4gQSBzaW5nbGUgaW5zdGFuY2VcbmlzIGFsd2F5cyBjcmVhdGVkIGJ5IEltYmEgKGFzIGBJbWJhLkV2ZW50c2ApLCB3aGljaCBoYW5kbGVzIGFuZCBkZWxlZ2F0ZXMgYWxsXG5ldmVudHMgYXQgdGhlIHZlcnkgcm9vdCBvZiB0aGUgZG9jdW1lbnQuIEltYmEgZG9lcyBub3QgY2FwdHVyZSBhbGwgZXZlbnRzXG5ieSBkZWZhdWx0LCBzbyBpZiB5b3Ugd2FudCB0byBtYWtlIHN1cmUgZXhvdGljIG9yIGN1c3RvbSBET01FdmVudHMgYXJlIGRlbGVnYXRlZFxuaW4gSW1iYSB5b3Ugd2lsbCBuZWVkIHRvIHJlZ2lzdGVyIHRoZW0gaW4gYEltYmEuRXZlbnRzLnJlZ2lzdGVyKG15Q3VzdG9tRXZlbnROYW1lKWBcblxuQGluYW1lIG1hbmFnZXJcblxuIyMjXG5jbGFzcyBJbWJhLkV2ZW50TWFuYWdlclxuXG5cdHByb3Agcm9vdFxuXHRwcm9wIGNvdW50XG5cdHByb3AgZW5hYmxlZCBkZWZhdWx0OiBubywgd2F0Y2g6IHllc1xuXHRwcm9wIGxpc3RlbmVyc1xuXHRwcm9wIGRlbGVnYXRvcnNcblx0cHJvcCBkZWxlZ2F0b3Jcblx0XG5cdHZhciBpbml0aWFsQmluZCA9IFtdXG5cblx0ZGVmIGVuYWJsZWQtZGlkLXNldCBib29sXG5cdFx0Ym9vbCA/IG9uZW5hYmxlIDogb25kaXNhYmxlXG5cdFx0c2VsZlxuXHRcdFxuXHRkZWYgc2VsZi5iaW5kIG5hbWVcblx0XHRpZiBJbWJhLkV2ZW50c1xuXHRcdFx0SW1iYS5FdmVudHMuYXV0b3JlZ2lzdGVyKG5hbWUpXG5cdFx0ZWxpZiBpbml0aWFsQmluZC5pbmRleE9mKG5hbWUpID09IC0xIGFuZCBuYXRpdmUuaW5kZXhPZihuYW1lKSA+PSAwXG5cdFx0XHRpbml0aWFsQmluZC5wdXNoKG5hbWUpXG5cblx0ZGVmIHNlbGYuYWN0aXZhdGVcblx0XHRyZXR1cm4gSW1iYS5FdmVudHMgaWYgSW1iYS5FdmVudHNcblx0XHRJbWJhLkV2ZW50cyA9IEltYmEuRXZlbnRNYW5hZ2VyLm5ldyhJbWJhLmRvY3VtZW50LCBldmVudHM6IFtdKVxuXHRcdHJldHVybiB1bmxlc3MgJHdlYiRcblx0XHRcblx0XHRJbWJhLlBPSU5URVIgfHw9IEltYmEuUG9pbnRlci5uZXdcblxuXHRcdHZhciBoYXNUb3VjaEV2ZW50cyA9IHdpbmRvdyAmJiB3aW5kb3c6b250b3VjaHN0YXJ0ICE9PSB1bmRlZmluZWRcblxuXHRcdGlmIGhhc1RvdWNoRXZlbnRzXG5cdFx0XHRJbWJhLkV2ZW50cy5saXN0ZW4oOnRvdWNoc3RhcnQpIGRvIHxlfFxuXHRcdFx0XHRJbWJhLlRvdWNoLm9udG91Y2hzdGFydChlKVxuXG5cdFx0XHRJbWJhLkV2ZW50cy5saXN0ZW4oOnRvdWNobW92ZSkgZG8gfGV8XG5cdFx0XHRcdEltYmEuVG91Y2gub250b3VjaG1vdmUoZSlcblxuXHRcdFx0SW1iYS5FdmVudHMubGlzdGVuKDp0b3VjaGVuZCkgZG8gfGV8XG5cdFx0XHRcdEltYmEuVG91Y2gub250b3VjaGVuZChlKVxuXG5cdFx0XHRJbWJhLkV2ZW50cy5saXN0ZW4oOnRvdWNoY2FuY2VsKSBkbyB8ZXxcblx0XHRcdFx0SW1iYS5Ub3VjaC5vbnRvdWNoY2FuY2VsKGUpXG5cblx0XHRJbWJhLkV2ZW50cy5yZWdpc3Rlcig6Y2xpY2spIGRvIHxlfFxuXHRcdFx0IyBPbmx5IGZvciBtYWluIG1vdXNlYnV0dG9uLCBubz9cblx0XHRcdGlmIChlOnRpbWVTdGFtcCAtIEltYmEuVG91Y2guTGFzdFRpbWVzdGFtcCkgPiBJbWJhLlRvdWNoLlRhcFRpbWVvdXRcblx0XHRcdFx0ZS5AaW1iYVNpbXVsYXRlZFRhcCA9IHllc1xuXHRcdFx0XHR2YXIgdGFwID0gSW1iYS5FdmVudC5uZXcoZSlcblx0XHRcdFx0dGFwLnR5cGUgPSAndGFwJ1xuXHRcdFx0XHR0YXAucHJvY2Vzc1xuXHRcdFx0XHRpZiB0YXAuQHJlc3BvbmRlciBhbmQgdGFwOmRlZmF1bHRQcmV2ZW50ZWRcblx0XHRcdFx0XHRyZXR1cm4gZS5wcmV2ZW50RGVmYXVsdFxuXHRcdFx0IyBkZWxlZ2F0ZSB0aGUgcmVhbCBjbGljayBldmVudFxuXHRcdFx0SW1iYS5FdmVudHMuZGVsZWdhdGUoZSlcblxuXHRcdEltYmEuRXZlbnRzLmxpc3Rlbig6bW91c2Vkb3duKSBkbyB8ZXxcblx0XHRcdGlmIChlOnRpbWVTdGFtcCAtIEltYmEuVG91Y2guTGFzdFRpbWVzdGFtcCkgPiBJbWJhLlRvdWNoLlRhcFRpbWVvdXRcblx0XHRcdFx0SW1iYS5QT0lOVEVSLnVwZGF0ZShlKS5wcm9jZXNzIGlmIEltYmEuUE9JTlRFUlxuXG5cdFx0SW1iYS5FdmVudHMubGlzdGVuKDptb3VzZXVwKSBkbyB8ZXxcblx0XHRcdGlmIChlOnRpbWVTdGFtcCAtIEltYmEuVG91Y2guTGFzdFRpbWVzdGFtcCkgPiBJbWJhLlRvdWNoLlRhcFRpbWVvdXRcblx0XHRcdFx0SW1iYS5QT0lOVEVSLnVwZGF0ZShlKS5wcm9jZXNzIGlmIEltYmEuUE9JTlRFUlxuXG5cdFx0SW1iYS5FdmVudHMucmVnaXN0ZXIoWzptb3VzZWRvd24sOm1vdXNldXBdKVxuXHRcdEltYmEuRXZlbnRzLnJlZ2lzdGVyKGluaXRpYWxCaW5kKVxuXHRcdEltYmEuRXZlbnRzLmVuYWJsZWQgPSB5ZXNcblx0XHRyZXR1cm4gSW1iYS5FdmVudHNcblxuXG5cdGRlZiBpbml0aWFsaXplIG5vZGUsIGV2ZW50czogW11cblx0XHRAc2hpbUZvY3VzRXZlbnRzID0gJHdlYiQgJiYgd2luZG93Om5ldHNjYXBlICYmIG5vZGU6b25mb2N1c2luID09PSB1bmRlZmluZWRcblx0XHRyb290ID0gbm9kZVxuXHRcdGxpc3RlbmVycyA9IFtdXG5cdFx0ZGVsZWdhdG9ycyA9IHt9XG5cdFx0ZGVsZWdhdG9yID0gZG8gfGV8IFxuXHRcdFx0ZGVsZWdhdGUoZSlcblx0XHRcdHJldHVybiB0cnVlXG5cblx0XHRmb3IgZXZlbnQgaW4gZXZlbnRzXG5cdFx0XHRyZWdpc3RlcihldmVudClcblxuXHRcdHJldHVybiBzZWxmXG5cblx0IyMjXG5cblx0VGVsbCB0aGUgY3VycmVudCBFdmVudE1hbmFnZXIgdG8gaW50ZXJjZXB0IGFuZCBoYW5kbGUgZXZlbnQgb2YgYSBjZXJ0YWluIG5hbWUuXG5cdEJ5IGRlZmF1bHQsIEltYmEuRXZlbnRzIHdpbGwgcmVnaXN0ZXIgaW50ZXJjZXB0b3JzIGZvcjogKmtleWRvd24qLCAqa2V5dXAqLCBcblx0KmtleXByZXNzKiwgKnRleHRJbnB1dCosICppbnB1dCosICpjaGFuZ2UqLCAqc3VibWl0KiwgKmZvY3VzaW4qLCAqZm9jdXNvdXQqLCBcblx0KmJsdXIqLCAqY29udGV4dG1lbnUqLCAqZGJsY2xpY2sqLCAqbW91c2V3aGVlbCosICp3aGVlbCpcblxuXHQjIyNcblx0ZGVmIHJlZ2lzdGVyIG5hbWUsIGhhbmRsZXIgPSB0cnVlXG5cdFx0aWYgbmFtZSBpc2EgQXJyYXlcblx0XHRcdHJlZ2lzdGVyKHYsaGFuZGxlcikgZm9yIHYgaW4gbmFtZVxuXHRcdFx0cmV0dXJuIHNlbGZcblxuXHRcdHJldHVybiBzZWxmIGlmIGRlbGVnYXRvcnNbbmFtZV1cblx0XHRcblx0XHQjIGNvbnNvbGUubG9nKFwicmVnaXN0ZXIgZm9yIGV2ZW50IHtuYW1lfVwiKVxuXHRcdHZhciBmbiA9IGRlbGVnYXRvcnNbbmFtZV0gPSBoYW5kbGVyIGlzYSBGdW5jdGlvbiA/IGhhbmRsZXIgOiBkZWxlZ2F0b3Jcblx0XHRyb290LmFkZEV2ZW50TGlzdGVuZXIobmFtZSxmbix5ZXMpIGlmIGVuYWJsZWRcblx0XHRcblx0ZGVmIGF1dG9yZWdpc3RlciBuYW1lXG5cdFx0cmV0dXJuIHNlbGYgaWYgbmF0aXZlLmluZGV4T2YobmFtZSkgPT0gLTFcblx0XHRyZWdpc3RlcihuYW1lKVxuXG5cdGRlZiBsaXN0ZW4gbmFtZSwgaGFuZGxlciwgY2FwdHVyZSA9IHllc1xuXHRcdGxpc3RlbmVycy5wdXNoKFtuYW1lLGhhbmRsZXIsY2FwdHVyZV0pXG5cdFx0cm9vdC5hZGRFdmVudExpc3RlbmVyKG5hbWUsaGFuZGxlcixjYXB0dXJlKSBpZiBlbmFibGVkXG5cdFx0c2VsZlxuXG5cdGRlZiBkZWxlZ2F0ZSBlXG5cdFx0dmFyIGV2ZW50ID0gSW1iYS5FdmVudC53cmFwKGUpXG5cdFx0ZXZlbnQucHJvY2Vzc1xuXHRcdGlmIEBzaGltRm9jdXNFdmVudHNcblx0XHRcdGlmIGU6dHlwZSA9PSAnZm9jdXMnXG5cdFx0XHRcdEltYmEuRXZlbnQud3JhcChlKS5zZXRUeXBlKCdmb2N1c2luJykucHJvY2Vzc1xuXHRcdFx0ZWxpZiBlOnR5cGUgPT0gJ2JsdXInXG5cdFx0XHRcdEltYmEuRXZlbnQud3JhcChlKS5zZXRUeXBlKCdmb2N1c291dCcpLnByb2Nlc3Ncblx0XHRzZWxmXG5cblx0IyMjXG5cblx0Q3JlYXRlIGEgbmV3IEltYmEuRXZlbnRcblxuXHQjIyNcblx0ZGVmIGNyZWF0ZSB0eXBlLCB0YXJnZXQsIGRhdGE6IG51bGwsIHNvdXJjZTogbnVsbFxuXHRcdHZhciBldmVudCA9IEltYmEuRXZlbnQud3JhcCB0eXBlOiB0eXBlLCB0YXJnZXQ6IHRhcmdldFxuXHRcdGV2ZW50LmRhdGEgPSBkYXRhIGlmIGRhdGFcblx0XHRldmVudC5zb3VyY2UgPSBzb3VyY2UgaWYgc291cmNlXG5cdFx0ZXZlbnRcblxuXHQjIyNcblxuXHRUcmlnZ2VyIC8gcHJvY2VzcyBhbiBJbWJhLkV2ZW50LlxuXG5cdCMjI1xuXHRkZWYgdHJpZ2dlclxuXHRcdGNyZWF0ZSgqYXJndW1lbnRzKS5wcm9jZXNzXG5cblx0ZGVmIG9uZW5hYmxlXG5cdFx0Zm9yIG93biBuYW1lLGhhbmRsZXIgb2YgZGVsZWdhdG9yc1xuXHRcdFx0cm9vdC5hZGRFdmVudExpc3RlbmVyKG5hbWUsaGFuZGxlcix5ZXMpXG5cblx0XHRmb3IgaXRlbSBpbiBsaXN0ZW5lcnNcblx0XHRcdHJvb3QuYWRkRXZlbnRMaXN0ZW5lcihpdGVtWzBdLGl0ZW1bMV0saXRlbVsyXSlcblx0XHRcblx0XHRpZiAkd2ViJFxuXHRcdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2hhc2hjaGFuZ2UnLEltYmE6Y29tbWl0KVxuXHRcdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3BvcHN0YXRlJyxJbWJhOmNvbW1pdClcblx0XHRzZWxmXG5cblx0ZGVmIG9uZGlzYWJsZVxuXHRcdGZvciBvd24gbmFtZSxoYW5kbGVyIG9mIGRlbGVnYXRvcnNcblx0XHRcdHJvb3QucmVtb3ZlRXZlbnRMaXN0ZW5lcihuYW1lLGhhbmRsZXIseWVzKVxuXG5cdFx0Zm9yIGl0ZW0gaW4gbGlzdGVuZXJzXG5cdFx0XHRyb290LnJlbW92ZUV2ZW50TGlzdGVuZXIoaXRlbVswXSxpdGVtWzFdLGl0ZW1bMl0pXG5cdFx0XG5cdFx0aWYgJHdlYiRcblx0XHRcdHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdoYXNoY2hhbmdlJyxJbWJhOmNvbW1pdClcblx0XHRcdHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdwb3BzdGF0ZScsSW1iYTpjb21taXQpXG5cblx0XHRzZWxmIiwidmFyIEltYmEgPSByZXF1aXJlKFwiLi4vaW1iYVwiKVxuXG52YXIga2V5Q29kZXMgPSB7XG5cdGVzYzogMjcsXG5cdHRhYjogOSxcblx0ZW50ZXI6IDEzLFxuXHRzcGFjZTogMzIsXG5cdHVwOiAzOCxcblx0ZG93bjogNDBcbn1cblxudmFyIGVsID0gSW1iYS5UYWc6cHJvdG90eXBlXG5kZWYgZWwuc3RvcE1vZGlmaWVyIGUgZG8gZS5zdG9wIHx8IHRydWVcbmRlZiBlbC5wcmV2ZW50TW9kaWZpZXIgZSBkbyBlLnByZXZlbnQgfHwgdHJ1ZVxuZGVmIGVsLnNpbGVuY2VNb2RpZmllciBlIGRvIGUuc2lsZW5jZSB8fCB0cnVlXG5kZWYgZWwuYnViYmxlTW9kaWZpZXIgZSBkbyBlLmJ1YmJsZSh5ZXMpIHx8IHRydWVcbmRlZiBlbC5jdHJsTW9kaWZpZXIgZSBkbyBlLmV2ZW50OmN0cmxLZXkgPT0gdHJ1ZVxuZGVmIGVsLmFsdE1vZGlmaWVyIGUgZG8gZS5ldmVudDphbHRLZXkgPT0gdHJ1ZVxuZGVmIGVsLnNoaWZ0TW9kaWZpZXIgZSBkbyBlLmV2ZW50OnNoaWZ0S2V5ID09IHRydWVcbmRlZiBlbC5tZXRhTW9kaWZpZXIgZSBkbyBlLmV2ZW50Om1ldGFLZXkgPT0gdHJ1ZVxuZGVmIGVsLmtleU1vZGlmaWVyIGtleSwgZSBkbyBlLmtleUNvZGUgPyAoZS5rZXlDb2RlID09IGtleSkgOiB0cnVlXG5kZWYgZWwuZGVsTW9kaWZpZXIgZSBkbyBlLmtleUNvZGUgPyAoZS5rZXlDb2RlID09IDggb3IgZS5rZXlDb2RlID09IDQ2KSA6IHRydWVcbmRlZiBlbC5zZWxmTW9kaWZpZXIgZSBkbyBlLmV2ZW50OnRhcmdldCA9PSBAZG9tXG5kZWYgZWwubGVmdE1vZGlmaWVyIGUgZG8gZS5idXR0b24gIT0gdW5kZWZpbmVkID8gKGUuYnV0dG9uID09PSAwKSA6IGVsLmtleU1vZGlmaWVyKDM3LGUpXG5kZWYgZWwucmlnaHRNb2RpZmllciBlIGRvIGUuYnV0dG9uICE9IHVuZGVmaW5lZCA/IChlLmJ1dHRvbiA9PT0gMikgOiBlbC5rZXlNb2RpZmllcigzOSxlKVxuZGVmIGVsLm1pZGRsZU1vZGlmaWVyIGUgZG8gZS5idXR0b24gIT0gdW5kZWZpbmVkID8gKGUuYnV0dG9uID09PSAxKSA6IHRydWVcblx0XG5kZWYgZWwuZ2V0SGFuZGxlciBzdHIsIGV2ZW50XG5cdHJldHVybiBzZWxmIGlmIHNlbGZbc3RyXVxuXG4jIyNcbkltYmEgaGFuZGxlcyBhbGwgZXZlbnRzIGluIHRoZSBkb20gdGhyb3VnaCBhIHNpbmdsZSBtYW5hZ2VyLFxubGlzdGVuaW5nIGF0IHRoZSByb290IG9mIHlvdXIgZG9jdW1lbnQuIElmIEltYmEgZmluZHMgYSB0YWdcbnRoYXQgbGlzdGVucyB0byBhIGNlcnRhaW4gZXZlbnQsIHRoZSBldmVudCB3aWxsIGJlIHdyYXBwZWQgXG5pbiBhbiBgSW1iYS5FdmVudGAsIHdoaWNoIG5vcm1hbGl6ZXMgc29tZSBvZiB0aGUgcXVpcmtzIGFuZCBcbmJyb3dzZXIgZGlmZmVyZW5jZXMuXG5cbkBpbmFtZSBldmVudFxuIyMjXG5jbGFzcyBJbWJhLkV2ZW50XG5cblx0IyMjIHJlZmVyZW5jZSB0byB0aGUgbmF0aXZlIGV2ZW50ICMjI1xuXHRwcm9wIGV2ZW50XG5cblx0cHJvcCBwcmVmaXhcblx0XG5cdHByb3Agc291cmNlXG5cblx0cHJvcCBkYXRhXG5cblx0cHJvcCByZXNwb25kZXJcblxuXHRkZWYgc2VsZi53cmFwIGVcblx0XHRzZWxmLm5ldyhlKVxuXHRcblx0ZGVmIGluaXRpYWxpemUgZVxuXHRcdGV2ZW50ID0gZVxuXHRcdEBidWJibGUgPSB5ZXNcblxuXHRkZWYgdHlwZT0gdHlwZVxuXHRcdEB0eXBlID0gdHlwZVxuXHRcdHNlbGZcblxuXHQjIyNcblx0QHJldHVybiB7U3RyaW5nfSBUaGUgbmFtZSBvZiB0aGUgZXZlbnQgKGNhc2UtaW5zZW5zaXRpdmUpXG5cdCMjI1xuXHRkZWYgdHlwZSBkbyBAdHlwZSB8fCBldmVudDp0eXBlXG5cdGRlZiBuYXRpdmUgZG8gQGV2ZW50XG5cblx0ZGVmIG5hbWVcblx0XHRAbmFtZSB8fD0gdHlwZS50b0xvd2VyQ2FzZS5yZXBsYWNlKC9cXDovZywnJylcblxuXHQjIG1pbWMgZ2V0c2V0XG5cdGRlZiBidWJibGUgdlxuXHRcdGlmIHYgIT0gdW5kZWZpbmVkXG5cdFx0XHRzZWxmLmJ1YmJsZSA9IHZcblx0XHRcdHJldHVybiBzZWxmXG5cdFx0cmV0dXJuIEBidWJibGVcblxuXHRkZWYgYnViYmxlPSB2XG5cdFx0QGJ1YmJsZSA9IHZcblx0XHRyZXR1cm4gc2VsZlxuXG5cdCMjI1xuXHRQcmV2ZW50cyBmdXJ0aGVyIHByb3BhZ2F0aW9uIG9mIHRoZSBjdXJyZW50IGV2ZW50LlxuXHRAcmV0dXJuIHtzZWxmfVxuXHQjIyNcblx0ZGVmIHN0b3Bcblx0XHRidWJibGUgPSBub1xuXHRcdHNlbGZcblxuXHRkZWYgc3RvcFByb3BhZ2F0aW9uIGRvIHN0b3Bcblx0ZGVmIGhhbHQgZG8gc3RvcFxuXG5cdCMgbWlncmF0ZSBmcm9tIGNhbmNlbCB0byBwcmV2ZW50XG5cdGRlZiBwcmV2ZW50XG5cdFx0aWYgZXZlbnQ6cHJldmVudERlZmF1bHRcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0XG5cdFx0ZWxzZVxuXHRcdFx0ZXZlbnQ6ZGVmYXVsdFByZXZlbnRlZCA9IHllc1xuXHRcdHNlbGY6ZGVmYXVsdFByZXZlbnRlZCA9IHllc1xuXHRcdHNlbGZcblxuXHRkZWYgcHJldmVudERlZmF1bHRcblx0XHRjb25zb2xlLndhcm4gXCJFdmVudCNwcmV2ZW50RGVmYXVsdCBpcyBkZXByZWNhdGVkIC0gdXNlIEV2ZW50I3ByZXZlbnRcIlxuXHRcdHByZXZlbnRcblxuXHQjIyNcblx0SW5kaWNhdGVzIHdoZXRoZXIgb3Igbm90IGV2ZW50LmNhbmNlbCBoYXMgYmVlbiBjYWxsZWQuXG5cblx0QHJldHVybiB7Qm9vbGVhbn1cblx0IyMjXG5cdGRlZiBpc1ByZXZlbnRlZFxuXHRcdGV2ZW50IGFuZCBldmVudDpkZWZhdWx0UHJldmVudGVkXG5cblx0IyMjXG5cdENhbmNlbCB0aGUgZXZlbnQgKGlmIGNhbmNlbGFibGUpLiBJbiB0aGUgY2FzZSBvZiBuYXRpdmUgZXZlbnRzIGl0XG5cdHdpbGwgY2FsbCBgcHJldmVudERlZmF1bHRgIG9uIHRoZSB3cmFwcGVkIGV2ZW50IG9iamVjdC5cblx0QHJldHVybiB7c2VsZn1cblx0IyMjXG5cdGRlZiBjYW5jZWxcblx0XHRjb25zb2xlLndhcm4gXCJFdmVudCNjYW5jZWwgaXMgZGVwcmVjYXRlZCAtIHVzZSBFdmVudCNwcmV2ZW50XCJcblx0XHRwcmV2ZW50XG5cblx0ZGVmIHNpbGVuY2Vcblx0XHRAc2lsZW5jZWQgPSB5ZXNcblx0XHRzZWxmXG5cblx0ZGVmIGlzU2lsZW5jZWRcblx0XHQhIUBzaWxlbmNlZFxuXG5cdCMjI1xuXHRBIHJlZmVyZW5jZSB0byB0aGUgaW5pdGlhbCB0YXJnZXQgb2YgdGhlIGV2ZW50LlxuXHQjIyNcblx0ZGVmIHRhcmdldFxuXHRcdHRhZyhldmVudDpfdGFyZ2V0IG9yIGV2ZW50OnRhcmdldClcblxuXHQjIyNcblx0QSByZWZlcmVuY2UgdG8gdGhlIG9iamVjdCByZXNwb25kaW5nIHRvIHRoZSBldmVudC5cblx0IyMjXG5cdGRlZiByZXNwb25kZXJcblx0XHRAcmVzcG9uZGVyXG5cblx0IyMjXG5cdFJlZGlyZWN0IHRoZSBldmVudCB0byBuZXcgdGFyZ2V0XG5cdCMjI1xuXHRkZWYgcmVkaXJlY3Qgbm9kZVxuXHRcdEByZWRpcmVjdCA9IG5vZGVcblx0XHRzZWxmXG5cdFx0XG5cdGRlZiBwcm9jZXNzSGFuZGxlcnMgbm9kZSwgaGFuZGxlcnNcblx0XHRsZXQgaSA9IDFcblx0XHRsZXQgbCA9IGhhbmRsZXJzOmxlbmd0aFxuXHRcdGxldCBidWJibGUgPSBAYnViYmxlXG5cdFx0bGV0IHN0YXRlID0gaGFuZGxlcnM6c3RhdGUgfHw9IHt9XG5cdFx0bGV0IHJlc3VsdCBcblx0XHRcblx0XHRpZiBidWJibGVcblx0XHRcdEBidWJibGUgPSAxXG5cblx0XHR3aGlsZSBpIDwgbFxuXHRcdFx0bGV0IGlzTW9kID0gZmFsc2Vcblx0XHRcdGxldCBoYW5kbGVyID0gaGFuZGxlcnNbaSsrXVxuXHRcdFx0bGV0IHBhcmFtcyAgPSBudWxsXG5cdFx0XHRsZXQgY29udGV4dCA9IG5vZGVcblx0XHRcdFxuXHRcdFx0aWYgaGFuZGxlciBpc2EgQXJyYXlcblx0XHRcdFx0cGFyYW1zID0gaGFuZGxlci5zbGljZSgxKVxuXHRcdFx0XHRoYW5kbGVyID0gaGFuZGxlclswXVxuXHRcdFx0XG5cdFx0XHRpZiB0eXBlb2YgaGFuZGxlciA9PSAnc3RyaW5nJ1xuXHRcdFx0XHRpZiBrZXlDb2Rlc1toYW5kbGVyXVxuXHRcdFx0XHRcdHBhcmFtcyA9IFtrZXlDb2Rlc1toYW5kbGVyXV1cblx0XHRcdFx0XHRoYW5kbGVyID0gJ2tleSdcblx0XHRcdFx0XHRcblx0XHRcdFx0bGV0IG1vZCA9IGhhbmRsZXIgKyAnTW9kaWZpZXInXG5cblx0XHRcdFx0aWYgbm9kZVttb2RdXG5cdFx0XHRcdFx0aXNNb2QgPSB5ZXNcblx0XHRcdFx0XHRwYXJhbXMgPSAocGFyYW1zIG9yIFtdKS5jb25jYXQoW3NlbGYsc3RhdGVdKVxuXHRcdFx0XHRcdGhhbmRsZXIgPSBub2RlW21vZF1cblx0XHRcdFxuXHRcdFx0IyBpZiBpdCBpcyBzdGlsbCBhIHN0cmluZyAtIGNhbGwgZ2V0SGFuZGxlciBvblxuXHRcdFx0IyBhbmNlc3RvciBvZiBub2RlIHRvIHNlZSBpZiB3ZSBnZXQgYSBoYW5kbGVyIGZvciB0aGlzIG5hbWVcblx0XHRcdGlmIHR5cGVvZiBoYW5kbGVyID09ICdzdHJpbmcnXG5cdFx0XHRcdGxldCBlbCA9IG5vZGVcblx0XHRcdFx0bGV0IGZuID0gbnVsbFxuXHRcdFx0XHRsZXQgY3R4ID0gc3RhdGU6Y29udGV4dFxuXHRcblx0XHRcdFx0aWYgY3R4XG5cdFx0XHRcdFx0aWYgY3R4OmdldEhhbmRsZXIgaXNhIEZ1bmN0aW9uXG5cdFx0XHRcdFx0XHRjdHggPSBjdHguZ2V0SGFuZGxlcihoYW5kbGVyLHNlbGYpXG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0aWYgY3R4W2hhbmRsZXJdIGlzYSBGdW5jdGlvblxuXHRcdFx0XHRcdFx0aGFuZGxlciA9IGZuID0gY3R4W2hhbmRsZXJdXG5cdFx0XHRcdFx0XHRjb250ZXh0ID0gY3R4XG5cblx0XHRcdFx0dW5sZXNzIGZuXG5cdFx0XHRcdFx0Y29uc29sZS53YXJuIFwiZXZlbnQge3R5cGV9OiBjb3VsZCBub3QgZmluZCAne2hhbmRsZXJ9JyBpbiBjb250ZXh0XCIsY3R4XG5cblx0XHRcdFx0IyB3aGlsZSBlbCBhbmQgKCFmbiBvciAhKGZuIGlzYSBGdW5jdGlvbikpXG5cdFx0XHRcdCMgXHRpZiBmbiA9IGVsLmdldEhhbmRsZXIoaGFuZGxlcilcblx0XHRcdFx0IyBcdFx0aWYgZm5baGFuZGxlcl0gaXNhIEZ1bmN0aW9uXG5cdFx0XHRcdCMgXHRcdFx0aGFuZGxlciA9IGZuW2hhbmRsZXJdXG5cdFx0XHRcdCMgXHRcdFx0Y29udGV4dCA9IGZuXG5cdFx0XHRcdCMgXHRcdGVsaWYgZm4gaXNhIEZ1bmN0aW9uXG5cdFx0XHRcdCMgXHRcdFx0aGFuZGxlciA9IGZuXG5cdFx0XHRcdCMgXHRcdFx0Y29udGV4dCA9IGVsXG5cdFx0XHRcdCMgXHRlbHNlXG5cdFx0XHRcdCMgXHRcdGVsID0gZWwucGFyZW50XG5cdFx0XHRcdFx0XG5cdFx0XHRpZiBoYW5kbGVyIGlzYSBGdW5jdGlvblxuXHRcdFx0XHQjIHdoYXQgaWYgd2UgYWN0dWFsbHkgY2FsbCBzdG9wIGluc2lkZSBmdW5jdGlvbj9cblx0XHRcdFx0IyBkbyB3ZSBzdGlsbCB3YW50IHRvIGNvbnRpbnVlIHRoZSBjaGFpbj9cblx0XHRcdFx0bGV0IHJlcyA9IGhhbmRsZXIuYXBwbHkoY29udGV4dCxwYXJhbXMgb3IgW3NlbGZdKVxuXG5cdFx0XHRcdGlmICFpc01vZFxuXHRcdFx0XHRcdEByZXNwb25kZXIgfHw9IG5vZGVcblxuXHRcdFx0XHRpZiByZXMgPT0gZmFsc2Vcblx0XHRcdFx0XHQjIGNvbnNvbGUubG9nIFwicmV0dXJuZWQgZmFsc2UgLSBicmVha2luZ1wiXG5cdFx0XHRcdFx0YnJlYWtcblxuXHRcdFx0XHRpZiByZXMgYW5kICFAc2lsZW5jZWQgYW5kIHJlczp0aGVuIGlzYSBGdW5jdGlvblxuXHRcdFx0XHRcdHJlcy50aGVuKEltYmE6Y29tbWl0KVxuXHRcdFxuXHRcdCMgaWYgd2UgaGF2ZW50IHN0b3BwZWQgb3IgZGVhbHQgd2l0aCBidWJibGUgd2hpbGUgaGFuZGxpbmdcblx0XHRpZiBAYnViYmxlID09PSAxXG5cdFx0XHRAYnViYmxlID0gYnViYmxlXG5cblx0XHRyZXR1cm4gbnVsbFxuXG5cdGRlZiBwcm9jZXNzXG5cdFx0dmFyIG5hbWUgPSBzZWxmLm5hbWVcblx0XHR2YXIgbWV0aCA9IFwib257QHByZWZpeCBvciAnJ317bmFtZX1cIlxuXHRcdHZhciBhcmdzID0gbnVsbFxuXHRcdHZhciBkb210YXJnZXQgPSBldmVudDpfdGFyZ2V0IG9yIGV2ZW50OnRhcmdldFx0XHRcblx0XHR2YXIgZG9tbm9kZSA9IGRvbXRhcmdldDpfcmVzcG9uZGVyIG9yIGRvbXRhcmdldFxuXHRcdCMgQHRvZG8gbmVlZCB0byBzdG9wIGluZmluaXRlIHJlZGlyZWN0LXJ1bGVzIGhlcmVcblx0XHR2YXIgcmVzdWx0XG5cdFx0dmFyIGhhbmRsZXJzXG5cblx0XHR3aGlsZSBkb21ub2RlXG5cdFx0XHRAcmVkaXJlY3QgPSBudWxsXG5cdFx0XHRsZXQgbm9kZSA9IGRvbW5vZGUuQGRvbSA/IGRvbW5vZGUgOiBkb21ub2RlLkB0YWdcblxuXHRcdFx0aWYgbm9kZVxuXHRcdFx0XHRpZiBoYW5kbGVycyA9IG5vZGU6X29uX1xuXHRcdFx0XHRcdGZvciBoYW5kbGVyIGluIGhhbmRsZXJzIHdoZW4gaGFuZGxlclxuXHRcdFx0XHRcdFx0bGV0IGhuYW1lID0gaGFuZGxlclswXVxuXHRcdFx0XHRcdFx0aWYgbmFtZSA9PSBoYW5kbGVyWzBdIGFuZCBidWJibGVcblx0XHRcdFx0XHRcdFx0cHJvY2Vzc0hhbmRsZXJzKG5vZGUsaGFuZGxlcilcblx0XHRcdFx0XHRicmVhayB1bmxlc3MgYnViYmxlXG5cblx0XHRcdFx0aWYgYnViYmxlIGFuZCBub2RlW21ldGhdIGlzYSBGdW5jdGlvblxuXHRcdFx0XHRcdEByZXNwb25kZXIgfHw9IG5vZGVcblx0XHRcdFx0XHRAc2lsZW5jZWQgPSBub1xuXHRcdFx0XHRcdHJlc3VsdCA9IGFyZ3MgPyBub2RlW21ldGhdLmFwcGx5KG5vZGUsYXJncykgOiBub2RlW21ldGhdKHNlbGYsZGF0YSlcblxuXHRcdFx0XHRpZiBub2RlOm9uZXZlbnRcblx0XHRcdFx0XHRub2RlLm9uZXZlbnQoc2VsZilcblxuXHRcdFx0IyBhZGQgbm9kZS5uZXh0RXZlbnRSZXNwb25kZXIgYXMgYSBzZXBhcmF0ZSBtZXRob2QgaGVyZT9cblx0XHRcdHVubGVzcyBidWJibGUgYW5kIGRvbW5vZGUgPSAoQHJlZGlyZWN0IG9yIChub2RlID8gbm9kZS5wYXJlbnQgOiBkb21ub2RlOnBhcmVudE5vZGUpKVxuXHRcdFx0XHRicmVha1xuXG5cdFx0cHJvY2Vzc2VkXG5cblx0XHQjIGlmIGEgaGFuZGxlciByZXR1cm5zIGEgcHJvbWlzZSwgbm90aWZ5IHNjaGVkdWxlcnNcblx0XHQjIGFib3V0IHRoaXMgYWZ0ZXIgcHJvbWlzZSBoYXMgZmluaXNoZWQgcHJvY2Vzc2luZ1xuXHRcdGlmIHJlc3VsdCBhbmQgcmVzdWx0OnRoZW4gaXNhIEZ1bmN0aW9uXG5cdFx0XHRyZXN1bHQudGhlbihzZWxmOnByb2Nlc3NlZC5iaW5kKHNlbGYpKVxuXHRcdHJldHVybiBzZWxmXG5cblxuXHRkZWYgcHJvY2Vzc2VkXG5cdFx0aWYgIUBzaWxlbmNlZCBhbmQgQHJlc3BvbmRlclxuXHRcdFx0SW1iYS5lbWl0KEltYmEsJ2V2ZW50Jyxbc2VsZl0pXG5cdFx0XHRJbWJhLmNvbW1pdChldmVudClcblx0XHRzZWxmXG5cblx0IyMjXG5cdFJldHVybiB0aGUgeC9sZWZ0IGNvb3JkaW5hdGUgb2YgdGhlIG1vdXNlIC8gcG9pbnRlciBmb3IgdGhpcyBldmVudFxuXHRAcmV0dXJuIHtOdW1iZXJ9IHggY29vcmRpbmF0ZSBvZiBtb3VzZSAvIHBvaW50ZXIgZm9yIGV2ZW50XG5cdCMjI1xuXHRkZWYgeCBkbyBuYXRpdmU6eFxuXG5cdCMjI1xuXHRSZXR1cm4gdGhlIHkvdG9wIGNvb3JkaW5hdGUgb2YgdGhlIG1vdXNlIC8gcG9pbnRlciBmb3IgdGhpcyBldmVudFxuXHRAcmV0dXJuIHtOdW1iZXJ9IHkgY29vcmRpbmF0ZSBvZiBtb3VzZSAvIHBvaW50ZXIgZm9yIGV2ZW50XG5cdCMjI1xuXHRkZWYgeSBkbyBuYXRpdmU6eVxuXHRcdFxuXHRkZWYgYnV0dG9uIGRvIG5hdGl2ZTpidXR0b25cblx0ZGVmIGtleUNvZGUgZG8gbmF0aXZlOmtleUNvZGVcblx0ZGVmIGN0cmwgZG8gbmF0aXZlOmN0cmxLZXlcblx0ZGVmIGFsdCBkbyBuYXRpdmU6YWx0S2V5XG5cdGRlZiBzaGlmdCBkbyBuYXRpdmU6c2hpZnRLZXlcblx0ZGVmIG1ldGEgZG8gbmF0aXZlOm1ldGFLZXlcblx0ZGVmIGtleSBkbyBuYXRpdmU6a2V5XG5cblx0IyMjXG5cdFJldHVybnMgYSBOdW1iZXIgcmVwcmVzZW50aW5nIGEgc3lzdGVtIGFuZCBpbXBsZW1lbnRhdGlvblxuXHRkZXBlbmRlbnQgbnVtZXJpYyBjb2RlIGlkZW50aWZ5aW5nIHRoZSB1bm1vZGlmaWVkIHZhbHVlIG9mIHRoZVxuXHRwcmVzc2VkIGtleTsgdGhpcyBpcyB1c3VhbGx5IHRoZSBzYW1lIGFzIGtleUNvZGUuXG5cblx0Rm9yIG1vdXNlLWV2ZW50cywgdGhlIHJldHVybmVkIHZhbHVlIGluZGljYXRlcyB3aGljaCBidXR0b24gd2FzXG5cdHByZXNzZWQgb24gdGhlIG1vdXNlIHRvIHRyaWdnZXIgdGhlIGV2ZW50LlxuXG5cdEByZXR1cm4ge051bWJlcn1cblx0IyMjXG5cdGRlZiB3aGljaCBkbyBldmVudDp3aGljaFxuXG4iLCJ2YXIgSW1iYSA9IHJlcXVpcmUoXCIuLi9pbWJhXCIpXG5cbnRhZyBmcmFnbWVudCA8IGVsZW1lbnRcblx0ZGVmIHNlbGYuY3JlYXRlTm9kZVxuXHRcdEltYmEuZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudFxuXG5leHRlbmQgdGFnIGh0bWxcblx0ZGVmIHBhcmVudFxuXHRcdG51bGxcblxuZXh0ZW5kIHRhZyBjYW52YXNcblx0ZGVmIGNvbnRleHQgdHlwZSA9ICcyZCdcblx0XHRkb20uZ2V0Q29udGV4dCh0eXBlKVxuXG5jbGFzcyBEYXRhUHJveHlcdFxuXHRkZWYgc2VsZi5iaW5kIHJlY2VpdmVyLCBkYXRhLCBwYXRoLCBhcmdzXG5cdFx0bGV0IHByb3h5ID0gcmVjZWl2ZXIuQGRhdGEgfHw9IHNlbGYubmV3KHJlY2VpdmVyLHBhdGgsYXJncylcblx0XHRwcm94eS5iaW5kKGRhdGEscGF0aCxhcmdzKVxuXHRcdHJldHVybiByZWNlaXZlclxuXG5cdGRlZiBpbml0aWFsaXplIG5vZGUsIHBhdGgsIGFyZ3Ncblx0XHRAbm9kZSA9IG5vZGVcblx0XHRAcGF0aCA9IHBhdGhcblx0XHRAYXJncyA9IGFyZ3Ncblx0XHRAc2V0dGVyID0gSW1iYS50b1NldHRlcihAcGF0aCkgaWYgQGFyZ3Ncblx0XHRcblx0ZGVmIGJpbmQgZGF0YSwga2V5LCBhcmdzXG5cdFx0aWYgZGF0YSAhPSBAZGF0YVxuXHRcdFx0QGRhdGEgPSBkYXRhXG5cdFx0c2VsZlxuXHRcdFxuXHRkZWYgZ2V0Rm9ybVZhbHVlXG5cdFx0QHNldHRlciA/IEBkYXRhW0BwYXRoXSgpIDogQGRhdGFbQHBhdGhdXG5cblx0ZGVmIHNldEZvcm1WYWx1ZSB2YWx1ZVxuXHRcdEBzZXR0ZXIgPyBAZGF0YVtAc2V0dGVyXSh2YWx1ZSkgOiAoQGRhdGFbQHBhdGhdID0gdmFsdWUpXG5cblxudmFyIGlzQXJyYXkgPSBkbyB8dmFsfFxuXHR2YWwgYW5kIHZhbDpzcGxpY2UgYW5kIHZhbDpzb3J0XG5cbnZhciBpc1NpbWlsYXJBcnJheSA9IGRvIHxhLGJ8XG5cdGxldCBsID0gYTpsZW5ndGgsIGkgPSAwXG5cdHJldHVybiBubyB1bmxlc3MgbCA9PSBiOmxlbmd0aFxuXHR3aGlsZSBpKysgPCBsXG5cdFx0cmV0dXJuIG5vIGlmIGFbaV0gIT0gYltpXVxuXHRyZXR1cm4geWVzXG5cbmV4dGVuZCB0YWcgaW5wdXRcblx0cHJvcCBsYXp5XG5cdHByb3AgbnVtYmVyXG5cblx0ZGVmIGJpbmREYXRhIHRhcmdldCwgcGF0aCwgYXJnc1xuXHRcdERhdGFQcm94eS5iaW5kKHNlbGYsdGFyZ2V0LHBhdGgsYXJncylcblx0XHRzZWxmXG5cblx0ZGVmIGNoZWNrZWRcblx0XHRAZG9tOmNoZWNrZWRcblx0XHRcblx0ZGVmIHNldENoZWNrZWQgdmFsdWVcblx0XHRpZiAhIXZhbHVlICE9IEBkb206Y2hlY2tlZFxuXHRcdFx0QGRvbTpjaGVja2VkID0gISF2YWx1ZVxuXHRcdHNlbGZcblx0XHRcblx0ZGVmIHNldFZhbHVlIHZhbHVlLCBzb3VyY2Vcblx0XHRpZiBAbG9jYWxWYWx1ZSA9PSB1bmRlZmluZWQgb3Igc291cmNlID09IHVuZGVmaW5lZFxuXHRcdFx0ZG9tOnZhbHVlID0gQHZhbHVlID0gdmFsdWVcblx0XHRcdEBsb2NhbFZhbHVlID0gdW5kZWZpbmVkXG5cdFx0c2VsZlxuXHRcblx0ZGVmIHNldFR5cGUgdmFsdWVcblx0XHRkb206dHlwZSA9IEB0eXBlID0gdmFsdWVcblx0XHRzZWxmXG5cdFx0XG5cdGRlZiB2YWx1ZVxuXHRcdGxldCB2YWwgPSBAZG9tOnZhbHVlXG5cdFx0QG51bWJlciBhbmQgdmFsID8gcGFyc2VGbG9hdCh2YWwpIDogdmFsXG5cblx0ZGVmIG9uaW5wdXQgZVxuXHRcdGxldCB2YWwgPSBAZG9tOnZhbHVlXG5cdFx0QGxvY2FsVmFsdWUgPSB2YWxcblx0XHRpZiBAZGF0YSBhbmQgIWxhenkgYW5kIHR5cGUgIT0gJ3JhZGlvJyBhbmQgdHlwZSAhPSAnY2hlY2tib3gnXG5cdFx0XHRAZGF0YS5zZXRGb3JtVmFsdWUodmFsdWUsc2VsZilcblx0XHRyZXR1cm5cblxuXHRkZWYgb25jaGFuZ2UgZVxuXHRcdEBtb2RlbFZhbHVlID0gQGxvY2FsVmFsdWUgPSB1bmRlZmluZWRcblx0XHRyZXR1cm4gdW5sZXNzIGRhdGFcblx0XHRcblx0XHRpZiB0eXBlID09ICdyYWRpbycgb3IgdHlwZSA9PSAnY2hlY2tib3gnXG5cdFx0XHRsZXQgY2hlY2tlZCA9IHNlbGYuY2hlY2tlZFxuXHRcdFx0bGV0IG12YWwgPSBAZGF0YS5nZXRGb3JtVmFsdWUoc2VsZilcblx0XHRcdGxldCBkdmFsID0gQHZhbHVlICE9IHVuZGVmaW5lZCA/IEB2YWx1ZSA6IHZhbHVlXG5cblx0XHRcdGlmIHR5cGUgPT0gJ3JhZGlvJ1xuXHRcdFx0XHRAZGF0YS5zZXRGb3JtVmFsdWUoZHZhbCxzZWxmKVxuXHRcdFx0ZWxpZiBkb206dmFsdWUgPT0gJ29uJyBvciBkb206dmFsdWUgPT0gdW5kZWZpbmVkXG5cdFx0XHRcdEBkYXRhLnNldEZvcm1WYWx1ZSghIWNoZWNrZWQsc2VsZilcblx0XHRcdGVsaWYgaXNBcnJheShtdmFsKVxuXHRcdFx0XHRsZXQgaWR4ID0gbXZhbC5pbmRleE9mKGR2YWwpXG5cdFx0XHRcdGlmIGNoZWNrZWQgYW5kIGlkeCA9PSAtMVxuXHRcdFx0XHRcdG12YWwucHVzaChkdmFsKVxuXHRcdFx0XHRlbGlmICFjaGVja2VkIGFuZCBpZHggPj0gMFxuXHRcdFx0XHRcdG12YWwuc3BsaWNlKGlkeCwxKVxuXHRcdFx0ZWxzZVxuXHRcdFx0XHRAZGF0YS5zZXRGb3JtVmFsdWUoZHZhbCxzZWxmKVxuXHRcdGVsc2Vcblx0XHRcdEBkYXRhLnNldEZvcm1WYWx1ZSh2YWx1ZSlcblx0XHRcdFxuXHRkZWYgb25ibHVyIGVcblx0XHRAbG9jYWxWYWx1ZSA9IHVuZGVmaW5lZFxuXHRcblx0IyBvdmVycmlkaW5nIGVuZCBkaXJlY3RseSBmb3IgcGVyZm9ybWFuY2Vcblx0ZGVmIGVuZFxuXHRcdGlmIEBsb2NhbFZhbHVlICE9PSB1bmRlZmluZWQgb3IgIUBkYXRhXG5cdFx0XHRyZXR1cm4gc2VsZlxuXG5cdFx0bGV0IG12YWwgPSBAZGF0YS5nZXRGb3JtVmFsdWUoc2VsZilcblx0XHRyZXR1cm4gc2VsZiBpZiBtdmFsID09IEBtb2RlbFZhbHVlXG5cdFx0QG1vZGVsVmFsdWUgPSBtdmFsIHVubGVzcyBpc0FycmF5KG12YWwpXG5cblx0XHRpZiB0eXBlID09ICdyYWRpbycgb3IgdHlwZSA9PSAnY2hlY2tib3gnXG5cdFx0XHRsZXQgZHZhbCA9IEB2YWx1ZVxuXHRcdFx0bGV0IGNoZWNrZWQgPSBpZiBpc0FycmF5KG12YWwpXG5cdFx0XHRcdG12YWwuaW5kZXhPZihkdmFsKSA+PSAwXG5cdFx0XHRlbGlmIGRvbTp2YWx1ZSA9PSAnb24nIG9yIGRvbTp2YWx1ZSA9PSB1bmRlZmluZWRcblx0XHRcdFx0ISFtdmFsXG5cdFx0XHRlbHNlXG5cdFx0XHRcdG12YWwgPT0gQHZhbHVlXG5cblx0XHRcdHNlbGYuY2hlY2tlZCA9IGNoZWNrZWRcblx0XHRlbHNlXG5cdFx0XHRAZG9tOnZhbHVlID0gbXZhbFxuXHRcdHNlbGZcblxuZXh0ZW5kIHRhZyB0ZXh0YXJlYVxuXHRwcm9wIGxhenlcblxuXHRkZWYgYmluZERhdGEgdGFyZ2V0LCBwYXRoLCBhcmdzXG5cdFx0RGF0YVByb3h5LmJpbmQoc2VsZix0YXJnZXQscGF0aCxhcmdzKVxuXHRcdHNlbGZcblx0XG5cdGRlZiBzZXRWYWx1ZSB2YWx1ZSwgc291cmNlXG5cdFx0aWYgQGxvY2FsVmFsdWUgPT0gdW5kZWZpbmVkIG9yIHNvdXJjZSA9PSB1bmRlZmluZWRcblx0XHRcdGRvbTp2YWx1ZSA9IHZhbHVlXG5cdFx0XHRAbG9jYWxWYWx1ZSA9IHVuZGVmaW5lZFxuXHRcdHJldHVybiBzZWxmXG5cdFxuXHRkZWYgb25pbnB1dCBlXG5cdFx0bGV0IHZhbCA9IEBkb206dmFsdWVcblx0XHRAbG9jYWxWYWx1ZSA9IHZhbFxuXHRcdEBkYXRhLnNldEZvcm1WYWx1ZSh2YWx1ZSxzZWxmKSBpZiBAZGF0YSBhbmQgIWxhenlcblxuXHRkZWYgb25jaGFuZ2UgZVxuXHRcdEBsb2NhbFZhbHVlID0gdW5kZWZpbmVkXG5cdFx0QGRhdGEuc2V0Rm9ybVZhbHVlKHZhbHVlLHNlbGYpIGlmIEBkYXRhXG5cdFx0XG5cdGRlZiBvbmJsdXIgZVxuXHRcdEBsb2NhbFZhbHVlID0gdW5kZWZpbmVkXG5cblx0ZGVmIHJlbmRlclxuXHRcdHJldHVybiBpZiBAbG9jYWxWYWx1ZSAhPSB1bmRlZmluZWQgb3IgIUBkYXRhXG5cdFx0aWYgQGRhdGFcblx0XHRcdGxldCBkdmFsID0gQGRhdGEuZ2V0Rm9ybVZhbHVlKHNlbGYpXG5cdFx0XHRAZG9tOnZhbHVlID0gZHZhbCAhPSB1bmRlZmluZWQgPyBkdmFsIDogJydcblx0XHRzZWxmXG5cbmV4dGVuZCB0YWcgb3B0aW9uXG5cdGRlZiBzZXRWYWx1ZSB2YWx1ZVxuXHRcdGlmIHZhbHVlICE9IEB2YWx1ZVxuXHRcdFx0ZG9tOnZhbHVlID0gQHZhbHVlID0gdmFsdWVcblx0XHRzZWxmXG5cblx0ZGVmIHZhbHVlXG5cdFx0QHZhbHVlIG9yIGRvbTp2YWx1ZVxuXG5leHRlbmQgdGFnIHNlbGVjdFxuXHRkZWYgYmluZERhdGEgdGFyZ2V0LCBwYXRoLCBhcmdzXG5cdFx0RGF0YVByb3h5LmJpbmQoc2VsZix0YXJnZXQscGF0aCxhcmdzKVxuXHRcdHNlbGZcblxuXHRkZWYgc2V0VmFsdWUgdmFsdWUsIHN5bmNpbmdcblx0XHRsZXQgcHJldiA9IEB2YWx1ZVxuXHRcdEB2YWx1ZSA9IHZhbHVlXG5cdFx0c3luY1ZhbHVlKHZhbHVlKSB1bmxlc3Mgc3luY2luZ1xuXHRcdHJldHVybiBzZWxmXG5cdFx0XG5cdGRlZiBzeW5jVmFsdWUgdmFsdWVcblx0XHRsZXQgcHJldiA9IEBzeW5jVmFsdWVcblx0XHQjIGNoZWNrIGlmIHZhbHVlIGhhcyBjaGFuZ2VkXG5cdFx0aWYgbXVsdGlwbGUgYW5kIHZhbHVlIGlzYSBBcnJheVxuXHRcdFx0aWYgcHJldiBpc2EgQXJyYXkgYW5kIGlzU2ltaWxhckFycmF5KHByZXYsdmFsdWUpXG5cdFx0XHRcdHJldHVybiBzZWxmXG5cdFx0XHQjIGNyZWF0ZSBhIGNvcHkgZm9yIHN5bmNWYWx1ZVxuXHRcdFx0dmFsdWUgPSB2YWx1ZS5zbGljZVxuXG5cdFx0QHN5bmNWYWx1ZSA9IHZhbHVlXG5cdFx0IyBzdXBwb3J0IGFycmF5IGZvciBtdWx0aXBsZT9cblx0XHRpZiB0eXBlb2YgdmFsdWUgPT0gJ29iamVjdCdcblx0XHRcdGxldCBtdWx0ID0gbXVsdGlwbGUgYW5kIHZhbHVlIGlzYSBBcnJheVxuXHRcdFx0XG5cdFx0XHRmb3Igb3B0LGkgaW4gZG9tOm9wdGlvbnNcblx0XHRcdFx0bGV0IG92YWwgPSAob3B0LkB0YWcgPyBvcHQuQHRhZy52YWx1ZSA6IG9wdDp2YWx1ZSlcblx0XHRcdFx0aWYgbXVsdFxuXHRcdFx0XHRcdG9wdDpzZWxlY3RlZCA9IHZhbHVlLmluZGV4T2Yob3ZhbCkgPj0gMFxuXHRcdFx0XHRlbGlmIHZhbHVlID09IG92YWxcblx0XHRcdFx0XHRkb206c2VsZWN0ZWRJbmRleCA9IGlcblx0XHRcdFx0XHRicmVha1xuXHRcdGVsc2Vcblx0XHRcdGRvbTp2YWx1ZSA9IHZhbHVlXG5cdFx0c2VsZlxuXHRcdFxuXHRkZWYgdmFsdWVcblx0XHRpZiBtdWx0aXBsZVxuXHRcdFx0Zm9yIG9wdGlvbiBpbiBkb206c2VsZWN0ZWRPcHRpb25zXG5cdFx0XHRcdG9wdGlvbi5AdGFnID8gb3B0aW9uLkB0YWcudmFsdWUgOiBvcHRpb246dmFsdWVcblx0XHRlbHNlXG5cdFx0XHRsZXQgb3B0ID0gZG9tOnNlbGVjdGVkT3B0aW9uc1swXVxuXHRcdFx0b3B0ID8gKG9wdC5AdGFnID8gb3B0LkB0YWcudmFsdWUgOiBvcHQ6dmFsdWUpIDogbnVsbFxuXHRcblx0ZGVmIG9uY2hhbmdlIGVcblx0XHRAZGF0YS5zZXRGb3JtVmFsdWUodmFsdWUsc2VsZikgaWYgQGRhdGFcblx0XHRcblx0ZGVmIGVuZFxuXHRcdGlmIEBkYXRhXG5cdFx0XHRzZXRWYWx1ZShAZGF0YS5nZXRGb3JtVmFsdWUoc2VsZiksMSlcblxuXHRcdGlmIEB2YWx1ZSAhPSBAc3luY1ZhbHVlXG5cdFx0XHRzeW5jVmFsdWUoQHZhbHVlKVxuXHRcdHNlbGYiLCJ2YXIgSW1iYSA9IHJlcXVpcmUoXCIuLi9pbWJhXCIpXG5cbnJlcXVpcmUgJy4vbWFuYWdlcidcbnJlcXVpcmUgJy4vZXZlbnQtbWFuYWdlcidcblxuSW1iYS5UYWdNYW5hZ2VyID0gSW1iYS5UYWdNYW5hZ2VyQ2xhc3MubmV3XG5cbnJlcXVpcmUgJy4vdGFnJ1xucmVxdWlyZSAnLi9odG1sJ1xucmVxdWlyZSAnLi9wb2ludGVyJ1xucmVxdWlyZSAnLi90b3VjaCdcbnJlcXVpcmUgJy4vZXZlbnQnXG5cbmlmICR3ZWIkXG5cdHJlcXVpcmUgJy4vcmVjb25jaWxlcidcblxuaWYgJG5vZGUkXG5cdHJlcXVpcmUgJy4vc2VydmVyJyIsInZhciBJbWJhID0gcmVxdWlyZShcIi4uL2ltYmFcIilcblxuY2xhc3MgSW1iYS5UYWdNYW5hZ2VyQ2xhc3Ncblx0ZGVmIGluaXRpYWxpemVcblx0XHRAaW5zZXJ0cyA9IDBcblx0XHRAcmVtb3ZlcyA9IDBcblx0XHRAbW91bnRlZCA9IFtdXG5cdFx0QG1vdW50YWJsZXMgPSAwXG5cdFx0QHVubW91bnRhYmxlcyA9IDBcblx0XHRAdW5tb3VudGluZyA9IDBcblx0XHRzZWxmXG5cblx0ZGVmIG1vdW50ZWRcblx0XHRAbW91bnRlZFxuXG5cdGRlZiBpbnNlcnQgbm9kZSwgcGFyZW50XG5cdFx0QGluc2VydHMrK1xuXHRcdHJlZ01vdW50YWJsZShub2RlKSBpZiBub2RlIGFuZCBub2RlOm1vdW50XG5cdFx0IyB1bmxlc3Mgbm9kZS5GTEFHUyAmIEltYmEuVEFHX01PVU5UQUJMRVxuXHRcdCMgXHRub2RlLkZMQUdTIHw9IEltYmEuVEFHX01PVU5UQUJMRVxuXHRcdCMgXHRAbW91bnRhYmxlcysrXG5cdFx0cmV0dXJuXG5cblx0ZGVmIHJlbW92ZSBub2RlLCBwYXJlbnRcblx0XHRAcmVtb3ZlcysrXG5cdFx0XG5cblx0ZGVmIGNoYW5nZXNcblx0XHRAaW5zZXJ0cyArIEByZW1vdmVzXG5cblx0ZGVmIG1vdW50IG5vZGVcblx0XHRyZXR1cm5cblxuXHRkZWYgcmVmcmVzaCBmb3JjZSA9IG5vXG5cdFx0cmV0dXJuIGlmICRub2RlJFxuXHRcdHJldHVybiBpZiAhZm9yY2UgYW5kIGNoYW5nZXMgPT0gMFxuXHRcdCMgY29uc29sZS50aW1lKCdyZXNvbHZlTW91bnRzJylcblx0XHRpZiAoQGluc2VydHMgYW5kIEBtb3VudGFibGVzID4gQG1vdW50ZWQ6bGVuZ3RoKSBvciBmb3JjZVxuXHRcdFx0dHJ5TW91bnRcblxuXHRcdGlmIChAcmVtb3ZlcyBvciBmb3JjZSkgYW5kIEBtb3VudGVkOmxlbmd0aFxuXHRcdFx0dHJ5VW5tb3VudFxuXHRcdCMgY29uc29sZS50aW1lRW5kKCdyZXNvbHZlTW91bnRzJylcblx0XHRAaW5zZXJ0cyA9IDBcblx0XHRAcmVtb3ZlcyA9IDBcblx0XHRzZWxmXG5cblx0ZGVmIHVubW91bnQgbm9kZVxuXHRcdHNlbGZcblx0XG5cdGRlZiByZWdNb3VudGFibGUgbm9kZVxuXHRcdHVubGVzcyBub2RlLkZMQUdTICYgSW1iYS5UQUdfTU9VTlRBQkxFXG5cdFx0XHRub2RlLkZMQUdTIHw9IEltYmEuVEFHX01PVU5UQUJMRVxuXHRcdFx0QG1vdW50YWJsZXMrK1xuXHRcdFxuXG5cdGRlZiB0cnlNb3VudFxuXHRcdHZhciBjb3VudCA9IDBcblx0XHR2YXIgcm9vdCA9IGRvY3VtZW50OmJvZHlcblx0XHR2YXIgaXRlbXMgPSByb290LnF1ZXJ5U2VsZWN0b3JBbGwoJy5fX21vdW50Jylcblx0XHQjIHdoYXQgaWYgd2UgZW5kIHVwIGNyZWF0aW5nIGFkZGl0aW9uYWwgbW91bnRhYmxlcyBieSBtb3VudGluZz9cblx0XHRmb3IgZWwgaW4gaXRlbXNcblx0XHRcdGlmIGVsIGFuZCBlbC5AdGFnXG5cdFx0XHRcdGlmIEBtb3VudGVkLmluZGV4T2YoZWwuQHRhZykgPT0gLTFcblx0XHRcdFx0XHRtb3VudE5vZGUoZWwuQHRhZylcblx0XHRyZXR1cm4gc2VsZlxuXG5cdGRlZiBtb3VudE5vZGUgbm9kZVxuXHRcdGlmIEBtb3VudGVkLmluZGV4T2Yobm9kZSkgPT0gLTFcblx0XHRcdHJlZ01vdW50YWJsZShub2RlKVxuXHRcdFx0QG1vdW50ZWQucHVzaChub2RlKVxuXHRcdFx0XHRcblx0XHRcdG5vZGUuRkxBR1MgfD0gSW1iYS5UQUdfTU9VTlRFRFxuXHRcdFx0bm9kZS5tb3VudCBpZiBub2RlOm1vdW50XG5cdFx0XHQjIE1hcmsgYWxsIHBhcmVudHMgYXMgbW91bnRhYmxlIGZvciBmYXN0ZXIgdW5tb3VudFxuXHRcdFx0IyBsZXQgZWwgPSBub2RlLmRvbTpwYXJlbnROb2RlXG5cdFx0XHQjIHdoaWxlIGVsIGFuZCBlbC5AdGFnIGFuZCAhZWwuQHRhZzptb3VudCBhbmQgIShlbC5AdGFnLkZMQUdTICYgSW1iYS5UQUdfTU9VTlRBQkxFKVxuXHRcdFx0IyBcdGVsLkB0YWcuRkxBR1MgfD0gSW1iYS5UQUdfTU9VTlRBQkxFXG5cdFx0XHQjIFx0ZWwgPSBlbDpwYXJlbnROb2RlXG5cdFx0cmV0dXJuXG5cblx0ZGVmIHRyeVVubW91bnRcblx0XHRAdW5tb3VudGluZysrXG5cdFx0XG5cdFx0dmFyIHVubW91bnQgPSBbXVxuXHRcdHZhciByb290ID0gZG9jdW1lbnQ6Ym9keVxuXHRcdGZvciBpdGVtLCBpIGluIEBtb3VudGVkXG5cdFx0XHRjb250aW51ZSB1bmxlc3MgaXRlbVxuXHRcdFx0dW5sZXNzIGRvY3VtZW50OmRvY3VtZW50RWxlbWVudC5jb250YWlucyhpdGVtLkBkb20pXG5cdFx0XHRcdHVubW91bnQucHVzaChpdGVtKVx0XHRcdFx0XG5cdFx0XHRcdEBtb3VudGVkW2ldID0gbnVsbFxuXG5cdFx0QHVubW91bnRpbmctLVxuXHRcdFxuXHRcdGlmIHVubW91bnQ6bGVuZ3RoXG5cdFx0XHRAbW91bnRlZCA9IEBtb3VudGVkLmZpbHRlciBkbyB8aXRlbXwgaXRlbSBhbmQgdW5tb3VudC5pbmRleE9mKGl0ZW0pID09IC0xXG5cdFx0XHRmb3IgaXRlbSBpbiB1bm1vdW50XG5cdFx0XHRcdGl0ZW0uRkxBR1MgPSBpdGVtLkZMQUdTICYgfkltYmEuVEFHX01PVU5URURcblx0XHRcdFx0aWYgaXRlbTp1bm1vdW50IGFuZCBpdGVtLkBkb21cblx0XHRcdFx0XHRpdGVtLnVubW91bnRcblx0XHRcdFx0ZWxpZiBpdGVtLkBzY2hlZHVsZXJcblx0XHRcdFx0XHRpdGVtLnVuc2NoZWR1bGVcblx0XHRzZWxmIiwidmFyIEltYmEgPSByZXF1aXJlKFwiLi4vaW1iYVwiKVxuXG5jbGFzcyBJbWJhLlBvaW50ZXJcblx0XG5cdGRlZiBpbml0aWFsaXplXG5cdFx0QGJ1dHRvbiA9IC0xXG5cdFx0QGV2ZW50ID0ge3g6IDAsIHk6IDAsIHR5cGU6ICd1bmluaXRpYWxpemVkJ31cblx0XHRyZXR1cm4gc2VsZlxuXG5cdGRlZiBidXR0b25cblx0XHRAYnV0dG9uXG5cblx0ZGVmIHRvdWNoXG5cdFx0QHRvdWNoXG5cblx0ZGVmIHVwZGF0ZSBlXG5cdFx0QGV2ZW50ID0gZVxuXHRcdEBkaXJ0eSA9IHllc1xuXHRcdHNlbGZcblxuXHQjIHRoaXMgaXMganVzdCBmb3IgcmVndWxhciBtb3VzZSBub3dcblx0ZGVmIHByb2Nlc3Ncblx0XHR2YXIgZTEgPSBAZXZlbnRcblxuXHRcdGlmIEBkaXJ0eVxuXHRcdFx0QHByZXZFdmVudCA9IGUxXG5cdFx0XHRAZGlydHkgPSBub1xuXG5cdFx0XHQjIGJ1dHRvbiBzaG91bGQgb25seSBjaGFuZ2Ugb24gbW91c2Vkb3duIGV0Y1xuXHRcdFx0aWYgZTE6dHlwZSA9PSAnbW91c2Vkb3duJ1xuXHRcdFx0XHRAYnV0dG9uID0gZTE6YnV0dG9uXG5cblx0XHRcdFx0aWYgKEB0b3VjaCBhbmQgQGJ1dHRvbiAhPSAwKVxuXHRcdFx0XHRcdHJldHVyblxuXG5cdFx0XHRcdCMgY2FuY2VsIHRoZSBwcmV2aW91cyB0b3VjaFxuXHRcdFx0XHRAdG91Y2guY2FuY2VsIGlmIEB0b3VjaFxuXHRcdFx0XHRAdG91Y2ggPSBJbWJhLlRvdWNoLm5ldyhlMSxzZWxmKVxuXHRcdFx0XHRAdG91Y2gubW91c2Vkb3duKGUxLGUxKVxuXG5cdFx0XHRlbGlmIGUxOnR5cGUgPT0gJ21vdXNlbW92ZSdcblx0XHRcdFx0QHRvdWNoLm1vdXNlbW92ZShlMSxlMSkgaWYgQHRvdWNoXG5cblx0XHRcdGVsaWYgZTE6dHlwZSA9PSAnbW91c2V1cCdcblx0XHRcdFx0QGJ1dHRvbiA9IC0xXG5cblx0XHRcdFx0aWYgQHRvdWNoIGFuZCBAdG91Y2guYnV0dG9uID09IGUxOmJ1dHRvblxuXHRcdFx0XHRcdEB0b3VjaC5tb3VzZXVwKGUxLGUxKVxuXHRcdFx0XHRcdEB0b3VjaCA9IG51bGxcblx0XHRcdFx0IyB0cmlnZ2VyIHBvaW50ZXJ1cFxuXHRcdGVsaWYgQHRvdWNoXG5cdFx0XHRAdG91Y2guaWRsZVxuXHRcdHNlbGZcblxuXHRkZWYgeCBkbyBAZXZlbnQ6eFxuXHRkZWYgeSBkbyBAZXZlbnQ6eVxuXHQiLCJleHRlcm4gbmF2aWdhdG9yXG5cbnZhciBJbWJhID0gcmVxdWlyZShcIi4uL2ltYmFcIilcblxudmFyIHJlbW92ZU5lc3RlZCA9IGRvIHxyb290LCBub2RlLCBjYXJldHxcblx0IyBpZiBub2RlL25vZGVzIGlzYSBTdHJpbmdcblx0IyBcdHdlIG5lZWQgdG8gdXNlIHRoZSBjYXJldCB0byByZW1vdmUgZWxlbWVudHNcblx0IyBcdGZvciBub3cgd2Ugd2lsbCBzaW1wbHkgbm90IHN1cHBvcnQgdGhpc1xuXHRpZiBub2RlIGlzYSBBcnJheVxuXHRcdHJlbW92ZU5lc3RlZChyb290LG1lbWJlcixjYXJldCkgZm9yIG1lbWJlciBpbiBub2RlXG5cdGVsaWYgbm9kZSBhbmQgbm9kZS5Ac2xvdF9cblx0XHRyb290LnJlbW92ZUNoaWxkKG5vZGUpXG5cdGVsaWYgbm9kZSAhPSBudWxsXG5cdFx0IyB3aGF0IGlmIHRoaXMgaXMgbm90IG51bGw/IT8hP1xuXHRcdCMgdGFrZSBhIGNoYW5jZSBhbmQgcmVtb3ZlIGEgdGV4dC1lbGVtZW50bmdcblx0XHRsZXQgbmV4dCA9IGNhcmV0ID8gY2FyZXQ6bmV4dFNpYmxpbmcgOiByb290LkBkb206Zmlyc3RDaGlsZFxuXHRcdGlmIG5leHQgaXNhIFRleHQgYW5kIG5leHQ6dGV4dENvbnRlbnQgPT0gbm9kZVxuXHRcdFx0cm9vdC5yZW1vdmVDaGlsZChuZXh0KVxuXHRcdGVsc2Vcblx0XHRcdHRocm93ICdjYW5ub3QgcmVtb3ZlIHN0cmluZydcblxuXHRyZXR1cm4gY2FyZXRcblxudmFyIGFwcGVuZE5lc3RlZCA9IGRvIHxyb290LCBub2RlfFxuXHRpZiBub2RlIGlzYSBBcnJheVxuXHRcdGxldCBpID0gMFxuXHRcdGxldCBjID0gbm9kZTp0YWdsZW5cblx0XHRsZXQgayA9IGMgIT0gbnVsbCA/IChub2RlOmRvbWxlbiA9IGMpIDogbm9kZTpsZW5ndGhcblx0XHRhcHBlbmROZXN0ZWQocm9vdCxub2RlW2krK10pIHdoaWxlIGkgPCBrXG5cdGVsaWYgbm9kZSBhbmQgbm9kZS5AZG9tXG5cdFx0cm9vdC5hcHBlbmRDaGlsZChub2RlKVxuXHRlbGlmIG5vZGUgIT0gbnVsbCBhbmQgbm9kZSAhPT0gZmFsc2Vcblx0XHRyb290LmFwcGVuZENoaWxkIEltYmEuY3JlYXRlVGV4dE5vZGUobm9kZSlcblxuXHRyZXR1cm5cblxuXG4jIGluc2VydCBub2RlcyBiZWZvcmUgYSBjZXJ0YWluIG5vZGVcbiMgZG9lcyBub3QgbmVlZCB0byByZXR1cm4gYW55IHRhaWwsIGFzIGJlZm9yZVxuIyB3aWxsIHN0aWxsIGJlIGNvcnJlY3QgdGhlcmVcbiMgYmVmb3JlIG11c3QgYmUgYW4gYWN0dWFsIGRvbW5vZGVcbnZhciBpbnNlcnROZXN0ZWRCZWZvcmUgPSBkbyB8cm9vdCwgbm9kZSwgYmVmb3JlfFxuXHRpZiBub2RlIGlzYSBBcnJheVxuXHRcdGxldCBpID0gMFxuXHRcdGxldCBjID0gbm9kZTp0YWdsZW5cblx0XHRsZXQgayA9IGMgIT0gbnVsbCA/IChub2RlOmRvbWxlbiA9IGMpIDogbm9kZTpsZW5ndGhcblx0XHRpbnNlcnROZXN0ZWRCZWZvcmUocm9vdCxub2RlW2krK10sYmVmb3JlKSB3aGlsZSBpIDwga1xuXG5cdGVsaWYgbm9kZSBhbmQgbm9kZS5AZG9tXG5cdFx0cm9vdC5pbnNlcnRCZWZvcmUobm9kZSxiZWZvcmUpXG5cdGVsaWYgbm9kZSAhPSBudWxsIGFuZCBub2RlICE9PSBmYWxzZVxuXHRcdHJvb3QuaW5zZXJ0QmVmb3JlKEltYmEuY3JlYXRlVGV4dE5vZGUobm9kZSksYmVmb3JlKVxuXG5cdHJldHVybiBiZWZvcmVcblxuIyBhZnRlciBtdXN0IGJlIGFuIGFjdHVhbCBkb21ub2RlXG5kZWYgaW5zZXJ0TmVzdGVkQWZ0ZXIgcm9vdCwgbm9kZSwgYWZ0ZXJcblx0dmFyIGJlZm9yZSA9IGFmdGVyID8gYWZ0ZXI6bmV4dFNpYmxpbmcgOiByb290LkBkb206Zmlyc3RDaGlsZFxuXG5cdGlmIGJlZm9yZVxuXHRcdGluc2VydE5lc3RlZEJlZm9yZShyb290LG5vZGUsYmVmb3JlKVxuXHRcdHJldHVybiBiZWZvcmU6cHJldmlvdXNTaWJsaW5nXG5cdGVsc2Vcblx0XHRhcHBlbmROZXN0ZWQocm9vdCxub2RlKVxuXHRcdHJldHVybiByb290LkBkb206bGFzdENoaWxkXG5cbnZhciByZWNvbmNpbGVDb2xsZWN0aW9uQ2hhbmdlcyA9IGRvIHxyb290LCBuZXcsIG9sZCwgY2FyZXR8XG5cblx0dmFyIG5ld0xlbiA9IG5ldzpsZW5ndGhcblx0dmFyIGxhc3ROZXcgPSBuZXdbbmV3TGVuIC0gMV1cblxuXHQjIFRoaXMgcmUtb3JkZXIgYWxnb3JpdGhtIGlzIGJhc2VkIG9uIHRoZSBmb2xsb3dpbmcgcHJpbmNpcGxlOlxuXHQjIFxuXHQjIFdlIGJ1aWxkIGEgXCJjaGFpblwiIHdoaWNoIHNob3dzIHdoaWNoIGl0ZW1zIGFyZSBhbHJlYWR5IHNvcnRlZC5cblx0IyBJZiB3ZSdyZSBnb2luZyBmcm9tIFsxLCAyLCAzXSAtPiBbMiwgMSwgM10sIHRoZSB0cmVlIGxvb2tzIGxpa2U6XG5cdCNcblx0IyBcdDMgLT4gIDAgKGlkeClcblx0IyBcdDIgLT4gLTEgKGlkeClcblx0IyBcdDEgLT4gLTEgKGlkeClcblx0I1xuXHQjIFRoaXMgdGVsbHMgdXMgdGhhdCB3ZSBoYXZlIHR3byBjaGFpbnMgb2Ygb3JkZXJlZCBpdGVtczpcblx0IyBcblx0IyBcdCgxLCAzKSBhbmQgKDIpXG5cdCMgXG5cdCMgVGhlIG9wdGltYWwgcmUtb3JkZXJpbmcgdGhlbiBiZWNvbWVzIHRvIGtlZXAgdGhlIGxvbmdlc3QgY2hhaW4gaW50YWN0LFxuXHQjIGFuZCBtb3ZlIGFsbCB0aGUgb3RoZXIgaXRlbXMuXG5cblx0dmFyIG5ld1Bvc2l0aW9uID0gW11cblxuXHQjIFRoZSB0cmVlL2dyYXBoIGl0c2VsZlxuXHR2YXIgcHJldkNoYWluID0gW11cblx0IyBUaGUgbGVuZ3RoIG9mIHRoZSBjaGFpblxuXHR2YXIgbGVuZ3RoQ2hhaW4gPSBbXVxuXG5cdCMgS2VlcCB0cmFjayBvZiB0aGUgbG9uZ2VzdCBjaGFpblxuXHR2YXIgbWF4Q2hhaW5MZW5ndGggPSAwXG5cdHZhciBtYXhDaGFpbkVuZCA9IDBcblxuXHR2YXIgaGFzVGV4dE5vZGVzID0gbm9cblx0dmFyIG5ld1Bvc1xuXG5cdGZvciBub2RlLCBpZHggaW4gb2xkXG5cdFx0IyBzcGVjaWFsIGNhc2UgZm9yIFRleHQgbm9kZXNcblx0XHRpZiBub2RlIGFuZCBub2RlOm5vZGVUeXBlID09IDNcblx0XHRcdG5ld1BvcyA9IG5ldy5pbmRleE9mKG5vZGU6dGV4dENvbnRlbnQpXG5cdFx0XHRuZXdbbmV3UG9zXSA9IG5vZGUgaWYgbmV3UG9zID49IDBcblx0XHRcdGhhc1RleHROb2RlcyA9IHllc1xuXHRcdGVsc2Vcblx0XHRcdG5ld1BvcyA9IG5ldy5pbmRleE9mKG5vZGUpXG5cblx0XHRuZXdQb3NpdGlvbi5wdXNoKG5ld1BvcylcblxuXHRcdGlmIG5ld1BvcyA9PSAtMVxuXHRcdFx0cm9vdC5yZW1vdmVDaGlsZChub2RlKVxuXHRcdFx0cHJldkNoYWluLnB1c2goLTEpXG5cdFx0XHRsZW5ndGhDaGFpbi5wdXNoKC0xKVxuXHRcdFx0Y29udGludWVcblxuXHRcdHZhciBwcmV2SWR4ID0gbmV3UG9zaXRpb246bGVuZ3RoIC0gMlxuXG5cdFx0IyBCdWlsZCB0aGUgY2hhaW46XG5cdFx0d2hpbGUgcHJldklkeCA+PSAwXG5cdFx0XHRpZiBuZXdQb3NpdGlvbltwcmV2SWR4XSA9PSAtMVxuXHRcdFx0XHRwcmV2SWR4LS1cblx0XHRcdGVsaWYgbmV3UG9zID4gbmV3UG9zaXRpb25bcHJldklkeF1cblx0XHRcdFx0IyBZYXksIHdlJ3JlIGJpZ2dlciB0aGFuIHRoZSBwcmV2aW91cyFcblx0XHRcdFx0YnJlYWtcblx0XHRcdGVsc2Vcblx0XHRcdFx0IyBOb3BlLCBsZXQncyB3YWxrIGJhY2sgdGhlIGNoYWluXG5cdFx0XHRcdHByZXZJZHggPSBwcmV2Q2hhaW5bcHJldklkeF1cblxuXHRcdHByZXZDaGFpbi5wdXNoKHByZXZJZHgpXG5cblx0XHR2YXIgY3Vyckxlbmd0aCA9IChwcmV2SWR4ID09IC0xKSA/IDAgOiBsZW5ndGhDaGFpbltwcmV2SWR4XSsxXG5cblx0XHRpZiBjdXJyTGVuZ3RoID4gbWF4Q2hhaW5MZW5ndGhcblx0XHRcdG1heENoYWluTGVuZ3RoID0gY3Vyckxlbmd0aFxuXHRcdFx0bWF4Q2hhaW5FbmQgPSBpZHhcblxuXHRcdGxlbmd0aENoYWluLnB1c2goY3Vyckxlbmd0aClcblxuXHR2YXIgc3RpY2t5Tm9kZXMgPSBbXVxuXG5cdCMgTm93IHdlIGNhbiB3YWxrIHRoZSBsb25nZXN0IGNoYWluIGJhY2t3YXJkcyBhbmQgbWFyayB0aGVtIGFzIFwic3RpY2t5XCIsXG5cdCMgd2hpY2ggaW1wbGllcyB0aGF0IHRoZXkgc2hvdWxkIG5vdCBiZSBtb3ZlZFxuXHR2YXIgY3Vyc29yID0gbmV3UG9zaXRpb246bGVuZ3RoIC0gMVxuXHR3aGlsZSBjdXJzb3IgPj0gMFxuXHRcdGlmIGN1cnNvciA9PSBtYXhDaGFpbkVuZCBhbmQgbmV3UG9zaXRpb25bY3Vyc29yXSAhPSAtMVxuXHRcdFx0c3RpY2t5Tm9kZXNbbmV3UG9zaXRpb25bY3Vyc29yXV0gPSB0cnVlXG5cdFx0XHRtYXhDaGFpbkVuZCA9IHByZXZDaGFpblttYXhDaGFpbkVuZF1cblxuXHRcdGN1cnNvciAtPSAxXG5cblx0IyBwb3NzaWJsZSB0byBkbyB0aGlzIGluIHJldmVyc2VkIG9yZGVyIGluc3RlYWQ/XG5cdGZvciBub2RlLCBpZHggaW4gbmV3XG5cdFx0aWYgIXN0aWNreU5vZGVzW2lkeF1cblx0XHRcdCMgY3JlYXRlIHRleHRub2RlIGZvciBzdHJpbmcsIGFuZCB1cGRhdGUgdGhlIGFycmF5XG5cdFx0XHR1bmxlc3Mgbm9kZSBhbmQgbm9kZS5AZG9tXG5cdFx0XHRcdG5vZGUgPSBuZXdbaWR4XSA9IEltYmEuY3JlYXRlVGV4dE5vZGUobm9kZSlcblxuXHRcdFx0dmFyIGFmdGVyID0gbmV3W2lkeCAtIDFdXG5cdFx0XHRpbnNlcnROZXN0ZWRBZnRlcihyb290LCBub2RlLCAoYWZ0ZXIgYW5kIGFmdGVyLkBzbG90XyBvciBhZnRlciBvciBjYXJldCkpXG5cblx0XHRjYXJldCA9IG5vZGUuQHNsb3RfIG9yIChjYXJldCBhbmQgY2FyZXQ6bmV4dFNpYmxpbmcgb3Igcm9vdC5AZG9tOmZpcnN0Q2hpbGQpXG5cblx0IyBzaG91bGQgdHJ1c3QgdGhhdCB0aGUgbGFzdCBpdGVtIGluIG5ldyBsaXN0IGlzIHRoZSBjYXJldFxuXHRyZXR1cm4gbGFzdE5ldyBhbmQgbGFzdE5ldy5Ac2xvdF8gb3IgY2FyZXRcblxuXG4jIGV4cGVjdHMgYSBmbGF0IG5vbi1zcGFyc2UgYXJyYXkgb2Ygbm9kZXMgaW4gYm90aCBuZXcgYW5kIG9sZCwgYWx3YXlzXG52YXIgcmVjb25jaWxlQ29sbGVjdGlvbiA9IGRvIHxyb290LCBuZXcsIG9sZCwgY2FyZXR8XG5cdHZhciBrID0gbmV3Omxlbmd0aFxuXHR2YXIgaSA9IGtcblx0dmFyIGxhc3QgPSBuZXdbayAtIDFdXG5cblxuXHRpZiBrID09IG9sZDpsZW5ndGggYW5kIG5ld1swXSA9PT0gb2xkWzBdXG5cdFx0IyBydW5uaW5nIHRocm91Z2ggdG8gY29tcGFyZVxuXHRcdHdoaWxlIGktLVxuXHRcdFx0YnJlYWsgaWYgbmV3W2ldICE9PSBvbGRbaV1cblxuXHRpZiBpID09IC0xXG5cdFx0cmV0dXJuIGxhc3QgYW5kIGxhc3QuQHNsb3RfIG9yIGxhc3Qgb3IgY2FyZXRcblx0ZWxzZVxuXHRcdHJldHVybiByZWNvbmNpbGVDb2xsZWN0aW9uQ2hhbmdlcyhyb290LG5ldyxvbGQsY2FyZXQpXG5cbiMgVFlQRSA1IC0gd2Uga25vdyB0aGF0IHdlIGFyZSBkZWFsaW5nIHdpdGggYSBzaW5nbGUgYXJyYXkgb2ZcbiMga2V5ZWQgdGFncyAtIGFuZCByb290IGhhcyBubyBvdGhlciBjaGlsZHJlblxudmFyIHJlY29uY2lsZUxvb3AgPSBkbyB8cm9vdCwgbmV3LCBvbGQsIGNhcmV0fFxuXHR2YXIgbmwgPSBuZXc6bGVuZ3RoXG5cdHZhciBvbCA9IG9sZDpsZW5ndGhcblx0dmFyIGNsID0gbmV3OmNhY2hlOmkkICMgY2FjaGUtbGVuZ3RoXG5cdHZhciBpID0gMCwgZCA9IG5sIC0gb2xcblx0XG5cdCMgVE9ETyBzdXBwb3J0IGNhcmV0XG5cblx0IyBmaW5kIHRoZSBmaXJzdCBpbmRleCB0aGF0IGlzIGRpZmZlcmVudFxuXHRpKysgd2hpbGUgaSA8IG9sIGFuZCBpIDwgbmwgYW5kIG5ld1tpXSA9PT0gb2xkW2ldXG5cdFxuXHQjIGNvbmRpdGlvbmFsbHkgcHJ1bmUgY2FjaGVcblx0aWYgY2wgPiAxMDAwIGFuZCAoY2wgLSBubCkgPiA1MDBcblx0XHRuZXc6Y2FjaGU6JHBydW5lKG5ldylcblx0XG5cdGlmIGQgPiAwIGFuZCBpID09IG9sXG5cdFx0IyBhZGRlZCBhdCBlbmRcblx0XHRyb290LmFwcGVuZENoaWxkKG5ld1tpKytdKSB3aGlsZSBpIDwgbmxcblx0XHRyZXR1cm5cblx0XG5cdGVsaWYgZCA+IDBcblx0XHRsZXQgaTEgPSBubFxuXHRcdGkxLS0gd2hpbGUgaTEgPiBpIGFuZCBuZXdbaTEgLSAxXSA9PT0gb2xkW2kxIC0gMSAtIGRdXG5cblx0XHRpZiBkID09IChpMSAtIGkpXG5cdFx0XHRsZXQgYmVmb3JlID0gb2xkW2ldLkBzbG90X1xuXHRcdFx0cm9vdC5pbnNlcnRCZWZvcmUobmV3W2krK10sYmVmb3JlKSB3aGlsZSBpIDwgaTFcblx0XHRcdHJldHVyblxuXHRcdFx0XG5cdGVsaWYgZCA8IDAgYW5kIGkgPT0gbmxcblx0XHQjIHJlbW92ZWQgYXQgZW5kXG5cdFx0cm9vdC5yZW1vdmVDaGlsZChvbGRbaSsrXSkgd2hpbGUgaSA8IG9sXG5cdFx0cmV0dXJuXG5cdGVsaWYgZCA8IDBcblx0XHRsZXQgaTEgPSBvbFxuXHRcdGkxLS0gd2hpbGUgaTEgPiBpIGFuZCBuZXdbaTEgLSAxICsgZF0gPT09IG9sZFtpMSAtIDFdXG5cblx0XHRpZiBkID09IChpIC0gaTEpXG5cdFx0XHRyb290LnJlbW92ZUNoaWxkKG9sZFtpKytdKSB3aGlsZSBpIDwgaTFcblx0XHRcdHJldHVyblxuXG5cdGVsaWYgaSA9PSBubFxuXHRcdHJldHVyblxuXG5cdHJldHVybiByZWNvbmNpbGVDb2xsZWN0aW9uQ2hhbmdlcyhyb290LG5ldyxvbGQsY2FyZXQpXG5cbiMgZXhwZWN0cyBhIGZsYXQgbm9uLXNwYXJzZSBhcnJheSBvZiBub2RlcyBpbiBib3RoIG5ldyBhbmQgb2xkLCBhbHdheXNcbnZhciByZWNvbmNpbGVJbmRleGVkQXJyYXkgPSBkbyB8cm9vdCwgYXJyYXksIG9sZCwgY2FyZXR8XG5cdHZhciBuZXdMZW4gPSBhcnJheTp0YWdsZW5cblx0dmFyIHByZXZMZW4gPSBhcnJheTpkb21sZW4gb3IgMFxuXHR2YXIgbGFzdCA9IG5ld0xlbiA/IGFycmF5W25ld0xlbiAtIDFdIDogbnVsbFxuXHQjIGNvbnNvbGUubG9nIFwicmVjb25jaWxlIG9wdGltaXplZCBhcnJheSghKVwiLGNhcmV0LG5ld0xlbixwcmV2TGVuLGFycmF5XG5cblx0aWYgcHJldkxlbiA+IG5ld0xlblxuXHRcdHdoaWxlIHByZXZMZW4gPiBuZXdMZW5cblx0XHRcdHZhciBpdGVtID0gYXJyYXlbLS1wcmV2TGVuXVxuXHRcdFx0cm9vdC5yZW1vdmVDaGlsZChpdGVtLkBzbG90XylcblxuXHRlbGlmIG5ld0xlbiA+IHByZXZMZW5cblx0XHQjIGZpbmQgdGhlIGl0ZW0gdG8gaW5zZXJ0IGJlZm9yZVxuXHRcdGxldCBwcmV2TGFzdCA9IHByZXZMZW4gPyBhcnJheVtwcmV2TGVuIC0gMV0uQHNsb3RfIDogY2FyZXRcblx0XHRsZXQgYmVmb3JlID0gcHJldkxhc3QgPyBwcmV2TGFzdDpuZXh0U2libGluZyA6IHJvb3QuQGRvbTpmaXJzdENoaWxkXG5cdFx0XG5cdFx0d2hpbGUgcHJldkxlbiA8IG5ld0xlblxuXHRcdFx0bGV0IG5vZGUgPSBhcnJheVtwcmV2TGVuKytdXG5cdFx0XHRiZWZvcmUgPyByb290Lmluc2VydEJlZm9yZShub2RlLkBzbG90XyxiZWZvcmUpIDogcm9vdC5hcHBlbmRDaGlsZChub2RlLkBzbG90Xylcblx0XHRcdFxuXHRhcnJheTpkb21sZW4gPSBuZXdMZW5cblx0cmV0dXJuIGxhc3QgPyBsYXN0LkBzbG90XyA6IGNhcmV0XG5cblxuIyB0aGUgZ2VuZXJhbCByZWNvbmNpbGVyIHRoYXQgcmVzcGVjdHMgY29uZGl0aW9ucyBldGNcbiMgY2FyZXQgaXMgdGhlIGN1cnJlbnQgbm9kZSB3ZSB3YW50IHRvIGluc2VydCB0aGluZ3MgYWZ0ZXJcbnZhciByZWNvbmNpbGVOZXN0ZWQgPSBkbyB8cm9vdCwgbmV3LCBvbGQsIGNhcmV0fFxuXG5cdCMgdmFyIHNraXBuZXcgPSBuZXcgPT0gbnVsbCBvciBuZXcgPT09IGZhbHNlIG9yIG5ldyA9PT0gdHJ1ZVxuXHR2YXIgbmV3SXNOdWxsID0gbmV3ID09IG51bGwgb3IgbmV3ID09PSBmYWxzZVxuXHR2YXIgb2xkSXNOdWxsID0gb2xkID09IG51bGwgb3Igb2xkID09PSBmYWxzZVxuXG5cblx0aWYgbmV3ID09PSBvbGRcblx0XHQjIHJlbWVtYmVyIHRoYXQgdGhlIGNhcmV0IG11c3QgYmUgYW4gYWN0dWFsIGRvbSBlbGVtZW50XG5cdFx0IyB3ZSBzaG91bGQgaW5zdGVhZCBtb3ZlIHRoZSBhY3R1YWwgY2FyZXQ/IC0gdHJ1c3Rcblx0XHRpZiBuZXdJc051bGxcblx0XHRcdHJldHVybiBjYXJldFxuXHRcdGVsaWYgbmV3LkBzbG90X1xuXHRcdFx0cmV0dXJuIG5ldy5Ac2xvdF9cblx0XHRlbGlmIG5ldyBpc2EgQXJyYXkgYW5kIG5ldzp0YWdsZW4gIT0gbnVsbFxuXHRcdFx0cmV0dXJuIHJlY29uY2lsZUluZGV4ZWRBcnJheShyb290LG5ldyxvbGQsY2FyZXQpXG5cdFx0ZWxzZVxuXHRcdFx0cmV0dXJuIGNhcmV0ID8gY2FyZXQ6bmV4dFNpYmxpbmcgOiByb290LkBkb206Zmlyc3RDaGlsZFxuXG5cdGVsaWYgbmV3IGlzYSBBcnJheVxuXHRcdGlmIG9sZCBpc2EgQXJyYXlcblx0XHRcdCMgbG9vayBmb3Igc2xvdCBpbnN0ZWFkP1xuXHRcdFx0bGV0IHR5cCA9IG5ldzpzdGF0aWNcblx0XHRcdGlmIHR5cCBvciBvbGQ6c3RhdGljXG5cdFx0XHRcdCMgaWYgdGhlIHN0YXRpYyBpcyBub3QgbmVzdGVkIC0gd2UgY291bGQgZ2V0IGEgaGludCBmcm9tIGNvbXBpbGVyXG5cdFx0XHRcdCMgYW5kIGp1c3Qgc2tpcCBpdFxuXHRcdFx0XHRpZiB0eXAgPT0gb2xkOnN0YXRpYyAjIHNob3VsZCBhbHNvIGluY2x1ZGUgYSByZWZlcmVuY2U/XG5cdFx0XHRcdFx0Zm9yIGl0ZW0saSBpbiBuZXdcblx0XHRcdFx0XHRcdCMgdGhpcyBpcyB3aGVyZSB3ZSBjb3VsZCBkbyB0aGUgdHJpcGxlIGVxdWFsIGRpcmVjdGx5XG5cdFx0XHRcdFx0XHRjYXJldCA9IHJlY29uY2lsZU5lc3RlZChyb290LGl0ZW0sb2xkW2ldLGNhcmV0KVxuXHRcdFx0XHRcdHJldHVybiBjYXJldFxuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0cmVtb3ZlTmVzdGVkKHJvb3Qsb2xkLGNhcmV0KVxuXHRcdFx0XHRcdFxuXHRcdFx0XHQjIGlmIHRoZXkgYXJlIG5vdCB0aGUgc2FtZSB3ZSBjb250aW51ZSB0aHJvdWdoIHRvIHRoZSBkZWZhdWx0XG5cdFx0XHRlbHNlXG5cdFx0XHRcdCMgQ291bGQgdXNlIG9wdGltaXplZCBsb29wIGlmIHdlIGtub3cgdGhhdCBpdCBvbmx5IGNvbnNpc3RzIG9mIG5vZGVzXG5cdFx0XHRcdHJldHVybiByZWNvbmNpbGVDb2xsZWN0aW9uKHJvb3QsbmV3LG9sZCxjYXJldClcblx0XHRlbGlmICFvbGRJc051bGxcblx0XHRcdGlmIG9sZC5Ac2xvdF9cblx0XHRcdFx0cm9vdC5yZW1vdmVDaGlsZChvbGQpXG5cdFx0XHRlbHNlXG5cdFx0XHRcdCMgb2xkIHdhcyBhIHN0cmluZy1saWtlIG9iamVjdD9cblx0XHRcdFx0cm9vdC5yZW1vdmVDaGlsZChjYXJldCA/IGNhcmV0Om5leHRTaWJsaW5nIDogcm9vdC5AZG9tOmZpcnN0Q2hpbGQpXG5cblx0XHRyZXR1cm4gaW5zZXJ0TmVzdGVkQWZ0ZXIocm9vdCxuZXcsY2FyZXQpXG5cdFx0IyByZW1vdmUgb2xkXG5cblx0ZWxpZiAhbmV3SXNOdWxsIGFuZCBuZXcuQHNsb3RfXG5cdFx0cmVtb3ZlTmVzdGVkKHJvb3Qsb2xkLGNhcmV0KSB1bmxlc3Mgb2xkSXNOdWxsXG5cdFx0cmV0dXJuIGluc2VydE5lc3RlZEFmdGVyKHJvb3QsbmV3LGNhcmV0KVxuXG5cdGVsaWYgbmV3SXNOdWxsXG5cdFx0cmVtb3ZlTmVzdGVkKHJvb3Qsb2xkLGNhcmV0KSB1bmxlc3Mgb2xkSXNOdWxsXG5cdFx0cmV0dXJuIGNhcmV0XG5cdGVsc2Vcblx0XHQjIGlmIG9sZCBkaWQgbm90IGV4aXN0IHdlIG5lZWQgdG8gYWRkIGEgbmV3IGRpcmVjdGx5XG5cdFx0bGV0IG5leHROb2RlXG5cdFx0IyBpZiBvbGQgd2FzIGFycmF5IG9yIGltYmF0YWcgd2UgbmVlZCB0byByZW1vdmUgaXQgYW5kIHRoZW4gYWRkXG5cdFx0aWYgb2xkIGlzYSBBcnJheVxuXHRcdFx0cmVtb3ZlTmVzdGVkKHJvb3Qsb2xkLGNhcmV0KVxuXHRcdGVsaWYgb2xkIGFuZCBvbGQuQHNsb3RfXG5cdFx0XHRyb290LnJlbW92ZUNoaWxkKG9sZClcblx0XHRlbGlmICFvbGRJc051bGxcblx0XHRcdCMgLi4uXG5cdFx0XHRuZXh0Tm9kZSA9IGNhcmV0ID8gY2FyZXQ6bmV4dFNpYmxpbmcgOiByb290LkBkb206Zmlyc3RDaGlsZFxuXHRcdFx0aWYgbmV4dE5vZGUgaXNhIFRleHQgYW5kIG5leHROb2RlOnRleHRDb250ZW50ICE9IG5ld1xuXHRcdFx0XHRuZXh0Tm9kZTp0ZXh0Q29udGVudCA9IG5ld1xuXHRcdFx0XHRyZXR1cm4gbmV4dE5vZGVcblxuXHRcdCMgbm93IGFkZCB0aGUgdGV4dG5vZGVcblx0XHRyZXR1cm4gaW5zZXJ0TmVzdGVkQWZ0ZXIocm9vdCxuZXcsY2FyZXQpXG5cblxuZXh0ZW5kIHRhZyBlbGVtZW50XG5cdFxuXHQjIDEgLSBzdGF0aWMgc2hhcGUgLSB1bmtub3duIGNvbnRlbnRcblx0IyAyIC0gc3RhdGljIHNoYXBlIGFuZCBzdGF0aWMgY2hpbGRyZW5cblx0IyAzIC0gc2luZ2xlIGl0ZW1cblx0IyA0IC0gb3B0aW1pemVkIGFycmF5IC0gb25seSBsZW5ndGggd2lsbCBjaGFuZ2Vcblx0IyA1IC0gb3B0aW1pemVkIGNvbGxlY3Rpb25cblx0IyA2IC0gdGV4dCBvbmx5XG5cblx0ZGVmIHNldENoaWxkcmVuIG5ldywgdHlwXG5cdFx0IyBpZiB0eXBlb2YgbmV3ID09ICdzdHJpbmcnXG5cdFx0IyBcdHJldHVybiBzZWxmLnRleHQgPSBuZXdcblx0XHR2YXIgb2xkID0gQHRyZWVfXG5cblx0XHRpZiBuZXcgPT09IG9sZCBhbmQgKCFuZXcgb3IgbmV3OnRhZ2xlbiA9PSB1bmRlZmluZWQpXG5cdFx0XHRyZXR1cm4gc2VsZlxuXG5cdFx0aWYgIW9sZCBhbmQgdHlwICE9IDNcblx0XHRcdHJlbW92ZUFsbENoaWxkcmVuXG5cdFx0XHRhcHBlbmROZXN0ZWQoc2VsZixuZXcpXG5cblx0XHRlbGlmIHR5cCA9PSAxXG5cdFx0XHRsZXQgY2FyZXQgPSBudWxsXG5cdFx0XHRmb3IgaXRlbSxpIGluIG5ld1xuXHRcdFx0XHRjYXJldCA9IHJlY29uY2lsZU5lc3RlZChzZWxmLGl0ZW0sb2xkW2ldLGNhcmV0KVxuXHRcdFxuXHRcdGVsaWYgdHlwID09IDJcblx0XHRcdHJldHVybiBzZWxmXG5cblx0XHRlbGlmIHR5cCA9PSAzXG5cdFx0XHRsZXQgbnR5cCA9IHR5cGVvZiBuZXdcblx0XHRcdFxuXHRcdFx0aWYgbnR5cCAhPSAnb2JqZWN0J1xuXHRcdFx0XHRyZXR1cm4gc2V0VGV4dChuZXcpXG5cblx0XHRcdGlmIG5ldyBhbmQgbmV3LkBkb21cblx0XHRcdFx0cmVtb3ZlQWxsQ2hpbGRyZW5cblx0XHRcdFx0YXBwZW5kQ2hpbGQobmV3KVxuXG5cdFx0XHQjIGNoZWNrIGlmIG9sZCBhbmQgbmV3IGlzYSBhcnJheVxuXHRcdFx0ZWxpZiBuZXcgaXNhIEFycmF5XG5cdFx0XHRcdGlmIG5ldy5AdHlwZSA9PSA1IGFuZCBvbGQgYW5kIG9sZC5AdHlwZSA9PSA1XG5cdFx0XHRcdFx0cmVjb25jaWxlTG9vcChzZWxmLG5ldyxvbGQsbnVsbClcblx0XHRcdFx0ZWxpZiBvbGQgaXNhIEFycmF5XG5cdFx0XHRcdFx0cmVjb25jaWxlTmVzdGVkKHNlbGYsbmV3LG9sZCxudWxsKVxuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0cmVtb3ZlQWxsQ2hpbGRyZW5cblx0XHRcdFx0XHRhcHBlbmROZXN0ZWQoc2VsZixuZXcpXG5cdFx0XHRlbHNlXG5cdFx0XHRcdHJldHVybiBzZXRUZXh0KG5ldylcblx0XHRcdFx0XG5cdFx0ZWxpZiB0eXAgPT0gNFxuXHRcdFx0cmVjb25jaWxlSW5kZXhlZEFycmF5KHNlbGYsbmV3LG9sZCxudWxsKVxuXHRcdFx0XG5cdFx0ZWxpZiB0eXAgPT0gNVxuXHRcdFx0cmVjb25jaWxlTG9vcChzZWxmLG5ldyxvbGQsbnVsbClcblxuXHRcdGVsaWYgbmV3IGlzYSBBcnJheSBhbmQgb2xkIGlzYSBBcnJheVxuXHRcdFx0cmVjb25jaWxlTmVzdGVkKHNlbGYsbmV3LG9sZCxudWxsKVxuXHRcdGVsc2Vcblx0XHRcdCMgd2hhdCBpZiB0ZXh0P1xuXHRcdFx0cmVtb3ZlQWxsQ2hpbGRyZW5cblx0XHRcdGFwcGVuZE5lc3RlZChzZWxmLG5ldylcblxuXHRcdEB0cmVlXyA9IG5ld1xuXHRcdHJldHVybiBzZWxmXG5cblx0ZGVmIGNvbnRlbnRcblx0XHRAY29udGVudCBvciBjaGlsZHJlbi50b0FycmF5XG5cdFxuXHRkZWYgc2V0VGV4dCB0ZXh0XG5cdFx0aWYgdGV4dCAhPSBAdHJlZV9cblx0XHRcdHZhciB2YWwgPSB0ZXh0ID09PSBudWxsIG9yIHRleHQgPT09IGZhbHNlID8gJycgOiB0ZXh0XG5cdFx0XHQoQHRleHRfIG9yIEBkb20pOnRleHRDb250ZW50ID0gdmFsXG5cdFx0XHRAdGV4dF8gfHw9IEBkb206Zmlyc3RDaGlsZFxuXHRcdFx0QHRyZWVfID0gdGV4dFxuXHRcdHNlbGZcblxuIyBhbGlhcyBzZXRDb250ZW50IHRvIHNldENoaWxkcmVuXG52YXIgcHJvdG8gPSBJbWJhLlRhZzpwcm90b3R5cGVcbnByb3RvOnNldENvbnRlbnQgPSBwcm90bzpzZXRDaGlsZHJlblxuXG4jIG9wdGltaXphdGlvbiBmb3Igc2V0VGV4dFxudmFyIGFwcGxlID0gdHlwZW9mIG5hdmlnYXRvciAhPSAndW5kZWZpbmVkJyBhbmQgKG5hdmlnYXRvcjp2ZW5kb3Igb3IgJycpLmluZGV4T2YoJ0FwcGxlJykgPT0gMFxuaWYgYXBwbGVcblx0ZGVmIHByb3RvLnNldFRleHQgdGV4dFxuXHRcdGlmIHRleHQgIT0gQHRyZWVfXG5cdFx0XHRAZG9tOnRleHRDb250ZW50ID0gKHRleHQgPT09IG51bGwgb3IgdGV4dCA9PT0gZmFsc2UgPyAnJyA6IHRleHQpXG5cdFx0XHRAdHJlZV8gPSB0ZXh0XG5cdFx0cmV0dXJuIHNlbGZcbiIsInZhciBJbWJhID0gcmVxdWlyZShcIi4uL2ltYmFcIilcblxuSW1iYS5DU1NLZXlNYXAgPSB7fVxuXG5JbWJhLlRBR19CVUlMVCA9IDFcbkltYmEuVEFHX1NFVFVQID0gMlxuSW1iYS5UQUdfTU9VTlRJTkcgPSA0XG5JbWJhLlRBR19NT1VOVEVEID0gOFxuSW1iYS5UQUdfU0NIRURVTEVEID0gMTZcbkltYmEuVEFHX0FXQUtFTkVEID0gMzJcbkltYmEuVEFHX01PVU5UQUJMRSA9IDY0XG5cbiMjI1xuR2V0IHRoZSBjdXJyZW50IGRvY3VtZW50XG4jIyNcbmRlZiBJbWJhLmRvY3VtZW50XG5cdHdpbmRvdzpkb2N1bWVudFxuXG4jIyNcbkdldCB0aGUgYm9keSBlbGVtZW50IHdyYXBwZWQgaW4gYW4gSW1iYS5UYWdcbiMjI1xuZGVmIEltYmEucm9vdFxuXHR0YWcoSW1iYS5kb2N1bWVudDpib2R5KVxuXG5kZWYgSW1iYS5zdGF0aWMgaXRlbXMsIHR5cCwgbnJcblx0aXRlbXMuQHR5cGUgPSB0eXBcblx0aXRlbXM6c3RhdGljID0gbnJcblx0cmV0dXJuIGl0ZW1zXG5cbiMjI1xuXG4jIyNcbmRlZiBJbWJhLm1vdW50IG5vZGUsIGludG9cblx0aW50byB8fD0gSW1iYS5kb2N1bWVudDpib2R5XG5cdGludG8uYXBwZW5kQ2hpbGQobm9kZS5kb20pXG5cdEltYmEuVGFnTWFuYWdlci5pbnNlcnQobm9kZSxpbnRvKVxuXHRub2RlLnNjaGVkdWxlci5jb25maWd1cmUoZXZlbnRzOiB5ZXMpLmFjdGl2YXRlKG5vKVxuXHRJbWJhLlRhZ01hbmFnZXIucmVmcmVzaFxuXHRyZXR1cm4gbm9kZVxuXG5cbmRlZiBJbWJhLmNyZWF0ZVRleHROb2RlIG5vZGVcblx0aWYgbm9kZSBhbmQgbm9kZTpub2RlVHlwZSA9PSAzXG5cdFx0cmV0dXJuIG5vZGVcblx0cmV0dXJuIEltYmEuZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUobm9kZSlcblxuXG5cbiMjI1xuVGhpcyBpcyB0aGUgYmFzZWNsYXNzIHRoYXQgYWxsIHRhZ3MgaW4gaW1iYSBpbmhlcml0IGZyb20uXG5AaW5hbWUgbm9kZVxuIyMjXG5jbGFzcyBJbWJhLlRhZ1xuXG5cdGRlZiBzZWxmLmJ1aWxkTm9kZVxuXHRcdHZhciBkb20gPSBJbWJhLmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoQG5vZGVUeXBlIG9yICdkaXYnKVxuXHRcdGlmIEBjbGFzc2VzXG5cdFx0XHR2YXIgY2xzID0gQGNsYXNzZXMuam9pbihcIiBcIilcblx0XHRcdGRvbTpjbGFzc05hbWUgPSBjbHMgaWYgY2xzXG5cdFx0ZG9tXG5cblx0ZGVmIHNlbGYuY3JlYXRlTm9kZVxuXHRcdHZhciBwcm90byA9IChAcHJvdG9Eb20gfHw9IGJ1aWxkTm9kZSlcblx0XHRwcm90by5jbG9uZU5vZGUoZmFsc2UpXG5cblx0ZGVmIHNlbGYuYnVpbGQgY3R4XG5cdFx0c2VsZi5uZXcoc2VsZi5jcmVhdGVOb2RlLGN0eClcblxuXHRkZWYgc2VsZi5kb21cblx0XHRAcHJvdG9Eb20gfHw9IGJ1aWxkTm9kZVxuXHRcdFxuXHRkZWYgc2VsZi5lbmRcblx0XHRjb21taXQoMClcblxuXHQjIyNcblx0Q2FsbGVkIHdoZW4gYSB0YWcgdHlwZSBpcyBiZWluZyBzdWJjbGFzc2VkLlxuXHQjIyNcblx0ZGVmIHNlbGYuaW5oZXJpdCBjaGlsZFxuXHRcdGNoaWxkLkBwcm90b0RvbSA9IG51bGxcblxuXHRcdGlmIEBub2RlVHlwZVxuXHRcdFx0Y2hpbGQuQG5vZGVUeXBlID0gQG5vZGVUeXBlXG5cdFx0XHRjaGlsZC5AY2xhc3NlcyA9IEBjbGFzc2VzLnNsaWNlXG5cblx0XHRcdGlmIGNoaWxkLkBmbGFnTmFtZVxuXHRcdFx0XHRjaGlsZC5AY2xhc3Nlcy5wdXNoKGNoaWxkLkBmbGFnTmFtZSlcblx0XHRlbHNlXG5cdFx0XHRjaGlsZC5Abm9kZVR5cGUgPSBjaGlsZC5AbmFtZVxuXHRcdFx0Y2hpbGQuQGZsYWdOYW1lID0gbnVsbFxuXHRcdFx0Y2hpbGQuQGNsYXNzZXMgPSBbXVxuXG5cdCMjI1xuXHRJbnRlcm5hbCBtZXRob2QgY2FsbGVkIGFmdGVyIGEgdGFnIGNsYXNzIGhhc1xuXHRiZWVuIGRlY2xhcmVkIG9yIGV4dGVuZGVkLlxuXHRcblx0QHByaXZhdGVcblx0IyMjXG5cdGRlZiBvcHRpbWl6ZVRhZ1N0cnVjdHVyZVxuXHRcdHJldHVybiB1bmxlc3MgJHdlYiRcblx0XHR2YXIgY3RvciA9IHNlbGY6Y29uc3RydWN0b3Jcblx0XHRsZXQga2V5cyA9IE9iamVjdC5rZXlzKHNlbGYpXG5cblx0XHRpZiBrZXlzLmluZGV4T2YoJ21vdW50JykgPj0gMFxuXHRcdFx0aWYgY3Rvci5AY2xhc3NlcyBhbmQgY3Rvci5AY2xhc3Nlcy5pbmRleE9mKCdfX21vdW50JykgID09IC0xXG5cdFx0XHRcdGN0b3IuQGNsYXNzZXMucHVzaCgnX19tb3VudCcpXG5cblx0XHRcdGlmIGN0b3IuQHByb3RvRG9tXG5cdFx0XHRcdGN0b3IuQHByb3RvRG9tOmNsYXNzTGlzdC5hZGQoJ19fbW91bnQnKVxuXG5cdFx0Zm9yIGtleSBpbiBrZXlzXG5cdFx0XHRJbWJhLkV2ZW50TWFuYWdlci5iaW5kKGtleS5zbGljZSgyKSkgaWYgKC9eb24vKS50ZXN0KGtleSlcblx0XHRzZWxmXG5cblxuXHRkZWYgaW5pdGlhbGl6ZSBkb20sY3R4XG5cdFx0c2VsZi5kb20gPSBkb21cblx0XHRzZWxmOiQgPSBUYWdDYWNoZS5idWlsZChzZWxmKVxuXHRcdHNlbGY6JHVwID0gQG93bmVyXyA9IGN0eFxuXHRcdEB0cmVlXyA9IG51bGxcblx0XHRzZWxmLkZMQUdTID0gMFxuXHRcdGJ1aWxkXG5cdFx0c2VsZlxuXG5cdGF0dHIgbmFtZSBpbmxpbmU6IG5vXG5cdGF0dHIgcm9sZSBpbmxpbmU6IG5vXG5cdGF0dHIgdGFiaW5kZXggaW5saW5lOiBub1xuXHRhdHRyIHRpdGxlXG5cblx0ZGVmIGRvbVxuXHRcdEBkb21cblx0XHRcblx0ZGVmIHNldERvbSBkb21cblx0XHRkb20uQHRhZyA9IHNlbGZcblx0XHRAZG9tID0gQHNsb3RfID0gZG9tXG5cdFx0c2VsZlxuXG5cdGRlZiByZWZcblx0XHRAcmVmXG5cdFx0XG5cdGRlZiByb290XG5cdFx0QG93bmVyXyA/IEBvd25lcl8ucm9vdCA6IHNlbGZcblxuXHQjIyNcblx0U2V0dGluZyByZWZlcmVuY2VzIGZvciB0YWdzIGxpa2Vcblx0YDxkaXZAaGVhZGVyPmAgd2lsbCBjb21waWxlIHRvIGB0YWcoJ2RpdicpLnJlZl8oJ2hlYWRlcicsdGhpcykuZW5kKClgXG5cdEJ5IGRlZmF1bHQgaXQgYWRkcyB0aGUgcmVmZXJlbmNlIGFzIGEgY2xhc3NOYW1lIHRvIHRoZSB0YWcuXG5cblx0QHJldHVybiB7c2VsZn1cblx0QHByaXZhdGVcblx0IyMjXG5cdGRlZiByZWZfIHJlZlxuXHRcdGZsYWcoQHJlZiA9IHJlZilcblx0XHRzZWxmXG5cblx0IyMjXG5cdFNldCB0aGUgZGF0YSBvYmplY3QgZm9yIG5vZGVcblx0QHJldHVybiB7c2VsZn1cblx0IyMjXG5cdGRlZiBkYXRhPSBkYXRhXG5cdFx0QGRhdGEgPSBkYXRhXG5cblx0IyMjXG5cdEdldCB0aGUgZGF0YSBvYmplY3QgZm9yIG5vZGVcblx0IyMjXG5cdGRlZiBkYXRhXG5cdFx0QGRhdGFcblx0XHRcblx0XHRcblx0ZGVmIGJpbmREYXRhIHRhcmdldCwgcGF0aCwgYXJnc1xuXHRcdHNldERhdGEoYXJncyA/IHRhcmdldFtwYXRoXS5hcHBseSh0YXJnZXQsYXJncykgOiB0YXJnZXRbcGF0aF0pXG5cblx0IyMjXG5cdFNldCBpbm5lciBodG1sIG9mIG5vZGVcblx0IyMjXG5cdGRlZiBodG1sPSBodG1sXG5cdFx0aWYgc2VsZi5odG1sICE9IGh0bWxcblx0XHRcdEBkb206aW5uZXJIVE1MID0gaHRtbFxuXG5cdCMjI1xuXHRHZXQgaW5uZXIgaHRtbCBvZiBub2RlXG5cdCMjI1xuXHRkZWYgaHRtbFxuXHRcdEBkb206aW5uZXJIVE1MXG5cdFxuXHRkZWYgb24kIHNsb3QsaGFuZGxlcixjb250ZXh0XG5cdFx0bGV0IGhhbmRsZXJzID0gQG9uXyB8fD0gW11cblx0XHRsZXQgcHJldiA9IGhhbmRsZXJzW3Nsb3RdXG5cdFx0IyBzZWxmLWJvdW5kIGhhbmRsZXJzXG5cdFx0aWYgc2xvdCA8IDBcblx0XHRcdGlmIHByZXYgPT0gdW5kZWZpbmVkXG5cdFx0XHRcdHNsb3QgPSBoYW5kbGVyc1tzbG90XSA9IGhhbmRsZXJzOmxlbmd0aFxuXHRcdFx0ZWxzZVxuXHRcdFx0XHRzbG90ID0gcHJldlxuXHRcdFx0cHJldiA9IGhhbmRsZXJzW3Nsb3RdXG5cdFx0XG5cdFx0aGFuZGxlcnNbc2xvdF0gPSBoYW5kbGVyXG5cdFx0aWYgcHJldlxuXHRcdFx0aGFuZGxlcjpzdGF0ZSA9IHByZXY6c3RhdGVcblx0XHRlbHNlXG5cdFx0XHRoYW5kbGVyOnN0YXRlID0ge2NvbnRleHQ6IGNvbnRleHR9XG5cdFx0XHRJbWJhLkV2ZW50TWFuYWdlci5iaW5kKGhhbmRsZXJbMF0pIGlmICR3ZWIkXG5cdFx0cmV0dXJuIHNlbGZcblxuXG5cdGRlZiBpZD0gaWRcblx0XHRpZiBpZCAhPSBudWxsXG5cdFx0XHRkb206aWQgPSBpZFxuXG5cdGRlZiBpZFxuXHRcdGRvbTppZFxuXG5cdCMjI1xuXHRBZGRzIGEgbmV3IGF0dHJpYnV0ZSBvciBjaGFuZ2VzIHRoZSB2YWx1ZSBvZiBhbiBleGlzdGluZyBhdHRyaWJ1dGVcblx0b24gdGhlIHNwZWNpZmllZCB0YWcuIElmIHRoZSB2YWx1ZSBpcyBudWxsIG9yIGZhbHNlLCB0aGUgYXR0cmlidXRlXG5cdHdpbGwgYmUgcmVtb3ZlZC5cblx0QHJldHVybiB7c2VsZn1cblx0IyMjXG5cdGRlZiBzZXRBdHRyaWJ1dGUgbmFtZSwgdmFsdWVcblx0XHR2YXIgb2xkID0gZG9tLmdldEF0dHJpYnV0ZShuYW1lKVxuXG5cdFx0aWYgb2xkID09IHZhbHVlXG5cdFx0XHR2YWx1ZVxuXHRcdGVsaWYgdmFsdWUgIT0gbnVsbCAmJiB2YWx1ZSAhPT0gZmFsc2Vcblx0XHRcdGRvbS5zZXRBdHRyaWJ1dGUobmFtZSx2YWx1ZSlcblx0XHRlbHNlXG5cdFx0XHRkb20ucmVtb3ZlQXR0cmlidXRlKG5hbWUpXG5cdFx0cmV0dXJuIHNlbGZcblxuXHRkZWYgc2V0TmVzdGVkQXR0ciBucywgbmFtZSwgdmFsdWUsIG1vZGlmaWVyc1xuXHRcdGlmIHNlbGZbbnMrJ1NldEF0dHJpYnV0ZSddXG5cdFx0XHRzZWxmW25zKydTZXRBdHRyaWJ1dGUnXShuYW1lLHZhbHVlLCBtb2RpZmllcnMpXG5cdFx0ZWxzZVxuXHRcdFx0c2V0QXR0cmlidXRlTlMobnMsIG5hbWUsdmFsdWUpXG5cdFx0cmV0dXJuIHNlbGZcblxuXHRkZWYgc2V0QXR0cmlidXRlTlMgbnMsIG5hbWUsIHZhbHVlXG5cdFx0dmFyIG9sZCA9IGdldEF0dHJpYnV0ZU5TKG5zLG5hbWUpXG5cblx0XHRpZiBvbGQgIT0gdmFsdWVcblx0XHRcdGlmIHZhbHVlICE9IG51bGwgJiYgdmFsdWUgIT09IGZhbHNlIFxuXHRcdFx0XHRkb20uc2V0QXR0cmlidXRlTlMobnMsbmFtZSx2YWx1ZSlcblx0XHRcdGVsc2Vcblx0XHRcdFx0ZG9tLnJlbW92ZUF0dHJpYnV0ZU5TKG5zLG5hbWUpXG5cdFx0cmV0dXJuIHNlbGZcblxuXG5cdCMjI1xuXHRyZW1vdmVzIGFuIGF0dHJpYnV0ZSBmcm9tIHRoZSBzcGVjaWZpZWQgdGFnXG5cdCMjI1xuXHRkZWYgcmVtb3ZlQXR0cmlidXRlIG5hbWVcblx0XHRkb20ucmVtb3ZlQXR0cmlidXRlKG5hbWUpXG5cblx0IyMjXG5cdHJldHVybnMgdGhlIHZhbHVlIG9mIGFuIGF0dHJpYnV0ZSBvbiB0aGUgdGFnLlxuXHRJZiB0aGUgZ2l2ZW4gYXR0cmlidXRlIGRvZXMgbm90IGV4aXN0LCB0aGUgdmFsdWUgcmV0dXJuZWRcblx0d2lsbCBlaXRoZXIgYmUgbnVsbCBvciBcIlwiICh0aGUgZW1wdHkgc3RyaW5nKVxuXHQjIyNcblx0ZGVmIGdldEF0dHJpYnV0ZSBuYW1lXG5cdFx0ZG9tLmdldEF0dHJpYnV0ZShuYW1lKVxuXG5cblx0ZGVmIGdldEF0dHJpYnV0ZU5TIG5zLCBuYW1lXG5cdFx0ZG9tLmdldEF0dHJpYnV0ZU5TKG5zLG5hbWUpXG5cdFxuXHRcblx0ZGVmIHNldCBrZXksIHZhbHVlLCBtb2RzXG5cdFx0bGV0IHNldHRlciA9IEltYmEudG9TZXR0ZXIoa2V5KVxuXHRcdGlmIHNlbGZbc2V0dGVyXSBpc2EgRnVuY3Rpb25cblx0XHRcdHNlbGZbc2V0dGVyXSh2YWx1ZSxtb2RzKVxuXHRcdGVsc2Vcblx0XHRcdEBkb206c2V0QXR0cmlidXRlKGtleSx2YWx1ZSlcblx0XHRzZWxmXG5cdFxuXHRcblx0ZGVmIGdldCBrZXlcblx0XHRAZG9tOmdldEF0dHJpYnV0ZShrZXkpXG5cblx0IyMjXG5cdE92ZXJyaWRlIHRoaXMgdG8gcHJvdmlkZSBzcGVjaWFsIHdyYXBwaW5nIGV0Yy5cblx0QHJldHVybiB7c2VsZn1cblx0IyMjXG5cdGRlZiBzZXRDb250ZW50IGNvbnRlbnQsIHR5cGVcblx0XHRzZXRDaGlsZHJlbiBjb250ZW50LCB0eXBlXG5cdFx0c2VsZlxuXG5cdCMjI1xuXHRTZXQgdGhlIGNoaWxkcmVuIG9mIG5vZGUuIHR5cGUgcGFyYW0gaXMgb3B0aW9uYWwsXG5cdGFuZCBzaG91bGQgb25seSBiZSB1c2VkIGJ5IEltYmEgd2hlbiBjb21waWxpbmcgdGFnIHRyZWVzLiBcblx0QHJldHVybiB7c2VsZn1cblx0IyMjXG5cdGRlZiBzZXRDaGlsZHJlbiBub2RlcywgdHlwZVxuXHRcdCMgb3ZlcnJpZGRlbiBvbiBjbGllbnQgYnkgcmVjb25jaWxlclxuXHRcdEB0cmVlXyA9IG5vZGVzXG5cdFx0c2VsZlxuXG5cdCMjI1xuXHRTZXQgdGhlIHRlbXBsYXRlIHRoYXQgd2lsbCByZW5kZXIgdGhlIGNvbnRlbnQgb2Ygbm9kZS5cblx0QHJldHVybiB7c2VsZn1cblx0IyMjXG5cdGRlZiBzZXRUZW1wbGF0ZSB0ZW1wbGF0ZVxuXHRcdHVubGVzcyBAdGVtcGxhdGVcblx0XHRcdGlmIHNlbGY6cmVuZGVyID09IEltYmEuVGFnOnByb3RvdHlwZTpyZW5kZXJcblx0XHRcdFx0c2VsZjpyZW5kZXIgPSBzZWxmOnJlbmRlclRlbXBsYXRlICMgZG8gc2V0Q2hpbGRyZW4ocmVuZGVyVGVtcGxhdGUpXG5cblx0XHRzZWxmOnRlbXBsYXRlID0gQHRlbXBsYXRlID0gdGVtcGxhdGVcblx0XHRzZWxmXG5cblx0ZGVmIHRlbXBsYXRlXG5cdFx0bnVsbFxuXG5cdCMjI1xuXHRJZiBubyBjdXN0b20gcmVuZGVyLW1ldGhvZCBpcyBkZWZpbmVkLCBhbmQgdGhlIG5vZGVcblx0aGFzIGEgdGVtcGxhdGUsIHRoaXMgbWV0aG9kIHdpbGwgYmUgdXNlZCB0byByZW5kZXJcblx0QHJldHVybiB7c2VsZn1cblx0IyMjXG5cdGRlZiByZW5kZXJUZW1wbGF0ZVxuXHRcdHZhciBib2R5ID0gdGVtcGxhdGVcblx0XHRzZXRDaGlsZHJlbihib2R5KSBpZiBib2R5ICE9IHNlbGZcblx0XHRzZWxmXG5cblxuXHQjIyNcblx0UmVtb3ZlIHNwZWNpZmllZCBjaGlsZCBmcm9tIGN1cnJlbnQgbm9kZS5cblx0QHJldHVybiB7c2VsZn1cblx0IyMjXG5cdGRlZiByZW1vdmVDaGlsZCBjaGlsZFxuXHRcdHZhciBwYXIgPSBkb21cblx0XHR2YXIgZWwgPSBjaGlsZC5Ac2xvdF8gb3IgY2hpbGRcblx0XHRpZiBlbCBhbmQgZWw6cGFyZW50Tm9kZSA9PSBwYXJcblx0XHRcdEltYmEuVGFnTWFuYWdlci5yZW1vdmUoZWwuQHRhZyBvciBlbCxzZWxmKVxuXHRcdFx0cGFyLnJlbW92ZUNoaWxkKGVsKVxuXHRcdHNlbGZcblx0XG5cdCMjI1xuXHRSZW1vdmUgYWxsIGNvbnRlbnQgaW5zaWRlIG5vZGVcblx0IyMjXG5cdGRlZiByZW1vdmVBbGxDaGlsZHJlblxuXHRcdGlmIEBkb206Zmlyc3RDaGlsZFxuXHRcdFx0dmFyIGVsXG5cdFx0XHR3aGlsZSBlbCA9IEBkb206Zmlyc3RDaGlsZFxuXHRcdFx0XHQkd2ViJCBhbmQgSW1iYS5UYWdNYW5hZ2VyLnJlbW92ZShlbC5AdGFnIG9yIGVsLHNlbGYpXG5cdFx0XHRcdEBkb20ucmVtb3ZlQ2hpbGQoZWwpXG5cdFx0QHRyZWVfID0gQHRleHRfID0gbnVsbFxuXHRcdHNlbGZcblxuXHQjIyNcblx0QXBwZW5kIGEgc2luZ2xlIGl0ZW0gKG5vZGUgb3Igc3RyaW5nKSB0byB0aGUgY3VycmVudCBub2RlLlxuXHRJZiBzdXBwbGllZCBpdGVtIGlzIGEgc3RyaW5nIGl0IHdpbGwgYXV0b21hdGljYWxseS4gVGhpcyBpcyB1c2VkXG5cdGJ5IEltYmEgaW50ZXJuYWxseSwgYnV0IHdpbGwgcHJhY3RpY2FsbHkgbmV2ZXIgYmUgdXNlZCBleHBsaWNpdGx5LlxuXHRAcmV0dXJuIHtzZWxmfVxuXHQjIyNcblx0ZGVmIGFwcGVuZENoaWxkIG5vZGVcblx0XHRpZiBub2RlIGlzYSBTdHJpbmdcblx0XHRcdGRvbS5hcHBlbmRDaGlsZChJbWJhLmRvY3VtZW50LmNyZWF0ZVRleHROb2RlKG5vZGUpKVxuXHRcdGVsaWYgbm9kZVxuXHRcdFx0ZG9tLmFwcGVuZENoaWxkKG5vZGUuQHNsb3RfIG9yIG5vZGUpXG5cdFx0XHRJbWJhLlRhZ01hbmFnZXIuaW5zZXJ0KG5vZGUuQHRhZyBvciBub2RlLCBzZWxmKVxuXHRcdFx0IyBGSVhNRSBlbnN1cmUgdGhlc2UgYXJlIG5vdCBjYWxsZWQgZm9yIHRleHQgbm9kZXNcblx0XHRzZWxmXG5cblx0IyMjXG5cdEluc2VydCBhIG5vZGUgaW50byB0aGUgY3VycmVudCBub2RlIChzZWxmKSwgYmVmb3JlIGFub3RoZXIuXG5cdFRoZSByZWxhdGl2ZSBub2RlIG11c3QgYmUgYSBjaGlsZCBvZiBjdXJyZW50IG5vZGUuIFxuXHQjIyNcblx0ZGVmIGluc2VydEJlZm9yZSBub2RlLCByZWxcblx0XHRpZiBub2RlIGlzYSBTdHJpbmdcblx0XHRcdG5vZGUgPSBJbWJhLmRvY3VtZW50LmNyZWF0ZVRleHROb2RlKG5vZGUpXG5cblx0XHRpZiBub2RlIGFuZCByZWxcblx0XHRcdGRvbS5pbnNlcnRCZWZvcmUoIChub2RlLkBzbG90XyBvciBub2RlKSwgKHJlbC5Ac2xvdF8gb3IgcmVsKSApXG5cdFx0XHRJbWJhLlRhZ01hbmFnZXIuaW5zZXJ0KG5vZGUuQHRhZyBvciBub2RlLCBzZWxmKVxuXHRcdFx0IyBGSVhNRSBlbnN1cmUgdGhlc2UgYXJlIG5vdCBjYWxsZWQgZm9yIHRleHQgbm9kZXNcblx0XHRzZWxmXG5cdFxuXHRkZWYgZGV0YWNoRnJvbVBhcmVudFxuXHRcdGlmIEBzbG90XyA9PSBAZG9tXG5cdFx0XHRAc2xvdF8gPSAoQGRvbS5AcGxhY2Vob2xkZXJfIHx8PSBJbWJhLmRvY3VtZW50LmNyZWF0ZUNvbW1lbnQoXCJub2RlXCIpKVxuXHRcdFx0QHNsb3RfLkB0YWcgfHw9IHNlbGZcblxuXHRcdFx0aWYgQGRvbTpwYXJlbnROb2RlXG5cdFx0XHRcdEltYmEuVGFnTWFuYWdlci5yZW1vdmUoc2VsZixAZG9tOnBhcmVudE5vZGUpXG5cdFx0XHRcdEBkb206cGFyZW50Tm9kZS5yZXBsYWNlQ2hpbGQoQHNsb3RfLEBkb20pXG5cdFx0c2VsZlxuXHRcdFxuXHRkZWYgYXR0YWNoVG9QYXJlbnRcblx0XHRpZiBAc2xvdF8gIT0gQGRvbVxuXHRcdFx0bGV0IHByZXYgPSBAc2xvdF9cblx0XHRcdEBzbG90XyA9IEBkb21cblx0XHRcdGlmIHByZXYgYW5kIHByZXY6cGFyZW50Tm9kZVxuXHRcdFx0XHRJbWJhLlRhZ01hbmFnZXIuaW5zZXJ0KHNlbGYpXG5cdFx0XHRcdHByZXY6cGFyZW50Tm9kZS5yZXBsYWNlQ2hpbGQoQGRvbSxwcmV2KVxuXHRcdFx0XHRcblx0XHRzZWxmXG5cblx0IyMjXG5cdFJlbW92ZSBub2RlIGZyb20gdGhlIGRvbSB0cmVlXG5cdEByZXR1cm4ge3NlbGZ9XG5cdCMjI1xuXHRkZWYgb3JwaGFuaXplXG5cdFx0cGFyLnJlbW92ZUNoaWxkKHNlbGYpIGlmIGxldCBwYXIgPSBwYXJlbnRcblx0XHRyZXR1cm4gc2VsZlxuXG5cdCMjI1xuXHRHZXQgdGV4dCBvZiBub2RlLiBVc2VzIHRleHRDb250ZW50IGJlaGluZCB0aGUgc2NlbmVzIChub3QgaW5uZXJUZXh0KVxuXHRbaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL05vZGUvdGV4dENvbnRlbnRdKClcblx0QHJldHVybiB7c3RyaW5nfSBpbm5lciB0ZXh0IG9mIG5vZGVcblx0IyMjXG5cdGRlZiB0ZXh0IHZcblx0XHRAZG9tOnRleHRDb250ZW50XG5cblx0IyMjXG5cdFNldCB0ZXh0IG9mIG5vZGUuIFVzZXMgdGV4dENvbnRlbnQgYmVoaW5kIHRoZSBzY2VuZXMgKG5vdCBpbm5lclRleHQpXG5cdFtodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvTm9kZS90ZXh0Q29udGVudF0oKVxuXHQjIyNcblx0ZGVmIHRleHQ9IHR4dFxuXHRcdEB0cmVlXyA9IHR4dFxuXHRcdEBkb206dGV4dENvbnRlbnQgPSAodHh0ID09IG51bGwgb3IgdGV4dCA9PT0gZmFsc2UpID8gJycgOiB0eHRcblx0XHRzZWxmXG5cblxuXHQjIyNcblx0TWV0aG9kIGZvciBnZXR0aW5nIGFuZCBzZXR0aW5nIGRhdGEtYXR0cmlidXRlcy4gV2hlbiBjYWxsZWQgd2l0aCB6ZXJvXG5cdGFyZ3VtZW50cyBpdCB3aWxsIHJldHVybiB0aGUgYWN0dWFsIGRhdGFzZXQgZm9yIHRoZSB0YWcuXG5cblx0XHR2YXIgbm9kZSA9IDxkaXYgZGF0YS1uYW1lPSdoZWxsbyc+XG5cdFx0IyBnZXQgdGhlIHdob2xlIGRhdGFzZXRcblx0XHRub2RlLmRhdGFzZXQgIyB7bmFtZTogJ2hlbGxvJ31cblx0XHQjIGdldCBhIHNpbmdsZSB2YWx1ZVxuXHRcdG5vZGUuZGF0YXNldCgnbmFtZScpICMgJ2hlbGxvJ1xuXHRcdCMgc2V0IGEgc2luZ2xlIHZhbHVlXG5cdFx0bm9kZS5kYXRhc2V0KCduYW1lJywnbmV3bmFtZScpICMgc2VsZlxuXG5cblx0IyMjXG5cdGRlZiBkYXRhc2V0IGtleSwgdmFsXG5cdFx0aWYga2V5IGlzYSBPYmplY3Rcblx0XHRcdGRhdGFzZXQoayx2KSBmb3Igb3duIGssdiBvZiBrZXlcblx0XHRcdHJldHVybiBzZWxmXG5cblx0XHRpZiBhcmd1bWVudHM6bGVuZ3RoID09IDJcblx0XHRcdHNldEF0dHJpYnV0ZShcImRhdGEte2tleX1cIix2YWwpXG5cdFx0XHRyZXR1cm4gc2VsZlxuXG5cdFx0aWYga2V5XG5cdFx0XHRyZXR1cm4gZ2V0QXR0cmlidXRlKFwiZGF0YS17a2V5fVwiKVxuXG5cdFx0dmFyIGRhdGFzZXQgPSBkb206ZGF0YXNldFxuXG5cdFx0dW5sZXNzIGRhdGFzZXRcblx0XHRcdGRhdGFzZXQgPSB7fVxuXHRcdFx0Zm9yIGF0cixpIGluIGRvbTphdHRyaWJ1dGVzXG5cdFx0XHRcdGlmIGF0cjpuYW1lLnN1YnN0cigwLDUpID09ICdkYXRhLSdcblx0XHRcdFx0XHRkYXRhc2V0W0ltYmEudG9DYW1lbENhc2UoYXRyOm5hbWUuc2xpY2UoNSkpXSA9IGF0cjp2YWx1ZVxuXG5cdFx0cmV0dXJuIGRhdGFzZXRcblxuXHQjIyNcblx0RW1wdHkgcGxhY2Vob2xkZXIuIE92ZXJyaWRlIHRvIGltcGxlbWVudCBjdXN0b20gcmVuZGVyIGJlaGF2aW91ci5cblx0V29ya3MgbXVjaCBsaWtlIHRoZSBmYW1pbGlhciByZW5kZXItbWV0aG9kIGluIFJlYWN0LlxuXHRAcmV0dXJuIHtzZWxmfVxuXHQjIyNcblx0ZGVmIHJlbmRlclxuXHRcdHNlbGZcblxuXHQjIyNcblx0Q2FsbGVkIGltcGxpY2l0bHkgd2hpbGUgdGFnIGlzIGluaXRpYWxpemluZy4gTm8gaW5pdGlhbCBwcm9wc1xuXHR3aWxsIGhhdmUgYmVlbiBzZXQgYXQgdGhpcyBwb2ludC5cblx0QHJldHVybiB7c2VsZn1cblx0IyMjXG5cdGRlZiBidWlsZFxuXHRcdHNlbGZcblxuXHQjIyNcblx0Q2FsbGVkIG9uY2UsIGltcGxpY2l0bHkgdGhyb3VnaCBJbWJhLlRhZyNlbmQuIEFsbCBpbml0aWFsIHByb3BzXG5cdGFuZCBjaGlsZHJlbiB3aWxsIGhhdmUgYmVlbiBzZXQgYmVmb3JlIHNldHVwIGlzIGNhbGxlZC5cblx0c2V0Q29udGVudC5cblx0QHJldHVybiB7c2VsZn1cblx0IyMjXG5cdGRlZiBzZXR1cFxuXHRcdHNlbGZcblxuXHQjIyNcblx0Q2FsbGVkIGltcGxpY2l0bHkgdGhyb3VnaCBJbWJhLlRhZyNlbmQsIGZvciB0YWdzIHRoYXQgYXJlIHBhcnQgb2Zcblx0YSB0YWcgdHJlZSAodGhhdCBhcmUgcmVuZGVyZWQgc2V2ZXJhbCB0aW1lcykuXG5cdEByZXR1cm4ge3NlbGZ9XG5cdCMjI1xuXHRkZWYgY29tbWl0XG5cdFx0cmVuZGVyIGlmIGJlZm9yZVJlbmRlciAhPT0gZmFsc2Vcblx0XHRzZWxmXG5cdFx0XG5cdGRlZiBiZWZvcmVSZW5kZXJcblx0XHRzZWxmXG5cblx0IyMjXG5cblx0Q2FsbGVkIGJ5IHRoZSB0YWctc2NoZWR1bGVyIChpZiB0aGlzIHRhZyBpcyBzY2hlZHVsZWQpXG5cdEJ5IGRlZmF1bHQgaXQgd2lsbCBjYWxsIHRoaXMucmVuZGVyLiBEbyBub3Qgb3ZlcnJpZGUgdW5sZXNzXG5cdHlvdSByZWFsbHkgdW5kZXJzdGFuZCBpdC5cblxuXHQjIyNcblx0ZGVmIHRpY2tcblx0XHRyZW5kZXIgaWYgYmVmb3JlUmVuZGVyICE9PSBmYWxzZVxuXHRcdHNlbGZcblxuXHQjIyNcblx0XG5cdEEgdmVyeSBpbXBvcnRhbnQgbWV0aG9kIHRoYXQgeW91IHdpbGwgcHJhY3RpY2FsbHkgbmV2ZXIgbWFudWFsbHkuXG5cdFRoZSB0YWcgc3ludGF4IG9mIEltYmEgY29tcGlsZXMgdG8gYSBjaGFpbiBvZiBzZXR0ZXJzLCB3aGljaCBhbHdheXNcblx0ZW5kcyB3aXRoIC5lbmQuIGA8YS5sYXJnZT5gIGNvbXBpbGVzIHRvIGB0YWcoJ2EnKS5mbGFnKCdsYXJnZScpLmVuZCgpYFxuXHRcblx0WW91IGFyZSBoaWdobHkgYWR2aWNlZCB0byBub3Qgb3ZlcnJpZGUgaXRzIGJlaGF2aW91ci4gVGhlIGZpcnN0IHRpbWVcblx0ZW5kIGlzIGNhbGxlZCBpdCB3aWxsIG1hcmsgdGhlIHRhZyBhcyBpbml0aWFsaXplZCBhbmQgY2FsbCBJbWJhLlRhZyNzZXR1cCxcblx0YW5kIGNhbGwgSW1iYS5UYWcjY29tbWl0IGV2ZXJ5IHRpbWUuXG5cdEByZXR1cm4ge3NlbGZ9XG5cdCMjI1xuXHRkZWYgZW5kXG5cdFx0c2V0dXBcblx0XHRjb21taXQoMClcblx0XHR0aGlzOmVuZCA9IEltYmEuVGFnOmVuZFxuXHRcdHJldHVybiBzZWxmXG5cdFx0XG5cdCMgY2FsbGVkIG9uIDxzZWxmPiB0byBjaGVjayBpZiBzZWxmIGlzIGNhbGxlZCBmcm9tIG90aGVyIHBsYWNlc1xuXHRkZWYgJG9wZW4gY29udGV4dFxuXHRcdGlmIGNvbnRleHQgIT0gQGNvbnRleHRfXG5cdFx0XHRAdHJlZV8gPSBudWxsXG5cdFx0XHRAY29udGV4dF8gPSBjb250ZXh0XG5cdFx0c2VsZlxuXG5cdCMjI1xuXHRUaGlzIGlzIGNhbGxlZCBpbnN0ZWFkIG9mIEltYmEuVGFnI2VuZCBmb3IgYDxzZWxmPmAgdGFnIGNoYWlucy5cblx0RGVmYXVsdHMgdG8gbm9vcFxuXHRAcmV0dXJuIHtzZWxmfVxuXHQjIyNcblx0ZGVmIHN5bmNlZFxuXHRcdHNlbGZcblxuXHQjIGNhbGxlZCB3aGVuIHRoZSBub2RlIGlzIGF3YWtlbmVkIGluIHRoZSBkb20gLSBlaXRoZXIgYXV0b21hdGljYWxseVxuXHQjIHVwb24gYXR0YWNobWVudCB0byB0aGUgZG9tLXRyZWUsIG9yIHRoZSBmaXJzdCB0aW1lIGltYmEgbmVlZHMgdGhlXG5cdCMgdGFnIGZvciBhIGRvbW5vZGUgdGhhdCBoYXMgYmVlbiByZW5kZXJlZCBvbiB0aGUgc2VydmVyXG5cdGRlZiBhd2FrZW5cblx0XHRzZWxmXG5cblx0IyMjXG5cdExpc3Qgb2YgZmxhZ3MgZm9yIHRoaXMgbm9kZS4gXG5cdCMjI1xuXHRkZWYgZmxhZ3Ncblx0XHRAZG9tOmNsYXNzTGlzdFxuXG5cdCMjI1xuXHRBZGQgc3BlZmljaWVkIGZsYWcgdG8gY3VycmVudCBub2RlLlxuXHRJZiBhIHNlY29uZCBhcmd1bWVudCBpcyBzdXBwbGllZCwgaXQgd2lsbCBiZSBjb2VyY2VkIGludG8gYSBCb29sZWFuLFxuXHRhbmQgdXNlZCB0byBpbmRpY2F0ZSB3aGV0aGVyIHdlIHNob3VsZCByZW1vdmUgdGhlIGZsYWcgaW5zdGVhZC5cblx0QHJldHVybiB7c2VsZn1cblx0IyMjXG5cdGRlZiBmbGFnIG5hbWUsIHRvZ2dsZXJcblx0XHQjIGl0IGlzIG1vc3QgbmF0dXJhbCB0byB0cmVhdCBhIHNlY29uZCB1bmRlZmluZWQgYXJndW1lbnQgYXMgYSBuby1zd2l0Y2hcblx0XHQjIHNvIHdlIG5lZWQgdG8gY2hlY2sgdGhlIGFyZ3VtZW50cy1sZW5ndGhcblx0XHRpZiBhcmd1bWVudHM6bGVuZ3RoID09IDJcblx0XHRcdGlmIEBkb206Y2xhc3NMaXN0LmNvbnRhaW5zKG5hbWUpICE9ICEhdG9nZ2xlclxuXHRcdFx0XHRAZG9tOmNsYXNzTGlzdC50b2dnbGUobmFtZSlcblx0XHRlbHNlXG5cdFx0XHQjIGZpcmVmb3ggd2lsbCB0cmlnZ2VyIGEgY2hhbmdlIGlmIGFkZGluZyBleGlzdGluZyBjbGFzc1xuXHRcdFx0QGRvbTpjbGFzc0xpc3QuYWRkKG5hbWUpIHVubGVzcyBAZG9tOmNsYXNzTGlzdC5jb250YWlucyhuYW1lKVxuXHRcdHJldHVybiBzZWxmXG5cblx0IyMjXG5cdFJlbW92ZSBzcGVjaWZpZWQgZmxhZyBmcm9tIG5vZGVcblx0QHJldHVybiB7c2VsZn1cblx0IyMjXG5cdGRlZiB1bmZsYWcgbmFtZVxuXHRcdEBkb206Y2xhc3NMaXN0LnJlbW92ZShuYW1lKVxuXHRcdHNlbGZcblxuXHQjIyNcblx0VG9nZ2xlIHNwZWNpZmllZCBmbGFnIG9uIG5vZGVcblx0QHJldHVybiB7c2VsZn1cblx0IyMjXG5cdGRlZiB0b2dnbGVGbGFnIG5hbWVcblx0XHRAZG9tOmNsYXNzTGlzdC50b2dnbGUobmFtZSlcblx0XHRzZWxmXG5cblx0IyMjXG5cdENoZWNrIHdoZXRoZXIgY3VycmVudCBub2RlIGhhcyBzcGVjaWZpZWQgZmxhZ1xuXHRAcmV0dXJuIHtib29sfVxuXHQjIyNcblx0ZGVmIGhhc0ZsYWcgbmFtZVxuXHRcdEBkb206Y2xhc3NMaXN0LmNvbnRhaW5zKG5hbWUpXG5cblx0XG5cdGRlZiBmbGFnSWYgZmxhZywgYm9vbFxuXHRcdHZhciBmID0gQGZsYWdzXyB8fD0ge31cblx0XHRsZXQgcHJldiA9IGZbZmxhZ11cblxuXHRcdGlmIGJvb2wgYW5kICFwcmV2XG5cdFx0XHRAZG9tOmNsYXNzTGlzdC5hZGQoZmxhZylcblx0XHRcdGZbZmxhZ10gPSB5ZXNcblx0XHRlbGlmIHByZXYgYW5kICFib29sXG5cdFx0XHRAZG9tOmNsYXNzTGlzdC5yZW1vdmUoZmxhZylcblx0XHRcdGZbZmxhZ10gPSBub1xuXG5cdFx0cmV0dXJuIHNlbGZcblx0XHRcblx0IyMjXG5cdFNldC91cGRhdGUgYSBuYW1lZCBmbGFnLiBJdCByZW1lbWJlcnMgdGhlIHByZXZpb3VzXG5cdHZhbHVlIG9mIHRoZSBmbGFnLCBhbmQgcmVtb3ZlcyBpdCBiZWZvcmUgc2V0dGluZyB0aGUgbmV3IHZhbHVlLlxuXG5cdFx0bm9kZS5zZXRGbGFnKCd0eXBlJywndG9kbycpXG5cdFx0bm9kZS5zZXRGbGFnKCd0eXBlJywncHJvamVjdCcpXG5cdFx0IyB0b2RvIGlzIHJlbW92ZWQsIHByb2plY3QgaXMgYWRkZWQuXG5cblx0QHJldHVybiB7c2VsZn1cblx0IyMjXG5cdGRlZiBzZXRGbGFnIG5hbWUsIHZhbHVlXG5cdFx0bGV0IGZsYWdzID0gQG5hbWVkRmxhZ3NfIHx8PSB7fVxuXHRcdGxldCBwcmV2ID0gZmxhZ3NbbmFtZV1cblx0XHRpZiBwcmV2ICE9IHZhbHVlXG5cdFx0XHR1bmZsYWcocHJldikgaWYgcHJldlxuXHRcdFx0ZmxhZyh2YWx1ZSkgaWYgdmFsdWVcblx0XHRcdGZsYWdzW25hbWVdID0gdmFsdWVcblx0XHRyZXR1cm4gc2VsZlxuXG5cblx0IyMjXG5cdEdldCB0aGUgc2NoZWR1bGVyIGZvciB0aGlzIG5vZGUuIEEgbmV3IHNjaGVkdWxlciB3aWxsIGJlIGNyZWF0ZWRcblx0aWYgaXQgZG9lcyBub3QgYWxyZWFkeSBleGlzdC5cblxuXHRAcmV0dXJuIHtJbWJhLlNjaGVkdWxlcn1cblx0IyMjXG5cdGRlZiBzY2hlZHVsZXJcblx0XHRAc2NoZWR1bGVyID89IEltYmEuU2NoZWR1bGVyLm5ldyhzZWxmKVxuXG5cdCMjI1xuXG5cdFNob3J0aGFuZCB0byBzdGFydCBzY2hlZHVsaW5nIGEgbm9kZS4gVGhlIG1ldGhvZCB3aWxsIGJhc2ljYWxseVxuXHRwcm94eSB0aGUgYXJndW1lbnRzIHRocm91Z2ggdG8gc2NoZWR1bGVyLmNvbmZpZ3VyZSwgYW5kIHRoZW5cblx0YWN0aXZhdGUgdGhlIHNjaGVkdWxlci5cblx0XG5cdEByZXR1cm4ge3NlbGZ9XG5cdCMjI1xuXHRkZWYgc2NoZWR1bGUgb3B0aW9ucyA9IHtldmVudHM6IHllc31cblx0XHRzY2hlZHVsZXIuY29uZmlndXJlKG9wdGlvbnMpLmFjdGl2YXRlXG5cdFx0c2VsZlxuXG5cdCMjI1xuXHRTaG9ydGhhbmQgZm9yIGRlYWN0aXZhdGluZyBzY2hlZHVsZXIgKGlmIHRhZyBoYXMgb25lKS5cblx0QGRlcHJlY2F0ZWRcblx0IyMjXG5cdGRlZiB1bnNjaGVkdWxlXG5cdFx0c2NoZWR1bGVyLmRlYWN0aXZhdGUgaWYgQHNjaGVkdWxlclxuXHRcdHNlbGZcblxuXG5cdCMjI1xuXHRHZXQgdGhlIHBhcmVudCBvZiBjdXJyZW50IG5vZGVcblx0QHJldHVybiB7SW1iYS5UYWd9IFxuXHQjIyNcblx0ZGVmIHBhcmVudFxuXHRcdEltYmEuZ2V0VGFnRm9yRG9tKGRvbTpwYXJlbnROb2RlKVxuXG5cdCMjI1xuXHRHZXQgdGhlIGNoaWxkcmVuIG9mIG5vZGVcblx0QHJldHVybiB7SW1iYS5UYWdbXX1cblx0IyMjXG5cdGRlZiBjaGlsZHJlbiBzZWxcblx0XHRmb3IgaXRlbSBpbiBAZG9tOmNoaWxkcmVuXG5cdFx0XHRpdGVtLkB0YWcgb3IgSW1iYS5nZXRUYWdGb3JEb20oaXRlbSlcblx0XG5cdGRlZiBxdWVyeVNlbGVjdG9yIHFcblx0XHRJbWJhLmdldFRhZ0ZvckRvbShAZG9tLnF1ZXJ5U2VsZWN0b3IocSkpXG5cblx0ZGVmIHF1ZXJ5U2VsZWN0b3JBbGwgcVxuXHRcdHZhciBpdGVtcyA9IFtdXG5cdFx0Zm9yIGl0ZW0gaW4gQGRvbS5xdWVyeVNlbGVjdG9yQWxsKHEpXG5cdFx0XHRpdGVtcy5wdXNoKCBJbWJhLmdldFRhZ0ZvckRvbShpdGVtKSApXG5cdFx0cmV0dXJuIGl0ZW1zXG5cblx0IyMjXG5cdENoZWNrIGlmIHRoaXMgbm9kZSBtYXRjaGVzIGEgc2VsZWN0b3Jcblx0QHJldHVybiB7Qm9vbGVhbn1cblx0IyMjXG5cdGRlZiBtYXRjaGVzIHNlbFxuXHRcdGlmIHNlbCBpc2EgRnVuY3Rpb25cblx0XHRcdHJldHVybiBzZWwoc2VsZilcblxuXHRcdHNlbCA9IHNlbC5xdWVyeSBpZiBzZWw6cXVlcnkgaXNhIEZ1bmN0aW9uXG5cdFx0aWYgdmFyIGZuID0gKEBkb206bWF0Y2hlcyBvciBAZG9tOm1hdGNoZXNTZWxlY3RvciBvciBAZG9tOndlYmtpdE1hdGNoZXNTZWxlY3RvciBvciBAZG9tOm1zTWF0Y2hlc1NlbGVjdG9yIG9yIEBkb206bW96TWF0Y2hlc1NlbGVjdG9yKVxuXHRcdFx0cmV0dXJuIGZuLmNhbGwoQGRvbSxzZWwpXG5cblx0IyMjXG5cdEdldCB0aGUgZmlyc3QgZWxlbWVudCBtYXRjaGluZyBzdXBwbGllZCBzZWxlY3RvciAvIGZpbHRlclxuXHR0cmF2ZXJzaW5nIHVwd2FyZHMsIGJ1dCBpbmNsdWRpbmcgdGhlIG5vZGUgaXRzZWxmLlxuXHRAcmV0dXJuIHtJbWJhLlRhZ31cblx0IyMjXG5cdGRlZiBjbG9zZXN0IHNlbFxuXHRcdEltYmEuZ2V0VGFnRm9yRG9tKEBkb20uY2xvc2VzdChzZWwpKVxuXG5cdCMjI1xuXHRDaGVjayBpZiBub2RlIGNvbnRhaW5zIG90aGVyIG5vZGVcblx0QHJldHVybiB7Qm9vbGVhbn0gXG5cdCMjI1xuXHRkZWYgY29udGFpbnMgbm9kZVxuXHRcdGRvbS5jb250YWlucyhub2RlLkBkb20gb3Igbm9kZSlcblxuXG5cdCMjI1xuXHRTaG9ydGhhbmQgZm9yIGNvbnNvbGUubG9nIG9uIGVsZW1lbnRzXG5cdEByZXR1cm4ge3NlbGZ9XG5cdCMjI1xuXHRkZWYgbG9nICphcmdzXG5cdFx0YXJncy51bnNoaWZ0KGNvbnNvbGUpXG5cdFx0RnVuY3Rpb246cHJvdG90eXBlOmNhbGwuYXBwbHkoY29uc29sZTpsb2csIGFyZ3MpXG5cdFx0c2VsZlxuXG5cdGRlZiBjc3Mga2V5LCB2YWwsIG1vZFxuXHRcdGlmIGtleSBpc2EgT2JqZWN0XG5cdFx0XHRjc3Moayx2KSBmb3Igb3duIGssdiBvZiBrZXlcblx0XHRcdHJldHVybiBzZWxmXG5cblx0XHR2YXIgbmFtZSA9IEltYmEuQ1NTS2V5TWFwW2tleV0gb3Iga2V5XG5cblx0XHRpZiB2YWwgPT0gbnVsbFxuXHRcdFx0ZG9tOnN0eWxlLnJlbW92ZVByb3BlcnR5KG5hbWUpXG5cdFx0ZWxpZiB2YWwgPT0gdW5kZWZpbmVkIGFuZCBhcmd1bWVudHM6bGVuZ3RoID09IDFcblx0XHRcdHJldHVybiBkb206c3R5bGVbbmFtZV1cblx0XHRlbGlmIG5hbWUubWF0Y2goL14tLS8pXG5cdFx0XHRkb206c3R5bGUuc2V0UHJvcGVydHkobmFtZSx2YWwpXG5cdFx0ZWxzZVxuXHRcdFx0aWYgdmFsIGlzYSBOdW1iZXIgYW5kIChuYW1lLm1hdGNoKC93aWR0aHxoZWlnaHR8bGVmdHxyaWdodHx0b3B8Ym90dG9tLykgb3IgKG1vZCBhbmQgbW9kOnB4KSlcblx0XHRcdFx0ZG9tOnN0eWxlW25hbWVdID0gdmFsICsgXCJweFwiXG5cdFx0XHRlbHNlXG5cdFx0XHRcdGRvbTpzdHlsZVtuYW1lXSA9IHZhbFxuXHRcdHNlbGZcblx0XHRcblx0ZGVmIHNldFN0eWxlIHN0eWxlXG5cdFx0c2V0QXR0cmlidXRlKCdzdHlsZScsc3R5bGUpXG5cblx0ZGVmIHN0eWxlXG5cdFx0Z2V0QXR0cmlidXRlKCdzdHlsZScpXG5cblx0IyMjXG5cdFRyaWdnZXIgYW4gZXZlbnQgZnJvbSBjdXJyZW50IG5vZGUuIERpc3BhdGNoZWQgdGhyb3VnaCB0aGUgSW1iYSBldmVudCBtYW5hZ2VyLlxuXHRUbyBkaXNwYXRjaCBhY3R1YWwgZG9tIGV2ZW50cywgdXNlIGRvbS5kaXNwYXRjaEV2ZW50IGluc3RlYWQuXG5cblx0QHJldHVybiB7SW1iYS5FdmVudH1cblx0IyMjXG5cdGRlZiB0cmlnZ2VyIG5hbWUsIGRhdGEgPSB7fVxuXHRcdCR3ZWIkID8gSW1iYS5FdmVudHMudHJpZ2dlcihuYW1lLHNlbGYsZGF0YTogZGF0YSkgOiBudWxsXG5cblx0IyMjXG5cdEZvY3VzIG9uIGN1cnJlbnQgbm9kZVxuXHRAcmV0dXJuIHtzZWxmfVxuXHQjIyNcblx0ZGVmIGZvY3VzXG5cdFx0ZG9tLmZvY3VzXG5cdFx0c2VsZlxuXG5cdCMjI1xuXHRSZW1vdmUgZm9jdXMgZnJvbSBjdXJyZW50IG5vZGVcblx0QHJldHVybiB7c2VsZn1cblx0IyMjXG5cdGRlZiBibHVyXG5cdFx0ZG9tLmJsdXJcblx0XHRzZWxmXG5cblx0ZGVmIHRvU3RyaW5nXG5cdFx0ZG9tOm91dGVySFRNTFxuXHRcblxuSW1iYS5UYWc6cHJvdG90eXBlOmluaXRpYWxpemUgPSBJbWJhLlRhZ1xuXG5jbGFzcyBJbWJhLlNWR1RhZyA8IEltYmEuVGFnXG5cblx0ZGVmIHNlbGYubmFtZXNwYWNlVVJJXG5cdFx0XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiXG5cblx0ZGVmIHNlbGYuYnVpbGROb2RlXG5cdFx0dmFyIGRvbSA9IEltYmEuZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKG5hbWVzcGFjZVVSSSxAbm9kZVR5cGUpXG5cdFx0aWYgQGNsYXNzZXNcblx0XHRcdHZhciBjbHMgPSBAY2xhc3Nlcy5qb2luKFwiIFwiKVxuXHRcdFx0ZG9tOmNsYXNzTmFtZTpiYXNlVmFsID0gY2xzIGlmIGNsc1xuXHRcdGRvbVxuXG5cdGRlZiBzZWxmLmluaGVyaXQgY2hpbGRcblx0XHRjaGlsZC5AcHJvdG9Eb20gPSBudWxsXG5cdFx0XG5cdFx0aWYgc2VsZiA9PSBJbWJhLlNWR1RhZ1xuXHRcdFx0Y2hpbGQuQG5vZGVUeXBlID0gY2hpbGQuQG5hbWVcblx0XHRcdGNoaWxkLkBjbGFzc2VzID0gW11cblx0XHRlbHNlXG5cdFx0XHRjaGlsZC5Abm9kZVR5cGUgPSBAbm9kZVR5cGVcblx0XHRcdHZhciBjbGFzc05hbWUgPSBcIl9cIiArIGNoaWxkLkBuYW1lLnJlcGxhY2UoL18vZywgJy0nKVxuXHRcdFx0Y2hpbGQuQGNsYXNzZXMgPSAoQGNsYXNzZXMgb3IgW10pLmNvbmNhdChjbGFzc05hbWUpXG5cbkltYmEuSFRNTF9UQUdTID0gXCJhIGFiYnIgYWRkcmVzcyBhcmVhIGFydGljbGUgYXNpZGUgYXVkaW8gYiBiYXNlIGJkaSBiZG8gYmlnIGJsb2NrcXVvdGUgYm9keSBiciBidXR0b24gY2FudmFzIGNhcHRpb24gY2l0ZSBjb2RlIGNvbCBjb2xncm91cCBkYXRhIGRhdGFsaXN0IGRkIGRlbCBkZXRhaWxzIGRmbiBkaXYgZGwgZHQgZW0gZW1iZWQgZmllbGRzZXQgZmlnY2FwdGlvbiBmaWd1cmUgZm9vdGVyIGZvcm0gaDEgaDIgaDMgaDQgaDUgaDYgaGVhZCBoZWFkZXIgaHIgaHRtbCBpIGlmcmFtZSBpbWcgaW5wdXQgaW5zIGtiZCBrZXlnZW4gbGFiZWwgbGVnZW5kIGxpIGxpbmsgbWFpbiBtYXAgbWFyayBtZW51IG1lbnVpdGVtIG1ldGEgbWV0ZXIgbmF2IG5vc2NyaXB0IG9iamVjdCBvbCBvcHRncm91cCBvcHRpb24gb3V0cHV0IHAgcGFyYW0gcHJlIHByb2dyZXNzIHEgcnAgcnQgcnVieSBzIHNhbXAgc2NyaXB0IHNlY3Rpb24gc2VsZWN0IHNtYWxsIHNvdXJjZSBzcGFuIHN0cm9uZyBzdHlsZSBzdWIgc3VtbWFyeSBzdXAgdGFibGUgdGJvZHkgdGQgdGV4dGFyZWEgdGZvb3QgdGggdGhlYWQgdGltZSB0aXRsZSB0ciB0cmFjayB1IHVsIHZhciB2aWRlbyB3YnJcIi5zcGxpdChcIiBcIilcbkltYmEuSFRNTF9UQUdTX1VOU0FGRSA9IFwiYXJ0aWNsZSBhc2lkZSBoZWFkZXIgc2VjdGlvblwiLnNwbGl0KFwiIFwiKVxuXG5JbWJhLkhUTUxfQVRUUlMgPVxuXHRhOiBcImhyZWYgdGFyZ2V0IGhyZWZsYW5nIG1lZGlhIGRvd25sb2FkIHJlbCB0eXBlXCJcblx0Zm9ybTogXCJtZXRob2QgYWN0aW9uIGVuY3R5cGUgYXV0b2NvbXBsZXRlIHRhcmdldFwiXG5cdGJ1dHRvbjogXCJhdXRvZm9jdXMgdHlwZVwiXG5cdGlucHV0OiBcImFjY2VwdCBkaXNhYmxlZCBmb3JtIGxpc3QgbWF4IG1heGxlbmd0aCBtaW4gbWlubGVuZ3RoIHBhdHRlcm4gcmVxdWlyZWQgc2l6ZSBzdGVwIHR5cGVcIlxuXHRsYWJlbDogXCJhY2Nlc3NrZXkgZm9yIGZvcm1cIlxuXHRpbWc6IFwic3JjIHNyY3NldFwiXG5cdGxpbms6IFwicmVsIHR5cGUgaHJlZiBtZWRpYVwiXG5cdGlmcmFtZTogXCJyZWZlcnJlcnBvbGljeSBzcmMgc3JjZG9jIHNhbmRib3hcIlxuXHRtZXRhOiBcInByb3BlcnR5IGNvbnRlbnQgY2hhcnNldCBkZXNjXCJcblx0b3B0Z3JvdXA6IFwibGFiZWxcIlxuXHRvcHRpb246IFwibGFiZWxcIlxuXHRvdXRwdXQ6IFwiZm9yIGZvcm1cIlxuXHRvYmplY3Q6IFwidHlwZSBkYXRhIHdpZHRoIGhlaWdodFwiXG5cdHBhcmFtOiBcIm5hbWUgdmFsdWVcIlxuXHRwcm9ncmVzczogXCJtYXhcIlxuXHRzY3JpcHQ6IFwic3JjIHR5cGUgYXN5bmMgZGVmZXIgY3Jvc3NvcmlnaW4gaW50ZWdyaXR5IG5vbmNlIGxhbmd1YWdlXCJcblx0c2VsZWN0OiBcInNpemUgZm9ybSBtdWx0aXBsZVwiXG5cdHRleHRhcmVhOiBcInJvd3MgY29scyBtaW5sZW5ndGggbWF4bGVuZ3RoXCJcblx0dGQ6IFwiY29sc3BhbiByb3dzcGFuXCJcblx0dGg6IFwiY29sc3BhbiByb3dzcGFuXCJcblxuXG5JbWJhLkhUTUxfUFJPUFMgPVxuXHRpbnB1dDogXCJhdXRvZm9jdXMgYXV0b2NvbXBsZXRlIGF1dG9jb3JyZWN0IHZhbHVlIHBsYWNlaG9sZGVyIHJlcXVpcmVkIGRpc2FibGVkIG11bHRpcGxlIGNoZWNrZWQgcmVhZE9ubHlcIlxuXHR0ZXh0YXJlYTogXCJhdXRvZm9jdXMgYXV0b2NvbXBsZXRlIGF1dG9jb3JyZWN0IHZhbHVlIHBsYWNlaG9sZGVyIHJlcXVpcmVkIGRpc2FibGVkIG11bHRpcGxlIGNoZWNrZWQgcmVhZE9ubHlcIlxuXHRmb3JtOiBcIm5vdmFsaWRhdGVcIlxuXHRmaWVsZHNldDogXCJkaXNhYmxlZFwiXG5cdGJ1dHRvbjogXCJkaXNhYmxlZFwiXG5cdHNlbGVjdDogXCJhdXRvZm9jdXMgZGlzYWJsZWQgcmVxdWlyZWRcIlxuXHRvcHRpb246IFwiZGlzYWJsZWQgc2VsZWN0ZWQgdmFsdWVcIlxuXHRvcHRncm91cDogXCJkaXNhYmxlZFwiXG5cdHByb2dyZXNzOiBcInZhbHVlXCJcblx0ZmllbGRzZXQ6IFwiZGlzYWJsZWRcIlxuXHRjYW52YXM6IFwid2lkdGggaGVpZ2h0XCJcblxudmFyIGV4dGVuZGVyID0gZG8gfG9iaiwgc3VwfFxuXHRmb3Igb3duIGssdiBvZiBzdXBcblx0XHRvYmpba10gPz0gdlxuXG5cdG9iajpwcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cDpwcm90b3R5cGUpXG5cdG9iajpfX3N1cGVyX18gPSBvYmo6cHJvdG90eXBlOl9fc3VwZXJfXyA9IHN1cDpwcm90b3R5cGVcblx0b2JqOnByb3RvdHlwZTpjb25zdHJ1Y3RvciA9IG9ialxuXHRzdXAuaW5oZXJpdChvYmopIGlmIHN1cDppbmhlcml0XG5cdHJldHVybiBvYmpcblxuXG52YXIgZGVmIFRhZ1xuXHRyZXR1cm4gZG8gfGRvbSxjdHh8XG5cdFx0dGhpcy5pbml0aWFsaXplKGRvbSxjdHgpXG5cdFx0cmV0dXJuIHRoaXNcblxuY2xhc3MgSW1iYS5UYWdzXG5cblx0ZGVmIGluaXRpYWxpemVcblx0XHRzZWxmXG5cblx0ZGVmIF9fY2xvbmUgbnNcblx0XHR2YXIgY2xvbmUgPSBPYmplY3QuY3JlYXRlKHNlbGYpXG5cdFx0Y2xvbmUuQHBhcmVudCA9IHNlbGZcblx0XHRyZXR1cm4gY2xvbmVcblxuXHRkZWYgbnMgbmFtZVxuXHRcdHNlbGZbJ18nICsgbmFtZS50b1VwcGVyQ2FzZV0gfHwgZGVmaW5lTmFtZXNwYWNlKG5hbWUpXG5cblx0ZGVmIGRlZmluZU5hbWVzcGFjZSBuYW1lXG5cdFx0dmFyIGNsb25lID0gT2JqZWN0LmNyZWF0ZShzZWxmKVxuXHRcdGNsb25lLkBwYXJlbnQgPSBzZWxmXG5cdFx0Y2xvbmUuQG5zID0gbmFtZVxuXHRcdHNlbGZbJ18nICsgbmFtZS50b1VwcGVyQ2FzZV0gPSBjbG9uZVxuXHRcdHJldHVybiBjbG9uZVxuXG5cdGRlZiBiYXNlVHlwZSBuYW1lLCBuc1xuXHRcdG5hbWUgaW4gSW1iYS5IVE1MX1RBR1MgPyAnZWxlbWVudCcgOiAnZGl2J1xuXG5cdGRlZiBkZWZpbmVUYWcgZnVsbE5hbWUsIHN1cHIgPSAnJywgJmJvZHlcblx0XHRpZiBib2R5IGFuZCBib2R5LkBub2RlVHlwZVxuXHRcdFx0c3VwciA9IGJvZHlcblx0XHRcdGJvZHkgPSBudWxsXG5cdFx0XHRcblx0XHRpZiBzZWxmW2Z1bGxOYW1lXVxuXHRcdFx0Y29uc29sZS5sb2cgXCJ0YWcgYWxyZWFkeSBleGlzdHM/XCIsZnVsbE5hbWVcblx0XHRcblx0XHQjIGlmIGl0IGlzIG5hbWVzcGFjZWRcblx0XHR2YXIgbnNcblx0XHR2YXIgbmFtZSA9IGZ1bGxOYW1lXG5cdFx0bGV0IG5zaWR4ID0gbmFtZS5pbmRleE9mKCc6Jylcblx0XHRpZiAgbnNpZHggPj0gMFxuXHRcdFx0bnMgPSBmdWxsTmFtZS5zdWJzdHIoMCxuc2lkeClcblx0XHRcdG5hbWUgPSBmdWxsTmFtZS5zdWJzdHIobnNpZHggKyAxKVxuXHRcdFx0aWYgbnMgPT0gJ3N2ZycgYW5kICFzdXByXG5cdFx0XHRcdHN1cHIgPSAnc3ZnOmVsZW1lbnQnXG5cblx0XHRzdXByIHx8PSBiYXNlVHlwZShmdWxsTmFtZSlcblxuXHRcdGxldCBzdXBlcnR5cGUgPSBzdXByIGlzYSBTdHJpbmcgPyBmaW5kVGFnVHlwZShzdXByKSA6IHN1cHJcblx0XHRsZXQgdGFndHlwZSA9IFRhZygpXG5cblx0XHR0YWd0eXBlLkBuYW1lID0gbmFtZVxuXHRcdHRhZ3R5cGUuQGZsYWdOYW1lID0gbnVsbFxuXG5cdFx0aWYgbmFtZVswXSA9PSAnIydcblx0XHRcdEltYmEuU0lOR0xFVE9OU1tuYW1lLnNsaWNlKDEpXSA9IHRhZ3R5cGVcblx0XHRcdHNlbGZbbmFtZV0gPSB0YWd0eXBlXG5cdFx0ZWxpZiBuYW1lWzBdID09IG5hbWVbMF0udG9VcHBlckNhc2Vcblx0XHRcdHRhZ3R5cGUuQGZsYWdOYW1lID0gbmFtZVxuXHRcdGVsc2Vcblx0XHRcdHRhZ3R5cGUuQGZsYWdOYW1lID0gXCJfXCIgKyBmdWxsTmFtZS5yZXBsYWNlKC9bX1xcOl0vZywgJy0nKVxuXHRcdFx0c2VsZltmdWxsTmFtZV0gPSB0YWd0eXBlXG5cblx0XHRleHRlbmRlcih0YWd0eXBlLHN1cGVydHlwZSlcblxuXHRcdGlmIGJvZHlcblx0XHRcdGJvZHkuY2FsbCh0YWd0eXBlLHRhZ3R5cGUsIHRhZ3R5cGUuVEFHUyBvciBzZWxmKVxuXHRcdFx0dGFndHlwZS5kZWZpbmVkIGlmIHRhZ3R5cGU6ZGVmaW5lZFxuXHRcdFx0b3B0aW1pemVUYWcodGFndHlwZSlcblx0XHRyZXR1cm4gdGFndHlwZVxuXG5cdGRlZiBkZWZpbmVTaW5nbGV0b24gbmFtZSwgc3VwciwgJmJvZHlcblx0XHRkZWZpbmVUYWcobmFtZSxzdXByLGJvZHkpXG5cblx0ZGVmIGV4dGVuZFRhZyBuYW1lLCBzdXByID0gJycsICZib2R5XG5cdFx0dmFyIGtsYXNzID0gKG5hbWUgaXNhIFN0cmluZyA/IGZpbmRUYWdUeXBlKG5hbWUpIDogbmFtZSlcblx0XHQjIGFsbG93IGZvciBwcml2YXRlIHRhZ3MgaGVyZSBhcyB3ZWxsP1xuXHRcdGJvZHkgYW5kIGJvZHkuY2FsbChrbGFzcyxrbGFzcyxrbGFzczpwcm90b3R5cGUpIGlmIGJvZHlcblx0XHRrbGFzcy5leHRlbmRlZCBpZiBrbGFzczpleHRlbmRlZFxuXHRcdG9wdGltaXplVGFnKGtsYXNzKVxuXHRcdHJldHVybiBrbGFzc1xuXG5cdGRlZiBvcHRpbWl6ZVRhZyB0YWd0eXBlXG5cdFx0dGFndHlwZTpwcm90b3R5cGU/Lm9wdGltaXplVGFnU3RydWN0dXJlXG5cdFx0XG5cdGRlZiBmaW5kVGFnVHlwZSB0eXBlXG5cdFx0bGV0IGtsYXNzID0gc2VsZlt0eXBlXVxuXHRcdHVubGVzcyBrbGFzc1xuXHRcdFx0aWYgdHlwZS5zdWJzdHIoMCw0KSA9PSAnc3ZnOidcblx0XHRcdFx0a2xhc3MgPSBkZWZpbmVUYWcodHlwZSwnc3ZnOmVsZW1lbnQnKVxuXG5cdFx0XHRlbGlmIEltYmEuSFRNTF9UQUdTLmluZGV4T2YodHlwZSkgPj0gMFxuXHRcdFx0XHRrbGFzcyA9IGRlZmluZVRhZyh0eXBlLCdlbGVtZW50JylcblxuXHRcdFx0XHRpZiBsZXQgYXR0cnMgPSBJbWJhLkhUTUxfQVRUUlNbdHlwZV1cblx0XHRcdFx0XHRmb3IgbmFtZSBpbiBhdHRycy5zcGxpdChcIiBcIilcblx0XHRcdFx0XHRcdEltYmEuYXR0cihrbGFzcyxuYW1lKVxuXHRcdFx0XHRcdFx0XG5cdFx0XHRcdGlmIGxldCBwcm9wcyA9IEltYmEuSFRNTF9QUk9QU1t0eXBlXVxuXHRcdFx0XHRcdGZvciBuYW1lIGluIHByb3BzLnNwbGl0KFwiIFwiKVxuXHRcdFx0XHRcdFx0SW1iYS5hdHRyKGtsYXNzLG5hbWUsZG9tOiB5ZXMpXG5cdFx0cmV0dXJuIGtsYXNzXG5cbmRlZiBJbWJhLmNyZWF0ZUVsZW1lbnQgbmFtZSwgY3R4LCByZWYsIHByZWZcblx0dmFyIHR5cGUgPSBuYW1lXG5cdHZhciBwYXJlbnRcblx0aWYgbmFtZSBpc2EgRnVuY3Rpb25cblx0XHR0eXBlID0gbmFtZVxuXHRlbHNlXG5cdFx0aWYgJGRlYnVnJFxuXHRcdFx0dGhyb3coXCJjYW5ub3QgZmluZCB0YWctdHlwZSB7bmFtZX1cIikgdW5sZXNzIEltYmEuVEFHUy5maW5kVGFnVHlwZShuYW1lKVxuXHRcdHR5cGUgPSBJbWJhLlRBR1MuZmluZFRhZ1R5cGUobmFtZSlcblx0XG5cdGlmIGN0eCBpc2EgVGFnTWFwXG5cdFx0cGFyZW50ID0gY3R4OnBhciRcblx0ZWxpZiBwcmVmIGlzYSBJbWJhLlRhZ1xuXHRcdHBhcmVudCA9IHByZWZcblx0ZWxzZVxuXHRcdHBhcmVudCA9IGN0eCBhbmQgcHJlZiAhPSB1bmRlZmluZWQgPyBjdHhbcHJlZl0gOiAoY3R4IGFuZCBjdHguQHRhZyBvciBjdHgpXG5cblx0dmFyIG5vZGUgPSB0eXBlLmJ1aWxkKHBhcmVudClcblx0XG5cdGlmIGN0eCBpc2EgVGFnTWFwXG5cdFx0Y3R4OmkkKytcblx0XHRub2RlOiRrZXkgPSByZWZcblxuXHRpZiBjdHggYW5kIHJlZiAhPSB1bmRlZmluZWRcblx0XHRjdHhbcmVmXSA9IG5vZGVcblxuXHRyZXR1cm4gbm9kZVxuXG5kZWYgSW1iYS5jcmVhdGVUYWdDYWNoZSBvd25lclxuXHR2YXIgaXRlbSA9IFtdXG5cdGl0ZW0uQHRhZyA9IG93bmVyXG5cdHJldHVybiBpdGVtXG5cblx0dmFyIHBhciA9IChwcmVmICE9IHVuZGVmaW5lZCA/IGN0eFtwcmVmXSA6IGN0eC5AdGFnKVxuXHR2YXIgbm9kZSA9IFRhZ01hcC5uZXcoY3R4LHJlZixwYXIpXG5cdGN0eFtyZWZdID0gbm9kZVxuXHRyZXR1cm4gbm9kZVxuXHRcbmRlZiBJbWJhLmNyZWF0ZVRhZ01hcCBjdHgsIHJlZiwgcHJlZlxuXHR2YXIgcGFyID0gKHByZWYgIT0gdW5kZWZpbmVkID8gcHJlZiA6IGN0eC5AdGFnKVxuXHR2YXIgbm9kZSA9IFRhZ01hcC5uZXcoY3R4LHJlZixwYXIpXG5cdGN0eFtyZWZdID0gbm9kZVxuXHRyZXR1cm4gbm9kZVxuXG5kZWYgSW1iYS5jcmVhdGVUYWdMaXN0IGN0eCwgcmVmLCBwcmVmXG5cdHZhciBub2RlID0gW11cblx0bm9kZS5AdHlwZSA9IDRcblx0bm9kZS5AdGFnID0gKHByZWYgIT0gdW5kZWZpbmVkID8gcHJlZiA6IGN0eC5AdGFnKVxuXHRjdHhbcmVmXSA9IG5vZGVcblx0cmV0dXJuIG5vZGVcblxuZGVmIEltYmEuY3JlYXRlVGFnTG9vcFJlc3VsdCBjdHgsIHJlZiwgcHJlZlxuXHR2YXIgbm9kZSA9IFtdXG5cdG5vZGUuQHR5cGUgPSA1XG5cdG5vZGU6Y2FjaGUgPSB7aSQ6IDB9XG5cdHJldHVybiBub2RlXG5cbiMgdXNlIGFycmF5IGluc3RlYWQ/XG5jbGFzcyBUYWdDYWNoZVxuXHRkZWYgc2VsZi5idWlsZCBvd25lclxuXHRcdHZhciBpdGVtID0gW11cblx0XHRpdGVtLkB0YWcgPSBvd25lclxuXHRcdHJldHVybiBpdGVtXG5cblx0ZGVmIGluaXRpYWxpemUgb3duZXJcblx0XHRzZWxmLkB0YWcgPSBvd25lclxuXHRcdHNlbGZcblx0XG5jbGFzcyBUYWdNYXBcblx0XG5cdGRlZiBpbml0aWFsaXplIGNhY2hlLCByZWYsIHBhclxuXHRcdHNlbGY6Y2FjaGUkID0gY2FjaGVcblx0XHRzZWxmOmtleSQgPSByZWZcblx0XHRzZWxmOnBhciQgPSBwYXJcblx0XHRzZWxmOmkkID0gMFxuXHRcblx0ZGVmICRpdGVyXG5cdFx0dmFyIGl0ZW0gPSBbXVxuXHRcdGl0ZW0uQHR5cGUgPSA1XG5cdFx0aXRlbTpjYWNoZSA9IHNlbGZcblx0XHRyZXR1cm4gaXRlbVxuXHRcdFxuXHRkZWYgJHBydW5lIGl0ZW1zXG5cdFx0bGV0IGNhY2hlID0gc2VsZjpjYWNoZSRcblx0XHRsZXQga2V5ID0gc2VsZjprZXkkXG5cdFx0bGV0IGNsb25lID0gVGFnTWFwLm5ldyhjYWNoZSxrZXksc2VsZjpwYXIkKVxuXHRcdGZvciBpdGVtIGluIGl0ZW1zXG5cdFx0XHRjbG9uZVtpdGVtOmtleSRdID0gaXRlbVxuXHRcdGNsb25lOmkkID0gaXRlbXM6bGVuZ3RoXG5cdFx0cmV0dXJuIGNhY2hlW2tleV0gPSBjbG9uZVxuXG5JbWJhLlRhZ01hcCA9IFRhZ01hcFxuSW1iYS5UYWdDYWNoZSA9IFRhZ0NhY2hlXG5JbWJhLlNJTkdMRVRPTlMgPSB7fVxuSW1iYS5UQUdTID0gSW1iYS5UYWdzLm5ld1xuSW1iYS5UQUdTWzplbGVtZW50XSA9IEltYmEuVEFHU1s6aHRtbGVsZW1lbnRdID0gSW1iYS5UYWdcbkltYmEuVEFHU1snc3ZnOmVsZW1lbnQnXSA9IEltYmEuU1ZHVGFnXG5cbmRlZiBJbWJhLmRlZmluZVRhZyBuYW1lLCBzdXByID0gJycsICZib2R5XG5cdHJldHVybiBJbWJhLlRBR1MuZGVmaW5lVGFnKG5hbWUsc3Vwcixib2R5KVxuXG5kZWYgSW1iYS5kZWZpbmVTaW5nbGV0b25UYWcgaWQsIHN1cHIgPSAnZGl2JywgJmJvZHlcblx0cmV0dXJuIEltYmEuVEFHUy5kZWZpbmVUYWcobmFtZSxzdXByLGJvZHkpXG5cbmRlZiBJbWJhLmV4dGVuZFRhZyBuYW1lLCBib2R5XG5cdHJldHVybiBJbWJhLlRBR1MuZXh0ZW5kVGFnKG5hbWUsYm9keSlcblxuZGVmIEltYmEuZ2V0VGFnU2luZ2xldG9uIGlkXHRcblx0dmFyIGRvbSwgbm9kZVxuXG5cdGlmIHZhciBrbGFzcyA9IEltYmEuU0lOR0xFVE9OU1tpZF1cblx0XHRyZXR1cm4ga2xhc3MuSW5zdGFuY2UgaWYga2xhc3MgYW5kIGtsYXNzLkluc3RhbmNlIFxuXG5cdFx0IyBubyBpbnN0YW5jZSAtIGNoZWNrIGZvciBlbGVtZW50XG5cdFx0aWYgZG9tID0gSW1iYS5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZClcblx0XHRcdCMgd2UgaGF2ZSBhIGxpdmUgaW5zdGFuY2UgLSB3aGVuIGZpbmRpbmcgaXQgdGhyb3VnaCBhIHNlbGVjdG9yIHdlIHNob3VsZCBhd2FrZSBpdCwgbm8/XG5cdFx0XHQjIGNvbnNvbGUubG9nKCdjcmVhdGluZyB0aGUgc2luZ2xldG9uIGZyb20gZXhpc3Rpbmcgbm9kZSBpbiBkb20/JyxpZCx0eXBlKVxuXHRcdFx0bm9kZSA9IGtsYXNzLkluc3RhbmNlID0ga2xhc3MubmV3KGRvbSlcblx0XHRcdG5vZGUuYXdha2VuKGRvbSkgIyBzaG91bGQgb25seSBhd2FrZW5cblx0XHRcdHJldHVybiBub2RlXG5cblx0XHRkb20gPSBrbGFzcy5jcmVhdGVOb2RlXG5cdFx0ZG9tOmlkID0gaWRcblx0XHRub2RlID0ga2xhc3MuSW5zdGFuY2UgPSBrbGFzcy5uZXcoZG9tKVxuXHRcdG5vZGUuZW5kLmF3YWtlbihkb20pXG5cdFx0cmV0dXJuIG5vZGVcblx0ZWxpZiBkb20gPSBJbWJhLmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKVxuXHRcdHJldHVybiBJbWJhLmdldFRhZ0ZvckRvbShkb20pXG5cbnZhciBzdmdTdXBwb3J0ID0gdHlwZW9mIFNWR0VsZW1lbnQgIT09ICd1bmRlZmluZWQnXG5cbiMgc2h1b2xkIGJlIHBoYXNlZCBvdXRcbmRlZiBJbWJhLmdldFRhZ0ZvckRvbSBkb21cblx0cmV0dXJuIG51bGwgdW5sZXNzIGRvbVxuXHRyZXR1cm4gZG9tIGlmIGRvbS5AZG9tXG5cdHJldHVybiBkb20uQHRhZyBpZiBkb20uQHRhZ1xuXHRyZXR1cm4gbnVsbCB1bmxlc3MgZG9tOm5vZGVOYW1lXG5cblx0dmFyIG5hbWUgPSBkb206bm9kZU5hbWUudG9Mb3dlckNhc2Vcblx0dmFyIHR5cGUgPSBuYW1lXG5cdHZhciBucyA9IEltYmEuVEFHU1xuXG5cdGlmIGRvbTppZCBhbmQgSW1iYS5TSU5HTEVUT05TW2RvbTppZF1cblx0XHRyZXR1cm4gSW1iYS5nZXRUYWdTaW5nbGV0b24oZG9tOmlkKVxuXHRcdFxuXHRpZiBzdmdTdXBwb3J0IGFuZCBkb20gaXNhIFNWR0VsZW1lbnRcblx0XHR0eXBlID0gbnMuZmluZFRhZ1R5cGUoXCJzdmc6XCIgKyBuYW1lKVxuXHRlbGlmIEltYmEuSFRNTF9UQUdTLmluZGV4T2YobmFtZSkgPj0gMFxuXHRcdHR5cGUgPSBucy5maW5kVGFnVHlwZShuYW1lKVxuXHRlbHNlXG5cdFx0dHlwZSA9IEltYmEuVGFnXG5cblx0cmV0dXJuIHR5cGUubmV3KGRvbSxudWxsKS5hd2FrZW4oZG9tKVxuXG5cbmlmICR3ZWIkIGFuZCAkZXM1JCBhbmQgZG9jdW1lbnRcblx0dmFyIHN0eWxlcyA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGRvY3VtZW50OmRvY3VtZW50RWxlbWVudCwgJycpXG5cblx0Zm9yIHByZWZpeGVkIGluIHN0eWxlc1xuXHRcdHZhciB1bnByZWZpeGVkID0gcHJlZml4ZWQucmVwbGFjZSgvXi0od2Via2l0fG1zfG1venxvfGJsaW5rKS0vLCcnKVxuXHRcdHZhciBjYW1lbENhc2UgPSB1bnByZWZpeGVkLnJlcGxhY2UoLy0oXFx3KS9nKSBkbyB8bSxhfCBhLnRvVXBwZXJDYXNlXG5cblx0XHQjIGlmIHRoZXJlIGV4aXN0cyBhbiB1bnByZWZpeGVkIHZlcnNpb24gLS0gYWx3YXlzIHVzZSB0aGlzXG5cdFx0aWYgcHJlZml4ZWQgIT0gdW5wcmVmaXhlZFxuXHRcdFx0Y29udGludWUgaWYgc3R5bGVzLmhhc093blByb3BlcnR5KHVucHJlZml4ZWQpXG5cblx0XHQjIHJlZ2lzdGVyIHRoZSBwcmVmaXhlc1xuXHRcdEltYmEuQ1NTS2V5TWFwW3VucHJlZml4ZWRdID0gSW1iYS5DU1NLZXlNYXBbY2FtZWxDYXNlXSA9IHByZWZpeGVkXG5cblx0IyBPdnZlcnJpZGUgY2xhc3NMaXN0XG5cdGlmICFkb2N1bWVudDpkb2N1bWVudEVsZW1lbnQ6Y2xhc3NMaXN0XG5cdFx0ZXh0ZW5kIHRhZyBlbGVtZW50XG5cblx0XHRcdGRlZiBoYXNGbGFnIHJlZlxuXHRcdFx0XHRyZXR1cm4gUmVnRXhwLm5ldygnKF58XFxcXHMpJyArIHJlZiArICcoXFxcXHN8JCknKS50ZXN0KEBkb206Y2xhc3NOYW1lKVxuXG5cdFx0XHRkZWYgYWRkRmxhZyByZWZcblx0XHRcdFx0cmV0dXJuIHNlbGYgaWYgaGFzRmxhZyhyZWYpXG5cdFx0XHRcdEBkb206Y2xhc3NOYW1lICs9IChAZG9tOmNsYXNzTmFtZSA/ICcgJyA6ICcnKSArIHJlZlxuXHRcdFx0XHRyZXR1cm4gc2VsZlxuXG5cdFx0XHRkZWYgdW5mbGFnIHJlZlxuXHRcdFx0XHRyZXR1cm4gc2VsZiB1bmxlc3MgaGFzRmxhZyhyZWYpXG5cdFx0XHRcdHZhciByZWdleCA9IFJlZ0V4cC5uZXcoJyhefFxcXFxzKSonICsgcmVmICsgJyhcXFxcc3wkKSonLCAnZycpXG5cdFx0XHRcdEBkb206Y2xhc3NOYW1lID0gQGRvbTpjbGFzc05hbWUucmVwbGFjZShyZWdleCwgJycpXG5cdFx0XHRcdHJldHVybiBzZWxmXG5cblx0XHRcdGRlZiB0b2dnbGVGbGFnIHJlZlxuXHRcdFx0XHRoYXNGbGFnKHJlZikgPyB1bmZsYWcocmVmKSA6IGZsYWcocmVmKVxuXG5cdFx0XHRkZWYgZmxhZyByZWYsIGJvb2xcblx0XHRcdFx0aWYgYXJndW1lbnRzOmxlbmd0aCA9PSAyIGFuZCAhIWJvb2wgPT09IG5vXG5cdFx0XHRcdFx0cmV0dXJuIHVuZmxhZyhyZWYpXG5cdFx0XHRcdHJldHVybiBhZGRGbGFnKHJlZilcblxuSW1iYS5UYWdcbiIsInZhciBJbWJhID0gcmVxdWlyZShcIi4uL2ltYmFcIilcblxuIyBJbWJhLlRvdWNoXG4jIEJlZ2FuXHRBIGZpbmdlciB0b3VjaGVkIHRoZSBzY3JlZW4uXG4jIE1vdmVkXHRBIGZpbmdlciBtb3ZlZCBvbiB0aGUgc2NyZWVuLlxuIyBTdGF0aW9uYXJ5XHRBIGZpbmdlciBpcyB0b3VjaGluZyB0aGUgc2NyZWVuIGJ1dCBoYXNuJ3QgbW92ZWQuXG4jIEVuZGVkXHRBIGZpbmdlciB3YXMgbGlmdGVkIGZyb20gdGhlIHNjcmVlbi4gVGhpcyBpcyB0aGUgZmluYWwgcGhhc2Ugb2YgYSB0b3VjaC5cbiMgQ2FuY2VsZWQgVGhlIHN5c3RlbSBjYW5jZWxsZWQgdHJhY2tpbmcgZm9yIHRoZSB0b3VjaC5cblxuIyMjXG5Db25zb2xpZGF0ZXMgbW91c2UgYW5kIHRvdWNoIGV2ZW50cy4gVG91Y2ggb2JqZWN0cyBwZXJzaXN0IGFjcm9zcyBhIHRvdWNoLFxuZnJvbSB0b3VjaHN0YXJ0IHVudGlsIGVuZC9jYW5jZWwuIFdoZW4gYSB0b3VjaCBzdGFydHMsIGl0IHdpbGwgdHJhdmVyc2VcbmRvd24gZnJvbSB0aGUgaW5uZXJtb3N0IHRhcmdldCwgdW50aWwgaXQgZmluZHMgYSBub2RlIHRoYXQgcmVzcG9uZHMgdG9cbm9udG91Y2hzdGFydC4gVW5sZXNzIHRoZSB0b3VjaCBpcyBleHBsaWNpdGx5IHJlZGlyZWN0ZWQsIHRoZSB0b3VjaCB3aWxsXG5jYWxsIG9udG91Y2htb3ZlIGFuZCBvbnRvdWNoZW5kIC8gb250b3VjaGNhbmNlbCBvbiB0aGUgcmVzcG9uZGVyIHdoZW4gYXBwcm9wcmlhdGUuXG5cblx0dGFnIGRyYWdnYWJsZVxuXHRcdCMgY2FsbGVkIHdoZW4gYSB0b3VjaCBzdGFydHNcblx0XHRkZWYgb250b3VjaHN0YXJ0IHRvdWNoXG5cdFx0XHRmbGFnICdkcmFnZ2luZydcblx0XHRcdHNlbGZcblx0XHRcblx0XHQjIGNhbGxlZCB3aGVuIHRvdWNoIG1vdmVzIC0gc2FtZSB0b3VjaCBvYmplY3Rcblx0XHRkZWYgb250b3VjaG1vdmUgdG91Y2hcblx0XHRcdCMgbW92ZSB0aGUgbm9kZSB3aXRoIHRvdWNoXG5cdFx0XHRjc3MgdG9wOiB0b3VjaC5keSwgbGVmdDogdG91Y2guZHhcblx0XHRcblx0XHQjIGNhbGxlZCB3aGVuIHRvdWNoIGVuZHNcblx0XHRkZWYgb250b3VjaGVuZCB0b3VjaFxuXHRcdFx0dW5mbGFnICdkcmFnZ2luZydcblxuQGluYW1lIHRvdWNoXG4jIyNcbmNsYXNzIEltYmEuVG91Y2hcblx0c2VsZi5MYXN0VGltZXN0YW1wID0gMFxuXHRzZWxmLlRhcFRpbWVvdXQgPSA1MFxuXG5cdCMgdmFyIGxhc3ROYXRpdmVUb3VjaFRpbWVvdXQgPSA1MFxuXG5cdHZhciB0b3VjaGVzID0gW11cblx0dmFyIGNvdW50ID0gMFxuXHR2YXIgaWRlbnRpZmllcnMgPSB7fVxuXG5cdGRlZiBzZWxmLmNvdW50XG5cdFx0Y291bnRcblxuXHRkZWYgc2VsZi5sb29rdXAgaXRlbVxuXHRcdHJldHVybiBpdGVtIGFuZCAoaXRlbTpfX3RvdWNoX18gb3IgaWRlbnRpZmllcnNbaXRlbTppZGVudGlmaWVyXSlcblxuXHRkZWYgc2VsZi5yZWxlYXNlIGl0ZW0sdG91Y2hcblx0XHRkZWxldGUgaWRlbnRpZmllcnNbaXRlbTppZGVudGlmaWVyXVxuXHRcdGRlbGV0ZSBpdGVtOl9fdG91Y2hfX1xuXHRcdHJldHVyblxuXG5cdGRlZiBzZWxmLm9udG91Y2hzdGFydCBlXG5cdFx0Zm9yIHQgaW4gZTpjaGFuZ2VkVG91Y2hlc1xuXHRcdFx0Y29udGludWUgaWYgbG9va3VwKHQpXG5cdFx0XHR2YXIgdG91Y2ggPSBpZGVudGlmaWVyc1t0OmlkZW50aWZpZXJdID0gc2VsZi5uZXcoZSkgIyAoZSlcblx0XHRcdHQ6X190b3VjaF9fID0gdG91Y2hcblx0XHRcdHRvdWNoZXMucHVzaCh0b3VjaClcblx0XHRcdGNvdW50Kytcblx0XHRcdHRvdWNoLnRvdWNoc3RhcnQoZSx0KVxuXHRcdHNlbGZcblxuXHRkZWYgc2VsZi5vbnRvdWNobW92ZSBlXG5cdFx0Zm9yIHQgaW4gZTpjaGFuZ2VkVG91Y2hlc1xuXHRcdFx0aWYgdmFyIHRvdWNoID0gbG9va3VwKHQpXG5cdFx0XHRcdHRvdWNoLnRvdWNobW92ZShlLHQpXG5cblx0XHRzZWxmXG5cblx0ZGVmIHNlbGYub250b3VjaGVuZCBlXG5cdFx0Zm9yIHQgaW4gZTpjaGFuZ2VkVG91Y2hlc1xuXHRcdFx0aWYgdmFyIHRvdWNoID0gbG9va3VwKHQpXG5cdFx0XHRcdHRvdWNoLnRvdWNoZW5kKGUsdClcblx0XHRcdFx0cmVsZWFzZSh0LHRvdWNoKVxuXHRcdFx0XHRjb3VudC0tXG5cblx0XHQjIGUucHJldmVudERlZmF1bHRcblx0XHQjIG5vdCBhbHdheXMgc3VwcG9ydGVkIVxuXHRcdCMgdG91Y2hlcyA9IHRvdWNoZXMuZmlsdGVyKHx8KVxuXHRcdHNlbGZcblxuXHRkZWYgc2VsZi5vbnRvdWNoY2FuY2VsIGVcblx0XHRmb3IgdCBpbiBlOmNoYW5nZWRUb3VjaGVzXG5cdFx0XHRpZiB2YXIgdG91Y2ggPSBsb29rdXAodClcblx0XHRcdFx0dG91Y2gudG91Y2hjYW5jZWwoZSx0KVxuXHRcdFx0XHRyZWxlYXNlKHQsdG91Y2gpXG5cdFx0XHRcdGNvdW50LS1cblx0XHRzZWxmXG5cblx0ZGVmIHNlbGYub25tb3VzZWRvd24gZVxuXHRcdHNlbGZcblxuXHRkZWYgc2VsZi5vbm1vdXNlbW92ZSBlXG5cdFx0c2VsZlxuXG5cdGRlZiBzZWxmLm9ubW91c2V1cCBlXG5cdFx0c2VsZlxuXG5cblx0cHJvcCBwaGFzZVxuXHRwcm9wIGFjdGl2ZVxuXHRwcm9wIGV2ZW50XG5cdHByb3AgcG9pbnRlclxuXHRwcm9wIHRhcmdldFxuXHRwcm9wIGhhbmRsZXJcblx0cHJvcCB1cGRhdGVzXG5cdHByb3Agc3VwcHJlc3Ncblx0cHJvcCBkYXRhXG5cdHByb3AgYnViYmxlIGNoYWluYWJsZTogeWVzXG5cdHByb3AgdGltZXN0YW1wXG5cblx0cHJvcCBnZXN0dXJlc1xuXG5cdCMjI1xuXHRAaW50ZXJuYWxcblx0QGNvbnN0cnVjdG9yXG5cdCMjI1xuXHRkZWYgaW5pdGlhbGl6ZSBldmVudCwgcG9pbnRlclxuXHRcdCMgQG5hdGl2ZSAgPSBmYWxzZVxuXHRcdHNlbGYuZXZlbnQgPSBldmVudFxuXHRcdGRhdGEgPSB7fVxuXHRcdGFjdGl2ZSA9IHllc1xuXHRcdEBidXR0b24gPSBldmVudCBhbmQgZXZlbnQ6YnV0dG9uIG9yIDBcblx0XHRAc3VwcHJlc3MgPSBubyAjIGRlcHJlY2F0ZWRcblx0XHRAY2FwdHVyZWQgPSBub1xuXHRcdGJ1YmJsZSA9IG5vXG5cdFx0cG9pbnRlciA9IHBvaW50ZXJcblx0XHR1cGRhdGVzID0gMFxuXHRcdHJldHVybiBzZWxmXG5cblx0ZGVmIGNhcHR1cmVcblx0XHRAY2FwdHVyZWQgPSB5ZXNcblx0XHRAZXZlbnQgYW5kIEBldmVudC5zdG9wUHJvcGFnYXRpb25cblx0XHR1bmxlc3MgQHNlbGJsb2NrZXJcblx0XHRcdEBzZWxibG9ja2VyID0gZG8gfGV8IGUucHJldmVudERlZmF1bHRcblx0XHRcdEltYmEuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignc2VsZWN0c3RhcnQnLEBzZWxibG9ja2VyLHllcylcblx0XHRzZWxmXG5cblx0ZGVmIGlzQ2FwdHVyZWRcblx0XHQhIUBjYXB0dXJlZFxuXG5cdCMjI1xuXHRFeHRlbmQgdGhlIHRvdWNoIHdpdGggYSBwbHVnaW4gLyBnZXN0dXJlLiBcblx0QWxsIGV2ZW50cyAodG91Y2hzdGFydCxtb3ZlIGV0YykgZm9yIHRoZSB0b3VjaFxuXHR3aWxsIGJlIHRyaWdnZXJlZCBvbiB0aGUgcGx1Z2lucyBpbiB0aGUgb3JkZXIgdGhleVxuXHRhcmUgYWRkZWQuXG5cdCMjI1xuXHRkZWYgZXh0ZW5kIHBsdWdpblxuXHRcdCMgY29uc29sZS5sb2cgXCJhZGRlZCBnZXN0dXJlISEhXCJcblx0XHRAZ2VzdHVyZXMgfHw9IFtdXG5cdFx0QGdlc3R1cmVzLnB1c2gocGx1Z2luKVxuXHRcdHNlbGZcblxuXHQjIyNcblx0UmVkaXJlY3QgdG91Y2ggdG8gc3BlY2lmaWVkIHRhcmdldC4gb250b3VjaHN0YXJ0IHdpbGwgYWx3YXlzIGJlXG5cdGNhbGxlZCBvbiB0aGUgbmV3IHRhcmdldC5cblx0QHJldHVybiB7TnVtYmVyfVxuXHQjIyNcblx0ZGVmIHJlZGlyZWN0IHRhcmdldFxuXHRcdEByZWRpcmVjdCA9IHRhcmdldFxuXHRcdHNlbGZcblxuXHQjIyNcblx0U3VwcHJlc3MgdGhlIGRlZmF1bHQgYmVoYXZpb3VyLiBXaWxsIGNhbGwgcHJldmVudERlZmF1bHQgZm9yXG5cdGFsbCBuYXRpdmUgZXZlbnRzIHRoYXQgYXJlIHBhcnQgb2YgdGhlIHRvdWNoLlxuXHQjIyNcblx0ZGVmIHN1cHByZXNzXG5cdFx0IyBjb2xsaXNpb24gd2l0aCB0aGUgc3VwcHJlc3MgcHJvcGVydHlcblx0XHRAYWN0aXZlID0gbm9cblx0XHRcblx0XHRzZWxmXG5cblx0ZGVmIHN1cHByZXNzPSB2YWx1ZVxuXHRcdGNvbnNvbGUud2FybiAnSW1iYS5Ub3VjaCNzdXBwcmVzcz0gaXMgZGVwcmVjYXRlZCdcblx0XHRAc3VwcmVzcyA9IHZhbHVlXG5cdFx0c2VsZlxuXG5cdGRlZiB0b3VjaHN0YXJ0IGUsdFxuXHRcdEBldmVudCA9IGVcblx0XHRAdG91Y2ggPSB0XG5cdFx0QGJ1dHRvbiA9IDBcblx0XHRAeCA9IHQ6Y2xpZW50WFxuXHRcdEB5ID0gdDpjbGllbnRZXG5cdFx0YmVnYW5cblx0XHR1cGRhdGVcblx0XHRlLnByZXZlbnREZWZhdWx0IGlmIGUgYW5kIGlzQ2FwdHVyZWRcblx0XHRzZWxmXG5cblx0ZGVmIHRvdWNobW92ZSBlLHRcblx0XHRAZXZlbnQgPSBlXG5cdFx0QHggPSB0OmNsaWVudFhcblx0XHRAeSA9IHQ6Y2xpZW50WVxuXHRcdHVwZGF0ZVxuXHRcdGUucHJldmVudERlZmF1bHQgaWYgZSBhbmQgaXNDYXB0dXJlZFxuXHRcdHNlbGZcblxuXHRkZWYgdG91Y2hlbmQgZSx0XG5cdFx0QGV2ZW50ID0gZVxuXHRcdEB4ID0gdDpjbGllbnRYXG5cdFx0QHkgPSB0OmNsaWVudFlcblx0XHRlbmRlZFxuXG5cdFx0SW1iYS5Ub3VjaC5MYXN0VGltZXN0YW1wID0gZTp0aW1lU3RhbXBcblxuXHRcdGlmIEBtYXhkciA8IDIwXG5cdFx0XHR2YXIgdGFwID0gSW1iYS5FdmVudC5uZXcoZSlcblx0XHRcdHRhcC50eXBlID0gJ3RhcCdcblx0XHRcdHRhcC5wcm9jZXNzXG5cblx0XHRpZiBlIGFuZCBpc0NhcHR1cmVkXG5cdFx0XHRlLnByZXZlbnREZWZhdWx0XG5cblx0XHRzZWxmXG5cblx0ZGVmIHRvdWNoY2FuY2VsIGUsdFxuXHRcdGNhbmNlbFxuXG5cdGRlZiBtb3VzZWRvd24gZSx0XG5cdFx0QGV2ZW50ID0gZVxuXHRcdEBidXR0b24gPSBlOmJ1dHRvblxuXHRcdEB4ID0gdDpjbGllbnRYXG5cdFx0QHkgPSB0OmNsaWVudFlcblx0XHRiZWdhblxuXHRcdHVwZGF0ZVxuXHRcdEBtb3VzZW1vdmUgPSAofGV8IG1vdXNlbW92ZShlLGUpIClcblx0XHRJbWJhLmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsQG1vdXNlbW92ZSx5ZXMpXG5cdFx0c2VsZlxuXG5cdGRlZiBtb3VzZW1vdmUgZSx0XG5cdFx0QHggPSB0OmNsaWVudFhcblx0XHRAeSA9IHQ6Y2xpZW50WVxuXHRcdEBldmVudCA9IGVcblx0XHRlLnByZXZlbnREZWZhdWx0IGlmIGlzQ2FwdHVyZWRcblx0XHR1cGRhdGVcblx0XHRtb3ZlXG5cdFx0c2VsZlxuXG5cdGRlZiBtb3VzZXVwIGUsdFxuXHRcdEB4ID0gdDpjbGllbnRYXG5cdFx0QHkgPSB0OmNsaWVudFlcblx0XHRlbmRlZFxuXHRcdHNlbGZcblxuXHRkZWYgaWRsZVxuXHRcdHVwZGF0ZVxuXG5cdGRlZiBiZWdhblxuXHRcdEB0aW1lc3RhbXAgPSBEYXRlLm5vd1xuXHRcdEBtYXhkciA9IEBkciA9IDBcblx0XHRAeDAgPSBAeFxuXHRcdEB5MCA9IEB5XG5cblx0XHR2YXIgZG9tID0gZXZlbnQ6dGFyZ2V0XG5cdFx0dmFyIG5vZGUgPSBudWxsXG5cblx0XHRAc291cmNlVGFyZ2V0ID0gZG9tIGFuZCB0YWcoZG9tKVxuXG5cdFx0d2hpbGUgZG9tXG5cdFx0XHRub2RlID0gdGFnKGRvbSlcblx0XHRcdGlmIG5vZGUgJiYgbm9kZTpvbnRvdWNoc3RhcnRcblx0XHRcdFx0QGJ1YmJsZSA9IG5vXG5cdFx0XHRcdHRhcmdldCA9IG5vZGVcblx0XHRcdFx0dGFyZ2V0Lm9udG91Y2hzdGFydChzZWxmKVxuXHRcdFx0XHRicmVhayB1bmxlc3MgQGJ1YmJsZVxuXHRcdFx0ZG9tID0gZG9tOnBhcmVudE5vZGVcblxuXHRcdEB1cGRhdGVzKytcblx0XHRzZWxmXG5cblx0ZGVmIHVwZGF0ZVxuXHRcdHJldHVybiBzZWxmIGlmICFAYWN0aXZlIG9yIEBjYW5jZWxsZWRcblxuXHRcdHZhciBkciA9IE1hdGguc3FydChkeCpkeCArIGR5KmR5KVxuXHRcdEBtYXhkciA9IGRyIGlmIGRyID4gQGRyXG5cdFx0QGRyID0gZHJcblxuXHRcdCMgY2F0Y2hpbmcgYSB0b3VjaC1yZWRpcmVjdD8hP1xuXHRcdGlmIEByZWRpcmVjdFxuXHRcdFx0aWYgQHRhcmdldCBhbmQgQHRhcmdldDpvbnRvdWNoY2FuY2VsXG5cdFx0XHRcdEB0YXJnZXQub250b3VjaGNhbmNlbChzZWxmKVxuXHRcdFx0dGFyZ2V0ID0gQHJlZGlyZWN0XG5cdFx0XHRAcmVkaXJlY3QgPSBudWxsXG5cdFx0XHR0YXJnZXQub250b3VjaHN0YXJ0KHNlbGYpIGlmIHRhcmdldDpvbnRvdWNoc3RhcnRcblx0XHRcdHJldHVybiB1cGRhdGUgaWYgQHJlZGlyZWN0ICMgcG9zc2libHkgcmVkaXJlY3RpbmcgYWdhaW5cblxuXG5cdFx0QHVwZGF0ZXMrK1xuXHRcdGlmIEBnZXN0dXJlc1xuXHRcdFx0Zy5vbnRvdWNodXBkYXRlKHNlbGYpIGZvciBnIGluIEBnZXN0dXJlc1xuXG5cdFx0dGFyZ2V0Py5vbnRvdWNodXBkYXRlKHNlbGYpXG5cdFx0dXBkYXRlIGlmIEByZWRpcmVjdFxuXHRcdHNlbGZcblxuXHRkZWYgbW92ZVxuXHRcdHJldHVybiBzZWxmIGlmICFAYWN0aXZlIG9yIEBjYW5jZWxsZWRcblxuXHRcdGlmIEBnZXN0dXJlc1xuXHRcdFx0Zm9yIGcgaW4gQGdlc3R1cmVzXG5cdFx0XHRcdGcub250b3VjaG1vdmUoc2VsZixAZXZlbnQpIGlmIGc6b250b3VjaG1vdmVcblxuXHRcdHRhcmdldD8ub250b3VjaG1vdmUoc2VsZixAZXZlbnQpXG5cdFx0c2VsZlxuXG5cdGRlZiBlbmRlZFxuXHRcdHJldHVybiBzZWxmIGlmICFAYWN0aXZlIG9yIEBjYW5jZWxsZWRcblxuXHRcdEB1cGRhdGVzKytcblxuXHRcdGlmIEBnZXN0dXJlc1xuXHRcdFx0Zy5vbnRvdWNoZW5kKHNlbGYpIGZvciBnIGluIEBnZXN0dXJlc1xuXG5cdFx0dGFyZ2V0Py5vbnRvdWNoZW5kKHNlbGYpXG5cdFx0Y2xlYW51cF9cblx0XHRzZWxmXG5cblx0ZGVmIGNhbmNlbFxuXHRcdHVubGVzcyBAY2FuY2VsbGVkXG5cdFx0XHRAY2FuY2VsbGVkID0geWVzXG5cdFx0XHRjYW5jZWxsZWRcblx0XHRcdGNsZWFudXBfXG5cdFx0c2VsZlxuXG5cdGRlZiBjYW5jZWxsZWRcblx0XHRyZXR1cm4gc2VsZiB1bmxlc3MgQGFjdGl2ZVxuXG5cdFx0QGNhbmNlbGxlZCA9IHllc1xuXHRcdEB1cGRhdGVzKytcblxuXHRcdGlmIEBnZXN0dXJlc1xuXHRcdFx0Zm9yIGcgaW4gQGdlc3R1cmVzXG5cdFx0XHRcdGcub250b3VjaGNhbmNlbChzZWxmKSBpZiBnOm9udG91Y2hjYW5jZWxcblxuXHRcdHRhcmdldD8ub250b3VjaGNhbmNlbChzZWxmKVxuXHRcdHNlbGZcblx0XHRcblx0ZGVmIGNsZWFudXBfXG5cdFx0aWYgQG1vdXNlbW92ZVxuXHRcdFx0SW1iYS5kb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLEBtb3VzZW1vdmUseWVzKVxuXHRcdFx0QG1vdXNlbW92ZSA9IG51bGxcblx0XHRcblx0XHRpZiBAc2VsYmxvY2tlclxuXHRcdFx0SW1iYS5kb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdzZWxlY3RzdGFydCcsQHNlbGJsb2NrZXIseWVzKVxuXHRcdFx0QHNlbGJsb2NrZXIgPSBudWxsXG5cdFx0XG5cdFx0c2VsZlxuXG5cdCMjI1xuXHRUaGUgYWJzb2x1dGUgZGlzdGFuY2UgdGhlIHRvdWNoIGhhcyBtb3ZlZCBmcm9tIHN0YXJ0aW5nIHBvc2l0aW9uIFxuXHRAcmV0dXJuIHtOdW1iZXJ9XG5cdCMjI1xuXHRkZWYgZHIgZG8gQGRyXG5cblx0IyMjXG5cdFRoZSBkaXN0YW5jZSB0aGUgdG91Y2ggaGFzIG1vdmVkIGhvcml6b250YWxseVxuXHRAcmV0dXJuIHtOdW1iZXJ9XG5cdCMjI1xuXHRkZWYgZHggZG8gQHggLSBAeDBcblxuXHQjIyNcblx0VGhlIGRpc3RhbmNlIHRoZSB0b3VjaCBoYXMgbW92ZWQgdmVydGljYWxseVxuXHRAcmV0dXJuIHtOdW1iZXJ9XG5cdCMjI1xuXHRkZWYgZHkgZG8gQHkgLSBAeTBcblxuXHQjIyNcblx0SW5pdGlhbCBob3Jpem9udGFsIHBvc2l0aW9uIG9mIHRvdWNoXG5cdEByZXR1cm4ge051bWJlcn1cblx0IyMjXG5cdGRlZiB4MCBkbyBAeDBcblxuXHQjIyNcblx0SW5pdGlhbCB2ZXJ0aWNhbCBwb3NpdGlvbiBvZiB0b3VjaFxuXHRAcmV0dXJuIHtOdW1iZXJ9XG5cdCMjI1xuXHRkZWYgeTAgZG8gQHkwXG5cblx0IyMjXG5cdEhvcml6b250YWwgcG9zaXRpb24gb2YgdG91Y2hcblx0QHJldHVybiB7TnVtYmVyfVxuXHQjIyNcblx0ZGVmIHggZG8gQHhcblxuXHQjIyNcblx0VmVydGljYWwgcG9zaXRpb24gb2YgdG91Y2hcblx0QHJldHVybiB7TnVtYmVyfVxuXHQjIyNcblx0ZGVmIHkgZG8gQHlcblxuXHQjIyNcblx0SG9yaXpvbnRhbCBwb3NpdGlvbiBvZiB0b3VjaCByZWxhdGl2ZSB0byB0YXJnZXRcblx0QHJldHVybiB7TnVtYmVyfVxuXHQjIyNcblx0ZGVmIHR4IGRvXG5cdFx0QHRhcmdldEJveCB8fD0gQHRhcmdldC5kb20uZ2V0Qm91bmRpbmdDbGllbnRSZWN0XG5cdFx0QHggLSBAdGFyZ2V0Qm94OmxlZnRcblxuXHQjIyNcblx0VmVydGljYWwgcG9zaXRpb24gb2YgdG91Y2ggcmVsYXRpdmUgdG8gdGFyZ2V0XG5cdEByZXR1cm4ge051bWJlcn1cblx0IyMjXG5cdGRlZiB0eVxuXHRcdEB0YXJnZXRCb3ggfHw9IEB0YXJnZXQuZG9tLmdldEJvdW5kaW5nQ2xpZW50UmVjdFxuXHRcdEB5IC0gQHRhcmdldEJveDp0b3BcblxuXHQjIyNcblx0QnV0dG9uIHByZXNzZWQgaW4gdGhpcyB0b3VjaC4gTmF0aXZlIHRvdWNoZXMgZGVmYXVsdHMgdG8gbGVmdC1jbGljayAoMClcblx0QHJldHVybiB7TnVtYmVyfVxuXHQjIyNcblx0ZGVmIGJ1dHRvbiBkbyBAYnV0dG9uICMgQHBvaW50ZXIgPyBAcG9pbnRlci5idXR0b24gOiAwXG5cblx0ZGVmIHNvdXJjZVRhcmdldFxuXHRcdEBzb3VyY2VUYXJnZXRcblxuXHRkZWYgZWxhcHNlZFxuXHRcdERhdGUubm93IC0gQHRpbWVzdGFtcFxuXG5cbmNsYXNzIEltYmEuVG91Y2hHZXN0dXJlXG5cblx0cHJvcCBhY3RpdmUgZGVmYXVsdDogbm9cblxuXHRkZWYgb250b3VjaHN0YXJ0IGVcblx0XHRzZWxmXG5cblx0ZGVmIG9udG91Y2h1cGRhdGUgZVxuXHRcdHNlbGZcblxuXHRkZWYgb250b3VjaGVuZCBlXG5cdFx0c2VsZlxuXG4iLCIjIyNcbkltYmEgaXMgdGhlIG5hbWVzcGFjZSBmb3IgYWxsIHJ1bnRpbWUgcmVsYXRlZCB1dGlsaXRpZXNcbkBuYW1lc3BhY2VcbiMjI1xudmFyIEltYmEgPSB7VkVSU0lPTjogJzEuNC4wJ31cblxuIyMjXG5cbkxpZ2h0IHdyYXBwZXIgYXJvdW5kIG5hdGl2ZSBzZXRUaW1lb3V0IHRoYXQgZXhwZWN0cyB0aGUgYmxvY2sgLyBmdW5jdGlvblxuYXMgbGFzdCBhcmd1bWVudCAoaW5zdGVhZCBvZiBmaXJzdCkuIEl0IGFsc28gdHJpZ2dlcnMgYW4gZXZlbnQgdG8gSW1iYVxuYWZ0ZXIgdGhlIHRpbWVvdXQgdG8gbGV0IHNjaGVkdWxlcnMgdXBkYXRlICh0byByZXJlbmRlciBldGMpIGFmdGVyd2FyZHMuXG5cbiMjI1xuZGVmIEltYmEuc2V0VGltZW91dCBkZWxheSwgJmJsb2NrXG5cdHNldFRpbWVvdXQoJixkZWxheSkgZG9cblx0XHRibG9jaygpXG5cdFx0SW1iYS5jb21taXRcblxuIyMjXG5cbkxpZ2h0IHdyYXBwZXIgYXJvdW5kIG5hdGl2ZSBzZXRJbnRlcnZhbCB0aGF0IGV4cGVjdHMgdGhlIGJsb2NrIC8gZnVuY3Rpb25cbmFzIGxhc3QgYXJndW1lbnQgKGluc3RlYWQgb2YgZmlyc3QpLiBJdCBhbHNvIHRyaWdnZXJzIGFuIGV2ZW50IHRvIEltYmFcbmFmdGVyIGV2ZXJ5IGludGVydmFsIHRvIGxldCBzY2hlZHVsZXJzIHVwZGF0ZSAodG8gcmVyZW5kZXIgZXRjKSBhZnRlcndhcmRzLlxuXG4jIyNcbmRlZiBJbWJhLnNldEludGVydmFsIGludGVydmFsLCAmYmxvY2tcblx0c2V0SW50ZXJ2YWwoYmxvY2ssaW50ZXJ2YWwpXG5cbiMjI1xuQ2xlYXIgaW50ZXJ2YWwgd2l0aCBzcGVjaWZpZWQgaWRcbiMjI1xuZGVmIEltYmEuY2xlYXJJbnRlcnZhbCBpZFxuXHRjbGVhckludGVydmFsKGlkKVxuXG4jIyNcbkNsZWFyIHRpbWVvdXQgd2l0aCBzcGVjaWZpZWQgaWRcbiMjI1xuZGVmIEltYmEuY2xlYXJUaW1lb3V0IGlkXG5cdGNsZWFyVGltZW91dChpZClcblxuXG5kZWYgSW1iYS5zdWJjbGFzcyBvYmosIHN1cFxuXHRmb3Igayx2IG9mIHN1cFxuXHRcdG9ialtrXSA9IHYgaWYgc3VwLmhhc093blByb3BlcnR5KGspXG5cblx0b2JqOnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwOnByb3RvdHlwZSlcblx0b2JqOl9fc3VwZXJfXyA9IG9iajpwcm90b3R5cGU6X19zdXBlcl9fID0gc3VwOnByb3RvdHlwZVxuXHRvYmo6cHJvdG90eXBlOmluaXRpYWxpemUgPSBvYmo6cHJvdG90eXBlOmNvbnN0cnVjdG9yID0gb2JqXG5cdHJldHVybiBvYmpcblxuIyMjXG5MaWdodHdlaWdodCBtZXRob2QgZm9yIG1ha2luZyBhbiBvYmplY3QgaXRlcmFibGUgaW4gaW1iYXMgZm9yL2luIGxvb3BzLlxuSWYgdGhlIGNvbXBpbGVyIGNhbm5vdCBzYXkgZm9yIGNlcnRhaW4gdGhhdCBhIHRhcmdldCBpbiBhIGZvciBsb29wIGlzIGFuXG5hcnJheSwgaXQgd2lsbCBjYWNoZSB0aGUgaXRlcmFibGUgdmVyc2lvbiBiZWZvcmUgbG9vcGluZy5cblxuYGBgaW1iYVxuIyB0aGlzIGlzIHRoZSB3aG9sZSBtZXRob2RcbmRlZiBJbWJhLml0ZXJhYmxlIG9cblx0cmV0dXJuIG8gPyAobzp0b0FycmF5ID8gby50b0FycmF5IDogbykgOiBbXVxuXG5jbGFzcyBDdXN0b21JdGVyYWJsZVxuXHRkZWYgdG9BcnJheVxuXHRcdFsxLDIsM11cblxuIyB3aWxsIHJldHVybiBbMiw0LDZdXG5mb3IgeCBpbiBDdXN0b21JdGVyYWJsZS5uZXdcblx0eCAqIDJcblxuYGBgXG4jIyNcbmRlZiBJbWJhLml0ZXJhYmxlIG9cblx0cmV0dXJuIG8gPyAobzp0b0FycmF5ID8gby50b0FycmF5IDogbykgOiBbXVxuXG4jIyNcbkNvZXJjZXMgYSB2YWx1ZSBpbnRvIGEgcHJvbWlzZS4gSWYgdmFsdWUgaXMgYXJyYXkgaXQgd2lsbFxuY2FsbCBgUHJvbWlzZS5hbGwodmFsdWUpYCwgb3IgaWYgaXQgaXMgbm90IGEgcHJvbWlzZSBpdCB3aWxsXG53cmFwIHRoZSB2YWx1ZSBpbiBgUHJvbWlzZS5yZXNvbHZlKHZhbHVlKWAuIFVzZWQgZm9yIGV4cGVyaW1lbnRhbFxuYXdhaXQgc3ludGF4LlxuQHJldHVybiB7UHJvbWlzZX1cbiMjI1xuZGVmIEltYmEuYXdhaXQgdmFsdWVcblx0aWYgdmFsdWUgaXNhIEFycmF5XG5cdFx0Y29uc29sZS53YXJuKFwiYXdhaXQgKEFycmF5KSBpcyBkZXByZWNhdGVkIC0gdXNlIGF3YWl0IFByb21pc2UuYWxsKEFycmF5KVwiKVxuXHRcdFByb21pc2UuYWxsKHZhbHVlKVxuXHRlbGlmIHZhbHVlIGFuZCB2YWx1ZTp0aGVuXG5cdFx0dmFsdWVcblx0ZWxzZVxuXHRcdFByb21pc2UucmVzb2x2ZSh2YWx1ZSlcblxudmFyIGRhc2hSZWdleCA9IC8tLi9nXG52YXIgc2V0dGVyQ2FjaGUgPSB7fVxuXG5kZWYgSW1iYS50b0NhbWVsQ2FzZSBzdHJcblx0aWYgc3RyLmluZGV4T2YoJy0nKSA+PSAwXG5cdFx0c3RyLnJlcGxhY2UoZGFzaFJlZ2V4KSBkbyB8bXwgbS5jaGFyQXQoMSkudG9VcHBlckNhc2Vcblx0ZWxzZVxuXHRcdHN0clxuXHRcdFxuZGVmIEltYmEudG9TZXR0ZXIgc3RyXG5cdHNldHRlckNhY2hlW3N0cl0gfHw9IEltYmEudG9DYW1lbENhc2UoJ3NldC0nICsgc3RyKVxuXG5kZWYgSW1iYS5pbmRleE9mIGEsYlxuXHRyZXR1cm4gKGIgJiYgYjppbmRleE9mKSA/IGIuaW5kZXhPZihhKSA6IFtdOmluZGV4T2YuY2FsbChhLGIpXG5cbmRlZiBJbWJhLmxlbiBhXG5cdHJldHVybiBhICYmIChhOmxlbiBpc2EgRnVuY3Rpb24gPyBhOmxlbi5jYWxsKGEpIDogYTpsZW5ndGgpIG9yIDBcblxuZGVmIEltYmEucHJvcCBzY29wZSwgbmFtZSwgb3B0c1xuXHRpZiBzY29wZTpkZWZpbmVQcm9wZXJ0eVxuXHRcdHJldHVybiBzY29wZS5kZWZpbmVQcm9wZXJ0eShuYW1lLG9wdHMpXG5cdHJldHVyblxuXG5kZWYgSW1iYS5hdHRyIHNjb3BlLCBuYW1lLCBvcHRzID0ge31cblx0aWYgc2NvcGU6ZGVmaW5lQXR0cmlidXRlXG5cdFx0cmV0dXJuIHNjb3BlLmRlZmluZUF0dHJpYnV0ZShuYW1lLG9wdHMpXG5cblx0bGV0IGdldE5hbWUgPSBJbWJhLnRvQ2FtZWxDYXNlKG5hbWUpXG5cdGxldCBzZXROYW1lID0gSW1iYS50b0NhbWVsQ2FzZSgnc2V0LScgKyBuYW1lKVxuXHRsZXQgcHJvdG8gPSBzY29wZTpwcm90b3R5cGVcblxuXHRpZiBvcHRzOmRvbVxuXHRcdHByb3RvW2dldE5hbWVdID0gZG8gdGhpcy5kb21bbmFtZV1cblx0XHRwcm90b1tzZXROYW1lXSA9IGRvIHx2YWx1ZXxcblx0XHRcdGlmIHZhbHVlICE9IHRoaXNbbmFtZV0oKVxuXHRcdFx0XHR0aGlzLmRvbVtuYW1lXSA9IHZhbHVlXG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRlbHNlXG5cdFx0cHJvdG9bZ2V0TmFtZV0gPSBkbyB0aGlzLmdldEF0dHJpYnV0ZShuYW1lKVxuXHRcdHByb3RvW3NldE5hbWVdID0gZG8gfHZhbHVlfFxuXHRcdFx0dGhpcy5zZXRBdHRyaWJ1dGUobmFtZSx2YWx1ZSlcblx0XHRcdHJldHVybiB0aGlzXG5cdHJldHVyblxuXG5kZWYgSW1iYS5wcm9wRGlkU2V0IG9iamVjdCwgcHJvcGVydHksIHZhbCwgcHJldlxuXHRsZXQgZm4gPSBwcm9wZXJ0eTp3YXRjaFxuXHRpZiBmbiBpc2EgRnVuY3Rpb25cblx0XHRmbi5jYWxsKG9iamVjdCx2YWwscHJldixwcm9wZXJ0eSlcblx0ZWxpZiBmbiBpc2EgU3RyaW5nIGFuZCBvYmplY3RbZm5dXG5cdFx0b2JqZWN0W2ZuXSh2YWwscHJldixwcm9wZXJ0eSlcblx0cmV0dXJuXG5cblxuIyBCYXNpYyBldmVudHNcbnZhciBlbWl0X18gPSBkbyB8ZXZlbnQsIGFyZ3MsIG5vZGV8XG5cdCMgdmFyIG5vZGUgPSBjYnNbZXZlbnRdXG5cdHZhciBwcmV2LCBjYiwgcmV0XG5cblx0d2hpbGUgKHByZXYgPSBub2RlKSBhbmQgKG5vZGUgPSBub2RlOm5leHQpXG5cdFx0aWYgY2IgPSBub2RlOmxpc3RlbmVyXG5cdFx0XHRpZiBub2RlOnBhdGggYW5kIGNiW25vZGU6cGF0aF1cblx0XHRcdFx0cmV0ID0gYXJncyA/IGNiW25vZGU6cGF0aF0uYXBwbHkoY2IsYXJncykgOiBjYltub2RlOnBhdGhdKClcblx0XHRcdGVsc2Vcblx0XHRcdFx0IyBjaGVjayBpZiBpdCBpcyBhIG1ldGhvZD9cblx0XHRcdFx0cmV0ID0gYXJncyA/IGNiLmFwcGx5KG5vZGUsIGFyZ3MpIDogY2IuY2FsbChub2RlKVxuXG5cdFx0aWYgbm9kZTp0aW1lcyAmJiAtLW5vZGU6dGltZXMgPD0gMFxuXHRcdFx0cHJldjpuZXh0ID0gbm9kZTpuZXh0XG5cdFx0XHRub2RlOmxpc3RlbmVyID0gbnVsbFxuXHRyZXR1cm5cblxuIyBtZXRob2QgZm9yIHJlZ2lzdGVyaW5nIGEgbGlzdGVuZXIgb24gb2JqZWN0XG5kZWYgSW1iYS5saXN0ZW4gb2JqLCBldmVudCwgbGlzdGVuZXIsIHBhdGhcblx0dmFyIGNicywgbGlzdCwgdGFpbFxuXHRjYnMgPSBvYmo6X19saXN0ZW5lcnNfXyB8fD0ge31cblx0bGlzdCA9IGNic1tldmVudF0gfHw9IHt9XG5cdHRhaWwgPSBsaXN0OnRhaWwgfHwgKGxpc3Q6dGFpbCA9IChsaXN0Om5leHQgPSB7fSkpXG5cdHRhaWw6bGlzdGVuZXIgPSBsaXN0ZW5lclxuXHR0YWlsOnBhdGggPSBwYXRoXG5cdGxpc3Q6dGFpbCA9IHRhaWw6bmV4dCA9IHt9XG5cdHJldHVybiB0YWlsXG5cbiMgcmVnaXN0ZXIgYSBsaXN0ZW5lciBvbmNlXG5kZWYgSW1iYS5vbmNlIG9iaiwgZXZlbnQsIGxpc3RlbmVyXG5cdHZhciB0YWlsID0gSW1iYS5saXN0ZW4ob2JqLGV2ZW50LGxpc3RlbmVyKVxuXHR0YWlsOnRpbWVzID0gMVxuXHRyZXR1cm4gdGFpbFxuXG4jIHJlbW92ZSBhIGxpc3RlbmVyXG5kZWYgSW1iYS51bmxpc3RlbiBvYmosIGV2ZW50LCBjYiwgbWV0aFxuXHR2YXIgbm9kZSwgcHJldlxuXHR2YXIgbWV0YSA9IG9iajpfX2xpc3RlbmVyc19fXG5cdHJldHVybiB1bmxlc3MgbWV0YVxuXG5cdGlmIG5vZGUgPSBtZXRhW2V2ZW50XVxuXHRcdHdoaWxlIChwcmV2ID0gbm9kZSkgYW5kIChub2RlID0gbm9kZTpuZXh0KVxuXHRcdFx0aWYgbm9kZSA9PSBjYiB8fCBub2RlOmxpc3RlbmVyID09IGNiXG5cdFx0XHRcdHByZXY6bmV4dCA9IG5vZGU6bmV4dFxuXHRcdFx0XHQjIGNoZWNrIGZvciBjb3JyZWN0IHBhdGggYXMgd2VsbD9cblx0XHRcdFx0bm9kZTpsaXN0ZW5lciA9IG51bGxcblx0XHRcdFx0YnJlYWtcblx0cmV0dXJuXG5cbiMgZW1pdCBldmVudFxuZGVmIEltYmEuZW1pdCBvYmosIGV2ZW50LCBwYXJhbXNcblx0aWYgdmFyIGNiID0gb2JqOl9fbGlzdGVuZXJzX19cblx0XHRlbWl0X18oZXZlbnQscGFyYW1zLGNiW2V2ZW50XSkgaWYgY2JbZXZlbnRdXG5cdFx0ZW1pdF9fKGV2ZW50LFtldmVudCxwYXJhbXNdLGNiOmFsbCkgaWYgY2I6YWxsICMgYW5kIGV2ZW50ICE9ICdhbGwnXG5cdHJldHVyblxuXG5kZWYgSW1iYS5vYnNlcnZlUHJvcGVydHkgb2JzZXJ2ZXIsIGtleSwgdHJpZ2dlciwgdGFyZ2V0LCBwcmV2XG5cdGlmIHByZXYgYW5kIHR5cGVvZiBwcmV2ID09ICdvYmplY3QnXG5cdFx0SW1iYS51bmxpc3RlbihwcmV2LCdhbGwnLG9ic2VydmVyLHRyaWdnZXIpXG5cdGlmIHRhcmdldCBhbmQgdHlwZW9mIHRhcmdldCA9PSAnb2JqZWN0J1xuXHRcdEltYmEubGlzdGVuKHRhcmdldCwnYWxsJyxvYnNlcnZlcix0cmlnZ2VyKVxuXHRzZWxmXG5cbm1vZHVsZTpleHBvcnRzID0gSW1iYVxuIiwidmFyIEltYmEgPSByZXF1aXJlKFwiLi9pbWJhXCIpXG52YXIgYWN0aXZhdGUgPSBub1xudmFyIG5zID0gKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnID8gd2luZG93IDogKHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnID8gZ2xvYmFsIDogbnVsbCkpXG5cbmlmIG5zIGFuZCBucy5JbWJhXG5cdGNvbnNvbGUud2FybiBcIkltYmEgdntucy5JbWJhLlZFUlNJT059IGlzIGFscmVhZHkgbG9hZGVkLlwiXG5cdEltYmEgPSBucy5JbWJhXG5lbGlmIG5zXG5cdG5zLkltYmEgPSBJbWJhXG5cdGFjdGl2YXRlID0geWVzXG5cdGlmIG5zOmRlZmluZSBhbmQgbnM6ZGVmaW5lOmFtZFxuXHRcdG5zLmRlZmluZShcImltYmFcIixbXSkgZG8gSW1iYVxuXG5tb2R1bGUuZXhwb3J0cyA9IEltYmFcblxudW5sZXNzICR3ZWJ3b3JrZXIkXG5cdHJlcXVpcmUgJy4vc2NoZWR1bGVyJ1xuXHRyZXF1aXJlICcuL2RvbS9pbmRleCdcblxuaWYgYWN0aXZhdGVcblx0SW1iYS5FdmVudE1hbmFnZXIuYWN0aXZhdGVcblx0XG5pZiAkbm9kZSRcblx0dW5sZXNzICR3ZWJwYWNrJFxuXHRcdHJlcXVpcmUgJy4uLy4uL3JlZ2lzdGVyLmpzJ1xuIiwidmFyIEltYmEgPSByZXF1aXJlKFwiLi9pbWJhXCIpXG5cbnZhciByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgIyB2ZXJ5IHNpbXBsZSByYWYgcG9seWZpbGxcbnZhciBjYW5jZWxBbmltYXRpb25GcmFtZVxuXG5pZiAkbm9kZSRcblx0Y2FuY2VsQW5pbWF0aW9uRnJhbWUgPSBkbyB8aWR8IGNsZWFyVGltZW91dChpZClcblx0cmVxdWVzdEFuaW1hdGlvbkZyYW1lID0gZG8gfGJsa3wgc2V0VGltZW91dChibGssMTAwMCAvIDYwKVxuXG5pZiAkd2ViJFxuXHRjYW5jZWxBbmltYXRpb25GcmFtZSA9IHdpbmRvdzpjYW5jZWxBbmltYXRpb25GcmFtZSB8fCB3aW5kb3c6bW96Q2FuY2VsQW5pbWF0aW9uRnJhbWUgfHwgd2luZG93OndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZVxuXHRyZXF1ZXN0QW5pbWF0aW9uRnJhbWUgPSB3aW5kb3c6cmVxdWVzdEFuaW1hdGlvbkZyYW1lXG5cdHJlcXVlc3RBbmltYXRpb25GcmFtZSB8fD0gd2luZG93OndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZVxuXHRyZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHw9IHdpbmRvdzptb3pSZXF1ZXN0QW5pbWF0aW9uRnJhbWVcblx0cmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8PSBkbyB8YmxrfCBzZXRUaW1lb3V0KGJsaywxMDAwIC8gNjApXG5cbmNsYXNzIFRpY2tlclxuXG5cdHByb3Agc3RhZ2Vcblx0cHJvcCBxdWV1ZVxuXG5cdGRlZiBpbml0aWFsaXplXG5cdFx0QHF1ZXVlID0gW11cblx0XHRAc3RhZ2UgPSAtMVxuXHRcdEBzY2hlZHVsZWQgPSBub1xuXHRcdEB0aWNrZXIgPSBkbyB8ZXxcblx0XHRcdEBzY2hlZHVsZWQgPSBub1xuXHRcdFx0dGljayhlKVxuXHRcdHNlbGZcblxuXHRkZWYgYWRkIGl0ZW0sIGZvcmNlXG5cdFx0aWYgZm9yY2Ugb3IgQHF1ZXVlLmluZGV4T2YoaXRlbSkgPT0gLTFcblx0XHRcdEBxdWV1ZS5wdXNoKGl0ZW0pXG5cblx0XHRzY2hlZHVsZSB1bmxlc3MgQHNjaGVkdWxlZFxuXG5cdGRlZiB0aWNrIHRpbWVzdGFtcFxuXHRcdHZhciBpdGVtcyA9IEBxdWV1ZVxuXHRcdEB0cyA9IHRpbWVzdGFtcCB1bmxlc3MgQHRzXG5cdFx0QGR0ID0gdGltZXN0YW1wIC0gQHRzXG5cdFx0QHRzID0gdGltZXN0YW1wXG5cdFx0QHF1ZXVlID0gW11cblx0XHRAc3RhZ2UgPSAxXG5cdFx0YmVmb3JlXG5cdFx0aWYgaXRlbXM6bGVuZ3RoXG5cdFx0XHRmb3IgaXRlbSxpIGluIGl0ZW1zXG5cdFx0XHRcdGlmIGl0ZW0gaXNhIEZ1bmN0aW9uXG5cdFx0XHRcdFx0aXRlbShAZHQsc2VsZilcblx0XHRcdFx0ZWxpZiBpdGVtOnRpY2tcblx0XHRcdFx0XHRpdGVtLnRpY2soQGR0LHNlbGYpXG5cdFx0QHN0YWdlID0gMlxuXHRcdGFmdGVyXG5cdFx0QHN0YWdlID0gQHNjaGVkdWxlZCA/IDAgOiAtMVxuXHRcdHNlbGZcblxuXHRkZWYgc2NoZWR1bGVcblx0XHRpZiAhQHNjaGVkdWxlZFxuXHRcdFx0QHNjaGVkdWxlZCA9IHllc1xuXHRcdFx0aWYgQHN0YWdlID09IC0xXG5cdFx0XHRcdEBzdGFnZSA9IDBcblx0XHRcdHJlcXVlc3RBbmltYXRpb25GcmFtZShAdGlja2VyKVxuXHRcdHNlbGZcblxuXHRkZWYgYmVmb3JlXG5cdFx0c2VsZlxuXG5cdGRlZiBhZnRlclxuXHRcdGlmIEltYmEuVGFnTWFuYWdlclxuXHRcdFx0SW1iYS5UYWdNYW5hZ2VyLnJlZnJlc2hcblx0XHRzZWxmXG5cbkltYmEuVElDS0VSID0gVGlja2VyLm5ld1xuSW1iYS5TQ0hFRFVMRVJTID0gW11cblxuZGVmIEltYmEudGlja2VyXG5cdEltYmEuVElDS0VSXG5cbmRlZiBJbWJhLnJlcXVlc3RBbmltYXRpb25GcmFtZSBjYWxsYmFja1xuXHRyZXF1ZXN0QW5pbWF0aW9uRnJhbWUoY2FsbGJhY2spXG5cbmRlZiBJbWJhLmNhbmNlbEFuaW1hdGlvbkZyYW1lIGlkXG5cdGNhbmNlbEFuaW1hdGlvbkZyYW1lKGlkKVxuXG4jIHNob3VsZCBhZGQgYW4gSW1iYS5ydW4gLyBzZXRJbW1lZGlhdGUgdGhhdFxuIyBwdXNoZXMgbGlzdGVuZXIgb250byB0aGUgdGljay1xdWV1ZSB3aXRoIHRpbWVzIC0gb25jZVxuXG52YXIgY29tbWl0UXVldWUgPSAwXG5cbmRlZiBJbWJhLmNvbW1pdCBwYXJhbXNcblx0Y29tbWl0UXVldWUrK1xuXHQjIEltYmEuVGFnTWFuYWdlci5yZWZyZXNoXG5cdEltYmEuZW1pdChJbWJhLCdjb21taXQnLHBhcmFtcyAhPSB1bmRlZmluZWQgPyBbcGFyYW1zXSA6IHVuZGVmaW5lZClcblx0aWYgLS1jb21taXRRdWV1ZSA9PSAwXG5cdFx0SW1iYS5UYWdNYW5hZ2VyIGFuZCBJbWJhLlRhZ01hbmFnZXIucmVmcmVzaFxuXHRyZXR1cm5cblxuIyMjXG5cbkluc3RhbmNlcyBvZiBJbWJhLlNjaGVkdWxlciBtYW5hZ2VzIHdoZW4gdG8gY2FsbCBgdGljaygpYCBvbiB0aGVpciB0YXJnZXQsXG5hdCBhIHNwZWNpZmllZCBmcmFtZXJhdGUgb3Igd2hlbiBjZXJ0YWluIGV2ZW50cyBvY2N1ci4gUm9vdC1ub2RlcyBpbiB5b3VyXG5hcHBsaWNhdGlvbnMgd2lsbCB1c3VhbGx5IGhhdmUgYSBzY2hlZHVsZXIgdG8gbWFrZSBzdXJlIHRoZXkgcmVyZW5kZXIgd2hlblxuc29tZXRoaW5nIGNoYW5nZXMuIEl0IGlzIGFsc28gcG9zc2libGUgdG8gbWFrZSBpbm5lciBjb21wb25lbnRzIHVzZSB0aGVpclxub3duIHNjaGVkdWxlcnMgdG8gY29udHJvbCB3aGVuIHRoZXkgcmVuZGVyLlxuXG5AaW5hbWUgc2NoZWR1bGVyXG5cbiMjI1xuY2xhc3MgSW1iYS5TY2hlZHVsZXJcblx0XG5cdHZhciBjb3VudGVyID0gMFxuXG5cdGRlZiBzZWxmLmV2ZW50IGVcblx0XHRJbWJhLmVtaXQoSW1iYSwnZXZlbnQnLGUpXG5cblx0IyMjXG5cdENyZWF0ZSBhIG5ldyBJbWJhLlNjaGVkdWxlciBmb3Igc3BlY2lmaWVkIHRhcmdldFxuXHRAcmV0dXJuIHtJbWJhLlNjaGVkdWxlcn1cblx0IyMjXG5cdGRlZiBpbml0aWFsaXplIHRhcmdldFxuXHRcdEBpZCA9IGNvdW50ZXIrK1xuXHRcdEB0YXJnZXQgPSB0YXJnZXRcblx0XHRAbWFya2VkID0gbm9cblx0XHRAYWN0aXZlID0gbm9cblx0XHRAbWFya2VyID0gZG8gbWFya1xuXHRcdEB0aWNrZXIgPSBkbyB8ZXwgdGljayhlKVxuXG5cdFx0QGR0ID0gMFxuXHRcdEBmcmFtZSA9IHt9XG5cdFx0QHNjaGVkdWxlZCA9IG5vXG5cdFx0QHRpbWVzdGFtcCA9IDBcblx0XHRAdGlja3MgPSAwXG5cdFx0QGZsdXNoZXMgPSAwXG5cblx0XHRzZWxmOm9uZXZlbnQgPSBzZWxmOm9uZXZlbnQuYmluZChzZWxmKVxuXHRcdHNlbGZcblxuXHRwcm9wIHJhZiB3YXRjaDogeWVzXG5cdHByb3AgaW50ZXJ2YWwgd2F0Y2g6IHllc1xuXHRwcm9wIGV2ZW50cyB3YXRjaDogeWVzXG5cdHByb3AgbWFya2VkXG5cblx0ZGVmIHJhZkRpZFNldCBib29sXG5cdFx0cmVxdWVzdFRpY2sgaWYgYm9vbCBhbmQgQGFjdGl2ZVxuXHRcdHNlbGZcblxuXHRkZWYgaW50ZXJ2YWxEaWRTZXQgdGltZVxuXHRcdGNsZWFySW50ZXJ2YWwoQGludGVydmFsSWQpXG5cdFx0QGludGVydmFsSWQgPSBudWxsXG5cdFx0aWYgdGltZSBhbmQgQGFjdGl2ZVxuXHRcdFx0QGludGVydmFsSWQgPSBzZXRJbnRlcnZhbChzZWxmOm9uaW50ZXJ2YWwuYmluZChzZWxmKSx0aW1lKVxuXHRcdHNlbGZcblxuXHRkZWYgZXZlbnRzRGlkU2V0IG5ldywgcHJldlxuXHRcdGlmIEBhY3RpdmUgYW5kIG5ldyBhbmQgIXByZXZcblx0XHRcdEltYmEubGlzdGVuKEltYmEsJ2NvbW1pdCcsc2VsZiwnb25ldmVudCcpXG5cdFx0ZWxpZiAhbmV3IGFuZCBwcmV2XG5cdFx0XHRJbWJhLnVubGlzdGVuKEltYmEsJ2NvbW1pdCcsc2VsZiwnb25ldmVudCcpXG5cblx0IyMjXG5cdENoZWNrIHdoZXRoZXIgdGhlIGN1cnJlbnQgc2NoZWR1bGVyIGlzIGFjdGl2ZSBvciBub3Rcblx0QHJldHVybiB7Ym9vbH1cblx0IyMjXG5cdGRlZiBhY3RpdmVcblx0XHRAYWN0aXZlXG5cblx0IyMjXG5cdERlbHRhIHRpbWUgYmV0d2VlbiB0aGUgdHdvIGxhc3QgdGlja3Ncblx0QHJldHVybiB7TnVtYmVyfVxuXHQjIyNcblx0ZGVmIGR0XG5cdFx0QGR0XG5cblx0IyMjXG5cdENvbmZpZ3VyZSB0aGUgc2NoZWR1bGVyXG5cdEByZXR1cm4ge3NlbGZ9XG5cdCMjI1xuXHRkZWYgY29uZmlndXJlIG9wdGlvbnMgPSB7fVxuXHRcdHJhZiA9IG9wdGlvbnM6cmFmIGlmIG9wdGlvbnM6cmFmICE9IHVuZGVmaW5lZFxuXHRcdGludGVydmFsID0gb3B0aW9uczppbnRlcnZhbCBpZiBvcHRpb25zOmludGVydmFsICE9IHVuZGVmaW5lZFxuXHRcdGV2ZW50cyA9IG9wdGlvbnM6ZXZlbnRzIGlmIG9wdGlvbnM6ZXZlbnRzICE9IHVuZGVmaW5lZFxuXHRcdHNlbGZcblxuXHQjIyNcblx0TWFyayB0aGUgc2NoZWR1bGVyIGFzIGRpcnR5LiBUaGlzIHdpbGwgbWFrZSBzdXJlIHRoYXRcblx0dGhlIHNjaGVkdWxlciBjYWxscyBgdGFyZ2V0LnRpY2tgIG9uIHRoZSBuZXh0IGZyYW1lXG5cdEByZXR1cm4ge3NlbGZ9XG5cdCMjI1xuXHRkZWYgbWFya1xuXHRcdEBtYXJrZWQgPSB5ZXNcblx0XHRpZiAhQHNjaGVkdWxlZFxuXHRcdFx0cmVxdWVzdFRpY2tcblx0XHRzZWxmXG5cblx0IyMjXG5cdEluc3RhbnRseSB0cmlnZ2VyIHRhcmdldC50aWNrIGFuZCBtYXJrIHNjaGVkdWxlciBhcyBjbGVhbiAobm90IGRpcnR5L21hcmtlZCkuXG5cdFRoaXMgaXMgY2FsbGVkIGltcGxpY2l0bHkgZnJvbSB0aWNrLCBidXQgY2FuIGFsc28gYmUgY2FsbGVkIG1hbnVhbGx5IGlmIHlvdVxuXHRyZWFsbHkgd2FudCB0byBmb3JjZSBhIHRpY2sgd2l0aG91dCB3YWl0aW5nIGZvciB0aGUgbmV4dCBmcmFtZS5cblx0QHJldHVybiB7c2VsZn1cblx0IyMjXG5cdGRlZiBmbHVzaFxuXHRcdEBmbHVzaGVzKytcblx0XHRAdGFyZ2V0LnRpY2soc2VsZilcblx0XHRAbWFya2VkID0gbm9cblx0XHRzZWxmXG5cblx0IyMjXG5cdEBmaXhtZSB0aGlzIGV4cGVjdHMgcmFmIHRvIHJ1biBhdCA2MCBmcHMgXG5cblx0Q2FsbGVkIGF1dG9tYXRpY2FsbHkgb24gZXZlcnkgZnJhbWUgd2hpbGUgdGhlIHNjaGVkdWxlciBpcyBhY3RpdmUuXG5cdEl0IHdpbGwgb25seSBjYWxsIGB0YXJnZXQudGlja2AgaWYgdGhlIHNjaGVkdWxlciBpcyBtYXJrZWQgZGlydHksXG5cdG9yIHdoZW4gYWNjb3JkaW5nIHRvIEBmcHMgc2V0dGluZy5cblxuXHRJZiB5b3UgaGF2ZSBzZXQgdXAgYSBzY2hlZHVsZXIgd2l0aCBhbiBmcHMgb2YgMSwgdGljayB3aWxsIHN0aWxsIGJlXG5cdGNhbGxlZCBldmVyeSBmcmFtZSwgYnV0IGB0YXJnZXQudGlja2Agd2lsbCBvbmx5IGJlIGNhbGxlZCBvbmNlIGV2ZXJ5XG5cdHNlY29uZCwgYW5kIGl0IHdpbGwgKm1ha2Ugc3VyZSogZWFjaCBgdGFyZ2V0LnRpY2tgIGhhcHBlbnMgaW4gc2VwYXJhdGVcblx0c2Vjb25kcyBhY2NvcmRpbmcgdG8gRGF0ZS4gU28gaWYgeW91IGhhdmUgYSBub2RlIHRoYXQgcmVuZGVycyBhIGNsb2NrXG5cdGJhc2VkIG9uIERhdGUubm93IChvciBzb21ldGhpbmcgc2ltaWxhciksIHlvdSBjYW4gc2NoZWR1bGUgaXQgd2l0aCAxZnBzLFxuXHRuZXZlciBuZWVkaW5nIHRvIHdvcnJ5IGFib3V0IHR3byB0aWNrcyBoYXBwZW5pbmcgd2l0aGluIHRoZSBzYW1lIHNlY29uZC5cblx0VGhlIHNhbWUgZ29lcyBmb3IgNGZwcywgMTBmcHMgZXRjLlxuXG5cdEBwcm90ZWN0ZWRcblx0QHJldHVybiB7c2VsZn1cblx0IyMjXG5cdGRlZiB0aWNrIGRlbHRhLCB0aWNrZXJcblx0XHRAdGlja3MrK1xuXHRcdEBkdCA9IGRlbHRhXG5cblx0XHRpZiB0aWNrZXJcblx0XHRcdEBzY2hlZHVsZWQgPSBub1xuXG5cdFx0Zmx1c2hcblxuXHRcdGlmIEByYWYgYW5kIEBhY3RpdmVcblx0XHRcdHJlcXVlc3RUaWNrXG5cdFx0c2VsZlxuXG5cdGRlZiByZXF1ZXN0VGlja1xuXHRcdHVubGVzcyBAc2NoZWR1bGVkXG5cdFx0XHRAc2NoZWR1bGVkID0geWVzXG5cdFx0XHRJbWJhLlRJQ0tFUi5hZGQoc2VsZilcblx0XHRzZWxmXG5cblx0IyMjXG5cdFN0YXJ0IHRoZSBzY2hlZHVsZXIgaWYgaXQgaXMgbm90IGFscmVhZHkgYWN0aXZlLlxuXHQqKldoaWxlIGFjdGl2ZSoqLCB0aGUgc2NoZWR1bGVyIHdpbGwgb3ZlcnJpZGUgYHRhcmdldC5jb21taXRgXG5cdHRvIGRvIG5vdGhpbmcuIEJ5IGRlZmF1bHQgSW1iYS50YWcjY29tbWl0IGNhbGxzIHJlbmRlciwgc29cblx0dGhhdCByZW5kZXJpbmcgaXMgY2FzY2FkZWQgdGhyb3VnaCB0byBjaGlsZHJlbiB3aGVuIHJlbmRlcmluZ1xuXHRhIG5vZGUuIFdoZW4gYSBzY2hlZHVsZXIgaXMgYWN0aXZlIChmb3IgYSBub2RlKSwgSW1iYSBkaXNhYmxlc1xuXHR0aGlzIGF1dG9tYXRpYyByZW5kZXJpbmcuXG5cdCMjI1xuXHRkZWYgYWN0aXZhdGUgaW1tZWRpYXRlID0geWVzXG5cdFx0dW5sZXNzIEBhY3RpdmVcblx0XHRcdEBhY3RpdmUgPSB5ZXNcblx0XHRcdEBjb21taXQgPSBAdGFyZ2V0OmNvbW1pdFxuXHRcdFx0QHRhcmdldDpjb21taXQgPSBkbyB0aGlzXG5cdFx0XHRAdGFyZ2V0Py5mbGFnKCdzY2hlZHVsZWRfJylcblx0XHRcdEltYmEuU0NIRURVTEVSUy5wdXNoKHNlbGYpXG5cdFx0XHRcblx0XHRcdGlmIEBldmVudHNcblx0XHRcdFx0SW1iYS5saXN0ZW4oSW1iYSwnY29tbWl0JyxzZWxmLCdvbmV2ZW50Jylcblx0XHRcdFx0XG5cdFx0XHRpZiBAaW50ZXJ2YWwgYW5kICFAaW50ZXJ2YWxJZFxuXHRcdFx0XHRAaW50ZXJ2YWxJZCA9IHNldEludGVydmFsKHNlbGY6b25pbnRlcnZhbC5iaW5kKHNlbGYpLEBpbnRlcnZhbClcblxuXHRcdFx0aWYgaW1tZWRpYXRlXG5cdFx0XHRcdHRpY2soMClcblx0XHRcdGVsaWYgQHJhZlxuXHRcdFx0XHRyZXF1ZXN0VGlja1xuXHRcdHJldHVybiBzZWxmXG5cblx0IyMjXG5cdFN0b3AgdGhlIHNjaGVkdWxlciBpZiBpdCBpcyBhY3RpdmUuXG5cdCMjI1xuXHRkZWYgZGVhY3RpdmF0ZVxuXHRcdGlmIEBhY3RpdmVcblx0XHRcdEBhY3RpdmUgPSBub1xuXHRcdFx0QHRhcmdldDpjb21taXQgPSBAY29tbWl0XG5cdFx0XHRsZXQgaWR4ID0gSW1iYS5TQ0hFRFVMRVJTLmluZGV4T2Yoc2VsZilcblx0XHRcdGlmIGlkeCA+PSAwXG5cdFx0XHRcdEltYmEuU0NIRURVTEVSUy5zcGxpY2UoaWR4LDEpXG5cdFx0XHRcdFxuXHRcdFx0aWYgQGV2ZW50c1xuXHRcdFx0XHRJbWJhLnVubGlzdGVuKEltYmEsJ2NvbW1pdCcsc2VsZiwnb25ldmVudCcpXG5cblx0XHRcdGlmIEBpbnRlcnZhbElkXG5cdFx0XHRcdGNsZWFySW50ZXJ2YWwoQGludGVydmFsSWQpXG5cdFx0XHRcdEBpbnRlcnZhbElkID0gbnVsbFxuXHRcdFx0XG5cdFx0XHRAdGFyZ2V0Py51bmZsYWcoJ3NjaGVkdWxlZF8nKVxuXHRcdHJldHVybiBzZWxmXG5cblx0ZGVmIHRyYWNrXG5cdFx0QG1hcmtlclxuXHRcdFxuXHRkZWYgb25pbnRlcnZhbFxuXHRcdHRpY2tcblx0XHRJbWJhLlRhZ01hbmFnZXIucmVmcmVzaFxuXHRcdHNlbGZcblxuXHRkZWYgb25ldmVudCBldmVudFxuXHRcdHJldHVybiBzZWxmIGlmICFAZXZlbnRzIG9yIEBtYXJrZWRcblxuXHRcdGlmIEBldmVudHMgaXNhIEZ1bmN0aW9uXG5cdFx0XHRtYXJrIGlmIEBldmVudHMoZXZlbnQsc2VsZilcblx0XHRlbGlmIEBldmVudHMgaXNhIEFycmF5XG5cdFx0XHRpZiBAZXZlbnRzLmluZGV4T2YoKGV2ZW50IGFuZCBldmVudDp0eXBlKSBvciBldmVudCkgPj0gMFxuXHRcdFx0XHRtYXJrXG5cdFx0ZWxzZVxuXHRcdFx0bWFya1xuXHRcdHNlbGZcbiIsInZhciBnO1xuXG4vLyBUaGlzIHdvcmtzIGluIG5vbi1zdHJpY3QgbW9kZVxuZyA9IChmdW5jdGlvbigpIHtcblx0cmV0dXJuIHRoaXM7XG59KSgpO1xuXG50cnkge1xuXHQvLyBUaGlzIHdvcmtzIGlmIGV2YWwgaXMgYWxsb3dlZCAoc2VlIENTUClcblx0ZyA9IGcgfHwgRnVuY3Rpb24oXCJyZXR1cm4gdGhpc1wiKSgpIHx8ICgxLCBldmFsKShcInRoaXNcIik7XG59IGNhdGNoIChlKSB7XG5cdC8vIFRoaXMgd29ya3MgaWYgdGhlIHdpbmRvdyByZWZlcmVuY2UgaXMgYXZhaWxhYmxlXG5cdGlmICh0eXBlb2Ygd2luZG93ID09PSBcIm9iamVjdFwiKSBnID0gd2luZG93O1xufVxuXG4vLyBnIGNhbiBzdGlsbCBiZSB1bmRlZmluZWQsIGJ1dCBub3RoaW5nIHRvIGRvIGFib3V0IGl0Li4uXG4vLyBXZSByZXR1cm4gdW5kZWZpbmVkLCBpbnN0ZWFkIG9mIG5vdGhpbmcgaGVyZSwgc28gaXQnc1xuLy8gZWFzaWVyIHRvIGhhbmRsZSB0aGlzIGNhc2UuIGlmKCFnbG9iYWwpIHsgLi4ufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGc7XG4iLCJpbXBvcnQgQ2FyZFJvdyBmcm9tICcuL0NhcmRSb3cnXG5pbXBvcnQgQ2FyZFZpZXcgZnJvbSAnLi9DYXJkVmlldydcblxubGV0IGxhbmd1YWdlcyA9IFtcbiAgXCJlbmdsaXNoXCJcbiAgXCJnZXJtYW5cIlxuICBcImZyZW5jaFwiXG4gIFwiaXRhbGlhblwiXG4gIFwia29yZWFuYVwiXG4gIFwic3BhbmlzaFwiXG4gIFwic2NoaW5lc2VcIlxuICBcInRjaGluZXNlXCJcbiAgXCJydXNzaWFuXCJcbiAgXCJ0aGFpXCJcbiAgXCJqYXBhbmVzZVwiXG4gIFwicG9ydHVndWVzZVwiXG4gIFwicG9saXNoXCJcbiAgXCJkYW5pc2hcIlxuICBcImR1dGNoXCJcbiAgXCJmaW5uaXNoXCJcbiAgXCJub3J3ZWdpYW5cIlxuICBcInN3ZWRpc2hcIlxuICBcImh1bmdhcmlhblwiXG4gIFwiY3plY2hcIlxuICBcInJvbWFuaWFuXCJcbiAgXCJ0dXJraXNoXCJcbiAgXCJicmF6aWxpYW5cIlxuICBcImJ1bGdhcmlhblwiXG4gIFwiZ3JlZWtcIlxuICBcInVrcmFpbmlhblwiXG4gIFwibGF0YW1cIlxuICBcInZpZXRuYW1lc2VcIlxuXVxuXG50YWcgQXBwXG4gIHByb3Agc2VhcmNoVGV4dFxuICBwcm9wIGxhbmd1YWdlIGRlZmF1bHQ6ICdlbmdsaXNoJ1xuICBwcm9wIHF1ZXJ5IGRlZmF1bHQ6IHtcbiAgICB0ZXh0OiAnJ1xuICAgIHR5cGU6IHtcbiAgICAgIEhlcm86IHRydWVcbiAgICAgIENyZWVwOiB0cnVlXG4gICAgICBTcGVsbDogdHJ1ZVxuICAgICAgSW1wcm92ZW1lbnQ6IHRydWVcbiAgICAgIEl0ZW06IHRydWVcbiAgICB9XG4gICAgc3ViX3R5cGU6IHtcbiAgICAgIEFybW9yOiB0cnVlXG4gICAgICBXZWFwb246IHRydWVcbiAgICAgIEFjY2Vzc29yeTogdHJ1ZVxuICAgICAgQ29uc3VtYWJsZTogdHJ1ZVxuICAgIH1cbiAgICBjb2xvcjoge1xuICAgICAgaXNfcmVkOiB0cnVlXG4gICAgICBpc19ncmVlbjogdHJ1ZVxuICAgICAgaXNfYmx1ZTogdHJ1ZVxuICAgICAgaXNfYmxhY2s6IHRydWVcbiAgICB9XG4gICAgbm9fY29sb3I6IHRydWVcbiAgICByYXJpdHk6IHtcbiAgICAgIEJhc2ljOiB0cnVlXG4gICAgICBDb21tb246IHRydWVcbiAgICAgIFVuY29tbW9uOiB0cnVlXG4gICAgICBSYXJlOiB0cnVlXG4gICAgfVxuICB9XG4gIHByb3Agc2V0cyBkZWZhdWx0OiBbXVxuICBwcm9wIGNhcmRzIGRlZmF1bHQ6IFtdXG4gIHByb3AgY2FyZHNJbmRleCBkZWZhdWx0OiB7fVxuICBwcm9wIHZpZXdpbmdDYXJkXG5cbiAgZGVmIHNlYXJjaFRleHQ9IHZhbHVlXG4gICAgQHNlYXJjaFRleHQgPSB2YWx1ZVxuICAgIGlmIHZhbHVlXG4gICAgICBAcXVlcnk6dGV4dCA9IFJlZ0V4cC5uZXcodmFsdWUsICdpJylcbiAgICBlbHNlXG4gICAgICBAcXVlcnk6dGV4dCA9IHZhbHVlXG5cbiAgZGVmIHZpZXdDYXJkIGNhcmRcbiAgICB2aWV3aW5nQ2FyZCA9IGNhcmRcblxuICBkZWYgY2hhbmdlTGFuZ3VhZ2UgZVxuICAgIGxldCBuZXdMYW5ndWFnZSA9IGUudGFyZ2V0LnZhbHVlXG4gICAgZm9yIGNhcmQgaW4gQGNhcmRzXG4gICAgICBjYXJkOmxhbmd1YWdlXG5cblxuICBkZWYgbWF0Y2hUZXh0IGNhcmQsIHRleHRcbiAgICBpZiBjYXJkOmNhcmRfbmFtZVtsYW5ndWFnZV0/LnNlYXJjaCh0ZXh0KSA+PSAwXG4gICAgICByZXR1cm4gdHJ1ZVxuXG4gICAgaWYgY2FyZDpjYXJkX3RleHRbbGFuZ3VhZ2VdPy5zZWFyY2godGV4dCkgPj0gMFxuICAgICAgcmV0dXJuIHRydWVcblxuICAgIGlmIGNhcmQ6aWxsdXN0cmF0b3I/LnNlYXJjaCh0ZXh0KSA+PSAwXG4gICAgICByZXR1cm4gdHJ1ZVxuXG4gICAgaWYgY2FyZDphdHRhY2s/LnRvU3RyaW5nLnNlYXJjaCh0ZXh0KSA+PSAwXG4gICAgICByZXR1cm4gdHJ1ZVxuXG4gICAgaWYgY2FyZDphcm1vcj8udG9TdHJpbmcuc2VhcmNoKHRleHQpID49IDBcbiAgICAgIHJldHVybiB0cnVlXG5cbiAgICBpZiBjYXJkOmhpdF9wb2ludHM/LnRvU3RyaW5nLnNlYXJjaCh0ZXh0KSA+PSAwXG4gICAgICByZXR1cm4gdHJ1ZVxuXG4gICAgaWYgY2FyZDptYW5hX2Nvc3Q/LnRvU3RyaW5nLnNlYXJjaCh0ZXh0KSA+PSAwXG4gICAgICByZXR1cm4gdHJ1ZVxuXG4gICAgaWYgY2FyZDpnb2xkX2Nvc3Q/LnRvU3RyaW5nLnNlYXJjaCh0ZXh0KSA+PSAwXG4gICAgICByZXR1cm4gdHJ1ZVxuXG4gIGRlZiBtYXRjaENvbG9yIGNhcmQsIGNvbG9ycywgbm9Db2xvclxuICAgIHZhciBoYXNDb2xvciA9IGZhbHNlXG4gICAgZm9yIGNvbG9yLCBpc19jb2xvciBvZiBjb2xvcnNcbiAgICAgIGlmIGNhcmRbY29sb3JdXG4gICAgICAgIGhhc0NvbG9yID0gdHJ1ZVxuICAgICAgICBpZiBpc19jb2xvciAmJiBjYXJkW2NvbG9yXSA9PT0gaXNfY29sb3JcbiAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgIHJldHVybiBpZiBoYXNDb2xvclxuICAgICAgZmFsc2VcbiAgICBlbHNlXG4gICAgICBub0NvbG9yICE9PSBoYXNDb2xvclxuXG4gIGRlZiBtYXRjaFR5cGUgY2FyZCwgdHlwZXNcbiAgICBmb3IgdHlwZSwgaXNfdHlwZSBvZiB0eXBlc1xuICAgICAgaWYgY2FyZDpjYXJkX3R5cGVcbiAgICAgICAgaWYgaXNfdHlwZSAmJiBjYXJkOmNhcmRfdHlwZSA9PSB0eXBlXG4gICAgICAgICAgcmV0dXJuIHRydWVcblxuICAgIHJldHVybiBmYWxzZVxuXG4gIGRlZiBtYXRjaFN1YlR5cGUgY2FyZCwgc3ViX3R5cGVzXG4gICAgZm9yIHN1Yl90eXBlLCBpc19zdWJfdHlwZSBvZiBzdWJfdHlwZXNcbiAgICAgIGlmIGNhcmQ6c3ViX3R5cGVcbiAgICAgICAgaWYgaXNfc3ViX3R5cGUgJiYgY2FyZDpzdWJfdHlwZSA9PSBzdWJfdHlwZVxuICAgICAgICAgIHJldHVybiB0cnVlXG5cbiAgICByZXR1cm4gZmFsc2VcblxuICBkZWYgbWF0Y2hSYXJpdHkgY2FyZCwgcmFyaXRpZXNcbiAgICBmb3IgcmFyaXR5LCBpc19yYXJpdHkgb2YgcmFyaXRpZXNcbiAgICAgIGlmIGNhcmQ6cmFyaXR5XG4gICAgICAgIGlmIGlzX3Jhcml0eSAmJiBjYXJkOnJhcml0eSA9PSByYXJpdHlcbiAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgZWxzZVxuICAgICAgICBpZiByYXJpdHkgPT0gJ0Jhc2ljJyAmJiBpc19yYXJpdHlcbiAgICAgICAgICByZXR1cm4gdHJ1ZVxuXG4gICAgcmV0dXJuIGZhbHNlXG5cbiAgZGVmIG1hdGNocyBjYXJkLCBxdWVyeVxuICAgIGlmICFtYXRjaENvbG9yKGNhcmQsIHF1ZXJ5OmNvbG9yLCBxdWVyeTpub19jb2xvcilcbiAgICAgIHJldHVybiBmYWxzZVxuXG4gICAgaWYgIW1hdGNoVHlwZShjYXJkLCBxdWVyeTp0eXBlKVxuICAgICAgcmV0dXJuIGZhbHNlXG5cbiAgICBpZiBjYXJkOnN1Yl90eXBlICYmICFtYXRjaFN1YlR5cGUoY2FyZCwgcXVlcnk6c3ViX3R5cGUpXG4gICAgICByZXR1cm4gZmFsc2VcblxuICAgIGlmICFtYXRjaFJhcml0eShjYXJkLCBxdWVyeTpyYXJpdHkpXG4gICAgICByZXR1cm4gZmFsc2VcblxuICAgIGlmIHF1ZXJ5OnRleHQgJiYgIW1hdGNoVGV4dChjYXJkLCBxdWVyeTp0ZXh0KVxuICAgICAgcmV0dXJuIGZhbHNlXG5cbiAgICByZXR1cm4gdHJ1ZVxuXG5cbiAgZGVmIGJ1aWxkXG4gICAgZm9yIHVybCBpbiBbJy4vZGF0YS9jYXJkX3NldF8wLkMwNzQ4QTE3RTJDMDgyNTJBOUNDRTc1QkI1OTNFNjJENzFEQ0RBNzcuanNvbicsXG4gICAgICAgICAgICAgICAgJy4vZGF0YS9jYXJkX3NldF8xLjEzMENDMzRGN0FDNDM0QjIwNkQ4MzI4NzkzMjhBMEQ5MUQzMTI4NzMuanNvbiddXG4gICAgICBsZXQgcmVzID0gYXdhaXQgd2luZG93LmZldGNoIHVybFxuICAgICAgbGV0IGpzb24gPSBhd2FpdCByZXMuanNvblxuICAgICAgQHNldHMucHVzaChqc29uOmNhcmRfc2V0KVxuXG4gICAgZm9yIHNldCBpbiBAc2V0c1xuICAgICAgZm9yIGNhcmQgaW4gc2V0OmNhcmRfbGlzdFxuICAgICAgICBAY2FyZHMucHVzaCBjYXJkXG4gICAgICAgIEBjYXJkc0luZGV4W2NhcmQ6Y2FyZF9pZF0gPSBjYXJkXG5cbiAgICBmb3IgXywgY2FyZCBvZiBjYXJkc0luZGV4XG4gICAgICBmb3IgcmVmQ2FyZCBpbiBjYXJkOnJlZmVyZW5jZXNcbiAgICAgICAgcmVmQ2FyZDpyZWYgPSBAY2FyZHNJbmRleFtyZWZDYXJkOmNhcmRfaWRdXG5cbiAgICBJbWJhLmNvbW1pdFxuXG5cbiAgZGVmIHJlbmRlclxuICAgIDxzZWxmLnZib3g+XG4gICAgICA8aGVhZGVyLnF1ZXJ5PlxuICAgICAgICA8aW5wdXRbc2VhcmNoVGV4dF0gcGxhY2Vob2xkZXI9J1NlYXJjaC4uLic+XG5cbiAgICAgICAgPGZpZWxkc2V0PlxuICAgICAgICAgICMgPGxlZ2VuZD4gJ1R5cGUnXG4gICAgICAgICAgZm9yIHR5cGUgaW4gWydIZXJvJywgJ0NyZWVwJywgJ1NwZWxsJywgJ0ltcHJvdmVtZW50JywgJ0l0ZW0nXVxuICAgICAgICAgICAgPGRpdi5jaGVja2JveC50eXBlLnt0eXBlfT5cbiAgICAgICAgICAgICAgPGlucHV0W3F1ZXJ5OnR5cGVbdHlwZV1dIHR5cGU9J2NoZWNrYm94Jz5cbiAgICAgICAgICAgICAgPGxhYmVsPlxuXG4gICAgICAgIDxmaWVsZHNldD5cbiAgICAgICAgICAjIDxsZWdlbmQ+ICdTdWJUeXBlJ1xuICAgICAgICAgIGZvciBzdWJfdHlwZSBpbiBbJ0FybW9yJywgJ1dlYXBvbicsICdBY2Nlc3NvcnknLCAnQ29uc3VtYWJsZSddXG4gICAgICAgICAgICA8ZGl2LmNoZWNrYm94LnR5cGUue3N1Yl90eXBlfT5cbiAgICAgICAgICAgICAgPGlucHV0W3F1ZXJ5OnN1Yl90eXBlW3N1Yl90eXBlXV0gdHlwZT0nY2hlY2tib3gnPlxuICAgICAgICAgICAgICA8bGFiZWw+XG5cbiAgICAgICAgPGZpZWxkc2V0PlxuICAgICAgICAgICMgPGxlZ2VuZD4gJ0NvbG9yJ1xuICAgICAgICAgIGZvciBjb2xvciBpbiBbJ3JlZCcsICdncmVlbicsICdibHVlJywgJ2JsYWNrJ11cbiAgICAgICAgICAgIDxkaXYuY2hlY2tib3guY29sb3Iueydpc18nK2NvbG9yfT5cbiAgICAgICAgICAgICAgPGlucHV0W3F1ZXJ5OmNvbG9yW1wiaXNfe2NvbG9yfVwiXV0gdHlwZT0nY2hlY2tib3gnPlxuICAgICAgICAgICAgICA8bGFiZWw+XG4gICAgICAgICAgPGRpdi5jaGVja2JveC5jb2xvci5ub25lPlxuICAgICAgICAgICAgPGlucHV0W3F1ZXJ5Om5vX2NvbG9yXSB0eXBlPSdjaGVja2JveCc+XG4gICAgICAgICAgICA8bGFiZWw+XG5cbiAgICAgICAgPGZpZWxkc2V0PlxuICAgICAgICAgICMgPGxlZ2VuZD4gJ1Jhcml0eSdcbiAgICAgICAgICBmb3IgcmFyaXR5IGluIFsnQmFzaWMnLCAnQ29tbW9uJywgJ1VuY29tbW9uJywgJ1JhcmUnXVxuICAgICAgICAgICAgPGRpdi5jaGVja2JveC5yYXJpdHkue3Jhcml0eX0+XG4gICAgICAgICAgICAgIDxpbnB1dFtxdWVyeTpyYXJpdHlbcmFyaXR5XV0gdHlwZT0nY2hlY2tib3gnPlxuICAgICAgICAgICAgICA8bGFiZWw+XG5cbiAgICAgICAgPHNlbGVjdFtsYW5ndWFnZV0ubGFuZ3VhZ2UgOmNoYW5nZS5jaGFuZ2VMYW5ndWFnZT4gZm9yIGxhbmcgaW4gbGFuZ3VhZ2VzXG4gICAgICAgICAgPG9wdGlvbiB2YWx1ZT1sYW5nPiBsYW5nXG5cbiAgICAgIDx1bC5DYXJkTGlzdD5cbiAgICAgICAgZm9yIGNhcmQgaW4gQGNhcmRzIHdoZW4gbWF0Y2hzKGNhcmQsIHF1ZXJ5KVxuICAgICAgICAgIDxDYXJkUm93W2NhcmRdIGxhbmd1YWdlPUBsYW5ndWFnZSA6Y2xpY2sudmlld0NhcmQoY2FyZCk+XG5cbiAgICAgIGlmIHZpZXdpbmdDYXJkXG4gICAgICAgIDxDYXJkVmlld1t2aWV3aW5nQ2FyZF0gbGFuZ3VhZ2U9QGxhbmd1YWdlIDpjbGljay5zZWxmLnZpZXdDYXJkKG51bGwpPlxuXG5JbWJhLm1vdW50IDxBcHA+XG4iLCJleHBvcnQgdGFnIENhcmRSb3cgPCBsaVxuICBwcm9wIGxhbmd1YWdlXG5cbiAgZGVmIHNldHVwXG4gICAgaWYgZGF0YTppc19yZWQgdGhlbiBkb206Y2xhc3NMaXN0LmFkZCBcImNvbG9yUmVkXCJcbiAgICBpZiBkYXRhOmlzX2dyZWVuIHRoZW4gZG9tOmNsYXNzTGlzdC5hZGQgXCJjb2xvckdyZWVuXCJcbiAgICBpZiBkYXRhOmlzX2JsdWUgdGhlbiBkb206Y2xhc3NMaXN0LmFkZCBcImNvbG9yQmx1ZVwiXG4gICAgaWYgZGF0YTppc19ibGFjayB0aGVuIGRvbTpjbGFzc0xpc3QuYWRkIFwiY29sb3JCbGFja1wiXG5cbiAgICBpZiBkYXRhOnJhcml0eVxuICAgICAgZG9tOmNsYXNzTGlzdC5hZGQgXCJyYXJpdHl7ZGF0YTpyYXJpdHl9XCJcblxuICAgIGlmIGxldCBjYXJkVHlwZSA9IGRhdGE6Y2FyZF90eXBlICYmIGRhdGE6Y2FyZF90eXBlLnJlcGxhY2UoJyAnLCAnJylcbiAgICAgIGRvbTpjbGFzc0xpc3QuYWRkIFwidHlwZXtjYXJkVHlwZX1cIlxuXG4gICAgaWYgZGF0YTpzdWJfdHlwZVxuICAgICAgZG9tOmNsYXNzTGlzdC5hZGQgXCJzdWJUeXBle2RhdGE6c3ViX3R5cGV9XCJcblxuXG4gIGRlZiByZW5kZXJcbiAgICA8c2VsZj5cbiAgICAgIGlmIGxldCBjYXJkSWNvblVybCA9IGRhdGE6bWluaV9pbWFnZT86ZGVmYXVsdFxuICAgICAgICA8ZGl2LmNhcmRJY29uIHN0eWxlPVwiYmFja2dyb3VuZC1pbWFnZTogdXJsKHtjYXJkSWNvblVybH0pO1wiPlxuICAgICAgZWxzZVxuICAgICAgICA8ZGl2LmNhcmRJY29uPlxuXG4gICAgICA8ZGl2LmNhcmRUeXBlPlxuXG4gICAgICBpZiBsZXQgY2FyZENvc3QgPSBkYXRhOm1hbmFfY29zdCBvciBkYXRhOmdvbGRfY29zdFxuICAgICAgICA8ZGl2LmNhcmRDb3N0PiBjYXJkQ29zdFxuICAgICAgZWxpZiBsZXQgaW5nYW1lSW1hZ2VVcmwgPSBkYXRhOmluZ2FtZV9pbWFnZT86ZGVmYXVsdFxuICAgICAgICA8ZGl2LmNhcmRJbmdhbWVJbWFnZSBzdHlsZT1cImJhY2tncm91bmQtaW1hZ2U6IHVybCh7aW5nYW1lSW1hZ2VVcmx9KTtcIj5cblxuICAgICAgPGRpdi5jYXJkTmFtZT4gZGF0YTpjYXJkX25hbWVbbGFuZ3VhZ2VdXG5cbiAgICAgIDxkaXYuY2FyZFN0YXQuQXR0YWNrPiBkYXRhOmF0dGFja1xuICAgICAgPGRpdi5jYXJkU3RhdC5Bcm1vcj4gZGF0YTphcm1vclxuICAgICAgPGRpdi5jYXJkU3RhdC5IaXRQb2ludHM+IGRhdGE6aGl0X3BvaW50c1xuIiwidGFnIENhcmRJbWFnZVxuICBwcm9wIGxhbmd1YWdlXG5cbiAgZGVmIGFiaWxpdHlEZXNjIGlubmVySFRNTFxuICAgIGxldCBlbGVtID0gPGRpdi5hYmlsaXR5RGVzYz5cbiAgICBlbGVtLmRvbTppbm5lckhUTUwgPSBpbm5lckhUTUxcbiAgICByZXR1cm4gZWxlbVxuXG4gIGRlZiByZW5kZXJcbiAgICA8c2VsZj5cbiAgICAgIGlmIGxldCBsYXJnZUltYWdlVXJsID0gZGF0YTpsYXJnZV9pbWFnZVtAbGFuZ3VhZ2VdIHx8IGRhdGE6bGFyZ2VfaW1hZ2U6ZGVmYXVsdFxuICAgICAgICA8ZGl2LmxhcmdlSW1hZ2Ugc3R5bGU9XCJiYWNrZ3JvdW5kLWltYWdlOiB1cmwoe2xhcmdlSW1hZ2VVcmx9KTtcIj5cbiAgICAgICAgICBmb3IgcmVmQ2FyZCBpbiBkYXRhOnJlZmVyZW5jZXNcbiAgICAgICAgICAgIHN3aXRjaCByZWZDYXJkOnJlZl90eXBlXG4gICAgICAgICAgICAgIHdoZW4gJ2FjdGl2ZV9hYmlsaXR5JywgJ3Bhc3NpdmVfYWJpbGl0eSdcbiAgICAgICAgICAgICAgICA8ZGl2LmFiaWxpdHk+XG4gICAgICAgICAgICAgICAgPGxhYmVsLmFiaWxpdHlUZXh0PlxuICAgICAgICAgICAgICAgICAgPGRpdi5hYmlsaXR5TmFtZT4gcmVmQ2FyZDpyZWY6Y2FyZF9uYW1lW2xhbmd1YWdlXVxuICAgICAgICAgICAgICAgICAgPGRpdi5hYmlsaXR5VHlwZT4gcmVmQ2FyZDpyZWY6Y2FyZF90eXBlXG4gICAgICAgICAgICAgICAgICBhYmlsaXR5RGVzYyByZWZDYXJkOnJlZjpjYXJkX3RleHRbbGFuZ3VhZ2VdXG5cbiAgICAgICAgPGRpdi5pbGx1c3RyYXRvcj4gZGF0YTppbGx1c3RyYXRvclxuXG5cbmV4cG9ydCB0YWcgQ2FyZFZpZXdcbiAgcHJvcCBsYW5ndWFnZVxuICBwcm9wIHJlZkltYWdlQ2FyZHNcblxuICBkZWYgc2V0dXBQcm9wc1xuICAgIGlmIGRhdGE6aXNfcmVkIHRoZW4gZG9tOmNsYXNzTGlzdC50b2dnbGUgXCJjb2xvclJlZFwiXG4gICAgaWYgZGF0YTppc19ncmVlbiB0aGVuIGRvbTpjbGFzc0xpc3QudG9nZ2xlIFwiY29sb3JHcmVlblwiXG4gICAgaWYgZGF0YTppc19ibHVlIHRoZW4gZG9tOmNsYXNzTGlzdC50b2dnbGUgXCJjb2xvckJsdWVcIlxuICAgIGlmIGRhdGE6aXNfYmxhY2sgdGhlbiBkb206Y2xhc3NMaXN0LnRvZ2dsZSBcImNvbG9yQmxhY2tcIlxuXG4gICAgaWYgZGF0YTpyYXJpdHlcbiAgICAgIGRvbTpjbGFzc0xpc3QudG9nZ2xlIFwicmFyaXR5e2RhdGE6cmFyaXR5fVwiXG5cbiAgICBpZiBsZXQgY2FyZFR5cGUgPSBkYXRhOmNhcmRfdHlwZSAmJiBkYXRhOmNhcmRfdHlwZS5yZXBsYWNlKCcgJywgJycpXG4gICAgICBkb206Y2xhc3NMaXN0LnRvZ2dsZSBcInR5cGV7Y2FyZFR5cGV9XCJcblxuICAgIGlmIGRhdGE6c3ViX3R5cGVcbiAgICAgIGRvbTpjbGFzc0xpc3QudG9nZ2xlIFwic3ViVHlwZXtkYXRhOnN1Yl90eXBlfVwiXG5cbiAgICBAcmVmSW1hZ2VDYXJkcyA9IGNvbGxlY3RSZWZJbWFnZXMgZGF0YSwgW10sIFtdXG4gICAgSW1iYS5jb21taXRcblxuXG4gIGRlZiBjb2xsZWN0UmVmSW1hZ2VzIGNhcmQsIGFjYywgcmVmZWRBY2NcbiAgICBpZiByZWZlZEFjYy5pbmRleE9mKGNhcmQpIDwgMFxuICAgICAgcmVmZWRBY2MucHVzaCBjYXJkXG4gICAgICBpZiBjYXJkOmxhcmdlX2ltYWdlOmRlZmF1bHRcbiAgICAgICAgYWNjLnB1c2ggY2FyZFxuXG4gICAgICBmb3IgcmVmQ2FyZCBpbiBjYXJkOnJlZmVyZW5jZXNcbiAgICAgICAgaWYgcmVmZWRBY2MuaW5kZXhPZihyZWZDYXJkKSA8IDBcbiAgICAgICAgICBjb2xsZWN0UmVmSW1hZ2VzIHJlZkNhcmQ6cmVmLCBhY2MsIHJlZmVkQWNjXG5cbiAgICByZXR1cm4gYWNjXG5cbiAgZGVmIG1vdW50XG4gICAgc2V0dXBQcm9wc1xuXG4gIGRlZiB1bm1vdW50XG4gICAgc2V0dXBQcm9wc1xuXG4gIGRlZiByZW5kZXJcbiAgICA8c2VsZi5tb2RhbC1vdmVybGF5IGlkPVwiY3ZcIj5cbiAgICAgIDxkaXYubW9kYWw+XG4gICAgICAgIDxoMi5jYXJkTmFtZT4gZGF0YTpjYXJkX25hbWVbQGxhbmd1YWdlXVxuXG4gICAgICAgIDxkaXYuY2FyZFRleHQ+XG5cbiAgICAgICAgPGRpdi5jYXJkSW1hZ2VzPlxuICAgICAgICAgIGZvciBpbWFnZUNhcmQgaW4gQHJlZkltYWdlQ2FyZHNcbiAgICAgICAgICAgIDxDYXJkSW1hZ2VbaW1hZ2VDYXJkXSBsYW5ndWFnZT1AbGFuZ3VhZ2U+XG4iXSwic291cmNlUm9vdCI6IiJ9