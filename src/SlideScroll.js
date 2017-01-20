// Supports modern browsers & IE10+

;(function(){

'use strict';

function SlideScroll(args){

	var root = this;
	args = args || {};
	root.duration = args.duration || 400;
	root.el = args.el || window;
	root._is_scrolling = false;
	root._timer;
	root._initial_top;
};

SlideScroll.prototype.to = function(scroll_top, callback, callback_args){
	if (!this._is_scrolling) {
		this._is_scrolling = true;
		this._timer = Date.now();
		this._initial_top = (this.el === window) ? window.pageYOffset : this.el.scrollTop;
		toRAF.call(this, scroll_top, callback, callback_args);
	}
};

function toRAF(scroll_top, callback, callback_args){
	
	var target = Math.round(easeOutCubic(Date.now() - this._timer, this._initial_top, scroll_top - this._initial_top, this.duration));

	if (scroll_top - this._initial_top < 0) {
		// scroll up
		if (target < scroll_top) target = scroll_top;
	} else {
		// scroll down
		if (target > scroll_top) target = scroll_top;
	}

	if (this.el === window) window.scrollTo(0, target);
	else this.el.scrollTop = target;

	if (target === scroll_top) {
		this._is_scrolling = false;
		if (callback_args && callback_args.constructor !== Array) callback_args = [callback_args];
		callback.apply(null, callback_args);
	}
	else window.requestAnimationFrame(toRAF.bind(this, scroll_top, callback, callback_args));
}

/**
 * http://gizma.com/easing
 * t: current time, b: start value, c: change in value, d: duration 
 */
function easeOutCubic(t, b, c, d) {
	t /= d;
	t--;
	return c*(t*t*t + 1) + b;
};

if (typeof define === 'function' && define.amd) define(SlideScroll);
else if (typeof module === 'object' && module.exports) module.exports = SlideScroll;
else this.SlideScroll = SlideScroll;
}).call(this);
