# vue2-datetimepicker

A simple datetime picker for vue.js

## DEMO

![DEMO](https://thumbs.gfycat.com/IlliterateDelayedAnkolewatusi-size_restricted.gif "DEMO")

## SOURCE

module bundler

```bash
npm i --save simple-vue2-datetimepicker
yarn add simple-vue2-datetimepicker
```

browser

```
https://unpkg.com/simple-vue2-datetimepicker@0.1.0/dist/main.web.js
```

## USAGE

### Browser

include script in html

```html
<script src="https://unpkg.com/simple-vue2-datetimepicker@0.1.0/dist/main.web.js"></script>
```

component will automatically install

```html
<DateTimePicker v-model="date"></DateTimePicker>
```

```javascript
new Vue({
	el: "#app",
	data() {
		return {
			date: new Date()
		};
	}
});
```

### module

```javascript
import DateTimePicker from "simple-vue2-datetimepicker";

Vue.use(DateTimePicker);
```
