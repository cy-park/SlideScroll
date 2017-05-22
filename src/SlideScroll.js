/*! SlideScroll.js v0.1.3 | (c) 2017 Chan Young Park | MIT License */

;(function(){

'use strict';

function SlideScroll(args){

	var root = this;

	args = args || {};
	root.duration = args.duration || 400;
	root.el = args.el || window;
	root.watchMode = args.watchMode || false;

	// Date.now() value when SlideScroll.to() is called
	root._initial_time;
	// window.pageYOffset or element.scrollTop value when SlideScroll.to() is called
	root._initial_top;

	// ONLY IN WATCH MODE
	// parameters recorded when SlideScroll.to() is called
	// _st = scroll_top, _cb = callback, _cba = callback_args
	root._st, root._cb, root._cba;

	// NOT USED IN WATCH MODE
	// turning true when SlideScroll.to() is called
	// turning false when callback() is called
	root._is_scrolling = false;
};

SlideScroll.prototype.to = function(scroll_top, callback, callback_args){
	var root = this;
	if (!root._is_scrolling) {
		root._initial_time = Date.now();
		root._initial_top = (root.el === window) ? window.pageYOffset : root.el.scrollTop;
		root._st = scroll_top;
		root._cb = callback;
		root._cba = callback_args;
		root._is_scrolling = true;
		if (!root.watchMode) engine.call(root);
	}
};

SlideScroll.prototype.watch = function(){
	if (this._is_scrolling) engine.call(this);
};

function engine(){
	var root = this;
	var target = Math.round(easeOutCubic(Date.now() - root._initial_time, root._initial_top, root._st - root._initial_top, root.duration));

	if (root._st - root._initial_top < 0) {
		// scroll up
		if (target < root._st) target = root._st;
	} else {
		// scroll down
		if (target > root._st) target = root._st;
	}

	if (root.el === window) window.scrollTo(0, target);
	else root.el.scrollTop = target;

	if (target === root._st) {
		root._is_scrolling = false;
		if (root._cb) {
			if (root._cba && root._cba.constructor !== Array) root._cba = [root._cba];
			root._cb.apply(null, root._cba);
		}
	} else {
		if (!root.watchMode) window.requestAnimationFrame(engine.bind(root));
	}
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
