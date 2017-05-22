# SlideScroll v0.1.3

### A javascript vertical page scroll animation library.

SlideScroll is an animating version of `window.scrollTo()` that only applies to vertical directions.

<br>

## Download

- [minified](https://raw.githubusercontent.com/cy-park/SlideScroll/master/dist/SlideScroll.min.js)
- [unminified](https://raw.githubusercontent.com/cy-park/SlideScroll/master/src/SlideScroll.js)

<br>

## Installation

#### Option 1: HTML

```html
<script src="SlideScroll.min.js"></script>
```

#### Option 2: NPM

```shell
$ npm i slide-scroll --save
```

<br>

## Quick Start

```JS
// animation duration is 500ms.
var slide_scroll = new SlideScroll({duration: 500});

// scrolling to 100px from page top.
slide_scroll.to(100, function(){
  // callback
});
```

<br>

## APIs

### SlideScroll()

SlideScroll constructor.

**Syntax:**

<pre>
<b>new SlideScroll( [settings] )</b>
</pre>

**Arguments:**

- `settings` *{object}* (optional) `SlideScroll` settings for initialization.

	Parameters for `settings`:

	| Parameter   | Type      | Default | Description |
	| ----------- | --------- | ------- | ----------- |
	| `duration`  | *integer* | 400     | Scroll animation duration in milliseconds |
	| `el`        | *string*  | window  | Target DOM element to scroll |
	| `watchMode` | *boolean* | false   | If `watchMode` is enabled, `.to()` method will animate scroll only when it is followed by `.watch()` method. `watchMode` is often used when it is discouraged for SlideScroll to create another `requestAnimationFrame` by itself as there is already existing `rAF` in the page. |
	
<br>

### .to()

Scroll to the specific position of the target element.

**Syntax:**

<pre>
<b>.to( scroll_top [, callback, callback_arguments] )</b>
</pre>

**Arguments:**

- `scroll_top` *{integer}* Target scroll position to animate toward.
- `callback` *{function}* (optional) Callback function
- `callback_arguments` *{Array}* (optional) Arguments array for callback function

<br>

### .watch()

Trigger scroll animation in `watchMode`. This method is to be used in an already existing `requestAnimationFrame` in the page. It is required to set `watchMode = true` in the constructor settings.

**Syntax:**

<pre>
<b>.watch()</b>
</pre>

**Example:**

```JS
/** 
 * `watchMode` enabled.
 */
var slide_scroll = new SlideScroll({watchMode: true});

/** 
 * By running `render()`, it constantly calls
 * `slide_scroll.watch()` method.
 */
var render = function() {
  slide_scroll.watch();
  window.requestAnimationFrame(render);
};
render();

/**
 * Scrolls to 100px scroll top.
 * `.to()` method is constantly watched by `.watch()`.
 */
slide_scroll.to(100);
```

Above example is identical to the below example in normal mode, which uses its own `requestAnimationFrame` internally.

```JS
var slide_scroll = new SlideScroll();
slide_scroll.to(100);
```

<br>

## Browser Support

Scrawler supports all major modern browsers including IE 10+.

## License

MIT
