# MOBOR JS 0.1
Javascript tool to make a web app

Tool is build on jquery

Demo can be found here:
http://www.atticweb.nl/mobor-js

## File structure
###Index
```html
<!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Mobor-js</title>
	
	<script src="js/jquery-2.0.3.min.js"></script>
	<script src="js/mobor.js"></script>
	<script src="js/script.js"></script>
	
	<link rel="stylesheet" href="css/mobor.css">
	<link rel="stylesheet" href="css/style.css">
</head>
<body>
	<div class="page" id="index">
		
	</div>
</body>
</html>
```
###Page
```html
<!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Page</title>
</head>
<body>
	<div class="page" id="page">
		
	</div>
</body>
</html>
```
## Navigation
To make a element link to another page u can use a anchor tag:
```html
<a href="page_2.html">page 2</a>
```
You can also use other elements to link to another page:
```html
<button class="navigate" data-url="page_2.html">page 2</button>
```
You can add data attributes to change the page transition or direction:
```html
<a href="page_2" data-transition="slide" direction="forward">page 2</a>
```
### Transitions
- slide (default)
  - forward
  - backward
- fade

### Events

There are some events during the navigation:
#####page_load
Triggers when a page is loading.

#####page_loaded
triggers when a page is loaded.

you can get the URL from this events with the 'URL' param

usage:
```js
$(document).on("page_loaded", handler);

function handler(e)
{
	alert(e.URL+' is loaded');
}
```